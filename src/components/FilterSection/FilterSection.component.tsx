//components
import { TableTitle } from "./TableTitle.component";
import { ButtonArray } from "./ButtonArray.component";
import { GenreSelect } from "./GenreSelect.component";
import { SearchBar } from "./SearchBar.component";
import { InputRange } from "./InputRange.component";

export const FilterSection = () => {
  return (
    <section className="container mt-4 sm:grid sm:grid-cols-2 sm:gap-4 px-4">
      <section>
        <TableTitle />
        <ButtonArray />
        <article className="mt-2 px-1 flex flex-wrap justify-between">
          <InputRange rangeCategory="runtime" />
          <InputRange rangeCategory="rating" />
        </article>
      </section>
      <section className="sm:flex sm:flex-col sm:justify-start sm:gap-y-2">
        <GenreSelect />
        <SearchBar />
      </section>
    </section>
  );
};
