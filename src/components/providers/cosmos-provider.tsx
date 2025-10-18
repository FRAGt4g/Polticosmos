"use client";

import { createContext, useContext, useState } from "react";
import { type BillSideBarInfo } from "~/lib/types";

interface CosmosContextType {
  selectedStar: BillSideBarInfo | null;
  setSelectedStar: (star: BillSideBarInfo | null) => void;
}

const CosmosContext = createContext<CosmosContextType | undefined>(undefined);

export function useCosmosContext() {
  const context = useContext(CosmosContext);
  if (!context) {
    throw new Error("useCosmosContext must be used within a CosmosProvider");
  }
  return context;
}

export function CosmosProvider({ children }: { children: React.ReactNode }) {
  const [selectedStar, setSelectedStar] = useState<BillSideBarInfo | null>(
    null,
  );

  return (
    <CosmosContext.Provider value={{ selectedStar, setSelectedStar }}>
      {children}
    </CosmosContext.Provider>
  );
}
