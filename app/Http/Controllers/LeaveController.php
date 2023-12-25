<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Leave;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Leave::query();

        if (\request('keyword')) {
            $query = $query->where('title', 'LIKE', "%" . \request('keyword') . "%");
        }

        if (\request('employee')) {
            $query = $query->where('employee_id', \request('employee'));
        }

        if (\request('type')) {
            $query = $query->where('leave_type_id', \request('type'));
        }

        if (\request('start') && \request('end')) {
            $from = date(\request('start'));
            $to = date(\request('end'));
            $query = $query->whereBetween('date', [$from, $to]);
        }

        if (\request('status')) {
            $query = $query->where('status', \request('status'));
        }

        $query = $query->with('employee')->with('leave_type');

        return Inertia::render('app/leave/index', [
            'leave'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $types = LeaveType::all();
        $employees = Employee::all();

        return Inertia::render('app/leave/create', [
            'employees'     => $employees,
            'types'         => $types
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'         => 'required',
            'days'          => 'required',
            'start_date'    => 'required'
        ]);

        $data   = new Leave();
        $data->fill($request->post())->save();

        return Inertia::location('/app/leave');
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
        $data = Leave::findOrFail($id);
        $types = LeaveType::all();
        $employees = Employee::all();

        return Inertia::render('app/leave/edit', [
            'leave'  => $data,
            'employees'     => $employees,
            'types'         => $types
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title'         => 'required',
            'days'          => 'required',
            'start_date'    => 'required'
        ]);

        $data = Leave::findOrFail($id);
        $data->fill($request->post())->save();

        return Inertia::location('/app/leave');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Leave::destroy($ids);

        return Inertia::location('/app/leave');
    }
}
