<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\OptionValue;
use App\Models\SKU;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index(Request $request)
    // {
    //     $userId = $request->user()->id; // Lấy user ID từ request (điều này giả định bạn đã xác thực người dùng)

    //     // Lấy danh sách các cart products của user có user ID tương ứng
    //     $cartProducts = CartProduct::where('user_id', $userId)->get();

    //     return response()->json([
    //         'success' => true,
    //         'Cartproduct' => $cartProducts,
    //     ]);
    // }
    public function index()
    {
        if (Auth::check()) {
            $user_id = Auth::user()->id;
            $cartProducts = CartProduct::with(['variant', 'sku'])
                ->where('user_id', $user_id)
                ->get(['id', 'user_id', 'cart_id', 'product_id', 'sku_id', 'quantity', 'price_cartpro', 'status']);

            $totalAmount = 0; // Biến lưu tổng tiền của cả giỏ hàng

            $formattedCarts = $cartProducts->map(function ($cart) use (&$totalAmount) {
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
                    'price_cartpro'  => $cart->price_cartpro,
                    'total_price' => $totalPrice, // Thêm trường tổng tiền cho từng sản phẩm
                    'status' => $cart->status,
                ];
            });

            return response()->json([
                'cartProducts' => $formattedCarts,
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
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required|exists:carts,id',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // Check user ID
        $userId = Auth::id();

        // Find the cart
        $cart = Cart::where('id', $request->cart_id)
            ->where('user_id', $userId)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }

        // Check if cart status is "order"
        if ($cart->status !== 'order') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot add CartProduct. Cart status is not "order".',
            ], 400);
        }

        // Create and save the CartProduct
        $cartProduct = new CartProduct;
        $cartProduct->user_id = $userId;
        $cartProduct->cart_id = $request->cart_id;
        $cartProduct->product_id = $cart->product_id;
        $cartProduct->sku_id = $cart->sku_id;
        $cartProduct->quantity = $cart->quantity;
        $cartProduct->price_cartpro = $cart->price_cart;
        $cartProduct->status = $cart->status;

        $cartProduct->save();

        return response()->json([
            'success' => true,
            'message' => 'CartProduct created successfully.',
            'data' => $cartProduct,
        ], 201);
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
        $cart = CartProduct::findOrFail($id);
    
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
        $cartProduct = CartProduct::find($id);
        if ($cartProduct) {
            $cartProduct->delete();
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