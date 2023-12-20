import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Table } from 'antd';
import { useGetValueIdQuery } from '@/api/variant';

const Update: React.FC<{ id: string }> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { data: variants } = useGetValueIdQuery(id);
    const [currentRow, setCurrentRow] = useState(null);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleEdit = (dataIndex: any) => {
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
            render: (dataIndex: any) => (
                <span>
                    {dataIndex.map((value: any, index: any) => (
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
            render: (dataIndex: any, record: any) => (
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
            render: (dataIndex: any, record: any) => (
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
            render: (dataIndex: any, record: any) => (
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
            render: (dataIndex: any) => (
                <Button onClick={() => handleEdit(dataIndex)}>Sửa</Button>
            ),
        },
    ];

    const outputArray = variants?.handleVariant ? Object.values(variants.handleVariant) : [];
    const variantData: any = outputArray;

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
