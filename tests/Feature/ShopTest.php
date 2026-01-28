<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class ShopTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_page_loads()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
        );
    }

    public function test_shop_index_loads_with_products()
    {
        Product::factory()->count(3)->create();

        $response = $this->get(route('shop.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Shop/Index')
            ->has('products.data', 3)
        );
    }

    public function test_can_filter_products_by_category()
    {
        $category = Category::factory()->create(['name' => 'Electronics']);
        $productInCat = Product::factory()->create(['category_id' => $category->id]);
        $productOther = Product::factory()->create();

        $response = $this->get(route('shop.index', ['category' => $category->slug]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Shop/Index')
            ->has('products.data', 1)
            ->where('products.data.0.id', $productInCat->id)
        );
    }

    public function test_product_details_page_loads()
    {
        $product = Product::factory()->create();

        $response = $this->get(route('shop.show', $product));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Shop/Show')
            ->where('product.id', $product->id)
        );
    }
}
