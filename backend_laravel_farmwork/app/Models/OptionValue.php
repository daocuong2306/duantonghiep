<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionValue extends Model
{
    use HasFactory;
    protected $table = 'option_values';
    protected $fillable=['id','product_id','option_id','value'];

    public function variants(){
        return $this->hasMany(Variant::class);
    }
}
