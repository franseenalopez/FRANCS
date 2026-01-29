import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CartIndex({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Your Cart" />

            <div className="min-h-screen bg-[#F5F5F7] py-12 font-sans">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Your Cart</h1>

                    <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-12 text-center border border-gray-100">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Looks like you haven't added anything to your cart yet.
                                    Explore our fresh drops and find your perfect pair.
                                </p>
                            </div>

                            <Link
                                href={route('shop.index')}
                                className="mt-4 px-8 py-3 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-black hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
