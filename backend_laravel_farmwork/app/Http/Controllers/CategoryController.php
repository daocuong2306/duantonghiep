<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index (Request $request){
        $categories = DB::table('category')
        ->select('id','name','image')
        ->whereNULL('deleted_at')
        ->get();
        return view('category.index',compact('categories'));
    }
    public function add(Request $request){
        if($request->isMethod('POST')){
            $params = $request->except('_token');
            if($request->hasFile('image') && $request->file('image')->isValid()){
                $params['image']= uploadFile('hinh',$request->file('image'));
            }
            
            $categories = Category::create($params);
            if($categories->id){
                Session::flash('success','them moi thanh cong');
                return redirect()->route('category_add');
            }
        }
             return view('category.add');
    }
     public function edit(Request $request,$id){
      $categories =Category::find($id);
      if($request->isMethod('post')){
        $params = $request->except('_token');
        if($request->hasFile('image') && $request->file('image')->isValid()){
            $resultDL= Storage::delete('/public/'.$categories->image);
            if($resultDL){
                $params['image']= uploadFile('hinh',$request->file('image'));
            }
        }else{
            $params['image']=$categories->image;
        }
        $result=Category::where('id',$id)
        ->update($params);
        if($request){
          Session::flash('success','sua thanh cong ');
          return redirect()->route('category_edit',['id'=>$id]);
      }
      }
      return view('category.edit',compact('categories'));
  }
  public function delete($id){
    Category::where('id',$id)
    ->delete();
    Session::flash('success','xoa thành công '.$id);
    return redirect()->route('category_index');


    
}
}
