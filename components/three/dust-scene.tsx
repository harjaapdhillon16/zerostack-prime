"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/hooks";
import { BRAND_GLSL, POINT_DISC } from "./glsl";

/**
 * Ambient dust for the closing CTA — the quietest scene on the site.
 * A sparse field drifting slowly upward, a handful of particles burning
 * brighter than the rest. After the pipeline and the stack, the ending
 * should feel like the machines have shipped and gone quiet.
 */

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
attribute float aSeed;
attribute float aScale;
varying float vScale;
varying float vBright;

void main() {
  vec3 pos = position;
  pos.y += fract(aSeed + uTime * 0.012) * 10.0 - 5.0;
  pos.x += sin(uTime * 0.2 + aSeed * 40.0) * 0.35;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vScale = aScale;
  vBright = step(0.96, aSeed);
  gl_PointSize = max(1.0, uSize * aScale * (10.0 / -mv.z));
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
precision highp float;
uniform float uOpacity;
varying float vScale;
varying float vBright;
${BRAND_GLSL}
${POINT_DISC}

void main() {
  float core = pointDisc();
  vec3 c = mix(C_DUST * 0.8, C_SIGNAL, vBright);
  float alpha = pow(core, 2.0) * uOpacity * mix(0.35, 0.95, vBright) * vScale;
  gl_FragColor = vec4(c, alpha);
}
`;

export function DustScene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const tier = useDeviceTier();

  const count = tier === "low" ? 350 : 800;

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = -Math.random() * 6;
      seed[i] = Math.random();
      scale[i] = 0.3 + Math.random() * 0.7;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 24);

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 2.6 },
        uOpacity: { value: 0 },
      },
    };
  }, [count]);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uOpacity.value = THREE.MathUtils.damp(mat.uniforms.uOpacity.value, 1, 1.5, delta);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
