<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Announcement::query();

        if (\request('status') == 'true') {
            $query = $query->where('status', 1);
        } elseif (\request('status') == 'false') {
            $query = $query->where('status', 0);
        }

        if (\request('start') && \request('end')) {
            $from = date(\request('start'));
            $to = date(\request('end'));
            $query = $query->whereBetween('date', [$from, $to]);
        }

        return Inertia::render('app/announcement/index', [
            'announcement'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('app/announcement/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'         => 'required',
            'content'       => 'required'
        ]);

        $data   = new Announcement();
        $data->fill($request->post())->save();

        return Inertia::location('/app/announcement');
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
        $data = Announcement::findOrFail($id);

        return Inertia::render('app/announcement/edit', [
            'announcement'  => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title'     => 'required',
            'content'   => 'required'
        ]);

        $data = Announcement::findOrFail($id);
        $data->fill($request->post())->save();

        return Inertia::location('/app/announcement');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Announcement::destroy($ids);

        return Inertia::location('/app/announcement');
    }
}
