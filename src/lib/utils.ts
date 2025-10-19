import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Bill } from "./types";
import { BillState, BillTypes } from "./types";

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

export function parseBillStates(states: string): BillState[] {
  return (
    states
      .substring(1, states.length - 1)
      .split(",")
      // .map((state) => HumanReadableBillStates[state.trim() as BillState])
      .reverse()
      .filter(
        (state, index) => !(state === "introduced" && index !== 0),
      ) as unknown as BillState[]
  );
}

export function parseRepString(repName: string): string {
  const names = repName
    .substring(repName.indexOf("Rep. ") + 5, repName.indexOf("["))
    .split(",")
    .map((name) => name.trim());

  return names[1] + " " + names[0];
}

export function formatBillStatus(status: BillState): string {
  return status
    .replaceAll("_", ": ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function createDummyBillInfoSeeded(seed: number): Bill {
  const rng = createSeededRandom(seed);

  const billInfo: Bill = {
    uid: crypto.randomUUID(),
    title: "Bill" + rng().toString(36).substring(2, 15),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    congress: Math.floor(rng() * 100) + 1,
    type: getRandomElement(Array.from(BillTypes)),
    number: Math.floor(rng() * 1000) + 1,
    committees: Array.from({ length: Math.floor(rng() * 3) + 1 }, () => {
      return "Committee" + rng().toString(36).substring(2, 15);
    }),
    sponsors: Array.from({ length: Math.floor(rng() * 3) + 1 }, () => {
      return "Sponsor" + rng().toString(36).substring(2, 15);
    }),
    cosponsors: Array.from({ length: Math.floor(rng() * 20) + 1 }, () => {
      return "Cosponsor" + rng().toString(36).substring(2, 15);
    }),
    states: Array.from({ length: Math.floor(rng() * 10) + 1 }, () => {
      return getRandomElement(Array.from(BillState));
    }),
    last_transition: new Date(),
    house_vote: crypto.randomUUID(),
    senate_vote: crypto.randomUUID(),
  };
  return billInfo;
}

// export function createDummyBillInfo(): Bill {
//   const billInfo: Bill = {
//     id: crypto.randomUUID(),
//     name: "Bill" + Math.random().toString(36).substring(2, 15),
//     committeeOrigination:
//       "Committee" + Math.random().toString(36).substring(2, 15),

//     sponsors: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
//       return {
//         name: "Sponsor" + Math.random().toString(36).substring(2, 15),
//         party:
//           Math.random() < 0.33
//             ? "Republican"
//             : Math.random() < 0.66
//               ? "Democrat"
//               : "Independent",
//       };
//     }),
//     cosponsors: Array.from(
//       { length: Math.floor(Math.random() * 20) + 1 },
//       () => {
//         return {
//           name: "Cosponsor" + Math.random().toString(36).substring(2, 15),
//           party:
//             Math.random() < 0.33
//               ? "Republican"
//               : Math.random() < 0.66
//                 ? "Democrat"
//                 : "Independent",
//         };
//       },
//     ),
//     summary:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     statusHistory: Array.from(
//       { length: Math.floor(Math.random() * 10) + 1 },
//       () => {
//         return getRandomElement(Array.from(BillState));
//       },
//     ),
//     republicanSponsors: Math.floor(Math.random() * 100),
//     democratSponsors: Math.floor(Math.random() * 100),
//     independentSponsors: Math.floor(Math.random() * 100),
//     sponsorshipPercentageBar: {
//       yays: {
//         republican: Math.floor(Math.random() * 100),
//         democrat: Math.floor(Math.random() * 100),
//         independent: Math.floor(Math.random() * 100) + 1,
//       },
//       nays: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100),
//         independent: Math.floor(Math.random() * 100) + 1,
//       },
//       other: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100) + 1,
//       },
//     },
//     houseVoterPercentageBar: {
//       yays: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100) + 0.5,
//       },
//       nays: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100) + 0.5,
//       },
//       other: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100),
//       },
//     },
//     senateVoterPercentageBar: {
//       yays: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100),
//       },
//       nays: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100) + 1,
//       },
//       other: {
//         republican: Math.floor(Math.random() * 100) + 1,
//         democrat: Math.floor(Math.random() * 100) + 1,
//         independent: Math.floor(Math.random() * 100),
//       },
//     },
//     mediaCoverage:
//       "Media Coverage " + Math.random().toString(36).substring(2, 15),
//     linkToPdf: new URL("https://www.google.com"),
//   };
//   return billInfo;
// }

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
