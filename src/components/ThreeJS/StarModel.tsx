import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type { StarObject } from "~/lib/types";
import NameOverlay from "./NameOverlay";
import { usePreferences } from "../providers/preferences-provider";

const StarModel = ({
  position,
  scale,
  name,
  index,
  ...starProps
}: StarObject & { index: number }) => {
  const { scene } = useGLTF("/models/Star.glb");
  const { shouldShowTitle, setShouldShowTitle } = usePreferences();
  const meshRef = useRef<Group>(null);

  const handleClick = () => {
    console.log(`Star clicked! Name: ${name}, Index in matrix: ${index}`);
  };

  const clonedScene = scene.clone();

  // Create the full star object
  const starObject: StarObject = {
    position,
    scale,
    name,
    ...starProps
  };

  const randomRotation = [Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI];


  return (
    <>
      <primitive
        ref={meshRef}
        object={clonedScene}
        position={position}
        rotation={randomRotation}
        scale={scale}
        onClick={handleClick}
      />
      <NameOverlay 
        star={starObject}
        position={position}
        maxDistance={8}
        offset={scale * 0.7}
      />
    </>
  );
};

export default StarModel;
