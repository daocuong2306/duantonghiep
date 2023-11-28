import React from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Spin, Select } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetHistoryBillQuery } from '@/api/history';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

const HistoryBill = (props: Props) => {
    const { id } = useParams()
    const { data: historyData } = useGetHistoryBillQuery(id)
    console.log(historyData);
    
    const columnsHistory: TableColumnsType<DataType> = [
        { title: 'Tên người thay đổi', dataIndex: 'user_name', key: 'user_name' },
        {
            title: 'Trạng thái',
            dataIndex: 'infor_change',
            key: 'infor_change',
        },
        { title: 'Thời gian thay đổi', dataIndex: 'created_at', key: 'created_at' }
    ];
    const columnsCart: TableColumnsType<DataType> = [
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
        {
            title: 'Ảnh ',
            dataIndex: 'image',
            key: 'image',
            render: (key) => <img
                width="50px"
                src={`http://127.0.0.1:8000${key}`}
                alt="User Avatar"
            />
        },
        { title: 'Giá tiền', dataIndex: 'price', key: 'price' },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Kiểu dáng', dataIndex: 'option_values', key: 'option_values' }
    ];
    const newDataCart = historyData?.bill.cart.map(item => ({
        ...item,
        key: item.id
    }));
    const newDataHistory = historyData?.history.map(item => ({
        ...item,
        key: item.id
    }));
    const dataHistory: DataType[] = newDataHistory;
    const dataCart: DataType[] = newDataCart


    return (
        <div>
            <>
                <div className="rounded bg-white">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img
                                    className="rounded-circle mt-5"
                                    width="150px"
                                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                    alt="User Avatar"
                                />
                                <span className="font-weight-bold">Edogaru</span>
                                <span className="text-black-50">edogaru@mail.com.my</span>
                            </div>
                        </div>
                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <h3 className="text-center">Thông tin đơn hàng</h3>
                                <Table columns={columnsCart} dataSource={dataCart} />
                                Tổng giá : {historyData?.bill.total_price}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 py-5">
                                <h3 className='text-center'>Lịch sử thay đổi</h3>
                                <Table columns={columnsHistory} dataSource={dataHistory} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default HistoryBill