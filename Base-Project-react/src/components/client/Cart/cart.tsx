import { useGetCartQuery, useRemoveCartMutation, useUpdateCartMutation } from '@/api/cart'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, notification, Alert, Spin, Switch } from 'antd';
type Props = {}
const CartProduct = (props: Props) => {
    const { data: dataCart, refetch } = useGetCartQuery()
    console.log(dataCart);
    const [updateCart, { data: updateData, error }] = useUpdateCartMutation()
    const [deleteCart, { data: deleteData }] = useRemoveCartMutation()
    const [loading, setLoading] = useState(false);
    console.log(updateData);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (m, d) => {
        api.open({
            message: m,
            description: d
        });
    };
    const buttonCart = (id: any, count: any, quantity: any) => {
        const data = { id, count };
        if (quantity == 1) {
            if (count == -1) {
                const check = window.confirm("Bạn có muốn xóa sản phẩm này không ?")
                if (check) {
                    deleteCart(id);
                }
            } else {
                updateCart(data);
            }
        } else {
            updateCart(data);
        }
        setLoading(false)
    };
    const updateCartA = (id: any, count: any, quantity: any) => {
        const data = { id, count };
        updateCart(data);
        setLoading(true)
    }
    useEffect(() => {
        if (error) {
            openNotification("Số lượng của bạn đã vượt quá số lượng hàng còn trong kho", "");
            setLoading(false);
        }
    }, [error]);
    useEffect(() => {
        setLoading(false);
    }, [updateData, deleteData]);
    useEffect(() => {
        // Refetch dataCart whenever the component mounts
        refetch();
    }, []);
    return (
        <Spin spinning={loading}>
            {contextHolder}
            <div>
                <div className="container-fluid bg-secondary mb-5">
                    <div className="d-flex flex-column align-items-center justify-content-center h-[300px]" >
                        <h1 className="font-weight-semi-bold text-uppercase mb-3">Giỏ Hàng</h1>
                        <div className="d-inline-flex">
                            <p className="m-0"><a href="">Trang chủ</a></p>
                            <p className="m-0 px-2">-</p>
                            <p className="m-0">Giỏ Hàng</p>
                        </div>
                    </div>
                </div>


                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Loại</th>
                                        <th>Giá tiền</th>
                                        <th>Số lượng</th>
                                        <th>Tổng giá</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {dataCart?.carts?.map((cart: any) => (
                                        <tr key={cart.id}>
                                            <td className="align-middle d-flex justify-content-center align-items-center">
                                                <img src={`http://127.0.0.1:8000${cart.image_product}`} className='w-[50px]' alt="" />
                                                <p>{cart.name_product}</p>
                                            </td>
                                            <td className="align-middle">{`${cart.option_value[0]} - ${cart.option_value[1]}`}</td>
                                            <td className="align-middle">${cart.sku_price}</td>
                                            <td className="align-middle">
                                                <div className="input-group quantity mx-auto w-[100px]">
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-primary btn-minus " onClick={() => { buttonCart(cart.id, -1, cart.quantity) }}>
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input type="text" className="form-control form-control-sm bg-secondary text-center" value={`${cart.quantity}`} />
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-primary btn-plus" onClick={() => { updateCartA(cart.id, 1, cart.quantity) }}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">${cart.total_price}</td>
                                            <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => { buttonCart(cart.id, -1, 1) }}><i className="fa fa-times"></i></button></td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            {/* <form className="mb-5" action="">
                                <div className="input-group">
                                    <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary">Thêm mã </button>
                                    </div>
                                </div>
                            </form> */}
                            <div className="card border-secondary mb-5">
                                <div className="card-header bg-secondary border-0">
                                    <h4 className="font-weight-semi-bold m-0">Thành tiền</h4>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3 pt-1">
                                        <h6 className="font-weight-medium">Tổng tiền</h6>
                                        <h6 className="font-weight-medium">${dataCart?.total_amount}</h6>
                                    </div>
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5 className="font-weight-bold">Thanh toán</h5>
                                        <h5 className="font-weight-bold">${dataCart?.total_amount}</h5>
                                    </div>
                                    <Link to="/bill"><button className="btn btn-block btn-primary my-3 py-3">Thanh Toán</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default CartProduct