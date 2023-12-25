<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        if (\request('keyword')) {
            $query = $query->where('name', 'LIKE', "%" . \request('keyword') . "%")
                        ->orWhere('email', 'LIKE', "%" . \request('keyword') . "%");
        }

        if (\request('role')) {
            $query = $query->where('role_id', \request('role'));
        }

        $query = $query->with('role');

        return Inertia::render('app/user/index', [
            'user'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('app/user/create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required',
            'email'     => 'required',
            'password'  => 'required',
            'role_id'   => 'required'
        ]);

        $data   = new User();
        $data->fill($request->post())->save();

        return Inertia::location('/app/user');
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
        $data = User::findOrFail($id);
        $roles = Role::all();

        return Inertia::render('app/user/edit', [
            'roles' => $roles,
            'user'  => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'      => 'required',
            'email'     => 'required',
            'role_id'   => 'required'
        ]);

        $params = $request->all();

        if ($request->has('password')) {
            $params['password'] = Hash::make($request->password);
        }

        $data = User::findOrFail($id);
        $data->fill($params)->save();

        $url = '/app/user';
        if ($request->has('redirect_url')) {
            $url = $request->redirect_url;
        }

        return Inertia::location($url);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        User::destroy($ids);

        return Inertia::location('/app/user');
    }
}
