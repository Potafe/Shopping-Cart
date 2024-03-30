import { useState } from "react";
import Loader from "../Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

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
 
    
  const handleCategoryChange = () => {
    setIsLoading(true);
  };

  if (products === null) {
    return <Loader />;
  }

    return (
      products && (
        <>
          <div className="container max-w-screen-xl py-20 flex gap-10">
            <Sidebar currentCategory = {category} categories = {categories} onCategoryChange = {handleCategoryChange} />
            <div>
              <h1 className="text-5xl mb-8 tracking-tight">
                Unlock <span className="font-extrabold">Innovation</span>, Shop
                Your Future Today!
              </h1>
              <ProductList isLoading = {isLoading} products = {products} />
            </div>
          </div>
        </>
      )
    );
  };

export default Store;
