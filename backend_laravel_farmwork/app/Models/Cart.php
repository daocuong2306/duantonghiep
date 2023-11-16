<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'product_id', 'sku_id', 'quantity','status'];

    const PAID ='da_thanh_toan';
    const UNPAID = 'chua_thanh_toan';
    const COMFIRM = 'cho_xac_nhan';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function sku()
    {
        return $this->belongsTo(Sku::class);
    }

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'sku_id');
    }
}
