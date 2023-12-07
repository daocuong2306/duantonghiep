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
            title: 'Kiểu dáng',
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
            title: 'Giá',
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
            title: 'Sô lượng',
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
        }
    ];

    const onFinish = (values: any) => {
        const formDataArray = valueVariant?.variant.map((item) => {
            const randomSuffix = Math.floor(Math.random() * 1000); // Adjust the range as needed
            const sku = `${check?.id}${randomSuffix}`;
            return {
                option_value: item.map((i) => i.id),
                price: Number(values[`price${item.map((i) => i.id).join(',')}`]),
                stock: Number(values[`Stock${item.map((i) => i.id).join(',')}`]),
                sku: sku,
                product_id: check?.id,
            };
        });
        console.log(formDataArray);

        addVariant({
            variants: formDataArray,
        });
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
        url('/admin/dashboard')
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
                title="Thêm biến thể"
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
                    <Table columns={columns} dataSource={variantData} pagination={false} />
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
