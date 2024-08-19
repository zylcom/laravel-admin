<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'stock' => fake()->numberBetween(1, 100),
            'sold' => fake()->numberBetween(50, 200),
            'price' => fake()->numberBetween(100, 1000000),
            'category' => fake()->word(),
        ];
    }
}
