"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useCosmosContext } from "./providers/cosmos-provider";
import { useSidebar } from "./sidebar/sidebar-components";

const knownBills = [
  "119-hr-46",
  "119-hr-42",
  "119-hr-37",
  "119-hr-41",
  "119-hr-72",
  "119-hr-67",
  "119-hr-75",
  "119-hr-61",
  "119-hr-59",
];

const specialBillId = "119-hr-4";

const Title = () => {
  const { open, sidebarWidth } = useSidebar();
  const { selectBill } = useCosmosContext();
  const left = (window.innerWidth + (open ? sidebarWidth : 0)) / 2;

  useEffect(() => {
    function fakeClickStar(event: KeyboardEvent) {
      if (event.key === "f") {
        selectBill(specialBillId);
      }
      // if (event.key === "f") {
      //   selectBill(getRandomElement(knownBills));
      // }
    }
    document.addEventListener("keypress", fakeClickStar);
    return () => {
      document.removeEventListener("keypress", fakeClickStar);
    };
  }, []);

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
          <p className="text-muted-foreground text-sm md:text-base">
            Click on any star to discover its secrets or ⌘ + k to search for a
            bill
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Title;
