import React, { useState } from 'react';
import { Button, Modal, Table, Input, Form, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAddValueMutation } from '@/api/variant';
import { Link, useNavigate } from "react-router-dom";
const SelectVarint: React.FC = (check: boolean) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(check.check || false);
    const valueVariant = check.data;
    const [addVariant, { data, isLoading, error }] = useAddValueMutation();
    const url = useNavigate();
    const handleCancel = () => {
        setOpen(false);
    };
    console.log(check);

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
                product_id: check?.id
            };
        });
        console.log(formDataArray);

        addVariant({
            "variants": formDataArray
        })
    };
    //thông báo lỗi
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (e: any) => {
        api.open({
            message: e,
        });
    };
    if (error) {
        console.log(error?.data.errors);
        openNotification(error?.data.errors.sku[0]);
    }

    if (!isLoading && !error && data?.msg) {
        openNotification(data?.msg);
        url('/admin')
    }
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
                title="Title âcsca"
                onCancel={handleCancel}
                footer={null}
                width={800} // Đặt chiều ngang thành 800px hoặc giá trị tùy chỉnh của bạn
            >
                {contextHolder}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 800 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Table columns={columns} dataSource={variantData} />
                    <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                        <Button htmlType="submit">
                            Gửi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SelectVarint;
