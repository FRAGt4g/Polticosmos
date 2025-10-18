import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import type { StarObject } from "~/lib/types";

const StarModel = ({
  position,
  scale,
  index,
}: StarObject & { index: number }) => {
  const { scene } = useGLTF("/models/Star.glb");
  const meshRef = useRef<Group>(null);

  const handleClick = () => {
    console.log(`Star clicked! Index in matrix: ${index}`);
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
