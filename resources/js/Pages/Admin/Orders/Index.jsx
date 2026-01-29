import { Head, Link } from '@inertiajs/react';

export default function OrdersIndex({ auth, orders }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'shipped': return 'bg-purple-100 text-purple-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-yellow-100 text-yellow-700'; // pending
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-700';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-yellow-100 text-yellow-700'; // pending
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans">
            <Head title="Orders - Admin" />

            {/* Floating Pill Navbar */}
            <nav className="fixed top-6 left-0 right-0 mx-auto w-max max-w-full z-50">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-2 py-2 flex items-center gap-1">
                    <Link href={route('admin.dashboard')} className="bg-[#1a1a1a] text-white rounded-full w-10 h-10 flex items-center justify-center font-black text-xs tracking-tighter shadow-lg">
                        FR.
                    </Link>

                    <div className="hidden md:flex items-center px-4 gap-1">
                        <Link href={route('admin.dashboard')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Overview
                        </Link>
                        <Link href={route('admin.products.index')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Products
                        </Link>
                        <Link href={route('admin.orders.index')} className="px-5 py-2 rounded-full text-sm font-bold bg-[#1a1a1a] text-white shadow-md">
                            Orders
                        </Link>
                        <Link href={route('admin.customers.index')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Customers
                        </Link>
                        <Link href={route('admin.vendors.index')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Vendors
                        </Link>
                        <Link href="#" className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Settings
                        </Link>
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-2"></div>

                    <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-accent transition-colors">
                        <span>View Shop</span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>

                    <div className="flex items-center pl-2 pr-1 gap-3 border-l border-gray-100 ml-2">
                        <div className="flex flex-col items-end leading-none hidden sm:flex">
                            <span className="text-xs font-bold text-[#1a1a1a]">{auth.user.name}</span>
                            <span className="text-[10px] font-medium text-gray-400">Admin</span>
                        </div>
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=1a1a1a&color=fff&bold=true`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Orders</h1>
                        <p className="text-gray-500 mt-1">Manage customer orders and fulfillment.</p>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Order ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Customer</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Total</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Payment</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Date</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-12 text-gray-400">
                                            <svg className="w-12 h-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <p className="font-bold">No orders yet</p>
                                            <p className="text-sm mt-1">Orders will appear here when customers place them.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-[#1a1a1a]">#{order.id}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-medium text-gray-700">{order.user?.name || 'Guest'}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-[#1a1a1a]">₹{parseFloat(order.total_price).toLocaleString('en-IN')}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getPaymentStatusColor(order.payment_status)}`}>
                                                    {order.payment_status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('en-IN')}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <button className="text-sm font-bold text-gray-400 hover:text-[#1a1a1a] transition-colors">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
