<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Attendance::query();

        if (\request('employee')) {
            $query = $query->where('employee_id', \request('employee'));
        }

        if (\request('start') && \request('end')) {
            $from = date(\request('start'));
            $to = date(\request('end'));
            $query = $query->whereBetween('date', [$from, $to]);
        }

        $profile = User::with('role')->where('id', Auth::id())->first();

        if (!$profile->is_admin && $profile->canAccess([17])) {
            $employee = Employee::where('user_id', $profile->id)->first();
            if ($employee != null) {
                $query = $query->where('employee_id', $employee->id);
            }
        }

        $query = $query->with('employee');

        return Inertia::render('app/attendance/index', [
            'attendance'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employee = Employee::all();

        return Inertia::render('app/attendance/create', [
            'employees'     => $employee
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id'   => 'required',
            'date'          => 'required'
        ]);

        $input = $request->all();

        if ($request->filled('clock_out') && !$request->filled('clock_in')){
            $input['clock_in'] = $request->clock_out;
        }

        $data   = new Attendance();
        $data->fill($input)->save();

        $url = '/app/attendance';
        if ($request->url) {
            $url = $request->url;
        }

        return Inertia::location($url);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = Attendance::findOrFail($id);
        $employee = Employee::all();

        return Inertia::render('app/attendance/edit', [
            'attendance'    => $data,
            'employees'     => $employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'employee_id'   => 'required',
            'date'          => 'required'
        ]);

        $data = Attendance::findOrFail($id);

        $data->fill($request->all())->save();

        $url = '/app/attendance';
        if ($request->url) {
            $url = $request->url;
        }

        return Inertia::location($url);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Attendance::destroy($ids);

        return Inertia::location('/app/attendance');
    }
}
