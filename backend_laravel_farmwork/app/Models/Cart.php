<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';

    // protected $fillable = ['user_id', 'product_ids'];

    // // Trường được ẩn khi trả về dữ liệu
    // protected $hidden = ['product_ids'];

    // // Trường sẽ trở thành một mảng khi truy cập
    // public function getProductIdsAttribute($value)
    // {
    //     return json_decode($value, true);
    // }

    // // Trường sẽ được gán giá trị dưới dạng chuỗi JSON
    // public function setProductIdsAttribute($value)
    // {
    //     $this->attributes['product_ids'] = json_encode($value);
    // }

    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
    protected $fillable = ['user_id', 'product_id', 'sku_id', 'quantity','price_cart','status'];

    const ORDER ='da_dat_hang';
    const NO_ORDER = 'chua_dat_hang';
 

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
    public function cart()
    {
        return $this->belongsTo(Cart::class, 'cart_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function sku()
    {
        return $this->belongsTo(Sku::class, 'sku_id');
    }
    public function variant()
    {
        return $this->belongsTo(Variant::class, 'sku_id');
}
}
