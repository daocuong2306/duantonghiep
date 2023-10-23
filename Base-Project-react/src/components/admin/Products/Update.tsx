import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { Image } from 'antd';
import { useGetProductByIdQuery } from '@/api/product';
import Variant from './Variant';
const Update: React.FC = (id: string) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    console.log(id);
    const { data: product } = useGetProductByIdQuery(id.id);
    console.log(product);
    return (
        <>
            <Button onClick={showDrawer} >
                Sửa
            </Button>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}

            >
                <Form layout="vertical" hideRequiredMark>
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
                                rules={[{ required: true, message: 'Please enter user name' }]}
                                initialValue={product?.product.name}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="description"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                                initialValue={product?.product.description}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="Loại"
                                rules={[{ required: true, message: 'Please choose the type' }]}
                                initialValue={product?.product.description}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="code"
                                label="Mã"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                                initialValue={product?.product.code}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="price"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                                initialValue={product?.product.price}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Variant id={id} />
            </Drawer>
        </>
    );
};
export default Update;