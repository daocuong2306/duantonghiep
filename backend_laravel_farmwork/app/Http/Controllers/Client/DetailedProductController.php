<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\map;

class DetailedProductController extends Controller
{
    public function getOneProduct($id, Request $request)
    {
        $error = '';
        $product = DB::table('product')
            ->join('category', 'category.id', '=', 'product.id_category')
            ->where('product.id', $id)
            ->first();
        $optionvalue = DB::table('variants')->where('product_id', $id)
            ->join('skus', 'skus.id', '=', 'variants.sku_id')
            ->join('option_values', 'variants.option_value_id', '=', 'option_values.id')
            ->join('options', 'options.id', '=', 'option_id')
            ->get();
        $comments = DB::table('comments')
            ->join('product', 'comments.id_product', '=', 'product.id')
            ->join('users', 'users.id', '=', 'id_user')
            ->select('comments.*', 'users.name AS name_user', 'users.email AS email_user', 'users.image AS avatar_user')
            ->where('product.id', $id)
            ->get();


        $handleOption = collect($optionvalue)->groupBy('name');
        $a = $handleOption->map((function ($user) {
            return $user->map(function ($item) {
                return collect($item)->only(['value', 'option_value_id'])->all();
            });
        }));
        $handle = collect($optionvalue)->groupBy('sku_id');
        $resultOptionValue = [];
        foreach ($a as $key => $items) {

            $uniqueItems = $items->unique('option_value_id')->values()->all();
            $resultOptionValue[$key] = $uniqueItems;
        }
        $searchOptionValueIds = $request->searchOptionValueId;
        if ($searchOptionValueIds) {
            $foundItems = [];
            $sku = '';
            foreach ($handle as $key => $items) {
                $foundOptionValueIds = [];

                foreach ($items as $item) {
                    $foundOptionValueIds[] = $item->option_value_id;
                }
                $checkArray = array_diff($foundOptionValueIds, $searchOptionValueIds);
                if (empty($checkArray)) {
                    $foundItems[$key] = $items;
                    $sku = $key;
                    $error = '';
                }
            }
            if ($sku) {
                $priceSku = DB::table('skus')
                    ->select('price AS sku_price','id AS sku_id')
                    ->where('id', $sku)
                    ->get();
                    // dd($priceSku);
            } else {
                $error = 'sản phẩm không có biến thể này';
                $sku = null;
                $priceSku = null;
            }
        } else {
            $priceSku = null;
        }

        if ($comments) {
            $listcomment = $comments;
        } else {
            $listcomment = 'sản phẩm chưa có bình luận';
        }
        $data['product'] = $product;
        $data['priceSku'] = $priceSku;
        $data['variant'] = $resultOptionValue;
        $data['comment'] = $listcomment;
        return response()->json([
            'data' => $data,
            'errors' => $error
        ]);
    }
}
