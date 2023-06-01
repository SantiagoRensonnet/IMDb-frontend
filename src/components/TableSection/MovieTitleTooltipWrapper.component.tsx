import * as Tooltip from "@radix-ui/react-tooltip";
import { useResize } from "../../hooks/useResize.hook";
export const MovieTitleTooltipWrapper = ({
  children,
  movieTitle,
}: {
  children: React.ReactNode;
  movieTitle: string;
}) => {
  const isMobile = useResize();
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        {isMobile && (
          <Tooltip.Portal>
            <Tooltip.Content
              className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-[hsl(210,83%,53%)] select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
              sideOffset={5}
            >
              <div>
                <span className="font-semibold">
                  {movieTitle.split(".")[0]}.{" "}
                </span>
                <span className="">{movieTitle.split(".")[1]}</span>
              </div>
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
