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
        $sneakers = [
            'Air Jordan 1 High', 'Nike Dunk Low', 'Adidas Yeezy Boost 350', 
            'New Balance 550', 'Converse Chuck 70', 'Nike Air Max 90', 
            'Adidas Samba OG', 'Puma Suede Classic', 'Vans Old Skool', 
            'Reebok Club C 85', 'Asics Gel-Lyte III', 'Nike Air Force 1'
        ];

        return [
            'name' => $this->faker->randomElement($sneakers) . ' ' . $this->faker->regexify('[A-Z]{2,3}'),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->randomElement([
                'Experience ultimate comfort and style with these premium kicks. Designed for everyday wear and tear.',
                'A classic silhouette reimagined for the modern street. Features durable materials and responsive cushioning.',
                'Step up your shoe game with this limited edition release. Perfect for adding a pop of color to any outfit.',
                'Built for performance and engineered for style. The breathable mesh upper keeps you cool all day long.',
                'Timeless design meets modern technology. These sneakers provide superior traction and support.'
            ]),
            'price' => $this->faker->randomFloat(2, 85, 450),
            'stock' => $this->faker->numberBetween(1, 50),
            'image' => null, 
            'category_id' => \App\Models\Category::factory(),
        ];
    }
}
