import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

const DUST = Array.from({ length: 16 }).map((_, i) => ({
  left: `${(i * 61) % 100}%`,
  top: `${(i * 37) % 100}%`,
  size: 2 + ((i * 7) % 4),
  delay: `${(i % 8) * -2.1}s`,
  duration: `${12 + ((i * 5) % 10)}s`,
}));

export function TranslateBackdrop() {
  const isMobile = useIsMobile(768);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const bgX = useTransform(sx, (v) => v * -2);
  const bgY = useTransform(sy, (v) => v * -2);
  const pillarLX = useTransform(sx, (v) => v * -3);
  const pillarRX = useTransform(sx, (v) => v * 3);
  const fogY = useTransform(sy, (v) => v * 1.5);

  useEffect(() => {
    if (isMobile || reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile, reduced, mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* 1. deep base */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#141a2e_0%,#0b0e1d_45%,#060811_100%)]" />

      {/* 2. gold ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-6%,hsla(43,82%,56%,0.12),transparent_60%)]" />

      {/* 3. cyan AI glow */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_82%_88%,hsla(190,90%,50%,0.1),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_8%_24%,hsla(190,90%,50%,0.06),transparent_60%)]" />

      {/* 4. hieroglyph wall texture with parallax */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-6 hieroglyph-pattern opacity-70" />

      {/* 5. faint temple architecture at the edges */}
      <motion.div style={{ x: pillarLX }} className="absolute -left-16 top-0 h-full w-40 opacity-[0.16]">
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-y-[10%] left-6 w-6 rounded-t-xl border border-gold/30" />
        <div className="absolute inset-y-[10%] left-24 w-6 rounded-t-xl border border-gold/30" />
        <div className="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
      <motion.div style={{ x: pillarRX }} className="absolute -right-16 top-0 h-full w-40 opacity-[0.16]">
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-y-[10%] right-6 w-6 rounded-t-xl border border-gold/30" />
        <div className="absolute inset-y-[10%] right-24 w-6 rounded-t-xl border border-gold/30" />
        <div className="absolute right-2 top-0 h-full w-0.5 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>

      {/* 6. atmospheric fog */}
      <motion.div style={{ y: fogY }} className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(80%_100%_at_50%_100%,hsla(226,40%,16%,0.85),transparent_70%)]" />

      {/* 7. dust particles */}
      {!isMobile &&
        DUST.map((d, i) => (
          <span
            key={i}
            className="t-dust"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: d.delay,
              animationDuration: d.duration,
            }}
          />
        ))}

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_50%,transparent_55%,rgba(3,4,10,0.55)_100%)]" />
    </div>
  );
}
