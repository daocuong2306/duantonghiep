<?php

namespace App\Http\Controllers\Variant;

use App\Http\Controllers\Controller;
use App\Models\OptionValue;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VariantController extends Controller
{
    public function getOptionValue(Request $request)
    {
        $arrays = $request->arrayValue;

        $result = [[]];
        // [
        //     [
        //         1,
        //         2,
        //         3
        //     ],
        //     [
        //         7,
        //         8,
        //         9
        //     ]
        //     ];
        if (!empty($arrays)) {
            foreach ($arrays as $key => $values) {
                $append = [];
                foreach ($values as $value) {
                    foreach ($result as $data) {
                        $append[] = $data + [$key => $value];
                    }
                }
                $result = $append;
            }
            $variant = [];
            foreach ($result as  $key => $option_value) {
                for ($i = 0; $i < count($option_value); $i++) {
                    $option = OptionValue::find($option_value[$i])->value;
                    $option_value[$i] = $option;
                }
                $variant[] = $option_value;
            }
            return response()->json(
                [
                    'variant' => $variant
                ],200

            );
        }else{
            return response()->json(
                [
                    'error' =>" Request truyền vào phải là một mảng"
                ],422
            );
        }
    }
    public function addVariant(Request $request){


    }
}
