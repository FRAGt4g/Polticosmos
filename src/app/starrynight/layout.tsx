"use client";

import Sidebar from "~/components/sidebar";
import "~/styles/globals.css";
import { CosmosProvider } from "../cosmos-provider";

export default function StarryNightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //   const { sidebarLocation } = usePreferences();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#000814] via-[#001d3d] to-[#000814]">
      <CosmosProvider>
        <Sidebar side={"left"} />
        {children}
      </CosmosProvider>
    </div>
  );
}
