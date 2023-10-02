<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories= Category::all();
        if($categories->count()>0){
            return response()->json([
                'status'=>200,
                'categories'=>$categories,
            ],200);
        }else{
            return response()->json([
                'status'=>200,
                'message'=>'not found'
            ],400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request7  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            // 'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
            'image'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ],422);
        }else{
            // $categories=Category::create([
            //     'name'=>$request->name,
            //     'image'=>$request->image,
            // ]);
            $categories = new Category();
            $categories->name = $request->name;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('public/images');
                $imageUrl = Storage::url($imagePath);
                $categories->image = $imageUrl;
            }
            $categories->save();
            // if ($request->hasFile('image')) {
            //     $imagePath = $request->file('image')->store('public/images');
            //     $imageUrl = asset('storage/images/' . basename($imagePath));
            //     $categories->image = $imageUrl;
            // }

            if($categories){
                return response()->json([
                    'status'=>200,
                    'message'=>'Successfull',
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>'Wrong',
                ],500);
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
        $categories = Category::find($id);
        if($categories){
            return response()->json([
                'status'=>200,
                'categories'=>$categories,
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Not found',
            ],404);
        }
    }
      /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,int $id){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            // 'image' => 'image|mimes:jpg,png,jpeg,gif|max:2048',
            'image'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
               'errors' => $validator->messages(),
            ], 422);
        } else {
            $categories = Category::find($id);
            $oldImagePath = $categories->image;
            if ($oldImagePath) {
                Storage::delete($oldImagePath);
            }
            $categories->name = $request->name;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('public/images');
                $imageUrl = Storage::url($imagePath);
                $categories->image = $imageUrl;
            }
            $categories->save();
            if (!$categories) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Not found',
                ], 404);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Successfull',
            ], 200);
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
        $categories = Category::find($id);
        if($categories){
            $categories ->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Delete Successfull',
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Not found',
            ],404);
        }
    }
}
