import React, { useState } from 'react';
import { Button, Modal, Table, Input, Form, notification } from 'antd';
import { useAddValueMutation } from '@/api/variant';
import { useNavigate } from "react-router-dom";
const SelectVarint: React.FC<any> = (check: any) => {
    const [open, setOpen] = useState((typeof check === 'object' && check.check) || false);
    const valueVariant = check.data;
    const [addVariant, { data, isLoading, error }] = useAddValueMutation();
    const url = useNavigate();
    const handleCancel = () => {
        setOpen(false);
    };
    console.log(check);
    const columns: any = [
        {
            title: 'Kiểu dáng',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Giá',
            dataIndex: 'key',
            key: 'price',
            render: (dataIndex: any) => (
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
            render: (dataIndex: any) => (
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
        const formDataArray = valueVariant?.variant.map((item: any) => {
            const randomSuffix = Math.floor(Math.random() * 1000); // Adjust the range as needed
            const sku = `${check?.id}${randomSuffix}`;
            return {
                option_value: item.map((i: any) => i.id),
                price: Number(values[`price${item.map((i: any) => i.id).join(',')}`]),
                stock: Number(values[`Stock${item.map((i: any) => i.id).join(',')}`]),
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
        if ('error' in error) {
            // 'error' is of type 'FetchBaseQueryError'
            console.log('FetchBaseQueryError:', error.error);
        } else if ('status' in error) {
            // 'error' is of type '{ status: number; data: unknown; }'
            console.log('Custom Error:', error.status, error.data);
        } else {
            // 'error' is of type 'SerializedError'
            console.log('Serialized Error:', error.message);
            // Handle or log the error as needed
        }
    }




    if (!isLoading && !error && data?.msg) {
        openNotification(data?.msg);
        url('/admin/dashboard')
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const variantData: any[] = valueVariant?.variant.map((item: any) => ({
        key: item.map((i: any) => i.id),
        name: item.map((i: any) => i.value)
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
