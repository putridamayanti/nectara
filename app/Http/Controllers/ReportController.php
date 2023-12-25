<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Deposit;
use App\Models\Employee;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Report Attendance
     */
    public function report_attendance(Request $request)
    {
        $monthly = Attendance::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        $employee = Employee::all();
        $attendance_by_employee = array();

        foreach ($employee as $item) {
            $attendance = Attendance::whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->where('employee_id', $item->id)
                ->get();
            $attendance_by_employee[] = [
                'employee_id'   => $item->id,
                'name'          => $item->name,
                'attendance'    => $attendance
            ];
        }

        $results = array();
        $results['monthly'] = $monthly;
        $results['attendance'] = $attendance_by_employee;
        $results['annual_attendance'] = Attendance::selectRaw('DATE_TRUNC(\'month\', created_at) AS month, COUNT(*) AS count')
            ->groupBy(DB::raw('DATE_TRUNC(\'month\', created_at)'))
            ->get();

        return Inertia::render('app/report/attendance', $results);
    }

    /**
     * Report Employee
     */
    public function report_employee(Request $request)
    {
        $results = array();
        $results['monthly_employee'] = Employee::selectRaw('DATE_TRUNC(\'month\', created_at) AS month, COUNT(*) AS count')
            ->groupBy(DB::raw('DATE_TRUNC(\'month\', created_at)'))
            ->get();
        $results['employee'] = Employee::with('department')
            ->with('designation')
            ->get();

        return Inertia::render('app/report/employee', $results);
    }

    /**
     * Report Finance
     */
    public function report_finance(Request $request)
    {
        $results = array();
        $results['monthly_deposit'] = Deposit::selectRaw('DATE_TRUNC(\'month\', created_at) AS month, SUM(amount) AS total')
            ->groupBy(DB::raw('DATE_TRUNC(\'month\', created_at)'))
            ->get();

        $results['monthly_expense'] = Expense::selectRaw('DATE_TRUNC(\'month\', created_at) AS month, SUM(amount) AS total')
            ->groupBy(DB::raw('DATE_TRUNC(\'month\', created_at)'))
            ->get();

        return Inertia::render('app/report/finance', $results);
    }
}
