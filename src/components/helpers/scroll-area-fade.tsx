"use client";

import { useEffect, useRef, useState } from "react";
import { HStack } from "~/components/helpers/helperdivs";
import { cn } from "~/lib/utils";

export default function ScrollArea({
  gradientEnd = "from-primary/90 via-primary/20",
  children,
  gap = 2,
}: {
  gradientEnd?: string;
  children: React.ReactNode;
  gap?: number;
}) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScrollPosition();
      scrollElement.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollElement.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <div className="relative w-full">
      <HStack
        ref={scrollRef}
        xSpacing="left"
        ySpacing="middle"
        gap={gap}
        className="scrollbar-hide h-fit max-w-full overflow-x-auto overflow-y-hidden"
      >
        {children}
      </HStack>
      <div
        className={cn(
          `pointer-events-none absolute top-0 right-0 bottom-0 h-full w-24 bg-gradient-to-l to-transparent transition-all duration-300`,
          canScrollRight ? "opacity-100" : "opacity-0",
          gradientEnd,
        )}
      />
      <div
        className={cn(
          `pointer-events-none absolute top-0 bottom-0 left-0 h-full w-24 bg-gradient-to-r to-transparent transition-all duration-300`,
          canScrollLeft ? "opacity-100" : "opacity-0",
          gradientEnd,
        )}
      />
    </div>
  );
}
