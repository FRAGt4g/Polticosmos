"use client";

import { useEffect } from "react";
import { getBills, getBillsFromRep } from "./api/safeFetches";

export default function HomePage() {
  useEffect(() => {
    console.log("HomePage");

    async function bar() {
      const bills = await getBills({ congress: 119 });
      const bill = bills[0];
      console.log("Bills: ", bills);

      const billsFromRep = await getBillsFromRep(bill!.sponsors[0]!);
      console.log("Bills from rep: ", billsFromRep);
    }

    void bar();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#] to-[#15162c] text-white"></main>
  );
}
