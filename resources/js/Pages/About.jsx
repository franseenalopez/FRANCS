import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function About({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Head title="About | FRANCS" />
            <div className="font-sans text-[#1a1a1a] bg-white min-h-screen flex flex-col overflow-x-hidden">
                {/* Navbar (Reused) */}
                {/* Floating Glass Navbar */}
                <nav className="fixed top-6 left-0 right-0 mx-auto w-[92%] max-w-[1400px] rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-10 py-5 transition-all duration-300 hover:bg-white/95">
                    <div className="justify-self-start">
                        <Link href="/" className="text-xl font-black tracking-tight text-[#1a1a1a] hover:opacity-70 transition-opacity">
                            FRANCS.
                        </Link>
                    </div>

                    <ul className="justify-self-center hidden md:flex gap-12 font-bold text-sm uppercase tracking-wide text-[#1a1a1a]">
                        {['Home', 'Store', 'About', 'Contact'].map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item === 'Home' ? '/' : item === 'Store' ? route('shop.index') : item === 'About' ? route('about') : '#'}
                                    className="relative group py-2"
                                >
                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">{item}</span>
                                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="justify-self-end flex items-center gap-10">
                        <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="hover:text-accent transition-colors duration-300">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="hover:text-accent transition-colors duration-300">Log in</Link>
                                    <Link href={route('register')} className="px-5 py-2.5 bg-[#1a1a1a] text-white rounded-full hover:bg-accent hover:text-[#1a1a1a] transition-all duration-300 shadow-lg hover:shadow-accent/30">Register</Link>
                                </>
                            )}
                        </div>
                        <Link href={route('shop.index')} className="text-[#1a1a1a] hover:text-accent transition-colors transform hover:scale-110 duration-200">
                            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" /></svg>
                        </Link>
                    </div>
                </nav>
                <div className="h-32"></div>

                <main className="flex-grow">
                    {/* Hero Section */}
                    <section className="px-[5%] py-20 bg-[#1a1a1a] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3BE798] rounded-full blur-[150px] opacity-10 translate-x-1/3 -translate-y-1/3"></div>
                        <div className="relative z-10 max-w-4xl">
                            <span className="text-[#3BE798] font-bold tracking-widest uppercase mb-4 block">Our DNA</span>
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                                WE DON'T JUST <br />
                                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>MAKE SNEAKERS.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl">
                                We craft movements. Born from the streets and built for the future, FRANCS is the intersection of raw culture and precision engineering.
                            </p>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="px-[5%] py-20 bg-white overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-[#f0f0f0] rounded-[60px] transform rotate-3 group-hover:rotate-0 transition-transform duration-700 -z-10 bg-dot-pattern"></div>
                                <img src="/images/shoe1.png" alt="Francs Craftsmanship" className="w-full relative z-10 drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#1a1a1a] tracking-tight">THE ORIGIN</h2>
                                <p className="text-[#1a1a1a] text-xl font-medium mb-6 leading-relaxed">
                                    Why choose between style and substance? FRANCS was founded in 2024 to disrupt the footwear industry by fusing avant-garde aesthetics with sustainable, high-performance materials.
                                </p>
                                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                                    Every pair is a testament to individuality. Limited runs, exclusive designs, and a commitment to quality that refuses to compromise. When you wear FRANCS, you're not just wearing shoes—you're making a statement.
                                </p>
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="border-l-4 border-[#3BE798] pl-6">
                                        <div className="text-4xl font-black text-[#1a1a1a] mb-2">100%</div>
                                        <div className="text-xs font-bold uppercase text-gray-400 tracking-wider">Sustainable</div>
                                    </div>
                                    <div className="border-l-4 border-[#1a1a1a] pl-6">
                                        <div className="text-4xl font-black text-[#1a1a1a] mb-2">50k+</div>
                                        <div className="text-xs font-bold uppercase text-gray-400 tracking-wider">Community</div>
                                    </div>
                                    <div className="border-l-4 border-[#f26a5f] pl-6">
                                        <div className="text-4xl font-black text-[#1a1a1a] mb-2">24/7</div>
                                        <div className="text-xs font-bold uppercase text-gray-400 tracking-wider">Innovation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Core Values Section */}
                    <section className="bg-[#1a1a1a] text-white overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Image Side */}
                            <div className="relative h-[500px] lg:h-auto min-h-[500px]">
                                <img src="/images/shoe2.png" alt="Francs Values" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                                <div className="absolute bottom-12 left-12 p-8 border-l-4 border-[#3BE798] bg-black/40 backdrop-blur-md max-w-sm">
                                    <p className="text-2xl font-black italic tracking-tighter">"STYLE WITHOUT SUBSTANCE IS JUST NOISE."</p>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="p-12 lg:p-24 flex flex-col justify-center">
                                <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight flex items-end gap-4">
                                    CORE VALUES <span className="text-[#3BE798] text-6xl">.</span>
                                </h2>

                                <div className="space-y-10">
                                    <div className="group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-[#3BE798] font-mono text-sm uppercase tracking-widest border border-[#3BE798] px-2 py-1 rounded">01</span>
                                            <h3 className="text-2xl font-bold uppercase tracking-wide group-hover:text-[#3BE798] transition-colors">Eco-Conscious</h3>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed border-l-2 border-gray-800 pl-6 group-hover:border-[#3BE798] transition-colors duration-300">
                                            We believe in fashion that doesn't cost the earth. Our materials are ethically sourced, 100% recyclable, and designed to minimize environmental impact.
                                        </p>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-[#3BE798] font-mono text-sm uppercase tracking-widest border border-[#3BE798] px-2 py-1 rounded">02</span>
                                            <h3 className="text-2xl font-bold uppercase tracking-wide group-hover:text-[#3BE798] transition-colors">Future-Ready</h3>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed border-l-2 border-gray-800 pl-6 group-hover:border-[#3BE798] transition-colors duration-300">
                                            Always ahead of the curve. We combine cutting-edge technology with timeless design principles to create footwear that adapts to the modern world.
                                        </p>
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-[#3BE798] font-mono text-sm uppercase tracking-widest border border-[#3BE798] px-2 py-1 rounded">03</span>
                                            <h3 className="text-2xl font-bold uppercase tracking-wide group-hover:text-[#3BE798] transition-colors">People First</h3>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed border-l-2 border-gray-800 pl-6 group-hover:border-[#3BE798] transition-colors duration-300">
                                            From our artisans to our community, we prioritize fair wages, respect, and inclusivity above all. Great products start with great people.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="px-[5%] py-24 bg-[#1a1a1a] text-center relative overflow-hidden border-t border-gray-800">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">READY TO STEP UP?</h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                                Join the thousands of visionaries who have already made the switch. Experience the future of footwear today.
                            </p>
                            <Link href={route('shop.index')} className="inline-block px-10 py-5 bg-[#3BE798] text-[#1a1a1a] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(59,231,152,0.4)]">
                                Join the Movement
                            </Link>
                        </div>
                    </section>
                </main>

                {/* Footer (Fixed) */}
                <footer className="bg-[#1a1a1a] text-white py-16 border-t border-gray-800">
                    <div className="px-[5%] grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 mb-12">
                        <div className="md:col-span-1">
                            <div className="text-2xl font-black tracking-tighter mb-6 block">FRANCS.</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Redefining sneaker culture with premium design and sustainable innovation. Join the movement.
                            </p>
                            <div className="flex gap-4">
                                {/* Social placeholders */}
                                <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#3BE798] transition-colors"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#3BE798] transition-colors"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#3BE798] transition-colors"></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-[#3BE798] tracking-widest text-sm uppercase">Shop</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('shop.index')} className="hover:text-white transition-colors">All Products</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Best Sellers</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Accessories</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-[#3BE798] tracking-widest text-sm uppercase">Company</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href={route('about')} className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-[#3BE798] tracking-widest text-sm uppercase">Support</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Size Guide</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="px-[5%] pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
                        <p>&copy; 2024 FRANCS. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-white">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white">Terms of Service</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
