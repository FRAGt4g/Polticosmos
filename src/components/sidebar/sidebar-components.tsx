"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "~/lib/utils";

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
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  side = "left",
  ...props
}: React.ComponentProps<typeof motion.div> & {
  side?: "left" | "right";
}) => {
  // –– STYLING ––
  const width = 340;
  const spacing = 16;
  // –––––––––––––

  const [disableAnimation, setDisableAnimation] = useState(false);
  const { open } = useSidebar();
  const offScreen = side === "left" ? -(width + 100) : window.innerWidth + 100;
  const onScreen =
    side === "left" ? 0 : window.innerWidth - width - 2 * spacing;

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
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between bg-neutral-100 px-4 py-4 md:hidden dark:bg-neutral-800",
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <Menu
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-10 dark:bg-neutral-900",
                className,
              )}
            >
              <div
                className="absolute top-10 right-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
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
