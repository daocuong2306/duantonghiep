import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { Image } from 'antd';

import { useGetCategoryByIdQuery } from '@/api/category';
import Variant from '../Products/Variant';
const UpdateCategory: React.FC = (id: string) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    console.log(id);
    const { data: category } = useGetCategoryByIdQuery(id.id);
    console.log(category);
    return (
        <>
            <Button onClick={showDrawer} >
                Sửa
            </Button>
            <Drawer
                title="Tạo danh mục"
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
                                src={`http://127.0.0.1:8000${category?.categories.image}`}
                            />
                        </Col>
                        <Col span={12}>

                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                                initialValue={category?.categories.name}
                            >
                                <Input placeholder="Vui lòng nhập tên danh mục " />
                            </Form.Item>
                        </Col>
                    </Row>  
                </Form>
                
            </Drawer>
        </>
    );
};
export default UpdateCategory;