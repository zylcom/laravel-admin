<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $popularProducts = Product::where('sold', '>', 150)->get();
        $lowStockProducts = Product::where('stock', '<', 20)->get();

        return Inertia::render('Dashboard', ['popularProducts' => $popularProducts, 'lowStockProducts' => $lowStockProducts]);
    }
}
