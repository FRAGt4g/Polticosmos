import { FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type BillSideBarInfo, type BillStatus } from "~/lib/types";
import { cn } from "~/lib/utils";
import BarVisualizer from "./BarVisualizer";
import { HStack, VStack } from "./helpers/helperdivs";
import { Button } from "./imported/ShadCN/button";

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

const SponsorsChip = ({ sponsor }: { sponsor: string }) => {
  return (
    <HStack
      centered
      className={cn(
        "bg-primary hover:bg-primary/90 rounded-md px-2 py-1 text-xs font-bold text-white",
      )}
    >
      {sponsor}
    </HStack>
  );
};

const ScrollArea = ({
  edgeColor = "primary",
  children,
}: {
  edgeColor?: string;
  children: React.ReactNode;
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScrollPosition();
      scrollElement.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollElement.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <div className="relative w-full">
      <HStack
        ref={scrollRef}
        xSpacing="around"
        className="scrollbar-hide h-fit max-w-full gap-2 overflow-x-auto overflow-y-hidden"
      >
        {children}
      </HStack>
      <div
        className={cn(
          `from-${edgeColor}/90 via-${edgeColor}/20 pointer-events-none absolute top-0 right-0 bottom-0 h-full w-24 bg-gradient-to-l to-transparent transition-all duration-300`,
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          `from-${edgeColor}/90 via-${edgeColor}/20 pointer-events-none absolute top-0 bottom-0 left-0 h-full w-24 bg-gradient-to-r to-transparent transition-all duration-300`,
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};

export const BillSidebarSummary = ({ bill }: { bill: BillSideBarInfo }) => {
  return (
    <VStack xSpacing="center" gap={2} className="w-full py-4">
      {/* Header */}
      <h1 className="text-2xl font-bold">{bill.name}</h1>

      <HStack className="w-full" xSpacing="around" ySpacing="middle">
        {/* PDF Copy */}
        <Button
          variant="default"
          size="default"
          onClick={() => window.open(bill.linkToPdf.toString(), "_blank")}
        >
          <FileText /> View PDF Copy
        </Button>

        <StatusChip status={bill.status} />
      </HStack>

      <div className="bg-muted/20 h-px w-full" />

      {/* Description */}
      <VStack>
        <h2 className="text-lg font-bold">Description</h2>
        <p>{bill.summary}</p>
      </VStack>

      {/* Sponsors */}
      <VStack className="w-full px-2">
        <h2 className="text-lg font-bold">Sponsors</h2>
        <ScrollArea>
          {bill.sponsors.map((sponsor) => (
            <SponsorsChip key={sponsor} sponsor={sponsor} />
          ))}
        </ScrollArea>
      </VStack>

      {/* Voter Percentage Bars */}
      <VStack>
        <h2 className="text-lg font-bold">Sponsorship Percentage</h2>
        <BarVisualizer height={20} bar={bill.sponsorshipPercentageBar} />
        <h2 className="text-lg font-bold">House Voter Percentage</h2>
        <BarVisualizer height={20} bar={bill.houseVoterPercentageBar} />
        <h2 className="text-lg font-bold">Senate Voter Percentage</h2>
        <BarVisualizer height={20} bar={bill.senateVoterPercentageBar} />
      </VStack>
    </VStack>
  );
};
