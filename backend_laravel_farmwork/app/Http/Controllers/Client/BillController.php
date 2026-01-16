<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Cart;
use App\Models\Discount;
use App\Models\HistoryStatusBill;
use App\Models\OptionValue;
use App\Models\Product;
use App\Models\SKU;
use App\Models\User;
use App\Models\Variant;
use Exception;
use Http\Client\Common\Plugin\HistoryPlugin;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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

        // Lấy thông tin người dùng từ id_user
        $user = User::find($user_id);
        $user_name = $user->name; // Tên người dùng

        $bills = Bill::with('cart')
        ->where('user_id', $user_id)
        ->orderByDesc('created_at') // Sắp xếp theo thứ tự mới nhất
        ->get();

        $formattedBills = $bills->map(function ($bill) use ($user_name) {
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
                    'status' => $cart->status,
                ];
            });

         

            // Lấy thông tin giảm giá từ bảng discounts
            $discount = Discount::find($bill->discount_id);

            $discountData = null;
            if ($discount) {
                $discountData = [
                    'discount_code' => $discount->discount_code,
                    'type' => $discount->type,
                    'amount' => $discount->amount,
                    'expiry_date' => $discount->expiry_date,
                ];
            }

            return [
                'id' => $bill->id,
                'user_id' => $bill->user_id,
                'user_name' => $user_name,
                'address' => $bill->address,
                'phone' => $bill->phone,
                'payments' => $bill->payments,
                'order_status' => $bill->order_status,
                'cart' => $cartItems,
                'discount_id' => $bill->discount_id,
                'discount' => $discountData,
                'total_price' => $bill->total_price
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
    // Xác thực dữ liệu và xử lý lỗi (nếu có)
    $validator = Validator::make($request->all(), [
        'address' => 'required',
        'phone' => 'required',
        'carts_id' => 'required|array',
        'carts_id.*' => 'required|integer',
        'payments' => 'nullable|in:OFF,ON',
        'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel,Success'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Tạo mới hóa đơn
    $bill = new Bill();
    $bill->user_id = Auth::user()->id;
    $bill->address = $request->address;
    $bill->phone = $request->phone;
    $bill->carts_id = json_encode($request->carts_id);
    $bill->discount_id = $request->discount_id;
    $bill->payments = $request->payments ?? 'OFF';
    $bill->order_status = $request->order_status ?? 'Pending';
    $bill->total_price = $request->total_price;
    $bill->save();

    // Xử lý thông tin hóa đơn và giỏ hàng
    $cartIds = json_decode($bill->carts_id);
    $cartItems = Cart::whereIn('id', $cartIds)->get()->map(function ($cart) {
        $cart->status = 'ORDER';
        $cart->save();
        $optionValues = Variant::where('sku_id', $cart->sku_id)->pluck('option_value_id')->toArray();
        $optionValues = array_unique($optionValues);
        $optionValuesData = OptionValue::whereIn('id', $optionValues)->pluck('value')->toArray();
        $stoke = SKU::where('id', $cart->sku_id)->value('stoke');
        if ($stoke >= $cart->quantity) {
            SKU::where('id', $cart->sku_id)->decrement('stoke', $cart->quantity);
        } else {
            throw new Exception("Số lượng không khả dụng.");
        }
        return [
            'id_product' => $cart->product->id,
            'option_values' => $optionValuesData,
            'name' => $cart->product->name,
            'image' => $cart->product->image,
            'price' => $cart->price_cart,
            'quantity' => $cart->quantity,
            'status' => $cart->status,
        ];
    });

    $history = new HistoryStatusBill();
    $history->user_id = Auth::user()->id;
    $history->bill_id = $bill->id;
    $history->infor_change = $bill->order_status;
    $history->save();

    // Lấy thông tin của người dùng
    $user = Auth::user();

    // Lấy thông tin của mã giảm giá nếu có
    $discount = Discount::find($bill->discount_id);
    $discountData = [];
    if ($discount) {
        $discountData = [
            'discount_code' => $discount->discount_code,
            'type' => $discount->type,
            'amount' => $discount->amount,
            'expiry_date' => $discount->expiry_date,
        ];
    }

    // Trả về hóa đơn đã định dạng
    $formattedBill = [
        'id' => $bill->id,
        'user_id' => $bill->user_id,
        'user_name' => $user->name,
        'address' => $bill->address,
        'phone' => $bill->phone,
        'payments' => $bill->payments,
        'order_status' => $bill->order_status,
        'cart' => $cartItems,
        'discount_id' => $bill->discount_id,
        'discount' => $discountData,
        'total_price' => $bill->total_price
    ];

    return response()->json($formattedBill);
}
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bill = Bill::with('cart')->find($id);
    
        if (!$bill) {
            return response()->json(['message' => 'Hóa đơn không tồn tại'], 404);
        }
    
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
                'status' => $cart->status,
            ];
        });
    
        $discount = Discount::find($bill->discount_id);

        $discountData = null;
        if ($discount) {
            $discountData = [
                'discount_code' => $discount->discount_code,
                'type' => $discount->type,
                'amount' => $discount->amount,
                'expiry_date' => $discount->expiry_date,
            ];
        }
        $formattedBill = [
            'id' => $bill->id,
            'user_id' => $bill->user_id,
            'address' => $bill->address,
            'phone' => $bill->phone,
            'payments' => $bill->payments,
            'order_status' => $bill->order_status,
            'cart' => $cartItems,
            'discount_id' => $bill->discount_id,
            'discount' => $discountData,
            'total_price' =>$bill->total_price
        ];
    
        return response()->json($formattedBill);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
