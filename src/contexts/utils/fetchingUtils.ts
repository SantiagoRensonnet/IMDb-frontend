import { queryParamObject, MovieData } from "../../types";
import axios from "axios";

export const getQueryURL = (params: queryParamObject) => {
  //base list url
  let url =
    `https://imdbapp.adaptable.app/movies?page=${params.page}&limit=${params.limit}` +
    `&sort_by=${params.sortOrder}(${params.sortBy})`;
  if (params.genre) url += `&genre=${params.genre}`;
  if (params.runtime) url += `&runtime[lte]=${params.runtime}`;
  if (params.rating) url += `&rating[gt]=${params.rating}`;
  return url;
};
export const createMoviePosterPromiseArray = (dataArray: MovieData[]) => {
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
};
export const getMoviePosters = async (
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

interface URLMap {
  [key: string]: string;
}
export const updateDb = async (inputMap: Map<string, string>) => {
  if (inputMap.size > 0) {
    const keys = inputMap.keys();
    const posterNewUrlsMap: URLMap = {};
    for (const key of keys) {
      const value = inputMap.get(key);
      if (value) posterNewUrlsMap[key] = value;
    }
    console.log(posterNewUrlsMap);

    const res = await axios.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      posterNewUrlsMap
    );
    console.log(res);
  }
};
