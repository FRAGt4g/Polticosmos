"use client";

import { Text3D } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useLayoutEffect } from "react";
import CustomPointerLockControls from "~/components/ThreeJS/CustomControls";
import StarField from "~/components/ThreeJS/StarField";
import * as THREE from "three";
import { type Scene } from "three";

// --- DATA -------------------------------------------------------------

const positionsText = `-433.68164 -112.96144 68.44311
78.70852 -143.03197 -8.715511
-84.04409 -158.4275 -23.762434
-49.806576 -62.835995 -50.568874
24.926613 1.1766096 25.22443
143.05856 -89.93223 -88.95038
-128.69478 12.646793 -36.71417
38.566765 84.53867 -184.66096
130.70018 8.056735 -5.58302
16.425337 -36.163513 -139.49815
90.409424 -46.583008 115.71337
237.11684 36.449005 35.963318
-80.70396 64.93296 62.35019
56.625484 123.29876 -8.778542
-56.916924 233.66588 36.999287
-231.84839 -11.839987 22.781342
29.595827 -65.8766 -37.663177
-13.710571 15.559229 164.47842
-25.583332 115.50704 -133.53133
-90.66271 -38.337334 32.442574`;

const labels = [
  "Legislation & Policy", "Criminal Justice & Law Enforcement", "Economic & Fiscal Policy",
  "Healthcare & Public Health", "Social & Civil Rights", "Environmental & Energy Policy",
  "National Security & Defense", "Education & Workforce Development", "Immigration & Border Security",
  "Foreign Relations & Diplomacy", "Technology & Innovation", "Veterans Affairs", "Taxation & Budget",
  "Housing & Urban Development", "Transportation & Infrastructure", "Labor & Employment",
  "Agriculture & Rural Development", "Disaster Relief & Recovery", "Consumer Protection & Safety",
  "Family & Social Services"
];

// Default font (make sure it's in /public/fonts/)
const DEFAULT_FONT_URL = "/fonts/helvetiker_regular.typeface.json";

// --- HELPERS -------------------------------------------------------------

function parsePositions(txt: string): [number, number, number][] {
  return txt
    .trim()
    .split(/\n+/)
    .map((line) => {
      const parts = line.trim().split(/\s+/).map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) {
        console.warn("Skipping invalid position line:", line);
        return [0, 0, 0] as [number, number, number];
      }
      return [parts[0], parts[1], parts[2]] as [number, number, number];
    });
}

type LabelProps = {
  text: string;
  position: [number, number, number];
  fontUrl?: string;
  size?: number;
  height?: number;
  color?: string;
  faceCamera?: boolean;
};

// --- LABEL COMPONENT -----------------------------------------------------

function Label3D({
  text,
  position,
  fontUrl = DEFAULT_FONT_URL,
  size = 10,
  height = 2,
  color = "#ffffff",
  faceCamera = false,
}: LabelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (faceCamera && meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      const camPos = camera.position.clone();
      const lookAt = camPos.sub(worldPos);
      const angle = Math.atan2(lookAt.x, lookAt.z);
      meshRef.current.rotation.set(0, angle, 0);
    }
  });
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.center();
    }
  }, [text]);
  return (
    <group position={position}>
      <Text3D
        ref={meshRef}
        font={fontUrl}
        size={size}
        height={height}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.5}
        bevelSize={0.3}
        bevelOffset={0}
        bevelSegments={3}
      >
        {text}
        <meshStandardMaterial
          attach="material"
          color={color}
          metalness={0.2}
        />
      </Text3D>
    </group>
  );
}

// --- MAIN SCENE ----------------------------------------------------------

const ThreeJSScene = () => {
  const positions = useMemo(() => parsePositions(positionsText), []);
  const faceCamera = false;

  const colors = useMemo(() => {
    const palette = [
      "#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec",
      "#ffb703", "#8ac926", "#1982c4", "#6a4c93", "#ff6b6b",
    ];
    return labels.map((_, i) => palette[i % palette.length]);
  }, []);

  const sceneRef = useRef<Scene|undefined>(undefined);

  return (
    <div className="h-screen w-full">
      <Canvas onCreated={({scene}) => sceneRef.current = scene} camera={{ position: [0, 0, 500], fov: 60 }} style={{ background: "#000011" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <StarField />

          {labels.map((lbl, i) => (
            <Label3D
              key={i}
              text={lbl}
              position={positions[i] ?? [0, 0, 0]}
              fontUrl={DEFAULT_FONT_URL}
              size={5}
              height={2}
              color={colors[i]}
              faceCamera={faceCamera}
            />
          ))}

          <CustomPointerLockControls sceneRef={sceneRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSScene;
