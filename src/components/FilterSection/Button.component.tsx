import { sortByType } from "../../types";
export const Button = ({
  sortProp,
  isActive,
  setActiveBtn,
}: {
  sortProp: sortByType;
  isActive: boolean;
  setActiveBtn: (sortProp: sortByType) => void;
}) => {
  return (
    <button
      className={"btn " + (isActive ? "btn-primary" : "btn-secondary")}
      onClick={() => setActiveBtn(sortProp)}
    >
      {sortProp}
    </button>
  );
};
