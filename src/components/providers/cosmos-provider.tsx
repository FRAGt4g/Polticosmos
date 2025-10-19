"use client";

import { createContext, useContext, useState } from "react";
import { getBill } from "~/app/api/safe-fetches";
import { type Bill } from "~/lib/types";

interface CosmosContextType {
  selectedBill: Bill | null;
  setSelectedBill: (bill: Bill | null) => void;
  loadedBills: Record<string, Bill>;
  setLoadedBills: (bills: Record<string, Bill>) => void;
  selectBill: (billId: string) => Promise<void>;
  deselectBill: () => void;
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
  const [loadedBills, setLoadedBills] = useState<Record<string, Bill>>({});
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  async function selectBill(billId: string) {
    if (loadedBills[billId]) {
      setSelectedBill(loadedBills[billId]);
      return;
    }

    const bill = await getBill(billId);
    if (bill) {
      setLoadedBills((prev) => ({ ...prev, [billId]: bill }));
      setSelectedBill(bill);
    } else {
      console.error(`Bill ${billId} not found`);
      setSelectedBill(null);
    }
  }

  function deselectBill() {
    console.log("Deselecting bill");
    setSelectedBill(null);
  }

  const values: CosmosContextType = {
    selectedBill,
    setSelectedBill,
    loadedBills,
    setLoadedBills,
    selectBill,
    deselectBill,
  };

  return (
    <CosmosContext.Provider value={values}>{children}</CosmosContext.Provider>
  );
}