//     public function update(Request $request, $id)
// {
//     $bill = Bill::findOrFail($id);
//     try {
//         $request->validate([
//             'payments' => 'nullable|in:OFF,ON',
//             'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel,Success'
//         ], [
//             'payments.in' => 'Giá trị của trường "payments" phải là OFF hoặc ON.',
//             'order_status.in' => 'Giá trị của trường "order_status" phải là Pending, Browser, Pack, Transport, Cancel, hoặc Success.'
//         ]);
//     } catch (ValidationException $e) {
//         $errors = $e->validator->errors()->all();
//         return response()->json(['errors' => $errors], 422);
//     }

//     if ($request->has('payments')) {
//         $bill->payments = $request->input('payments');
//     }

//     if ($request->has('order_status')) {
//         $bill->order_status = $request->input('order_status');
//     }

//     $bill->save();
//     $history = new HistoryStatusBill();
//     $history->user_id = Auth::user()->id;
//     $history->bill_id = $bill->id;
//     $history->infor_change = $bill->order_status;
//     $history->save();
//     return response()->json(['message' => 'Hóa đơn được cập nhật thành công']);
// }
public function update(Request $request, $id)
{
    $bill = Bill::findOrFail($id);
    
    try {
        $request->validate([
            'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel,Success'
        ], [
            'order_status.in' => 'Giá trị của trường "order_status" phải là Pending, Browser, Pack, Transport, Cancel, hoặc Success.'
        ]);
    } catch (ValidationException $e) {
        $errors = $e->validator->errors()->all();
        return response()->json(['errors' => $errors], 422);
    }

    if ($request->has('order_status')) {
        $bill->order_status = $request->input('order_status');
        $bill->save();

        $history = new HistoryStatusBill();
        $history->user_id = Auth::user()->id;
        $history->bill_id = $bill->id;
        $history->infor_change = $bill->order_status;
        $history->save();
    }

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
    $history = new HistoryStatusBill();
    $history->user_id = Auth::user()->id;
    $history->bill_id = $bill->id;
    $history->infor_change = $bill->order_status;
    $history->save();
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
    $history = new HistoryStatusBill();
    $history->user_id = Auth::user()->id;
    $history->bill_id = $bill->id;
    $history->infor_change = $bill->order_status;
    $history->save();
    return response()->json(['message' => 'Hóa đơn đã được xóa'], 200);
    }
// list ra tất cả 

// public function list_bills()
// {
//     $bills = Bill::all();
//     $formattedBills = [];

//     foreach ($bills as $bill) {
//         $cartItems = [];

//         if (!is_null($bill->cart)) {
//             $cartItems = Cart::whereIn('id', json_decode($bill->cart))->get()->map(function ($cart) {
//                 $optionValues = Variant::where('sku_id', $cart->sku_id)->pluck('option_value_id')->toArray();
//                 $optionValues = array_unique($optionValues);
//                 $optionValuesData = OptionValue::whereIn('id', $optionValues)->pluck('value')->toArray();
//                 return [
//                     'id_product' => $cart->product->id,
//                     'option_values' => $optionValuesData,
//                     'name' => $cart->product->name,
//                     'image' => $cart->product->image,
//                     'price' => $cart->price_cart,
//                     'quantity' => $cart->quantity,
//                     'status' => $cart->status
//                 ];
//             });
//         }

