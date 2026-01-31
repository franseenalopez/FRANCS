import { Head, Link } from '@inertiajs/react';

export default function CustomersIndex({ auth, customers, filters = {} }) {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans">
            <Head title="Customers - Admin" />

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
                        <Link href={route('admin.customers.index')} className="px-5 py-2 rounded-full text-sm font-bold bg-[#1a1a1a] text-white shadow-md">
                            Customers
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
                    <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Customers</h1>
                    <p className="text-gray-500 mt-1">View and manage registered users.</p>
                </div>
                {/* Search Bar */}
                <div className="mt-4 sm:mt-0">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            defaultValue={filters.search}
                            onChange={(e) => {
                                clearTimeout(window.searchTimeout);
                                window.searchTimeout = setTimeout(() => {
                                    import('@inertiajs/react').then(({ router }) => {
                                        router.get(route('admin.customers.index'), { search: e.target.value }, {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true,
                                        });
                                    });
                                }, 400);
                            }}
                            className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none w-full sm:w-64 transition-all shadow-sm"
                        />
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-5 px-8 text-sm font-bold uppercase tracking-wider text-gray-400">User</th>
                                <th className="text-left py-5 px-8 text-sm font-bold uppercase tracking-wider text-gray-400">Email</th>
                                <th className="text-left py-5 px-8 text-sm font-bold uppercase tracking-wider text-gray-400">Role</th>
                                <th className="text-left py-5 px-8 text-sm font-bold uppercase tracking-wider text-gray-400">Joined</th>
                                <th className="text-left py-5 px-8 text-sm font-bold uppercase tracking-wider text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-400">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="font-bold">No customers yet</p>
                                        <p className="text-sm mt-1">Customers will appear here when they register.</p>
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${customer.name}&background=e5e7eb&color=374151&bold=true`}
                                                        alt={customer.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-base font-bold text-[#1a1a1a]">{customer.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-base text-gray-600">{customer.email}</span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase ${customer.role === 'vendor' ? 'bg-purple-100 text-purple-700' :
                                                customer.role === 'admin' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                {customer.role || 'customer'}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-base text-gray-600">{new Date(customer.created_at).toLocaleDateString('en-IN')}</span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <button className="text-base font-bold text-accent hover:text-[#1a1a1a] transition-colors">
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

    );
}
