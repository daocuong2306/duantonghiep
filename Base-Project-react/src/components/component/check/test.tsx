import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd';
import { Image, message } from 'antd';
import { useGetProductByIdQuery } from '@/api/product';
import { useGetCategoriesQuery } from '@/api/category';
import SunEditor from 'suneditor-react';

// ... (Previous code)

const Update: React.FC<{ id: string }> = ({ id }) => {
    // ... (Previous code)

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
                        <div className="image-preview">
                            {imageUrl ? (
                                <>
                                    <img src={imageUrl} alt="avatar" className="w-full h-full" />
                                    <Button
                                        onClick={() => {
                                            setImageUrl(undefined);
                                            setSelectedFile(null);
                                        }}
                                        className="delete-button"
                                    >
                                        Xóa
                                    </Button>
                                </>
                            ) : (
                                uploadButton
                            )}
                        </div>
                    </Upload>
                </div>
                <Form layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Image
                                width={200}
                                src={`http://127.0.0.1:8000${product?.product.image}`}
                            />
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
                                initialValue={product?.product.category_name}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a category"
                                    optionFilterProp="children"
                                    options={optionId}
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
