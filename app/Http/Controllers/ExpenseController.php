<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Expense::query();

        if (\request('keyword')) {
            $query = $query->where('title', 'LIKE', "%" . \request('keyword') . "%");
        }

        if (\request('start') && \request('end')) {
            $from = date(\request('start'));
            $to = date(\request('end'));
            $query = $query->whereBetween('date', [$from, $to]);
        }

        return Inertia::render('app/expense/index', [
            'expense'  => $query->paginate(20)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('app/expense/create');
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

        $data   = new Expense();
        $data->fill($request->post())->save();

        return Inertia::location('/app/expense');
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
        $data = Expense::findOrFail($id);

        return Inertia::render('app/expense/edit', [
            'expense'  => $data
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

        $data = Expense::findOrFail($id);
        $data->fill($request->post())->save();

        return Inertia::location('/app/expense');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ids = explode(',', $id);

        Expense::destroy($ids);

        return Inertia::location('/app/expense');
    }
}
