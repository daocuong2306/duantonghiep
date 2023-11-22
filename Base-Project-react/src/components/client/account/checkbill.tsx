import React, { useState } from 'react';
import { Avatar, List, Radio, Space } from 'antd';
import { useGetBillQuery } from '@/api/bill';
import { Link } from 'react-router-dom';



const Checkbill: React.FC = () => {
    const { data: billData } = useGetBillQuery()
    console.log(billData);
    const data = billData;

    return (
        <>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl ">
                <List
                 pagination={{
                  }}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item actions={[<p key="list-loadmore-edit">Trạng thái</p>, <p key="list-loadmore-more">Pending</p>]}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar    src={`http://127.0.0.1:8000${item?.cart[0].image}`}  />
                                }
                                title={<Link to="">{item.address}</Link>}
                                description={`Hình thức thanh toán ${item.payments} |
                                    Giá tiền : ${item.total_price}
                                `}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};

export default Checkbill;