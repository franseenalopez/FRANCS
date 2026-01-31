import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <CartContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
