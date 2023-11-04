<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->query('id');
        $keyword = $request->query('keyword');
        if ($id || $keyword) {
            $products = Product::where(function ($query) use ($id, $keyword) {
                if ($id) {
                    $query->where('id_category', $id);
                }

                if ($keyword) {
                    $query->where(function ($query) use ($keyword) {
                        $query->where('name', 'like', "%$keyword%")
                            ->orWhere('code', 'like', "%$keyword%");
                    });
                }
            })
                ->join('category', 'product.id_category', '=', 'category.id')
                ->select('product.*', 'category.name as category_name')               
                ->get();
            return response()->json([
                'status' => 200,
                'product' => $products,
                'isOke' => 'true',
                'message' => 'find by category and keywords'
            ], 200);
        }

        if (!$id && !$keyword) {
            $products = DB::table('product')
                ->join('category', 'product.id_category', '=', 'category.id')
                ->select('product.*', 'category.name as category_name')
                ->get();
            if ($products->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'product' => $products,
                    'message' => 'dont find',
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'not found'

                ], 404);
            }
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
        $rules = [
            'name' => 'required|unique:product',
            'price' => 'required',
            'description' => 'required',
            'status' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
            'code' => 'required|unique:product',
            'id_category' => 'required',
        ];
    
        $messages = [
            'name.required' => 'Vui lòng nhập tên sản phẩm.',
            'name.unique' => 'Tên sản phẩm đã tồn tại.',
            'price.required' => 'Vui lòng nhập giá sản phẩm.',
            'description.required' => 'Vui lòng nhập mô tả sản phẩm.',
            'status.required' => 'Vui lòng chọn trạng thái sản phẩm.',
            'image.required' => 'Vui lòng chọn một hình ảnh.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: jpg, png, jpeg hoặc gif.',
            'image.max' => 'Kích thước tối đa cho phép của hình ảnh là 2048 KB.',
            'code.required' => 'Vui lòng nhập mã sản phẩm.',
            'code.unique' => 'Mã sản phẩm đã tồn tại.',
            'id_category.required' => 'Vui lòng chọn danh mục.',
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $products = new Product();
            $products->name = $request->name;
            $products->price = $request->price;
            $products->description = $request->description;
            $products->status = $request->status;
            $products->code = $request->code;
            $products->id_category = $request->id_category;
    
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('public/images');
                $imageUrl = Storage::url($imagePath);
                $products->image = $imageUrl;
            }
    
            $products->save();
    
            if ($products) {
                return response()->json([
                    'status' => 200,
                    'product' => $products,
                    'message' => 'Thêm sản phẩm thành công.',
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Có lỗi xảy ra khi thêm sản phẩm.',
                ], 500);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::join('category', 'product.id_category', '=', 'category.id')
            ->select('product.*', 'category.name as category_name')
            ->find($id);
    
        if ($product) {
            return response()->json([
                'status' => 200,
                'product' => $product,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy sản phẩm',
            ], 404);
        }
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
             $rules = [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'status' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
            'code' => 'required',
            'id_category' => 'required',
        ];
    
        $messages = [
            'name.required' => 'Vui lòng nhập tên sản phẩm.', 
            'price.required' => 'Vui lòng nhập giá sản phẩm.',
            'description.required' => 'Vui lòng nhập mô tả sản phẩm.',
            'status.required' => 'Vui lòng chọn trạng thái sản phẩm.',
            'image.required' => 'Vui lòng chọn một hình ảnh.',
            'image.image' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: jpg, png, jpeg hoặc gif.',
            'image.max' => 'Kích thước tối đa cho phép của hình ảnh là 2048 KB.',
            'code.required' => 'Vui lòng nhập mã sản phẩm.',
            'id_category.required' => 'Vui lòng chọn danh mục.',
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $products = Product::find($id);
            $products->name = $request->name;
            $products->price = $request->price;
            $products->description = $request->description;
            $products->status = $request->status;
            $products->code = $request->code;
            // $products->quantity = $request->quantity;
            $products->id_category = $request->id_category;
       
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('public/images');
                $imageUrl = Storage::url($imagePath);
                $products->image = $imageUrl;
            }
            $products->save();
            if (!$products) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Not found',
                ], 404);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Successfull',
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
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
