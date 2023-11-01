import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { Image } from 'antd';
import { useGetProductByIdQuery } from '@/api/product';
import Variant from './Variant';
import { useGetCategoriesQuery } from '@/api/category';
const Update: React.FC = (id: string) => {
    if (id) {
        const [open, setOpen] = useState(false);
        const showDrawer = () => {
            setOpen(true);
        };
        const onChange = (value: any) => {
            console.log(`selected ${value}`);
            setselectedCate(value)
        };
        const onClose = () => {
            setOpen(false);
        };
        const onSearch = (value: any) => {
            console.log('search:', value);
        };
        const filterOption = (input: string, option?: { label: string; value: string }) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
        const { data: product } = useGetProductByIdQuery(id.id);
        const { data: categories } = useGetCategoriesQuery();
        console.log(product);
        const optionId = categories?.categories.map((item: any) => ({ value: item.id, label: item.name }));
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
                                    initialValue={product?.product.category_name}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        filterOption={filterOption}
                                        options={optionId}
                                    />
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
    }
};
export default Update;