<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
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
            $carts = Cart::with(['variant', 'sku'])
            ->where('user_id', $user_id)
            ->get(['id', 'user_id', 'product_id', 'sku_id', 'quantity', 'price_cart', 'status']);
            
            $totalAmount = 0; // Biến lưu tổng tiền của cả giỏ hàng
    
            $formattedCarts = $carts->map(function ($cart) use (&$totalAmount) {
                $optionValues = Variant::where('sku_id', $cart->sku_id)->pluck('option_value_id')->toArray();
                $optionValues = array_unique($optionValues);
                $optionValuesData = OptionValue::whereIn('id', $optionValues)->pluck('value')->toArray();
    
                $totalPrice = $cart->quantity * $cart->sku->price; // Tính tổng tiền cho sản phẩm hiện tại
                $totalAmount += $totalPrice; // Cộng tổng tiền của sản phẩm vào tổng tiền của cả giỏ hàng
    
                return [
                    'id' => $cart->id,
                    'user_id' => $cart->user_id,
                    'product_id' => $cart->product_id,
                    'name_product' => $cart->product->name,
                    'price_product' => $cart->product->price,
                    'image_product' => $cart->product->image,
                    'sku_id' => $cart->sku_id,
                    'quantity' => $cart->quantity,
                    'sku_price' => $cart->sku->price,
                    'option_value' => $optionValuesData,
                    'price_cart'  =>$cart->price_cart,
                    'total_price' => $totalPrice, // Thêm trường tổng tiền cho từng sản phẩm
                    'status' => $cart->status,
                ];
            });
    
            return response()->json([
                'carts' => $formattedCarts,
                'total_amount' => $totalAmount, // Thêm trường tổng tiền của cả giỏ hàng
            ], 200);
        } else {
           
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
    
        $existingCart = Cart::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->where('sku_id', $sku_id)
            ->where('status', 'NO_ORDER')
            ->first();
    
        if ($existingCart) {
            // Sản phẩm đã tồn tại trong giỏ hàng và trạng thái là "NO_ORDER", tăng số lượng
            $existingCart->quantity += $quantity;
            $existingCart->save();
        } else {
            // Sản phẩm chưa tồn tại trong giỏ hàng hoặc không ở trạng thái "NO_ORDER", tạo mới
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
    $cart = Cart::findOrFail($id);

    $newQuantity = $request->input('quantity');
    $newStatus = $request->input('status');

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

    if ($newQuantity !== null) {
        $cart->quantity = $newQuantity;
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
