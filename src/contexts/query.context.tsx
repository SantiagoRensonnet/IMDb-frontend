//libs
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import useSWR from "swr";
//types
import {
  MovieFetchData,
  MoviesContextType,
  queryParamObject,
  paginationProps,
} from "../types";
//contexts
import { MoviesContext } from "./movies.context";

//Aux functions
const getQueryURL = (params: queryParamObject) => {
  //base list url
  let url =
    `/movies?page=${params.page}&limit=${params.limit}` +
    `&sort_by=${params.sortOrder}(${params.sortBy})`;
  if (params.genre) url += `&genre=${params.genre}`;
  if (params.runtime) url += `&runtime[lte]=${params.runtime}`;
  if (params.rating) url += `&rating[gt]=${params.rating}`;
  return url;
};
//store(context)
export const QueryContext = createContext({});

export const QueryProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { setMovies } = useContext(MoviesContext) as MoviesContextType;
  const [queryParams, setQueryParams] = useState<queryParamObject>({
    sortBy: "rating",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });
  const [paginationProps, setPaginationProps] = useState<paginationProps>({});
  const queryURL = getQueryURL(queryParams);
  const { data, error, isLoading } = useSWR(queryURL, (url: string) =>
    axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    if (!isLoading && data) {
      const paginationResults: paginationProps = {
        limit: data.limit,
        prevPage: data.previousPage,
        currentPage: data.currentPage,
        nextPage: data.nextPage,
      };
      const rawDataArray: MovieFetchData[] = data.result;
      const formattedData =
        rawDataArray.length > 0
          ? rawDataArray.map((rawData, index) => ({
              id: rawData.tconst,
              rating: rawData.averageRating,
              genres: rawData.genres,
              title: `${index + 1 + (data.currentPage - 1) * data.limit}. ${
                rawData.primaryTitle
              }`,
              runtime: rawData.runtimeMinutes,
              year: rawData.startYear,
            }))
          : [];

      setMovies(formattedData);
      setPaginationProps(paginationResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);
  return (
    <QueryContext.Provider
      value={{ queryParams, setQueryParams, paginationProps, isLoading }}
    >
      {children}
    </QueryContext.Provider>
  );
};
