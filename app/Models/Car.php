<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'make_id',
        'fuel_id',
        'engine_id',
        'model',
        'registration_year',
        'price',
        'mileage',
        'picture',
        'transmission',
        'description',
        'car_status',
        'bid_status',
        'created_at',
        'updated_at'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }

    public function appointment()
    {
        return $this->hasOne(CarAppointment::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function make()
    {
        return $this->belongsTo(Make::class);
    }

    public function fuel()
    {
        return $this->belongsTo(Fuel::class);
    }

    public function engine()
    {
        return $this->belongsTo(Engine::class);
    }

    public function notification()
    {
        return $this->hasMany(TransactionNoti::class);
    }
}
