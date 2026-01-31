import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const isRegister = typeof window !== 'undefined' ? window.location.pathname.includes('register') : false;

    return (
        <div className="grid min-h-screen lg:grid-cols-2 font-sans">
            {/* Floating Glass Navbar */}
            {/* Back Button - Updated Layout */}
            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-white/40 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 text-sm font-bold text-[#1a1a1a] group"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1">
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                </svg>
                Back
            </Link>

            {/* Left Side: Form */}
            <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-white relative pt-32">
                <div className="mx-auto w-full max-w-sm lg:w-96 animate-fade-in-up">
                    <div className="mb-10">
                        <h2 className="text-4xl font-black tracking-tight text-[#1a1a1a]">
                            {isRegister ? 'Create an Account' : 'Welcome Back.'}
                        </h2>
                        <p className="mt-3 text-base text-gray-500 font-medium">
                            {isRegister ? 'Sign up to get started.' : 'Please enter your details.'}
                        </p>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right Side: Visual */}
            <div className="relative hidden lg:flex flex-col items-center justify-center bg-[#EAEAEA] overflow-hidden">
                {/* Background Text */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] xl:text-[10rem] font-black leading-none select-none pointer-events-none tracking-tighter z-0 whitespace-nowrap text-gray-400"
                >
                    ELEGANT
                </div>

                {/* Visual Elements */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="absolute w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse"></div>
                    <img
                        src="/images/shoe1.png"
                        alt="Francs Shoe"
                        className="relative z-10 w-[80%] max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-float transform hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-12 right-12 bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 max-w-xs z-20 animate-float-delayed">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-accent">
                            {[1, 2, 3, 4, 5].map(i => (
                                <svg key={i} width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-[#1a1a1a]">4.9 Rating</span>
                    </div>
                    <p className="text-sm font-bold text-[#1a1a1a] italic">"The most comfortable sneaker regarding sustainability."</p>
                    <div className="mt-3 flex items-center gap-2 opacity-60">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black">Vogue Magazine</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
