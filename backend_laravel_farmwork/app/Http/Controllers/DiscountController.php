<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DiscountController extends Controller
{
    public function addDiscount(Request $request){
        $validator=Validator::make($request->all(),[
            'discount_code' => 'required',
            'value' => 'required|max:5',
            'type' => 'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }else{
            
        }
    }
}
