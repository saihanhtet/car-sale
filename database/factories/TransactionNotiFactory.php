<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\Transaction;
use App\Models\User;
use App\Models\TransactionNoti;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionNotiFactory extends Factory
{
    protected $model = TransactionNoti::class;

    public function definition()
    {
        return [
            'car_id' => Car::factory(),
            'buyer_id' => User::factory(),
            'seller_id' => User::factory(),
            'transaction_id' => Transaction::factory(),
            'message' => $this->faker->text(100)
        ];
    }
}
