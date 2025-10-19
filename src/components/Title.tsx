"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useCosmosContext } from "./providers/cosmos-provider";
import { useSidebar } from "./sidebar/sidebar-components";

const Title = () => {
  const { open, sidebarWidth } = useSidebar();
  const { selectedBill, lawOnly, setLawOnly } = useCosmosContext();
  const left = (window.innerWidth + (open ? sidebarWidth : 0)) / 2;

  const [openedBill, setOpenedBill] = useState(false);
  useEffect(() => {
    if (selectedBill) setOpenedBill(true);
  }, [selectedBill]);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="bg-background/10 border-background/30 absolute top-8 z-10 -translate-x-1/2 rounded-md border p-4 text-center shadow-md backdrop-blur-md"
          initial={{
            opacity: 0,
            y: -100,
            left,
          }}
          animate={{
            opacity: 1,
            y: 0,
            left,
          }}
          transition={{ duration: 0.5 }}
          exit={{
            opacity: 0,
            y: -100,
            left,
          }}
        >
          <h1 className="mb-2 flex items-center justify-center gap-3 text-4xl font-bold whitespace-nowrap text-white md:text-5xl">
            <Sparkles className="text-accent h-8 w-8" />
            Explore the Stars
            <Sparkles className="text-accent h-8 w-8" />
          </h1>
          {!openedBill ? <p className="text-muted-foreground text-sm md:text-base">
            Click on any star to discover its secrets or ⌘ + K to search for a
            bill
          </p> : <div className={"flex flex-col items-center"}>
            <p className="text-muted-foreground text-sm md:text-base">
              When ready, flip this switch to see how many bills become laws.
            </p>
            <div className="flex items-center gap-1 mt-3">
              <button
                onClick={() => setLawOnly(!lawOnly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  lawOnly ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  lawOnly ? "translate-x-5" : "translate-x-1"
                }`}
              />
              </button>
            </div>
          </div>}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Title;
