<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;
    protected $table='variants';
    protected $fillable=['id','product_id','sku_id','option_id','option_value_id'];
    public function products(){
        return $this->belongsTo(Product::class);
    }
    public function skus(){
        return $this->belongsTo(SKU::class);
    }
    public function option(){
        return $this->belongsTo(Option::class);
    }
    public function option_value(){
        return $this->belongsTo(OptionValue::class);
    }
}
