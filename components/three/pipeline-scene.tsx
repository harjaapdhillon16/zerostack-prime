"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useDeviceTier, useReducedMotion } from "@/lib/hooks";
import { POINT_DISC } from "./glsl";

/**
 * The build pipeline: packets of work flowing through three gates.
 *
 *   raw intent → [ ai.generate ] → [ engineer.review ] → [ ci.test ] → shipped
 *
 * The honest detail is at the review gate: a fixed share of packets get
 * rejected — they flush red, fall off the line, and fade before the test gate.
 * Quality control you can *watch* is worth more than a paragraph claiming it.
 */

const SPAN = 13;
const GATE_X = [-2.6, 0, 2.6] as const;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;

attribute float aSeed;
attribute vec2  aLane;
attribute float aReject;
attribute float aScale;

varying float vStage;
varying float vReject;
varying float vFade;
varying float vScale;

void main() {
  float speed = 0.045 + fract(aSeed * 7.13) * 0.04;
  float prog = fract(aSeed + uTime * speed);
  float x = prog * 13.0 - 6.5;
  float y = aLane.x;
  float z = aLane.y;

  float g1 = smoothstep(-2.65, -2.55, x);
  float g2 = smoothstep(-0.05, 0.05, x);
  float g3 = smoothstep(2.55, 2.65, x);
  vStage = g1 + g2 + g3;

  // Rejected packets fall off the line after review and fade before the
  // test gate ever sees them.
  vReject = aReject * g2;
  float pastReview = max(0.0, x);
  y -= aReject * pastReview * pastReview * 0.38;
  vFade = 1.0 - aReject * smoothstep(0.9, 2.4, x);

  // Surviving work tightens into a disciplined beam after review.
  float ordered = g2 * (1.0 - aReject);
  y = mix(y, y * 0.45, ordered);
  z = mix(z, z * 0.45, ordered);

  // Pre-review wobble: raw work is unruly.
  float loose = 1.0 - g2;
  y += sin(uTime * 1.4 + aSeed * 43.0) * 0.07 * loose;
  z += cos(uTime * 1.1 + aSeed * 31.0) * 0.05 * loose;

  vec4 mv = modelViewMatrix * vec4(x, y, z, 1.0);
  vScale = aScale;
  gl_PointSize = max(1.0, uSize * aScale * (10.0 / -mv.z));
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform float uOpacity;

varying float vStage;
varying float vReject;
varying float vFade;
varying float vScale;

${POINT_DISC}

// Light-ground palette: gray raw work, teal generated, deep teal reviewed,
// near-black shipped. Red rejects. Normal blending — ink on paper.
const vec3 C_RAW    = vec3(0.62, 0.66, 0.71);
const vec3 C_TEAL   = vec3(0.051, 0.620, 0.514);
const vec3 C_DEEP   = vec3(0.039, 0.478, 0.400);
const vec3 C_CARBON = vec3(0.051, 0.059, 0.071);
const vec3 C_REJECT = vec3(0.839, 0.271, 0.271);

void main() {
  float core = pointDisc();
  float glow = pow(core, 1.8);

  vec3 c = C_RAW;
  c = mix(c, C_TEAL, clamp(vStage, 0.0, 1.0));
  c = mix(c, C_DEEP, clamp(vStage - 1.0, 0.0, 1.0));
  c = mix(c, C_CARBON, clamp(vStage - 2.0, 0.0, 1.0) * 0.85);
  c = mix(c, C_REJECT, vReject);

  float alpha = glow * vFade * uOpacity * (0.55 + vScale * 0.45);
  gl_FragColor = vec4(c, alpha);
}
`;

function Gate({ x, color, speed }: { x: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.x = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[1.05, 0.012, 12, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

export function PipelineScene() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const tier = useDeviceTier();
  const reducedMotion = useReducedMotion();

  const count = tier === "low" ? 2400 : 6000;

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const lane = new Float32Array(count * 2);
    const reject = new Float32Array(count);
    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      seed[i] = Math.random();
      // Lanes form a loose ribbon around the axis.
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.6) * 0.85;
      lane[i * 2] = Math.sin(a) * r;
      lane[i * 2 + 1] = Math.cos(a) * r * 0.7;
      // 14% of generated work does not survive engineer review.
      reject[i] = Math.random() < 0.14 ? 1 : 0;
      scale[i] = 0.4 + Math.random() * 0.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geo.setAttribute("aLane", new THREE.BufferAttribute(lane, 2));
    geo.setAttribute("aReject", new THREE.BufferAttribute(reject, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 16);

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: reducedMotion ? 40 : 0 },
        uSize: { value: tier === "low" ? 3.8 : 4.6 },
        uOpacity: { value: 0 },
      },
    };
  }, [count, tier, reducedMotion]);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    if (!reducedMotion) mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uOpacity.value = THREE.MathUtils.damp(mat.uniforms.uOpacity.value, 1, 1.8, delta);
    if (reducedMotion) mat.uniforms.uOpacity.value = 1;

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.26 + state.pointer.x * 0.05;
      groupRef.current.rotation.x = -0.05 - state.pointer.y * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      <Gate x={GATE_X[0]} color="#0d9e83" speed={0.25} />
      <Gate x={GATE_X[1]} color="#a96a00" speed={-0.18} />
      <Gate x={GATE_X[2]} color="#12151a" speed={0.12} />
    </group>
  );
}
