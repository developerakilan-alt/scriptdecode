import { useEffect, useRef } from "react";

const GLYPHS = [
  { g: "𓋹", top: "12%", left: "6%", size: "3.4rem", speed: 0.22, opacity: 0.14 },
  { g: "𓂀", top: "24%", left: "88%", size: "4rem", speed: 0.32, opacity: 0.12 },
  { g: "𓊽", top: "44%", left: "4%", size: "3rem", speed: 0.5, opacity: 0.1 },
  { g: "𓆸", top: "58%", left: "92%", size: "3.6rem", speed: 0.42, opacity: 0.13 },
  { g: "𓇳", top: "70%", left: "8%", size: "2.8rem", speed: 0.66, opacity: 0.09 },
  { g: "𓆄", top: "8%", left: "80%", size: "3rem", speed: 0.18, opacity: 0.11 },
];

export function ParallaxGlyphs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = ref.current;
        if (!root) return;
        const y = window.scrollY;
        root.querySelectorAll<HTMLElement>("[data-speed]").forEach((node) => {
          const speed = parseFloat(node.dataset.speed || "0");
          node.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
      {GLYPHS.map((item, i) => (
        <span
          key={i}
          data-speed={item.speed}
          className="absolute font-display text-gold"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.size,
            opacity: item.opacity,
          }}
        >
          {item.g}
        </span>
      ))}
    </div>
  );
}
