//libs
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import useSWR from "swr";
//types
import {
  MovieFetchData,
  MovieData,
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
    `https://imdbapp.adaptable.app/movies?page=${params.page}&limit=${params.limit}` +
    `&sort_by=${params.sortOrder}(${params.sortBy})`;
  if (params.genre) url += `&genre=${params.genre}`;
  if (params.runtime) url += `&runtime[lte]=${params.runtime}`;
  if (params.rating) url += `&rating[gt]=${params.rating}`;
  return url;
};
function createMoviePosterPromiseArray(dataArray: MovieData[]) {
  const promises: Promise<Response>[] = [];
  for (const data of dataArray) {
    if (!data.posterPath) {
      promises.push(
        fetch(
          `https://api.themoviedb.org/3/find/${data.id}?api_key=d76c5df85f84510c22bbc25e156327ce&external_source=imdb_id`
        )
      );
    }
  }

  const promiseArray = Promise.allSettled(promises);

  return promiseArray;
}
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
    const getResults = async (
      promiseArray: Promise<PromiseSettledResult<Response>[]>
    ) => {
      const resultArray = await promiseArray;

      const promiseValuesArrayMap = Promise.allSettled(
        resultArray.map((result) => {
          if (result.status === "fulfilled") {
            const aux = new Map();
            const match = result.value.url.match(/tt(\d+)/);
            const key = match ? match[0] : "";
            const value = result.value.json();
            aux.set(key, value);
            return aux;
          }
        })
      );

      const resPromiseValuesArray = await promiseValuesArrayMap;

      const dataArrayMap = resPromiseValuesArray.map(
        (data) => data.status === "fulfilled" && data.value
      );

      const responseObjectMap = new Map();
      for (const dataMap of dataArrayMap) {
        if (dataMap) {
          const validKeys = dataMap.keys(); //Map size is 1
          if (validKeys) {
            for (const key of validKeys) {
              responseObjectMap.set(key, await dataMap.get(key));
            }
          }
        }
      }
      const posterMap = new Map();
      responseObjectMap.forEach((value, key) => {
        const newValue =
          value.movie_results &&
          value.movie_results[0] &&
          value.movie_results[0].poster_path
            ? "https://image.tmdb.org/t/p/original" +
              value.movie_results[0].poster_path
            : "";
        posterMap.set(key, newValue);
      });

      return posterMap;
    };
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
        getResults(moviePosterPromiseArray).then((dataMap) =>
          setNewMoviesPosters(dataMap)
        );
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
