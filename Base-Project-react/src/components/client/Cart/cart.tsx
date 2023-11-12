import { useGetCartQuery } from '@/api/cart'
import React from 'react'

type Props = {}
const CartProduct = (props: Props) => {
    const { data: dataCart } = useGetCartQuery()
    console.log(dataCart);

    return (
        <div>
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center h-[300px]" >
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
                    <div className="d-inline-flex">
                        <p className="m-0"><a href="">Home</a></p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Shopping Cart</p>
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
                                {dataCart?.carts.map((cart: any) => (
                                    <tr key={cart.id}>
                                        <td className="align-middle d-flex justify-content-center align-items-center">
                                            <img src={`http://127.0.0.1:8000${cart.image_product}`} className='w-[50px]' alt="" />
                                            <p>Colorful Stylish Shirt</p>
                                        </td>
                                        <td className="align-middle">{`${cart.option_value[0]} - ${cart.option_value[1]}`}</td>
                                        <td className="align-middle">${cart.sku_price}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto w-[100px]">
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus">
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm bg-secondary text-center" value={`${cart.quantity}`} />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus">
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">$150</td>
                                        <td className="align-middle"><button className="btn btn-sm btn-primary"><i className="fa fa-times"></i></button></td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-5" action="">
                            <div className="input-group">
                                <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Subtotal</h6>
                                    <h6 className="font-weight-medium">${dataCart?.total_amount}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">$10</h6>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Total</h5>
                                    <h5 className="font-weight-bold">${dataCart?.total_amount}</h5>
                                </div>
                                <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct