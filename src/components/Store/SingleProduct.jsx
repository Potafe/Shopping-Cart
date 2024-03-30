import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";
import Loader from "../Loader";
import { CartContext } from "../../App";

const SingleProduct = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const onAddToCart = useContext(CartContext);

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
      <button type="button" className="py-3 px-5 bg-red-700 text-white" onClick={() => onAddToCart(data)}>
        Add to Cart
      </button>
    </>
  );
};

export default SingleProduct;
