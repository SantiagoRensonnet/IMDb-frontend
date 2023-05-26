import { useResize } from "../../../hooks/useResize.hook";
import { RowLoader } from "./RowLoader.component";
export const TableLoader = ({ limit }: { limit: number }) => {
  const isMobile = useResize();
  const rowMap = [];
  for (let i = 0; i < limit; i++) {
    rowMap.push(i + 1);
  }
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-20">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">
                  <span className="sr-only">Poster</span>
                </th>
                {!isMobile && (
                  <th scope="col" className="table-header">
                    Title
                  </th>
                )}

                <th scope="col" className="table-header">
                  Genre
                </th>

                <th scope="col" className="table-header">
                  Year
                </th>

                <th scope="col" className="table-header">
                  Rating
                </th>

                <th scope="col" className="table-header">
                  Runtime
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rowMap.map((row) => (
                <RowLoader key={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
