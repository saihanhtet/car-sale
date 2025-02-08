<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Booking;
use App\Models\Car;
use App\Models\CarAppointment;
use App\Models\Engine;
use App\Models\Fuel;
use App\Models\Make;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class PrivatePageController extends Controller
{
    private function renderFunction(string $page, array $data = [])
    {
        return Inertia::render($page, array_merge([
            'isLoggedIn' => Auth::check(),
            'isPublicPage' => false,
        ], $data));
    }

    private function getDashboardData(string $role): array
    {
        return [
            'user' => $role !== 'admin',
            'admin' => $role === 'admin',
            'role' => $role,
        ];
    }

    public function dashboard()
    {
        $user = Auth::user();
        return $this->renderFunction(
            $user->is_admin ? 'AdminDashboard/analytic' : 'UserDashboard/analytic',
            $user->is_admin ? $this->getAdminData() : $this->getUserData()
        );
    }

    private function getMonthlyBids($userId = null)
    {
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();
        $now = Carbon::now()->endOfMonth();

        $bidsQuery = Bid::select(
            DB::raw('DATE_FORMAT(bids.created_at, "%Y-%m") as month'),
            DB::raw('SUM(amount) as total_amount'),
            DB::raw('COUNT(*) as total_bids')
        )->whereBetween('bids.created_at', [$sixMonthsAgo, $now]);

        if ($userId) {
            $bidsQuery->join('cars', 'bids.car_id', '=', 'cars.id')->where('cars.user_id', $userId);
        }

        $bids = $bidsQuery->groupBy('month')->orderBy('month')->get();
        $months = collect(range(0, 5))->map(fn($i) => $sixMonthsAgo->copy()->addMonths($i)->format('Y-m'));

        return $months->map(fn($month) => (object) [
            'month' => Carbon::createFromFormat('Y-m', $month)->format('F Y'),
            'total_amount' => optional($bids->firstWhere('month', $month))->total_amount ?? 0,
            'total_bids' => optional($bids->firstWhere('month', $month))->total_bids ?? 0,
            'average_bidding' => optional($bids->firstWhere('month', $month))->total_bids
                ? optional($bids->firstWhere('month', $month))->total_amount / optional($bids->firstWhere('month', $month))->total_bids
                : 0,
        ]);
    }

    private function calculateTotalProfit($carsQuery): float
    {
        return $carsQuery->get()->reduce(fn($carry, $car) => $carry + max(0, $car->bids()->max('amount') - $car->price), 0);
    }

    public function getUserCarsWithTransactions()
    {
        return Car::select(
            'cars.id as car_id',
            'cars.model',
            'transactions.id as transaction_id',
            'transactions.transaction_date',
            'transactions.final_price',
            'fuels.name as fuel_name'
        )
            ->join('transactions', 'cars.id', '=', 'transactions.car_id')
            ->join('fuels', 'fuels.id', '=', 'cars.fuel_id')
            ->where('cars.user_id', Auth::user()->id)
            ->orderBy('transactions.transaction_date', 'desc')
            ->limit(10)
            ->get();
    }

    private function getAllCarsWithTransactions()
    {
        return Car::select('cars.id as car_id', 'cars.model', 'transactions.id as transaction_id', 'transactions.transaction_date', 'transactions.final_price', 'fuels.name as fuel_name')
            ->join('transactions', 'cars.id', '=', 'transactions.car_id')
            ->join('fuels', 'fuels.id', '=', 'cars.fuel_id')
            ->orderBy('transactions.transaction_date', 'desc')
            ->limit(10)
            ->get();
    }

    private function getUserCars()
    {
        return Car::where('user_id', Auth::id())->with(['make', 'fuel', 'engine', 'user', 'bids', 'transaction', 'notification'])->orderBy('created_at', 'desc');
    }

    private function getAdminData()
    {
        return array_merge($this->getDashboardData('admin'), [
            'users_count' => User::count(),
            'transactions_count' => Transaction::count(),
            'cars_count' => Car::count(),
            'cars' => Car::with(['make', 'fuel', 'engine', 'user', 'transaction', 'transaction.notification'])->get(),
            'monthly_bids' => $this->getMonthlyBids(),
            'month_label' => $this->getMonthLabel($this->getMonthlyBids()),
            'total_profit' => $this->calculateTotalProfit(Car::query()),
            'transactions' => $this->getAllCarsWithTransactions(),
            'average_bidding' => $this->getMonthlyBids()->avg('average_bidding'),
        ]);
    }

    private function getUserData()
    {
        return array_merge($this->getDashboardData('user'), [
            'cars' => $this->getUserCars()->get(),
            'monthly_bids' => $this->getMonthlyBids(Auth::id()),
            'month_label' => $this->getMonthLabel($this->getMonthlyBids(Auth::id())),
            'total_profit' => $this->calculateTotalProfit($this->getUserCars()),
            'car_transactions' => $this->getUserCarsWithTransactions(),
            'average_bidding' => $this->getMonthlyBids(Auth::id())->avg('average_bidding'),
        ]);
    }

    private function getMonthLabel($monthlyBids)
    {
        return ($monthlyBids->first() ? $monthlyBids->first()->month : '') . ' - ' . ($monthlyBids->last() ? $monthlyBids->last()->month : '');
    }

    public function myCarListPage()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $cars = $this->getUserCars()->paginate(10);
        $makes = Make::all();

        foreach ($cars->items() as $car) {
            $car->picture = $car->picture ? asset('storage/' . $car->picture) : null;
        };

        $dashboardData = $this->getDashboardData($role);
        $dashboardData['cars'] = $cars;
        $dashboardData['makes'] = $makes;
        return $this->renderFunction('UserDashboard/listings', $dashboardData);
    }

    public function UsersManagementDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $users = User::paginate(8);
        $dashboardData = $this->getDashboardData($role);
        $dashboardData['users'] = $users;
        foreach ($users->items() as $user) {
            $user->picture = $user->picture ? asset('storage/' . $user->picture) : null;
        };
        return $this->renderFunction('AdminDashboard/users-management', $dashboardData);
    }

    public function CarsManagementDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $cars = Car::with(['user', 'appointment'])->paginate(8);
        foreach ($cars->items() as $car) {
            $car->picture = $car->picture ? asset('storage/' . $car->picture) : null;
        };
        $dashboardData = $this->getDashboardData($role);
        $dashboardData['cars'] = $cars;
        return $this->renderFunction('AdminDashboard/cars-management', $dashboardData);
    }

    public function BookingManagementDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $bookings = Booking::with(['user', 'car'])
            ->whereHas('car', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->paginate(8);

        $dashboardData = $this->getDashboardData($role);
        $dashboardData['bookings'] = $bookings;

        return $this->renderFunction('UserDashboard/booking', $dashboardData);
    }


    public function detailsPage($id)
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

        return $this->renderFunction('UserDashboard/details', $data);
    }

    public function biddingPage()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $bids = Bid::with(['user', 'car'])
            ->whereHas('car', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->orderBy('created_at', 'desc')->paginate(8);

        $dashboardData = $this->getDashboardData($role);
        $dashboardData['biddings'] = $bids;
        return $this->renderFunction('UserDashboard/bidding', $dashboardData);
    }

    public function transactionPage()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $transactionsQuery = Car::with(['fuel', 'transaction.buyer', 'transaction.seller', 'transaction.notification'])
            ->whereHas('transaction', function ($query) use ($user) {
                $query->where('buyer_id', $user->id)
                    ->orWhere('seller_id', $user->id);
            });

        $transactions = $transactionsQuery->paginate(10);
        $dashboardData = $this->getDashboardData($role);
        $dashboardData['transactions'] = $transactions;
        return $this->renderFunction('UserDashboard/transaction', $dashboardData);
    }

    public function editCar($id)
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $makes = Make::all();
        $fuels = Fuel::all();
        $engines = Engine::all();
        $car = Car::with(['make', 'fuel', 'engine'])->findOrFail($id);

        $dashboardData = $this->getDashboardData($role);
        $dashboardData['user'] = $user;
        $dashboardData['makes'] = $makes;
        $dashboardData['fuels'] = $fuels;
        $dashboardData['car'] = $car;
        $dashboardData['engines'] = $engines;
        return $this->renderFunction('UserDashboard/edit', $dashboardData);
    }

    public function uploadCar()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $makes = Make::all();
        $fuels = Fuel::all();
        $engines = Engine::all();
        $cars = Car::with(['make', 'fuel', 'engine'])->get();

        $dashboardData = $this->getDashboardData($role);
        $dashboardData['user'] = $user;
        $dashboardData['makes'] = $makes;
        $dashboardData['fuels'] = $fuels;
        $dashboardData['cars'] = $cars;
        $dashboardData['engines'] = $engines;
        return $this->renderFunction('UserDashboard/upload', $dashboardData);
    }
}
