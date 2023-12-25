<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Employee::query();

        if (\request('department')) {
            $query = $query->where('department_id', \request('department'));
        }

        if (\request('employee')) {
            $query = $query->where('designation_id', \request('employee'));
        }

        if (\request('type')) {
            $query = $query->where('employment_type', \request('type'));
        }

        if (\request('keyword')) {
            $query = $query->where('full_name', 'LIKE', "%" . \request('keyword') . "%");
        }

        $query = $query->with('department')->with('designation');

        return Inertia::render('app/employee/index', [
            'employee'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles          = Role::all();
        $department     = Department::all();
        $designation    = Designation::all();
        $user           = User::all();

        return Inertia::render('app/employee/create', [
            'users'             => $user,
            'roles'             => $roles,
            'departments'       => $department,
            'designations'      => $designation
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'department_id'     => 'required',
            'designation_id'    => 'required',
            'phone'             => 'required',
            'employment_type'   => 'required',
            'basic_salary'      => 'required'
        ]);

        $params = $request->all();

        if (!$request->has('user_id')) {
            $user               = new User();
            $user->name         = $request->name;
            $user->email        = $request->email;
            $user->password     = Hash::make($request->password);
            $user->role_id      = $request->role_id;
            $user->save();

            $params['user_id'] = $user->id;
        } else {
            $user = User::where('id', $request->user_id)->first();
            if ($user) {
                $params['name'] = $user->name;
            }
        }

        $data   = new Employee();
        $data->fill($params)->save();

        return Inertia::location('/app/employee');
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
        $data           = Employee::findOrFail($id);
        $user           = User::where('id', $data->user_id)->first();
        $roles          = Role::all();
        $department     = Department::all();
        $designation    = Designation::all();

        return Inertia::render('app/employee/edit', [
            'employee'      => $data,
            'user'          => $user,
            'roles'         => $roles,
            'departments'   => $department,
            'designations'  => $designation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'department_id'     => 'required',
            'designation_id'    => 'required',
            'employment_type'   => 'required',
            'basic_salary'      => 'required'
        ]);

        $data = Employee::findOrFail($id);
        $data->fill($request->all())->save();

        return Inertia::location('/app/employee');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Employee::destroy($ids);

        return Inertia::location('/app/employee');
    }
}
