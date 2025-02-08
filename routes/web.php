<?php

use App\Http\Controllers\BidController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarAppointmentController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PrivatePageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\TransactionController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PublicPageController::class,'welcome'])->name('home-page');
Route::get('/about-us', [PublicPageController::class,'aboutus'])->name('about-us-page');
Route::get('/contact-us',[PublicPageController::class,'contactus'])->name('contact-us-page');
Route::get('/carlist',[PublicPageController::class,'carlist'])->name('carlist-page');
Route::get('/car-details/{car}', [PublicPageController::class, 'car_details'])->name('car-details-page');

// Admin Routes
Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {
    Route::get('/users-management-dashboard', [PrivatePageController::class, 'UsersManagementDashboard'])->name('users-management-dashboard');
    Route::get('/cars-management-dashboard', [PrivatePageController::class, 'CarsManagementDashboard'])->name('cars-management-dashboard');

    Route::put('/user/status/', [ProfileController::class, 'updateStatus'])->name('user.updateStatusRole');
    Route::put('/car/status/', [CarAppointmentController::class, 'updateStatus'])->name('appointment.updateStatus');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PrivatePageController::class, 'dashboard'])->name('dashboard');
    Route::get('/upload-dashboard', [PrivatePageController::class, 'uploadCar'])->name('upload-car-dashboard');
    Route::get('/my-cars-dashboard', [PrivatePageController::class, 'myCarListPage'])->name('my-cars-dashboard');
    Route::get('/car-edit-dashboard/{car}', [PrivatePageController::class, 'editCar'])->name('car-edit-dashboard');
    Route::get('/test-drive-dashboard', [PrivatePageController::class, 'BookingManagementDashboard'])->name('test-drive-dashboard');
    Route::get('/my-car-details/{car}', [PrivatePageController::class, 'detailsPage'])->name('car-details-dashboard');
    Route::get('/bidding-dashboard', [PrivatePageController::class, 'biddingPage'])->name('bidding-dashboard');
    Route::get('/transaction-dashboard', [PrivatePageController::class, 'transactionPage'])->name('transaction-dashboard');

    Route::post('/cars/create', [CarController::class, 'store'])->name('car.store');
    Route::patch('/cars/{car}/edit', [CarController::class, 'update'])->name('car.update');
    Route::delete('/cars/{car}/delete', [CarController::class, 'destroy'])->name('car.destroy');

    Route::resource('/bookings', BookingController::class);
    Route::post('/bookings', [BookingController::class, 'store'])->name('booking.store');
    Route::put('/bookings/update/{booking}', [BookingController::class, 'updateAppointmentStatus'])->name('booking.updateStatus');
    Route::resource('/appointments', CarAppointmentController::class);
    Route::resource('/transactions', TransactionController::class);

    Route::post('/bids', [BidController::class, 'store'])->name('bid.store');
    Route::put('/bids', [CarController::class, 'updateBidStatus'])->name('bid.update');



    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
