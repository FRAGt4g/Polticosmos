"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CustomPointerLockControls from "~/components/ThreeJS/CustomControls";
import StarField from "~/components/ThreeJS/StarField";
import type { StarMatrix } from "~/lib/types";

const ThreeJSScene = () => {
  const starMatrix: StarMatrix = {
    objects: [
      { position: [0, 0, 0], scale: 0.1, billId: "1" },
      { position: [3, 1, -2], scale: 0.8, billId: "2" },
      { position: [-2, -1, 1], scale: 1.2, billId: "3" },
      { position: [1, 2, -3], scale: 0.6, billId: "4" },
      { position: [-3, 0, 2], scale: 0.9, billId: "5" },
      { position: [2, -2, -1], scale: 1.1, billId: "6" },
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
