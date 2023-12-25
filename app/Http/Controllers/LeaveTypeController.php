<?php

namespace App\Http\Controllers;

use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = LeaveType::query();

        if (\request('keyword')) {
            $query = $query->where('name', 'LIKE', "%" . \request('keyword') . "%");
        }

        return Inertia::render('app/leavetype/index', [
            'leaveType'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('app/leavetype/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required',
        ]);

        $data   = new LeaveType();
        $data->fill($request->post())->save();

        return Inertia::location('/app/leave-type');
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
        $data = LeaveType::findOrFail($id);

        return Inertia::render('app/leavetype/edit', [
            'leaveType'  => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'      => 'required',
        ]);

        $data = LeaveType::findOrFail($id);
        $data->fill($request->post())->save();

        return Inertia::location('/app/leave-type');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        LeaveType::destroy($ids);

        return Inertia::location('/app/leave-type');
    }
}
