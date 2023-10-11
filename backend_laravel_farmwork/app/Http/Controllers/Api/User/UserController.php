<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResources;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->query('key');
        if ($keyword != '') {
            $user = User::where('name', 'like', "%$keyword%")
                ->orWhere('email', 'like', "%$keyword%")
                ->get();
        } else {
            $user = User::get();
        }
        if ($user->count() > 0) {
            return response()->json([
                'status' => 200,
                'user' => $user,
                'isOke' => 'true'
            ], 200);
        } else {
            return response()->json([
                'status' => 200,
                'user' => 'null',
                'isOke' => 'false'
            ], 200);
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user && Auth::user()->id == $id) {
            return response()->json([
                'status' => 200,
                'user' => $user,
                'isOke' => 'true'
            ], 200);
        }
        if ($user && Auth::user()->role == 0) {
            return response()->json([
                'status' => 200,
                'user' => $user,
                'isOke' => 'true'
            ], 200);
        }
        if (!$user) {
            return response()->json([
                'status' => 401,
                'message' => 'Không có user này',
                'isOke' => 'false'
            ], 401);
        }
        if (Auth::user()->id != $id) {
            return response()->json([
                'status' => 401,
                'message' => 'Bạn Không thể xem được thông tin của user khác',
                'isOke' => 'false'
            ], 401);
        }
    }
    public function edit(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $oldImagePath = $user->image;
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        if ($oldImagePath) {
            File::delete(public_path($oldImagePath));
        }

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        }
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
            $imageUrl = asset('storage/images/' . basename($imagePath));
            $user->image = $imageUrl;
        }
        $user->name = $request->input('name');
        $user->save();
        return response()->json([
            'status' => 200,
            'user' => $user,
            'isOke' => 'true'
        ], 200);
    }
}
