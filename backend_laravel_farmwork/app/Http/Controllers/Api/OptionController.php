<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        // $options = DB::table('options')  
        //    ->join('option_values','options.id', '=','option_values.option_id')
        //    ->select('options.*','option_values.id as ','option_values.value as values')  
        //     ->get();

        // if ($options->count() > 0) {
        //     return response()->json([
        //         "status" => 200,
        //         "options" => $options,
        //     ], 200);
        // } else {
        //     return response()->json([
        //         'status' => 200,
        //         'message' => 'not found'
        //     ], 400);
        // }
        $options = DB::table('options')
        ->leftJoin('option_values', 'options.id', '=', 'option_values.option_id')
        ->select('options.id as option_id', 'options.name as option_name', 'option_values.value as value_name')
        ->get();

    $result = [];
    foreach ($options as $option) {
        $optionId = $option->option_id;
        $optionName = $option->option_name;
        $valueName = $option->value_name;

        // Check if the option exists in the result array
        if (!isset($result[$optionId])) {
            $result[$optionId] = [
                'name' => $optionName,
                'value' => null,
            ];
        }

        // Add the value to the option's value array if it exists
        if ($valueName) {
            $result[$optionId]['value'][] = [
                'name' => $valueName,
            ];
        }
    }

    if (!empty($result)) {
        return response()->json([
            "status" => 200,
            "options" => array_values($result),
        ], 200);
    } else {
        return response()->json([
            'status' => 200,
            'message' => 'not found',
        ], 400);
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
            'name' => 'required|unique:options',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $options = Option::create([
                'name' => $request->name,
            ]);

            if ($options) {
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
        $options = Option::find($id);
        if ($options) {
            return response()->json([
                'status' => 200,
                "options" => $options,
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
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $options = Option::find($id);
            if ($options) {
                $options->update([
                    'name' => $request->name,
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
        $options = Option::find($id);
        if ($options) {
            $options->delete();
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
