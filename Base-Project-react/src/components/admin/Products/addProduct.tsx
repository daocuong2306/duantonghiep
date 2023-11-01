import { useAddProductMutation } from "../../../api/product";
import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../api/category";
import { ICategory } from "../../../interface/category";
import { Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, notification } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

//load img avatar product
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
//end img avatar
const AddProduct = () => {
    // Xử lý sự kiện khi người dùng chọn tệp
    const [selectedCate, setselectedCate] = useState(null);
    const { data: categories } = useGetCategoriesQuery();
    const url = useNavigate()
    const readerRef = useRef<any>(null);
    const [addProduct, { data: products }] = useAddProductMutation();
    const { control, handleSubmit, setValue, getValues, register } = useForm();
    //tìm và chọn select
    const onChange = (value: any) => {
        console.log(`selected ${value}`);
        setselectedCate(value)
    };

    const onSearch = (value: any) => {
        console.log('search:', value);
    };
    //img table
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        // reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    console.log(fileList);

    const handleChangeTable: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    //end img table
    //img avatar product
    const [loading, setLoading] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [selectedFile, setSelectedFile] = useState(null);
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoadingAvatar(true);
                setImageUrl(url);
            });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoadingAvatar(false);
                setImageUrl(url);
            });
        }
    };
    const handleFileChange = (event: any) => {
        const file = event.fileList[0].originFileObj;
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileData = e.target.result;
            };
            readerRef.current = reader;
            reader.readAsDataURL(file);
        }
        console.log(selectedFile);
    };
    const twoFunctions = (event: any) => {
        handleFileChange(event)
        handleChange(event)
    }
    const uploadButton = (
        <div>
            {loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const uploadButtonTable = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    //end img product 
    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    // Notification
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e) => {
        api.open({
            message: e,
        });
    };
    const onHandleSubmit = async (data: ICategory) => {
        const code = getValues('code');
        const description = getValues('description');
        const name = getValues('name');
        const price = parseInt(getValues('price'));
        const quantity = parseInt(getValues('quantity'));
        let status = 0;
        const formData = new FormData();
        if (quantity > 0) {
            status = 1;
        }
        // Append form fields to formData
        formData.append('name', name);
        formData.append('code', code);
        formData.append('description', description);
        formData.append('id_category', String(selectedCate));
        formData.append('price', String(price));
        formData.append('status', String(status));
        // Append the selected file to formData (if available)
        formData.append('image', selectedFile);
        try {
            const response = await addProduct(formData);
            console.log("error", response?.error.data.errors);
            if (response?.error.data.errors.image) {
                openNotification("Bạn cần thêm ảnh cho sản phẩm")
            } else if (response?.error.data.errors.code) {
                openNotification("Vui lòng nhập hoặc nhập lại mã sản phẩm")
            } else if (response?.error.data.errors.name) {
                openNotification("Vui lòng nhập hoặc nhập lại tên sản phẩm")
            }
        } catch (error) {
            console.error(error);
        }
    };
    console.log(products);
    if (products?.message == "Thêm sản phẩm thành công.") {
        url('/admin/dashboard')
    }
    const optionId = categories?.categories.map((item: any) => ({ value: item.id, label: item.name }));

    return <div>
        {contextHolder}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center my-6">Add Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="w-full">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            beforeUpload={beforeUpload}
                            onChange={twoFunctions}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" className="w-full" /> : uploadButton}
                        </Upload>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Product Name"
                                required
                                {...register('name')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                id="price"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Price"
                                required
                                {...register('price')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Leave a description..."
                                {...register('description')}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Product Code</label>
                            <input
                                type="text"
                                id="code"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Product Code"
                                required
                                {...register('code')}
                            />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div >
}


export default AddProduct

// <div className="mx-auto max-w-270">


// <div className="grid grid-cols-5 gap-8">
//     <div className="col-span-5 xl:col-span-3">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                 <h3 className="font-medium text-black ">
//                     Personal Information
//                 </h3>
//             </div>
//             <div className="p-7">
//                 <form action="#">
//                     <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                         <div className="w-full sm:w-1/2">
//                             <label
//                                 className="mb-3 block text-sm font-medium text-black "
//                                 htmlFor="fullName"
//                             >
//                                 Full Name
//                             </label>
//                             <div className="relative">
//                                 <span className="absolute left-4.5 top-4">
//                                     <svg
//                                         className="fill-current"
//                                         width="20"
//                                         height="20"
//                                         viewBox="0 0 20 20"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <g opacity="0.8">
//                                             <path
//                                                 fillRule="evenodd"
//                                                 clipRule="evenodd"
//                                                 d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
//                                                 fill=""
//                                             />
//                                             <path
//                                                 fillRule="evenodd"
//                                                 clipRule="evenodd"
//                                                 d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
//                                                 fill=""
//                                             />
//                                         </g>
//                                     </svg>
//                                 </span>
//                                 <input
//                                     className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
//                                     type="text"
//                                     name="fullName"
//                                     id="fullName"
//                                     placeholder="Devid Jhon"
//                                     defaultValue="Devid Jhon"
//                                 />
//                             </div>
//                         </div>

//                         <div className="w-full sm:w-1/2">
//                             <label
//                                 className="mb-3 block text-sm font-medium text-black "
//                                 htmlFor="phoneNumber"
//                             >
//                                 Phone Number
//                             </label>
//                             <input
//                                 className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
//                                 type="text"
//                                 name="phoneNumber"
//                                 id="phoneNumber"
//                                 placeholder="+990 3343 7865"
//                                 defaultValue="+990 3343 7865"
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-5.5">
//                         <label
//                             className="mb-3 block text-sm font-medium text-black "
//                             htmlFor="emailAddress"
//                         >
//                             Email Address
//                         </label>
//                         <div className="relative">
//                             <span className="absolute left-4.5 top-4">
//                                 <svg
//                                     className="fill-current"
//                                     width="20"
//                                     height="20"
//                                     viewBox="0 0 20 20"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <g opacity="0.8">
//                                         <path
//                                             fillRule="evenodd"
//                                             clipRule="evenodd"
//                                             d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
//                                             fill=""
//                                         />
//                                         <path
//                                             fillRule="evenodd"
//                                             clipRule="evenodd"
//                                             d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
//                                             fill=""
//                                         />
//                                     </g>
//                                 </svg>
//                             </span>
//                             <input
//                                 className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
//                                 type="email"
//                                 name="emailAddress"
//                                 id="emailAddress"
//                                 placeholder="devidjond45@gmail.com"
//                                 defaultValue="devidjond45@gmail.com"
//                             />
//                         </div>
//                     </div>

//                     <div className="mb-5.5">
//                         <label
//                             className="mb-3 block text-sm font-medium text-black "
//                             htmlFor="Username"
//                         >
//                             Username
//                         </label>
//                         <input
//                             className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
//                             type="text"
//                             name="Username"
//                             id="Username"
//                             placeholder="devidjhon24"
//                             defaultValue="devidjhon24"
//                         />
//                     </div>

//                     <div className="mb-5.5">
//                         <label
//                             className="mb-3 block text-sm font-medium text-black "
//                             htmlFor="Username"
//                         >
//                             BIO
//                         </label>
//                         <div className="relative">
//                             <span className="absolute left-4.5 top-4">
//                                 <svg
//                                     className="fill-current"
//                                     width="20"
//                                     height="20"
//                                     viewBox="0 0 20 20"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <g opacity="0.8" clipPath="url(#clip0_88_10224)">
//                                         <path
//                                             fillRule="evenodd"
//                                             clipRule="evenodd"
//                                             d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
//                                             fill=""
//                                         />
//                                         <path
//                                             fillRule="evenodd"
//                                             clipRule="evenodd"
//                                             d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
//                                             fill=""
//                                         />
//                                     </g>
//                                     <defs>
//                                         <clipPath id="clip0_88_10224">
//                                             <rect width="20" height="20" fill="white" />
//                                         </clipPath>
//                                     </defs>
//                                 </svg>
//                             </span>

//                             <textarea
//                                 className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4  dark:focus:border-primary"
//                                 name="bio"
//                                 id="bio"
//                                 rows={6}
//                                 placeholder="Write your bio here"
//                                 defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
//                             ></textarea>
//                         </div>
//                     </div>

//                     <div className="flex justify-end gap-4.5">
//                         <button
//                             className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark "
//                             type="submit"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
//                             type="submit"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//     <div className="col-span-5 xl:col-span-2">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                 <h3 className="font-medium text-black ">
//                     Your Photo
//                 </h3>
//             </div>
//             <div className="p-7">
//                 <form action="#">
//                     <div className="mb-4 flex items-center gap-3">
//                         <div className="h-14 w-14 rounded-full">
//                         </div>
//                         <div>
//                             <span className="mb-1.5 text-black ">
//                                 Edit your photo
//                             </span>
//                             <span className="flex gap-2.5">
//                                 <button className="text-sm hover:text-primary">
//                                     Delete
//                                 </button>
//                                 <button className="text-sm hover:text-primary">
//                                     Update
//                                 </button>
//                             </span>
//                         </div>
//                     </div>

//                     <div
//                         id="FileUpload"
//                         className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
//                     >
//                         <input
//                             type="file"
//                             accept="image/*"
//                             className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
//                         />
//                         <div className="flex flex-col items-center justify-center space-y-3">
//                             <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
//                                 <svg
//                                     width="16"
//                                     height="16"
//                                     viewBox="0 0 16 16"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         clipRule="evenodd"
//                                         d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
//                                         fill="#3C50E0"
//                                     />
//                                     <path
//                                         fillRule="evenodd"
//                                         clipRule="evenodd"
//                                         d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
//                                         fill="#3C50E0"
//                                     />
//                                     <path
//                                         fillRule="evenodd"
//                                         clipRule="evenodd"
//                                         d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
//                                         fill="#3C50E0"
//                                     />
//                                 </svg>
//                             </span>
//                             <p>
//                                 <span className="text-primary">Click to upload</span> or
//                                 drag and drop
//                             </p>
//                             <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
//                             <p>(max, 800 X 800px)</p>
//                         </div>
//                     </div>

//                     <div className="flex justify-end gap-4.5">
//                         <button
//                             className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark "
//                             type="submit"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
//                             type="submit"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
// </div>
// </div>


