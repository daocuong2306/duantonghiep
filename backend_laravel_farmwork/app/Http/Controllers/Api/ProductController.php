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
        if ($id) {
            $products = DB::table('product')
                ->where('id_category', $id)
                ->get();


            return response()->json([
                'status' => 200,
                'product' => $products,
                'isOke' => 'true',
                'message' =>'find by category'
            ], 200);
        }
        if ($keyword) {
            $products = Product::where('name', 'like', "%$keyword%")
                ->orWhere('code', 'like', "%$keyword%")
                ->get();

            return response()->json([
                'status' => 200,
                'product' => $products,
                'isOke' => 'true',
                'message' =>'find by name or code',
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
                    'message' =>'dont find',
                ], 200);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'not found'
                    
                ], 400);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'status' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
            'code' => 'required',
            'quantity' => 'required',
            'id_category' => 'required'
        ]);
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
            $products->quantity = $request->quantity;
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
                    'message' => 'Successfull',
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Wrong',
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
        $product = Product::find($id);
        if ($product) {
            return response()->json([
                'status' => 200,
                'product' => $product,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not found',
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'status' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
            'code' => 'required',
            'quantity' => 'required',
            'id_category' => 'required'
        ]);
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
            $products->quantity = $request->quantity;
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
    // public function findByCategory(Request $request){
    //     $id = $request->query('id');
    //    $products = DB:: table('product')
    //    ->where('id_category', $id)
    //    ->get();

    //    if($id){
    //     return response()->json([
    //         'status'=>200,
    //         'product'=>$products,
    //         'isOke'=>'true',
    //     ],200);
    //   }else{
    //     return response()->json([
    //         'status'=>200,
    //         'message'=>'not category',
    //         'isOke'=>'false',
    //     ],400);
    //    }
    // }
    // public function findByKeyword(Request $request){
    //     $keyword = $request->query('keyword');
    //     $products = Product::where('name', 'like', "%$keyword%")
    //     ->orWhere('code', 'like', "%$keyword%")
    //     ->get();
    //     if($keyword){
    //         return response()->json([
    //             'status'=>200,
    //             'product'=>$products,
    //             'isOke'=>'true',
    //         ],200);
    //       }else{
    //         return response()->json([
    //             'status'=>200,
    //             'message'=>'not category',
    //             'isOke'=>'false',
    //         ],400);
    //        }
    // }

}
