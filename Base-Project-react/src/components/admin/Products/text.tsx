import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Table } from 'antd';
import { useGetValueIdQuery, useUpdateVariantMutation } from '@/api/variant';

const Update: React.FC<{ id: string }> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { data: variants } = useGetValueIdQuery(id);
    const [updateVariant] = useUpdateVariantMutation();
    const [currentRow, setCurrentRow] = useState(null);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleEdit = (dataIndex) => {
        setCurrentRow(dataIndex);
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            console.log('Changed values for current row:', values);
            // Perform your logic with changed values here
            setCurrentRow(null); // Reset currentRow after handling the changes
        });
    };

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
        {
            title: 'Chức năng',
            dataIndex: 'sku_id',
            key: 'sku_id',
            render: (dataIndex) => (
                <Button onClick={() => handleEdit(dataIndex)}>Sửa</Button>
            ),
        },
    ];

    const outputArray = variants?.handleVariant ? Object.values(variants.handleVariant) : [];
    const variantData: DataType[] = outputArray;

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
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    autoComplete="off"
                    onValuesChange={(changedValues) => {
                        if (currentRow !== null) {
                            console.log('Changed values for current row:', changedValues);
                        }
                    }}
                >
                    <Table columns={columns} dataSource={variantData} />
                    <Button type="primary" onClick={handleSubmit}>
                        Gửi
                    </Button>
                </Form>
            </Drawer>
        </>
    );
};

export default Update;
