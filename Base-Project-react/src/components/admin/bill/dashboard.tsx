import React from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Spin, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useGetBillAdminQuery } from '@/api/adminBill';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

const BillDashboard: React.FC = () => {
    const { data: dataBill } = useGetBillAdminQuery()
    console.log(dataBill);
    const handleStatusChange = (orderId, value) => {
        // Implement logic to update the order status in your data
        console.log(`Order ID ${orderId} status changed to ${value}`);
    };

    const orderStatusOptions = ["Đang chờ xử lý", "Đã xác nhận", "Đang giao hàng", "Hoàn thành"]; // Add your order status options


    const columns: TableColumnsType<DataType> = [
        { title: 'Tên', dataIndex: 'user_name', key: 'user_name' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        {
            title: 'Trạng thái',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (orderStatus, record) => (
                <Select
                    defaultValue={orderStatus}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    disabled={orderStatus === 'Hoàn thành'} // Disable when order status is 'Hoàn thành'
                >
                    {orderStatusOptions.map((option) => (
                        <Select.Option key={option} value={option}>
                            {option}
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
            key: 'operation',
            dataIndex: 'optionId',
            render: (optionId) => (
                <>
                    <Space wrap>
                        <Button type="primary" danger onClick={() => deleteO(optionId)}>
                            Xóa
                        </Button>
                    </Space>
                </>
            ),
        },
    ];

    const newData = dataBill?.map(item => ({
        ...item,
        key: item.id
    }));
    console.log(dataBill);

    const data: DataType[] = newData;

    return (
        <>
            <Spin spinning={false} className="pl-[50%]">
                <Spin spinning={false} className="pl-[50%]">
                    <Link to={'/admin/historybills'}>
                        <Button>Xem lịch sử</Button>

                    </Link>
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </Spin>
            </Spin>
        </>
    );
};

export default BillDashboard;
