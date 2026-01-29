import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // FIX: Removed unused 'useRef' import if I use inline component, but actually I need to move it outside or use a proper component.
// Wait, I will use a separate component definition inside the file to keep it clean.
import { useRef, useEffect, useState } from 'react';

// Separated TiltCard component for better performance isolation
const TiltCard = ({ children, className }) => {
    const cardRef = useRef(null);
    const frameId = useRef(null);

    const handleMouseMove = (e) => {
        // Optimization: Throttle events using requestAnimationFrame
        if (frameId.current) return;

        const card = cardRef.current;
        if (!card) return;

        frameId.current = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            // Calculate relative position
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to small angles for subtle effect (e.g., +/- 4 deg)
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            frameId.current = null;
        });
    };

    const handleMouseLeave = () => {
        if (frameId.current) {
            cancelAnimationFrame(frameId.current);
            frameId.current = null;
        }
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }} // Optimization: hint to browser
        >
            {children}
        </div>
    );
};

export default function Dashboard({ auth, recentOrders, stats }) {
    const user = auth.user;
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800 uppercase tracking-widest">
                    My Account
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Background Decorations (Optimized: Static Opacity instead of Animation) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#3BE798]/10 rounded-full blur-[120px] mix-blend-multiply opacity-50"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
            </div>

            <div className="relative z-10 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-10">

                    {/* Hero Section */}
                    {/* Optimization: Reduced blur radius slightly if needed, but keeping xl for aesthetics if GPU handles it. removed heavy shadow transition on scroll */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-8 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)]">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3BE798] to-gray-900">{user.name.split(' ')[0]}</span>.
                            </h1>
                            <p className="text-lg text-gray-500 font-medium max-w-xl leading-relaxed">
                                You've got some heat in your rotation. Check your latest pickups and stats below.
                            </p>
                            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-gray-900 rounded-full shadow-xl">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BE798] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3BE798]"></span>
                                </span>
                                <span className="font-mono text-base font-bold text-white tracking-widest">
                                    {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                <span className="h-4 w-px bg-gray-700"></span>
                                <span className="text-xs font-bold text-gray-400 tracking-wider">SYSTEM</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link href={route('shop.index')} className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-900/20 hover:-translate-y-1">
                                Shop New Drops
                            </Link>
                            <Link href={route('profile.edit')} className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                                Settings
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid with Optimized Tilt Interaction */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stats Card 1 */}
                        <TiltCard className="bg-white/70 backdrop-blur-lg border border-white/60 p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-default transition-transform duration-100 ease-out">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</h4>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                </div>
                            </div>
                            <div className="text-4xl font-black text-gray-900">{stats.total_orders}</div>
                            <p className="text-sm text-gray-400 font-bold mt-2">Successful drops</p>
                        </TiltCard>

                        {/* Stats Card 2 */}
                        <TiltCard className="bg-white/70 backdrop-blur-lg border border-white/60 p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-default transition-transform duration-100 ease-out">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Spent</h4>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                                    {/* Wallet Icon (Generic Money) */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
                                </div>
                            </div>
                            {/* Uses Indian Rupee Symbol */}
                            <div className="text-4xl font-black text-gray-900">₹{stats.total_spent}</div>
                            <p className="text-sm text-gray-400 font-bold mt-2">Invested in fresh kicks</p>
                        </TiltCard>

                        {/* Stats Card 3 */}
                        <TiltCard className="bg-white/70 backdrop-blur-lg border border-white/60 p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-default transition-transform duration-100 ease-out">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Items Copped</h4>
                                <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.9 19.8l.2-1.1L22 17.3c.6-2.5-.9-5.1-3.5-5.7l-4.2-1c.6-1.5.3-3.2-.8-4.4L8.8 1.4C7.7.3 6 .1 4.7.7l-3.3 1.5c-1.3.6-1.9 2-1.3 3.3l4.7 9.8c.8 1.7 2.8 2.4 4.5 1.6l1.2-.6 2.3 5c.6 1.3 2 2 3.3 1.4l4.7-2.1c.1 0 .1-.1.1-.2zM5.5 11.1L2.2 4.3 5.5 2.7l3.3 6.9-3.3 1.5zm8.3 7.6l-2.3-5 3.3-1.6 2.3 5-3.3 1.6z"></path></svg>
                                </div>
                            </div>
                            <div className="text-4xl font-black text-gray-900">{stats.total_items}</div>
                            <p className="text-sm text-gray-400 font-bold mt-2">Grid pairs secured</p>
                        </TiltCard>
                    </div>

                    {/* Recent Orders Table (Glass Style) */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Activity</h3>
                            <Link href="#" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                View Full History
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100/50">
                                        <th className="px-8 py-5">Order ID</th>
                                        <th className="px-8 py-5">Date</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Total</th>
                                        <th className="px-8 py-5 text-right">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100/50">
                                    {recentOrders && recentOrders.length > 0 ? (
                                        recentOrders.map((order) => (
                                            <tr key={order.id} className="group hover:bg-white/50 transition-colors">
                                                <td className="px-8 py-5 font-bold text-gray-900">
                                                    {order.reference}
                                                </td>
                                                <td className="px-8 py-5 text-sm font-medium text-gray-500">
                                                    {order.date}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${order.status === 'Completed' ? 'bg-[#3BE798]/10 text-emerald-800 ring-[#3BE798]/30' :
                                                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                                            'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                {/* Uses Indian Rupee Symbol */}
                                                <td className="px-8 py-5 text-right font-black text-gray-900">
                                                    ₹{order.total}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <a href={order.view_url} className="text-gray-400 group-hover:text-gray-900 font-bold transition-colors">
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-16 text-center text-gray-500 font-medium">
                                                No orders found. <Link href={route('shop.index')} className="text-gray-900 underline decoration-2 hover:decoration-gray-500 transition-all">Start your collection</Link> today.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
