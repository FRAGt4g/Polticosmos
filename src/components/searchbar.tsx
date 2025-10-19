"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { HStack, VStack } from "./helpers/helperdivs";
import { useCosmosContext } from "./providers/cosmos-provider";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { paused, setPaused, loadedBills, selectBill } = useCosmosContext();
  const searchRef = useRef<HTMLInputElement>(null);
  const [displacement, setDisplacement] = useState(0);

  const matchingBills = useMemo(() => {
    return Object.values(loadedBills)
      .filter(
        (bill) =>
          bill.title.toLowerCase().includes(search.toLowerCase()) ||
          bill.description.toLowerCase().includes(search.toLowerCase()) ||
          bill.number.toString().includes(search.toLowerCase()),
      )
      .slice(0, 10)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [search, loadedBills]);

  useEffect(() => {
    setDisplacement(
      Math.max(0, Math.min(displacement, matchingBills.length - 1)),
    );
  }, [search, matchingBills]);

  useEffect(() => {
    if (paused) setSearch("");
  }, [paused, setPaused]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && e.metaKey) {
        console.log("Opening search bar");
        setPaused(!paused);
        setTimeout(() => {
          searchRef.current?.focus();
        }, 100);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [paused, setPaused]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      animate={{ opacity: paused ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: paused ? "auto" : "none" }}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setPaused(false)}
      />
      <VStack
        className="absolute top-1/3 left-1/2 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2"
        centered
      >
        <motion.div
          className="bg-background/10 border-background/30 w-full max-w-[500px] rounded-md border p-4 font-bold text-white backdrop-blur-md"
          animate={{ opacity: paused ? 1 : 0, y: paused ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <input
            ref={searchRef}
            type="text"
            className="decoration-none w-full border-none bg-transparent text-white outline-none"
            placeholder="Search for a bill"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setPaused(false);
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setDisplacement(Math.max(0, displacement - 1));
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setDisplacement(
                  Math.min(matchingBills.length - 1, displacement + 1),
                );
              }
              if (e.key === "Enter" && matchingBills.length > 0) {
                setPaused(false);
                selectBill(matchingBills[displacement]!.uid);
                setSearch("");
              }
            }}
            autoFocus
          />
        </motion.div>
        {matchingBills.map((bill, index) => (
          <motion.div
            key={bill.uid}
            className={cn(
              "bg-foreground/5 border-background/30 w-[80%] rounded-md border p-2 text-ellipsis whitespace-nowrap text-white backdrop-blur-2xl",
              displacement === index
                ? "bg-primary/90 border-background/30"
                : "bg-primary/10 border-background/20",
            )}
            onClick={() => {
              setPaused(false);
              setSearch("");
              selectBill(bill.uid);
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          >
            <HStack
              gap={2}
              className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap"
            >
              <p className="text-muted-foreground">
                {(bill.uid
                  .split("-")[1]
                  ?.split("")
                  .map((letter) => letter.toUpperCase() + ".")
                  .join("") ?? "") +
                  " " +
                  (bill.uid.split("-")[2] ?? "")}
              </p>
              <p className="w-min text-ellipsis whitespace-nowrap text-white">
                {bill.title}
              </p>
            </HStack>
          </motion.div>
        ))}
      </VStack>
    </motion.div>
  );
};

export default SearchBar;
