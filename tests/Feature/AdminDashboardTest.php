<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_dashboard_stats()
    {
        // 1. Create Data
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin', // Assuming role column handles checks
        ]);

        $customer = User::create([
            'name' => 'Customer User',
            'email' => 'customer@example.com',
            'password' => bcrypt('password'),
            'role' => 'customer',
        ]);

        $category = Category::create([
            'name' => 'Electronics',
            'slug' => 'electronics',
        ]);

        $product = Product::create([
            'category_id' => $category->id,
            'name' => 'Laptop',
            'slug' => 'laptop',
            'description' => 'A computer',
            'price' => 1000.00,
            'stock' => 10,
            'image' => 'laptop.jpg',
            'is_active' => true,
        ]);

        $order = Order::create([
            'user_id' => $customer->id,
            'status' => 'completed',
            'total_price' => 1000.00,
            'payment_status' => 'paid',
            'payment_method' => 'card',
            'shipping_address' => '123 St',
            'billing_address' => '123 St',
        ]);

        // 2. Act
        $response = $this->actingAs($admin)
                         ->get(route('admin.dashboard'));

        // 3. Assert
        $response->assertStatus(200);
        $response->assertViewHas('totalSales', 1000.00);
        $response->assertViewHas('totalOrders', 1);
        $response->assertViewHas('totalCustomers', 1);
        $response->assertViewHas('totalProducts', 1);
        $response->assertViewHas('recentOrders', function ($orders) use ($order) {
            return $orders->contains($order);
        });
    }

    public function test_non_admin_cannot_view_dashboard()
    {
        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
            'role' => 'customer',
        ]);

        $response = $this->actingAs($user)
                         ->get(route('admin.dashboard'));

        $response->assertRedirect('/'); // As per IsAdmin middleware
    }
}
