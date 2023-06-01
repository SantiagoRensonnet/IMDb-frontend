import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useResize } from "../../../hooks/useResize.hook";
export const RowLoader = () => {
  const isMobile = useResize();
  return (
    <tr className="h-28">
      <td className="table-data">
        <div className="h-28 px-2 py-2 flex flex-col items-center rounded">
          <Skeleton width={64} height={96} containerClassName="flex-1" />
        </div>
      </td>
      {!isMobile && (
        <td className="table-data">
          <div>
            <h3 className="font-medium text-gray-800">
              <Skeleton width={190} />
            </h3>
          </div>
        </td>
      )}
      <td className="table-data">
        <Skeleton width={isMobile ? 80 : 230} />
      </td>
      <td className="table-data">
        <div>
          <h4 className="text-gray-700">
            <Skeleton width={30} />
          </h4>
        </div>
      </td>
      <td className="table-data">
        <div className="flex items-center">
          <Skeleton width={45} containerClassName="flex-1" />
        </div>
      </td>

      <td className="table-data">
        <Skeleton width={85} />
      </td>
    </tr>
  );
};
