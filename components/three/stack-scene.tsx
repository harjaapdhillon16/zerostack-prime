"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks";
import { POINT_DISC } from "./glsl";

/**
 * The exploded stack: four wireframe strata — database, API, admin, app —
 * floating in register, with packets of data climbing the corner beams.
 * An engineering diagram rather than particle art; the contrast with the
 * hero is deliberate.
 */

type Layer = {
  y: number;
  w: number;
  d: number;
  h: number;
  color: string;
  opacity: number;
  /** Dot grid rendered on the top face — data rows for the DB, UI for the app. */
  grid: [number, number];
};

const LAYERS: Layer[] = [
  { y: 1.65, w: 1.35, d: 2.4, h: 0.09, color: "#12151a", opacity: 0.85, grid: [4, 8] },  // app
  { y: 0.55, w: 2.5, d: 1.65, h: 0.09, color: "#0d9e83", opacity: 0.85, grid: [7, 4] },  // admin
  { y: -0.55, w: 2.2, d: 1.5, h: 0.32, color: "#0a7a66", opacity: 0.75, grid: [5, 3] },  // api
  { y: -1.7, w: 2.75, d: 1.85, h: 0.5, color: "#5a6472", opacity: 0.8, grid: [9, 6] },   // db
];

const discVertex = /* glsl */ `
uniform float uSize;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = max(1.0, uSize * (10.0 / -mv.z));
  gl_Position = projectionMatrix * mv;
}
`;

const discFragment = /* glsl */ `
precision highp float;
uniform vec3 uColor;
uniform float uOpacity;
${POINT_DISC}
void main() {
  float core = pointDisc();
  gl_FragColor = vec4(uColor, pow(core, 1.8) * uOpacity);
}
`;

function LayerMesh({ layer, index }: { layer: Layer; index: number }) {
  const ref = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const { edges, dots, dotUniforms } = useMemo(() => {
    const box = new THREE.BoxGeometry(layer.w, layer.h, layer.d);
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();

    const [cols, rows] = layer.grid;
    const positions = new Float32Array(cols * rows * 3);
    let p = 0;
    for (let cx = 0; cx < cols; cx++) {
      for (let rz = 0; rz < rows; rz++) {
        positions[p++] = (cx / (cols - 1) - 0.5) * layer.w * 0.82;
        positions[p++] = layer.h / 2 + 0.02;
        positions[p++] = (rz / (rows - 1) - 0.5) * layer.d * 0.82;
      }
    }
    const dots = new THREE.BufferGeometry();
    dots.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return {
      edges,
      dots,
      dotUniforms: {
        uColor: { value: new THREE.Color(layer.color) },
        uOpacity: { value: layer.opacity * 0.8 },
        uSize: { value: 1.6 },
      },
    };
  }, [layer]);

  useFrame((state) => {
    if (ref.current && !reducedMotion) {
      ref.current.position.y = layer.y + Math.sin(state.clock.elapsedTime * 0.6 + index * 1.4) * 0.05;
    }
  });

  return (
    <group ref={ref} position={[0, layer.y, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={layer.color} transparent opacity={layer.opacity} />
      </lineSegments>
      <points geometry={dots}>
        <shaderMaterial
          uniforms={dotUniforms}
          vertexShader={discVertex}
          fragmentShader={discFragment}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

/** Packets of data climbing the four corner beams between DB and app. */
function Packets() {
  const ref = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const COUNT = 12;
  const { geometry, uniforms, meta } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const meta = Array.from({ length: COUNT }, (_, i) => ({
      corner: i % 4,
      phase: Math.random(),
      speed: 0.1 + Math.random() * 0.12,
    }));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 6);
    return {
      geometry: geo,
      meta,
      uniforms: {
        uColor: { value: new THREE.Color("#0d9e83") },
        uOpacity: { value: 0.9 },
        uSize: { value: 3.2 },
      },
    };
  }, []);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = reducedMotion ? 2 : state.clock.elapsedTime;
    // Beam corners interpolate between the DB footprint and the app footprint.
    for (let i = 0; i < COUNT; i++) {
      const m = meta[i];
      const prog = (t * m.speed + m.phase) % 1;
      const y = -1.7 + prog * 3.35;
      const sx = m.corner % 2 === 0 ? 1 : -1;
      const sz = m.corner < 2 ? 1 : -1;
      const w = THREE.MathUtils.lerp(1.25, 0.6, prog);
      const d = THREE.MathUtils.lerp(0.85, 1.1, prog);
      attr.setXYZ(i, sx * w, y, sz * d);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={discVertex}
        fragmentShader={discFragment}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

/** Faint vertical beams tying the strata together at the corners. */
function Beams() {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (const [sx, sz] of [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]) {
      positions.push(sx * 1.25, -1.7, sz * 0.85, sx * 0.6, 1.65, sz * 1.1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#0d9e83" transparent opacity={0.25} />
    </lineSegments>
  );
}

export function StackScene() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = (reducedMotion ? 0.6 : t * 0.12) + state.pointer.x * 0.12;
    g.rotation.x = 0.02 - state.pointer.y * 0.06;
  });

  return (
    <group ref={groupRef}>
      {LAYERS.map((layer, i) => (
        <LayerMesh key={layer.y} layer={layer} index={i} />
      ))}
      <Beams />
      <Packets />
    </group>
  );
}
