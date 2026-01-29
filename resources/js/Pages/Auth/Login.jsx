import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showEmailForm, setShowEmailForm] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-6">
                <a
                    href={route('auth.google')}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-3 py-4 text-base font-bold text-gray-900 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus-visible:ring-transparent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M12.0003 24.0001C6.54574 24.0001 2.00028 20.0157 1.0912 14.8291H12.0003V9.81824H22.3639C22.6803 10.9637 22.9094 12.0546 22.9094 13.091C22.9094 20.1274 18.1639 24.0001 12.0003 24.0001Z"
                            fill="#34A853"
                        />
                        <path
                            d="M22.3639 9.81824C22.2185 9.22915 22.0185 8.65642 21.7821 8.11096H12.0003V14.8291H17.8912C17.6185 16.2291 16.8185 17.411 15.7094 18.1474L19.2548 20.8928C21.3276 18.9837 22.5276 16.0837 22.3639 9.81824Z"
                            fill="#4A90E2"
                        />
                        <path
                            d="M10.8 19.8927L14.3454 22.6381C12.4363 24.0018 9.98177 24.4199 7.74540 23.5472C3.41813 21.8563 1.07267 17.2018 2.76359 12.8745C3.12722 11.9654 3.65450 11.129 4.30904 10.4018L7.14540 13.2381C6.20017 14.4927 6.05452 16.22 6.78174 17.6563C7.50901 19.0927 9.20008 19.729 10.8 19.8927Z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12.0003 4.74542C14.2548 4.74542 16.2912 5.5636 17.8548 6.90906L21.4912 3.27269C18.9821 0.927242 15.5821 -0.272758 12.0003 0.0908785C6.98210 0.290879 2.58209 3.52724 0.909363 8.18179L4.30936 11.0182C5.23664 7.38183 8.30936 4.74542 12.0003 4.74542Z"
                            fill="#EA4335"
                        />
                    </svg>
                    <span className="text-sm font-bold">Sign in with Google</span>
                </a>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                <Link
                    href={route('register')}
                    className="text-sm text-gray-500 hover:text-[#1a1a1a] font-medium transition-colors"
                >
                    Don't have an account? <span className="text-[#1a1a1a] font-bold underline">Register</span>
                </Link>
            </div>
        </GuestLayout>
    );
}
