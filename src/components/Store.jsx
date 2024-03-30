import { useState } from "react";
import Loader from "./Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchData } from "./utils";

const Store = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const productsQuery = category
        ? `products/category/${category}`
        : "products";
      const products = await fetchData(
        `https://fakestoreapi.com/${productsQuery}`,
      );

      if (categories === null) {
        const categoriesData = await fetchData(
          "https://fakestoreapi.com/products/categories",
        );
        setCategories(categoriesData);
      }
      setProducts(products);
      setIsLoading(false);
    })();
  }, [category]);

  if (products === null) {
    return <Loader />;
  } 
    
  const changeProductCategory = () => {
    setIsLoading(true);
  };

  const greyedStyles = isLoading && "opacity-30";


    return (
      products && (
        <>
          <div className="container max-w-screen-xl py-20 flex gap-10">
            <div className="w-52 shrink-0 leading-5">
              {/* Sidebar */}
              <h2 className="text-xl font-black pb-5">Categories</h2>
              {category && (
                <Link
                  to="/store"
                  className="text-sm font-medium flex items-center gap-x-2 px-3 py-2 border border-red-500 text-red-500 bg-red-50 mb-2"
                  onClick={changeProductCategory}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear Category
                </Link>
              )}
              <ul>
                {categories.map((cat, index) => {
                  return (
                    <li className="mb-2 capitalize" key={index}>
                      <Link to={`/store/category/${cat}`} onClick={changeProductCategory} >{cat}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h1 className="text-5xl mb-8 tracking-tight">
                Unlock <span className="font-extrabold">Innovation</span>, Shop
                Your Future Today!
              </h1>
              <div className={`grid grid-cols-3 gap-5 ${greyedStyles}`}>
                {products.map((product) => {
                  return (
                    <div className="flex flex-col p-5 gap-y-1" key={product.id}>
                      <span className="text-slate-600">{product.category}</span>
                      <p className="font-semibold leading-5">{product.title}</p>
                      <span className="font-medium pt-3">${product.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )
    );
  };

export default Store;
