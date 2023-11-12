import React from 'react'
import { useGetCartQuery } from '@/api/cart'
import { useForm } from "react-hook-form";
import { usePaymentOnlineMutation } from '@/api/payment';
type Props = {}

const PaymentOnline = (props: Props) => {
    const { register, handleSubmit } = useForm();
    const [paymentP, { data }] = usePaymentOnlineMutation()
    const { data: dataCart } = useGetCartQuery()
    const onHandleSubmit = (dataUser: any) => {
        paymentP({ amount: dataCart?.total_amount, language: dataUser.language, bankCode: dataUser.bankCode });
    };
    console.log(data);

    return (
        <div className="container">
            <h3>Tạo mới đơn hàng</h3>
            <div className="table-responsive">
                <form action="/vnpay_php/vnpay_create_payment.php" id="frmCreateOrder" method="post" onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="form-group">
                        <label htmlFor="amount">Số tiền</label>
                        <input
                            className="form-control"
                            data-val="true"
                            data-val-number="The field Amount must be a number."
                            data-val-required="The Amount field is required."
                            id="amount"
                            max="100000000"
                            min="1"
                            name="amount"
                            type="number"
                            value={`${dataCart?.total_amount}`} />
                    </div>
                    <h4>Chọn phương thức thanh toán</h4>
                    <div className="form-group">
                        <h5>Cách 1: Chuyển hướng sang Cổng VNPAY chọn phương thức thanh toán</h5>
                        <input
                            type="radio"
                            Checked="True"
                            id="bankCode"
                            name="bankCode"
                            value=""
                            {...register('bankCode')}
                        />
                        <label htmlFor="bankCode">Cổng thanh toán VNPAYQR</label><br />
                        <h5>Cách 2: Tách phương thức tại site của đơn vị kết nối</h5>
                        <input
                            type="radio"
                            id="bankCode"
                            name="bankCode"
                            value="VNPAYQR"
                            {...register('bankCode')}
                        />
                        <label htmlFor="bankCode">Thanh toán bằng ứng dụng hỗ trợ VNPAYQR</label><br />

                        <input
                            type="radio"
                            id="bankCode"
                            name="bankCode"
                            value="VNBANK"
                            {...register('bankCode')}
                        />
                        <label htmlFor="bankCode">Thanh toán qua thẻ ATM/Tài khoản nội địa</label><br />

                        <input
                            type="radio"
                            id="bankCode"
                            name="bankCode"
                            value="INTCARD"
                            {...register('bankCode')}
                        />
                        <label htmlFor="bankCode">Thanh toán qua thẻ quốc tế</label><br />

                    </div>
                    <div className="form-group">
                        <h5>Chọn ngôn ngữ giao diện thanh toán:</h5>
                        <input
                            type="radio"
                            id="language"
                            Checked="True"
                            name="language"
                            value="vn"
                            {...register('language')}
                        />
                        <label htmlFor="language">Tiếng việt</label><br />
                        <input
                            type="radio"
                            id="language"
                            name="language"
                            value="en"
                            {...register('language')}
                        />
                        <label htmlFor="language">Tiếng anh</label><br />
                        <div>
                            <button type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >Thanh toán</button>
                        </div>
                    </div>
                </form>
                <p>
                    &nbsp;
                </p>
                <footer className="footer">
                    <p>&copy; VNPAY 2020</p>
                </footer>
            </div>
        </div>
    )
}

export default PaymentOnline
// $vnp_Amount = $request -> amount; // Số tiền thanh toán
// $vnp_Locale = $request -> language; //Ngôn ngữ chuyển hướng thanh toán
// $vnp_BankCode = $request -> bankCode; //Mã phương thức thanh toán