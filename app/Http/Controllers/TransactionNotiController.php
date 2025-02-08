<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Car;
use App\Models\TransactionNoti;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class TransactionNotiController extends Controller
{
    public function show($id)
    {
        $transaction = TransactionNoti::findOrFail($id);
        return response()->json($transaction);
    }
    // List all transactions
    public function index()
    {
        $transactions = TransactionNoti::with(['transaction', 'buyer', 'seller', 'car'])->get();
        return response()->json($transactions);
    }

    // Show the form to create a transaction (useful if you're using React frontend)
    public function create()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'seller_id' => 'required|exists:users,id',
            'buyer_id' => 'required|exists:users,id',
            'transaction_id' => 'required|exists:transactions,id',
            'message' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        // Store the transaction
        Transaction::create($request->all());
        // Update the car status to 'sold'
        $car = Car::find($request->car_id);
        if ($car) {
            $car->update(['car_status' => 'sold']);
            $car->update(['bid_status' => 'close']);
        }
        // Redirect with success message
        return Redirect::route('bidding-history-dashboard')->with('success', 'Created transaction and updated car status successfully.');
    }

    // Delete a transaction
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully.']);
    }
}
