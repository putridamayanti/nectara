<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function install()
    {
        return Inertia::render('install');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $setting = Setting::first();

        return Inertia::render('app/setting/index', [
            'setting'   => $setting
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $setting = Setting::first();
        if ($setting != null) {
            return Inertia::location('/');
        }

        $request->validate([
            'email'     => 'required',
            'name'  => 'required',
            'phone'  => 'required',
            'country_code'  => 'required',
            'currency'  => 'required',
        ]);

        $setting = new Setting();
        $setting->fill($request->post())->save();

        $url = '/';
        if ($request->redirect_url) {
            $url = $request->redirect_url;
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'email'         => 'required',
            'name'          => 'required',
            'phone'         => 'required',
            'country_code'  => 'required',
            'currency'      => 'required',
        ]);

        $setting = Setting::findOrFail($id);
        $setting->fill($request->post())->save();

        return Inertia::location('/app/setting');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
