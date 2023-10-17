import { useAddProductMutation } from "../../../api/product";
import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../api/category";
import { ICategory } from "../../../interface/category";
import { Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from 'antd';
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
    const [addProduct] = useAddProductMutation();
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
        console.log(fileList);

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
        formData.append('quantity', String(quantity));
        formData.append('status', String(status));
        formData.append('discount_id', Number(1));
        // Append the selected file to formData (if available)
        formData.append('image', selectedFile);
        try {
            const response = await addProduct(formData);

            // Handle the response here if needed

            console.log(response);

            // Redirect to another page after successful form submission
            // url('/admin/dashboard')
        } catch (error) {
            // Handle any errors that occurred during form submission
            console.error(error);
        }
    };
    const optionId = categories?.categories.map((item: any) => ({ value: item.id, label: item.name }));

    return <div>
        <h2 className="text-5xl font-black text-gray-900 text-center mb-10">Thêm sản phẩm</h2>
        <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 ml-200 mr-200 ">
            <div className="col-span-1">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={twoFunctions}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
            <div>
                <div className="col-span-2">
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Product Name"
                            required
                            {...register('name')}
                        />
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Giá</label>
                            <input
                                type="number"
                                id="price"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                placeholder="Price"
                                required
                                {...register('price')}
                            />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Mô tả</label>
                            <textarea
                                id="description"
                                rows="4"
                                class="block p-2.5 w-full text-sm text-white-900 bg-white-50 border border-white-300 focus:ring-white-500 focus:border-white-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-gray dark:focus:ring-white-500 dark:focus:border-white-500"
                                placeholder="Leave a description..."
                                {...register('description')}
                            ></textarea>
                        </div>
                        <div className="grid">
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={optionId}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Mã sản phẩm</label>
                                <input
                                    type="text"
                                    id="code"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Product Code"
                                    required
                                    {...register('code')}
                                />
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Số lượng</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Quantity"
                                    required
                                    {...register('quantity')}
                                />
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <div>
                                <>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChangeTable}
                                    >
                                        {fileList.length >= 8 ? null : uploadButtonTable}
                                    </Upload>
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}


export default AddProduct



