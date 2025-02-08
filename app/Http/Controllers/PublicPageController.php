<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    public function renderFunction(String $page, $data)
    {
        return Inertia::render($page, array_merge([
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'isLoggedIn' => Auth::check(),
            'isPublicPage' => true,
        ], $data));
    }
    public function welcome()
    {
        return $this->renderFunction('Welcome', []);
    }

    public function aboutus ()
    {
        return $this->renderFunction('Aboutus', []);
    }

    public function contactus ()
    {
        return $this->renderFunction('Contactus', []);
    }

    private function isFilterActive(array $filters)
    {
        return !empty($filters['make']) ||
            !empty($filters['fuel']) ||
            !empty($filters['priceMin']) ||
            !empty($filters['priceMax']) ||
            !empty($filters['year']) ||
            !empty($filters['bid_status']);
    }

    private function applyFilters(&$query, array $filters)
    {
        if (!empty($filters['make'])) {
            $query->whereHas('make', function ($subQuery) use ($filters) {
                $subQuery->where('name', $filters['make']);
            });
        }

        if (!empty($filters['fuel'])) {
            $query->whereHas('fuel', function ($subQuery) use ($filters) {
                $subQuery->where('name', $filters['fuel']);
            });
        }

        if (!empty($filters['priceMin'])) {
            $query->where('price', '>=', $filters['priceMin']);
        }

        if (!empty($filters['priceMax'])) {
            $query->where('price', '<=', $filters['priceMax']);
        }

        if (!empty($filters['year'])) {
            $query->where('registration_year', '=', $filters['year']);
        }

        if (!empty($filters['bid_status'])) {
            $query->where('bid_status',  $filters['bid_status']);
        }
    }

    public function car_details($id)
    {
        $currentCar = \App\Models\Car::with(['make', 'fuel', 'engine', 'notification', 'user'])->findOrFail($id);
        $currentCar->picture = $currentCar->picture ? asset('storage/' . $currentCar->picture) : null;

        $currentBids = \App\Models\Bid::with('user')->where('car_id', $id)->get();
        $highestBid = $currentBids->max('amount');
        $lastBid = $currentBids->last();

        $bidable = false;
        $isOwner = false;
        $user = null;

        if (Auth::check()) {
            $user = Auth::user();
            $isOwner = $user->id === $currentCar->user_id;
            $bidable = $user->id !== $currentCar->user_id && $currentCar->bid_status !== 'close';
        }

        $data = [
            'car' => $currentCar,
            'currentBid' => $currentBids,
            'highestBid' => $highestBid,
            'lastBid' => $lastBid,
            'user' => $user,
            'isOwner' => $isOwner,
            'bidable' => $bidable,
        ];

        return $this->renderFunction('CarDetails', $data);
    }

    public function carlist(Request $request)
    {
        $makes = \App\Models\Make::all();
        $fuels = \App\Models\Fuel::all();
        $engines = \App\Models\Engine::all();
        $cars = \App\Models\Car::with(['user', 'bids', 'fuel', 'make', 'engine', 'notification'])->orderBy('created_at', 'desc');

        // select filter
        $selectedFilters = [
            'make' => $request->input('make'),
            'fuel' => $request->input('fuel'),
            'priceMin' => $request->input('priceMin'),
            'priceMax' => $request->input('priceMax'),
            'year' => $request->input('year'),
            'bid_status' => $request->input('bid_status'),
        ];

        $this->applyFilters($cars, $selectedFilters);
        $cars = $cars->paginate(15);
        $status = $cars->isEmpty()
            ? 'No cars found matching your filters. Please adjust your search criteria.'
            : 'Cars found matching your filters.';

        foreach ($cars->items() as $car) {
            $car->picture = $car->picture ? asset('storage/' . $car->picture) : null;
        };

        $data = [
            'cars' => $cars,
            'makes' => $makes,
            'fuels' => $fuels,
            'engines' => $engines,
            'status' => $status,
            'isFilterActive' => $this->isFilterActive($selectedFilters),
            'preSelectedFilters' => $selectedFilters,
        ];
        return $this->renderFunction('Carlist', $data);
    }
}
