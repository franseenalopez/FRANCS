import Navbar from '@/Components/Navbar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-[#1a1a1a]">
            {/* Custom Navbar */}
            <Navbar auth={auth} />

            {/* Content Wrapper */}
            <div className="pt-24 pb-12">
                {/* Page Header */}
                {header && (
                    <header className="mx-auto max-w-[90%] md:max-w-[70%] max-w-[900px] mb-8">
                        {header}
                    </header>
                )}

                {/* Main Content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
