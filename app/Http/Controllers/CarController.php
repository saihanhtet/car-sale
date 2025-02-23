<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Car;
use App\Models\carAppointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    /**
     * Display a listing of cars with images.
     */
    public function index()
    {
        $cars = Car::with(['brand'])
            ->get()
            ->map(function ($car) {
                $car->picture = $car->picture ? asset('storage/cars_images/' . basename($car->picture)) : null;
                return $car;
            });
        return response()->json($cars);
    }

    /**
     * Show the details of a single car.
     */
    public function show(Car $car)
    {
        $car->picture = $car->picture ? asset('storage/cars_images/' . basename($car->picture)) : null;
        return response()->json($car);
    }

    /**
     * Store a new car in the database.
     */
    public function store(Request $request)
    {
        $validated = $this->validateCar($request);

        // Handle picture upload
        if ($request->hasFile('picture')) {
            if ($request->file('picture')->getSize() > 2048 * 1024) {
                return back()->withErrors(['picture' => 'File size exceeds 2MB limit.']);
            }
            $validated['picture'] = $this->storeImage($request->file('picture'));
        }

        // Create the car
        $car = Car::create(array_merge($validated, ['user_id' => Auth::id()]));
        $appointmentDate = now()->addWeek();
        carAppointment::create([
            'car_id' => $car->id,
            'date' => $appointmentDate,
            'user_id' => Auth::id(),
            'status' => 'pending',
        ]);
        return Redirect::route('my-cars-dashboard')->with('success', 'Car created successfully.');
    }

    /**
     * Update the details of an existing car.
     */
    public function update(Request $request, Car $car)
    {
        $validated = $this->validateCar($request);

        // Handle picture upload if present
        if ($request->hasFile('picture')) {
            if ($request->file('picture')->getSize() > 2048 * 1024) {
                return back()->withErrors(['picture' => 'File size exceeds 2MB limit.']);
            }
            if ($car->picture) {
                Storage::disk('public')->delete($car->picture);
            }
            $validated['picture'] = $this->storeImage($request->file('picture'));
        }

        // Update car
        $car->update($validated);

        return Redirect::route('my-cars-dashboard')->with('success', 'Car updated successfully.');
    }

    public function updateBidStatus(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:appointments,id',
            'action' => 'required|string|in:open,close',
        ]);
        $car = Car::findOrFail($validated['id']);
        if ($validated['action'] == 'open') {
            $car->update([
                'car_status' => 'available',
                'bid_status' => 'open',
            ]);
        } else {
            $car->update([
                'car_status' => 'sold',
                'bid_status' => 'close',
            ]);
        }
        return Redirect::route('car-details-page', $car->id)
            ->with('status', 'Car Status updated successfully.');
    }

    /**
     * Delete a car and its associated picture.
     */
    public function destroy(Car $car)
    {
        if ($car->picture) {
            Storage::disk('public')->delete($car->picture);
        }

        $car->delete();

        return Redirect::route('my-cars-dashboard')->with('success', 'Car deleted successfully.');
    }

    /**
     * Validate car data.
     */
    private function validateCar(Request $request)
    {
        return $request->validate([
            'make_id' => 'required|exists:makes,id',
            'fuel_id' => 'required|exists:fuels,id',
            'engine_id' => 'required|exists:engines,id',

            'model' => 'required|string|max:255',
            'registration_year' => 'required|integer|min:1900|max:' . now()->year,
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'transmission' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',

            'car_status' => 'nullable|in:available,sold',
            'bid_status' => 'nullable|in:open,close',
        ]);
    }

    /**
     * Store the uploaded picture and return its path.
     */
    private function storeImage($image)
    {
        return $image->store('cars_images', 'public');
    }
}
