import { useAppDispatch } from "../../../store/hook";
import { useForm, Controller } from "react-hook-form";
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../../../api/category";
import { ICategory } from "../../../interface/category";
import { Modal, Select, message } from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
const AddCategory = () => {
    const [selectedCate, setselectedCate] = useState(null);
    const { data: categories } = useGetCategoriesQuery();
    const url = useNavigate()
    const readerRef = useRef<any>(null);
    const [addCategory] = useAddCategoryMutation();
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

    const onHandleSubmit = async (data: any) => {
        const name = getValues('name');
        const formData = new FormData();

        // Append form fields to formData
        formData.append('name', name);

        // Append the selected file to formData (if available)
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        try {
            const response = await addCategory(formData);

            // Handle the response here if needed

            console.log(response);

            // Redirect to another page after successful form submission
            // url("/admin/categories");
        } catch (error) {
            // Handle any errors that occurred during form submission
            console.error(error);
        }
        url("/admin/categories")
    };
    return <div>
        <h2 className="text-5xl font-black text-gray-900 text-center mb-10">Thêm danh mục</h2>
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
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
};

export default AddCategory;
