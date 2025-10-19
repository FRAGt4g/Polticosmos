"use client";

import { useCosmosContext } from "~/components/providers/cosmos-provider";
import SearchBar from "~/components/searchbar";
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
  const { selectedBill, setSelectedBill } = useCosmosContext();

  return (
    <SidebarProvider
      open={selectedBill !== null}
      setOpen={(open) => {
        setSelectedBill(open ? selectedBill : null);
      }}
    >
      <SidebarBody
        className="text-background flex h-screen flex-col border-2 border-white/10 bg-white/10 shadow-md shadow-black backdrop-blur-2xl"
        side={"left"}
      >
        {selectedBill && <BillSidebarSummary bill={selectedBill} />}
      </SidebarBody>
      <SearchBar />
      {children}
    </SidebarProvider>
  );
};
