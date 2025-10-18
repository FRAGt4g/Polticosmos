"use client";

import { useCosmosContext } from "~/components/providers/cosmos-provider";
import {
  SidebarBody,
  SidebarProvider,
} from "~/components/sidebar/sidebar-components";
import { BillSidebarSummary } from "../bill-summary";

export default function Sidebar({ side }: { side?: "left" | "right" }) {
  const { selectedStar: bill, setSelectedStar } = useCosmosContext();

  return (
    <SidebarProvider
      open={bill !== null}
      setOpen={(open) => {
        setSelectedStar(open ? bill : null);
      }}
    >
      <SidebarBody
        className="border-background/10 bg-background/5 text-background flex h-screen flex-col border-2 shadow-md backdrop-blur-md"
        side={side}
      >
        {bill && <BillSidebarSummary bill={bill} />}
      </SidebarBody>
    </SidebarProvider>
  );
}
