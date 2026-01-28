import { Head, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import PixelTransition from '@/Components/PixelTransition';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome({ auth }) {
    const [cartCount, setCartCount] = useState(0);
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const innovationRef = useRef(null);
    const heroRef = useRef(null);

    // Initial Hero Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Background Text
            tl.from(".hero-bg-text", {
                opacity: 0,
                scale: 1.2,
                duration: 1.5,
                ease: "power2.out"
            })
                // Main Shoe Image
                .from(".hero-shoe", {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=1.0")
                // Text Content Stagger
                .from([".hero-title", ".hero-subtitle", ".hero-cta"], {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }, "-=0.8")
                // Floating Cards Pop
                .from(".hero-stat-card", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=0.5");

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Scroll Trigger Animation for Innovation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".innovation-card", {
                scrollTrigger: {
                    trigger: innovationRef.current,
                    start: "top 80%",
                    duration: 1,
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, innovationRef);

        return () => ctx.revert();
    }, []);

    const featuredRef = useRef(null);
    // Scroll Trigger Animation for Featured Collections
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".featured-card", {
                scrollTrigger: {
                    trigger: featuredRef.current,
                    start: "top 80%",
                    duration: 1,
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, featuredRef);

        return () => ctx.revert();
    }, []);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
        setIsCartAnimating(true);
        setTimeout(() => setIsCartAnimating(false), 200);
    };

    return (
        <>
            <Head title="FRANCS | Earth Series" />
            <div className="font-sans text-[#1a1a1a] bg-white min-h-screen overflow-x-hidden">

                {/* Navbar */}
                <nav className="flex justify-between items-center px-[5%] py-6 sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-[#e5e5e5]">
                    <div className="text-xl font-extrabold tracking-tighter">FRANCS</div>
                    <ul className="hidden md:flex gap-10 font-medium text-sm uppercase tracking-wider">
                        <li><Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
                        <li><Link href={route('shop.index')} className="hover:text-accent transition-colors duration-300">Store</Link></li>
                        <li><Link href={route('about')} className="hover:text-accent transition-colors duration-300">About</Link></li>
                        <li><Link href="#" className="hover:text-accent transition-colors duration-300">Contact</Link></li>
                    </ul>
                    <div className="flex items-center gap-6">
                        <button className="text-[#1a1a1a] hover:text-accent transition-colors" aria-label="Search">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                        <button
                            className={`relative text-[#1a1a1a] hover:text-accent transition-transform duration-200 ${isCartAnimating ? 'scale-125' : 'scale-100'}`}
                            aria-label="Cart"
                        >
                            <Link href={route('shop.index')}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            </Link>
                            <span className="absolute -top-[5px] -right-[8px] bg-accent text-white text-[0.7rem] px-[6px] py-[2px] rounded-full font-bold">
                                {cartCount}
                            </span>
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <header ref={heroRef} className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] px-[5%] items-center bg-white lg:bg-[linear-gradient(to_right,#ffffff_50%,#f8f8f8_50%)] pt-16 lg:pt-0 overflow-visible relative isolate bg-dot-pattern">
                    {/* Decorative Background Text */}
                    <div className="hero-bg-text absolute top-[53%] left-[45%] -translate-x-1/2 -translate-y-1/2 font-black text-[9rem] md:text-[12rem] text-black opacity-50 select-none -z-10 tracking-tighter w-full text-center pointer-events-none whitespace-nowrap">
                        FRANCS
                    </div>

                    <div className="z-10 lg:pr-16 text-center lg:text-left mb-12 lg:mb-0 relative">
                        <span className="hero-title block text-sm font-semibold uppercase tracking-[0.1em] text-[#666666] mb-6">— The 2026 Earth Collection</span>
                        <h1 className="hero-title text-5xl lg:text-8xl font-black leading-[0.9] text-[#1a1a1a] mb-6 tracking-tight">
                            PERFORMANCE<br />
                            MEETS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#555]">PRECISION.</span>
                        </h1>
                        <p className="hero-subtitle text-[#555] text-lg lg:text-xl mb-8 max-w-lg leading-relaxed font-medium">
                            Born from the ground up. Our new minimalist sneaker combines high-performance recycled materials with timeless Italian craftsmanship.
                        </p>

                        <div className="hero-cta flex flex-col gap-8">
                            <div className="flex items-center gap-6">
                                <Link
                                    href={route('shop.index')}
                                    className="group relative px-8 py-4 bg-[#c85d53] text-white font-bold tracking-wider uppercase overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <span className="relative z-10 transition-colors group-hover:text-white">Shop Collection</span>
                                    <div className="absolute inset-0 bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                                </Link>

                                {/* Rotating Seal */}
                                <div className="relative w-24 h-24 hidden md:flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#1a1a1a]">
                                        <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                        <text fontSize="11" fontWeight="bold" letterSpacing="2">
                                            <textPath href="#curve" fill="currentColor">
                                                • PREMIUM QUALITY • EST 2024
                                            </textPath>
                                        </text>
                                    </svg>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">✨</div>
                                </div>
                            </div>

                            {/* Social Proof */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-[#f26a5f]">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-[#1a1a1a]">4.9/5 Rating</span>
                                    <span className="text-sm text-[#666] border-l border-gray-300 pl-2">Based on 12k+ reviews</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold text-[#555] uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg> Free Shipping</span>
                                    <span className="flex items-center gap-1"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg> 30-Day Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute -bottom-32 left-0 hidden lg:flex items-center gap-3 animate-bounce opacity-50">
                            <div className="h-12 w-[1px] bg-black/20"></div>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-black/40 rotate-90 origin-left translate-y-2">Scroll</span>
                        </div>
                    </div>

                    <div className="h-full flex items-center justify-center relative min-h-[500px] lg:min-h-[auto] z-10">
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-accent/20 rounded-full blur-[100px] opacity-30 -z-10"></div>

                        {/* Floating Spec Cards */}
                        <div className="hero-stat-card absolute top-0 right-4 lg:top-[12%] lg:right-[5%] bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white animate-float z-20">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#e8fce8] rounded-full text-[#00b862]">🍃</div>
                                <div>
                                    <div className="text-xs font-bold text-[#888] uppercase tracking-wider">Weight</div>
                                    <div className="text-base font-bold text-[#1a1a1a]">242g Light</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-stat-card absolute bottom-10 left-4 lg:bottom-[18%] lg:left-[5%] bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white animate-float-delayed z-20">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-full text-blue-500">🛡️</div>
                                <div>
                                    <div className="text-xs font-bold text-[#888] uppercase tracking-wider">Durability</div>
                                    <div className="text-base font-bold text-[#1a1a1a]">Grade-A</div>
                                </div>
                            </div>
                        </div>

                        <img
                            src="/images/shoe3.png"
                            alt="Francs 2026 Earth Edition"
                            className="hero-shoe relative w-[85%] max-w-[500px] lg:max-w-[800px] lg:w-[95%] -rotate-[25deg] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] z-10 transition-transform duration-700 hover:scale-105 hover:-rotate-[22deg]"
                        />
                    </div>
                </header>

                {/* Features Bar */}
                <section className="flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-0 px-[5%] py-12 bg-[#fafafa] border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">🍃</span>
                        <div className="flex flex-col">
                            <strong className="text-sm font-bold uppercase">Lightweight</strong>
                            <span className="text-xs text-[#666666]">Under 250g</span>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-[#e5e5e5]"></div>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">🛡️</span>
                        <div className="flex flex-col">
                            <strong className="text-sm font-bold uppercase">Durable</strong>
                            <span className="text-xs text-[#666666]">Grade-A Leather</span>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-[#e5e5e5]"></div>
                    <div className="flex items-center gap-4">
                        <span className="text-2xl">♻️</span>
                        <div className="flex flex-col">
                            <strong className="text-sm font-bold uppercase">Sustainable</strong>
                            <span className="text-xs text-[#666666]">100% Recycled Sole</span>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                {/* Marquee Section */}
                <section className="py-32 overflow-x-hidden bg-white">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-[#2B2B2B]">GALLERY</h2>
                        <p className="text-[#666666]">Explore the collection in motion.</p>
                    </div>

                    {/* Image Marquee (Scroll Left) */}
                    <div className="flex relative pause-on-hover mb-20">
                        <div className="flex animate-scroll-left gap-8 min-w-full pl-8">
                            {/* Duplicate content for seamless loop */}
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex gap-8 shrink-0">
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <div key={num} className="w-[300px] h-[300px] bg-[#f5f5f5] rounded-3xl flex items-center justify-center p-8 hover:scale-105 transition-transform duration-300">
                                            <img
                                                src={`/images/shoe${num}.png`}
                                                alt={`Shoe ${num}`}
                                                className="w-full drop-shadow-xl -rotate-12"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Brand Marquee (Scroll Right) */}
                    <div className="flex relative pause-on-hover bg-black py-8 transform -rotate-2 scale-110 origin-center w-[110%] -ml-[5%] shadow-2xl">
                        <div className="flex animate-scroll-right gap-20 min-w-full items-center">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-20 shrink-0 text-7xl font-black text-transparent stroke-text tracking-tighter select-none leading-tight" style={{ WebkitTextStroke: '2px #444', color: 'transparent' }}>
                                    <span className="hover:text-[#3BE798] hover:stroke-0 transition-colors duration-300 cursor-default" style={{ WebkitTextStroke: '0px', color: 'white' }}>FRANCS</span>
                                    <span className="hover:text-white transition-colors duration-300 cursor-default">NIKE</span>
                                    <span className="hover:text-white transition-colors duration-300 cursor-default">ADIDAS</span>
                                    <span className="hover:text-white transition-colors duration-300 cursor-default">PUMA</span>
                                    <span className="hover:text-white transition-colors duration-300 cursor-default">REEBOK</span>
                                    <span className="hover:text-white transition-colors duration-300 cursor-default">NEW BALANCE</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Collections (Scrollable Cards) */}
                <section ref={featuredRef} className="px-[5%] py-24 bg-[#f8f8f8]">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-4xl font-extrabold tracking-tight text-[#2B2B2B] leading-none">FEATURED<br />COLLECTIONS</h2>
                        <Link href={route('shop.index')} className="font-bold border-b-2 border-black pb-0.5 hover:text-[#3BE798] hover:border-[#3BE798] transition-all">
                            View All Collections
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Best Sellers */}
                        <div className="featured-card group relative h-[450px] bg-white rounded-[30px] p-8 overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#3BE798] rounded-full translate-x-1/3 -translate-y-1/3 opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="relative z-20">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Collection</span>
                                    <h3 className="text-3xl font-extrabold text-[#2B2B2B] mt-2">BEST SELLERS</h3>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                    <img src="/images/shoe1.png" alt="Best Sellers" className="w-[45%] lg:w-[50%] max-w-none -rotate-[25deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl" />
                                </div>
                                <button className="self-start px-6 py-3 rounded-full bg-[#2B2B2B] text-white font-bold text-sm group-hover:bg-[#3BE798] group-hover:text-[#2B2B2B] transition-colors shadow-lg z-20 relative">
                                    Shop Now
                                </button>
                            </div>
                        </div>

                        {/* New Arrivals */}
                        <div className="featured-card group relative h-[450px] bg-[#2B2B2B] rounded-[30px] p-8 overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl">
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white rounded-full -translate-x-1/3 translate-y-1/3 opacity-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="relative z-20">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Fresh Drops</span>
                                    <h3 className="text-3xl font-extrabold text-white mt-2">NEW ARRIVALS</h3>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                    <img src="/images/shoe2.png" alt="New Arrivals" className="w-[45%] lg:w-[50%] max-w-none rotate-[15deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl" />
                                </div>
                                <button className="self-start px-6 py-3 rounded-full bg-white text-[#2B2B2B] font-bold text-sm group-hover:bg-[#3BE798] group-hover:text-[#2B2B2B] transition-colors shadow-lg z-20 relative">
                                    Explore
                                </button>
                            </div>
                        </div>

                        {/* Limited Edition */}
                        <div className="featured-card group relative h-[450px] bg-white rounded-[30px] p-8 overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl">
                            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#f26a5f] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="relative z-20">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Exclusive</span>
                                    <h3 className="text-3xl font-extrabold text-[#2B2B2B] mt-2">LIMITED EDITION</h3>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                    <img src="/images/shoe3.png" alt="Limited Edition" className="w-[45%] lg:w-[50%] max-w-none -rotate-[15deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl" />
                                </div>
                                <button className="self-start px-6 py-3 rounded-full bg-[#2B2B2B] text-white font-bold text-sm group-hover:bg-[#3BE798] group-hover:text-[#2B2B2B] transition-colors shadow-lg z-20 relative">
                                    Get Access
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Innovation Section */}
                <section ref={innovationRef} className="px-[5%] py-24 bg-[#f8f8f8]">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-accent tracking-widest uppercase">Why Francs?</span>
                        <h2 className="text-4xl font-extrabold text-[#1a1a1a] mt-2">OUR INNOVATION</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="innovation-card bg-white p-12 rounded-[40px] border border-black/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl group min-h-[550px] flex flex-col justify-between">
                            <div>
                                <div className="w-24 h-24 bg-[#e8fce8] rounded-3xl flex items-center justify-center text-[#00b862] mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><path d="M14 2v6h6" /><path d="M10 20v-5.5" /><path d="M10 18.5a3.5 3.5 0 0 0 3.5-3.5v-.5" /><path d="M10 18.5a3.5 3.5 0 0 1-3.5-3.5v-.5" /></svg>
                                </div>
                                <h3 className="text-3xl font-extrabold text-[#1a1a1a] mb-6">Sustainable Future</h3>
                                <div className="space-y-4">
                                    <p className="text-[#555] text-lg leading-relaxed">
                                        Crafted from 100% recycled ocean plastics and ethically sourced organic cotton, reducing our footprint without compromising style.
                                    </p>
                                    <p className="text-[#888] text-base font-medium leading-relaxed">
                                        Our zero-waste manufacturing process ensures that every scrap of material is repurposed, creating a closed-loop system that honors the planet.
                                    </p>
                                </div>
                            </div>
                            <div className="w-12 h-1 bg-[#00b862] mt-8 rounded-full opacity-20 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        {/* Feature 2: Cloud Comfort */}
                        <div className="innovation-card bg-white p-12 rounded-[40px] border border-black/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl group min-h-[550px] flex flex-col justify-between">
                            <div>
                                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-1.7-1.3-3-3-3h-11a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v1" /><path d="M17.5 19a3 3 0 0 0 3 3v0a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3" /></svg>
                                </div>
                                <h3 className="text-3xl font-extrabold text-[#1a1a1a] mb-6">Cloud Comfort</h3>
                                <div className="space-y-4">
                                    <p className="text-[#555] text-lg leading-relaxed">
                                        Proprietary multi-layer air cushioning system that adapts to your every step, providing all-day weightless support.
                                    </p>
                                    <p className="text-[#888] text-base font-medium leading-relaxed">
                                        Engineered with high-rebound foam technology that returns energy with every stride, keeping you moving forward with less fatigue.
                                    </p>
                                </div>
                            </div>
                            <div className="w-12 h-1 bg-blue-500 mt-8 rounded-full opacity-20 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        {/* Feature 3: Precision Fit */}
                        <div className="innovation-card bg-white p-12 rounded-[40px] border border-black/5 hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl group min-h-[550px] flex flex-col justify-between">
                            <div>
                                <div className="w-24 h-24 bg-purple-50 rounded-3xl flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                                </div>
                                <h3 className="text-3xl font-extrabold text-[#1a1a1a] mb-6">Precision Fit</h3>
                                <div className="space-y-4">
                                    <p className="text-[#555] text-lg leading-relaxed">
                                        Adaptive 3D-knit upper technology that seamlessly molds to the unique shape of your foot for a custom, locked-in feel.
                                    </p>
                                    <p className="text-[#888] text-base font-medium leading-relaxed">
                                        Developed using data from over 10,000 foot scans to create a universal fit that completely eliminates pressure points and slipping.
                                    </p>
                                </div>
                            </div>
                            <div className="w-12 h-1 bg-purple-500 mt-8 rounded-full opacity-20 group-hover:opacity-100 group-hover:w-24 transition-all duration-500"></div>
                        </div>
                    </div>
                </section>

                {/* Brand Story / Large CTA */}
                <section className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3BE798] rounded-full blur-[150px] opacity-10 translate-x-1/3 -translate-y-1/3"></div>
                    <div className="px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <span className="text-[#3BE798] font-bold tracking-widest uppercase mb-4 block">The Philosophy</span>
                            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
                                WALK YOUR <br />
                                <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>OWN PATH</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
                                We believe style is a language. Every stitch, every curve, every color tells a story of who you are and where you're going. Don't just follow trends—set them.
                            </p>
                            <div className="flex gap-6">
                                <Link href={route('about')} className="px-8 py-4 bg-[#3BE798] text-[#1a1a1a] rounded-full font-bold hover:bg-white transition-colors shadow-[0_10px_20px_rgba(59,231,152,0.3)]">
                                    Our Story
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-[500px] w-full bg-[#222] rounded-[40px] overflow-hidden border border-white/10 group flex items-center justify-center">
                            <div className="w-[500px] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <PixelTransition
                                    firstContent={<img src="/images/shoe6.png" className="w-full h-full object-contain -rotate-[20deg] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-90" />}
                                    secondContent={<img src="/images/shoe5.png" className="w-full h-full object-contain -rotate-[20deg] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-90" />}
                                    gridSize={12}
                                    pixelColor="#222222"
                                    animationStepDuration={0.15}
                                    aspectRatio="0"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                                <div className="text-sm font-bold text-[#888] uppercase tracking-widest">Featured Model</div>
                                <div className="text-2xl font-bold text-white">Quantum Leap v9</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1a1a1a] text-white py-16">
                    <div className="px-[5%] grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-12">
                        <div className="md:col-span-1">
                            <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block">FRANCS.</Link>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Redefining sneaker culture with premium design and sustainable innovation. Join the movement.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">SHOP</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-[#3BE798] transition">New Arrivals</Link></li>
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Best Sellers</Link></li>
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Men</Link></li>
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Women</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">SUPPORT</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Returns & Exchanges</Link></li>
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Shipping Info</Link></li>
                                <li><Link href="#" className="hover:text-[#3BE798] transition">Track Order</Link></li>
                            </ul>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="px-[5%] flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                        <p>&copy; 2026 FRANCS. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
