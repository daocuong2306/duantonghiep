<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function addImageProduct(Request $request)
    {
        $images = $request->file('image');
        $newImages = [];
        if (!empty($images)) {
            foreach ($images as $image) {
                if ($request->hasFile('image')) {
                    $imagePath = $image->store('public/images');
                    $imageUrl = 'storage/images/' . basename($imagePath);
                    $newImages[] = [
                        'image' => $imageUrl,
                        'id_product' => $request->id_product
                    ];
                }
            }
            Image::insert($newImages);
            return response()->json([
                'images' => 'Added new images',
            ], 200);
        }else{
            return response()->json([
                'status' => 401,
                    'message' => 'Bạn Phải thêm ảnh',
            ],401);
        }
    }
    public function addImageComment(Request $request)
    {
        $images = $request->file('image');
        $newImages = [];
        if (!empty($images)) {
            foreach ($images as $image) {
                if ($request->hasFile('image')) {
                    $imagePath = $image->store('public/images');
                    $imageUrl = 'storage/images/' . basename($imagePath);
                    $newImages[] = [
                        'image' => $imageUrl,
                        'id_comment' => $request->id_comment
                    ];
                }
            }
            Image::insert($newImages);
            return response()->json([
                'images' => 'Added new images',
            ], 200);
        }else{
            return response()->json([
                'status' => 401,
                    'message' => 'Bạn Phải thêm ảnh',
            ],401);
        }
    }
    public function getImagebyProduct()
    {
    }
}
