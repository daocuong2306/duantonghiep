<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function listcomment()
    {

        $comment = DB::table('comments')
            ->join('users', 'users.id', '=', 'comments.id_user')
            ->join('product', 'product.id', '=', 'comments.id_product')
            ->select('comments.*', 'product.name as nameProduct', 'users.name as userName', 'users.image as userImage')
            ->get();
            
        // dd($comment);
        if ($comment->count() > 0) {
            return response()->json([
                'status' => 200,
                'comment' => $comment,
                'isOke' => 'true',
            ], 200);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'Chưa Có Comment nào',
            ], 400);
        }
    }
    public function addcomment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comments' => 'required|string',
            'evaluate' => 'required',
            'id_product' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fails',
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors()->toArray(),
            ]);
        }
        $comment = new Comment([
            'comments' => $request->comments,
            'evaluate' => $request->evaluate,
            'id_user' => Auth::user()->id,
            'id_product' => $request->id_product

        ]);
        $comment->save();
        return response()->json([
            'status' => 'success',
        ]);
    }
    public function deleteByAmin($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
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
    public function deleteByUser($id)
    {
        $comment = Comment::find($id);
        if ($comment->id_user == Auth::user()->id) {
            if ($comment) {
                $comment->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Delete Successfull',

                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không có bình luận này',
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Bạn Không Thể Xóa Bình Luân của user khác',
            ], 401);
        }
    }
    
    public function findCommentbyUser($id)
    {
        $comments = DB::table('comments')
            ->join('users', 'comments.id_user', '=', 'users.id')
            ->select('comments.*')
            ->where('users.id', $id)
            ->get();
        if ($comments) {
            return response()->json([
                'status' => 200,
                'findCommentbyUser' => $comments,
                'isOke' => 'true'
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'Người Dùng Chưa Bình Luận Sản Phẩm Nào',
            ], 401);
        }
    }
    public function findCommentbyProduct($id)
    {
        $comments = DB::table('comments')
            ->join('product', 'comments.id_product', '=', 'product.id')
            ->select('comments.*')
            ->where('product.id', $id)
            ->get();
        if ($comments) {
            return response()->json([
                'status' => 200,
                'findCommentbyProduct' => $comments,
                'isOke' => 'true'
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'Sản Phẩm Chưa Có Bình Luận Nào',
            ], 401);
        }
    }
}
