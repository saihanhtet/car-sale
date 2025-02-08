<?php

namespace App\Http\Controllers;

use App\Models\Make;
use Illuminate\Http\Request;

class MakeController extends Controller
{
    // Fetch all makes
    public function index()
    {
        $makes = Make::all();
        return view('makes.index', compact('makes'));
    }

    // Show form to create a new brand
    public function create()
    {
        return view('makes.create');
    }

    // Store a new brand
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:makes,name',
        ]);

        Make::create($request->only('name'));

        return redirect()->route('makes.index')->with('success', 'Make created successfully.');
    }

    // Show details of a specific brand
    public function show(Make $brand)
    {
        return view('makes.show', compact('brand'));
    }

    // Show form to edit a brand
    public function edit(Make $brand)
    {
        return view('makes.edit', compact('brand'));
    }

    // Update the brand
    public function update(Request $request, Make $brand)
    {
        $request->validate([
            'name' => 'required|string|unique:makes,name,' . $brand->id,
        ]);

        $brand->update($request->only('name'));

        return redirect()->route('makes.index')->with('success', 'Make updated successfully.');
    }

    // Delete a brand
    public function destroy(Make $brand)
    {
        $brand->delete();
        return redirect()->route('makes.index')->with('success', 'Make deleted successfully.');
    }
}
