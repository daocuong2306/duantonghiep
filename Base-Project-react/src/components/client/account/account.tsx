import { useInforUserQuery, useUpdateAccountMutation } from "@/api/user"
import { Link, useNavigate } from "react-router-dom"
import image from "../../../../img/user.png"
import React, { useRef, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Spin, UploadProps, message } from 'antd';
import Upload, { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useForm } from "react-hook-form";
import userImage from "../../../../img/user.png"
const Account = () => {
    const token = localStorage.getItem("header")
    const { data, isLoading } = useInforUserQuery(token)
    console.log(data);
    const url=useNavigate()
   const [update, { isLoading: updateLoading }] = useUpdateAccountMutation()
    const { control, handleSubmit, setValue, getValues, register } = useForm()
    const readerRef = useRef<any>(null);
    const onFinish = async (values: any) => {
        const formData = new FormData();

        const name = getValues('name')
        const age = getValues('age')

        const phone = getValues('phone')
        const address = getValues('address')
        const oldpassword = getValues('oldpassword')
        const newpassword = getValues('newpassword')
        const confirmNewpassword = getValues('confirmNewpassword')
        if (newpassword === confirmNewpassword) {

            formData.append('age', age);
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('oldpassword', oldpassword);
            formData.append('address', address);
            formData.append('newpassword', newpassword);

            if (selectedFile) {
                // If a new image is selected, append it to the formData
                formData.append('image', selectedFile);
            }
            
            try {
                const upInfor = { formData, token }
                const response = await update(upInfor);
                console.log(response);
                if(response?.error){
                    message.error(response?.error.data.msg)
                }
                else{
                    message.success('Cập nhật thông tin thành công')
                }
            }
            catch (err) {
                message.error('Cập nhật thông tin thất bại');
            }
        } else {
            message.error("Xác nhận mật khẩu không trùng khớp")
        }
    };
    ///////////////////////////////////////////
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
        const file = event?.fileList?.[0]?.originFileObj;
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileData = e.target.result;
                // Bạn có thể làm bất kỳ điều gì bạn muốn với fileData ở đây
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
        (<section style={{ backgroundColor: "#eee;" }}>
            <div className="container py-5">
                <form onSubmit={handleSubmit(onFinish)}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center d-flex flex-column align-items-center">
                                    {!check ? (
                                        <>
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
                                            <div className="w-20 h-20 overflow-hidden rounded-full">
                                                <img src={`http://127.0.0.1:8000/${data?.data.image}`} className="w-full h-full object-cover" />
                                            </div>
                                        </>
                                    ) : (
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
                                                {imageUrl ? (
                                                    <div className="w-20 h-20 overflow-hidden rounded-full">
                                                        <img src={imageUrl} alt="avatar" className="w-full h-full object-cover rounded-full" />
                                                    </div>
                                                ) : (
                                                    uploadButton
                                                )}
                                            </Upload>
                                        </div>
                                    )}
                                    <div className="">
                                        <Link to=""><button type="button" className="btn-cart-account">Giỏ hàng</button></Link>
                                        <Link to=""><button type="button" className="btn-bill-account">Thanh toán</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Tên</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={data?.data.name}  {...register('name')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Tuổi</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="number" maxLength={2} defaultValue={data?.data.age}  {...register('age')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Số điện thoại</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="number" defaultValue={data?.data.phone} maxLength={10}  {...register('phone')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Địa chỉ</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" defaultValue={data?.data.address}  {...register('address')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Mật khẩu cũ</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="password" placeholder="********"   {...register('oldpassword')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Mật khẩu mới</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="password" placeholder="********"  {...register('newpassword')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Nhập lại mật khẩu mới</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="password" placeholder="********"  {...register('confirmNewpassword')} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <button type="submit" className="btn btn-success rounded-pill custom-btn">
                                            Cập nhật thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        )
}

export default Account