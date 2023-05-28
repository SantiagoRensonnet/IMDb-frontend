import { useState, createContext } from "react";
import { MovieData, PosterMap } from "../types";

//store(context)
export const MoviesContext = createContext({});

export const MoviesProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [movies, setMovies] = useState<Array<MovieData>>([]);
  const [newMoviesPosters, setNewMoviesPosters] = useState<PosterMap>({});
  const [filterByTitleTerm, setFilterByTitleTerm] = useState("");
  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        filterByTitleTerm,
        setFilterByTitleTerm,
        newMoviesPosters,
        setNewMoviesPosters,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
