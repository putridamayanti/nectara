<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Deposit;
use App\Models\Employee;
use App\Models\Expense;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $widgets = array();
        $charts = array();
        $results = array();

        $profile = User::where('id', Auth::id())
                    ->with('role')
                    ->with('role.permissions')
                    ->first();
        $queryEmployee = Employee::query();
        $queryAttendance = Attendance::query();
        $queryExpense = Expense::query();
        $queryLeave = Leave::query();
        $queryDeposit = Deposit::query();

        if ($profile->canAccess([1, 2, 3, 4, 5])) {
            $widgets[]  = ['title' => 'All Employee', 'data' => Employee::get()];
            $widgets[]  = ['title' => 'Monthly Expense', 'data' => Expense::whereYear('created_at', Carbon::now()->year)
                ->whereMonth('created_at', Carbon::now()->month)
                ->sum('amount')];
            $widgets[]  = ['title' => 'Today Leave', 'data' => Leave::whereDate('created_at', date('Y-m-d'))->get()];
            $widgets[]  = ['title' => 'Today Attendance', 'data' => Attendance::whereDate('created_at', date('Y-m-d'))->get()];

            $charts['employee_department'] = Employee::selectRaw('department_id, count(id)')
                ->groupBy('department_id')
                ->with('department')
                ->get();
            $charts['weekly_attendance']   = Attendance::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
                ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->groupBy(DB::raw('DATE(created_at)'))
                ->get();
            $charts['annual_expense']   = Expense::selectRaw('DATE_TRUNC(\'month\', created_at) AS month, SUM(amount) AS total')
                ->groupBy(DB::raw('DATE_TRUNC(\'month\', created_at)'))
                ->get();
            $charts['annual_deposit']   = Deposit::selectRaw('DATE_TRUNC(\'month\', created_at) AS month, SUM(amount) AS total')
                ->groupBy(DB::raw('DATE_TRUNC(\'month\', created_at)'))
                ->get();
            $results['today_attendance'] = Attendance::whereDate('created_at', date('Y-m-d'))->with('employee')->get();
        }

        if ($profile->canOnlyAccess([8]) && !$profile->canAccess([1,2,3,4])) {
            $employee   = Employee::where('user_id', Auth::id())->first();
            $personalAttendance = Attendance::where('employee_id', $employee->id);
            $leave      = $queryLeave->where('employee_id', $employee->id)->get();

            $results['employee'] = $employee;
            $results['show_clock']  = true;
            $widgets[]  = ['title' => 'Attendance', 'data' => $personalAttendance->get()];
            $widgets[]  = ['title' => 'Leave', 'data' => $leave];
            $results['personal_history_attendance'] = Attendance::where('employee_id', $employee->id)
                ->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                ->get();
        }

        $results['widgets'] = $widgets;
        $results['charts'] = $charts;

        return Inertia::render('app/dashboard', $results);
    }
}
