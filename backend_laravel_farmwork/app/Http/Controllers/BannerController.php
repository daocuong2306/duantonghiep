<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    public function getNewBanner()
    {
        $newestProducts = Banner::orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        // dd($newestProducts);
        if ($newestProducts->count() > 0) {
            return response()->json([
                'status' => 200,
                'message' => 'Successfull',
                'banner' => $newestProducts,
                'isOke' => 'true'
            ]);
        }
    }
    public function addBanner(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $banner = new Banner();
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('public/images');
                $imageUrl = asset('storage/images/' . basename($imagePath));
                $banner->image = $imageUrl;
            }
            $banner->content = $request->content;
            $banner->save();
        }
        if ($banner) {
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
    public function deleteBanner($id)
    {
        $banner = Banner::find($id);
        if ($banner) {
            $banner->delete();
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
