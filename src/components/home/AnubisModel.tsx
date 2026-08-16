import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

/** Path to the CC0 Anubis GLB model (bundled locally in /public/models).
 *  Swap this constant to load a different Anubis model without touching the scene. */
export const ANUBIS_MODEL_PATH = "/models/anubis.glb";

const EYE_GLOW = "#ffb84d";
const EYE_GLOW_COOL = "#ffd98c";

interface AnubisModelProps {
  /** 0..1 intensity factor for the eye glow pulse */
  glow?: number;
}

/**
 * Loads the real Anubis GLB and upgrades its materials for a cinematic look:
 *  - gold trim gets real metallic reflections (envMapIntensity)
 *  - the sculpted eyes become amber emissive (pulses via `glow`)
 *  - black surfaces keep a subtle, non-flat roughness
 */
export function AnubisModel({ glow = 0.6 }: AnubisModelProps) {
  const { scene } = useGLTF(ANUBIS_MODEL_PATH);
  const eyeMats = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const eyes: THREE.MeshStandardMaterial[] = [];
    scene.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        const m = mat as THREE.MeshStandardMaterial;
        if (!m) continue;
        const name = (mat.name || "").toLowerCase();
        if (name.includes("eye")) {
          m.emissive = new THREE.Color(EYE_GLOW);
          m.emissiveIntensity = 1.6;
          m.color = new THREE.Color("#0b0e18");
          m.roughness = 0.35;
          m.metalness = 0.1;
          m.needsUpdate = true;
          eyes.push(m);
        } else {
          m.envMapIntensity = 1.6;
          m.roughness = THREE.MathUtils.clamp(m.roughness ?? 0.5, 0.28, 0.6);
          m.needsUpdate = true;
        }
      }
    });
    eyeMats.current = eyes;
    scene.userData.__hasMeshes = true;
    return () => {
      eyeMats.current = [];
    };
  }, [scene]);

  // Drive the eye emissive pulse each frame via a lightweight rAF loop.
  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const s = Math.sin(now * 0.0012) * 0.5 + 0.5;
      const intensity = 1.5 + s * 1.4 * (glow ?? 0.6);
      for (const m of eyeMats.current) {
        m.emissive = new THREE.Color(EYE_GLOW).lerp(new THREE.Color(EYE_GLOW_COOL), s * 0.35);
        m.emissiveIntensity = intensity;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [glow]);

  return <primitive object={scene} dispose={null} />;
}

useGLTF.preload(ANUBIS_MODEL_PATH);
