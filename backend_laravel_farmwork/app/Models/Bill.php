<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'address', 'phone', 'carts_id','payments','order_status'];
    const OFF ='thanh_toan_khi_nhan_han';
    const ON = 'thanh_toan_online';
    const Pending = 'cho_duyet';
    const Browser = 'da_duyet';
    const Pack = 'dong_goi';
    const Transport = 'van_chuyen';
    const Cancel = 'huy';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class,'carts_id');
    }

  
}
