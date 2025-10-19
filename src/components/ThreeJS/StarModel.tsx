import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import type { StarObject } from "~/lib/types";
import { createDummyBillInfoSeeded } from "~/lib/utils";
import { useCosmosContext } from "../providers/cosmos-provider";

const StarModel = ({ position, scale, billId }: StarObject) => {
  const { setSelectedBill } = useCosmosContext();
  const { scene } = useGLTF("/models/Star.glb");
  const meshRef = useRef<Group>(null);

  const handleClick = () => {
    console.log(`Star clicked! Bill ID: ${billId}`);
    setSelectedBill(createDummyBillInfoSeeded(Number(billId)));
  };

  const clonedScene = scene.clone();

  return (
    <primitive
      ref={meshRef}
      object={clonedScene}
      position={position}
      scale={scale}
      onClick={handleClick}
    />
  );
};

export default StarModel;
