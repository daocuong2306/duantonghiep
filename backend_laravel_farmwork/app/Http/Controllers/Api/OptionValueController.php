<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\OptionValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OptionValueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyword = $request->query('keyword');
        if ($keyword) {
            $option_values = OptionValue::where('value', $keyword)
                ->get();
            return response()->json([
                'status' => 200,
                'option_values' => $option_values,
                'isOke' => 'true',
                'message' => 'find by value '
            ], 200);
        }
        if (!$keyword) {
            $option_values = DB::table('option_values')
                ->join('options', 'option_values.option_id', '=', 'options.id')
                ->select('option_values.*', 'options.name as options_name')
                ->get();

            // $newArray = collect($option_values)->groupBy('option_id')->map(function ($item){
            //     return [
            //         "option_id" => $item->first()['option_id'],
            //         "value" => $item->pluck('value')->toArray()
            //     ];
            //    })->values()->toArray();;
            //    print_r($newArray);

            if ($option_values->count() > 0) {
                return response()->json([
                    "status" => 200,
                    "option_values" => $option_values,
                    'message' => 'dont find',
                ], 200);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'not found'
                ], 400);
            }
        }


        // $option_values = OptionValue::all();

        //     $option_values = DB::table('option_values')
        //     ->join('options', 'option_values.option_id', '=', 'options.id')
        //     ->select('option_values.*', 'options.name as options_name')
        //     ->get();

        //    if($option_values->count()>0){
        //     return response()->json([
        //        "status" => 200,
        //        "option_values" => $option_values,
        //     ],200);      
        //    }else{
        //     return response()->json([
        //         'status'=>200,
        //         'message'=>'not found'
        //     ],400);
        //    }
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
            'option_id' => 'required',
            'value' => 'required|array', // Thêm kiểm tra value là một mảng
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }

        $option_id = $request->input('option_id');
        $values = $request->input('value');
        foreach($values as $value){

        }
        $encodedValues = json_encode($values);
        $option_values = OptionValue::create([
            'option_id' => $option_id,
            'value' => $encodedValues,
        ]);

        if ($option_values) {
            return response()->json([
                'status' => 200,
               
                'message' => 'Successful',
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Error',
            ], 500);
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
        $option_values = OptionValue::find($id);
        if ($option_values) {
            return response()->json([
                'status' => 200,
                "option_values" => $option_values,
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
            'option_id' => 'required',
            'value' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $option_values = OptionValue::find($id);
            if ($option_values) {
                $option_values->update([
                    'option_id' => $request->option_id,
                    'value' => $request->value,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Update Successfull',
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Not found',
                ], 404);
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
        $option_values = OptionValue::find($id);
        if ($option_values) {
            $option_values->delete();
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
    public function properties()
    {
        // $option_id = $request->input('option_id');
        // $values = $request->input('value');
        // return response()->json([
        //     'option_id' => $option_id,
        //     'value' => $values,
        // ]);

    //     $option_values = OptionValue::all();
    //     $values = $option_values->map(function ($option_value) {
    //     return json_decode($option_value->value);
    // });

    // return response()->json([
    //     'status' => 200,       
    //     'values' => $values,
    // ], 200);
        // $values = json_decode($option_value->value, true);
        //  return response()->json([
        //     'option_id' => $option_value,
        //     'value' => $values,
        // ]);

    }
}
