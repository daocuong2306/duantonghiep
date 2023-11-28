import React, { useState } from 'react';
import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';
import { useCancelBillMutation, useGetBillQuery } from '@/api/bill';

const Checkbill: React.FC = () => {
    const { data: dataBill } = useGetBillQuery();
    const [cancelBill] = useCancelBillMutation();
    const onCancelBill = (id: any) => {
        const product = {
            id,
            count: {
                "order_status": "Cancel"
            }
        };
        cancelBill(product);
    };

    return (
        <>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl ">
                <List
                    pagination={{}}
                    dataSource={dataBill}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <p key="list-loadmore-edit">Trạng thái</p>,
                                <p key="list-loadmore-more">{item.order_status}</p>,
                                item.order_status === "Pending" || item.order_status === "Browser" ? (
                                    <p key="list-loadmore-cancel">
                                        <button className='btn btn-danger' onClick={() => { onCancelBill(item.id) }}>Hủy đơn</button>
                                    </p>
                                ) : null
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={`http://127.0.0.1:8000${item?.cart[0].image}`} />}
                                title={<Link to="">{item.address}</Link>}
                                description={`Hình thức thanh toán ${item.payments} | Giá tiền : ${item.total_price}`}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};

export default Checkbill;
