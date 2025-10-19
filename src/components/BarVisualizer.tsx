import { type RepReference, type VoteReference } from "~/lib/types";
import { cn } from "~/lib/utils";
import { HStack, VStack } from "./helpers/helperdivs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./imported/ShadCN/tooltip";
import { useCosmosContext } from "./providers/cosmos-provider";

const colors = {
  republican: "bg-gradient-to-l from-red-500 to-red-700",
  independent: "bg-transparent backdrop-blur-md",
  democrat: "bg-gradient-to-r from-blue-500 to-blue-700",
};

export const YayNayBarVisualizer = ({
  reference,
  height = 12,
}: {
  reference: VoteReference;
  height?: number;
}) => {
  const { loadedReps, loadedVotes } = useCosmosContext();
  const bar = loadedVotes[reference];

  if (!bar) {
    return <div>Vote not found</div>;
  }

  const yeas = bar.yeas.map((yea) => loadedReps[yea]!);
  const nays = bar.nays.map((nay) => loadedReps[nay]!);

  const grandTotal = yeas.length + nays.length;

  return (
    <HStack className="w-full rounded-full" gap={2}>
      {/* YAYS BAR */}
      <VStack
        style={{
          width: `${(bar.yea_count / grandTotal) * 100}%`,
        }}
        centered
      >
        <h3 className="text-sm font-medium">Yays</h3>
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
                  width: `${
                    (bar.yeas.filter((yea) => loadedReps[yea]!.party === "R")
                      .length /
                      bar.yea_count) *
                    100
                  }%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Republican:{" "}
                {
                  bar.yeas.filter((yea) => loadedReps[yea]!.party === "R")
                    .length
                }{" "}
                / {bar.yea_count}
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
                    (bar.yeas.filter((yea) => loadedReps[yea]!.party === "I")
                      .length /
                      bar.yea_count) *
                    100
                  }%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Independent:{" "}
                {
                  bar.yeas.filter((yea) => loadedReps[yea]!.party === "I")
                    .length
                }{" "}
                / {bar.yea_count}
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
                    (bar.yeas.filter((yea) => loadedReps[yea]!.party === "D")
                      .length /
                      bar.yea_count) *
                    100
                  }%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Democrat:{" "}
                {
                  bar.yeas.filter((yea) => loadedReps[yea]!.party === "D")
                    .length
                }{" "}
                / {grandTotal}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </VStack>

      {/* NAYS BAR */}
      <VStack
        centered
        style={{
          width: `${(bar.nay_count / grandTotal) * 100}%`,
        }}
      >
        <h3 className="text-sm font-medium">Nays</h3>
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
                  width: `${
                    (bar.nays.filter((nay) => loadedReps[nay]!.party === "R")
                      .length /
                      bar.nay_count) *
                    100
                  }%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Republican:{" "}
                {
                  bar.nays.filter((nay) => loadedReps[nay]!.party === "R")
                    .length
                }{" "}
                / {bar.nay_count}
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
                    (bar.nays.filter((nay) => loadedReps[nay]!.party === "I")
                      .length /
                      bar.nay_count) *
                    100
                  }%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Independent:{" "}
                {
                  bar.nays.filter((nay) => loadedReps[nay]!.party === "I")
                    .length
                }{" "}
                / {bar.nay_count}
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
                    (bar.nays.filter((nay) => loadedReps[nay]!.party === "D")
                      .length /
                      bar.nay_count) *
                    100
                  }%`,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Democrat:{" "}
                {
                  bar.nays.filter((nay) => loadedReps[nay]!.party === "D")
                    .length
                }{" "}
                / {bar.nay_count}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </VStack>
    </HStack>
  );
};

export const SingleBarVisualizer = ({
  cosponsors,
  height = 12,
}: {
  cosponsors: RepReference[];
  height?: number;
}) => {
  const grandTotal = cosponsors.length;
  const { loadedReps } = useCosmosContext();

  if (!loadedReps) {
    return <div>Reps not found</div>;
  }

  const cosponsorsReps = cosponsors.map((cosponsor) => loadedReps[cosponsor]!);

  const republicanCount = cosponsorsReps.filter(
    (cosponsor) => cosponsor.party === "R",
  ).length;
  const independentCount = cosponsorsReps.filter(
    (cosponsor) => cosponsor.party === "I",
  ).length;
  const democratCount = cosponsorsReps.filter(
    (cosponsor) => cosponsor.party === "D",
  ).length;

  console.log(cosponsorsReps, republicanCount, independentCount, democratCount);

  return (
    <HStack
      className="w-full rounded-full"
      xSpacing="between"
      ySpacing="middle"
      gap={2}
    >
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
                width: `${(republicanCount / grandTotal) * 100}%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Republican: {republicanCount} / {grandTotal}
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
                width: `${(independentCount / grandTotal) * 100}%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Independent: {independentCount} / {grandTotal}
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
                width: `${(democratCount / grandTotal) * 100}%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Democrat: {democratCount} / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* <p className="text-muted-foreground text-xs whitespace-nowrap">
        {grandTotal}
      </p> */}
    </HStack>
  );
};
