<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use App\Models\Engine;
use App\Models\Fuel;
use App\Models\Make;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition()
    {
        $carsByBrand = [
            'Toyota' => ['Corolla', 'Camry', 'RAV4', 'Prius'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Fit'],
            'Ford' => ['Focus', 'Fiesta', 'Mustang', 'Explorer'],
            'Audi' => ['A3 e-tron', 'Q5', 'A6', 'Q7'],
        ];

        $transmissionCategory = ['Automatic', 'Manual'];
        // Select a random brand
        $make = Make::inRandomOrder()->first() ?? Make::factory()->create();
        $fuel = Fuel::inRandomOrder()->first() ?? Fuel::factory()->create();
        $engine = Engine::inRandomOrder()->first() ?? Engine::factory()->create();

        $models = $carsByBrand[$make->name] ?? ['Generic Model'];
        $createdAt = $this->faker->dateTimeBetween('-12 months', 'now');

        return [
            'user_id' => User::factory(),
            'make_id' => $make->id,
            'fuel_id' =>  $fuel->id,
            'engine_id' => $engine->id,

            'model' => $this->faker->randomElement($models),
            'registration_year' => $this->faker->numberBetween(2000, date('Y')),
            'price' => $this->faker->numberBetween(5000, 50000),
            'mileage' => $this->faker->numberBetween(5000, 150000),
            'picture' => $this->faker->imageUrl(640, 480, 'cars', true),
            'transmission' => $this->faker->randomElement($transmissionCategory),
            'description' => $this->faker->text(100),

            'car_status' => $this->faker->randomElement(['available', 'sold']),
            'bid_status' => $this->faker->randomElement(['open', 'close']),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
