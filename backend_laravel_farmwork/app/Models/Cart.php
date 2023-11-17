<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $fillable = ['user_id','product_id'];
    // , 'sku_id', 'quantity','price_cart','status'
    const ORDER ='da_dat_hang';
    const NO_ORDER = 'chua_dat_hang';
 

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
        return $this->belongsTo(Sku::class, 'sku_id');
    }

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'sku_id');
    }
}
