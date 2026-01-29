import { Head, Link, usePage, router } from '@inertiajs/react'; // ADD
import { useState, useEffect, useRef } from 'react'; // ADD
import Navbar from '@/Components/Navbar';
import debounce from 'lodash/debounce'; // Make sure lodash is installed, or implement custom debounce

import '../../../css/shop-cards.css'; // Import custom card styles

export default function ShopIndex({ auth, products, categories, filters = {} }) {
    const { url } = usePage();

    // Defensive initialization to prevent 'sort' method collision if filters is array-like
    const initialCategory = filters?.category || '';
    const initialSort = (filters && typeof filters.sort === 'string') ? filters.sort : 'latest';
    const initialSearch = filters?.search || ''; // ADD

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentSort, setCurrentSort] = useState(initialSort);
    const [searchQuery, setSearchQuery] = useState(initialSearch); // ADD
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Handle filter application logic // RENAME/UPDATE
    const updateParams = (newCategory, newSort, newSearch) => {
        router.get(route('shop.index'), {
            category: newCategory,
            sort: newSort,
            search: newSearch, // ADD
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true, // Optimizes history
        });
    };

    // Debounced search handler
    const debouncedSearch = useRef(
        debounce((criteria) => {
            updateParams(criteria.category, criteria.sort, criteria.search);
        }, 500)
    ).current;

    // Effect to trigger search when query changes (optional, or stick to explicit actions)
    // Here we will use explicit calls to updateParams for category/sort, and debounced for search input.

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch({ category: selectedCategory, sort: currentSort, search: value });
    };

    const handleCategoryChange = (slug) => {
        if (selectedCategory === slug) return; // Prevent duplicate navigation
        setSelectedCategory(slug);
        updateParams(slug, currentSort, searchQuery);
    };

    const handleSortChange = (sortOption) => {
        if (currentSort === sortOption) return;
        setCurrentSort(sortOption);
        setIsDropdownOpen(false);
        updateParams(selectedCategory, sortOption, searchQuery);
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
            <div className="shop-wrapper pt-32">
                {/* Universal Navbar */}
                <Navbar auth={auth} cartCount={2} />

                <header className="store-header">
                    <h1 className="page-title">Fresh<br />Drops</h1>

                    <div className="flex items-center justify-between mb-8 mt-6">
                        {/* Search Bar */}
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search Kicks..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-white/50 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-[#3BE798] focus:outline-none focus:ring-4 focus:ring-[#3BE798]/10 transition-all font-bold text-[#2B2B2B] placeholder:text-gray-400 placeholder:font-semibold shadow-sm hover:shadow-lg"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>

                        {/* Custom Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all focus:outline-none group"
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
                                <div className="absolute top-12 right-0 w-56 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-100 animate-fade-in-down">
                                    <div
                                        className={`px-6 py-3 cursor-pointer text-sm font-bold hover:bg-gray-50 hover:text-[#3BE798] transition ${currentSort === 'latest' ? 'text-[#3BE798] bg-gray-50' : 'text-[#2B2B2B]'}`}
                                        onClick={() => handleSortChange('latest')}
                                    >
                                        Newest
                                    </div>
                                    <div
                                        className={`px-6 py-3 cursor-pointer text-sm font-bold hover:bg-gray-50 hover:text-[#3BE798] transition ${currentSort === 'price_asc' ? 'text-[#3BE798] bg-gray-50' : 'text-[#2B2B2B]'}`}
                                        onClick={() => handleSortChange('price_asc')}
                                    >
                                        Price: Low to High
                                    </div>
                                    <div
                                        className={`px-6 py-3 cursor-pointer text-sm font-bold hover:bg-gray-50 hover:text-[#3BE798] transition ${currentSort === 'price_desc' ? 'text-[#3BE798] bg-gray-50' : 'text-[#2B2B2B]'}`}
                                        onClick={() => handleSortChange('price_desc')}
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

                                    </div>
                                    <div className="addCard">
                                        <i className={product.stock <= 0 ? "fa-solid fa-ban" : "fa-solid fa-basket-shopping"}></i>
                                    </div>
                                    <div className="mores">
                                        <div className="stars">
                                            <i className="fa-solid fa-star text-yellow"></i>
                                            <i className="fa-solid fa-star text-yellow"></i>
                                            <i className="fa-solid fa-star text-yellow"></i>
                                            <i className="fa-solid fa-star text-yellow"></i>
                                            <i className="fa-solid fa-star text-yellow"></i>
                                        </div>
                                        <div className="price">₹{parseFloat(product.price).toFixed(2)}</div>
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
