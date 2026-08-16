import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = glowRef.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[300px] w-[300px] rounded-full opacity-60 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, hsla(43, 82%, 56%, 0.18) 0%, hsla(190, 90%, 50%, 0.06) 45%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
