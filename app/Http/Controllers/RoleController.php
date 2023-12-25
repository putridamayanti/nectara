<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Role::with('permissions.permission')
//                    ->with('permissions.permission.feature')
                    ->paginate(15);

        return Inertia::render('app/role/index', [
            'role'      => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();
        $features = Feature::all();

        return Inertia::render('app/role/create', [
            'profile'       => Auth::user(),
            'features'      => $features,
            'permissions'   => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required',
        ]);

        $data           = new Role();
        $data->name     = $request->name;
        $data->is_admin = $request->is_admin;
        $data->save();

        foreach ($request->permissions as $item) {
            $permission                 = new RolePermission();
            $permission->role_id        = $data->id;
            $permission->permission_id  = $item;
            $permission->save();
        }

        return Inertia::location('/app/role');
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
        $data = Role::where('id', $id)
                ->with('permissions.permission')
                ->with('permissions.permission.feature')
                ->first();
        $features = Feature::with('permissions')->get();

        return Inertia::render('app/role/edit', [
            'profile'       => Auth::user(),
            'role'          => $data,
            'features'      => $features,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Role::findOrFail($id);
        $data->fill($request->all())->save();

        $role_permissions = $data->permissions;

        foreach ($role_permissions as $item) {
            if (!in_array($item->permission_id, $request->permissions)) {
                RolePermission::where('role_id', $data->id)
                    ->where('permission_id', $item->permission_id)->delete();
            }
        }

        foreach ($request->permissions as $item) {
            if (!$role_permissions->contains('permission_id', $item)) {
                $role_permission                = new RolePermission();
                $role_permission->role_id       = $data->id;
                $role_permission->permission_id = $item;
                $role_permission->save();
            }
        }

        return Inertia::location('/app/role');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Role::destroy($ids);
        RolePermission::whereIn('role_id', $ids);

        return Inertia::location('/app/role');
    }
}
