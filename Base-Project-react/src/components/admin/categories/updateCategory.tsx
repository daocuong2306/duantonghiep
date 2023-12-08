import React, { useRef, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space, Spin, UploadProps, message } from 'antd';
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '@/api/category';
import Upload, { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useParams } from 'react-router-dom';



const UpdateCategory: React.FC = () => {
    const id = useParams();
    const [open, setOpen] = useState(false);
    const readerRef = useRef<any>(null);
    const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation()
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    console.log(id);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const formData = new FormData();
        formData.append('name', values.name);

        if (selectedFile) {
            // If a new image is selected, append it to the formData
            formData.append('image', selectedFile);
        }
        else {
            // If no new image is selected, use the existing image value
            formData.append('image', category?.categories.image);
        }

        try {
            const idCate = { formData, id }
            await updateCategory(idCate);
            message.success('Cập nhật sản phẩm thành công');

            // Close the drawer or perform any other actions as needed
            onClose();
        }
        catch (err) {
            message.success('Cập nhật sản phẩm thất bại');
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
    //end add image 


    const { data: category, isLoading }: { data: any, isLoading: any } = useGetCategoryByIdQuery(id) as { data: any, isLoading: any };

    console.log(category);

    return (
        <>
            <Spin spinning={updateLoading}>
                <Spin spinning={isLoading}>
                    <Button onClick={showDrawer} >
                        Sửa
                    </Button>
                    <Drawer
                        title="Create a new account"
                        width={720}
                        onClose={onClose}
                        open={open}
                        bodyStyle={{
                            paddingBottom: 80,
                        }}

                    >
                        <Form layout="vertical" onFinish={onFinish}>
                            <Row gutter={16}>
                                <Col span={12}>
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
                                        <img src={`https://briteshop.store${category?.categories.image}`} className="w-full h-full" />

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
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Name"
                                        initialValue={category?.categories.name}
                                    >
                                        <Input placeholder="Please enter a name" />
                                    </Form.Item>

                                </Col>
                            </Row>

                            <Space className='mt-[7%]'>
                                <Button onClick={onClose}>Hủy bỏ</Button>
                                <Button htmlType="submit">
                                    Gửi
                                </Button>
                            </Space>
                        </Form>

                    </Drawer>
                </Spin>
            </Spin>
        </>
    );
};
export default UpdateCategory;