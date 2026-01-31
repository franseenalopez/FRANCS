import { Link, router } from '@inertiajs/react';

import { useCart } from '@/Contexts/CartContext';
import toast from 'react-hot-toast';

export default function ShopCard({ product }) {
    const { openDrawer } = useCart();

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        router.post('/cart', {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Added ${product.name} to cart`, { duration: 2000 });
                openDrawer();
            }
        });
    };

    // Helper to determine card class
    const getCardClass = (prod) => {
        let classes = 'card';
        if (prod.stock <= 0) {
            classes += '-out';
        } else {
            if (prod.id % 3 === 0) classes += '-new';
            else if (prod.id % 2 === 0) classes += '-seller';
            else classes += '-new';
        }
        return classes;
    };

    return (
        <Link href={route('shop.show', product.id)} className="block hover:no-underline w-full max-w-[320px]">
            <div className={getCardClass(product)}>
                <div className="basicInfo">
                    <div className="title">
                        <div className="category">
                            {product.category?.name || 'Francs'}
                        </div>
                        <div className="name">{product.name}</div>
                    </div>

                    <div className="colors">
                        <div className="ellipse" style={{ background: '#3BE798' }}></div>
                        <div className="ellipse" style={{ background: '#2B2B2B' }}></div>
                    </div>

                    <div className="images">
                        <div className="img">
                            {product.image ? (
                                <img src={`/storage/${product.image}`} alt={product.name} />
                            ) : (
                                <img
                                    src={`/images/shoe${(product.id % 6) + 1}.png`}
                                    alt="Shoe"
                                />
                            )}
                        </div>
                    </div>

                </div>
                <button
                    className="addCard"
                    onClick={addToCart}
                    type="button"
                >
                    <i className={product.stock <= 0 ? "fa-solid fa-ban" : "fa-solid fa-basket-shopping"}></i>
                </button>
                <div className="mores">
                    <div className="stars flex gap-1 items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className="fa-solid fa-star text-yellow-400 text-[0.7rem]"
                            ></i>
                        ))}
                    </div>
                    <div className="price">₹{parseFloat(product.price).toFixed(2)}</div>
                </div>
            </div>
        </Link>
    );
}
