import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children, initialItems }) {
  const [isCartActive, setIsCartActive] = useState(false);
  const [items, setItems] = useState(initialItems ?? []);

  const toggleCart = () => setIsCartActive(!isCartActive);

  const handleAddItemToCart = (newItem) => {
    let isItemInCart = false;
    const modifiedData = items.map((item) => {
      if (item.id === newItem.id) {
        isItemInCart = true;
        item.quantity += 1;
      }
      return item;
    });

    if (isItemInCart) setItems(modifiedData);
    else {
      newItem.quantity = 1;
      setItems([newItem, ...items]);
    }
  };

  const handleRemoveItemFromCart = (id) =>
    setItems(items.filter((item) => item.id !== id));

  const handleAdjustItemQuant = (id, quant, action) => {
    if (quant === 1 && action === "decrement") {
      handleRemoveItemFromCart(id);
      return;
    }

    const updateData = items.map((item) => {
      if (item.id === id) item.quantity += action === "increment" ? 1 : -1;
      return item;
    });

    setItems(updateData);
  };

  const providerValues = {
    isCartActive,
    toggleCart,
    items,
    handleAddItemToCart,
    handleAdjustItemQuant,
    handleRemoveItemFromCart,
  };

  return (
    <CartContext.Provider value={providerValues}>
      {children}
    </CartContext.Provider>
  );
}

export { useCart, CartProvider };
