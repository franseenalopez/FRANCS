import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ auth, totalSales, totalOrders, totalCustomers, totalProducts, recentOrders, recentActivities }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [greeting, setGreeting] = useState('Welcome back');

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
        return () => clearInterval(timer);
    }, []);

    const quickActions = [
        { label: 'Add Product', icon: 'M12 4v16m8-8H4', href: route('admin.products.create'), color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
        { label: 'View Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', href: route('admin.orders.index'), color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
        { label: 'Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', href: route('admin.customers.index'), color: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-gray-900 selection:text-white">
            <Head title="Admin Dashboard - FRANCS" />

            {/* Floating Glass Navbar */}
            <nav className="fixed top-6 left-0 right-0 mx-auto w-max max-w-[95%] z-50">
                <div className="bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-xl shadow-gray-900/5 rounded-2xl px-3 py-2 flex items-center gap-2">
                    {/* Logo */}
                    <div className="bg-[#1a1a1a] text-white rounded-xl w-10 h-10 flex items-center justify-center font-black text-sm tracking-tighter shadow-lg">
                        FR
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center px-2 gap-1">
                        <Link href="#" className="px-4 py-2 rounded-xl text-sm font-bold bg-[#1a1a1a] text-white shadow-md">
                            Overview
                        </Link>
                        {['Products', 'Orders', 'Customers', 'Vendors'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Products' ? route('admin.products.index') : item === 'Orders' ? route('admin.orders.index') : item === 'Customers' ? route('admin.customers.index') : item === 'Vendors' ? route('admin.vendors.index') : '#'}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-gray-200 mx-2 hidden md:block"></div>

                    {/* View Shop */}
                    <a href="/" target="_blank" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all">
                        <span>Shop</span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-3 border-l border-gray-200 ml-1">
                        <div className="hidden sm:flex flex-col items-end leading-tight">
                            <span className="text-xs font-bold text-gray-900">{auth.user.name}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</span>
                        </div>
                        <div className="relative">
                            <img
                                src={auth.user.avatar || `https://ui-avatars.com/api/?name=${auth.user.name}&background=1a1a1a&color=fff&bold=true`}
                                alt="Profile"
                                className="w-10 h-10 rounded-xl border-2 border-gray-200 shadow-sm"
                            />
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">

                {/* Welcome Header */}
                <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Admin Console</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-mono font-medium text-gray-600">
                                    {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                            {greeting}, <span className="text-gray-900">{auth.user.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-medium">Here's what's happening with your store today.</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.products.create')}
                            className="group relative inline-flex items-center gap-2 px-6 py-3.5 bg-[#1a1a1a] text-white text-sm font-bold rounded-2xl shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 hover:scale-[1.02] transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                            <span>New Product</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid - Premium Glass Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {/* Total Sales */}
                    <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</span>
                                <div className="p-2.5 bg-blue-50 rounded-xl">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">₹{Number(totalSales || 0).toLocaleString('en-IN')}</div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    All time
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 rounded-l-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</span>
                                <div className="p-2.5 bg-amber-50 rounded-xl">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{totalOrders || 0}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-400">Orders placed</span>
                            </div>
                        </div>
                    </div>

                    {/* Customers */}
                    <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Customers</span>
                                <div className="p-2.5 bg-emerald-50 rounded-xl">
                                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{totalCustomers || 0}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-400">Registered users</span>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02] overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Products</span>
                                <div className="p-2.5 bg-cyan-50 rounded-xl">
                                    <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                </div>
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{totalProducts || 0}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-400">In catalog</span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Admin Actions Section */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        Admin Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {quickActions.map((action, index) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-xl bg-gray-50 group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300`}>
                                        <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={action.icon} /></svg>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{action.label}</div>
                                        <div className="text-sm text-gray-400 group-hover:text-gray-500">Quick access →</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders - Larger */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                <span className="p-2 bg-gray-100 rounded-xl">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                </span>
                                Recent Orders
                            </h2>
                            <Link href={route('admin.orders.index')} className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">
                                View All
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>

                        {recentOrders && recentOrders.length > 0 ? (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <th className="px-6 py-4 font-bold text-gray-400 text-[11px] uppercase tracking-widest">Order</th>
                                                <th className="px-6 py-4 font-bold text-gray-400 text-[11px] uppercase tracking-widest">Customer</th>
                                                <th className="px-6 py-4 font-bold text-gray-400 text-[11px] uppercase tracking-widest">Amount</th>
                                                <th className="px-6 py-4 font-bold text-gray-400 text-[11px] uppercase tracking-widest text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {recentOrders.map((order) => (
                                                <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="font-mono text-sm font-bold text-gray-900">#{String(order.id).padStart(4, '0')}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
                                                                {(order.user?.name || 'G')[0].toUpperCase()}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700">{order.user?.name || 'Guest'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-bold text-gray-900">₹{Number(order.total_price).toLocaleString('en-IN')}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
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
                            </div>
                        ) : (
                            <div className="relative bg-white rounded-3xl h-80 border border-gray-200 border-dashed overflow-hidden flex flex-col items-center justify-center text-center p-8 group">
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                                <div className="relative z-10 p-5 bg-gray-100 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                                <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                                <p className="relative z-10 text-sm text-gray-500 max-w-sm">When customers make purchases, their orders will appear here for you to manage and fulfill.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Activity + Store Health */}
                    <div className="space-y-6">
                        {/* Store Performance */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Store Health
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-sm font-medium text-gray-600">Store Status</span>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-600">Online</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">--</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <span className="text-sm font-medium text-gray-600">Avg. Order Value</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">
                                        {totalOrders > 0 ? `₹${Math.round(totalSales / totalOrders).toLocaleString('en-IN')}` : '--'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Recent Activity
                            </h3>

                            {recentActivities && recentActivities.length > 0 ? (
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.description.includes('stock') ? 'bg-amber-100 text-amber-600' :
                                                    activity.description.includes('user') ? 'bg-blue-100 text-blue-600' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {activity.description.includes('stock') ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                                    ) : activity.description.includes('user') ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{activity.description}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {activity.properties?.name && <span className="font-medium text-gray-700">{activity.properties.name} </span>}
                                                    {activity.properties?.old_stock && (
                                                        <span>(Stock: {activity.properties.old_stock} → {activity.properties.new_stock})</span>
                                                    )}
                                                </p>
                                                <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">{activity.created_at}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 text-center">
                                    <div className="p-4 bg-gray-100 rounded-2xl mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-sm text-gray-400">Activity will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
