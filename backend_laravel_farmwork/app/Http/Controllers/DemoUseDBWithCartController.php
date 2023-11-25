<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class DemoUseDBWithCartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::all();

        return response()->json(['cart_items' => $cartItems]);
    }

    public function store(Request $request)
    {
        $productId = $request->input('product_id');
        $skuId = $request->input('sku_id');
        $quantity = $request->input('quantity');

        $cartItem = Cart::where('product_id', $productId)
            ->where('sku_id', $skuId)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = new Cart();
            $cartItem->product_id = $productId;
            $cartItem->sku_id = $skuId;
            $cartItem->quantity = $quantity;
            $cartItem->save();
        }

        return response()->json([
            'message' => 'Added to cart',
            'cart_item' => $cartItem
        ]);
    }

    public function update(Request $request, $id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->quantity = $request->input('quantity');
        $cartItem->save();

        return response()->json([
            'message' => 'Cart item updated',
            'cart_item' => $cartItem
        ]);
    }

    public function destroy($id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        return response()->json([
            'message' => 'Cart item deleted'
        ]);
    }
}
