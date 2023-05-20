//components
import { TableSection } from "./components/TableSection/TableSection.component";
import { FilterSection } from "./components/FilterSection/FilterSection.component";
import { PaginationSection } from "./components/PaginationSection/PaginationSection.component";
function App() {
  return (
    <>
      <main className="min-h-screen flex flex-col gap-4 items-center justify-start bg-stone-200 xl:px-4">
        <FilterSection />
        <PaginationSection />
        <TableSection />
      </main>
      {/* <PaginationSection /> */}
    </>
  );
}

export default App;
