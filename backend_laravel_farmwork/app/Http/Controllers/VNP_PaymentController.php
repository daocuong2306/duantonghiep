<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VNP_PaymentController extends Controller
{
    public function CreatePayment(Request $request)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $vnp_TmnCode = "3RL42V4Z"; //Mã định danh merchant kết nối (Terminal Id)
        $vnp_HashSecret = "XGFKKDILCHTBYGSJYWUZPIJQCNHEKXQZ"; //Secret key
        $vnp_Url = "http://127.0.0.1:8000/api/returnPayment";
        $vnp_Returnurl = "http://localhost/vnpay_php/vnpay_return.php";
        $vnp_apiUrl = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
        $apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
        //Config input format
        //Expire
        $startTime = date("YmdHis");
        $expire = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));

        $vnp_TxnRef = rand(1, 10000); //Mã giao dịch thanh toán tham chiếu của merchant
        $vnp_Amount = $request->amount; // Số tiền thanh toán
        $vnp_Locale = $request->language; //Ngôn ngữ chuyển hướng thanh toán
        $vnp_BankCode = $request->bankCode; //Mã phương thức thanh toán
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR']; //IP Khách hàng thanh toán

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount * 100,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => "Thanh toan GD:" . $vnp_TxnRef,
            "vnp_OrderType" => "other",
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_ExpireDate" => $expire
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        return response()->json([
            'URL' => $vnp_Url,
        ]);
    }
    public function VNP_Return(Request $request)
    {
        $vnp_HashSecret = "XGFKKDILCHTBYGSJYWUZPIJQCNHEKXQZ";
        // $vnp_SecureHash = 'http://localhost/vnpay_php/vnpay_return.php?vnp_Amount=1000000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14146593&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+GD%3A857&vnp_PayDate=20231018135755&vnp_ResponseCode=00&vnp_TmnCode=3RL42V4Z&vnp_TransactionNo=14146593&vnp_TransactionStatus=00&vnp_TxnRef=857&vnp_SecureHash=012e5441c94f95f93951ef06469863ef065e03987de55225bd08505aa2a2700e323a7f08bdd8db4a86327ed4253796f89a4b6e38292f9addb42c6435597974ab';
        $inputData = array();
        foreach ( $_GET as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        // $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        return response()->json([
            'vnp_SecureHash' => $inputData
        ]);
    }
}
