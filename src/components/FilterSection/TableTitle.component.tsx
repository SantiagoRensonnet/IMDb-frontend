import { useContext, useState } from "react";
import { QueryContext } from "../../contexts/query.context";
import { QueryContextType } from "../../types";
import { sortByType, sortOrderType } from "../../types";

const mapSortToOption = (sortName: sortByType, sortOrder: sortOrderType) => {
  switch (sortName) {
    case "runtime":
      return sortOrder === "asc" ? "Shortest" : "Longest";

    case "title":
      return sortOrder === "asc" ? "A-Z" : "Z-A";

    case "year":
      return sortOrder === "asc" ? "Oldest" : "Newest";
    default:
      return sortOrder === "asc" ? "Worst" : "Top";
  }
};

export const TableTitle = () => {
  const { queryParams, setQueryParams } = useContext(
    QueryContext
  ) as QueryContextType;
  const [limit, setLimit] = useState(queryParams.limit);
  const optionName = mapSortToOption(queryParams.sortBy, queryParams.sortOrder);

  return (
    <article>
      <div className="flex items-center justify-between px-1">
        <h1 className="text-lg font-medium text-gray-800">Movies</h1>
        <select
          className="px-3 py-1 text-xs  text-[hsl(210,83%,53%)]  bg-[hsl(203,95%,93%)] rounded-full"
          name="top"
          id="top-select"
          value={limit}
          onChange={(e) => {
            switch (parseInt(e.target.value)) {
              case 100:
                setLimit(100);
                setQueryParams((prevQuery) => ({
                  ...prevQuery,
                  limit: 100,
                  page: 1,
                }));
                break;
              case 250:
                setLimit(250);
                setQueryParams((prevQuery) => ({
                  ...prevQuery,
                  limit: 250,
                  page: 1,
                }));
                break;
              default:
                //case 10
                setLimit(10);
                setQueryParams((prevQuery) => ({
                  ...prevQuery,
                  limit: 10,
                  page: 1,
                }));
                break;
            }
          }}
        >
          <option value="10">{optionName} 10</option>
          <option value="100">{optionName} 100</option>
          <option value="250">{optionName} 250</option>
        </select>
      </div>
    </article>
  );
};
