//libs
import * as Slider from "@radix-ui/react-slider";
import { useState, useEffect, useContext } from "react";
//types
import { QueryContextType } from "../../types";
import { rangeCategoryType } from "../../types";
//contexts
import { QueryContext } from "../../contexts/query.context";
//hooks
import { useDebounce } from "../../hooks/useDebounce.hook";

export const InputRange = ({
  rangeCategory,
}: {
  rangeCategory: rangeCategoryType;
}) => {
  const [inputValue, setInputValue] = useState(
    rangeCategory === "rating" ? 6 : 90
  );
  const [inputTouched, setInputTouched] = useState(false);
  const categoryRange = useDebounce(inputValue);
  const { setQueryParams } = useContext(QueryContext) as QueryContextType;

  useEffect(() => {
    if (inputTouched) {
      setQueryParams((prevQuery) => {
        switch (rangeCategory) {
          case "rating":
            return { ...prevQuery, rating: inputValue, page: 1 };

          case "runtime":
            return { ...prevQuery, runtime: inputValue, page: 1 };
        }
      });
    }
  }, [categoryRange]);
  return (
    <div>
      <h1 className="text-sm">{rangeCategory}</h1>
      <div className="flex items-center justify-between">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-44 h-5"
          value={[inputValue]}
          onValueChange={(newValue) => {
            setInputTouched(true);
            setInputValue(newValue[0]);
          }}
          max={rangeCategory === "rating" ? 10 : 240}
          step={rangeCategory === "rating" ? 0.1 : 1}
          aria-label="Volume"
        >
          <Slider.Track className="bg-white relative grow rounded-full h-[3px]">
            <Slider.Range
              className={
                rangeCategory === "rating"
                  ? "absolute rounded-full h-full bg-[rgb(245,197,24)]"
                  : "absolute rounded-full h-full bg-[hsl(210,83%,53%)]"
              }
            />
          </Slider.Track>
          <Slider.Thumb className="block w-4 h-4 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-blackA8" />
        </Slider.Root>

        <div
          className={
            rangeCategory === "rating"
              ? "ml-2 w-5 text-sm text-black "
              : "ml-2 text-sm text-[hsl(210,83%,53%)]"
          }
        >
          {inputTouched && <span> {inputValue}</span>}
        </div>
      </div>
    </div>
  );
};
