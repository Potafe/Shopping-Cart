import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Store from "./components/Store/MainStore";
import Cart from "./components/Cart/Cart";
import SingleProduct from "./components/Store/SingleProduct";
import { useCart } from "./components/Cart/CartContext";

function App() {
  const { isCartActive, toggleCart } = useCart();

  return (
    <>
      {isCartActive && <Cart />}
      <Routes>
        <Route path="/*" element={<Header onOpenCart={toggleCart} />} />
        <Route
          path="/store/*"
          element={<Header onOpenCart={toggleCart} hasImageBelow={true} />}
        />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />}>
        <Route path="/store/category/:category" element={<Store />} />	          
        <Route index />
          <Route path="category/:category" />
        </Route>
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;
