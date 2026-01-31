import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useCart } from '@/Contexts/CartContext';

export default function Navbar({ auth }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { openDrawer } = useCart();
    const { cart } = usePage().props;

    // Calculate total quantity
    const cartItems = Object.values(cart || {});
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="fixed top-6 left-0 right-0 mx-auto w-[90%] md:w-[70%] max-w-[900px] rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 z-[999] flex justify-between items-center px-6 py-2 transition-all duration-300 hover:bg-white/95">
            <div className="justify-self-start">
                <Link href="/" className="text-lg font-black tracking-tight text-[#1a1a1a] hover:opacity-70 transition-opacity">
                    FRANCS.
                </Link>
            </div>

            <ul className="justify-self-center hidden md:flex gap-8 font-bold text-xs uppercase tracking-wide text-[#1a1a1a]">
                {['Home', 'Store', 'About', 'Contact'].map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item === 'Home' ? '/' : item === 'Store' ? route('shop.index') : item === 'About' ? route('about') : item === 'Contact' ? route('contact.index') : '#'}
                            className="relative group py-2"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">{item}</span>
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="justify-self-end flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 font-bold text-[0.65rem] uppercase tracking-widest text-[#1a1a1a]">
                    {auth.user ? (
                        <div className="flex items-center gap-4">
                            <Link href={route('dashboard')} className="hover:text-accent transition-colors duration-300">Dashboard</Link>
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="block w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:border-accent transition-colors focus:outline-none"
                                >
                                    <img
                                        src={auth.user.avatar || `https://ui-avatars.com/api/?name=${auth.user.name}&background=1a1a1a&color=fff&bold=true`}
                                        alt={auth.user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40 cursor-default"
                                            onClick={() => setDropdownOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-3 border-b border-gray-100/50">
                                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Signed in as</p>
                                                <p className="text-sm font-bold text-gray-900 truncate">{auth.user.name}</p>
                                            </div>

                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent font-bold transition-colors"
                                            >
                                                Profile Settings
                                            </Link>

                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors border-t border-gray-100/50 mt-1"
                                            >
                                                Log Out
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href={route('login')} className="hover:text-accent transition-colors duration-300">Log in</Link>
                            <Link href={route('register')} className="px-5 py-2 bg-[#1a1a1a] text-white rounded-full hover:bg-accent hover:text-[#1a1a1a] transition-all duration-300 shadow-lg hover:shadow-accent/30">Register</Link>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4 text-[#1a1a1a]">
                    {auth.user && (
                        <button
                            className="relative hover:text-accent transition-transform duration-200 transform hover:scale-110 overflow-visible"
                            aria-label="Cart"
                            onClick={openDrawer}
                        >
                            {/* Updated Cart Icon to Simple Basket/Bag */}
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>

                            {cartCount > 0 && (
                                <span className="absolute -top-[6px] -right-[8px] bg-accent text-white text-[0.6rem] w-4 h-4 flex items-center justify-center rounded-full font-extrabold shadow-sm border border-white z-50">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
