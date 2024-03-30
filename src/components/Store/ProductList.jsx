import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const loadingStyle = isLoading && "opacity-30";
  return (
    <div className={`grid grid-cols-3 gap-5 ${loadingStyle}`}>
      {products.map((product) => {
        return (
          <Link
            to={`/product/${product.id}`}
            className="flex flex-col p-5 gap-y-1"
            key={product.id}
          >
            <span className="text-slate-600">{product.category}</span>
            <p className="font-semibold leading-5">{product.title}</p>
            <span className="font-medium pt-3">${product.price}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;