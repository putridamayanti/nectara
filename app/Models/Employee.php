<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'department_id',
        'designation_id',
        'name',
        'avatar',
        'phone',
        'employment_type',
        'basic_salary',
        'date_of_birth',
        'gender',
        'address',
        'country_code',
        'city',
        'zipcode',
        'join_date',
        'leave_date',
        'marital_status',
        'quota_leave',
        'remaining_leave'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }

    public function designation()
    {
        return $this->belongsTo(Designation::class, 'designation_id', 'id');
    }
}
