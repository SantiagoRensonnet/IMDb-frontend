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
  PosterMap,
} from "../types";
//contexts
import { MoviesContext } from "./movies.context";
//utils
import {
  getQueryURL,
  createMoviePosterPromiseArray,
  updateDb,
} from "./utils/fetchingUtils";
//store(context)
export const QueryContext = createContext({});

export const QueryProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { movies, setMovies, newMoviesPosters, setNewMoviesPosters } =
    useContext(MoviesContext) as MoviesContextType;
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
              mongoId: rawData._id,
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

      setMovies(formattedData);
      setPaginationProps(paginationResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbData, isDbLoading]);
  useEffect(() => {
    if (movies.length > 0) {
      const moviePosterPromiseArray = createMoviePosterPromiseArray(movies);

      setNewMoviesPosters({}); //reset posters

      moviePosterPromiseArray.then((resultArray) => {
        resultArray.forEach((result) => {
          if (result.status === "fulfilled") {
            result.value.posterURL.then((res) => {
              const posterValue =
                "https://image.tmdb.org/t/p/original" +
                res.data.movie_results[0].poster_path;

              const key = result.value.id;
              const newObject = {
                mongoId: result.value.mongoId,
                posterURL: posterValue,
              };
              const newMap: PosterMap = {};
              newMap[key] = newObject;

              setNewMoviesPosters((prevState) => {
                return { ...prevState, ...newMap };
              });
            });
          }
        });
      });
    }
  }, [movies, setNewMoviesPosters]);
  useEffect(() => {
    if (Object.keys(newMoviesPosters).length === queryParams.limit) {
      updateDb(newMoviesPosters);
    }
  }, [newMoviesPosters, queryParams]);
  return (
    <QueryContext.Provider
      value={{ queryParams, setQueryParams, paginationProps, isDbLoading }}
    >
      {children}
    </QueryContext.Provider>
  );
};
