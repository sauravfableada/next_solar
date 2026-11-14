<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $fillable = [
        'user_id',
        'actioned_by',
        'module',
        'taken_action',
        'message',
        'subtext',
        'ip_address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
