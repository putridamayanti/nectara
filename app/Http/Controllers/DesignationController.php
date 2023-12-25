<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Designation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $department = Department::all();
        $query = Designation::query();

        if (\request('department')) {
            $query = $query->where('department_id', \request('department'));
        }

        if (\request('keyword')) {
            $query = $query->where('name', 'LIKE', "%" . \request('keyword') . "%");
        }

        $query = $query->with('department');

        return Inertia::render('app/designation/index', [
            'department'    => $department,
            'designation'   => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employee = Department::all();

        return Inertia::render('app/designation/create', [
            'departments'     => $employee
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'department_id' => 'required',
            'name'          => 'required'
        ]);

        $input = $request->all();

        $data   = new Designation();
        $data->fill($input)->save();

        return Inertia::location('/app/designation');
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
        $data = Designation::findOrFail($id);
        $employee = Department::all();

        return Inertia::render('app/designation/edit', [
            'designation'    => $data,
            'departments'     => $employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'department_id' => 'required',
            'name'          => 'required'
        ]);

        $data = Designation::findOrFail($id);

        $data->fill($request->all())->save();

        return Inertia::location('/app/designation');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Designation::destroy($ids);

        return Inertia::location('/app/designation');
    }
}
