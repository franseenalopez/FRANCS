import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './Contexts/CartContext';
import CartDrawer from './Components/CartDrawer';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ).then((module) => {
            const page = module.default;
            const defaultLayout = page.layout || ((page) => page);

            page.layout = (page) => (
                <CartProvider>
                    {defaultLayout(page)}
                    <CartDrawer />
                    <Toaster
                        position="top-center"
                        containerStyle={{ zIndex: 99999 }}
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#1a1a1a',
                                color: '#fff',
                                fontWeight: 600,
                                padding: '16px 24px',
                                borderRadius: '12px',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#3BE798',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#EF4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </CartProvider>
            );
            return module;
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#3BE798',
        showSpinner: true,
    },
});
