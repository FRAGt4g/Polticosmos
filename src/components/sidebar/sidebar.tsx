"use client";

import {
  ChartBar,
  Clock,
  Code,
  Folder,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { HStack } from "~/components/helpers/helperdivs";
import { Button } from "~/components/imported/ShadCN/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/imported/ShadCN/tooltip";
import { useCosmosContext } from "~/components/providers/cosmos-provider";
import {
  isDarkMode,
  usePreferences,
} from "~/components/providers/preferences-provider";
import {
  SidebarBody,
  SidebarLink,
  SidebarProvider,
  type Links,
} from "~/components/sidebar/sidebar-components";

export default function Sidebar({ side }: { side?: "left" | "right" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleDarkMode } = usePreferences();
  const { selectedStar, setSelectedStar } = useCosmosContext();

  const mainLinks: Links[] = [
    {
      label: "Dashboard",
      href: "/Dashboard",
      icon: <Code className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Time Entries",
      href: "/SheetBuilder",
      icon: <Clock className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Clients",
      href: "/Clients",
      icon: <Users className="h-5 w-5 shrink-0" />,
    },
    {
      label: "History",
      href: "/History",
      icon: <Folder className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Reminders (TODO)", // TODO: Change to Reminders ALSO THIS IS NOT A CALENDAR (probably like a little bit but more of a task manager)
      href: "/Reminders",
      icon: <ChartBar className="h-5 w-5 shrink-0" />,
    },
  ];

  const handleNavigation = async (link: Links) => {
    if (link.href === "#") {
      await link.onClick?.();
      return;
    }

    router.push(link.href);
  };

  return (
    <SidebarProvider
      open={selectedStar !== null}
      setOpen={(open) => {
        setSelectedStar(open ? selectedStar : null);
      }}
    >
      <SidebarBody className="flex h-screen flex-col" side={side}>
        {/* Main Navigation with SheetBuilder Config Panel nested under Time Entries */}
        <div className="flex-1 space-y-1 overflow-y-auto px-2">
          {mainLinks.map((link, index) => (
            <div key={index}>
              <SidebarLink
                link={link}
                isActive={pathname.endsWith(link.href)}
                onClick={() => handleNavigation(link)}
                subcontent={link.subcontent}
              />
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto space-y-1 px-2 py-4">
          <HStack ySpacing="space-between" gap={2} className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode() ? <Sun /> : <Moon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Toggle Dark Mode</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => router.push("/Settings")}
                >
                  <Settings />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Settings</p>
              </TooltipContent>
            </Tooltip>
          </HStack>
        </div>
      </SidebarBody>
    </SidebarProvider>
  );
}
