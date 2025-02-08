<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\CarAppointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CarAppointmentController extends Controller
{
    public function index()
    {
        $appointments = CarAppointment::with(['car', 'user'])->get();
        return view('appointments.index', compact('appointments'));
    }

    public function create()
    {
        $cars = Car::all();
        return view('appointments.create', compact('cars'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'date' => 'required|date|after_or_equal:today',
        ]);

        CarAppointment::create(array_merge($request->all(), ['user_id' => Auth::id(), 'status' => 'pending']));

        return redirect()->route('appointments.index')->with('success', 'CarAppointment created successfully.');
    }

    public function updateStatus(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:car_appointments,id',
            'car_id' => 'required|exists:cars,id',
            'status' => 'required|string|in:pending,approved,denied',
        ]);
        $appointment = CarAppointment::findOrFail($validated['id']);
        $appointment->update([
            'status' => $validated['status'],
        ]);
        return Redirect::route('cars-management-dashboard')->with('status', 'User updated successfully.');
    }

    public function destroy(CarAppointment $appointment)
    {
        $appointment->delete();
        return redirect()->route('appointments.index')->with('success', 'CarAppointment canceled successfully.');
    }
}
