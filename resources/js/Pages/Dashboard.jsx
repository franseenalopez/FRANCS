import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ auth, recentOrders, stats }) {
    const user = auth.user;
    const [greeting, setGreeting] = useState('Welcome back');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
        return () => clearInterval(timer);
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8 bg-[#F5F5F7] min-h-screen font-sans">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">

                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200/60 transition-all hover:border-gray-300">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">My Account</p>
                                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white border border-gray-200 shadow-sm transition-all hover:scale-105">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-xs font-mono font-medium text-gray-600">
                                        {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                                {greeting}, {user.name.split(' ')[0]}.
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('shop.index')}
                                className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-bold rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(93,93,93,0.23)] hover:bg-black transition-all transform hover:-translate-y-0.5"
                            >
                                <span>Shop New Drops</span>
                                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {/* Stat Card 1 */}
                        <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <dt className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Total Orders</dt>
                                    <dd className="mt-4 text-4xl font-bold tracking-tight text-gray-900">{stats.total_orders}</dd>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-2xl">
                                    <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Successful deliveries
                                </span>
                            </div>
                        </div>

                        {/* Stat Card 2 */}
                        <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <dt className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Total Spent</dt>
                                    <dd className="mt-4 text-4xl font-bold tracking-tight text-gray-900">₹{stats.total_spent}</dd>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-2xl">
                                    <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-500">
                                    Lifetime value
                                </span>
                            </div>
                        </div>

                        {/* Stat Card 3: Items in Cart */}
                        <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <dt className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Items in Cart</dt>
                                    <dd className="mt-4 text-4xl font-bold tracking-tight text-gray-900">{stats.cart_count ?? 0}</dd>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-2xl">
                                    <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-500">
                                    Ready to checkout
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="rounded-[1.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                            <Link href="#" className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-1">
                                View Full History
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#F9FAFB]">
                                    <tr>
                                        <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Total</th>
                                        <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentOrders && recentOrders.length > 0 ? (
                                        recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5 font-semibold text-gray-900">
                                                    {order.reference}
                                                </td>
                                                <td className="px-8 py-5 text-sm font-medium text-gray-500">
                                                    {order.date}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-[#3BE798]/10 text-[#25a56d]' :
                                                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                                                            'bg-yellow-50 text-yellow-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right font-bold text-gray-900">
                                                    ₹{order.total}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <a href={order.view_url} className="text-gray-400 hover:text-gray-900 font-semibold transition-colors">
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-16 text-center text-gray-500">
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
