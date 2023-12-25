<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'leave_type_id',
        'title',
        'reason',
        'days',
        'start_date',
        'end_date',
        'status'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function leave_type()
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id', 'id');
    }
}
