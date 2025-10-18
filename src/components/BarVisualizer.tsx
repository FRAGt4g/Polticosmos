import { type VoterPercentageBar } from "~/lib/types";
import { cn } from "~/lib/utils";
import { HStack } from "./helpers/helperdivs";

const colors = {
  republican: "bg-red-500 border-red-900 border-r-2",
  independent: "bg-gray-500 border-gray-900",
  democrat: "bg-blue-500 border-blue-900 border-l-2",
};

const specialStylings = {
  yays: "rounded-l-md rounded-r-sm border-green-500 border-r-none",
  other: "rounded-l-sm rounded-r-md border-gray-500",
  nays: "rounded-l-sm rounded-r-sm border-red-500 border-l-none",
};

const BarVisualizer = ({
  bar,
  height = 12,
}: {
  bar: VoterPercentageBar;
  height?: number;
}) => {
  const grandTotal = Object.values(bar).reduce(
    (sum, current) =>
      sum + Object.values(current).reduce((sum, current) => sum + current, 0),
    0,
  );

  return (
    <HStack className="w-full" gap={0.5}>
      {/* YAYS BAR */}
      <div
        className={cn("bg-muted/20 flex overflow-hidden", specialStylings.yays)}
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
        {/* INDEPENDENT BAR */}
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
        {/* DEMOCRAT BAR */}
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
      </div>

      {/* NAYS BAR */}
      <div
        className={cn(
          "border-border bg-muted/20 flex overflow-hidden border",
          specialStylings.nays,
        )}
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
        {/* INDEPENDENT BAR */}
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
        {/* DEMOCRAT BAR */}
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
      </div>

      {/* OTHER BAR */}
      <div
        className={cn(
          "border-border bg-muted/20 flex overflow-hidden border",
          specialStylings.other,
        )}
        style={{
          height,
          width: `${
            (Object.values(bar.other).reduce(
              (sum, current) => sum + current,
              0,
            ) /
              grandTotal) *
            100
          }%`,
        }}
      >
        {/* REPUBLICAN BAR */}
        <div
          className={cn(
            colors.republican,
            "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
          )}
          style={{
            width: `${
              (bar.other.republican /
                Object.values(bar.yays).reduce(
                  (sum, current) => sum + current,
                  0,
                )) *
              100
            }%`,
          }}
        />
        {/* INDEPENDENT BAR */}
        <div
          className={cn(
            colors.independent,
            "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
          )}
          style={{
            width: `${
              (bar.other.independent /
                Object.values(bar.other).reduce(
                  (sum, current) => sum + current,
                  0,
                )) *
              100
            }%`,
          }}
        />
        {/* DEMOCRAT BAR */}
        <div
          className={cn(
            colors.democrat,
            "flex items-center justify-center text-xs font-medium text-white transition-all hover:opacity-80",
          )}
          style={{
            width: `${
              (bar.other.democrat /
                Object.values(bar.other).reduce(
                  (sum, current) => sum + current,
                  0,
                )) *
              100
            }%`,
          }}
        />
      </div>
    </HStack>
  );
};

export default BarVisualizer;
