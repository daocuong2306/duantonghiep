<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryStatusBill extends Model
{
    use HasFactory;
    protected $table='history_status_bill';
    protected $fillable=['id', 'bill_id', 'user_id', 'infor_change'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
