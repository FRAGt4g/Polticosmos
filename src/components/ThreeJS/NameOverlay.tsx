import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3, type Group } from "three";
import type { StarObject } from "~/lib/types";
import { useCosmosContext } from "../providers/cosmos-provider";

interface NameOverlayProps {
  star: StarObject;
  position: [number, number, number];
  maxDistance?: number;
  offset?: number;
}

const NameOverlay = ({
  star,
  position,
  maxDistance = 200,
  offset = 0.5,
}: NameOverlayProps) => {
  const { camera } = useThree();
  const { paused } = useCosmosContext();
  const [isVisible, setIsVisible] = useState(false);
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (paused) return;

    // Calculate distance from camera to star
    const starPosition = new Vector3(...position);
    const distance = camera.position.distanceTo(starPosition);

    // Show name if within maxDistance
    const shouldShow = distance <= maxDistance;
    setIsVisible(shouldShow);

    // Position the overlay below the star if visible and ref is available
    if (shouldShow && groupRef.current) {
      groupRef.current.position.set(
        position[0],
        position[1] - offset,
        position[2],
      );
    }
  });

  // Always render the group, but conditionally show the HTML content
  return (
    <group ref={groupRef}>
      {isVisible && (
        <Html center transform sprite distanceFactor={1} zIndexRange={[100, 0]}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "50px",
              fontWeight: "600",
              textAlign: "center",
              whiteSpace: "nowrap",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {star.name}
          </div>
        </Html>
      )}
    </group>
  );
};

export default NameOverlay;
