<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Cart;
use App\Models\Product;
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
    // public function index()
    // {
    //     if (Auth::check()) {
    //         $user_id = Auth::user()->id;

    //         $bills = Bill::with('cart')->where('user_id', $user_id)->get();
           
    //         $formattedBills = $bills->map(function ($bill) {
    //             $handle_cart=json_decode($bill->carts_id);
              

    //             return [
    //                 'id' => $bill->id,
    //                 'user_id' => $bill->user_id,
    //                 'address' => $bill->address,
    //                 'phone' => $bill->phone,
    //                 'cart_id' =>  $handle_cart,
    //                 'payments' => $bill->payments,
    //                 'order_status' => $bill->order_status,
    //             ];
    //         });

    //         return response()->json($formattedBills);
    //     }
    // }
    public function index()
    {
        if (Auth::check()) {
            $user_id = Auth::user()->id;
    
            $bills = Bill::with('cart')->where('user_id', $user_id)->get();
           
            $formattedBills = $bills->map(function ($bill) {
                $cartIds = json_decode($bill->carts_id);
    
                $cartItems = Cart::whereIn('id', $cartIds)->get()->map(function ($cart) {
                    return [
                        'id_product' => $cart->product->id,
                        'option_values' => json_decode($cart->option_values),
                        'name' => $cart->product->name,
                        'image' => $cart->product->image,
                        'price' => $cart->product->price,
                        'quantity' => $cart->quantity
                    ];
                });
    
                return [
                    'id' => $bill->id,
                    'user_id' => $bill->user_id,
                    'address' => $bill->address,
                    'phone' => $bill->phone,
                    'payments' => $bill->payments,
                    'order_status' => $bill->order_status,
                    'cart' => $cartItems
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
