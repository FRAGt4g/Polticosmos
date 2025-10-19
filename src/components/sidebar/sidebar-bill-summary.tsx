import { motion } from "framer-motion";
import { ArrowRight, FileText, X } from "lucide-react";
import ScrollArea from "~/components/helpers/scroll-area-fade";
import {
  type Bill,
  type BillState,
  type PartyAffiliation,
  type RepReference,
} from "~/lib/types";
import { cn, formatBillStatus, getRepFromReference } from "~/lib/utils";
import { SingleBarVisualizer, YayNayBarVisualizer } from "../BarVisualizer";
import { HStack, VStack } from "../helpers/helperdivs";
import { useCosmosContext } from "../providers/cosmos-provider";

const StatusChip = ({ status }: { status: BillState }) => {
  const statusColors: Record<BillState, string> = {
    introduced: "bg-blue-500",
    house: "bg-green-500",
    senate: "bg-yellow-500",
    conference: "bg-purple-500",
    conference_house: "bg-orange-500",
    conference_senate: "bg-pink-500",
    conference_passed: "bg-teal-500",
    president: "bg-red-500",
    veto: "bg-red-500",
    veto_house: "bg-orange-500",
    veto_senate: "bg-pink-500",
    veto_overridden: "bg-teal-500",
    law: "bg-green-500",
  };

  return (
    <HStack
      centered
      className={cn(
        "rounded-md px-2 py-1 text-xs font-bold whitespace-nowrap text-white",
        statusColors[status],
      )}
    >
      {formatBillStatus(status)}
    </HStack>
  );
};

const SponsorsChip = ({ sponsor }: { sponsor: RepReference }) => {
  const colors: Record<PartyAffiliation, string> = {
    R: "bg-red-500 hover:bg-red-600/90",
    D: "bg-blue-500 hover:bg-blue-600/90",
    I: "bg-transparent backdrop-blur-md hover:bg-transparent/90",
  };

  return (
    <HStack
      centered
      className={cn(
        "rounded-md px-2 py-1 text-xs font-bold text-white",
        colors[getRepFromReference(sponsor).party],
      )}
    >
      {getRepFromReference(sponsor).name}
    </HStack>
  );
};

export const BillSidebarSummary = ({ bill }: { bill: Bill }) => {
  const { deselectBill } = useCosmosContext();

  return (
    <VStack xSpacing="center" gap={10} className="py-4">
      <VStack xSpacing="center">
        {/* Header */}
        <HStack className="w-full px-2" xSpacing="between" ySpacing="middle">
          <h1 className="text-2xl font-bold">{bill.title}</h1>

          {bill.states.length > 0 ? (
            <StatusChip status={bill.states[bill.states.length - 1]!} />
          ) : (
            <StatusChip status="introduced" />
          )}
        </HStack>

        <div className="bg-muted/20 h-px w-full" />
      </VStack>

      {/* Description */}
      <VStack className="w-full px-2">
        <h2 className="text-lg font-bold">Description</h2>
        <p className="text-muted-foreground text-sm">{bill.description}</p>
      </VStack>

      {/* Timeline of Status Changes */}
      <VStack className="w-full px-2">
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="w-fit text-center text-lg font-bold">
            Status Timeline
          </h2>
        </HStack>
        <ScrollArea gap={1}>
          {bill.states.length > 0 ? (
            bill.states.map((status, index) => (
              <HStack key={index} xSpacing="between" ySpacing="middle" gap={1}>
                <StatusChip status={status} />
                {index !== bill.states.length - 1 && (
                  <ArrowRight className="text-muted-foreground h-4 w-4" />
                )}
              </HStack>
            ))
          ) : (
            <StatusChip status="introduced" />
          )}
        </ScrollArea>
      </VStack>

      {/* Sponsors */}
      <VStack className="w-full px-2">
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="text-lg font-bold">Cosponsors</h2>

          <SingleBarVisualizer height={20} cosponsors={bill.cosponsors} />
        </HStack>
        <ScrollArea>
          {bill.sponsors.map((sponsor, index) => (
            <SponsorsChip key={index} sponsor={sponsor} />
          ))}
        </ScrollArea>
      </VStack>

      {/* Voter Percentage Bars */}
      <VStack className="w-full px-2">
        {bill.house_vote && (
          <HStack className="w-full" xSpacing="between" ySpacing="bottom">
            <h2 className="w-fit text-center text-lg font-bold">House</h2>
            <YayNayBarVisualizer height={20} reference={bill.house_vote} />
          </HStack>
        )}
        {bill.senate_vote && (
          <HStack className="w-full" xSpacing="between" ySpacing="middle">
            <h2 className="w-fit text-center text-lg font-bold">Senate</h2>

            <YayNayBarVisualizer height={20} reference={bill.senate_vote} />
          </HStack>
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
          onClick={() => window.open("testing", "_blank")}
        >
          <FileText />
          View PDF Copy
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
