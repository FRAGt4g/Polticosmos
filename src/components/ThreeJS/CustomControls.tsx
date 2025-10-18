import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const CustomPointerLockControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<PointerLockControls | null>(null);
  const keysRef = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });
  const velocityRef = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    const controls = new PointerLockControls(camera, gl.domElement);
    controlsRef.current = controls;

    const handleClick = () => {
      controls.lock();
    };

    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === gl.domElement;
      if (isLocked) {
        console.log("Pointer locked");
      } else {
        console.log("Pointer unlocked");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.pointerLockElement !== gl.domElement) return;

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
      if (document.pointerLockElement !== gl.domElement) return;
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

    gl.domElement.addEventListener("click", handleClick);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame((state, delta) => {
    if (!controlsRef.current || document.pointerLockElement !== gl.domElement)
      return;

    const moveSpeed = 5;
    const acceleration = 15;
    const deceleration = 8;
    const maxSpeed = moveSpeed;

    const keys = keysRef.current;
    const velocity = velocityRef.current;

    const desiredVelocity = new Vector3(0, 0, 0);

    // Get camera direction vectors
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    // Create perpendicular direction (right vector)
    const rightDirection = new Vector3();
    rightDirection.crossVectors(cameraDirection, camera.up).normalize();

    // Calculate movement based on camera orientation
    if (keys.w) {
      desiredVelocity.add(cameraDirection.clone().multiplyScalar(1));
    }
    if (keys.s) {
      desiredVelocity.add(cameraDirection.clone().multiplyScalar(-1));
    }
    if (keys.a) {
      desiredVelocity.add(rightDirection.clone().multiplyScalar(-1));
    }
    if (keys.d) {
      desiredVelocity.add(rightDirection.clone().multiplyScalar(1));
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
