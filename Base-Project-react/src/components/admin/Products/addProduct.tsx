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
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Variant from "./Variant";
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
    //text mô tả
    const editor = useRef();

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const handleGetEditorContent = () => {

    };
    //img table
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        // reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
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
    //end img product 
    //thêm variant 
    const [check, setCheck] = useState(false)
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
    const onHandleSubmit = async (data: any) => {
        const code = getValues('code');
        const name = getValues('name');
        const price = parseInt(getValues('price'));
        const quantity = parseInt(getValues('quantity'));
        let status = 0;
        const formData = new FormData();
        if (quantity > 0) {
            status = 1;
        }
        if (editor.current) {
            const content = editor.current.getContents();
            // Do something with the content (e.g., log it or use it as needed)
            console.log("Editor Content:", content);
            formData.append('description', content);
        }
        // Append form fields to formData
        formData.append('name', name);
        formData.append('code', code);
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
    // if (products?.message == "Thêm sản phẩm thành công.") {

    // }
    const optionId = categories?.categories.map((item: any) => ({ value: item.id, label: item.name }));

    return <div>
        {contextHolder}

        {check ? <Variant id={1} /> : <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                                <div className="w-full sm:w-1/2 ">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black "
                                        htmlFor="fullName"
                                    >
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Tên sản phẩm"
                                        required
                                        {...register('name')}
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black "
                                        htmlFor="phoneNumber"
                                    >
                                        Giá tiền
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Giá tiền"
                                        required
                                        {...register('price')}
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black "
                                    htmlFor="Username"
                                >
                                    Mô tả sản phẩm
                                </label>
                                <SunEditor getSunEditorInstance={getSunEditorInstance} />
                            </div>
                            <div className="w-full h-full mb-5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black "
                                    htmlFor="Username"
                                >
                                    Loại
                                </label>
                                <Select
                                    showSearch
                                    placeholder="Chọn loại"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={optionId}
                                />
                            </div>
                            <div className="w-full h-full mb-5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black "
                                    htmlFor="Username"
                                >
                                    Mã sản phẩm
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Mã sản phẩm"
                                    required
                                    {...register('code')}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Thêm sản phẩm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-span-5 xl:col-span-2">
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
                            {imageUrl ? <img src={imageUrl} alt="avatar" className="w-full h-full" /> : uploadButton}
                        </Upload>
                    </div>
                </div>
            </div>
        </div>}
    </div >
}


export default AddProduct




