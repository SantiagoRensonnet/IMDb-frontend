//libs
import { useContext } from "react";
//types
import { QueryContext } from "../../contexts/query.context";
//contexts
import { QueryContextType } from "../../types";

export const PaginationSection = () => {
  const { paginationProps, setQueryParams } = useContext(
    QueryContext
  ) as QueryContextType;

  return (
    <section className="sm:flex sm:justify-center">
      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
        <button
          disabled={paginationProps.prevPage === null}
          className={
            paginationProps.prevPage === null
              ? "pagination-btn cursor-not-allowed text-gray-500"
              : "pagination-btn hover:bg-gray-100"
          }
          onClick={() => {
            setQueryParams((prevState) => ({
              ...prevState,
              page: prevState.page - 1,
            }));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>previous</span>
        </button>

        <button
          disabled={paginationProps.nextPage === null}
          className={
            paginationProps.nextPage === null
              ? "pagination-btn cursor-not-allowed text-gray-500"
              : "pagination-btn hover:bg-gray-100"
          }
          onClick={() => {
            setQueryParams((prevState) => ({
              ...prevState,
              page: prevState.page + 1,
            }));
          }}
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
