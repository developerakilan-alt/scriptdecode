import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ConfidenceMeterProps {
  value: number;
  label?: string;
}

export function ConfidenceMeter({ value, label = "TRANSLATION CONFIDENCE" }: ConfidenceMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const R = 54;
  const C = 2 * Math.PI * R;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = inView ? C - (clamped / 100) * C : C;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={R} fill="none" stroke="hsla(190,90%,50%,0.12)" strokeWidth="7" />
          <motion.circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke="hsla(190,92%,60%,0.85)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ filter: "drop-shadow(0 0 6px hsla(190,90%,55%,0.55))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-gold">
            {inView ? clamped.toFixed(1) : "0.0"}<span className="text-lg">%</span>
          </span>
        </div>
      </div>
      <p className="font-mono-code text-[0.6rem] uppercase tracking-[0.3em] text-foreground/55">{label}</p>
    </div>
  );
}
