import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, Link, usePage } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=1a1a1a&color=fff&bold=true`;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12 bg-[#F5F5F7] min-h-screen font-sans text-[#1a1a1a]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-10 text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Profile Settings</h1>
                        <p className="mt-2 text-md text-gray-500">Manage your personal account details.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* LEFT COLUMN: Profile Details (Read Only) */}
                        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-gray-50 to-gray-100"></div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 bg-white">
                                    <img
                                        src={avatarUrl}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Customer</span>
                                </div>
                            </div>

                            <div className="mt-10 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                    <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 rounded-xl border border-gray-200/60 text-gray-700 font-medium select-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        {user.name}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                    <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 rounded-xl border border-gray-200/60 text-gray-700 font-medium select-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        {user.email}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Security Role</label>
                                    <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 rounded-xl border border-gray-200/60 text-gray-700 font-medium select-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                        Authenticated User via Google
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Account Actions */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Account Actions</h3>

                                <div className="space-y-4">
                                    <a
                                        href="https://myaccount.google.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full px-5 py-4 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors border border-blue-100/50"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Manage Google Account
                                    </a>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center justify-center gap-3 w-full px-5 py-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors border border-red-100/50"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                        Sign Out
                                    </Link>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
