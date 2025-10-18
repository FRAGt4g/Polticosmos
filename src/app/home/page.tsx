"use client";

import { useEffect } from "react";
import { useCosmosContext } from "~/components/providers/cosmos-provider";
import Title from "~/components/Title";
import { createDummyBillInfo } from "~/lib/utils";
import ThreeJSScene from "./ThreeJSScene";

const Page = () => {
  const { setSelectedStar } = useCosmosContext();

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === " ") {
        setSelectedStar(createDummyBillInfo());
      }
    }

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <>
      <ThreeJSScene />
      <Title />
    </>
  );
};

export default Page;
