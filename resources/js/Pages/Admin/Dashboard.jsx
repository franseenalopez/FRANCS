import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, totalSales, totalOrders, totalCustomers, totalProducts, recentOrders }) {
    const [isCartAnimating, setIsCartAnimating] = useState(false);

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-accent selection:text-white pb-20">
            <Head title="Admin Dashboard" />

            {/* Floating Pill Navbar */}
            <nav className="fixed top-6 left-0 right-0 mx-auto w-max max-w-full z-50">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-2 py-2 flex items-center gap-1">
                    {/* Logo Area */}
                    <div className="bg-[#1a1a1a] text-white rounded-full w-10 h-10 flex items-center justify-center font-black text-xs tracking-tighter shadow-lg">
                        FR.
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex items-center px-4 gap-1">
                        <Link href="#" className="px-5 py-2 rounded-full text-sm font-bold bg-[#1a1a1a] text-white shadow-md">
                            Overview
                        </Link>
                        {['Products', 'Orders', 'Customers', 'Vendors', 'Settings'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Products' ? route('admin.products.index') : item === 'Orders' ? route('admin.orders.index') : item === 'Customers' ? route('admin.customers.index') : item === 'Vendors' ? route('admin.vendors.index') : '#'}
                                className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-200 mx-2"></div>

                    {/* Utility */}
                    <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-accent transition-colors">
                        <span>View Shop</span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>

                    {/* User Profile */}
                    <div className="flex items-center pl-2 pr-1 gap-3 border-l border-gray-100 ml-2">
                        {/* ... same user profile ... */}
                        <div className="flex flex-col items-end leading-none hidden sm:flex">
                            <span className="text-xs font-bold text-[#1a1a1a]">{auth.user.name}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</span>
                        </div>
                        <img
                            src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=1a1a1a&color=fff&bold=true`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                    </div>
                </div>
            </nav>

            <div className="pt-32 px-4 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 animate-fade-in-up flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-2">Store Overview</h1>
                        <p className="text-gray-500 font-medium">Here's what's happening in your store today.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-6 py-3 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm">
                            Export Report
                        </button>
                        <button className="px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-bold hover:bg-accent hover:text-[#1a1a1a] transition-all shadow-lg hover:shadow-accent/30 flex items-center gap-2">
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                            New Product
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {/* Card 1: Sales - Blue */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-blue-500 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Sales</h3>
                                <div className="text-4xl font-black text-[#1a1a1a]">₹{Number(totalSales).toLocaleString('en-IN')}</div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-blue-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Orders - Amber */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-amber-500 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Orders</h3>
                                <div className="text-4xl font-black text-[#1a1a1a]">{totalOrders}</div>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-xl">
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-amber-500"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Customers - Emerald */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-emerald-500 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Store Customers</h3>
                                <div className="text-4xl font-black text-[#1a1a1a]">{totalCustomers}</div>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-xl">
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-emerald-500"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

                    {/* Left Column: Recent Orders (Wider) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#1a1a1a]">Recent Orders</h2>
                            <button className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#1a1a1a] transition-colors">View All</button>
                        </div>

                        {recentOrders && recentOrders.length > 0 ? (
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider pl-2">Order #</th>
                                            <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Customer</th>
                                            <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Amount</th>
                                            <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider text-right pr-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 pl-2 font-mono text-xs font-bold text-gray-500">#{order.id}</td>
                                                <td className="py-4 text-sm font-bold text-[#1a1a1a]">{order.user ? order.user.name : 'Guest'}</td>
                                                <td className="py-4 text-sm font-bold text-[#1a1a1a]">₹{Number(order.total_price).toLocaleString('en-IN')}</td>
                                                <td className="py-4 text-right pr-2">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {order.status || 'Paid'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            // Empty State with Dotted Background
                            <div className="bg-white rounded-3xl h-64 border border-gray-200 border-dashed relative overflow-hidden flex flex-col items-center justify-center text-center p-8 group">
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                                <div className="relative z-10 bg-white p-4 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-gray-400"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                </div>
                                <h3 className="relative z-10 text-lg font-bold text-[#1a1a1a] mb-2">No Recent Orders</h3>
                                <p className="relative z-10 text-sm text-gray-500 max-w-xs mx-auto">Once customers purchase items from the store, they will appear here ready for processing.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Recent Activity (Narrower) */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-[#1a1a1a]">Recent Activity</h2>
                        <div className="bg-white rounded-3xl h-[400px] border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                            <span className="text-gray-400 text-sm font-medium">No recent activity</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
