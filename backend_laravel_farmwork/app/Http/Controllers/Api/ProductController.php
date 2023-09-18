<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        if($products->count()>0){
            return response()->json([
                'status'=>200,
                'product'=>$products,
            ],200);
        }else{
            return response()->json([
                'status'=>200,
                'message'=>'not found'
            ],400);
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
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'prices'=>'required',
            'description'=>'required',
            'status'=>'required',
            'image'=>'required',
            'code'=>'required',
            'quantity'=>'required',
            'id_category'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ],422);
        }else{
            $product=Product::create([
                'name'=>$request->name,
                'prices'=>$request->prices,
                'description'=>$request->description,
                'status'=>$request->status,
                'image'=>$request->image,
                'code'=>$request->code,
                'quantity'=>$request->quantity,
                'id_category'=>$request->id_category
            ]);

            if($product){
                return response()->json([
                    'status'=>200,
                    'message'=>'Successfull',
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>'Wrong',
                ],500);
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
        if($product){
            return response()->json([
                'status'=>200,
                'product'=>$product,
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Not found',
            ],404);
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
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'prices'=>'required',
            'description'=>'required',
            'status'=>'required',
            'image'=>'required',
            'code'=>'required',
            'quantity'=>'required',
            'id_category'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ],422);
        }else{
            $product = Product::find($id);
            if($product){
                $product->update([
                'name'=>$request->name,
                'prices'=>$request->prices,
                'description'=>$request->description,
                'status'=>$request->status,
                'image'=>$request->image,
                'code'=>$request->code,
                'quantity'=>$request->quantity,
                'id_category'=>$request->id_category
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>'Update Successfull',
                ],200);
            }else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Not found',
                ],404);
            }
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
        if($product){
            $product ->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Delete Successfull',
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Not found',
            ],404);
        }
    }
}
