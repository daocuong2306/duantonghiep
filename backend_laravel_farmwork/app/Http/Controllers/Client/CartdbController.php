<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
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
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (Auth::check()) {
        // Lấy danh sách sản phẩm
        $products = Product::all();

        // Tạo một mảng chứa thông tin sản phẩm
        $productList = [];
        foreach ($products as $product) {
            $productItem = [
                'product_id' => $product->id,
                'product_name' => $product->name,            
               
                // Thêm thông tin khác của sản phẩm nếu cần thiết
            ];
            $productList[] = $productItem;
        }

        return response()->json([
            'message' => 'Product list ',
            'products' => $productList,
        ], 200);
    } else {
        return response()->json([
            'message' => 'Unauthorized',
        ], 401);
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
         // Lấy danh sách các product id từ bảng 'product'
         $productIds = Product::pluck('id')->toArray();
     
         // Kiểm tra và validate 'product_ids'
         $validatedData = $request->validate([
             'product_ids' => 'required|array|in:' . implode(',', $productIds),
         ]);
     
         // Lấy thông tin sản phẩm từ các product_ids
         $products = Product::whereIn('id', $validatedData['product_ids'])->get();
     
         // Tạo một mảng carts chứa thông tin sản phẩm
         $carts = [];
         foreach ($products as $product) {
             $cartItem = [
                 'product_id' => $product->id,
                 'product_name' => $product->name,
                 // Thêm thông tin khác của sản phẩm nếu cần thiết
             ];
             $carts[] = $cartItem;
         }
     
         return response()->json([
             'carts' => $carts,
         ], 201);
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
            'product_id' => 'required|exists:product,id',
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
