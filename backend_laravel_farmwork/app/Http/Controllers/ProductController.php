<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request){
         $products = DB::table('category')
        //  ->select('id','name','prices','description','status','image','code','id_category')
        //  ->whereNULL('deleted_at')
         ->join('product', 'category.id', '=', 'product.id_category')
          ->select('category.*','product.id as idproduct','product.name as nameproduct','product.prices as prices','product.description as description','product.status as status','product.image as imageproduct','product.code as code')
         ->get();
       
          return view('product.index',compact('products'));
    }
    
    public function addproducts(Request $request){
        $category = DB::table('category')->get();
        if($request->POST()){
            $params = $request->except('_token');
            if($request->hasFile('image') && $request->file('image')->isValid()){
                $params['image']= uploadFile('hinh',$request->file('image'));
            }
            $product = Product::create($params);
            if($product->id){
                Session::flash('success','them moi thanh cong');
                return redirect()->route('product_add');
            }
        }
        return view("product.add",compact("category"));
    }
    public function editproduct(Request $request,$id){
         $products = Product::find($id);
         $category = DB::table('category')->get();
         if($request->isMethod('POST')){
            $parmas = $request->except('_token');
            if($request->hasFile('image') && $request->file('image')->isValid()){
                //xóa ảnh cũ
                $resultDL= Storage::delete('/public/'.$products->image);
                if($resultDL){
                    $params['image']= uploadFile('hinh',$request->file('image'));
                }
            }
            else{
                $params['image'] = $products->image;
            }
            Product::where('id',$id)
            ->update($parmas);
            if($request){
                Session::flash('success','sua thanh cong ');
                return redirect()->route('product_edit',['id'=>$id]);
            }
        }
        return view('product.edit',compact('products','category'));
    }
    public function deleteproduct($id){
        Product::where('id',$id)
        ->delete();
        Session::flash('success','xoa thành công '.$id);
        return redirect()->route('product_index');
    }
}
