import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Raycaster, Vector2, Vector3 } from "three";
import { useCosmosContext } from "../providers/cosmos-provider";

const CustomPointerLockControls = () => {
  const { camera, gl } = useThree();
  const keysRef = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });
  const { paused } = useCosmosContext();
  const velocityRef = useRef(new Vector3(0, 0, 0));
  const targetLookAtRef = useRef<Vector3 | null>(null);
  const isPanningRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          keysRef.current.w = true;
          break;
        case "KeyA":
          keysRef.current.a = true;
          break;
        case "KeyS":
          keysRef.current.s = true;
          break;
        case "KeyD":
          keysRef.current.d = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          keysRef.current.w = false;
          break;
        case "KeyA":
          keysRef.current.a = false;
          break;
        case "KeyS":
          keysRef.current.s = false;
          break;
        case "KeyD":
          keysRef.current.d = false;
          break;
      }
    };

    const handleMouseClick = (event: MouseEvent) => {
      if (event.button === 0) {
        const rect = gl.domElement.getBoundingClientRect();
        const mouse = new Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Create raycaster from camera through mouse position
        const raycaster = new Raycaster();
        raycaster.setFromCamera(mouse, camera);

        // Calculate point in 3D space at a fixed distance
        const distance = 10; // Distance from camera to look at point
        const lookAtPoint = new Vector3();
        raycaster.ray.at(distance, lookAtPoint);

        // Set target for gentle panning
        targetLookAtRef.current = lookAtPoint;
        isPanningRef.current = true;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    gl.domElement.addEventListener("click", handleMouseClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      gl.domElement.removeEventListener("click", handleMouseClick);
    };
  }, [camera, gl]);

  useFrame((state, delta) => {
    // console.log("paused", paused);
    if (paused) return;

    const moveSpeed = 5;
    const acceleration = 15;
    const deceleration = 8;
    const maxSpeed = moveSpeed;

    const keys = keysRef.current;
    const velocity = velocityRef.current;

    // Handle gentle panning to target
    if (isPanningRef.current && targetLookAtRef.current) {
      const currentLookAt = new Vector3();
      camera.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(10).add(camera.position);

      // Smoothly interpolate to target
      const panSpeed = 2.0; // Adjust for faster/slower panning
      const lerpFactor = Math.min(panSpeed * delta, 1);

      currentLookAt.lerp(targetLookAtRef.current, lerpFactor);
      camera.lookAt(currentLookAt);

      // Check if we're close enough to target
      if (currentLookAt.distanceTo(targetLookAtRef.current) < 0.1) {
        isPanningRef.current = false;
        targetLookAtRef.current = null;
      }
    }

    const desiredVelocity = new Vector3(0, 0, 0);

    // Get camera direction vectors based on current camera rotation
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    // Create perpendicular direction (right vector)
    const rightDirection = new Vector3();
    rightDirection.crossVectors(cameraDirection, camera.up).normalize();

    // Calculate movement based on camera orientation
    if (keys.w) {
      desiredVelocity.add(cameraDirection.clone().multiplyScalar(1));
      isPanningRef.current = false;
    }
    if (keys.s) {
      desiredVelocity.add(cameraDirection.clone().multiplyScalar(-1));
      isPanningRef.current = false;
    }
    if (keys.a) {
      desiredVelocity.add(rightDirection.clone().multiplyScalar(-1));
      isPanningRef.current = false;
    }
    if (keys.d) {
      desiredVelocity.add(rightDirection.clone().multiplyScalar(1));
      isPanningRef.current = false;
    }

    if (desiredVelocity.length() > 0) {
      desiredVelocity.normalize();
      desiredVelocity.multiplyScalar(maxSpeed);
    }

    const currentSpeed = velocity.length();
    const targetSpeed = desiredVelocity.length();

    if (targetSpeed > 0) {
      const lerpFactor = Math.min(acceleration * delta, 1);
      velocity.lerp(desiredVelocity, lerpFactor);
    } else if (currentSpeed > 0) {
      const decelFactor = Math.max(1 - deceleration * delta, 0);
      velocity.multiplyScalar(decelFactor);
    }

    if (velocity.length() > 0.01) {
      // Apply movement directly to camera position
      camera.position.add(velocity.clone().multiplyScalar(delta));
    } else {
      velocity.set(0, 0, 0);
    }
  });

  return null;
};

export default CustomPointerLockControls;
