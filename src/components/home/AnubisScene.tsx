import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Sparkles } from "@react-three/drei";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { AnubisModel } from "./AnubisModel";

const BASE_YAW = 0.22;
const MAX_YAW = 0.1;
const MAX_PITCH = 0.05;

function useStudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = new RoomEnvironment();
    const rt = pmrem.fromScene(env, 0.04);
    scene.environment = rt.texture;
    return () => {
      scene.environment = null;
      rt.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
}

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.position.set(0.5, 1.4, 5.3);
    camera.lookAt(0, 1.0, 0.3);
  }, [camera]);
  return null;
}

function AnubisFigure() {
  const group = useRef<THREE.Group>(null);
  const frames = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetYaw = BASE_YAW + THREE.MathUtils.clamp(state.pointer.x, -1, 1) * MAX_YAW;
    const targetPitch = -THREE.MathUtils.clamp(state.pointer.y, -1, 1) * MAX_PITCH;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetYaw, 1 - Math.exp(-delta * 2.4));
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetPitch, 1 - Math.exp(-delta * 2.4));
    g.position.y = Math.sin(t * 1.3) * 0.012;
    g.position.x = Math.sin(t * 0.7) * 0.006;

    // Verification hook: project the loaded model's bounding box to NDC once it is settled.
    if (frames.current < 90 && g.children.length > 0 && g.children[0].userData.__hasMeshes) {
      frames.current += 1;
      if (frames.current === 30) {
        const box = new THREE.Box3().setFromObject(g.children[0]);
        const corners = [
          new THREE.Vector3(box.min.x, box.min.y, box.min.z),
          new THREE.Vector3(box.max.x, box.min.y, box.min.z),
          new THREE.Vector3(box.min.x, box.max.y, box.min.z),
          new THREE.Vector3(box.max.x, box.max.y, box.min.z),
          new THREE.Vector3(box.min.x, box.min.y, box.max.z),
          new THREE.Vector3(box.max.x, box.min.y, box.max.z),
          new THREE.Vector3(box.min.x, box.max.y, box.max.z),
          new THREE.Vector3(box.max.x, box.max.y, box.max.z),
        ];
        const ndcMin = new THREE.Vector3(1, 1, 1);
        const ndcMax = new THREE.Vector3(-1, -1, -1);
        const cam = state.camera;
        for (const c of corners) {
          c.project(cam);
          ndcMin.min(c);
          ndcMax.max(c);
        }
        (window as unknown as Record<string, unknown>).__anubisDiagnostics = {
          boxSize: [box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z].map((n) => Number(n.toFixed(3))),
          ndcMin: ndcMin.toArray().map((n) => Number(n.toFixed(3))),
          ndcMax: ndcMax.toArray().map((n) => Number(n.toFixed(3))),
          camera: cam.position.toArray().map((n) => Number(n.toFixed(3))),
          fov: Number((cam as THREE.PerspectiveCamera).fov),
          aspect: Number((cam as THREE.PerspectiveCamera).aspect.toFixed(3)),
          canvasSize: [cam.aspect > 1 ? "w" : "h"].map((s) => s),
        };
      }
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Suspense fallback={null}>
        <AnubisModel glow={0.6} />
      </Suspense>
      <Staff />
    </group>
  );
}

function Staff() {
  const orb = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orb.current) orb.current.intensity = 1.5 + Math.sin(t * 1.6) * 0.5;
  });

  const gold = (
    <meshStandardMaterial color="#d9b24a" metalness={0.9} roughness={0.28} />
  );
  const obsidian = <meshStandardMaterial color="#0d1019" metalness={0.35} roughness={0.6} />;

  return (
    <group position={[0.72, -0.05, 0.05]} rotation={[0, 0, -0.015]}>
      {/* obsidian shaft */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.032, 0.04, 2.7, 24]} />
        {obsidian}
      </mesh>
      {/* gold collars */}
      {[-0.95, -0.4, 0.15, 0.7].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.042, 0.012, 10, 32]} />
          {gold}
        </mesh>
      ))}
      {/* gold lower ferrule */}
      <mesh position={[0, -1.06, 0]}>
        <coneGeometry args={[0.05, 0.16, 24]} />
        {gold}
      </mesh>
      {/* ornate top: crescent + rings */}
      <mesh position={[0, 1.32, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.02, 12, 40]} />
        {gold}
      </mesh>
      <mesh position={[0, 1.46, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.095, 0.016, 12, 40]} />
        {gold}
      </mesh>
      {/* cyan energy orb */}
      <mesh position={[0, 1.58, 0]}>
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshStandardMaterial
          color="#3fd8ff"
          emissive="#2ec5e6"
          emissiveIntensity={2.4}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>
      <pointLight ref={orb} position={[0, 1.58, 0]} intensity={1.5} color="#3fd8ff" distance={2.6} />
    </group>
  );
}

function Dais() {
  return (
    <group position={[0, -0.3, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.34, 1.5, 0.14, 64]} />
        <meshStandardMaterial color="#12141f" roughness={0.75} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.085, 0]}>
        <torusGeometry args={[1.34, 0.035, 12, 72]} />
        <meshStandardMaterial color="#d9b24a" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.86, 1.34, 64]} />
        <meshStandardMaterial color="#0d0f1a" roughness={0.8} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CinematicLights() {
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (key.current) key.current.intensity = 1.7 + Math.sin(t * 0.9) * 0.12;
    if (rim.current) rim.current.intensity = 0.9 + Math.sin(t * 0.7 + 1.3) * 0.15;
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#cbb26a" />
      <directionalLight
        ref={key}
        position={[-3.2, 5, 3.4]}
        intensity={1.7}
        color="#ffd9a0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight ref={rim} position={[2.6, 3.4, -2.8]} intensity={0.9} color="#ffb84d" distance={9} />
      <pointLight position={[-2.6, 0.5, 2.7]} intensity={0.55} color="#3fd8ff" distance={8} />
      <pointLight position={[0, 2.6, -3.2]} intensity={0.5} color="#33406e" distance={9} />
      <pointLight position={[0, 0.4, 3.1]} intensity={0.4} color="#e8c468" distance={7} />
    </>
  );
}

function Scene() {
  useStudioEnvironment();
  return (
    <>
      <CameraRig />
      <CinematicLights />
      <AnubisFigure />
      <Dais />
      <Sparkles count={22} scale={[2.6, 2.6, 1.8]} size={2.2} speed={0.3} opacity={0.5} color="#e8c468" position={[0, 1.1, 0.4]} />
      <ContactShadows position={[0, -0.46, 0]} opacity={0.66} scale={4.6} blur={2.8} far={2.2} color="#000000" />
      <fog attach="fog" args={["#0a0d1a", 6.8, 11.5]} />
    </>
  );
}

export default function AnubisScene() {
  const props = useMemo(
    () => ({
      dpr: [1, 1.75] as [number, number],
      camera: { position: [0.5, 1.4, 5.3] as [number, number, number], fov: 38 },
      shadows: true,
      gl: {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance" as WebGLPowerPreference,
      },
      style: { background: "transparent" as const },
    }),
    []
  );

  return (
    <Canvas {...props}>
      <Scene />
    </Canvas>
  );
}
