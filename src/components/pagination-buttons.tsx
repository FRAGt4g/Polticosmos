"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCosmosContext } from "./providers/cosmos-provider";

const NextBill = () => {
  const { selectedBill, setSelectedBill, loadedBills } = useCosmosContext();
  const nextBill = Object.values(loadedBills).find(
    (bill) => bill.number === (selectedBill?.number ?? 0) + 1,
  );

  return (
    <motion.button
      className={cn(
        "text-muted-foreground bg-primary hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-full p-2 text-sm font-light",
        "shadow-sm shadow-black hover:shadow-md",
      )}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedBill(nextBill ?? null)}
    >
      <ArrowRight className="size-4" />
    </motion.button>
  );
};

export const RandomBill = () => {
  const { setSelectedBill, loadedBills } = useCosmosContext();
  const randomBill =
    Object.values(loadedBills)[
      Math.floor(Math.random() * Object.values(loadedBills).length)
    ];

  return (
    <motion.button
      className={cn(
        "text-muted-foreground bg-primary hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-full p-2 text-sm font-light",
        "shadow-sm shadow-black hover:shadow-md",
      )}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedBill(randomBill ?? null)}
    >
      <Shuffle className="size-4" />
    </motion.button>
  );
};

const PreviousBill = () => {
  const { selectedBill, setSelectedBill, loadedBills } = useCosmosContext();
  const previousBill = Object.values(loadedBills).find(
    (bill) => bill.number === (selectedBill?.number ?? 0) - 1,
  );

  return (
    <motion.button
      className={cn(
        "text-muted-foreground bg-primary hover:bg-primary/90 flex cursor-pointer items-center gap-2 rounded-full p-2 text-sm font-light",
        "shadow-sm shadow-black hover:shadow-md",
      )}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedBill(previousBill ?? null)}
    >
      <ArrowLeft className="size-4" />
    </motion.button>
  );
};

export { NextBill, PreviousBill };
