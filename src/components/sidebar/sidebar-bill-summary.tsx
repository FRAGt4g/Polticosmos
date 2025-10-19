import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";
import { useState } from "react";
import ScrollArea from "~/components/helpers/scroll-area-fade";
import {
  type Bill,
  type BillState,
  FutureBillStates,
  HumanReadableBillStates,
  type PartyAffiliation,
  type RepReference,
  type Tag,
} from "~/lib/types";
import { cn, formatBillStatus, parseRepString } from "~/lib/utils";
import { SingleBarVisualizer, YayNayBarVisualizer } from "../BarVisualizer";
import { HStack, VStack } from "../helpers/helperdivs";
import { useCosmosContext } from "../providers/cosmos-provider";

const StatusChip = ({
  status,
  isFuture = false,
}: {
  status: BillState;
  isFuture?: boolean;
}) => {
  return (
    <HStack
      centered
      className={cn(
        "rounded-md px-3 py-1 text-xs font-bold whitespace-nowrap text-white",
        isFuture
          ? "border-muted-foreground/50 border bg-transparent"
          : "bg-green-700",
      )}
    >
      {HumanReadableBillStates[status]}
    </HStack>
  );
};

const TagChip = ({ tag }: { tag: Tag }) => {
  return (
    <HStack
      centered
      className={cn(
        "bg-background/10 border-muted-foreground/50 rounded-md border px-3 py-1 text-xs font-bold whitespace-nowrap text-white backdrop-blur-md",
      )}
    >
      {tag}
    </HStack>
  );
};

const LargeStatusChip = ({ status }: { status: BillState }) => {
  return (
    <HStack
      centered
      className={cn(
        "bg-background/30 text-md rounded-md px-3 py-1 font-bold whitespace-nowrap text-white",
      )}
    >
      {formatBillStatus(status)}
    </HStack>
  );
};

const SponsorsChip = ({ sponsor }: { sponsor: RepReference }) => {
  const { loadedReps } = useCosmosContext();

  const colors: Record<PartyAffiliation, string> = {
    R: "bg-red-500 hover:bg-red-600/90",
    D: "bg-blue-500 hover:bg-blue-600/90",
    I: "bg-transparent backdrop-blur-md hover:bg-transparent/90",
  };

  const rep = loadedReps[sponsor];

  if (!rep) {
    return <div>Rep not found</div>;
  }

  return (
    <HStack
      centered
      className={cn(
        "w-fit rounded-md px-3 py-1 text-xs font-bold text-white",
        colors[rep.party],
      )}
    >
      {parseRepString(rep.name)}
    </HStack>
  );
};

