import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Store from "./components/Store/MainStore";
import Cart from "./components/Cart/Cart";
import { createContext, useState } from "react";
import SingleProduct from "./components/Store/SingleProduct";

export const CartContext = createContext();

function App() {
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

  const removeItemFromCart = (id) => setCartData(cartData.filter((item) => item.id !== id));

  const handleAdjustProductQuant = (id, quant, action) => {
    if (quant === 1 && action === "decrement") {
      removeItemFromCart(id);
      return;
    }

    const updateData = cartData.map((item) => {
      if (item.id === id) item.quantity += action === "increment" ? 1 : -1;
      return item;
    })

    setCartData(updateData);
  }

  return (
    <>
      {isCartActive && <Cart items = {cartData} onClose={toggleCart} onDeleteItem={removeItemFromCart} onAdjustQuant={handleAdjustProductQuant}/>}
      <Header onOpenCart={toggleCart} />
      <CartContext.Provider value={handleAddItemToCart}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/category/:category" element={<Store />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
