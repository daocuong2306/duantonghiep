<?php

namespace App\Models;

use App\Cast\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'address', 'phone', 'carts_id','payments','order_status'];
    protected $cast = [
         'carts_id' => Json::class,
    ];
   
    const OFF ='thanh_toan_khi_nhan_han';
    const ON = 'thanh_toan_online';
    const Pending = 'cho_duyet';
    const Browser = 'da_duyet';
    const Pack = 'dong_goi';
    const Transport = 'van_chuyen';
    const Cancel = 'huy';
    const Success = 'thanh_cong';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class,'carts_id');
    }
    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
