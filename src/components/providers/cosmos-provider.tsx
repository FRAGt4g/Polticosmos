"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getAllBills } from "~/app/api/safeFetches";
import { type Bill } from "~/lib/types";

interface CosmosContextType {
  selectedBill: Bill | null;
  setSelectedBill: (bill: Bill | null) => void;
  loadedBills: Record<string, Bill>;
  setLoadedBills: (bills: Record<string, Bill>) => void;
  selectBill: (billId: string) => void;
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
  const mounted = useRef(false);

  useEffect(() => {
    async function getBillsTest() {
      const bills = await getAllBills();
      console.log(`Loaded bills`, bills);
      setLoadedBills(
        bills.reduce(
          (acc, bill) => {
            acc[bill.uid] = bill;
            return acc;
          },
          {} as Record<string, Bill>,
        ),
      );
      mounted.current = true;
    }

    void getBillsTest();
  }, []);

  function selectBill(billId: string) {
    const bill = loadedBills[billId] ?? null;
    console.log(`Selecting bill ${billId}`, bill);
    setSelectedBill(bill);
  }

  function deselectBill() {
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
    <CosmosContext.Provider value={values}>
      {mounted.current ? children : <div>Loading...</div>}
    </CosmosContext.Provider>
  );
}
