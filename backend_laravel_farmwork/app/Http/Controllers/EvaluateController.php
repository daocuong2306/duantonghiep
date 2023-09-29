<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Evaluate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EvaluateController extends Controller
{
    public function addEvaluate(Request $request)
    {
        $evaluate = DB::table('evaluate')->get();
        // dd($evaluate);

        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
        // if ($evaluate->id_user == Auth::user()->id) {

        // } 
        else {
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
    public function showEvaluateWithUser()
    {
        $evaluate = DB::table('evaluate')
            ->join('users', 'evaluate.id_user', '=', 'users.id')
            ->select('evaluate.*', 'users.name', 'users.image')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        if ($evaluate->count() > 0) {
            return response()->json([
                'status' => 200,
                'evaluate' => $evaluate,
                'isOke' => 'true',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                // 'evaluate' => $evaluate,
                'message' => 'Chưa có đánh giá nào',
                'isOke' => 'false',
            ], 404);
        }
    }
    public function showAll()
    {
        $evaluate = DB::table('evaluate')
            ->join('users', 'evaluate.id_user', '=', 'users.id')
            ->select('evaluate.*', 'users.name', 'users.image')
            ->get();
        if ($evaluate->count() > 0) {
            return response()->json([
                'status' => 200,
                'evaluate' => $evaluate,
                'isOke' => 'true',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                // 'evaluate' => $evaluate,
                'message' => 'Chưa có đánh giá nào',
                'isOke' => 'false',
            ], 404);
        }
    }
    public function getEvalueByUser()
    {
        $id = Auth::user()->id;
        $evaluate = DB::table('evaluate')->find($id);
        // dd($evaluate);
        if ($evaluate) {
            return response()->json([
                'status' => 200,
                'evaluate' => $evaluate,
                'isOke' => 'true',
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                // 'evaluate' => $evaluate,
                'message' => 'Bạn chưa đánh giá',
                'isOke' => 'false',
            ], 404);
        }
    }
    public function editEvaluate(Request $request)
    {
        $id = Auth::user()->id;
        $evaluate = DB::table('evaluate')->find($id);

        $validator = Validator::make($request->all(), [
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            if ($evaluate) {
                $evaluate->update([
                    'content' => $request->content,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Update Successfull',
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không có bình luận này',
                ], 404);
            }
        }
    }
}
