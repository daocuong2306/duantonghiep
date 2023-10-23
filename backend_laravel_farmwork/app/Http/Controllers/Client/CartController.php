<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = auth()->user()->id;

        $cartItems = Cart::where('user_id', $userId)->get();

        return response()->json(['cart_items' => $cartItems]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $productId = $request->input('product_id');
        $skuId = $request->input('');
        $quantity = $request->input('quantity');

        // Lấy ID của người dùng từ session hoặc JWT token, tùy thuộc vào cách xác thực người dùng
        $userId = auth()->user()->id;

        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $productId)
            ->where('sku_id', $skuId)
            ->first();

        if ($cartItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới
            $cartItem = Cart::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'sku_id' => $skuId,
                'quantity' => $quantity,
            ]);
        }

        return response()->json(['message' => 'Added to cart', 'cart_item' => $cartItem]);
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
