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
    public function index(Request $request)
    {
        $userId = $request->user()->id; // Lấy user ID từ request (điều này giả định bạn đã xác thực người dùng)

        // Lấy danh sách các cart products của user có user ID tương ứng
        $cartProducts = CartProduct::where('user_id', $userId)->get();

        return response()->json([
            'success' => true,
            'Cartproduct' => $cartProducts,
        ]);
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
    
       //check id
        $userId = Auth::id();
    
        
        $cart = Cart::where('id', $request->cart_id)
                    ->where('user_id', $userId)
                    ->first();
    
        
        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }
    
        
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
