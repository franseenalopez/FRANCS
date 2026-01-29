<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', '!=', 'admin')
            ->latest()
            ->get();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers
        ]);
    }
}
