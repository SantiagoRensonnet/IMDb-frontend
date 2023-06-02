import {
  queryParamObject,
  MovieData,
  PendingPoster,
  PosterObject,
  PosterMap,
} from "../../types";
import axios from "axios";

const BASE_API_URL = "https://imdbapp-service.onrender.com/movies";
// const BASE_DEV_URL = "/movies";

export const getQueryURL = (params: queryParamObject) => {
  //base list url
  let url =
    `${BASE_API_URL}?page=${params.page}&limit=${params.limit}` +
    `&sort_by=${params.sortOrder}(${params.sortBy})`;
  if (params.genre) url += `&genre=${params.genre}`;
  if (params.runtime) url += `&runtime[lte]=${params.runtime}`;
  if (params.rating) url += `&rating[gt]=${params.rating}`;
  return url;
};
export const createMoviePosterPromiseArray = (dataArray: MovieData[]) => {
  const promises: PendingPoster[] = [];
  for (const data of dataArray) {
    if (!data.posterURL) {
      promises.push({
        id: data.id,
        mongoId: data.mongoId,
        posterURL: axios.get(
          `https://api.themoviedb.org/3/find/${data.id}?api_key=d76c5df85f84510c22bbc25e156327ce&external_source=imdb_id`
        ),
      });
    }
  }

  const promiseArray = Promise.allSettled(promises);

  return promiseArray;
};

export const getMoviePosters = (
  promiseArray: Promise<PromiseSettledResult<PendingPoster>[]>
) => {
  const posterMap = new Map<string, PosterObject>();

  promiseArray.then((resultArray) => {
    resultArray.forEach((result) => {
      if (result.status === "fulfilled") {
        result.value.posterURL.then((res) => {
          const posterValue =
            "https://image.tmdb.org/t/p/original" +
            res.data.movie_results[0].poster_path;

          const key = result.value.id;
          posterMap.set(key, {
            mongoId: result.value.mongoId,
            posterURL: posterValue,
          });
        });
      }
    });
  });

  return posterMap;
};

export const updateDb = (reqBody: PosterMap) => {
  const putUrl = "https://imdbapp-service.onrender.com/update-posters";

  axios.put(putUrl, reqBody).then((res) => res);
};
