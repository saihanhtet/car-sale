<?php

namespace App\Http\Controllers;


use App\Models\Bid;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class BidController extends Controller
{
    // Fetch all bids with related car and user data
    public function index()
    {
        $bids = Bid::with(['car', 'user'])->get();
        return response()->json($bids);
    }

    // Fetch available cars for placing bids
    public function create()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $car = Car::findOrFail($validated['car_id']);

        if ($car->user_id === Auth::id()) {
            return back()->withErrors(['amount' => 'You cannot place a bid on your own car.']);
        }

        $highestBid = Bid::where('car_id', $car->id)->max('amount');

        if ($highestBid && $validated['amount'] <= $highestBid) {
            return back()->withErrors(['amount' => 'Your bid must be higher than the current highest bid of ' . number_format($highestBid, 2) . '.']);
        }

        Bid::create([
            'car_id' => $validated['car_id'],
            'amount' => $validated['amount'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('car-details-page', $validated['car_id'])
            ->with('success', 'Your bid has been placed successfully.');
    }

    public function destroy(Bid $bid)
    {
        $bid->delete();
        return response()->json(['message' => 'Bid deleted successfully.'], 200);
    }
}
