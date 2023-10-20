import React, { useState } from 'react';
import { Button, Modal, Table, Input, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAddValueMutation } from '@/api/variant';

const SelectVarint: React.FC = (check: boolean) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(check.check || false);
    const valueVariant = check.data;
    const [addVariant] = useAddValueMutation();
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Price',
            dataIndex: 'key',
            key: 'price',
            render: (dataIndex) => (
                <Form.Item
                    name={`price${dataIndex}`} // Thay đổi tên trường Form
                    rules={[{ required: true, message: 'Please input your Price!' }]}
                >
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Stock',
            dataIndex: 'key',
            key: 'Stock',
            render: (dataIndex) => (
                <Form.Item
                    name={`Stock${dataIndex}`} // Thay đổi tên trường Form
                    rules={[{ required: true, message: 'Please input your Stock!' }]}
                >
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Sku',
            dataIndex: 'key',
            key: 'Sku',
            render: (dataIndex) => (
                <Form.Item
                    name={`Sku${dataIndex}`} // Thay đổi tên trường Form
                    rules={[{ required: true, message: 'Please input your Sku!' }]}
                >
                    <Input />
                </Form.Item>
            ),
        },
    ];

    const onFinish = (values: any) => {
        const formDataArray = valueVariant?.variant.map((item) => {
            return {
                option_value: item.map((i) => i.id),
                price: Number(values[`price${item.map((i) => i.id).join(',')}`]), // Sử dụng id để truy cập giá trị Form
                stock: Number(values[`Stock${item.map((i) => i.id).join(',')}`]), // Sử dụng id để truy cập giá trị Form
                sku: Number(values[`Sku${item.map((i) => i.id).join(',')}`]), // Sử dụng id để truy cập giá trị Form
                product_id: check?.id.id.id
            };
        });
        addVariant({
            "variants": formDataArray
        })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const variantData: DataType[] = valueVariant?.variant.map((item) => ({
        key: item.map((i) => i.id),
        name: item.map((i) => i.value)
    }));

    return (
        <>
            <Modal
                visible={open} // Thay đổi "open" thành "visible"
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Table columns={columns} dataSource={variantData} />
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SelectVarint;
