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
//utils
import {
  getQueryURL,
  createMoviePosterPromiseArray,
  getMoviePosters,
  updateDb,
} from "./utils/fetchingUtils";
//store(context)
export const QueryContext = createContext({});

export const QueryProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { setMovies, setNewMoviesPosters } = useContext(
    MoviesContext
  ) as MoviesContextType;
  const [queryParams, setQueryParams] = useState<queryParamObject>({
    sortBy: "rating",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });
  const [paginationProps, setPaginationProps] = useState<paginationProps>({});
  const queryURL = getQueryURL(queryParams);
  const { data: dbData, isLoading: isDbLoading } = useSWR(
    queryURL,
    (url: string) => axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    if (!isDbLoading && dbData) {
      const paginationResults: paginationProps = {
        limit: dbData.limit,
        prevPage: dbData.previousPage,
        currentPage: dbData.currentPage,
        nextPage: dbData.nextPage,
      };
      const rawDataArray: MovieFetchData[] = dbData.result;

      const formattedData =
        rawDataArray.length > 0
          ? rawDataArray.map((rawData, index) => ({
              id: rawData.tconst,
              rating: rawData.averageRating,
              genres: rawData.genres,
              title: `${index + 1 + (dbData.currentPage - 1) * dbData.limit}. ${
                rawData.primaryTitle
              }`,
              runtime: rawData.runtimeMinutes,
              year: rawData.startYear,
              posterPath: rawData.posterPath || "",
            }))
          : [];
      const moviePosterPromiseArray =
        createMoviePosterPromiseArray(formattedData);

      setMovies(formattedData);
      setPaginationProps(paginationResults);
      if (moviePosterPromiseArray) {
        getMoviePosters(moviePosterPromiseArray).then((dataMap) => {
          setNewMoviesPosters(dataMap);
          updateDb(dataMap);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbData, isDbLoading]);
  return (
    <QueryContext.Provider
      value={{ queryParams, setQueryParams, paginationProps, isDbLoading }}
    >
      {children}
    </QueryContext.Provider>
  );
};
