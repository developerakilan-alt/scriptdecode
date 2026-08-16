import { useEffect, useRef, useState } from "react";

export interface SpyTarget {
  id: string;
  spy: string;
}

export function useScrollSpy(targets: SpyTarget[]) {
  const [active, setActive] = useState<string | null>(null);
  const targetsRef = useRef(targets);
  targetsRef.current = targets;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const mid = window.innerHeight / 2;
      let best: { spy: string; dist: number } | null = null;
      for (const t of targetsRef.current) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (!best || dist < best.dist) best = { spy: t.spy, dist };
      }
      setActive(best ? best.spy : null);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return active;
}
