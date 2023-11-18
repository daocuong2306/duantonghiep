<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Cart;
use App\Models\OptionValue;
use App\Models\Product;
use App\Models\Variant;
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
                $cartIds = json_decode($bill->carts_id);
             
                $cartItems = Cart::whereIn('id', $cartIds)->get()->map(function ($cart) {
                    $optionValues = Variant::where('sku_id', $cart->sku_id)->pluck('option_value_id')->toArray();
                    $optionValues = array_unique($optionValues);
                    $optionValuesData = OptionValue::whereIn('id', $optionValues)->pluck('value')->toArray();
                    return [
                        'id_product' => $cart->product->id,
                        'option_values' => $optionValuesData,
                        'name' => $cart->product->name,
                        'image' => $cart->product->image,
                        'price' => $cart->price_cart,
                        'quantity' => $cart->quantity
                    ];
                });
                $total_price = $cartItems->sum(function ($cartItem) {
                    return $cartItem['price'] * $cartItem['quantity'];
                });
                return [
                    'id' => $bill->id,
                    'user_id' => $bill->user_id,
                    'address' => $bill->address,
                    'phone' => $bill->phone,                   
                    'payments' => $bill->payments, 
                    'order_status' => $bill->order_status,
                    'cart' => $cartItems,
                    'total_price' => $total_price
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
            'carts_id' => 'required|array',
            'carts_id.*' => 'required|integer', // Thêm quy tắc kiểm tra cho mỗi phần tử trong mảng carts_id
            'payments' => 'nullable|in:OFF,ON',
            'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // $user_id = Auth::user()->id;
        // $address = $request->address;
        // $phone = $request->phone;
        // $carts_id = [1,2];
        // $payments = $request->payments ?? 'OFF';
        // $order_status = $request->order_status ?? 'Pending';
        $bill = new Bill();
        $bill->user_id = Auth::user()->id;
        $bill->address = $request->address;
        $bill->phone = $request->phone;
        // $carts_id = [1, 2];
        // $carts_id['key'] = 'value';
        $bill->carts_id = json_encode($request->carts_id);
        $bill->payments = $request->payments ?? 'OFF';
        $bill->order_status = $request->order_status ?? 'Pending';
        $bill->save();
        // $bill->carts()->attach($carts_id);

        return response()->json([
            'status' => 200,
            'message' => 'Thêm vào bill thành công',
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
        $bill = Bill::findOrFail($id);

    $request->validate([
        'payments' => 'nullable|in:OFF,ON',
        'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel'
    ]);

    if ($request->has('payments')) {
        $bill->payments = $request->input('payments');
    }

    if ($request->has('order_status')) {
        $bill->order_status = $request->input('order_status');
    }

    $bill->save();

    return response()->json(['message' => 'Hóa đơn được cập nhật thành công']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bill = Bill::find($id);

    if (!$bill) {
        return response()->json(['message' => 'Hóa đơn không tồn tại'], 404);
    }

    $bill->delete();

    return response()->json(['message' => 'Hóa đơn đã được xóa'], 200);
    }
}
