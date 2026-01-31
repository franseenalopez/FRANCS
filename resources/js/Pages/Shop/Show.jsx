import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { useCart } from '@/Contexts/CartContext';
import toast from 'react-hot-toast';

import '../../../css/shop-cards.css';

export default function ShopShow({ auth, product, relatedProducts }) {
    const [quantity, setQuantity] = useState(1);

    const { openDrawer } = useCart();

    const handleAddToCart = () => {
        router.post('/cart', {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Added ${quantity} ${product.name}(s) to cart`);
                openDrawer();
            }
        });
    };

    // Helper to determine card class (reused from Index.jsx for consistency)
    const getCardClass = (prod) => {
        let classes = 'card';
        if (prod.stock <= 0) {
            classes += '-out';
        } else {
            // Demo logic for variety
            if (prod.id % 3 === 0) classes += '-new';
            else if (prod.id % 2 === 0) classes += '-seller';
            else classes += '-new';
        }
        return classes;
    };

    return (
        <>
            <Head>
                <title>{`${product.name} - Francs`}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </Head>
            <div className="shop-wrapper pt-20">
                {/* Universal Navbar */}
                <Navbar auth={auth} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            href={route('shop.index')}
                            className="flex items-center gap-2 text-[#2B2B2B] hover:text-[#3BE798] transition font-bold"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                            Back to Store
                        </Link>
                        <span className="text-gray-300">|</span>
                        <nav className="text-sm font-bold" style={{ color: '#888' }}>
                            <span className="text-[#2B2B2B]">{product.name.toUpperCase()}</span>
                        </nav>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Product Image Stage */}
                        <div className="relative flex justify-center items-center h-[500px]">
                            {/* Background Elements matching card style */}
                            <div className="absolute w-[400px] h-[400px] rounded-full bg-[#e7e7e7] z-0"></div>
                            {product.image ? (
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="relative z-10 w-auto h-[350px] object-contain transform -rotate-12 drop-shadow-2xl hover:scale-105 transition duration-500"
                                />
                            ) : (
                                <img
                                    src={`/images/shoe${(product.id % 6) + 1}.png`}
                                    alt="Shoe"
                                    className="relative z-10 w-auto h-[350px] object-contain transform -rotate-12 drop-shadow-2xl hover:scale-105 transition duration-500"
                                />
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-center">
                            <p className="text-[#888] font-semibold tracking-widest uppercase mb-2 text-sm">
                                {product.category?.name || 'Francs Collection'}
                            </p>
                            <h1 className="text-6xl font-extrabold text-[#2B2B2B] mb-2 leading-none tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {product.name}
                            </h1>
                            <div className="flex gap-1 mb-6">
                                <i className="fa-solid fa-star text-[#3BE798]"></i>
                                <i className="fa-solid fa-star text-[#3BE798]"></i>
                                <i className="fa-solid fa-star text-[#3BE798]"></i>
                                <i className="fa-solid fa-star text-[#3BE798]"></i>
                                <i className="fa-solid fa-star text-[#3BE798]"></i>
                                <span className="ml-2 text-sm text-gray-500">(128 Reviews)</span>
                            </div>

                            <p className="text-4xl text-gray-900 font-bold mb-8">₹{parseFloat(product.price).toFixed(2)}</p>

                            <div className="prose text-gray-600 mb-8 max-w-md">
                                <p>{product.description || "Experience the ultimate comfort and style with this premium addition to your collection. Designed for those who dare to stand out."}</p>
                            </div>

                            {/* Color Selection Placeholder */}
                            <div className="mb-8">
                                <h3 className="font-bold text-[#2B2B2B] mb-3 uppercase text-sm tracking-wide">Select Color</h3>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition" style={{ background: '#3BE798' }}></div>
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition" style={{ background: '#2B2B2B' }}></div>
                                    <div className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition" style={{ background: '#f26a5f' }}></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-100 px-2 py-1">
                                    <button
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#3BE798] font-bold text-xl transition"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-bold text-[#2B2B2B]">{quantity}</span>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#3BE798] font-bold text-xl transition"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-[#2B2B2B] text-white font-bold py-4 px-8 rounded-full hover:bg-[#3BE798] hover:text-[#2B2B2B] transition-all shadow-lg transform active:scale-95 flex justify-center items-center gap-3"
                                >
                                    <i className="fa-solid fa-basket-shopping"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-32">
                            <div className="flex justify-between items-end mb-12">
                                <h2 className="text-4xl font-extrabold text-[#2B2B2B] tracking-tight">You May Also Like</h2>
                                <Link href={route('shop.index')} className="font-bold text-[#2B2B2B] hover:text-[#3BE798] transition">View All</Link>
                            </div>

                            <div className="shop-card-container !p-0 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-8">
                                {relatedProducts.map(related => (
                                    <Link key={related.id} href={route('shop.show', related.id)} className="block hover:no-underline w-full max-w-[320px]">
                                        <div className={getCardClass(related)}>
                                            <div className="basicInfo">
                                                <div className="title">
                                                    <div className="category">
                                                        {related.category?.name || 'Francs'}
                                                    </div>
                                                    <div className="name">{related.name}</div>
                                                </div>

                                                <div className="colors">
                                                    <div className="ellipse" style={{ background: '#3BE798' }}></div>
                                                    <div className="ellipse" style={{ background: '#2B2B2B' }}></div>
                                                </div>

                                                <div className="images">
                                                    <div className="img">
                                                        {related.image ? (
                                                            <img src={`/storage/${related.image}`} alt={related.name} />
                                                        ) : (
                                                            <img
                                                                src={`/images/shoe${(related.id % 6) + 1}.png`}
                                                                alt="Shoe"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="addCard">
                                                    <i className={related.stock <= 0 ? "fa-solid fa-ban" : "fa-solid fa-basket-shopping"}></i>
                                                </div>
                                            </div>
                                            <div className="mores">
                                                <div className="stars">
                                                    <i className="fa-solid fa-star text-yellow"></i>
                                                    <i className="fa-solid fa-star text-yellow"></i>
                                                    <i className="fa-solid fa-star text-yellow"></i>
                                                    <i className="fa-solid fa-star text-yellow"></i>
                                                    <i className="fa-solid fa-star text-yellow"></i>
                                                </div>
                                                <div className="price">${parseFloat(related.price).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
