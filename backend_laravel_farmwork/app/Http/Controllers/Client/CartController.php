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
        $cartItems = session()->get('cart_items') ?? [];

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
        $skuId = $request->input('sku_id');
        $quantity = $request->input('quantity');

        $cartItems = session()->get('cart_items') ?? [];

        // Tìm kiếm sản phẩm trong giỏ hàng
        $cartItem = null;
        foreach ($cartItems as $key => $item) {
            if ($item['product_id'] == $productId && $item['sku_id'] == $skuId) {
                $cartItem = $key;
                break;
            }
        }

        if ($cartItem !== null) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            $cartItems[$cartItem]['quantity'] += $quantity;
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            $cartItems[] = [
                'product_id' => $productId,
                'sku_id' => $skuId,
                'quantity' => $quantity,
            ];
        }

        session()->put('cart_items', $cartItems);

        return response()->json(['message' => 'Added to cart', 'cart_items' => $cartItems]);
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