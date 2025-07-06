import { useState } from "react";
import { CartContext } from "./CartContext"; // <- Use that context here

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
}