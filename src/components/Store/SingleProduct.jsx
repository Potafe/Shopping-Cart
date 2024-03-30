import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";
import Loader from "../Loader";
import { useCart } from "../Cart/CartContext";

const SingleProduct = () => {
    const cartContext = useCart();
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const products = await fetchData(
        `https://fakestoreapi.com/products/${id}`,
      );
      setData(products);
    })();
  }, [id]);

  if (data === null) {
    return <Loader />;
  }

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <button type="button" className="py-3 px-5 bg-red-700 text-white" onClick={() => cartContext.handleAddItemToCart(data)}>
        Add to Cart
      </button>
    </>
  );
};

export default SingleProduct;
