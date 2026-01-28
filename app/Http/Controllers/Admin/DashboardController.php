<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalSales = \App\Models\Order::sum('total_price');
        $totalOrders = \App\Models\Order::count();
        $totalCustomers = \App\Models\User::where('role', '!=', 'admin')->count();
        $totalProducts = \App\Models\Product::count();
        $recentOrders = \App\Models\Order::with('user')->latest()->take(5)->get();

        return view('admin.dashboard', compact('totalSales', 'totalOrders', 'totalCustomers', 'totalProducts', 'recentOrders'));
    }
}
