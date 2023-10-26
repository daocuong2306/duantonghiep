<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\SKU;
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
        $carts = Cart::where('user_id', auth()->user()->id)->get();
        $data = [];
    
        foreach ($carts as $cart) {
            $product = Product::find($cart->product_id);
    
            if ($product) {
                $sku = Sku::find($cart->sku_id);
    
                $skuData = [
                    'sku' => $sku->sku,
                    'barcode' => $sku->barcode,
                    'price' => $sku->price,
                    'stock' => $sku->stock,
                ];
    
                $data[] = [
                    'id' => $cart->id,
                    'product_id' => $cart->product_id,
                    'name' => $product->name,
                    'quantity' => $cart->quantity,
                    'sku_id' => [$cart->sku_id => $skuData],
                ];
            }
        }
    
        return response()->json($data);
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
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $user_id = auth()->user()->id;
        $product_id = $request->product_id;
        $sku_id = $request->sku_id;
        $quantity = $request->quantity;
    
        $cart = Cart::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->where('sku_id', $sku_id)
            ->first();
    
        if ($cart) {
            // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
            $cart->quantity += $quantity;
            $cart->save();
        } else {
            // Sản phẩm chưa tồn tại trong giỏ hàng, tạo mới
            $newCart = new Cart();
            $newCart->user_id = $user_id;
            $newCart->product_id = $product_id;
            $newCart->sku_id = $sku_id;
            $newCart->quantity = $quantity;
            $newCart->save();
        }
    
        return response()->json(['message' => 'Thêm vào giỏ hàng thành công']);
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
        $cart->update($request->only('quantity'));
    
        return response()->json(['message' => 'Cart updated successfully']);
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
                'message' => 'Delete Successfull',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not found',
            ], 404);
        }
    }
}
