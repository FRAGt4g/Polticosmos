import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { type Group, Mesh, type MeshLambertMaterial, Scene } from "three";
import type { StarObject } from "~/lib/types";
import { useCosmosContext } from "../providers/cosmos-provider";
import NameOverlay from "./NameOverlay";
import { usePreferences } from "../providers/preferences-provider";

function cloneWithUniqueMaterials(scene: any) {
    const clone = scene.clone(true);
  
    clone.traverse((obj: any) => {
      if (obj.isMesh) {
        // Duplicate the material so it’s not shared
        obj.material = obj.material.clone();
      }
    });
  
    return clone;
  }
  

const StarModel = ({
  position,
  scale,
  h,
  s,
  l,
  name,
  index,
  ...starProps
}: StarObject & { index: number }) => {
  const { scene } = useGLTF("/models/Star.glb");
  const { selectBill } = useCosmosContext();
  const meshRef = useRef<Group>(null);

  const handleClick = () => {
    selectBill(starProps.billId);
  };

  const clonedScene = cloneWithUniqueMaterials(scene);

  // Create the full star object
  const starObject: StarObject = {
    position,
    scale,
    h, s, l,
    name,
    ...starProps,
  };

  const [randomRotation, _] = useState<[number, number, number]>([Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI]);
  clonedScene.traverse((c:any) => {
    if (c instanceof Mesh) {
        (c.material as MeshLambertMaterial).emissive.setHSL(h, s, l); 
    }
  })  
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
