import { AxiosResponse } from "axios";
export type MovieFetchData = {
  __v: number;
  _id: string;
  averageRating: number;
  endYear: number;
  genres: string[];
  isAdult: number;
  numVotes: number;
  originalTitle: string;
  primaryTitle: string;
  runtimeMinutes: number;
  startYear: number;
  tconst: string;
  titleType: string;
  posterPath?: string;
};
export type MovieData = {
  mongoId: string;
  id: string;
  rating: number;
  genres: string[];
  title: string;
  runtime: number;
  year: number;
  posterPath: string;
};
export type sortByType = "rating" | "title" | "year" | "runtime";
export type sortOrderType = "asc" | "desc";
export type rangeCategoryType = "rating" | "runtime";

export type queryParamObject = {
  sortBy: sortByType;
  sortOrder: sortOrderType;
  page: number;
  limit: 10 | 100 | 250;
  genre?: string;
  title?: string;
  rating?: number;
  runtime?: number;
};
export type paginationProps = {
  limit?: number;
  prevPage?: number | null;
  currentPage?: number;
  nextPage?: number | null;
};

export interface PosterObject {
  mongoId: string;
  posterURL: string;
}
export interface PosterMap {
  [key: string]: PosterObject;
}

interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SearchResult {
  movie_results: MovieResult[];
  person_results: unknown[];
  tv_results: unknown[];
  tv_episode_results: unknown[];
  tv_season_results: unknown[];
}
export type PendingPoster = {
  id: string;
  mongoId: string;
  posterURL: Promise<AxiosResponse<SearchResult, unknown>>;
};
export type QueryContextType = {
  queryParams: queryParamObject;
  setQueryParams: React.Dispatch<React.SetStateAction<queryParamObject>>;
  paginationProps: paginationProps;
  isDbLoading: boolean;
};
export type MoviesContextType = {
  movies: Array<MovieData>;
  setMovies: React.Dispatch<React.SetStateAction<Array<MovieData>>>;
  newMoviesPosters: PosterMap;
  setNewMoviesPosters: React.Dispatch<React.SetStateAction<PosterMap>>;
  filterByTitleTerm: string;
  setFilterByTitleTerm: React.Dispatch<React.SetStateAction<string>>;
};
export enum genreEnum {
  "",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
}
export type debounceValueType = string | number;
