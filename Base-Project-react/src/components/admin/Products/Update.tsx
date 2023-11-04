import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd';
import { Image } from 'antd';
import { useForm } from "react-hook-form";
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import { useGetCategoriesQuery } from '@/api/category';
import SunEditor from 'suneditor-react';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';



const Update: React.FC<{ id: string }> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const readerRef = useRef<any>(null);
    const [updateProduct] = useUpdateProductMutation()
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const editor = useRef();
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const formData = new FormData();
        if (editor.current) {
            const content = editor.current.getContents();
            console.log("Editor Content:", content);
            formData.append('description', content);
        }
        // // Append form fields to formData
        formData.append('name', values.name);
        formData.append('code', values.code);
        formData.append('id_category', values.category);
        formData.append('price', String(values.price));
        if (selectedFile) {
            // If a new image is selected, append it to the formData
            formData.append('image', selectedFile);
        }
        else {
            // If no new image is selected, use the existing image value
            formData.append('image', product?.product.image);
        }
        formData.append('status', String(0));
        try {
            const response = await updateProduct(formData);
        }
        catch (err) {

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
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
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
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const twoFunctions = (event: any) => {
        handleFileChange(event)
        handleChange(event)
    }
    //end add image 

    const getSunEditorInstance = (sunEditor: any) => {
        editor.current = sunEditor;
    };
    const { data: product } = useGetProductByIdQuery(id);
    const { data: categories } = useGetCategoriesQuery();
    console.log(product);
    const categoryMapping = {};
    categories?.categories.forEach((category) => {
        categoryMapping[category.name] = category.id;
    });
    const optionId = categories?.categories.map((item: any) => ({ value: item.id, label: item.name }));
    useEffect(() => {
        editor.current?.setContents(product?.product.description);
    }, [product]);

    return (
        <>
            <Button onClick={showDrawer}>
                Sửa
            </Button>
            <Drawer
                title="Update Product"
                width={720}
                onClose={onClose}
                visible={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}

            >

                <Form layout="vertical"
                    onFinish={onFinish}
                >
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
                                <img src={`http://127.0.0.1:8000${product?.product.image}`} className="w-full h-full" />

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
                                initialValue={product?.product.name}
                            >
                                <Input placeholder="Please enter a name" />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                label="Price"
                                initialValue={product?.product.price}
                            >
                                <Input placeholder="Please enter a price" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="Category"
                                initialValue={categoryMapping[product?.product.category_name]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a category"
                                    optionFilterProp="children"
                                    options={optionId.map((option) => ({
                                        ...option,
                                        value: categoryMapping[option.label], // Set the value to the category ID
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="code"
                        label="Code"
                        initialValue={product?.product.code}
                    >
                        <Input placeholder="Please enter a code" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        initialValue={product?.product.description}
                    >
                        <SunEditor getSunEditorInstance={getSunEditorInstance} />
                    </Form.Item>

                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form>
            </Drawer>
        </>
    );
};

export default Update;
