"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CustomPointerLockControls from "~/components/ThreeJS/CustomControls";
import StarField from "~/components/ThreeJS/StarField";

const ThreeJSScene = () => {
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
          <StarField />
          <CustomPointerLockControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSScene;
