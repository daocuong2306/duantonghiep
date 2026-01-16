<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    protected $table='settingshop';
    protected $fillable=['id','logo','nameshop','address','city','emailshop','phone','website_link','facebook_link','twitter_link','instagram_link'];
}