export const BillSidebarSummary = ({ bill }: { bill: Bill }) => {
  const { deselectBill, loadedVotes, loadedCategories } = useCosmosContext();
  console.log(`Bill sidebar summary`, bill, loadedCategories);
  const houseBar = loadedVotes[bill.house_vote];
  const senateBar = loadedVotes[bill.senate_vote];
  const [isOpen, setIsOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const mostRecentState = bill.states[bill.states.length - 1];
  console.log(`Most recent state`, mostRecentState, bill.states);
  const futureStates = (
    FutureBillStates[mostRecentState!] as (_: Bill) => BillState[]
  )(bill) as unknown as BillState[];
  console.log(`Future states`, futureStates);

  return (
    <VStack
      xSpacing="center"
      gap={10}
      className="max-h-full overflow-y-auto py-4"
    >
      <VStack xSpacing="center">
        {/* Header */}
        <HStack className="w-full px-3" xSpacing="between" ySpacing="middle">
          <h1 className="text-2xl font-bold">
            {(bill.uid
              .split("-")[1]
              ?.split("")
              .map((letter) => letter.toUpperCase() + ".")
              .join("") ?? "") +
              " " +
              (bill.uid.split("-")[2] ?? "")}
          </h1>

          <LargeStatusChip status={bill.states[bill.states.length - 1]!} />
        </HStack>
        <h2 className="text-muted-foreground bg-red w-full px-3 text-lg font-medium">
          {bill.title}
        </h2>

        {bill.sponsors.length > 0 ? (
          <VStack className="w-full px-3" gap={1}>
            <ScrollArea>
              {bill.sponsors.map((sponsor, index) => (
                <SponsorsChip key={index} sponsor={sponsor} />
              ))}
            </ScrollArea>
          </VStack>
        ) : (
          <HStack centered className="w-full px-3">
            <h2 className="text-muted-foreground text-lg font-medium">
              There are no sponsors for this bill
            </h2>
          </HStack>
        )}

        <div className="bg-muted/20 h-px w-full" />

        <HStack className="w-full px-3">
          <ScrollArea gap={1}>
            {loadedCategories[bill.uid]!.tags.map((tag, index) => (
              <TagChip key={index} tag={tag} />
            ))}
          </ScrollArea>
        </HStack>
      </VStack>
      {/* Description */}
      <VStack gap={1}>
        <HStack
          className="hover:bg-background/5 w-full cursor-pointer rounded-md px-2 py-1 transition-all duration-200"
          xSpacing="between"
          ySpacing="middle"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        >
          <HStack centered className="w-fit" gap={2}>
            <h2 className="text-lg font-bold">Description</h2>
          </HStack>
          <ChevronDown
            size={20}
            className={cn(
              "text-muted-foreground transition-transform duration-200",
              isDescriptionOpen ? "rotate-180" : "",
            )}
          />
        </HStack>
        <AnimatePresence>
          {isDescriptionOpen && (
            <motion.div
              className="w-full px-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <p className="text-muted/70 text-sm">
                {loadedCategories[bill.uid]!.summary}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </VStack>

      {/* Timeline of Status Changes */}
      <VStack className="w-full px-3">
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="w-fit text-center text-lg font-bold">
            Status History
          </h2>
        </HStack>
        <ScrollArea gap={1}>
          {[...bill.states, ...futureStates].map((status, index) => (
            <HStack key={index} xSpacing="between" ySpacing="middle" gap={1}>
              <StatusChip
                status={status}
                isFuture={index >= bill.states.length}
              />
              {index !== [...bill.states, ...futureStates].length - 1 && (
                <ArrowRight className="text-muted-foreground h-4 w-4" />
              )}
            </HStack>
          ))}
        </ScrollArea>
      </VStack>

      {/* Sponsors */}
      {/* Voter Percentage Bars */}
      <VStack className="w-full px-3" gap={10}>
        {bill.cosponsors.length > 0 ? (
          <VStack className="w-full" gap={1}>
            <HStack
              className="hover:bg-background/5 w-full cursor-pointer rounded-md px-2 py-1 transition-all duration-200"
              xSpacing="between"
              ySpacing="middle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HStack centered className="w-fit" gap={2}>
                <h2 className="text-lg font-bold">Cosponsors</h2>
                <h2 className="text-muted-foreground text-lg">
                  ({bill.cosponsors.length})
                </h2>
              </HStack>
              <ChevronDown
                size={20}
                className={cn(
                  "text-muted-foreground transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                )}
              />
            </HStack>
            <SingleBarVisualizer height={20} cosponsors={bill.cosponsors} />
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className={cn(
                    "bg-background/10 flex w-full flex-row flex-wrap gap-2 overflow-hidden rounded-md p-2",
                  )}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {bill.cosponsors.map((cosponsor, index) => (
                    <SponsorsChip key={index} sponsor={cosponsor} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </VStack>
        ) : (
          <VStack ySpacing="middle" className="w-full" gap={1}>
            <h2 className="text-lg font-bold">Cosponsors</h2>

            <h2 className="text-muted-foreground text-lg font-medium">
              There are no cosponsors for this bill.
            </h2>
          </VStack>
        )}

        {bill.house_vote ? (
          <VStack className="w-full" gap={1}>
            <HStack centered className="w-fit" gap={2}>
              <h2 className="text-lg font-bold">House Vote</h2>
              <h2 className="text-muted-foreground text-lg">
                ({houseBar?.yea_count}-{houseBar?.nay_count})
              </h2>
            </HStack>
            <YayNayBarVisualizer height={20} reference={bill.house_vote} />
          </VStack>
        ) : (
          <VStack ySpacing="middle" className="w-full" gap={1}>
            <h2 className="text-lg font-bold">House Vote</h2>

            <h2 className="text-muted-foreground text-lg font-medium">
              There have been no House votes on this bill.
            </h2>
          </VStack>
        )}

        {bill.senate_vote ? (
          <VStack className="w-full" gap={1}>
            <HStack centered className="w-fit" gap={2}>
              <h2 className="text-lg font-bold">Senate Vote</h2>
              <h2 className="text-muted-foreground text-lg">
                ({senateBar?.yea_count}-{senateBar?.nay_count})
              </h2>
            </HStack>

            <YayNayBarVisualizer height={20} reference={bill.senate_vote} />
          </VStack>
        ) : (
          <VStack ySpacing="middle" className="w-full" gap={1}>
            <h2 className="text-lg font-bold">Senate Vote</h2>

            <h2 className="text-muted-foreground text-lg font-medium">
              There have been no Senate votes on this bill.
            </h2>
          </VStack>
        )}
      </VStack>
      {/* PDF Copy */}
      <HStack
        xSpacing="between"
        ySpacing="middle"
        className="absolute right-0 bottom-0 z-10 mr-4 mb-4"
      >
        <motion.button
          className={cn(
            "text-muted-foreground bg-primary hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-full p-2 text-sm font-medium",
            "shadow-sm shadow-black hover:shadow-md",
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          //TODO: Add actual link to pdf
          onClick={() =>
            window.open(
              `https://www.congress.gov/bill/${bill.congress}th-congress/${bill.type == "hr" ? "house" : "senate"}-bill/${bill.number}`,
              "_blank",
            )
          }
        >
          <FileText />
          Library of Congress
        </motion.button>

        <motion.button
          className={cn(
            "text-muted-foreground bg-primary hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-full p-2 text-sm font-light",
            "shadow-sm shadow-black hover:shadow-md",
          )}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={deselectBill}
        >
          <X className="size-4" />
        </motion.button>
      </HStack>
    </VStack>
  );
};
