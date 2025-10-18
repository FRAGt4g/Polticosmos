import { FileText, X } from "lucide-react";
import { type BillSideBarInfo, type BillStatus } from "~/lib/types";
import { cn } from "~/lib/utils";
import BarVisualizer from "./BarVisualizer";
import { HStack, VStack } from "./helpers/helperdivs";
import { Button } from "./imported/ShadCN/button";
import { useCosmosContext } from "./providers/cosmos-provider";

const StatusChip = ({ status }: { status: BillStatus }) => {
  return (
    <div
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium",
        status === "Introduced"
          ? "bg-blue-500 text-white"
          : status === "House"
            ? "bg-green-500 text-white"
            : status === "Senate"
              ? "bg-yellow-500 text-white"
              : status === "President"
                ? "bg-red-500 text-white"
                : status === "Failed"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white",
      )}
    >
      {status}
    </div>
  );
};

export const BillSidebarSummary = ({ bill }: { bill: BillSideBarInfo }) => {
  const { setSelectedStar } = useCosmosContext();

  return (
    <VStack xSpacing="center" gap={2}>
      {/* Header */}
      <HStack>
        <h1 className="text-2xl font-bold">{bill.name}</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedStar(null)}
        >
          <X />
        </Button>
      </HStack>

      {/* Status */}
      <HStack>
        <h2 className="text-lg font-bold">Status</h2>
        <p>{bill.status}</p>
      </HStack>

      {/* Description */}
      <VStack>
        <h2 className="text-lg font-bold">Description</h2>
        <p>{bill.summary}</p>
      </VStack>

      {/* Sponsors */}
      <VStack>
        <h2 className="text-lg font-bold">Sponsors</h2>
        <p>{bill.sponsors.join(", ")}</p>
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

      {/* PDF Copy */}
      <Button
        variant="default"
        size="default"
        onClick={() => window.open(bill.linkToPdf.toString(), "_blank")}
      >
        <FileText /> View PDF Copy
      </Button>
    </VStack>
  );
};
