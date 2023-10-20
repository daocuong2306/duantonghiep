<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VNP_PaymentController extends Controller
{
    public function CreatePayment(Request $request)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $vnp_TmnCode = "3RL42V4Z"; //Mã định danh merchant kết nối (Terminal Id)
        $vnp_HashSecret = "XGFKKDILCHTBYGSJYWUZPIJQCNHEKXQZ"; //Secret key
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
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
        foreach ($_GET as $key => $value) {
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
    public function callAPIAuth(Request $request)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $vnp_TmnCode = "3RL42V4Z"; //Mã định danh merchant kết nối (Terminal Id)
        $vnp_HashSecret = "XGFKKDILCHTBYGSJYWUZPIJQCNHEKXQZ"; //Secret key
        $apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

        $vnp_RequestId = rand(1, 10000); // Mã truy vấn
        $vnp_Command = "querydr"; // Mã api
        $vnp_TxnRef = $request->input("txnRef"); // Mã tham chiếu của giao dịch
        $vnp_OrderInfo = "Query transaction"; // Mô tả thông tin
        //$vnp_TransactionNo= ; // Tuỳ chọn, Mã giao dịch thanh toán của CTT VNPAY
        $vnp_TransactionDate = $request->input("transactionDate"); // Thời gian ghi nhận giao dịch
        $vnp_CreateDate = date('YmdHis'); // Thời gian phát sinh request
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR']; // Địa chỉ IP của máy chủ thực hiện gọi API

        $datarq = array(
            "vnp_RequestId" => $vnp_RequestId,
            "vnp_Version" => "2.1.0",
            "vnp_Command" => $vnp_Command,
            "vnp_TmnCode" => $vnp_TmnCode, // Cần cung cấp giá trị vnp_TmnCode từ file cấu hình
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            //$vnp_TransactionNo= ;
            "vnp_TransactionDate" => $vnp_TransactionDate,
            "vnp_CreateDate" => $vnp_CreateDate,
            "vnp_IpAddr" => $vnp_IpAddr
        );

        $format = '%s|%s|%s|%s|%s|%s|%s|%s|%s';

        $dataHash = sprintf(
            $format,
            $datarq['vnp_RequestId'], //1
            $datarq['vnp_Version'], //2
            $datarq['vnp_Command'], //3
            $datarq['vnp_TmnCode'], //4
            $datarq['vnp_TxnRef'], //5
            $datarq['vnp_TransactionDate'], //6
            $datarq['vnp_CreateDate'], //7
            $datarq['vnp_IpAddr'], //8
            $datarq['vnp_OrderInfo'] //9
        );

        // $vnp_HashSecret = config('app.vnp_HashSecret'); // Lấy giá trị vnp_HashSecret từ file cấu hình

        $checksum = hash_hmac('SHA512', $dataHash, $vnp_HashSecret);
        $datarq["vnp_SecureHash"] = $checksum;
        $response = Http::post($apiUrl, $datarq);
        $txnData = $response->body();
        $ispTxn = json_decode($txnData, true);

        return response()->json([
            // 'api_response' => $txnData,
            'api_response'=>$ispTxn
        ]);
    }
}
