<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Department::query();

        if (\request('keyword')) {
            $query = $query->where('name', 'LIKE', "%" . \request('keyword') . "%");
        }

        return Inertia::render('app/department/index', [
            'department'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('app/department/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);

        $input = $request->all();

        $data   = new Department();
        $data->fill($input)->save();

        return Inertia::location('/app/department');
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
        $data = Department::findOrFail($id);

        return Inertia::render('app/department/edit', [
            'department'  => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(['name' => 'required']);

        $data = Department::findOrFail($id);

        $data->fill($request->all())->save();

        return Inertia::location('/app/department');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Department::destroy($ids);

        return Inertia::location('/app/department');
    }
}
