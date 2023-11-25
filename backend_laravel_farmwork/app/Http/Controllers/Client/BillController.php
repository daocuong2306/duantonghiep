<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use App\Models\Cart;
use App\Models\HistoryStatusBill;
use App\Models\OptionValue;
use App\Models\Product;
use App\Models\SKU;
use App\Models\User;
use App\Models\Variant;
use Exception;
use Http\Client\Common\Plugin\HistoryPlugin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            
            $bills = Bill::with('cart')->where('user_id', $user_id)->get();
          
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
                $total_price = $cartItems->sum(function ($cartItem) {
                    return $cartItem['price'] * $cartItem['quantity'];
                });
                $bill->total_price = $total_price;
                $bill->save(); 
                   
                return [
                    'id' => $bill->id,
                    'user_id' => $bill->user_id,
                    'user_name' => $user_name, // Thêm tên người dùng vào mảng kết quả
                    'address' => $bill->address,
                    'phone' => $bill->phone,                   
                    'payments' => $bill->payments, 
                    'order_status' =>$bill-> order_status,
                   
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
        $bill->payments = $request->payments ?? 'OFF';
        $bill->order_status = $request->order_status ?? 'Pending';
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
    
        $total_price = $cartItems->sum(function ($cartItem) {
            return $cartItem['price'] * $cartItem['quantity'];
        });
    
        $bill->total_price = $total_price;
        $bill->save();
        $history = new HistoryStatusBill();
        $history->user_id = Auth::user()->id;
        $history->bill_id = $bill->id;
        $history->infor_change = $bill->order_status;
        $history->save();
        // Trả về hóa đơn đã định dạng
        $formattedBill = [
            'id' => $bill->id,
            'user_id' => $bill->user_id,
            'address' => $bill->address,
            'phone' => $bill->phone,
            'payments' => $bill->payments,
            'order_status' => $bill->order_status,
            'cart' => $cartItems,
            'total_price' => $total_price
        ];
    
        return response()->json($formattedBill);
    }
//     public function store(Request $request)
// {
//     // Xác thực dữ liệu và xử lý lỗi (nếu có)
//     $validator = Validator::make($request->all(), [
//         'address' => 'required',
//         'phone' => 'required',
//         'carts_id' => 'required|array',
//         'carts_id.*' => 'required|integer',
//         'payments' => 'nullable|in:OFF,ON',
//         'order_status' => 'nullable|in:no_order,Pending,Browser,Pack,Transport,Cancel,Success'
//     ]);

//     if ($validator->fails()) {
//         return response()->json(['errors' => $validator->errors()], 400);
//     }

//     // Tạo mới hóa đơn
//     $bill = new Bill();
//     $bill->user_id = Auth::user()->id;
//     $bill->address = $request->address;
//     $bill->phone = $request->phone;
//     $bill->carts_id = json_encode($request->carts_id);
//     $bill->payments = $request->payments ?? 'OFF';
//     $bill->order_status = $request->order_status == 'no_order' ? 'order' : ($request->order_status ?? 'Pending');
//     $bill->save();

//     // Xử lý thông tin hóa đơn và giỏ hàng
//     $cartIds = json_decode($bill->carts_id);
//     $cartItems = Cart::whereIn('id', $cartIds)->get()->map(function ($cart) {
//         $optionValues = Variant::where('sku_id', $cart->sku_id)->pluck('option_value_id')->toArray();
//         $optionValues = array_unique($optionValues);
//         $optionValuesData = OptionValue::whereIn('id', $optionValues)->pluck('value')->toArray();
//         $stoke = SKU::where('id', $cart->sku_id)->value('stoke');
//         if ($stoke >= $cart->quantity) {
//             SKU::where('id', $cart->sku_id)->decrement('stoke', $cart->quantity);
//         } else {
//             throw new Exception("Số lượng không khả dụng.");
//         }
//         return [
//             'id_product' => $cart->product->id,
//             'option_values' => $optionValuesData,
//             'name' => $cart->product->name,
//             'image' => $cart->product->image,
//             'price' => $cart->price_cart,
//             'quantity' => $cart->quantity,
//             'status' => $cart->status,
//         ];
//     });

//     $total_price = $cartItems->sum(function ($cartItem) {
//         return $cartItem['price'] * $cartItem['quantity'];
//     });

//     $bill->total_price = $total_price;
//     $bill->save();

//     // Trả về hóa đơn đã định dạng
//     $formattedBill = [
//         'id' => $bill->id,
//         'user_id' => $bill->user_id,
//         'address' => $bill->address,
//         'phone' => $bill->phone,
//         'payments' => $bill->payments,
//         'order_status' => $bill->order_status,
//         'cart' => $cartItems,
//         'total_price' => $total_price
//     ];

//     return response()->json($formattedBill);
// }
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

    try {
        $request->validate([
            'payments' => 'nullable|in:OFF,ON',
            'order_status' => 'nullable|in:Pending,Browser,Pack,Transport,Cancel,Success'
        ], [
            'payments.in' => 'Giá trị của trường "payments" phải là OFF hoặc ON.',
            'order_status.in' => 'Giá trị của trường "order_status" phải là Pending, Browser, Pack, Transport, Cancel, hoặc Success.'
        ]);
    } catch (ValidationException $e) {
        $errors = $e->validator->errors()->all();
        return response()->json(['errors' => $errors], 422);
    }

    if ($request->has('payments')) {
        $bill->payments = $request->input('payments');
    }

    if ($request->has('order_status')) {
        $bill->order_status = $request->input('order_status');
    }

    $bill->save();
    $history = new HistoryStatusBill();
    $history->user_id = Auth::user()->id;
    $history->bill_id = $bill->id;
    $history->infor_change = $bill->order_status;
    $history->save();
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
public function list_bills()
{
    $bills = Bill::with('cart')->get();

    // Bước 1: Lấy tất cả user_id từ danh sách hóa đơn
    $userIds = $bills->pluck('user_id')->unique()->toArray();

    // Bước 2: Lấy thông tin người dùng tương ứng với user_id
    $users = User::whereIn('id', $userIds)->pluck('name', 'id')->toArray();

    $formattedBills = [];

    foreach ($userIds as $userId) {
        $userBills = $bills->where('user_id', $userId);

        $billData = [
            'id' => $userBills[0]->id,
            'user_id' => $userId,
            'user_name' => isset($users[$userId]) ? $users[$userId] : '',
            'user_image' => '', // Thêm ảnh người dùng vào mảng kết quả
            'carts' => []
        ];

        foreach ($userBills as $bill) {
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

            $billInformation = [
                'address' => $bill->address,
                'phone' => $bill->phone,                   
                'payments' => $bill->payments, 
                'order_status' => $bill->order_status,
                'cart' => $cartItems,
                'total_price' => $total_price
            ];

            $billData['carts'][] = $billInformation;
        }

        $formattedBills[] = $billData;
    }

    return response()->json($formattedBills);
}

public function list_history($billId){
  $history = DB::table('history_status_bill')  
    ->where('bill_id', $billId)
   ->get();
  // Bước 1: Lấy tất cả user_id từ danh sách hóa đơn
  $userIds = $history->pluck('user_id')->unique()->toArray();

  // Bước 2: Lấy thông tin người dùng tương ứng với user_id
  $users = User::whereIn('id', $userIds)->pluck('name', 'id')->toArray();
   // Bước 3: Gán thông tin người dùng vào mỗi mục lịch sử
  foreach ($history as $item) {
    $item->user_name = $users[$item->user_id] ?? 'Unknown User';
}
// Trả về danh sách lịch sử với thông tin người dùng
return response()->json(['history' => $history]);
}

}