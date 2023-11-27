import React from 'react';
import type { TableColumnsType } from 'antd';
import { Button, Table, Space, Spin, Select } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetHistoryBillQuery } from '@/api/history';
import { Product } from './test';
import { useGetProductByIdQuery } from '@/api/product';
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

const HistoryBill = (props: Props) => {
    const { id } = useParams()
    console.log(id);
    const { data: historyData } = useGetHistoryBillQuery(id)
    console.log(historyData);
    const columns: TableColumnsType<DataType> = [
        { title: 'Tên người thay đổi', dataIndex: 'user_name', key: 'user_name' },
        {
            title: 'Trạng thái',
            dataIndex: 'infor_change',
            key: 'infor_change',
        },
        { title: 'Thời gian thay đổi', dataIndex: 'created_at', key: 'created_at' }
    ];
    const newData = historyData?.history.map(item => ({
        ...item,
        key: item.id
    }));
    console.log(historyData);

    const data: DataType[] = newData;

    return (
        <div>
            <>
                <Spin spinning={false} className="pl-[50%]">
                    <Spin spinning={false} className="pl-[50%]">
                        <div className="container mt-5 mb-5">
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-10">
                                    {/* <Product
                                        name={productIdData?.product.name}
                                        ratings={4}
                                        description={productIdData?.product.description}
                                        discountedPrice={productIdData?.product.price}
                                        imageUrl={`http://127.0.0.1:8000${productIdData?.product.image}`}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data}
                        />
                    </Spin>
                </Spin>
            </>
        </div>
    )
}

export default HistoryBill