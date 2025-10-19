"use client";

import { useEffect } from "react";
import { getAllReps } from "./api/safeFetches";

export default function HomePage() {
  useEffect(() => {
    console.log("HomePage");

    async function bar() {
      const reps = await getAllReps();
      console.log("Reps: ", reps);

      const rep = reps.find((rep) => {
        for (const [key, value] of Object.entries(rep)) {
          if (value === "Rep00067") {
            return true;
          }
        }
        return false;
      });
      if (rep) {
        console.log("Rep: ", rep);
      } else {
        console.log("Rep not found");
      }
    }

    void bar();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#] to-[#15162c] text-white"></main>
  );
}
