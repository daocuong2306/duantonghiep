<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Evaluate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EvaluateController extends Controller
{
    public function AddEvaluate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);
        if ($validator->failed()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $evaluate = Evaluate::create([
                'content' => $request->content,
                'id_user' => Auth::user()->id,
            ]);
            if ($evaluate) {
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
    
}
