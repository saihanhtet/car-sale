<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\CarAppointment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\carAppointment>
 */
class carAppointmentFactory extends Factory
{
    protected $model = CarAppointment::class;

    public function definition(): array
    {
        return [
            'car_id' => Car::factory(), // Creates and associates a car
            'user_id' => User::factory(), // Creates and associates a user
            'date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'status' => $this->faker->randomElement(['pending', 'approved', 'denied']),
        ];
    }
}
