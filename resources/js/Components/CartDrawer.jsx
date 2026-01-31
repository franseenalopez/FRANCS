import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, usePage, router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import toast from 'react-hot-toast';

export default function CartDrawer() {
    const { isDrawerOpen, closeDrawer } = useCart();
    const { cart } = usePage().props;

    // Convert cart object to array if needed (session stores as assoc array usually)
    const cartItems = Object.values(cart || {});
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const removeItem = (id) => {
        router.delete(`/cart/${id}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Item removed')
        });
    };

    return (
        <Transition.Root show={isDrawerOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={closeDrawer}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping cart ({cartItems.length})
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={closeDrawer}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <i className="fa-solid fa-xmark text-xl"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    {cartItems.length === 0 ? (
                                                        <div className="text-center py-10">
                                                            <i className="fa-solid fa-basket-shopping text-6xl text-gray-200 mb-4"></i>
                                                            <p className="text-gray-500">Your cart is empty.</p>
                                                            <button
                                                                onClick={closeDrawer}
                                                                className="mt-4 text-accent font-bold hover:underline"
                                                            >
                                                                Continue Shopping
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {cartItems.map((product) => (
                                                                <li key={product.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={product.image ? `/storage/${product.image}` : `/images/shoe${(product.id % 6) + 1}.png`}
                                                                            alt={product.name}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    {product.name}
                                                                                </h3>
                                                                                <p className="ml-4">₹{(product.price * product.quantity).toLocaleString()}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.category_name || 'Sneaker'}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Qty {product.quantity}</p>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => removeItem(product.id)}
                                                                                    className="font-medium text-[#f26a5f] hover:text-red-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {cartItems.length > 0 && (
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Sub Total</p>
                                                    <p>₹{total.toLocaleString()}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/checkout" // Placeholder for now
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-[#1a1a1a] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black transition-colors"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-accent hover:text-green-500"
                                                            onClick={closeDrawer}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
