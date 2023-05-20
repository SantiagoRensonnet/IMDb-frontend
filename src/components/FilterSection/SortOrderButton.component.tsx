//libs
import { useState, useContext } from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
//types
import { QueryContextType } from "../../types";
//context
import { QueryContext } from "../../contexts/query.context";

export const SortOrderButton = () => {
  const { queryParams, setQueryParams } = useContext(
    QueryContext
  ) as QueryContextType;
  const [btnOrder, setBtnOrder] = useState(queryParams.sortOrder);

  const toggleOrder = (order: string) => (order === "desc" ? "asc" : "desc");
  const handleOrderChange = () => {
    setBtnOrder((prevBtnOrder) => toggleOrder(prevBtnOrder));
    setQueryParams((prevState) => ({
      ...prevState,
      sortOrder: toggleOrder(prevState.sortOrder),
      page: 1,
    }));
  };
  return (
    <button
      className="btn btn-secondary grow flex items-center justify-center"
      onClick={handleOrderChange}
    >
      {btnOrder === "desc" ? (
        <HiSortDescending size={18} />
      ) : (
        <HiSortAscending size={18} />
      )}
    </button>
  );
};
