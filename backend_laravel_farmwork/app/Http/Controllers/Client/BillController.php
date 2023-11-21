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
                        'quantity' => $cart->quantity,
                        'status' => $cart->status

                    ];
                });
                $total_price = $cartItems->sum(function ($cartItem) {
                    return $cartItem['price'] * $cartItem['quantity'];
                });
                $bill->total_price = $total_price;
                $bill->save();
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
            'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel,Success'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
      
        
        $bill = new Bill();
        $bill->user_id = Auth::user()->id;
        $bill->address = $request->address;
        $bill->phone = $request->phone;
   
        $bill->carts_id = json_encode($request->carts_id);
        $bill->payments = $request->payments ?? 'OFF';
        $bill->order_status = $request->order_status ?? 'Pending';
        $bill->save();
         
        // if ($bill->order_status === 'Cancel') {
        //     $carts = Cart::whereIn('id', $request->carts_id)->get();
    
        //     foreach ($carts as $cart) {
        //         $product = $cart->product;
    
        //         if ($product->quantity >= $cart->quantity) {
        //             $product->decrement('quantity', $cart->quantity);
        //         } else {
        //             // Xử lý khi số lượng sản phẩm không đủ
        //             // Ví dụ: gửi thông báo cho người dùng
        //             return response()->json(['message' => 'Số lượng sản phẩm không đủ'], 400);
        //         }
        //     }
        // }
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
        'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel,Success'
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
//api update bên người dùng 
    public function update_user(Request $request, $id)
{
    $bill = Bill::findOrFail($id);

    // Kiểm tra và cập nhật các trường dữ liệu của hóa đơn
    if ($request->has('order_status')) {
        $orderStatus = $request->input('order_status');
        
        if ($bill->order_status === 'Pending' && $orderStatus === 'Cancel') {
            $bill->order_status = $orderStatus;
        } elseif ($bill->order_status !== 'Pending') {
            return response()->json(['message' => 'Không thể thay đổi trạng thái đơn hàng.'], 403);
        }
    }

    // Lưu hóa đơn đã cập nhật
    $bill->save();

    // Trả về hóa đơn đã được cập nhật trong Response
    return response()->json($bill);
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
// list ra tất cả 
    public function list_bills()
    {
        $bills = Bill::with('cart')->get();

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

        // Lưu tổng giá trị vào trường total_price của hóa đơn
        $bill->total_price = $total_price;
        $bill->save();

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
