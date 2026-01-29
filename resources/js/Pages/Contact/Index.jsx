import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ContactIndex({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Contact Us" />

            <div className="min-h-screen bg-[#F5F5F7] py-12 font-sans">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Get in Touch</h1>
                        <p className="mt-4 text-lg text-gray-500">We'd love to hear from you. Our team is always here to chat.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* Contact Form */}
                        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-gray-100">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium placeholder:text-gray-400"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium placeholder:text-gray-400"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium placeholder:text-gray-400 resize-none"
                                        placeholder="How can we help?"
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="w-full px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8 mt-4 md:mt-0">
                            <div className="flex items-start gap-5">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Email</h3>
                                    <p className="mt-1 text-gray-500 font-medium">support@francs.com</p>
                                    <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Headquarters</h3>
                                    <p className="mt-1 text-gray-500 font-medium">
                                        123 Innovation Drive<br />
                                        Silicon Valley, CA 94025
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Chat</h3>
                                    <p className="mt-1 text-gray-500 font-medium">Available Mon-Fri, 9am - 5pm PST</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
