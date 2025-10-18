import { type VoterPercentageBar } from "~/lib/types";
import { cn } from "~/lib/utils";
import { HStack } from "./helpers/helperdivs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./imported/ShadCN/tooltip";

const colors = {
  republican: "bg-gradient-to-l from-red-500 to-red-700",
  independent: "bg-transparent backdrop-blur-md",
  democrat: "bg-gradient-to-r from-blue-500 to-blue-700",
};

export const YayNayBarVisualizer = ({
  bar,
  height = 12,
}: {
  bar: VoterPercentageBar;
  height?: number;
}) => {
  const grandTotal =
    Object.values(bar.yays).reduce((sum, current) => sum + current, 0) +
    Object.values(bar.nays).reduce((sum, current) => sum + current, 0);

  return (
    <HStack className="w-full rounded-full" gap={2}>
      {/* YAYS BAR */}
      <div
        className={cn("flex overflow-hidden rounded-full border border-black")}
        style={{
          height,
          width: `${
            (Object.values(bar.yays).reduce(
              (sum, current) => sum + current,
              0,
            ) /
              grandTotal) *
            100
          }%`,
        }}
      >
        {/* REPUBLICAN BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.republican,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${
                  (bar.yays.republican /
                    Object.values(bar.yays).reduce(
                      (sum, current) => sum + current,
                      0,
                    )) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Republican: {bar.yays.republican} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
        {/* INDEPENDENT BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.independent,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${
                  (bar.yays.independent /
                    Object.values(bar.yays).reduce(
                      (sum, current) => sum + current,
                      0,
                    )) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Independent: {bar.yays.independent} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
        {/* DEMOCRAT BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.democrat,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${
                  (bar.yays.democrat /
                    Object.values(bar.yays).reduce(
                      (sum, current) => sum + current,
                      0,
                    )) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Democrat: {bar.yays.democrat} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* NAYS BAR */}
      <div
        className={cn("flex overflow-hidden rounded-full border border-black")}
        style={{
          height,
          width: `${
            (Object.values(bar.nays).reduce(
              (sum, current) => sum + current,
              0,
            ) /
              grandTotal) *
            100
          }%`,
        }}
      >
        {/* REPUBLICAN BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.republican,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${
                  (bar.nays.republican /
                    Object.values(bar.nays).reduce(
                      (sum, current) => sum + current,
                      0,
                    )) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Republican: {bar.nays.republican} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
        {/* INDEPENDENT BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.independent,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${
                  (bar.nays.independent /
                    Object.values(bar.nays).reduce(
                      (sum, current) => sum + current,
                      0,
                    )) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Independent: {bar.nays.independent} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* DEMOCRAT BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.democrat,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${
                  (bar.nays.democrat /
                    Object.values(bar.nays).reduce(
                      (sum, current) => sum + current,
                      0,
                    )) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Democrat: {bar.nays.democrat} / {grandTotal}{" "}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </HStack>
  );
};

export const SingleBarVisualizer = ({
  bar,
  height = 12,
}: {
  bar: VoterPercentageBar;
  height?: number;
}) => {
  const grandTotal = Object.values(bar.yays).reduce(
    (sum, current) => sum + current,
    0,
  );

  return (
    <HStack className="w-full rounded-full" gap={2}>
      <div
        className={cn(
          "flex w-full overflow-hidden rounded-full border border-black",
        )}
        style={{
          height,
        }}
      >
        {/* REPUBLICAN BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.republican,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${(bar.yays.republican / grandTotal) * 100}%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Republican: {bar.yays.republican} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
        {/* INDEPENDENT BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.independent,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${(bar.yays.independent / grandTotal) * 100}%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Independent: {bar.yays.independent} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
        {/* DEMOCRAT BAR */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                colors.democrat,
                "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
              )}
              style={{
                width: `${(bar.yays.democrat / grandTotal) * 100}%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Democrat: {bar.yays.democrat} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </HStack>
  );
};
