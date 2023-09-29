<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
       use HasFactory;
       protected $table = 'product';
       protected $fillable = ['id', 'name', 'price', 'description', 'status', 'image', 'code', 'id_category', 'quantity'];

       public function skus()
       {
              return $this->hasMany(SKU::class);
       }
       public function variants()
       {
              return $this->hasMany(Variant::class);
       }
       public function comments()
       {
              return $this->hasMany(Comment::class);
       }
       public function category()
       {
              return $this->belongsTo(Category::class,'id_category');
       }
}
