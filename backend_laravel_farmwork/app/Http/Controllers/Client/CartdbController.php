<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartdbController extends Controller
{
    /**
     * Hiển thị danh sách các giỏ hàng.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check()) {
            $user_id = Auth::user()->id;
            $carts = Cart::where('user_id', $user_id)->get();
    
            $formattedCarts = $carts->map(function ($cart) {
                return [
                    'id' => $cart->id,
                    'product_id' => $cart->product_id,
                ];
            });
    
            $userCart = [
                'user_id:' . $user_id => $formattedCarts->toArray(),
            ];
    
            return response()->json([
                'carts' => $userCart,
            ], 200);
        } else {
            // Xử lý khi người dùng chưa đăng nhập
        }
    }
    
    /**
     * Lưu giỏ hàng mới vào cơ sở dữ liệu.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {
        // Lấy thông tin người dùng đã đăng nhập
        $user = Auth::user();
    
        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            // Các validation rules khác cho các trường khác của cart
        ]);
    
        // Kiểm tra nếu validation không thành công
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Tạo một đối tượng cart mới dựa trên dữ liệu từ yêu cầu và user_id
        $cart = new Cart();
        $cart->user_id = $user->id;
        $cart->product_id = $request->input('product_id');
        // Các trường khác của cart
    
        // Lưu thông tin giỏ hàng
        $cart->save();
    
        // Trả về cart vừa được tạo làm dữ liệu JSON
        return response()->json($cart, 201);
    }

    
    
    /**
     * Cập nhật giỏ hàng.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
public function update(Request $request, $id)
{
    // Lấy thông tin người dùng đã đăng nhập
    $user = Auth::user();

    // Kiểm tra dữ liệu đầu vào
    $validator = Validator::make($request->all(), [
        'product_id' => 'required|exists:products,id',
        // Các validation rules khác cho các trường khác của cart
    ]);

    // Kiểm tra nếu validation không thành công
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    // Kiểm tra nếu cart tồn tại và thuộc về người dùng hiện tại
    $cart = Cart::where('id', $id)->where('user_id', $user->id)->first();
    if (!$cart) {
        return response()->json(['error' => 'Cart not found'], 404);
    }

    // Cập nhật thông tin giỏ hàng
    $cart->product_id = $request->input('product_id');
    // Cập nhật các trường khác của cart

    // Lưu thông tin giỏ hàng đã được cập nhật
    $cart->save();

    // Trả về cart đã được cập nhật làm dữ liệu JSON
    return response()->json($cart, 200);
}
    
    /**
     * Xóa giỏ hàng khỏi cơ sở dữ liệu.
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
                'message' => 'Xóa giỏ hàng thành công',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy giỏ hàng',
            ], 404);
        }
    }
}