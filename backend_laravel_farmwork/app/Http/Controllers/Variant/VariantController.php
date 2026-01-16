<?php

namespace App\Http\Controllers\Variant;

use App\Http\Controllers\Controller;
use App\Models\OptionValue;
use App\Models\SKU;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VariantController extends Controller
{
    public function getOptionValue(Request $request)
    {
        $arrays = $request->arrayValue;

        $result = [[]];
        if (!empty($arrays)) {
            foreach ($arrays as $key => $values) {
                $append = [];
                foreach ($values as $value) {
                    foreach ($result as $data) {
                        $append[] = $data + [$key => $value];
                    }
                }
                $result = $append;
            }
            $variant = [];
            foreach ($result as  $key => $option_value) {
                for ($i = 0; $i < count($option_value); $i++) {
                    $option = OptionValue::find($option_value[$i]);
                    $option_value[$i] = $option;
                }
                $variant[] = $option_value;
            }
            return response()->json(
                [
                    'variant' => $variant
                ],
                200

            );
        } else {
            return response()->json(
                [
                    'error' => " Request truyền vào phải là một mảng"
                ],
                422
            );
        }
    }
    public function addVariant(Request $request)
    {
        $varants = $request->variants;

        foreach ($varants as $item) {
            $validator = Validator::make($item, [
                "price" => 'required|integer',
                "stock" => 'required|numeric',
                "sku" => 'required|unique:skus',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ], 422);
            } else {
                $sku = new SKU();
                $sku->price = $item['price'];
                $sku->stoke = $item['stock'];
                $sku->sku = $item['sku'];
                $sku->save();
                foreach ($item['option_value'] as $option) {
                    // dd($item['option_value']);
                    $result[] = [
                        'option_value_id' => $option,
                        'product_id' => $item['product_id'],
                        'sku_id' => $sku->id
                    ];
                }
            }
        }
        if ($result) {
            Variant::insert($result);
            $listAll = Variant::all();
            return response()->json([
                'msg' => 'success',
                'isOke' => 'true',
            ]);
        } else {
            return response()->json([
                'error' => '~~~~~~~~~~~~~'
            ], 404);
        }
    }
    public function listVariant(Request $request)
    {
        $id = $request->id;
        if ($id) {
            $variant = DB::table('variants')
                ->where('product_id', $id)
                ->join('skus', 'sku_id', '=', 'skus.id')
                ->join('option_values', 'option_value_id', '=', 'option_values.id')
                ->select(
                    'variants.id',
                    'variants.product_id',
                    'variants.sku_id',
                    'variants.option_value_id',
                    'skus.price AS skus_price',
                    'skus.stoke AS sku_stock',
                    'skus.sku AS sku',
                    'skus.barcode AS sku_code',
                    'option_values.value AS option_value'
                )
                ->get();
            $handleVariant = collect($variant)->groupBy('sku_id');
            // dd($handleVariant);
            $result = [];
            foreach ($handleVariant as $key =>  $items) {
                $value_array = [];
                foreach ($items as  $value) {
                    // dd($value);
                    $value_array[] = $value->option_value;

                    $result[$key] = [
                        "product_id" => $value->product_id,
                        "sku_id" => $value->sku_id,
                        "skus_price" => $value->skus_price,
                        "sku_code" => $value->sku_code,
                        "stock" => $value->sku_stock,
                        "option_value" => $value_array


                    ];
                }
            }

            return response()->json([
                'handleVariant' => $result,
                'isOk' => 'true',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Không có sản phẩm này'
            ], 404);
        }
    }
    public function deleteVariant($id)
    {
        //delete variant by sku_id
        $variants = Variant::where('sku_id', $id)->get();
        $sku=SKU::find($id);
        if ($variants->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy biến thể'], 404);
        }
        // Xóa tất cả các biến thể
        foreach ($variants as $variant) {
            $variant->delete();
        }
        $sku->delete();
        return response()->json(['message' => 'Biến thể đã được xóa thành công'], 200);
    }
    public function updateVariant(Request $request, $id)
    {
        $variant = Variant::where('sku_id', $id)->first();

        if (!$variant) {
            return response()->json(['message' => 'Không tìm thấy biến thể'], 404);
        } else {
            $validator = Validator::make($request->all(), [
                "price" => 'required|integer',
                "stock" => 'required|numeric',
                "sku" => 'required|unique:skus',
            ]);
            $sku = SKU::find($id);
            $sku->price=$request->price;
            $sku->stoke=$request->stock;
            $sku->sku=$request->sku;
            $sku->save();
            return response()->json([
                'MSG' => 'update successful',
                'sku'=>$sku
            ]);
        }
    }
}
