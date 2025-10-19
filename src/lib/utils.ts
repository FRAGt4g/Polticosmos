import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Bill } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function createSeededRandom(seed: number) {
  let currentSeed = seed;
  let count = 0;

  return function () {
    // LCG algorithm
    currentSeed = (currentSeed * 9301 + 49297 + count) % 233280;
    count++;
    return currentSeed / 233280;
  };
}

export function createDummyBillInfoSeeded(seed: number): Bill {
  const rng = createSeededRandom(seed);

  const billInfo: Bill = {
    id: crypto.randomUUID(),
    name: "Bill" + rng().toString(36).substring(2, 15),
    committeeOrigination: "Committee" + rng().toString(36).substring(2, 15),

    sponsors: Array.from({ length: Math.floor(rng() * 10) + 1 }, () => {
      return {
        name: "Sponsor" + rng().toString(36).substring(2, 15),
        party:
          rng() < 0.33
            ? "Republican"
            : rng() < 0.66
              ? "Democrat"
              : "Independent",
      };
    }),
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    statusHistory: Array.from({ length: Math.floor(rng() * 10) + 1 }, () => {
      return getRandomElement([
        "Introduced",
        "House",
        "Senate",
        "President",
        "Failed",
        "Passed",
      ]);
    }),
    republicanSponsors: Math.floor(rng() * 100),
    democratSponsors: Math.floor(rng() * 100),
    independentSponsors: Math.floor(rng() * 100),
    sponsorshipPercentageBar: {
      yays: {
        republican: Math.floor(rng() * 100),
        democrat: Math.floor(rng() * 100),
        independent: Math.floor(rng() * 100) + 1,
      },
      nays: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100),
        independent: Math.floor(rng() * 100) + 1,
      },
      other: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100) + 1,
      },
    },
    houseVoterPercentageBar: {
      yays: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100) + 0.5,
      },
      nays: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100) + 0.5,
      },
      other: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100),
      },
    },
    senateVoterPercentageBar: {
      yays: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100),
      },
      nays: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100) + 1,
      },
      other: {
        republican: Math.floor(rng() * 100) + 1,
        democrat: Math.floor(rng() * 100) + 1,
        independent: Math.floor(rng() * 100),
      },
    },
    mediaCoverage: "Media Coverage " + rng().toString(36).substring(2, 15),
    linkToPdf: new URL("https://www.google.com"),
  };
  return billInfo;
}

export function createDummyBillInfo(): Bill {
  const billInfo: Bill = {
    id: crypto.randomUUID(),
    name: "Bill" + Math.random().toString(36).substring(2, 15),
    committeeOrigination:
      "Committee" + Math.random().toString(36).substring(2, 15),

    sponsors: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => {
      return {
        name: "Sponsor" + Math.random().toString(36).substring(2, 15),
        party:
          Math.random() < 0.33
            ? "Republican"
            : Math.random() < 0.66
              ? "Democrat"
              : "Independent",
      };
    }),
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    statusHistory: Array.from(
      { length: Math.floor(Math.random() * 10) + 1 },
      () => {
        return getRandomElement([
          "Introduced",
          "House",
          "Senate",
          "President",
          "Failed",
          "Passed",
        ]);
      },
    ),
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
        independent: Math.floor(Math.random() * 100),
      },
    },
    senateVoterPercentageBar: {
      yays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100),
      },
      nays: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100) + 1,
      },
      other: {
        republican: Math.floor(Math.random() * 100) + 1,
        democrat: Math.floor(Math.random() * 100) + 1,
        independent: Math.floor(Math.random() * 100),
      },
    },
    mediaCoverage:
      "Media Coverage " + Math.random().toString(36).substring(2, 15),
    linkToPdf: new URL("https://www.google.com"),
  };
  return billInfo;
}

export function getRandomElement<T>(array: T[]): NonNullable<T> {
  return array[Math.floor(Math.random() * array.length)]!;
}
