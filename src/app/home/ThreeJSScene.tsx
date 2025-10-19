"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CustomPointerLockControls from "~/components/ThreeJS/CustomControls";
import StarField from "~/components/ThreeJS/StarField";
import type { StarMatrix } from "~/lib/types";

const ThreeJSScene = () => {
  const starMatrix: StarMatrix = {
    objects: [
      { 
        position: [0, 0, 0], 
        scale: 0.5, 
        name: "Polaris"
      },
      { 
        position: [3, 1, -2], 
        scale: 0.8, 
        name: "Sirius"
      },
      { 
        position: [-2, -1, 1], 
        scale: 1.2, 
        name: "Betelgeuse"
      },
      { 
        position: [1, 2, -3], 
        scale: 0.6, 
        name: "Vega"
      },
      { 
        position: [-3, 0, 2], 
        scale: 0.9, 
        name: "Rigel"
      },
      { 
        position: [2, -2, -1], 
        scale: 1.1, 
        name: "Antares"
      },
    ],
  };

  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: "#000011" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <StarField matrix={starMatrix} />
          <CustomPointerLockControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSScene;
