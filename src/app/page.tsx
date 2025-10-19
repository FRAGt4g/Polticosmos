"use client";

import { useEffect } from "react";
import { getAllReps } from "./api/safeFetches";

export default function HomePage() {
  useEffect(() => {
    window.location.href = "/home";
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#] to-[#15162c] text-white"></main>
  );
}
