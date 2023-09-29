<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function home(Request $request)
    {
        $keyword = $request->query('key');
        $data = [];
        $evaluate = DB::table('evaluate')
            ->join('users', 'evaluate.id_user', '=', 'users.id')
            ->select('evaluate.*', 'users.name', 'users.image')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        $banner = Banner::orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
        $categories = DB::table('category')->get();
        $productNew = Product::orderBy('created_at', 'desc')->limit(3)->get();

        if ($keyword != '') {
            $products = Product::where('name', 'like', "%$keyword%")
                ->orWhere('code', 'like', "%$keyword%")
                ->get();
        } else {
            $products = DB::table('product')->get();
        }

        $data['ealuate'] = $evaluate;
        $data['products'] = $products;
        $data['categories'] = $categories;
        $data['banner'] = $banner;
        $data['productNew'] = $productNew;
        if ($data) {
            return response()->json([
                'status' => 200,
                'data' => $data,
                'isOke' => 'true'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'data' => 'null',
                'isOke' => 'false'
            ]);
        }
    }
}
