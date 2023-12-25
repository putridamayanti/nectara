<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Deposit::query();

        if (\request('keyword')) {
            $query = $query->where('title', 'LIKE', "%" . \request('keyword') . "%");
        }

        if (\request('start') && \request('end')) {
            $from = date(\request('start'));
            $to = date(\request('end'));
            $query = $query->whereBetween('date', [$from, $to]);
        }

        return Inertia::render('app/deposit/index', [
            'deposit'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('app/deposit/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'      => 'required',
            'amount'     => 'required',
            'date'       => 'required'
        ]);

        $data   = new Deposit();
        $data->fill($request->post())->save();

        return Inertia::location('/app/deposit');
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
        $data = Deposit::findOrFail($id);

        return Inertia::render('app/deposit/edit', [
            'deposit'  => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title'      => 'required',
            'amount'     => 'required',
            'date'       => 'required'
        ]);

        $data = Deposit::findOrFail($id);
        $data->fill($request->post())->save();

        return Inertia::location('/app/deposit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Deposit::destroy($ids);

        return Inertia::location('/app/deposit');
    }
}
