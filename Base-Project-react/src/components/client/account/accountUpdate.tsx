import { useInforUserQuery, useUpdateAccountMutation } from "@/api/user"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Upload, message } from "antd";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../img/user.png"
const AccountUpdate = () => {
    const { control, handleSubmit, setValue, getValues, register } = useForm();

    const url = useNavigate()
    const readerRef = useRef<any>(null);
    const token = localStorage.getItem("header")
    const { data, isLoading } = useInforUserQuery(token)

    const [updateAccount, { isLoading: updateLoading }] = useUpdateAccountMutation()
    const onHandleSubmit = async (data: any) => {
        const name = getValues('name');
        const age = getValues('age');
        const phone = getValues('phone');
        const address = getValues('address');
        const oldpassword = getValues('oldpassword');
        const newpassword = getValues('newpassword');
        const confirmnewpassword = getValues('confirmnewpassword');
        console.log(address);

        if (newpassword == confirmnewpassword) {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('age', age)
            formData.append('phone', phone)
            formData.append('address', address)
            formData.append('oldpassword', oldpassword)
            formData.append('newpassword', newpassword)

            if (selectedFile) {
                formData.append('image', selectedFile);
            } else {
            }
            try {
                const account = { formData, token }
                const response = await updateAccount(account);
                if (response?.error) {
                    message.error(response?.error.data.msg)
                }

                message.success("Cập nhật sản phẩm thành công")
                url("/account")




            } catch (error: any) {

            }

        } else {
            message.error("Mật khẩu mới không trùng khớp")
        }
    };
    const [check, setCheck] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể đẩy file JPG/PNG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

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
    const uploadButton = (
        <div>
            {loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Cập nhật</div>
        </div>
    );
    const twoFunctions = (event: any) => {
        handleFileChange(event)
        handleChange(event)
    }

    return isLoading ?
        <Spin spinning={isLoading} className="pl-[50%]"></Spin>
        :
        <div>
            <Spin spinning={updateLoading} className="pl-[50%]">
                <div className="flex justify-around">
                    <div className="w-[40%]">
                        {!check ? <>
                            <Button
                                onClick={() => {
                                    setImageUrl(undefined);
                                    setSelectedFile(null);
                                    setCheck(true);
                                }}
                                className="delete-button"
                            >
                                Xóa
                            </Button>
                            {data?.data.image !== null ? <img src={`http://localhost:8000${data?.data.image}`} className="w-[50%] h-[300px]" /> : <img src={image} className="w-[50%] h-[300px]" />}

                        </>
                            : <div className="w-full">
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
                            </div>}
                    </div>
                    <section className="bg-white">
                        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">Thông tin</h2>
                            <form onSubmit={handleSubmit(onHandleSubmit)}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Tên</label>
                                        <input defaultValue={data?.data.name}
                                            type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            required
                                            {...register('name')}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Tuổi</label>
                                        <input defaultValue={data?.data.age} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            {...register('age')}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Địa chỉ</label>
                                        <input defaultValue={data?.data.address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            {...register('address')}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Số điện thoại</label>
                                        <input type="text" defaultValue={data?.data.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " maxLength={10}
                                            {...register('phone')}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu cũ</label>
                                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            {...register('oldpassword')}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu mới</label>
                                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            {...register('newpassword')}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="confirmnewpassword" className="block mb-2 text-sm font-medium text-gray-900">Xác nhận mật khẩu mới</label>
                                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            {...register('confirmnewpassword')}
                                        />
                                    </div>

                                </div>
                                <div className="flex items-center space-x-4">
                                    <button type="submit" className="text-center text-sm rounded-lg px-5 py-2.5 text-white bg-green-700">
                                        Cập nhật thông tin
                                    </button>
                                    <Link to="/account"><button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        Huỷ
                                    </button></Link>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </Spin>
        </div>

}

export default AccountUpdate