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
    public function index($option_id)
    {
        $option_values = DB::table('option_values')
            ->where('option_id', $option_id)
            ->get();
        if ($option_values) {
            return response()->json([
                "status" => 200,
                "option_values" => $option_values,
                'isOk' => 'true',
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'option_id' => 'required',
    //         'values' => 'required', // Thêm kiểm tra value là một mảng
    //     ]);
    //     // dd($request);
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 422,
    //             'errors' => $validator->messages(),
    //         ], 422);
    //     }
    //     $values = $request->values;
    //     foreach ($values as $value) {
    //         $option_value = new OptionValue();
    //         $option_value->value = $value;
    //         $option_value->option_id = $request->option_id;
    //         $option_value->save();
    //     }
    //     $all = OptionValue::all();
    //     return response()->json([
    //         'status' => 200,
    //         'option_value' => $all,
    //         'message' => 'Successful',
    //     ], 200);
    // }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'option_id' => 'required',
            'values' => 'required|array',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
    
        $values = $request->values;
        $optionId = $request->option_id;
    
        // Kiểm tra giá trị không trùng lặp và không trùng với cơ sở dữ liệu
        $uniqueValues = array_unique($values);
        $existingValues = OptionValue::whereIn('value', $uniqueValues)
            ->where('option_id', $optionId)
            ->get();
    
        if (count($existingValues) > 0) {
            return response()->json([
                'status' => 422,
                'errors' => ['values' => ['Có giá trị trùng lặp hoặc đã tồn tại trong cơ sở dữ liệu.']],
            ], 422);
        }
    
        // Lưu giá trị vào cơ sở dữ liệu nếu không có giá trị trùng lặp
        foreach ($values as $value) {
            $optionValue = new OptionValue();
            $optionValue->value = $value;
            $optionValue->option_id = $optionId;
            $optionValue->save();
        }
    
        // Xử lý logic lưu dữ liệu khi không có lỗi validation
        // ...
    
        return response()->json([
            'status' => 200,
            'message' => 'Successful',
        ], 200);
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
   
    
}