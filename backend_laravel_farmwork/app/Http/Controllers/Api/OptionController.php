<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $options = Option::all();
       if($options->count()>0){
        return response()->json([
           "status" => 200,
           "options" => $options,
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
            'product_id'=>'required',
            'name'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ],422);
        }else{
            $options = Option::create([
                'product_id'=>$request->product_id,
                'name'=>$request->name,
            ]);

            if($options){
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
        $options = Option::find($id);
        if($options){
            return response()->json([
                'status'=>200,
                "options" => $options,
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
            'product_id'=>'required',
            'name'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ],422);
        }else{
            $options = Option::find($id);
            if($options){
                $options->update([
                    'product_id'=>$request->product_id,
                    'name'=>$request->name,
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
        $options = Option::find($id);
        if($options){
            $options ->delete();
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

