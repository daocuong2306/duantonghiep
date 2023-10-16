<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiscountController extends Controller
{
    public function index()
    {
        // $discounts = Discount::all();
        // if ($discounts->count() > 0) {
        //     return response()->json([
        //         'status' => 200,
        //         'discount' => $discounts,
        //     ], 200);   
        // } else {
        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'not found'
        //     ], 400);
        // }
        $currentDate = date('Y-m-d');
        $expiredDiscounts = Discount::where('expiry_date', '<', $currentDate)->get();
        $validDiscounts = Discount::where('expiry_date', '>=', $currentDate)->get();
        $response = [
            'expired_discounts' => $expiredDiscounts,
            'valid_discounts' => $validDiscounts,
        ];
        if ($expiredDiscounts->count() > 0 || $validDiscounts->count() > 0) {
            return response()->json($response, 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy mã giảm giá',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'discount_code' => 'required',
            'percentage' => 'required|numeric',
            'expiry_date' => 'required|date',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $discounts = Discount::create([
                'discount_code' => $request->discount_code,
                'percentage' => $request->percentage,
                'expiry_date' => $request->expiry_date,
            ]);
            $expiryDate = $request->expiry_date;
            if (strtotime($expiryDate) < time()) {
                return response()->json([
                    'message' => 'Mã hết hạn ',
                ], 400);
            }
            if ($discounts) {
                return response()->json([
                    'status' => 200,
                    'discount' => $discounts,
                    'message' => 'Successfull',
                ], 200);
            }
        }
    }
    public function destroy($id)
    {
        $discounts = Discount::find($id);
        if($discounts){
            $discounts ->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Delete Successfull',
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Not found',
            ],404);
        }
     }
}
