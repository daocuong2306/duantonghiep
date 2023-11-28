import { useInforUserQuery, useUpdateAccountMutation } from "@/api/user"
import { Button, Spin, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import image from "../../../../img/user.png"
import { useForm } from "react-hook-form"
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload"
import { useRef, useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
const Account = () => {

    const { control, handleSubmit, setValue, getValues, register } = useForm();
    const url = useNavigate()
    const readerRef = useRef<any>(null);
    const token = localStorage.getItem("header")
    const { data, isLoading } = useInforUserQuery(token)
    console.log(data);

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

                message.success("Cập nhật thông tin thành công")
                window.location.reload()
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
        (<Spin spinning={updateLoading} className="pl-[50%]">
            <section style={{ backgroundColor: "#eee;" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center d-flex flex-column align-items-center">
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
                                        {data?.data.image !== null ? <img src={`http://localhost:8000/${data?.data.image}`} className="rounded-circle img-fluid" style={{height:"308px",width:"308px"}} /> : <img src={image} className="rounded-circle img-fluid" />}

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
                                                {imageUrl ? <img src={imageUrl} alt="avatar" className="rounded-circle img-fluid" /> : uploadButton}
                                            </Upload>
                                        </div>}
                                    <hr />
                                    <div className="">
                                        <Link to=""><button type="button" className="btn-cart-account">Giỏ hàng</button></Link>
                                        <Link to=""><button type="button" className="btn-bill-account">Thanh toán</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <form onSubmit={handleSubmit(onHandleSubmit)}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Tên</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" defaultValue={data?.data.name} {...register('name')} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Tuổi</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="number" defaultValue={data?.data.age} maxLength={2} {...register('age')} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" defaultValue={data?.data.email} {...register('email')} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Số điện thoại</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="number" defaultValue={data?.data.phone} maxLength={10} {...register('phone')} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Địa chỉ</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" defaultValue={data?.data.address} {...register('address')} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Mật khẩu cũ</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="password" {...register('oldpassword')} placeholder="******" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Mật khẩu mới</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="password" {...register('newpassword')} placeholder="******" />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Xác nhận mật khẩu mới</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="password" {...register('confirmnewpassword')} placeholder="******" />
                                            </div>
                                        </div>
                                        <hr />

                                        <button type="submit" className="btn btn-success rounded-pill custom-btn">
                                            Cập nhật thông tin
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </Spin>)
}

export default Account