import { type RepReference, type VoteReference } from "~/lib/types";
import { cn, getRepFromReference, getVoteResolution } from "~/lib/utils";
import { HStack, VStack } from "./helpers/helperdivs";
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
  reference,
  height = 12,
}: {
  reference: VoteReference;
  height?: number;
}) => {
  const bar = getVoteResolution(reference);

  const grandTotal = bar.yea_count + bar.nay_count;

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
                    (bar.yeas.filter(
                      (yea) => getRepFromReference(yea).party === "R",
                    ).length /
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
                  bar.yeas.filter(
                    (yea) => getRepFromReference(yea).party === "R",
                  ).length
                }{" "}
                / {grandTotal}
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
                    (bar.yeas.filter(
                      (yea) => getRepFromReference(yea).party === "I",
                    ).length /
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
                  bar.yeas.filter(
                    (yea) => getRepFromReference(yea).party === "I",
                  ).length
                }{" "}
                / {grandTotal}
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
                    (bar.yeas.filter(
                      (yea) => getRepFromReference(yea).party === "D",
                    ).length /
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
                  bar.yeas.filter(
                    (yea) => getRepFromReference(yea).party === "D",
                  ).length
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
                    (bar.nays.filter(
                      (nay) => getRepFromReference(nay).party === "R",
                    ).length /
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
                  bar.nays.filter(
                    (nay) => getRepFromReference(nay).party === "R",
                  ).length
                }{" "}
                / {grandTotal}
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
                    (bar.nays.filter(
                      (nay) => getRepFromReference(nay).party === "I",
                    ).length /
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
                  bar.nays.filter(
                    (nay) => getRepFromReference(nay).party === "I",
                  ).length
                }{" "}
                / {grandTotal}
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
                    (bar.nays.filter(
                      (nay) => getRepFromReference(nay).party === "D",
                    ).length /
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
                  bar.nays.filter(
                    (nay) => getRepFromReference(nay).party === "D",
                  ).length
                }{" "}
                / {grandTotal}
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
                width: `${
                  (cosponsors.filter(
                    (cosponsor) => getRepFromReference(cosponsor).party === "R",
                  ).length /
                    grandTotal) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Republican:{" "}
              {
                cosponsors.filter(
                  (cosponsor) => getRepFromReference(cosponsor).party === "R",
                ).length
              }{" "}
              / {grandTotal}
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
                  (cosponsors.filter(
                    (yea) => getRepFromReference(yea).party === "I",
                  ).length /
                    grandTotal) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Independent:{" "}
              {
                cosponsors.filter(
                  (cosponsor) => getRepFromReference(cosponsor).party === "I",
                ).length
              }{" "}
              / {grandTotal}
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
                  (cosponsors.filter(
                    (yea) => getRepFromReference(yea).party === "D",
                  ).length /
                    grandTotal) *
                  100
                }%`,
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Democrat:{" "}
              {
                cosponsors.filter(
                  (cosponsor) => getRepFromReference(cosponsor).party === "D",
                ).length
              }{" "}
              / {grandTotal}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </HStack>
  );
};
