import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type EyePhase = "closed" | "opening" | "open" | "scan" | "complete";

interface EyeOfHorusProps {
  phase?: EyePhase;
  className?: string;
  label?: string;
}

const GOLD = "#e3bd6a";
const GOLD_BRIGHT = "#f4d99b";
const CYAN = "#3de2ff";

export function EyeOfHorus({ phase = "open", className, label }: EyeOfHorusProps) {
  const scanning = phase === "scan";
  const complete = phase === "complete";
  const closed = phase === "closed";

  return (
    <div className={cn("relative select-none", className)} role={label ? "img" : undefined} aria-label={label}>
      <svg viewBox="0 0 240 140" className="h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="eyeIris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor={CYAN} />
            <stop offset="70%" stopColor="#0e7fa8" />
            <stop offset="100%" stopColor="#04212f" />
          </radialGradient>
          <filter id="eyeGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="eyeStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GOLD} />
            <stop offset="50%" stopColor={GOLD_BRIGHT} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
        </defs>

        {/* Eyebrow */}
        <motion.path
          d="M 48 58 C 88 30, 150 24, 198 40"
          stroke="url(#eyeStroke)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#eyeGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: complete ? 1 : 0.85 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <path d="M 48 58 C 88 30, 150 24, 198 40" stroke="url(#eyeStroke)" strokeWidth="2" opacity="0.35" />

        {/* Eye outline */}
        <motion.path
          d="M 52 74 C 78 42, 140 40, 182 56 C 170 80, 122 104, 52 74 Z"
          stroke="url(#eyeStroke)"
          strokeWidth="4.5"
          strokeLinejoin="round"
          filter="url(#eyeGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1 }}
        />
        {/* Eye-liner extension */}
        <motion.path
          d="M 178 56 L 208 42"
          stroke={GOLD}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />

        {/* Teardrop marking */}
        <motion.path
          d="M 156 74 C 166 82, 174 98, 168 110 C 160 116, 150 106, 150 90 C 150 82, 152 77, 156 74 Z"
          stroke={GOLD}
          strokeWidth="2.5"
          fill={complete ? "rgba(227,189,106,0.18)" : "rgba(227,189,106,0.06)"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        />

        {/* Spiral detail */}
        <motion.path
          d="M 66 84 q 8 -10 16 0 q 8 12 -2 16 q -14 4 -18 -6 q -3 -8 4 -12"
          stroke={GOLD}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: complete ? 1 : 0.7 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        />

        {/* Iris + pupil */}
        <motion.g
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{
            scale: closed ? 0.15 : 1,
            opacity: closed ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: "108px", originY: "70px" }}
        >
          <circle cx="108" cy="70" r="19" fill="url(#eyeIris)" stroke={GOLD} strokeWidth="1.5" filter="url(#eyeGlow)" />
          <circle cx="108" cy="70" r="6" fill="#021019" stroke={CYAN} strokeWidth="1" />
          <motion.circle
            cx="108"
            cy="70"
            r="10"
            stroke={CYAN}
            strokeWidth="1"
            fill="none"
            animate={{ opacity: scanning ? [0, 1, 0] : complete ? [0.5, 1, 0.5] : 0.3 }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.g>

        {/* Eyelid */}
        <motion.path
          d="M 40 74 C 78 40, 140 38, 196 54 C 150 60, 96 66, 40 74 Z"
          fill="#070a16"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: closed ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ originX: "118px", originY: "58px" }}
        />
        {/* Lid gold trim */}
        <motion.path
          d="M 44 70 C 84 40, 144 38, 194 50"
          stroke={GOLD}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: closed ? 1 : 0 }}
        />

        {/* Scan beam */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: scanning ? 1 : 0 }}
        >
          <motion.rect
            x="40"
            width="170"
            height="2.5"
            fill={CYAN}
            filter="url(#eyeGlow)"
            animate={{ y: [30, 108] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.rect
            x="40"
            width="170"
            height="26"
            fill="url(#eyeScanGradient)"
            animate={{ y: [30, 108] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="eyeScanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CYAN} stopOpacity="0" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0.18" />
            </linearGradient>
          </defs>
        </motion.g>

        {/* Completion radiance */}
        {complete && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="118" cy="72" r="30" stroke={GOLD_BRIGHT} strokeWidth="1" opacity="0.5" />
            <circle cx="118" cy="72" r="42" stroke={GOLD} strokeWidth="0.7" opacity="0.25" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
