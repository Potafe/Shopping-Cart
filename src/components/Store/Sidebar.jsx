import { Link } from "react-router-dom";

const Sidebar = ({ currentCategory, categories, onCategoryChange }) => {
  return (
    <div className="w-52 shrink-0 leading-5">
      {/* Sidebar */}
      <h2 className="text-xl font-black pb-5">Categories</h2>
      {currentCategory && (
        <Link
          to="/store"
          className="text-sm font-medium flex items-center gap-x-2 px-3 py-2 border border-red-500 text-red-500 bg-red-50 mb-2"
          onClick={onCategoryChange}
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
              <Link to={`/store/category/${cat}`} onClick={onCategoryChange}>
                {cat}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
