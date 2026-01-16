<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SKU extends Model
{
    use HasFactory;
    protected $table='skus';
    protected $fillable=['id','product_id','name','barcode','price','stock'];

    public function product(){
      return $this->belongsTo(Product::class);
    }
    public function variant(){
        return $this->hasMany(Variant::class);
    }
}
