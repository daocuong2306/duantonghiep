import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAddBillMutation } from '@/api/bill';

type Props = {};

const ConfirmPayment: React.FC<Props> = () => {
    const [addBill] = useAddBillMutation();
    const urlParams = new URLSearchParams(window.location.search);

    const vnp_ResponseCode: any = urlParams.get('vnp_ResponseCode');
    const vnp_Amount: any = urlParams.get('vnp_Amount');
    const vnp_PayDate = urlParams.get('vnp_PayDate');

    // Error handling for missing parameters
    if (!vnp_ResponseCode || !vnp_Amount || !vnp_PayDate) {
        return <Result status="error" title="Error: Missing parameters" />;
    }

    // Function to format amount in VND
    // Function to format amount in VND without trailing zeros
    const formatAmountInVND = (amount: number) => {
        const amountInVND = amount;
        const formattedAmount = amountInVND.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        // Remove trailing zeros
        const withoutTrailingZeros = formattedAmount.replace(/(\.00)$/, '');

        return withoutTrailingZeros;
    };
    const handleAddBill = () => {
        const dataBillString = localStorage.getItem('dataBill');
        if (dataBillString !== null) {
            const dataBill = JSON.parse(dataBillString);
            addBill(dataBill);
        }
    }
    useEffect(() => {
        if (vnp_ResponseCode == 0) {
            // If vnp_ResponseCode is 0, call the handleAddBill function
            handleAddBill();
        }
    }, []);
    // Parse amount and format it in VND
    const formattedAmount: any = formatAmountInVND(parseFloat((vnp_Amount / 100).toString()));

    return <div className='mt-[50px]'>
        {vnp_ResponseCode == 0 ? (
            <Result
                status="success"
                title={`Bạn đã thanh toán thành công đơn hàng giá ${formattedAmount}`}
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                    <Link to='/' key="continueShopping">
                        <Button key="console">
                            Tiếp tục mua hàng
                        </Button>
                    </Link>,
                ]}
            />
        ) : (
            <Result
                status="warning"
                title={`Bạn đã thanh toán thất bại đơn hàng giá ${formattedAmount}`}
                extra={
                    <Link to='/payment' key="goBackToPayment">
                        <Button key="console">
                            Quay lại thanh toán
                        </Button>
                    </Link>
                }
            />
        )}
    </div>
};

export default ConfirmPayment;
