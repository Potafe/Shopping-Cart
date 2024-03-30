import { useState } from "react";
import Loader from "../Loader";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchData } from "../utils";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

const Store = () => {
  const { category } = useParams();
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const currentPage = searchParams?.get("page") || 1;
  const currentCategoryId = category || "abcat0712000";

  useEffect(() => {
    (async () => {
      const pageSize = 18;
      const itemsResponse = await fetchData(
        `https://api.bestbuy.com/v1/products(categoryPath.id=${currentCategoryId})?apiKey=PGbnJ286dtgKoN2oypkGpTep&sort=customerReviewCount.desc&show=categoryPath.id,categoryPath.name,customerReviewAverage,customerReviewCount,image,name,onSale,percentSavings,regularPrice,salePrice,shortDescription,sku&pageSize=${pageSize}&page=${currentPage}&format=json`,
      );

      console.log(itemsResponse);

      if (categories === null) {
        const categoriesRes = await fetchData(
          `https://api.bestbuy.com/v1/categories(id=pcmcat1591132221892)?apiKey=PGbnJ286dtgKoN2oypkGpTep&format=json`,
        );
        const categoriesData = categoriesRes.categories[0].subCategories;
        console.log(categoriesData);
        setCategories(categoriesData);
      }
      setIsLoading(false);
      setItems(itemsResponse);
    })();
  }, [currentCategoryId, currentPage]);

  const handleItemsChange = () => {
    setIsLoading(true);
  };

  if (categories === null) {
    return <Loader />;
  }

  return (
    <>
      <div className="h-80 bg-store-banner -mt-20 bg-no-repeat bg-cover">
        <div className="bg-black/30 w-full h-full flex items-end">
          <div className="container max-w-[1400px] mx-auto text-right">
            <h1 className="font-headings text-white text-6xl font-extrabold tracking-tight text-right">
              GAMING STORE
            </h1>
          </div>
        </div>
      </div>

      <div className="relative grow">
        <div className="container max-w-screen-xl flex relative">
          <Sidebar
            currCategory={category}
            categories={categories}
            onCategoryChange={handleItemsChange}
          />
          <ProductList
            isLoading={isLoading}
            totalItems={items.total}
            items={items.products}
            currentPage={+currentPage}
            totalPages={+items.totalPages}
            onPageChange={handleItemsChange}
          />
        </div>
      </div>
    </>
  );
};

export default Store;
