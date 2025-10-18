import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BillSideBarInfo } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDummyBillInfo(): BillSideBarInfo {
  const billInfo: BillSideBarInfo = {
    name: "Bill" + Math.random().toString(36).substring(2, 15),
    committeeOrigination:
      "Committee" + Math.random().toString(36).substring(2, 15),
    sponsors: [
      "Sponsor" + Math.random().toString(36).substring(2, 15),
      "Sponsor" + Math.random().toString(36).substring(2, 15),
    ],
    summary: "Summary" + Math.random().toString(36).substring(2, 15),
    status: "Introduced",
    republicanSponsors: Math.floor(Math.random() * 100),
    democratSponsors: Math.floor(Math.random() * 100),
    independentSponsors: Math.floor(Math.random() * 100),
    sponsorshipPercentageBar: {
      yays: {
        republican: Math.floor(Math.random() * 100),
        democrat: Math.floor(Math.random() * 100),
        independent: Math.floor(Math.random() * 100) + 1,
      },
      nays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100),
        independent: Math.floor(Math.random() * 100) + 1,
      },
      other: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 1,
      },
    },
    houseVoterPercentageBar: {
      yays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 0.5,
      },
      nays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 0.5,
      },
      other: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 0.5,
      },
    },
    senateVoterPercentageBar: {
      yays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 0.5,
      },
      nays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 1,
      },
      other: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 0.5,
      },
    },
    mediaCoverage:
      "Media Coverage " + Math.random().toString(36).substring(2, 15),
    linkToPdf: new URL("https://www.google.com"),
  };
  return billInfo;
}
