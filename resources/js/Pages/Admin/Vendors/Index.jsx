import { Head, Link } from '@inertiajs/react';

export default function VendorsIndex({ auth, vendors, recentProducts }) {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans">
            <Head title="Vendors - Admin" />

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
                        <Link href={route('admin.orders.index')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Orders
                        </Link>
                        <Link href={route('admin.customers.index')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">
                            Customers
                        </Link>
                        <Link href={route('admin.vendors.index')} className="px-5 py-2 rounded-full text-sm font-bold bg-[#1a1a1a] text-white shadow-md">
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
                        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Vendor Management</h1>
                        <p className="text-gray-500 mt-1">Monitor vendor activities and take moderation actions.</p>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Vendors List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-[#1a1a1a]">Registered Vendors</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-5 px-6 text-sm font-bold uppercase tracking-wider text-gray-400">Vendor</th>
                                            <th className="text-left py-5 px-6 text-sm font-bold uppercase tracking-wider text-gray-400">Email</th>
                                            <th className="text-left py-5 px-6 text-sm font-bold uppercase tracking-wider text-gray-400">Joined</th>
                                            <th className="text-left py-5 px-6 text-sm font-bold uppercase tracking-wider text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendors.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-12 text-gray-400">
                                                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <p className="font-bold text-lg">No vendors yet</p>
                                                    <p className="text-base mt-1">Vendors will appear here when they register.</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            vendors.map((vendor) => (
                                                <tr key={vendor.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-5 px-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100">
                                                                <img
                                                                    src={`https://ui-avatars.com/api/?name=${vendor.name}&background=9333ea&color=fff&bold=true`}
                                                                    alt={vendor.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className="text-base font-bold text-[#1a1a1a] block">{vendor.name}</span>
                                                                <span className="text-xs text-purple-600 font-bold uppercase">Vendor</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-6">
                                                        <span className="text-base text-gray-600">{vendor.email}</span>
                                                    </td>
                                                    <td className="py-5 px-6">
                                                        <span className="text-base text-gray-600">{new Date(vendor.created_at).toLocaleDateString('en-IN')}</span>
                                                    </td>
                                                    <td className="py-5 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <button className="px-4 py-2 text-sm font-bold text-accent hover:text-[#1a1a1a] transition-colors">
                                                                View
                                                            </button>
                                                            <button className="px-4 py-2 text-sm font-bold text-yellow-600 hover:text-yellow-700 transition-colors">
                                                                Warn
                                                            </button>
                                                            <button className="px-4 py-2 text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
                                                                Suspend
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Recent Product Activity */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-[#1a1a1a]">Recent Product Activity</h2>
                                <p className="text-sm text-gray-400 mt-1">Monitor new and updated products</p>
                            </div>
                            <div className="p-4">
                                {recentProducts.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <p className="font-bold">No recent activity</p>
                                        <p className="text-sm mt-1">Product updates will appear here.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {recentProducts.map((product) => (
                                            <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">IMG</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-[#1a1a1a] truncate">{product.name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {product.category?.name || 'Uncategorized'} • ₹{parseFloat(product.price).toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        {product.is_active ? 'Active' : 'Draft'}
                                                    </span>
                                                    <button className="text-xs font-bold text-red-500 hover:text-red-700">
                                                        Flag
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
