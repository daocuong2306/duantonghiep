import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

type Props = {};

const ConfirmPayment: React.FC<Props> = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
    const vnp_Amount = urlParams.get('vnp_Amount');
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

    // Parse amount and format it in VND
    const formattedAmount = formatAmountInVND(parseFloat(vnp_Amount));

    return vnp_ResponseCode == 0 ? (
        <Result
            status="success"
            title={`Bạn đã thanh toán thành công đơn hàng giá ${formattedAmount}`}
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
                <Link to='/'> <Button key="console" primary>
                    Tiếp tục mua hàng
                </Button>,</Link>
            ]}
        />
    ) : (
        <Result
            status="warning"
            title={`Bạn đã thanh toán thất bại đơn hàng giá ${formattedAmount}`}
            extra={
                <Link to='/payment'> <Button key="console" primary>
                    Quay lại thanh toán
                </Button></ Link>
            }
        />
    );
};

export default ConfirmPayment;
