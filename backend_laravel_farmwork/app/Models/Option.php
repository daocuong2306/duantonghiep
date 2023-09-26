<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;
    protected $table = 'options';
    protected $fillable=['id','product_id','name']; 

    public function variants(){
        return $this->hasMany(Variant::class);
    }
}
