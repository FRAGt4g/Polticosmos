"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSidebar } from "./sidebar/sidebar-components";

const Title = () => {
  const { open, sidebarWidth } = useSidebar();
  const left = (window.innerWidth + (open ? sidebarWidth : 0)) / 2;

  return (
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
      <h1 className="mb-2 flex items-center justify-center gap-3 text-4xl font-bold text-white md:text-5xl">
        <Sparkles className="text-accent h-8 w-8" />
        Explore the Stars
        <Sparkles className="text-accent h-8 w-8" />
      </h1>
      <p className="text-muted-foreground text-sm md:text-base">
        Click on any star to discover its secrets
      </p>
    </motion.div>
  );
};

export default Title;
