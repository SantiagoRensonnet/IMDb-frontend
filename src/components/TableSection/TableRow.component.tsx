//libs
import { HiStar } from "react-icons/hi";

//components
import { MovieData } from "../../types";
import { GenrePills } from "./GenrePills/GenrePills.component";
import { MoviePoster } from "./MoviePoster.component";

export const TableRow = ({
  id,
  title,
  genres,
  year,
  rating,
  runtime,
  posterPath,
}: MovieData) => {
  const imDbUrl = `https://www.imdb.com/title/${id}`;

  return (
    <tr className="h-28">
      <td className="table-data">
        <a
          className="h-28 px-2 py-2 flex flex-col items-center rounded"
          href={imDbUrl}
          target="_blank"
        >
          <MoviePoster moviePoster={posterPath} movieTitle={title} id={id} />
        </a>
      </td>

      <td className="table-data">
        <div className="flex">
          <h2 className="font-semibold text-gray-800 mr-1">{`${
            title.split(".")[0]
          }.`}</h2>
          <h3 className="font-medium text-gray-800">{title.split(".")[1]}</h3>
        </div>
      </td>

      <td className="table-data">
        <GenrePills genres={genres} />
      </td>
      <td className="table-data">
        <div>
          <h4 className="text-gray-700">{year}</h4>
        </div>
      </td>
      <td className="table-data">
        <div className="flex items-center">
          <HiStar size={18} color={"rgb(245,197,24)"} />
          <span className="font-semibold">{rating}</span>
        </div>
      </td>

      <td className="table-data text-center sm:text-left">{runtime} minutes</td>
    </tr>
  );
};