//         $total_price = Collection::make($cartItems)->sum(function ($cartItem) {
//             return $cartItem['price'] * $cartItem['quantity'];
//         });

//         $billData = [
//             'id' => $bill->id,
//             'user_id' => $bill->user_id,
//             'user_name' => User::find($bill->user_id)->name,
//             'user_image' => User::find($bill->user_id)->image,
//             'address' => $bill->address,
//             'phone' => $bill->phone,
//             'payments' => $bill->payments,
//             'order_status' => $bill->order_status,
//             'cart' => $cartItems,
//             'total_price' => $total_price
//         ];

//         $formattedBills[] = $billData;
//     }

//     return response()->json($formattedBills);
// }

public function list_bills(Request $request)
{
    $name = $request->query('name');
    $phone = $request->query('phone');
    $orderStatus = $request->query('order_status');
    $address = $request->query('address');

    $query = Bill::with('user', 'cart');

    if ($name) {
        $query->whereHas('user', function ($userQuery) use ($name) {
            $userQuery->where('name', 'like', '%' . $name . '%');
        });
    }

    if ($phone) {
        $query->where('phone', 'like', '%' . $phone . '%');
    }
    if ($address) {
        $query->where('address', 'like', '%' . $address . '%');
    }
    if ($orderStatus) {
        $query->where('order_status', $orderStatus);
    }

    $bills = $query->get();
    // $bills = Bill::with('user', 'cart')->get();
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
                'status' => $cart->status,
            ];
        });

       
        $discount = Discount::find($bill->discount_id);

        $discountData = null;
        if ($discount) {
            $discountData = [
                'discount_code' => $discount->discount_code,
                'type' => $discount->type,
                'amount' => $discount->amount,
                'expiry_date' => $discount->expiry_date,
            ];
        }
        return [
            'id' => $bill->id,
            'user_id' => $bill->user_id,
            'user_name' => $bill->user->name, // Lấy tên người dùng từ mối quan hệ
            'user_image' => $bill->user->image, // Lấy ảnh người dùng từ mối quan hệ
            'address' => $bill->address,
            'phone' => $bill->phone,
            'payments' => $bill->payments,
            'order_status' => $bill->order_status,
            'cart' => $cartItems,
            'discount_id' => $bill->discount_id,
            'discount' => $discountData,
            'total_price' => $bill->total_price
        ];
    });

    return response()->json($formattedBills);
}
//history
public function list_history($billId)
{
    $history = DB::table('history_status_bill')
        ->where('bill_id', $billId)
        ->get();

    $bill = Bill::with('cart')->find($billId);

    if (!$bill) {
        return response()->json(['message' => 'Hóa đơn không tồn tại'], 404);
    }

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
            'status' => $cart->status,
        ];
    });

  

    $userIds = $history->pluck('user_id')->unique()->toArray();

    $users = User::whereIn('id', $userIds)->pluck('name', 'id')->toArray();

    $formattedHistory = $history->map(function ($item) use ($users) {
        $item->user_name = $users[$item->user_id] ?? 'Unknown User';
        return $item;
    });

    $user = User::find($bill->user_id);


    $discount = Discount::find($bill->discount_id);

    $discountData = null;
    if ($discount) {
        $discountData = [
            'discount_code' => $discount->discount_code,
            'type' => $discount->type,
            'amount' => $discount->amount,
            'expiry_date' => $discount->expiry_date,
        ];
    }
    $formattedBill = [
        'id' => $bill->id,
        'user_id' => $bill->user_id,
        'address' => $bill->address,
        'phone' => $bill->phone,
        'name_user' => $user->name,
        'image_user' => $user->image,
        'payments' => $bill->payments,
        'order_status' => $bill->order_status,
        'cart' => $cartItems,
          'discount_id' => $bill->discount_id,
        'discount' => $discountData,
        'total_price' =>  $bill->total_price
    ];

    return response()->json(['bill' => $formattedBill, 'history' => $formattedHistory]);
}

}