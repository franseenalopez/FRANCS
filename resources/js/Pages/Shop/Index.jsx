import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import '../../../css/shop-cards.css'; // Import custom card styles

export default function ShopIndex({ auth, products, categories, filters = {} }) {
    const { url } = usePage();

    // Defensive initialization to prevent 'sort' method collision if filters is array-like
    const initialCategory = filters?.category || '';
    const initialSort = (filters && typeof filters.sort === 'string') ? filters.sort : 'latest';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentSort, setCurrentSort] = useState(initialSort);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle filter application logic
    const applyFilters = (newCategory, newSort) => {
        const params = new URLSearchParams();
        if (newCategory) params.set('category', newCategory);
        if (newSort) params.set('sort', newSort);
        window.location.href = `/shop?${params.toString()}`;
    };

    // Helper to determine card class
    const getCardClass = (product) => {
        let classes = 'card';
        if (product.stock <= 0) {
            classes += '-out';
        } else {
            // Demo logic for variety
            if (product.id % 3 === 0) classes += '-new';
            else if (product.id % 2 === 0) classes += '-seller';
            else classes += '-new'; // Default to new for standard look
        }
        return classes;
    };

    return (
        <>
            <Head title="Shop - Francs" />
            <div className="shop-wrapper">
                {/* Navigation - Custom Shop Style */}
                <nav className="shop-nav">
                    <div className="logo">
                        <Link href="/" className="text-decoration-none text-inherit">
                            FRANCS<span>.</span>
                        </Link>
                    </div>
                    <div className="nav-links hidden md:flex">
                        <Link href="/" className="hover:text-inherit">Home</Link>
                        <Link href={route('shop.index')} className="active hover:text-inherit">Store</Link>
                        <Link href={route('about')} className="hover:text-inherit">About</Link>
                        <Link href="#" className="hover:text-inherit">Contact</Link>
                    </div>
                    <div className="nav-icons">
                        <i className="fa-regular fa-heart"></i>
                        <div className="cart-btn">
                            <i className="fa-solid fa-basket-shopping"></i>
                            <span className="cart-badge">2</span>
                        </div>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-sm font-bold ml-4">Dashboard</Link>
                        ) : (
                            <Link href={route('login')} className="text-sm font-bold ml-4">Log In</Link>
                        )}
                    </div>
                </nav>

                <header className="store-header">
                    <h1 className="page-title">Fresh<br />Drops</h1>
                    <div className="filter-bar">
                        <div
                            className={`filter-chip ${selectedCategory === '' ? 'active' : ''}`}
                            onClick={() => applyFilters('', currentSort)}
                        >
                            All Kicks
                        </div>
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                className={`filter-chip ${selectedCategory === cat.slug ? 'active' : ''}`}
                                onClick={() => applyFilters(cat.slug, currentSort)}
                            >
                                {cat.name}
                            </div>
                        ))}
                        <div className="filter-chip sale">Sale %</div>
                    </div>
                    {/* Sort Dropdown (Optional/Hidden for simplicity or integrated) */}
                    {/* Custom Sort Dropdown */}
                    <div className="flex justify-end pr-5 relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all focus:outline-none group"
                        >
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Sort By:</span>
                            <span className="text-sm font-bold text-[#2B2B2B] group-hover:text-[#3BE798] transition-colors">
                                {currentSort === 'latest' && 'Newest'}
                                {currentSort === 'price_asc' && 'Price: Low to High'}
                                {currentSort === 'price_desc' && 'Price: High to Low'}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`text-gray-400 group-hover:text-[#3BE798] transition-all duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-10 right-0 w-48 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-100 animate-fade-in-down">
                                <div
                                    className={`px-6 py-3 cursor-pointer text-sm font-bold hover:bg-gray-50 hover:text-[#3BE798] transition ${currentSort === 'latest' ? 'text-[#3BE798] bg-gray-50' : 'text-[#2B2B2B]'}`}
                                    onClick={() => { applyFilters(selectedCategory, 'latest'); setIsDropdownOpen(false); }}
                                >
                                    Newest
                                </div>
                                <div
                                    className={`px-6 py-3 cursor-pointer text-sm font-bold hover:bg-gray-50 hover:text-[#3BE798] transition ${currentSort === 'price_asc' ? 'text-[#3BE798] bg-gray-50' : 'text-[#2B2B2B]'}`}
                                    onClick={() => { applyFilters(selectedCategory, 'price_asc'); setIsDropdownOpen(false); }}
                                >
                                    Price: Low to High
                                </div>
                                <div
                                    className={`px-6 py-3 cursor-pointer text-sm font-bold hover:bg-gray-50 hover:text-[#3BE798] transition ${currentSort === 'price_desc' ? 'text-[#3BE798] bg-gray-50' : 'text-[#2B2B2B]'}`}
                                    onClick={() => { applyFilters(selectedCategory, 'price_desc'); setIsDropdownOpen(false); }}
                                >
                                    Price: High to Low
                                </div>
                            </div>
                        )}

                        {/* Overlay to close dropdown when clicking outside */}
                        {isDropdownOpen && (
                            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                        )}
                    </div>
                </header>

                <div className="shop-card-container">
                    {products.data.length === 0 ? (
                        <div className="w-full text-center py-20">
                            <p className="text-xl text-gray-500">No products found.</p>
                        </div>
                    ) : (
                        products.data.map(product => (
                            <Link key={product.id} href={route('shop.show', product.id)} className="block hover:no-underline w-full max-w-[320px]">
                                <div className={getCardClass(product)}>
                                    <div className="basicInfo">
                                        <div className="title">
                                            <div className="category">
                                                {product.category?.name || 'Francs'}
                                            </div>
                                            <div className="name">{product.name}</div>
                                        </div>

                                        <div className="colors">
                                            <div className="ellipse" style={{ background: '#3BE798' }}></div>
                                            <div className="ellipse" style={{ background: '#2B2B2B' }}></div>
                                        </div>

                                        <div className="images">
                                            <div className="img">
                                                {product.image ? (
                                                    <img src={`/storage/${product.image}`} alt={product.name} />
                                                ) : (
                                                    // Rotate through the static images for variety
                                                    <img
                                                        src={`/images/shoe${(product.id % 6) + 1}.png`}
                                                        alt="Shoe"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="addCard">
                                            <i className={product.stock <= 0 ? "fa-solid fa-ban" : "fa-solid fa-basket-shopping"}></i>
                                        </div>
                                    </div>
                                    <div className="mores">
                                        <div className="stars">
                                            <i className="fa-solid fa-star text-yellow"></i>
                                            <i class="fa-solid fa-star text-yellow"></i>
                                            <i class="fa-solid fa-star text-yellow"></i>
                                            <i class="fa-solid fa-star text-yellow"></i>
                                            <i class="fa-solid fa-star text-yellow"></i>
                                        </div>
                                        <div className="price">${parseFloat(product.price).toFixed(2)}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center pb-20 mt-10">
                    {products.links && (
                        <div className="flex gap-2">
                            {products.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 border rounded-full text-sm font-bold transition-all ${link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="px-4 py-2 text-gray-400 text-sm font-bold"
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
