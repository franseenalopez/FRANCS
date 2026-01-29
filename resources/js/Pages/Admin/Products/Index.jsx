import { Head, Link, usePage } from '@inertiajs/react';

export default function ProductsIndex({ auth, products }) {
    const { props } = usePage();

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans">
            <Head title="Products - Admin" />

            {/* Floating Pill Navbar (Consistent with Dashboard) */}
            <nav className="fixed top-6 left-0 right-0 mx-auto w-max max-w-full z-50">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-2 py-2 flex items-center gap-1">
                    <div className="bg-[#1a1a1a] text-white rounded-full w-10 h-10 flex items-center justify-center font-black text-xs tracking-tighter shadow-lg">FR.</div>

                    <div className="hidden md:flex items-center px-4 gap-1">
                        <Link href={route('admin.dashboard')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">Overview</Link>
                        <Link href="#" className="px-5 py-2 rounded-full text-sm font-bold bg-[#1a1a1a] text-white shadow-md">Products</Link>
                        {['Orders', 'Customers', 'Vendors', 'Settings'].map((item) => (
                            <Link key={item} href={item === 'Orders' ? route('admin.orders.index') : item === 'Customers' ? route('admin.customers.index') : item === 'Vendors' ? route('admin.vendors.index') : '#'} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all duration-300">{item}</Link>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-2"></div>

                    <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-accent transition-colors">
                        <span>View Shop</span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                    </a>

                    <div className="flex items-center pl-2 pr-1 gap-3 border-l border-gray-100 ml-2">
                        <div className="flex flex-col items-end leading-none hidden sm:flex">
                            <span className="text-xs font-bold text-[#1a1a1a]">{auth.user.name}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</span>
                        </div>
                        <img src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=1a1a1a&color=fff&bold=true`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                    </div>
                </div>
            </nav>

            <div className="pt-32 px-4 max-w-7xl mx-auto pb-20">
                <div className="mb-10 animate-fade-in-up flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-2">Products</h1>
                        <p className="text-gray-500 font-medium">Manage your inventory and product catalog.</p>
                    </div>
                    <Link href={route('admin.products.create')} className="px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-bold hover:bg-accent hover:text-[#1a1a1a] transition-all shadow-lg hover:shadow-accent/30 flex items-center gap-2">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                        Add Product
                    </Link>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-4 pl-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Image</th>
                                <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Name</th>
                                <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Category</th>
                                <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Price</th>
                                <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Stock</th>
                                <th className="pb-4 font-bold text-gray-400 text-[10px] uppercase tracking-wider">Status</th>
                                <th className="pb-4 pr-4 text-right font-bold text-gray-400 text-[10px] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pl-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                                                {product.image ? (
                                                    <img src={'/storage/' + product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">IMG</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 font-bold text-[#1a1a1a]">{product.name}</td>
                                        <td className="py-4 text-sm text-gray-500">{product.category?.name || 'Uncategorized'}</td>
                                        <td className="py-4 font-bold text-[#1a1a1a]">₹{Number(product.price).toLocaleString('en-IN')}</td>
                                        <td className="py-4 text-sm font-medium text-gray-600">{product.stock}</td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {product.is_active ? 'Active' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4 text-right">
                                            <Link href={route('admin.products.edit', product.id)} className="text-gray-400 hover:text-[#1a1a1a] font-bold text-xs transition-colors">Edit</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-12 text-center text-gray-400 font-medium">No products found. Add your first product to get started.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {products.links && (
                    <div className="mt-8 flex justify-center gap-2">
                        {products.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${link.active
                                    ? 'bg-[#1a1a1a] text-white shadow-md'
                                    : 'bg-white text-gray-500 hover:bg-gray-100'
                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
