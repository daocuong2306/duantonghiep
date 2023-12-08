import { useAddBillMutation } from '@/api/bill'
import { useGetCartQuery } from '@/api/cart'
import { Spin, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


const Bill = () => {
    const storedValue = localStorage.getItem('codeDiscount');
    let code;
    if (storedValue !== null) {
        code = JSON.parse(storedValue);
    } else {
        // Handle the case when the item is not found in local storage
        // For example, you can provide a default value or show an error message
        code = 'defaultDiscountCode'; // replace this with your default value
    }
    console.log("code", code);

    const { data: cartData }: { data: any } = useGetCartQuery(code) as {
        data: any;
    };

    const [addBill, { data: addData, error }] = useAddBillMutation()
    console.log(cartData);
    const aUrl = useNavigate()
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        const ids = cartData?.carts.map((item: any) => item.id);
        const discount = cartData?.checkDiscount.id
        const price = cartData?.total_amount
        const formData = {
            "address": data.address,
            "phone": data.phoneNumber,
            "payments": data.paymentMethod,
            "carts_id": ids,
            "order_status": "Pending",
            "discount_id": discount,
            "total_price": price
        }

        if (data.paymentMethod == "ON") {
            localStorage.setItem("dataBill", JSON.stringify(formData));
            aUrl("/payment")
            console.log(1);
            return;
        } else if (data.paymentMethod == "OFF") {
            addBill(formData);
            console.log("formData", formData);
            setLoading(true);
        } else {
            const checkBill = window.confirm("Bạn chưa chọn kiểu thức thanh toán , nếu đồng ý đơn hàng của bạn sẽ mặc định là off")
            if (checkBill) {
                addBill(formData);
                setLoading(true);
            }
        }
    };
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (m: any, d: any) => {
        api.open({
            message: m,
            description: d
        });
    };
    console.log(error);
    useEffect(() => {
        if (error) {
            openNotification("Bạn vui lòng nhập Số điện thoại và địa chỉ nhận hàng", "");
            setLoading(false);
        }
    }, [error]);
    console.log(addData);
    if (addData) {
        aUrl('/account')
    }
    // if(addData == "")
    const status: any = localStorage.getItem("status");

    return (
        <Spin spinning={loading}>
            {contextHolder}
            <div>
                <section >
                    <div className="container py-5 mt-[50px]">
                        <div className="card">
                            <div className="card-body">
                                <div className="row d-flex justify-content-center pb-5">
                                    <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                                        <div className="py-4 d-flex flex-row">
                                            <h5><span className="far fa-check-square pe-2"></span><b>Phương thức thanh toán</b> |</h5>
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


                                                {status == 0 ? (
                                                    <div className="d-flex flex-row pb-3">
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
                                                    </div>
                                                ) : (
                                                    <p>Bạn đã bị ban và không thể sử dụng thanh toán khi nhận hàng. Vui lòng liên hệ admin.</p>
                                                )}


                                                <button type="submit" className="btn btn-primary btn-block btn-lg" >Thanh toán</button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="col-md-5 col-xl-4 offset-xl-1">

                                        <div className="rounded d-flex flex-column p-2" >
                                            <div className="p-2 me-3">
                                                <h4>Thông tin đơn hàng</h4>
                                                <hr />
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
                                                <div className="col-8">Giảm giá</div>
                                                <div className="ms-auto">{cartData?.checkDiscount.amount}%</div>
                                            </div>

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
        </Spin>
    )
}

export default Bill