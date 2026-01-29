<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function index()
    {
        // Get all vendors
        $vendors = User::where('role', 'vendor')
            ->latest()
            ->get();

        // Get recent products for activity monitoring
        $recentProducts = Product::with('category')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Admin/Vendors/Index', [
            'vendors' => $vendors,
            'recentProducts' => $recentProducts
        ]);
    }
}
