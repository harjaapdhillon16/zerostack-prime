"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { heroScroll } from "@/lib/hero-scroll";
import { useDeviceTier, useReducedMotion } from "@/lib/hooks";

/**
 * The light hero's 3D layer: frosted-glass prisms drifting through a pastel
 * light field, with a few floating product-UI cards among them.
 *
 * Real refraction: the prisms are MeshPhysicalMaterial with transmission, and
 * they bend an in-scene gradient backdrop as they rotate. Low-tier devices get
 * plain translucent panes instead — same composition, a fraction of the cost.
 *
 * Animation: slow per-panel float and rotation (time), pointer parallax on the
 * whole group, and a scroll-exit driven by `heroScroll.p` — as the hero leaves
 * the viewport the field lifts, spreads, and fades.
 */

type PanelDef = {
  pos: [number, number, number];
  size: [number, number];
  rot: [number, number, number];
  tint: string;
  floatSpeed: number;
  phase: number;
};

/**
 * Full-bleed backdrop composition: large, calm shards distributed across the
 * whole frame (weighted to the upper two-thirds so the lower-left text field
 * stays quiet). Texture, not a focal object.
 */
const PANELS: PanelDef[] = [
  { pos: [-5.2, 2.4, -2.4], size: [3.4, 4.6], rot: [0.03, 0.25, 0.4], tint: "#ffffff", floatSpeed: 0.28, phase: 0.0 },
  { pos: [0.4, 3.0, -3.0], size: [2.8, 3.8], rot: [-0.03, -0.15, 0.4], tint: "#defcf4", floatSpeed: 0.24, phase: 1.7 },
  { pos: [5.4, 2.1, -2.2], size: [3.0, 4.2], rot: [0.04, -0.3, 0.4], tint: "#fff3dc", floatSpeed: 0.3, phase: 3.1 },
  { pos: [7.6, -0.6, -2.8], size: [2.4, 3.2], rot: [0.0, -0.35, 0.4], tint: "#e3f2fb", floatSpeed: 0.26, phase: 4.4 },
  { pos: [-7.8, -0.4, -3.2], size: [2.2, 3.0], rot: [0.05, 0.35, -0.36], tint: "#defcf4", floatSpeed: 0.22, phase: 0.9 },
  { pos: [2.9, 0.6, -1.6], size: [1.6, 2.2], rot: [0.06, -0.4, 0.4], tint: "#ffffff", floatSpeed: 0.34, phase: 5.6 },
  { pos: [-2.4, 1.5, -1.9], size: [1.4, 2.0], rot: [-0.04, 0.3, 0.4], tint: "#fff1d6", floatSpeed: 0.32, phase: 2.3 },
];

/* ---------------- backdrop gradient, in-scene so glass can refract it ---------------- */

const backdropFragment = /* glsl */ `
precision highp float;
varying vec2 vUv;

void main() {
  // Pale amber upper-left drifting through paper into pale teal lower-right.
  vec3 paper = vec3(0.957, 0.961, 0.973);
  vec3 amber = vec3(1.000, 0.937, 0.839);
  vec3 teal  = vec3(0.855, 0.980, 0.953);
  vec3 sky   = vec3(0.875, 0.930, 0.973);

  float diag = clamp(vUv.x * 0.7 + (1.0 - vUv.y) * 0.5, 0.0, 1.0);
  vec3 col = mix(amber, paper, smoothstep(0.0, 0.45, diag));
  col = mix(col, sky, smoothstep(0.35, 0.75, diag) * 0.7);
  col = mix(col, teal, smoothstep(0.6, 1.0, diag));

  gl_FragColor = vec4(col, 1.0);
}
`;

const backdropVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const pSmooth = useRef(0);
  const pointerEased = useRef(new THREE.Vector2());
  const tier = useDeviceTier();
  const reducedMotion = useReducedMotion();

  const { panelGeos, panelMats } = useMemo(() => {
    const panelGeos = PANELS.map((def) => new THREE.BoxGeometry(def.size[0], def.size[1], 0.14));

    const panelMats = PANELS.map((def) => {
      if (tier === "high") {
        return new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(def.tint),
          metalness: 0,
          roughness: 0.24,
          transmission: 0.92,
          thickness: 0.55,
          ior: 1.45,
          clearcoat: 0.55,
          clearcoatRoughness: 0.3,
          transparent: true,
          side: THREE.DoubleSide,
        });
      }
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(def.tint),
        transparent: true,
        opacity: 0.42,
        roughness: 0.4,
        metalness: 0,
        side: THREE.DoubleSide,
      });
    });

    return { panelGeos, panelMats };
  }, [tier]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    // Scroll-exit progress, smoothed.
    const target = reducedMotion ? 0 : heroScroll.p;
    pSmooth.current = THREE.MathUtils.damp(pSmooth.current, target, 8, delta);
    const p = pSmooth.current;

    // Pointer parallax on the whole field.
    pointerEased.current.x = THREE.MathUtils.damp(pointerEased.current.x, state.pointer.x, 2.5, delta);
    pointerEased.current.y = THREE.MathUtils.damp(pointerEased.current.y, state.pointer.y, 2.5, delta);

    // Whisper-level parallax — backdrop texture, not a focal object.
    group.rotation.y = pointerEased.current.x * 0.03;
    group.rotation.x = -pointerEased.current.y * 0.02;
    group.position.y = p * 1.4;

    // Per-panel drift: slow bob, near-still rotation, gentle exit spread.
    group.children.forEach((child) => {
      const data = child.userData as { def?: PanelDef };
      if (!data.def) return;
      const def = data.def;
      const [bx, by, bz] = def.pos;

      const bob = reducedMotion ? 0 : Math.sin(t * def.floatSpeed + def.phase) * 0.09;
      const spread = 1 + p * 0.18;
      child.position.set(bx * spread, by * spread + bob, bz);

      if (!reducedMotion) {
        child.rotation.z = def.rot[2] + Math.sin(t * 0.08 + def.phase) * 0.03 + p * 0.08;
        child.rotation.y = def.rot[1] + Math.cos(t * 0.07 + def.phase) * 0.04;
        child.rotation.x = def.rot[0];
      }

      const mat = (child as THREE.Mesh).material as THREE.Material & { opacity: number };
      const base = tier === "high" ? 1 : 0.42;
      mat.opacity = base * (1 - p * 0.85);
    });
  });

  return (
    <>
      {/* Light rig: warm key from upper-left, cool fill from the right. */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[-4, 6, 6]} intensity={1.15} color="#fff4e0" />
      <directionalLight position={[7, 2, 4]} intensity={0.5} color="#d9f4ff" />

      {/* In-scene gradient backdrop — the thing the glass refracts. */}
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[34, 20]} />
        <shaderMaterial vertexShader={backdropVertex} fragmentShader={backdropFragment} depthWrite={false} />
      </mesh>

      <group ref={groupRef}>
        {PANELS.map((def, i) => (
          <mesh
            key={`p${i}`}
            geometry={panelGeos[i]}
            material={panelMats[i]}
            position={def.pos}
            rotation={def.rot}
            userData={{ def }}
          />
        ))}
      </group>
    </>
  );
}
