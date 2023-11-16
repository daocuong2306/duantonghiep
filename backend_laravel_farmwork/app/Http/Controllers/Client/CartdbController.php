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
            $carts = Cart::with(['variant', 'sku'])->where('user_id', $user_id)->get(['id', 'user_id', 'product_id', 'sku_id', 'quantity','status']);
    
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
            'status' => 'nullable|in:UNPAID,PAID,COMFIRM', // Thêm quy tắc kiểm tra cho trường status
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $user_id = Auth::user()->id;
        $product_id = $request->product_id;
        $sku_id = $request->sku_id;
        $quantity = $request->quantity;
        $status = $request->status ? $request->status : 'UNPAID'; // Gán giá trị mặc định là "UNPAID" nếu không có giá trị được chọn
    
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
            $newCart->status = $status; // Gán giá trị cho trường status
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
        $cart->update($request->only('quantity'));

        return response()->json([
            'status' => 200,
            'message' => 'update thành công giỏ hàng '
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
