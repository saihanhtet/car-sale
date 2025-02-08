<?php

namespace Database\Factories;

use App\Models\Make;
use Illuminate\Database\Eloquent\Factories\Factory;

class MakeFactory extends Factory
{
    protected $model = Make::class;

    public function definition()
    {
        $makes = [
            'Toyota',
            'Honda',
            'Ford',
            'Chevrolet',
            'BMW',
            'Mercedes-Benz',
            'Audi',
            'Hyundai',
            'Nissan',
            'Volkswagen'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($makes),
            'description' => $this->faker->text(100),
        ];
    }
}
