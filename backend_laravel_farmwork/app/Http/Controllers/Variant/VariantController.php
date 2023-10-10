<?php

namespace App\Http\Controllers\Variant;

use App\Http\Controllers\Controller;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VariantController extends Controller
{
  
    public function index()
    {
        $variants = Variant::all();

        $variants = DB::table('variants')
        ->join('product', 'variants.product_id', '=', 'products.id')
        ->join('skus', 'variants.skus_id', '=', 'skus.id')
        ->join('options', 'variants.option_id', '=', 'options.id')
        ->join('option_values', 'variants.option_value_id', '=', 'option_values.id')
        ->select('variants.*', 'product.name as product_name', 'skus.name as skus_name', 'options.name as option_name', 'option_values.name as option_value_name')
        ->get();

       if($variants->count()>0){
        return response()->json([
           "status" => 200,
           "option_values" => $variants,
           'isOke'=>'true',
        ],200);      
       }else{
        return response()->json([
            'status'=>200,
            'message'=>'not found'       
        ],400);
       }
    }
   
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'products_id'=>'required',
            'skus_id'=>'required',
            'option_id'=>'required',
            'option_values_id'=>'required', 
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ],422);
        }else{
            $option_values = Variant::create([
                 'option_id'=>$request-> option_id,
                'value'=>$request->value,
            ]);

            if($option_values){
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


    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
