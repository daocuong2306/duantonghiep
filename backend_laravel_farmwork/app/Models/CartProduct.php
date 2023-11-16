<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model
{
    use HasFactory;
    protected $table='cartproducts';
    protected $fillable = ['user_id','cart_id', 'product_id', 'sku_id', 'quantity','price_cartpro','status'];

    const ORDER ='da_dat_hang';
    const NO_ORDER = 'chua_dat_hang';
 

    public function user()
    {
        return $this->belongsTo(User::class);
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