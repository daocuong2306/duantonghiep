<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check()) {
            $user_id = Auth::user()->id;
         
            $bills = Bill::with('cart')->where('user_id', $user_id)->get();
    
            $formattedBills = $bills->map(function ($bill) {
                return [
                    'id' => $bill->id,
                    'user_id' => $bill->user_id,
                    'address' => $bill->address,
                    'phone' => $bill->phone,
                    'carts_id' => $bill->carts_id,
                    'product_id' => $bill->cart->product_id,
                    'name_product' => $bill->cart->product->name,
                    'price_product' => $bill->cart->product->price,
                    'image_product' => $bill->cart->product->image,
                    'sku_id' => $bill->cart->sku_id,
                    'quantity' => $bill->cart->quantity,
                    'sku_price' => $bill->cart->sku_price,
                    'option_value' => $bill->cart->option_value,
                    'price_cart' => $bill->cart->price_cart,
                    'total_price' => $bill->cart->total_price,
                    'status' => $bill->status,
                    'payments' => $bill->payments,
                    'order_status' => $bill->order_status,
                ];
            });
    
            return response()->json($formattedBills);
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'phone' => 'required',
            'carts_id' => 'required',
            'payments' => 'nullable|in:OFF,ON',
            'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $user_id = Auth::user()->id;
        $address = $request->address;
        $phone = $request->phone;
        $carts_id = $request->carts_id;
        $payments = $request->payments ? $request->payments : 'OFF';
        $order_status = $request->order_status ? $request->order_status : 'Pending';
    
        $bill = Bill::create([
            'user_id' => $user_id,
            'address' => $address,
            'phone' => $phone,
            'carts_id' => $carts_id,
            'payments' => $payments,
            'order_status' => $order_status
        ]);
    
        return response()->json([
            'status' => 200,
            'message' => 'Thêm vào bill  thành công',
            'bill' => $bill
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
