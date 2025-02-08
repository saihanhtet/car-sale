<?php

namespace Database\Factories;

use App\Models\Bid;
use App\Models\User;
use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class BidFactory extends Factory
{
    protected $model = Bid::class;

    public function definition()
    {

        return [
            'car_id' => Car::factory(),
            'user_id' => User::factory(),
            'amount' => $this->faker->numberBetween(5000, 100000),
        ];
    }
}
