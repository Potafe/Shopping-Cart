import { useLocation, Link } from "react-router-dom";
import { isNumber } from "./utils";

const createRange = (startingNum, length) =>
  Array.from({ length }, (_, i) => startingNum + i);

function createPagination(currPage, totalPages, siblings = 3) {
  if (![currPage, totalPages, siblings].every((n) => isNumber(n) && n > 0))
    throw new Error("All parameters must be numbers and greater than zero");

  const DOTS = "...";

  if (currPage - siblings <= 2) {
    return currPage + siblings + 1 >= totalPages
      ? createRange(1, totalPages)
      : [...createRange(1, currPage + siblings), DOTS, totalPages];
  }

  const startingPage = currPage - siblings;
  if (currPage >= totalPages - (siblings + 1)) {
    const len = totalPages - startingPage + 1;
    return [1, DOTS, ...createRange(startingPage, len)];
  } else {
    const len = siblings * 2 + 1;
    return [1, DOTS, ...createRange(startingPage, len), DOTS, totalPages];
  }
}

function Pagination({ currPage, totalPages, siblings, onPageChange }) {
  const location = useLocation();

  const pages = createPagination(currPage, totalPages, siblings);

  return (
    <nav className="mt-20 flex items-center gap-8 justify-center font-semibold">
      {pages.map((page, i) => {
        if (page === "...") return <span key={i}>···</span>;

        return currPage !== page ? (
          <Link
            key={i}
            to={`${location.pathname}?page=${page}`}
            className="p-2 transition-colors ease-in-out hover:text-slate-400"
            onClick={onPageChange}
          >
            {page}
          </Link>
        ) : (
          <span
            key={i}
            className="text-slate-400 border border-slate-400 rounded-full w-10 h-10 flex justify-center items-center"
          >
            {page}
          </span>
        );
      })}
    </nav>
  );
}

export { createPagination, Pagination };
