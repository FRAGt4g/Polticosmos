"use client";

import { useCosmosContext } from "~/components/providers/cosmos-provider";
import { BillSidebarSummary } from "~/components/sidebar/sidebar-bill-summary";
import {
  SidebarBody,
  SidebarProvider,
} from "~/components/sidebar/sidebar-components";
import "~/styles/globals.css";
import { CosmosProvider } from "../../components/providers/cosmos-provider";

export default function StarryNightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#000814] via-[#001d3d] to-[#000814]">
      <CosmosProvider>
        <Inner>{children}</Inner>
      </CosmosProvider>
    </div>
  );
}

const Inner = ({ children }: { children: React.ReactNode }) => {
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
        side={"left"}
      >
        {bill && <BillSidebarSummary bill={bill} />}
      </SidebarBody>
      {children}
    </SidebarProvider>
  );
};
