<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Discount;
use App\Models\OptionValue;
use App\Models\Product;
use App\Models\SKU;
use App\Models\Variant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartdbController extends Controller
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
             $discount=\request()->discount;
             $carts = Cart::with(['variant', 'sku'])
                 ->where('user_id', $user_id)
                 ->get(['id', 'user_id', 'product_id', 'sku_id', 'quantity', 'price_cart', 'status']);
             
             $totalAmount = 0; // Biến lưu tổng tiền của cả giỏ hàng
             $totalQuantity = 0; // Biến lưu tổng số lượng của cả giỏ hàng
     
             $formattedCarts = [];
             
             foreach ($carts as $cart) {
                 if ($cart->status !== 'ORDER') {
                     $optionValues = Variant::where('sku_id', $cart->sku_id)->pluck('option_value_id')->toArray();
                     $optionValues = array_unique($optionValues);
                     $optionValuesData = OptionValue::whereIn('id', $optionValues)->pluck('value')->toArray();
     
                     $totalPrice = $cart->quantity * $cart->sku->price; // Tính tổng tiền cho sản phẩm hiện tại
                     $totalAmount += $totalPrice; // Cộng tổng tiền của sản phẩm vào tổng tiền của cả giỏ hàng
                     $totalQuantity += $cart->quantity; // Cộng tổng số lượng của sản phẩm vào tổng số lượng của cả giỏ hàng
                    if($discount){
                        $checkDiscount=Discount::where('discount_code',$discount)->first();
                        // dd($checkDiscount->amount);
                        if($checkDiscount->type==1){
                            $totalPrice=$totalPrice*($checkDiscount->amount/100);
                            // dd($totalPrice);
                        }
                    }
                     $formattedCarts[] = [
                         'id' => $cart->id,
                         'user_id' => $cart->user_id,
                         'product_id' => $cart->product_id,
                         'name_product' => $cart->product->name,
                         'price_product' => $cart->product->price,
                         'image_product' => $cart->product->image,
                         'sku_id' => $cart->sku_id,
                         'quantity' => $cart->quantity,
                         'sku_price' => $cart->sku->price,
                         'checkDiscount'=>$checkDiscount,
                         'option_value' => $optionValuesData,
                         'price_cart'  =>$cart->price_cart,
                         'total_price' => $totalPrice, // Thêm trường tổng tiền cho từng sản phẩm
                         'status' => $cart->status,
                     ];
                 }
             }
     
             return response()->json([
                 'carts' => $formattedCarts,
                 'total_amount' => $totalAmount, // Thêm trường tổng tiền của cả giỏ hàng
                 'total_quantity' => $totalQuantity, // Thêm trường tổng số lượng của cả giỏ hàng
             ], 200);
         } else {
             // Xử lý trường hợp người dùng chưa đăng nhập
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
            'product_id' => 'required|exists:product,id',
            'sku_id' => 'required|exists:skus,id',
            'quantity' => 'required|integer|min:1',
            'status' => 'nullable|in:ORDER,NO_ORDER',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $user_id = Auth::user()->id;
        $product_id = $request->product_id;
        $sku_id = $request->sku_id;
        $quantity = $request->quantity;
        $status = $request->status ? $request->status : 'NO_ORDER';
    
        $sku = Sku::find($sku_id);
    
        if (!$sku) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], 400);
        }
    
        $price_cart = $sku->price;
        $stoke = $sku->stoke; //gọi ra stoke
    
        $existingCart = Cart::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->where('sku_id', $sku_id)
            ->where('status', 'NO_ORDER')
            ->first();
    
        if ($existingCart) {
            // Sản phẩm đã tồn tại trong giỏ hàng và trạng thái là "NO_ORDER", tăng số lượng
            $newQuantity = $existingCart->quantity + $quantity;
    
            if ($newQuantity > $stoke) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Số lượng sản phẩm vượt quá số lượng tồn kho'
                ], 400);
            }
    
            $existingCart->quantity = $newQuantity;
            $existingCart->save();
    
            return response()->json([
                'status' => 200,
                'message' => 'Số lượng sản phẩm trong giỏ hàng đã được cập nhật'
            ], 200);
        } else {
            // Sản phẩm chưa tồn tại trong giỏ hàng hoặc không ở trạng thái "NO_ORDER", tạo mới

            //kiểm tra stoke
            if ($quantity > $stoke) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Số lượng sản phẩm vượt quá số lượng tồn kho'
                ], 400);
            }
    
            $newCart = new Cart();
            $newCart->user_id = $user_id;
            $newCart->product_id = $product_id;
            $newCart->sku_id = $sku_id;
            $newCart->quantity = $quantity;
            $newCart->status = $status;
            $newCart->price_cart = $price_cart; // Lưu giá tiền vào trường price_cart
            $newCart->save();
        }
    
        return response()->json([
            'status' => 200,
            'message' => 'Thêm vào giỏ hàng thành công'
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required',
            'status' => 'nullable|in:ORDER,NO_ORDER',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $cart = Cart::findOrFail($id);
        $sku = Sku::find($cart->sku_id); //gọi sku_id
    
        if (!$sku) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], 400);
        }
    
        $newQuantity = $request->input('quantity');
        $newStatus = $request->input('status');
        $stoke = $sku->stoke; // gọi đến stoke
    
        // Kiểm tra và không cho phép tăng số lượng khi trạng thái là "ORDER"
        if ($cart->status === 'ORDER' && $newQuantity > $cart->quantity) {
            return response()->json([
                'error' => 'Không thể tăng số lượng khi trạng thái là "ORDER"'
            ], 400);
        }
    
        // Kiểm tra và chỉ cho phép cập nhật trạng thái thành "ORDER" hoặc "NO_ORDER"
        if ($newStatus !== null) {
            if ($newStatus === 'ORDER' || $newStatus === 'NO_ORDER') {
                $cart->status = $newStatus;
            } else {
                return response()->json([
                    'error' => 'Giá trị trạng thái không hợp lệ'
                ], 400);
            }
        }
    
        // Cộng số lượng mới vào số lượng hiện có nếu có số lượng trước đó
        if ($newQuantity !== null) {
            $newTotalQuantity = $cart->quantity + $newQuantity;
            
            //kiểm tra stoke
            if ($newTotalQuantity > $stoke) {
                return response()->json([
                    'error' => 'Số lượng sản phẩm vượt quá số lượng tồn kho'
                ], 400);
            }
    
            $cart->quantity = $newTotalQuantity;
    
            // Kiểm tra và xóa giỏ hàng nếu số lượng nhỏ hơn hoặc bằng 0
            if ($cart->quantity <= 0) {
                $cart->delete();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Xóa giỏ hàng thành công'
                ], 200);
            }
        }
    
        $cart->save();
    
        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật giỏ hàng thành công'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cart = Cart::find($id);
        if ($cart) {
            $cart->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xóa thành công ',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not found',
            ], 404);
        }
    }
}
