import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Spin, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useGetBillAdminQuery } from '@/api/adminBill';
import { useUpdateBillMutation } from '@/api/bill';

interface Bill {
    id: React.Key;
    user_name: string;
    address: string;
    order_status: string;
    payments: string;
    total_price: number;
    phone: string;
}

const BillDashboard: React.FC = () => {
    const { data: dataBill, refetch } = useGetBillAdminQuery();
    const [updateBill, { data: updateData }] = useUpdateBillMutation();
    const [loading, setLoading] = useState(false);
    const handleStatusChange = (orderId: React.Key, value: string) => {
        console.log(`Order ID ${orderId} status changed to ${value}`);
        const updatedData = {
            id: orderId,
            count: {
                order_status: value
            }
        };
        updateBill(updatedData);
        setLoading(true);
    };

    useEffect(() => {
        console.log(updateData);
        if (updateData?.message === "Hóa đơn được cập nhật thành công") {
            // Refresh the useGetBillAdminQuery after successful update
            setLoading(false);
        }
    }, [updateData]);
    useEffect(() => {
        // Refetch dataCart whenever the component mounts
        refetch();
    }, []);
    const orderStatusOptions = ["Pending", "Browser", "Transport", "Cancel", "Success"];
    const checkStatus = {
        "Pending": "Chờ duyệt",
        "Browser": "Đã duyệt",
        "Transport": "Vận Chuyển",
        "Cancel": "Hủy Đơn",
        "Success": "Thành công"
    }
    const columns = [
        { title: 'Tên', dataIndex: 'user_name', key: 'user_name' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        {
            title: 'Trạng thái',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (orderStatus: string, record: Bill) => (
                <Select
                    defaultValue={orderStatus}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    disabled={orderStatus === 'Success' || orderStatus === 'Cancel'}
                >
                    {orderStatusOptions.map((option) => (
                        <Select.Option
                            key={option}
                            value={option}
                            disabled={
                                (orderStatus == 'Pending' && option == 'Pending') ||
                                (orderStatus == 'Browser' && option == 'Browser') ||
                                (orderStatus == 'Transport' && (option == 'Pending' || option == 'Browser'))
                            }
                        >
                            {checkStatus[option]}
                        </Select.Option>
                    ))}
                </Select>

            ),
        },
        { title: 'Kiểu thanh toán', dataIndex: 'payments', key: 'payments' },
        { title: 'Tổng giá', dataIndex: 'total_price', key: 'total_price' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Hành động',
            key: 'id',
            dataIndex: 'id',
            render: (id: React.Key) => (
                <Space wrap>
                    <Link to={`/admin/historybills/${id}`}>
                        <Button type="primary" danger>
                            Xem chi tiết đơn hàng
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];

    const transformedData = dataBill?.map(item => ({
        ...item,
        key: item.id
    })) as Bill[];

    return (
        <Spin spinning={loading} className="pl-[50%]">
            <Table columns={columns} dataSource={transformedData} />
        </Spin>
    );
};

export default BillDashboard;
