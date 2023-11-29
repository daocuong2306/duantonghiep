import React, { useState, useRef, useEffect } from 'react';
import { Button, Drawer, Form, Input, Table } from 'antd';
import { useGetValueIdQuery, useUpdateVariantMutation } from '@/api/variant';

const Update: React.FC<{ id: string }> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // Call variant
    const { data: variants } = useGetValueIdQuery(id);
    const [updateVariant, { data: dataUpdate }] = useUpdateVariantMutation();

    // Column variant
    const columns = [
        {
            title: 'Name',
            dataIndex: 'option_value',
            key: 'option_value',
            render: (dataIndex) => (
                <span>
                    {dataIndex.map((value, index) => (
                        <React.Fragment key={index}>
                            {value}
                            {index < dataIndex.length - 1 && ' - '}
                        </React.Fragment>
                    ))}
                </span>
            ),
        },
        {
            title: 'Giá của từng mẫu',
            dataIndex: 'skus_price',
            key: 'sku_id',
            render: (dataIndex, record) => (
                <Form.Item
                    name={`price${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock',
            key: 'sku_id',
            render: (dataIndex, record) => (
                <Form.Item
                    name={`Stock${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input defaultValue={dataIndex} />
                </Form.Item>
            ),
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'sku_id',
            key: 'sku_id',
            render: (dataIndex, record) => (
                <Form.Item
                    name={`sku${record.sku_id}`} // Thay đổi tên trường Form
                    initialValue={dataIndex}
                >
                    <Input disabled />
                </Form.Item>
            ),
        },
        ,
        {
            title: 'Chức năng',
            dataIndex: 'sku_id',
            key: 'sku_id',
            render: (dataIndex, key, record) => {
                return <Button onClick={() => onUpdateVariant(key, record)}>Sửa</Button>
            },
        },
    ];

    const outputArray = variants?.handleVariant ? Object.values(variants.handleVariant) : [];
    const variantData: DataType[] = outputArray;
    // end variant
    //update Variant
    const onUpdateVariant = (key, record) => {
        console.log( record);

        const data = {
            id,
            formData: {
                "price": key.skus_price,
                "stock": key.stock,
                "sku": key.sku_id
            }
        }
        updateVariant(data)
    }

    // onfinish
    const onFinishForm = (values) => {

    };
    return (
        <>
            <Button onClick={showDrawer}>Sửa</Button>
            <Drawer
                title="Update Product"
                width={720}
                onClose={onClose}
                visible={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishForm}
                    autoComplete="off"
                >
                    <Table columns={columns} dataSource={variantData} />
                    <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                        <Button htmlType="submit">Gửi</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default Update;
