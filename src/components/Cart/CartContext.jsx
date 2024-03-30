import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function useCart() { 
    return useContext(CartContext); 
}

function CartProvider({ children }) {
    const [isCartActive, setIsCartActive] = useState(false);
    const [cartData, setCartData] = useState([]);

    const toggleCart = () => setIsCartActive(!isCartActive);

    const handleAddItemToCart = (newItem) => {
        let isItemInCart = false;
        const modifiedData = cartData.map((item) => {
        if (item.id === newItem.id) {
            isItemInCart = true;
            item.quantity += 1;
        }
        return item;
        });

        if (isItemInCart) setCartData(modifiedData);

        else {
        newItem.quantity = 1;
        setCartData([newItem, ...cartData]);
        }
    }

    const handleRemoveItemFromCart = (id) => setCartData(cartData.filter((item) => item.id !== id));

    const handleAdjustProductQuant = (id, quant, action) => {
        if (quant === 1 && action === "decrement") {
        handleRemoveItemFromCart(id);
        return;
        }

        const updateData = cartData.map((item) => {
        if (item.id === id) item.quantity += action === "increment" ? 1 : -1;
        return item;
        })

        setCartData(updateData);
    }

    const providerValues = {
        isCartActive,
        toggleCart,
        cartData,
        handleAddItemToCart,
        handleAdjustProductQuant,
        handleRemoveItemFromCart,
    };

    return <CartContext.Provider value={providerValues}>{children}</CartContext.Provider>;
}

export { useCart, CartProvider }