import { useAddBillMutation, useGetBillQuery, useUpdateBillMutation } from '@/api/bill'
import { useGetCartQuery } from '@/api/cart'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Bill = (props: Props) => {
    const { data: cartData } = useGetCartQuery()
    const [addBill] = useAddBillMutation()
    console.log(cartData);
    const aUrl = useNavigate()
    const { register, handleSubmit, watch, setValue } = useForm();
    const onSubmit = (data: any) => {
        const ids = cartData?.carts.map(item => item.id);
        const formData = {
            "address": data.address,
            "phone": data.phoneNumber,
            "payments": data.paymentMethod,
            "carts_id": ids,
            "order_status": "Pending"
        }

        if (data.paymentMethod == "ON") {
            localStorage.setItem("dataBill", JSON.stringify(formData));
            aUrl("/payment")
            console.log(1);
            return;
        } else {
            addBill(formData);
            aUrl('/account/bill')
        }
    };
    const status = localStorage.getItem("status");

    return (
        <div>
            <section >
                <div className="container py-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row d-flex justify-content-center pb-5">
                                <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                                    <div className="py-4 d-flex flex-row">
                                        <h5><span className="far fa-check-square pe-2"></span><b>ELIGIBLE</b> |</h5>
                                        <span className="ps-2">Pay</span>
                                    </div>
                                    <h4 className="text-success">{cartData?.total_amount}VND</h4>
                                    <h4>Trách nhiệm và bảo hành</h4>
                                    <div className="d-flex pt-2">

                                    </div>
                                    <p>
                                        Yêu cầu bảo hiểm và tất cả các phụ thuộc cần thiết sẽ được gửi cho công ty bảo hiểm của bạn cho phần được bảo hiểm của đơn đặt hàng này
                                    </p>
                                    <hr />
                                    <div className="pt-2">
                                        <div className="d-flex pb-2">

                                        </div>
                                        <p>
                                            Đây là ước tính cho phần đơn đặt hàng của bạn (không được bao gồm bởi
                                            bảo hiểm) đến hạn ngày hôm nay . Sau khi bảo hiểm hoàn tất việc hoàn trả đánh giá của họ
                                            và / hoặc số dư sẽ tự động điều chỉnh.
                                        </p>

                                        <form className="pb-3" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="d-flex flex-row pb-3">
                                                <input
                                                    type="number"
                                                    className="form-control ml-4"
                                                    placeholder="Số điện thoại"
                                                    aria-label="STD"
                                                    {...register('phoneNumber')}
                                                />
                                            </div>
                                            <div className="d-flex flex-row pb-3">
                                                <input
                                                    type="text"
                                                    className="form-control ml-4"
                                                    placeholder="Địa chỉ"
                                                    aria-label="Địa chỉ"
                                                    {...register('address')}
                                                />
                                            </div>
                                            <div className="d-flex flex-row pb-3">
                                                <div className="d-flex align-items-center pe-2">
                                                    <input
                                                        type="radio"
                                                        {...register('paymentMethod')}
                                                        id="radioNoLabel1"
                                                        value="ON"
                                                    />
                                                </div>
                                                <div className="rounded border d-flex w-100 p-3 align-items-center">
                                                    <p className="mb-0">
                                                        <i className="fab fa-cc-visa fa-lg text-primary pe-2"></i>Thanh toán online
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row pb-3">
                                                {status == 0 ? <div>
                                                    <div className="d-flex align-items-center pe-2">
                                                        <input
                                                            type="radio"
                                                            {...register('paymentMethod')}
                                                            id="radioNoLabel2"
                                                            value="OFF"
                                                        />
                                                    </div>
                                                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                                                        <p className="mb-0">
                                                            <i className="fab fa-brands fa-stripe-s fa-lg text-dark pe-2"></i>Trả tiền khi nhận hàng
                                                        </p>
                                                    </div>
                                                </div> : <p>Bạn đã bị ban và không thể sử dụng thanh toán khi nhận hàng vui long liên hệ admin</p>}
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-block btn-lg" >Thanh toán</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="col-md-5 col-xl-4 offset-xl-1">
                                    <div className="py-4 d-flex justify-content-end">
                                        <h6><a href="#!">Cancel and return to website</a></h6>
                                    </div>
                                    <div className="rounded d-flex flex-column p-2" >
                                        <div className="p-2 me-3">
                                            <h4>Order Recap</h4>
                                        </div>
                                        {cartData?.carts.map((cart: any) => {
                                            return <div>
                                                <div className="p-2 d-flex">
                                                    <div className="col-8">Tên sản phẩm</div>
                                                    <div className="ms-auto">{cart.name_product} </div>
                                                </div>
                                                <div className="p-2 d-flex">
                                                    <div className="col-8">Giá sản phẩm</div>
                                                    <div className="ms-auto">{cart.price_cart}x {cart.quantity}</div>
                                                </div>
                                                <div className="border-top px-2 mx-2"></div>
                                            </div>
                                        })}
                                        <div className="p-2 d-flex">
                                            <div className="col-8">Tổng giá</div>
                                            <div className="ms-auto">{cartData?.total_amount}VND</div>
                                        </div>

                                        {/* <div className="p-2 d-flex">
                                            <div className="col-8">Giảm giá</div>
                                            <div className="ms-auto">0</div>
                                        </div> */}

                                        <div className="border-top px-2 mx-2"></div>
                                        {/* <div className="p-2 d-flex pt-3">
                                            <div className="col-8">Tổng số tiền được giảm</div>
                                            <div className="ms-auto">0</div>
                                        </div> */}


                                        <div className="border-top px-2 mx-2"></div>
                                        <div className="p-2 d-flex pt-3">
                                            <div className="col-8"><b>Tổng</b></div>
                                            <div className="ms-auto"><b className="text-success">{cartData?.total_amount}VND</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Bill