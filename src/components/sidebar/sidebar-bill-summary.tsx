import { ArrowRight, FileText } from "lucide-react";
import ScrollArea from "~/components/helpers/scroll-area-fade";
import { type Bill, type BillSponsor, type BillStatus } from "~/lib/types";
import { cn } from "~/lib/utils";
import { SingleBarVisualizer, YayNayBarVisualizer } from "../BarVisualizer";
import { HStack, VStack } from "../helpers/helperdivs";
import { Button } from "../imported/ShadCN/button";

const StatusChip = ({ status }: { status: BillStatus }) => {
  const statusColors = {
    Introduced: "bg-blue-500",
    House: "bg-green-500",
    Senate: "bg-yellow-500",
    President: "bg-red-500",
    Failed: "bg-red-500",
    Passed: "bg-green-500",
  };

  return (
    <HStack
      centered
      className={cn(
        "rounded-md px-2 py-1 text-xs font-bold text-white",
        statusColors[status],
      )}
    >
      {status}
    </HStack>
  );
};

const SponsorsChip = ({ sponsor }: { sponsor: BillSponsor }) => {
  const colors = {
    Republican: "bg-red-500 hover:bg-red-600/90",
    Democrat: "bg-blue-500 hover:bg-blue-600/90",
    Independent: "bg-transparent backdrop-blur-md hover:bg-transparent/90",
  };

  return (
    <HStack
      centered
      className={cn(
        "rounded-md px-2 py-1 text-xs font-bold text-white",
        colors[sponsor.party],
      )}
    >
      {sponsor.name}
    </HStack>
  );
};

export const BillSidebarSummary = ({ bill }: { bill: Bill }) => {
  return (
    <VStack xSpacing="center" gap={10} className="py-4">
      <VStack xSpacing="center">
        {/* Header */}
        <HStack xSpacing="between" ySpacing="middle">
          <h1 className="text-2xl font-bold">{bill.name}</h1>

          <StatusChip
            status={bill.statusHistory[bill.statusHistory.length - 1]!}
          />
        </HStack>

        <div className="bg-muted/20 h-px w-full" />
      </VStack>

      {/* Description */}
      <VStack className="w-full px-2">
        <h2 className="text-lg font-bold">Description</h2>
        <p className="text-muted-foreground text-sm">{bill.summary}</p>
      </VStack>

      {/* Timeline of Status Changes */}
      <VStack className="w-full px-2">
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="w-fit text-center text-lg font-bold">
            Status Timeline
          </h2>
        </HStack>
        <ScrollArea gap={1}>
          {bill.statusHistory.map((status, index) => (
            <HStack key={index} xSpacing="between" ySpacing="middle" gap={1}>
              <StatusChip status={status} />
              {index !== bill.statusHistory.length - 1 && (
                <ArrowRight className="text-muted-foreground h-4 w-4" />
              )}
            </HStack>
          ))}
        </ScrollArea>
      </VStack>

      {/* Sponsors */}
      <VStack className="w-full px-2">
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="text-lg font-bold">Sponsors</h2>

          <SingleBarVisualizer
            height={20}
            bar={bill.sponsorshipPercentageBar}
          />
        </HStack>
        <ScrollArea>
          {bill.sponsors.map((sponsor, index) => (
            <SponsorsChip key={index} sponsor={sponsor} />
          ))}
        </ScrollArea>
      </VStack>

      {/* Voter Percentage Bars */}
      <VStack className="w-full px-2">
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="w-fit text-center text-lg font-bold">House</h2>
          <YayNayBarVisualizer height={20} bar={bill.houseVoterPercentageBar} />
        </HStack>
        <HStack className="w-full" xSpacing="between" ySpacing="middle">
          <h2 className="w-fit text-center text-lg font-bold">Senate</h2>

          <YayNayBarVisualizer
            height={20}
            bar={bill.senateVoterPercentageBar}
          />
        </HStack>
      </VStack>

      {/* PDF Copy */}
      <Button
        className="absolute right-0 bottom-0 mx-4 mb-4"
        variant="default"
        size="default"
        onClick={() => window.open(bill.linkToPdf.toString(), "_blank")}
      >
        <FileText /> View PDF Copy
      </Button>
    </VStack>
  );
};
