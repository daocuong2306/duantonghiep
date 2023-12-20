import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../../api/category";
import { Spin, message } from "antd";
import Upload, { RcFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { notification } from 'antd';


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
    const url = useNavigate()
    const readerRef = useRef<any>(null);
    const [addCategory, { data: dataAdd, error }] = useAddCategoryMutation();
    const { handleSubmit, getValues, register } = useForm();
    const [loading, setLoading] = useState(false);
    //img table
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        // reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
    //end img table
    //img avatar product
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [selectedFile, setSelectedFile] = useState(null);
    const handleChange: UploadProps['onChange'] = (info: any) => {
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
                console.log(fileData);

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
            <div style={{ marginTop: 8 }}>Cập nhật</div>
        </div>
    );

    //end img product 
    // Filter `option.label` match the user type `input`


    const onHandleSubmit = async () => {
        const name = getValues('name');
        const formData = new FormData();
        formData.append('name', name);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        setLoading(true)
        try {
            await addCategory(formData);
        } catch (error) {
            console.error(error);
        }
    };
    console.log(dataAdd, error);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    const errors: any = error
    useEffect(() => {
        if (errors?.data?.errors) {
            setLoading(false);
            openNotification("Bạn chưa nhập ảnh hoặc tên của danh mục đã tồn tại");
        }
    }, [error]);
    console.log(loading);
    if (dataAdd?.message == "Successfull") {
        url("/admin/categories")
    }
    return <div>
        <Spin spinning={loading} className="pl-[50%]">
            {contextHolder}
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
                                placeholder="Tên danh mục"
                                required
                                {...register('name')}
                            />
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Gửi</button>
                        </form>
                    </div>
                </div>
            </div>
        </Spin>
    </div>
};

export default AddCategory;
