<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Fetch recent orders
        $recentOrders = Order::where('user_id', $user->id)
            ->withCount('items') 
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'reference' => '#' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                    'date' => $order->created_at->format('M d, Y'),
                    'total' => number_format($order->total_price, 2),
                    'status' => ucfirst($order->status),
                    'items_count' => $order->items_count,
                    'view_url' => "#", // Placeholder for now until we have an order detail view for customers
                ];
            });

        // Calculate stats
        $stats = [
            'total_orders' => Order::where('user_id', $user->id)->count(),
            'total_spent' => number_format(Order::where('user_id', $user->id)->sum('total_price'), 2),
            'total_items' => Order::where('user_id', $user->id)->withCount('items')->get()->sum('items_count'),
            'member_since' => $user->created_at->format('M Y'),
        ];

        return Inertia::render('Dashboard', [
            'recentOrders' => $recentOrders,
            'stats' => $stats,
        ]);
    }
}
