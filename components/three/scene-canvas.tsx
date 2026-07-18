"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, useState, type ReactNode } from "react";
import { useDeviceTier, useInView, useReducedMotion } from "@/lib/hooks";

type SceneCanvasProps = {
  children: ReactNode;
  /** Shown until the scene mounts, and permanently if WebGL is unavailable. */
  fallback?: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
  interactive?: boolean;
};

/**
 * Shared wrapper for every WebGL scene, so four canvases share one set of rules:
 *
 *  - nothing mounts until it nears the viewport
 *  - pixel ratio is capped, harder on weak devices
 *  - "reduce motion" renders one frame and stops the loop
 *  - a lost WebGL context degrades to the fallback, never a blank hole
 */
export function SceneCanvas({
  children,
  fallback,
  className,
  camera = { position: [0, 0, 6], fov: 45 },
  interactive = false,
}: SceneCanvasProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const tier = useDeviceTier();
  const [failed, setFailed] = useState(false);

  // Wait for the tier probe so a phone never briefly mounts the full-fat scene.
  const ready = inView && tier !== "unknown" && !failed;

  return (
    <div
      ref={ref}
      className={className}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
      aria-hidden="true"
    >
      {fallback ? (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: ready ? 0 : 1 }}
        >
          {fallback}
        </div>
      ) : null}

      {ready ? (
        <Canvas
          className="!absolute inset-0"
          camera={camera}
          dpr={tier === "low" ? 1 : [1, 1.75]}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{
            antialias: tier === "high",
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setFailed(true);
            });
          }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
