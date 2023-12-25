<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     *  Login page.
     */
    public function index()
    {
        $setting = Setting::first();
        if ($setting == null) {
            return Inertia::location('/install');
        }

        return Inertia::render('login');
    }

    /**
     * Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'     => 'required',
            'password'  => 'required',
        ]);

        if(!Auth::attempt($request->only(['email', 'password']))){
            return redirect()->back()->withErrors(['error' => 'Invalid Credentials']);
        }

        return Inertia::location('/app/dashboard');
    }

    /**
     * Profile Page.
     */
    public function profile()
    {
        $roles = Role::all();

        return Inertia::render('app/profile/index', [
            'roles'     => $roles
        ]);
    }

    /**
     * Logout
     */
    public function logout()
    {
        Auth::logout();

        return Inertia::location('/');
    }
}
