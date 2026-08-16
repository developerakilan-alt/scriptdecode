import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { SIGNS } from "@/lib/egypt";

const GLYPH_KEYS = Object.keys(SIGNS);

function drawEyeOfHorus(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.strokeStyle = "#e6c05a";
  ctx.fillStyle = "#e6c05a";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(-96, -58);
  ctx.lineTo(-38, -44);
  ctx.lineTo(-6, -62);
  ctx.lineTo(22, -46);
  ctx.lineTo(82, -64);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-112, -16);
  ctx.quadraticCurveTo(-16, -52, 62, -30);
  ctx.quadraticCurveTo(110, -18, 94, -2);
  ctx.quadraticCurveTo(98, 18, 32, 26);
  ctx.quadraticCurveTo(-18, 36, -72, 12);
  ctx.quadraticCurveTo(-112, -2, -112, -16);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(2, -4, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-50, 26);
  ctx.quadraticCurveTo(-34, 68, -4, 76);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(22, 24);
  ctx.quadraticCurveTo(38, 58, 64, 62);
  ctx.stroke();
  ctx.restore();
}

function makeStoneTextures() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1280;
  const ctx = c.getContext("2d")!;

  const g = ctx.createLinearGradient(0, 0, 0, 1280);
  g.addColorStop(0, "#4d5268");
  g.addColorStop(0.42, "#34394c");
  g.addColorStop(1, "#1d2131");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 1280);

  for (let i = 0; i < 11000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1280;
    const a = 0.015 + Math.random() * 0.05;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
    ctx.fillRect(x, y, 2 + Math.random() * 5, 2 + Math.random() * 5);
  }

  for (let i = 0; i < 22; i++) {
    const y = Math.random() * 1280;
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y + (Math.random() * 40 - 20));
    ctx.stroke();
  }

  ctx.strokeStyle = "#a8822a";
  ctx.lineWidth = 16;
  ctx.strokeRect(118, 148, 788, 984);
  ctx.strokeStyle = "#e0b54b";
  ctx.lineWidth = 5;
  ctx.strokeRect(138, 168, 748, 944);

  ctx.strokeStyle = "rgba(212,175,55,0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(160, 190, 704, 900);

  drawEyeOfHorus(ctx, 512, 336, 2.6);

  ctx.font = "105px 'Segoe UI Historic','Noto Sans Egyptian Hieroglyphs',serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let idx = 0;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 4; col++) {
      const gx = 216 + col * 200;
      const gy = 512 + row * 122;
      const sign = GLYPH_KEYS[idx % GLYPH_KEYS.length];
      idx++;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillText(sign, gx + 6, gy + 7);
      ctx.fillStyle = "#d4a843";
      ctx.fillText(sign, gx, gy);
    }
  }

  ctx.fillStyle = "rgba(224,181,75,0.16)";
  for (let i = 0; i < 5; i++) {
    const gx = 200 + i * 210;
    const gy = 1180;
    ctx.font = "80px 'Segoe UI Historic','Noto Sans Egyptian Hieroglyphs',serif";
    ctx.fillText(GLYPH_KEYS[(idx + i) % GLYPH_KEYS.length], gx, gy);
  }

  const cracks: [number, number, number, number][] = [
    [170, 200, 420, 430],
    [900, 520, 690, 780],
    [620, 980, 860, 1210],
    [250, 1150, 160, 1250],
  ];
  ctx.strokeStyle = "rgba(5,6,12,0.6)";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  for (const [sx, sy, ex, ey] of cracks) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    let x = sx;
    let y = sy;
    const steps = 6;
    for (let i = 1; i <= steps; i++) {
      x += (ex - sx) / steps + (Math.random() * 34 - 17);
      y += (ey - sy) / steps + (Math.random() * 26 - 13);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(8,10,20,0.5)";
  ctx.beginPath();
  ctx.moveTo(1024, 1280);
  ctx.lineTo(760, 1280);
  ctx.lineTo(720, 1160);
  ctx.lineTo(1024, 1080);
  ctx.closePath();
  ctx.fill();

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  return { map, bump: map };
}

function Stele() {
  const group = useRef<THREE.Group>(null);
  const textures = useMemo(makeStoneTextures, []);

  useEffect(() => {
    return () => {
      textures.map.dispose();
      if (textures.bump !== textures.map) textures.bump.dispose();
    };
  }, [textures]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.11;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.05, 0.045);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.05, 0.045);
  });

  return (
    <group ref={group} position={[0, 0.35, 0]}>
      <RoundedBox args={[2.3, 3.05, 0.3]} radius={0.09} smoothness={10} castShadow receiveShadow>
        <meshStandardMaterial map={textures.map} bumpMap={textures.bump} bumpScale={0.02} roughness={0.92} metalness={0.08} />
      </RoundedBox>
    </group>
  );
}

function Pedestal() {
  return (
    <group position={[0, -1.55, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.75, 1.95, 0.2, 72]} />
        <meshStandardMaterial color="#262a3a" roughness={0.9} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.55, 1.75, 0.06, 72]} />
        <meshStandardMaterial color="#2f3447" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <torusGeometry args={[1.63, 0.045, 16, 90]} />
        <meshStandardMaterial color="#c9a65c" metalness={0.85} roughness={0.32} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <torusGeometry args={[1.85, 0.05, 16, 90]} />
        <meshStandardMaterial color="#8a6d2f" metalness={0.7} roughness={0.45} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[3.4, 5.2, 4.2]} intensity={1.25} color="#ffd98a" castShadow />
      <pointLight position={[-3.4, 0.8, -3.2]} intensity={1.1} color="#3fd8ff" distance={12} />
      <pointLight position={[2.8, -1.2, 2.6]} intensity={0.55} color="#d9a94f" distance={10} />
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.45}>
        <Stele />
      </Float>
      <Pedestal />
      <ContactShadows position={[0, -1.78, 0]} opacity={0.6} scale={8} blur={2.8} far={3.2} color="#000000" />
    </>
  );
}

export default function ArtifactScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.35, 6.8], fov: 42 }}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
