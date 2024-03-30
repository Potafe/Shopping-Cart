import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Store from "./components/Store/MainStore";
import Cart from "./components/Cart";
import { useState } from "react";
import SingleProduct from "./components/Store/SingleProduct";

function App() {
  const [isCartActive, setIsCartActive] = useState(false);

  const toggleCart = () => setIsCartActive(!isCartActive);

  return (
    <>
      {isCartActive && <Cart onClose={toggleCart} />}
      <Header onOpenCart={toggleCart} />
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
