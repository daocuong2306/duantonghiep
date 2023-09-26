<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResources;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        if ($user->count() > 0) {
            return response()->json([
                'status' => 200,
                'user' => $user,
                'isOke' => 'true'
            ], 200);
        } else {
            return response()->json([
                'status' => 200,
                'message' => 'not found',
                'isOke' => 'false'
            ], 400);
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
                'isOke' => 'true'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not found',
                'isOke' => 'false'
            ], 404);
        }
    }
    public function edit(Request $request, $id)
    {
        $user = User::findOrFail($id);
        // dd($user);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);
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
