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
      if (item.sku === newItem.sku) {
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

  const handleRemoveItemFromCart = (sku) =>
    setItems(items.filter((item) => item.sku !== sku));

  const handleAdjustItemQuant = (sku, quant, action) => {
    if (quant === 1 && action === "decrement") {
      handleRemoveItemFromCart(sku);
      return;
    }

    const updateData = items.map((item) => {
      if (item.sku === sku) item.quantity += action === "increment" ? 1 : -1;
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
