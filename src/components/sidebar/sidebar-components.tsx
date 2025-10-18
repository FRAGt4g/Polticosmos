"use client";
import { clamp, motion } from "framer-motion";
import { X } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../imported/ShadCN/button";
import { useCosmosContext } from "../providers/cosmos-provider";

export interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => Promise<void> | void;
  subcontent?: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarBody = (
  props: React.ComponentProps<typeof motion.div> & {
    side?: "left" | "right";
  },
) => {
  return <DesktopSidebar {...props} />;
};

const ResizeHandle = ({
  width,
  setWidth,
  widthConstraints,
}: {
  width: number;
  setWidth: (width: number) => void;
  widthConstraints?: {
    min?: number;
    max?: number;
  };
}) => {
  function handleResize(e: React.MouseEvent) {
    e.preventDefault();
    function handleMove(moveEvent: MouseEvent) {
      setWidth(
        clamp(
          widthConstraints?.min ?? 0,
          widthConstraints?.max ?? Infinity,
          width + (moveEvent.clientX - e.clientX),
        ),
      );
    }

    // Handler for when resizing ends (mouse up/touch end)
    function handleEnd() {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
    }

    // Add event listeners to handle the resize operation
    // We add these to document so we can catch events even if the mouse moves outside the resizer
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
  }

  return (
    <div
      className="absolute top-0 right-0 z-10 h-full w-[4px] cursor-col-resize bg-transparent"
      style={{
        userSelect: "none",
        touchAction: "none",
      }}
      onMouseDown={(e) => {
        handleResize(e);

        const element = e.currentTarget;
        function onMouseUp() {
          element.blur();
          window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mouseup", onMouseUp);
      }}
    />
  );
};

export const DesktopSidebar = ({
  className,
  children,
  side = "left",
  spacing = 16,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  side?: "left" | "right";
  spacing?: number;
}) => {
  const { setSelectedStar } = useCosmosContext();
  const { open } = useSidebar();
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [width, setWidth] = useState(340);
  const offScreen = side === "left" ? -(width + 100) : window.innerWidth + 100;
  const onScreen =
    side === "left" ? 0 : window.innerWidth - width - 2 * spacing;
  const widthConstraints = { min: 400, max: 800 };

  useEffect(() => {
    setDisableAnimation(true);
    setTimeout(() => {
      setDisableAnimation(false);
    }, 200);
  }, [side]);

  return (
    <motion.div
      style={{
        height: "calc(100vh - 32px)",
        width: width,
        margin: spacing,
        opacity: disableAnimation ? 0 : 1,
      }}
      transition={{
        type: "spring",
        duration: 0.2,
        stiffness: 400,
        damping: 30,
      }}
      className={cn(
        "fixed z-20 rounded-lg border border-gray-200 bg-white/90 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-neutral-900/90",
        className,
      )}
      initial={{
        x: open ? onScreen : offScreen,
      }}
      animate={{
        x: open ? onScreen : offScreen,
      }}
      {...props}
    >
      <div className="absolute top-0 right-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedStar(null)}
        >
          <X />
        </Button>
      </div>
      <ResizeHandle
        width={width}
        setWidth={setWidth}
        widthConstraints={widthConstraints}
      />
      {children as React.ReactNode}
    </motion.div>
  );
};

export const SidebarLink = ({
  link,
  className,
  isActive = false,
  onClick,
  subcontent,
  ...props
}: {
  link: Links;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  subcontent?: React.ReactNode;
  props?: LinkProps;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      e.preventDefault();
    }
  };

  return (
    <div className={cn("group/sidebar", isActive && "my-3")}>
      <Link
        href={link.href}
        className={cn(
          "group/sidebar flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-gray-100 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center gap-2">
          {link.icon}
          <span className="font-medium">{link.label}</span>
        </div>
      </Link>
      {isActive && subcontent && (
        <div className="mt-2 mb-4 flex flex-row gap-2 px-2">
          <div
            style={{
              marginLeft: "8px",
              width: "3px",
              // height: "40px",
            }}
            className="rounded-full bg-gray-200 dark:bg-gray-800"
          />
          <div className="w-full rounded-lg p-2">{subcontent}</div>
        </div>
      )}
    </div>
  );
};
