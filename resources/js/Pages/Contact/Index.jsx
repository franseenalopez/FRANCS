import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactIndex({ auth }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // List of known disposable/temporary email domains
    const disposableEmailDomains = [
        'mailinator.com', 'tempmail.com', 'temp-mail.org', 'guerrillamail.com', 'guerrillamail.org',
        '10minutemail.com', '10minutemail.net', 'throwaway.email', 'throwawaymail.com', 'fakeinbox.com',
        'tempinbox.com', 'trash-mail.com', 'trashmail.com', 'trashmail.net', 'yopmail.com', 'yopmail.fr',
        'maildrop.cc', 'mailnesia.com', 'mailcatch.com', 'dispostable.com', 'getairmail.com',
        'getnada.com', 'mohmal.com', 'emailondeck.com', 'burnermail.io', 'tempail.com',
        'sharklasers.com', 'spam4.me', 'spamgourmet.com', 'mytemp.email', 'temp.email',
        'tempr.email', 'mailsac.com', 'inboxkitten.com', 'minute-inbox.com', 'fakemail.net',
        'fakemailgenerator.com', 'disposableemailaddresses.com', 'mailnull.com', 'antispam.de',
        'spamfree24.org', 'spamfree24.de', 'spamfree24.eu', 'spamfree24.info', 'spamfree24.net',
        'wegwerfemail.de', 'einrot.de', 'spoofmail.de', 'meltmail.com', 'spamobox.com',
        'spambox.us', 'spambox.xyz', 'mailexpire.com', 'tempmailer.com', 'instantemailaddress.com',
        'emailtemporar.ro', 'fakemail.fr', 'jetable.org', 'nwldx.com', 'mailforspam.com',
        'crazymailing.com', 'tempsky.com', 'tempomail.fr', 'throwam.com', 'vomoto.com',
        'mailhazard.com', 'mailhazard.us', 'mailpick.biz', 'tmails.net', 'anonymbox.com',
        'superrito.com', 'cuvox.de', 'dayrep.com', 'einrot.com', 'fleckens.hu',
        'gustr.com', 'jourrapide.com', 'rhyta.com', 'teleworm.us', 'armyspy.com',
        '20email.eu', '20mail.eu', '33mail.com', 'drdrb.com', 'emlhub.com',
        'emlpro.com', 'emltmp.com', 'fakemailgenerator.net', 'generator.email', 'getfreemail.info',
        'mail-temp.com', 'mail-temporaire.fr', 'mailtemp.info', 'momentmail.com', 'mt2009.com',
        'mt2014.com', 'tempinbox.co.uk', 'tmpmail.net', 'tmpmail.org', 'tempmailaddress.com',
        'example.com', 'test.com', 'mailtest.com'
    ];

    // Validate email format and block disposable emails
    const validateEmail = (email) => {
        const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicEmailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }

        const domain = email.split('@')[1].toLowerCase();

        // Check against disposable email domains
        if (disposableEmailDomains.includes(domain)) {
            return { valid: false, message: 'Disposable/temporary emails are not allowed. Please use a permanent email.' };
        }

        // Check for suspicious patterns in domain
        const suspiciousPatterns = ['temp', 'fake', 'trash', 'spam', 'disposable', 'throwaway', 'guerrilla', 'mailinator'];
        for (const pattern of suspiciousPatterns) {
            if (domain.includes(pattern)) {
                return { valid: false, message: 'This email domain appears to be temporary. Please use a permanent email.' };
            }
        }

        // Check for valid domain extensions
        const validDomainRegex = /\.(com|net|org|edu|gov|io|co|dev|app|me|info|biz|tech|online|site|store|shop|live|pro|ai|cloud|design|uk|us|ca|au|in|de|fr|es|it|nl|be|ch|at|jp|cn|kr|sg|hk|tw|my|ph|id|th|vn|nz|za|br|mx|ar|cl|co\.uk|co\.in|com\.au|com\.br)$/i;

        if (!validDomainRegex.test(email)) {
            return { valid: false, message: 'Invalid email domain. Please use a valid email address.' };
        }

        return { valid: true };
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate name
        if (!formData.name.trim()) {
            toast.error('Please enter your name', { duration: 3000 });
            return;
        }

        if (formData.name.trim().length < 2) {
            toast.error('Name must be at least 2 characters', { duration: 3000 });
            return;
        }

        // Validate email
        if (!formData.email.trim()) {
            toast.error('Please enter your email address', { duration: 3000 });
            return;
        }

        const emailValidation = validateEmail(formData.email.trim());
        if (!emailValidation.valid) {
            toast.error(emailValidation.message, { duration: 3000 });
            return;
        }

        // Validate message
        if (!formData.message.trim()) {
            toast.error('Please enter your message', { duration: 3000 });
            return;
        }

        if (formData.message.trim().length < 10) {
            toast.error('Message must be at least 10 characters', { duration: 3000 });
            return;
        }

        // Simulate form submission
        setIsSubmitting(true);

        // Simulate API call delay
        setTimeout(() => {
            toast.success('Message sent successfully! We\'ll get back to you soon.', { duration: 4000 });
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };

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
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium placeholder:text-gray-400"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium placeholder:text-gray-400"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all font-medium placeholder:text-gray-400 resize-none"
                                        placeholder="How can we help?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
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
