<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'country_code',
        'currency',
        'address',
        'zipcode',
        'default_leave_quota'
    ];
}
