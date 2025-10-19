"use client";

import { LoaderCircle } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getAllBills, getAllReps, getAllVotes } from "~/app/api/safeFetches";
import {
  type Bill,
  type BillReference,
  type ConcatenatedBillStates,
  type ExtraBillInformation,
  type Rep,
  type VoteResolution,
} from "~/lib/types";
import { parseBillStates } from "~/lib/utils";

interface CosmosContextType {
  selectedBill: Bill | null;
  setSelectedBill: (bill: Bill | null) => void;
  loadedBills: Record<string, Bill>;
  setLoadedBills: (bills: Record<string, Bill>) => void;
  selectBill: (billId: string) => void;
  deselectBill: () => void;
  loadedReps: Record<string, Rep>;
  setLoadedReps: (reps: Record<string, Rep>) => void;
  loadedCategories: Record<BillReference, ExtraBillInformation>;
  setLoadedCategories: (
    categories: Record<BillReference, ExtraBillInformation>,
  ) => void;
  loadedVotes: Record<string, VoteResolution>;
  setLoadedVotes: (votes: Record<string, VoteResolution>) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

const CosmosContext = createContext<CosmosContextType | undefined>(undefined);

async function getAllCategories(): Promise<
  Record<BillReference, ExtraBillInformation>
> {
  const result = await fetch("/api/categories");
  if (!result.ok) {
    throw new Error(`Failed to get categories: ${result.statusText}`);
  }
  const data = (await result.json()) as Record<
    BillReference,
    ExtraBillInformation
  >;
  return data;
}

export function useCosmosContext() {
  const context = useContext(CosmosContext);
  if (!context) {
    throw new Error("useCosmosContext must be used within a CosmosProvider");
  }
  return context;
}

export function CosmosProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [loadedBills, setLoadedBills] = useState<Record<string, Bill>>({});
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [loadedReps, setLoadedReps] = useState<Record<string, Rep>>({});
  const [loadedCategories, setLoadedCategories] = useState<
    Record<BillReference, ExtraBillInformation>
  >({});
  const [loadedVotes, setLoadedVotes] = useState<
    Record<string, VoteResolution>
  >({});
  const mounted = useRef(false);

  useEffect(() => {
    async function setValues() {
      const bills = await getAllBills();
      const reps = await getAllReps();
      const votes = await getAllVotes();
      const categories = await getAllCategories();
      setLoadedCategories(categories);
      console.log(categories);

      setLoadedBills(
        bills.reduce(
          (acc, bill) => {
            acc[bill.uid] = {
              ...bill,
              states: parseBillStates(
                bill.states as unknown as ConcatenatedBillStates,
              ),
            };
            return acc;
          },
          {} as Record<string, Bill>,
        ),
      );

      setLoadedVotes(
        votes.reduce(
          (acc, vote) => {
            acc[vote.uid] = vote;
            return acc;
          },
          {} as Record<string, VoteResolution>,
        ),
      );

      setLoadedReps(
        reps.reduce(
          (acc, rep) => {
            acc[rep.uid] = rep;
            return acc;
          },
          {} as Record<string, Rep>,
        ),
      );

      mounted.current = true;
    }

    void setValues();
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
    loadedReps,
    setLoadedReps,
    loadedCategories,
    setLoadedCategories,
    loadedVotes,
    setLoadedVotes,
    paused,
    setPaused,
  };

  return (
    <CosmosContext.Provider value={values}>
      {mounted.current ? children : <Loading />}
    </CosmosContext.Provider>
  );
}

const Loading = () => {
  return (
    <div className="bg-background/10 absolute inset-0 flex h-full w-full animate-pulse flex-col items-center justify-center backdrop-blur-md">
      <LoaderCircle size={48} className="animate-spin" />
      <p className="text-sm text-white">Loading...</p>
    </div>
  );
};
