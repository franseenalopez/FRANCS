<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Order;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index()
    {
        // Get all reviews with user and product information, latest first
        // Note: image_url is an appended attribute, so it cannot be queried in the database select clause
        $reviews = Review::with(['user:id,name,avatar', 'product:id,name,image,slug'])
            ->latest()
            ->paginate(15);

        $purchasedProducts = collect();

        if (auth()->check()) {
            // Get all unique products the current user has purchased
            $purchases = Order::where('user_id', auth()->id())
                ->with('items.product')
                ->get();

            $purchasedProducts = $purchases->flatMap(function ($order) {
                return $order->items->map(function ($item) {
                    return $item->product;
                });
            })->unique('id')->values();
        }

        return Inertia::render('Community/Index', [
            'reviews' => $reviews,
            'purchasedProducts' => $purchasedProducts,
        ]);
    }
}
