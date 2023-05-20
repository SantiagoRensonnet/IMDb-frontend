import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useResize } from "../../hooks/useResize.hook";
export const MoviePoster = ({
  id,
  movieTitle,
}: {
  id: string;
  movieTitle: string;
}) => {
  const isMobile = useResize();
  const [posterPath, setPosterPath] = useState("");
  const findIMDbMovieEndpoint = `https://api.themoviedb.org/3/find/${id}?api_key=d76c5df85f84510c22bbc25e156327ce&external_source=imdb_id`;
  const {
    data: posterData,
    error,
    isLoading: isPosterLoading,
  } = useSWR(findIMDbMovieEndpoint, (url: string) =>
    axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    if (isPosterLoading === false) {
      const result = posterData.movie_results;
      if (result.length > 0) {
        const relativePosterPath = result[0].poster_path;
        setPosterPath(
          "https://image.tmdb.org/t/p/original" + relativePosterPath
        );
      }
    }
  }, [posterData, isPosterLoading]);

  return posterPath && isPosterLoading === false ? (
    <img
      className="rounded h-full object-cover"
      src={posterPath}
      alt={`${movieTitle}-poster`}
    />
  ) : (
    <Skeleton
      width={isMobile ? 25 : 64}
      height={96}
      containerClassName="flex-1"
    />
  );
};
