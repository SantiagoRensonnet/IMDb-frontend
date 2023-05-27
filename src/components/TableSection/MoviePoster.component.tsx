import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/movies.context";
import { MoviesContextType } from "../../types";

export const MoviePoster = ({
  id,
  movieTitle,
  moviePoster,
}: {
  id: string;
  movieTitle: string;
  moviePoster: string;
}) => {
  const { newMoviesPosters } = useContext(MoviesContext) as MoviesContextType;
  const posterPath = moviePoster || newMoviesPosters.get(id);

  return posterPath ? (
    <img
      className="rounded h-full object-cover"
      src={posterPath}
      alt={`${movieTitle}-poster`}
    />
  ) : (
    <Skeleton width={64} height={96} containerClassName="flex-1" />
  );
};
