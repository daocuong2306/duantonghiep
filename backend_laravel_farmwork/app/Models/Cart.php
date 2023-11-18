<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';

    protected $fillable = ['user_id', 'product_ids'];

    // Trường được ẩn khi trả về dữ liệu
    protected $hidden = ['product_ids'];

    // Trường sẽ trở thành một mảng khi truy cập
    public function getProductIdsAttribute($value)
    {
        return json_decode($value, true);
    }

    // Trường sẽ được gán giá trị dưới dạng chuỗi JSON
    public function setProductIdsAttribute($value)
    {
        $this->attributes['product_ids'] = json_encode($value);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}