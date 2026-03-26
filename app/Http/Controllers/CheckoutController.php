<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index(Request $request)
    {
        $cart = session()->get('cart', []);
        
        if (empty($cart)) {
            return redirect()->route('shop.index')->withErrors(['cart' => 'Your cart is empty. Let\'s go shopping!']);
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'user' => auth()->user(), // Pre-fill any available user data
        ]);
    }

    /**
     * Process the order.
     */
    public function store(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('shop.index')->withErrors(['cart' => 'Your cart is empty.']);
        }

        // Validate shipping and payment data
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'firstName' => 'required|string|max:50',
            'lastName' => 'required|string|max:50',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'postalCode' => 'required|string|max:20',
            'phone' => 'nullable|string|max:30',
            'paymentMethod' => 'required|in:credit_card,paypal,cod',
        ]);

        $subtotal = collect($cart)->sum(function ($item) {
            return $item['price'] * $item['quantity'];
        });

        // Calculate a sample tax or shipping fee (e.g. 5% tax or flat shipping logic)
        $tax = $subtotal * 0.05;
        $totalPrice = $subtotal + $tax;

        try {
            DB::beginTransaction();

            // Create Order
            $order = Order::create([
                'user_id' => auth()->id(), // Optional for guest checkouts if you choose to support them later
                'status' => 'pending',
                'total_price' => $totalPrice,
                'payment_status' => $validated['paymentMethod'] === 'cod' ? 'unpaid' : 'paid',
                'payment_method' => $validated['paymentMethod'],
                'shipping_address' => json_encode([
                    'first_name' => $validated['firstName'],
                    'last_name' => $validated['lastName'],
                    'address' => $validated['address'],
                    'city' => $validated['city'],
                    'country' => $validated['country'],
                    'postal_code' => $validated['postalCode'],
                    'phone' => $validated['phone'] ?? null,
                ]),
                'billing_address' => null, // Assuming same as shipping for simplicity right now
                'notes' => 'Order placed via new checkout gateway',
            ]);

            // Create Order Items
            foreach ($cart as $id => $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $id,
                    'product_name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $item['price'] * $item['quantity'],
                ]);
            }

            DB::commit();

            // Clear the user's active session cart
            session()->forget('cart');

            // Send instant Order Confirmation Email
            try {
                \Illuminate\Support\Facades\Mail::to($validated['email'])->send(new \App\Mail\OrderPlaced($order));
                \Log::info("Order confirmation email sent to {$validated['email']} for Order #{$order->id}");
            } catch (\Exception $mailEx) {
                // We log the mail error but don't fail the order just because mail failed
                \Log::error("Failed to send order email: " . $mailEx->getMessage());
            }

            return redirect()->route('checkout.success', $order->id);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order creation failed: ' . $e->getMessage());
            return back()->withErrors(['checkout' => 'An error occurred while processing your order. Please try again.']);
        }
    }

    /**
     * Display order success confirmation page.
     */
    public function success(Order $order)
    {
        // For security, ensure users can only see their own confirmations
        if (auth()->id() !== $order->user_id && !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized access to this order.');
        }

        // Eager load items for receipt display
        $order->load('items');

        return Inertia::render('Checkout/Success', [
            'order' => $order,
        ]);
    }
}
