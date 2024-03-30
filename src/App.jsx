import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Store from "./components/Store/MainStore";
import Cart from "./components/Cart/Cart";
import SingleProduct from "./components/Store/SingleProduct";
import { useCart } from "./components/Cart/CartContext";

function App() {
  const cartContext = useCart();

  return (
    <>
      {cartContext.isCartActive && (
        <Cart
          items={cartContext.cartData}
          onAdjustQuant={cartContext.handleAdjustProductQuant}
          onDeleteItem={cartContext.handleRemoveItemFromCart}
          onClose={cartContext.toggleCart}
        />
      )}
      <Header onOpenCart={cartContext.toggleCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/category/:category" element={<Store />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
    </>
  );
}

export default App;
