import { useId } from "react";
import { cn } from "@/lib/utils";

export type DeityKind = "ANUBIS" | "THOTH" | "HORUS" | "SEKHMET";

const DEITIES: { kind: DeityKind; label: string }[] = [
  { kind: "ANUBIS", label: "Anubis" },
  { kind: "THOTH", label: "Thoth" },
  { kind: "HORUS", label: "Horus" },
  { kind: "SEKHMET", label: "Sekhmet" },
];

function DeityHead({ kind }: { kind: DeityKind }) {
  const uid = useId().replace(/:/g, "");
  const GOLD = `url(#dgold-${uid})`;

  const shapes: Record<DeityKind, JSX.Element> = {
    ANUBIS: (
      <g>
        <path
          d="M60 118 C 52 96, 52 88, 54 74 C 46 66, 42 54, 44 40 L 52 42 C 50 34, 50 28, 54 22 L 58 36 C 60 30, 60 24, 62 18 L 66 32 C 70 26, 72 22, 74 18 L 74 30 C 78 30, 80 32, 80 36 L 82 26 C 84 30, 84 36, 84 42 L 86 38 C 88 44, 88 50, 86 56 C 96 60, 102 66, 104 74 C 104 90, 94 100, 84 104 C 86 108, 86 112, 84 118 Z"
          fill="#0c0e18"
          stroke={GOLD}
          strokeWidth="2"
        />
        <path d="M54 74 C 66 66, 78 66, 86 74" fill="none" stroke={GOLD} strokeWidth="1.4" opacity="0.7" />
        <ellipse cx="63" cy="60" rx="1.6" ry="2.4" fill="#ffcf7d" />
        <ellipse cx="79" cy="60" rx="1.6" ry="2.4" fill="#ffcf7d" />
        <path d="M56 78 L 66 76 L 62 86 Z" fill={GOLD} opacity="0.55" />
        <path d="M84 78 L 76 78 L 79 86 Z" fill={GOLD} opacity="0.55" />
      </g>
    ),
    THOTH: (
      <g>
        <path
          d="M58 118 C 54 98, 54 86, 60 72 C 52 62, 50 48, 54 34 L 62 44 C 60 36, 60 30, 64 24 L 66 36 C 68 30, 70 26, 72 22 L 74 34 C 78 30, 80 32, 82 36 L 80 28 C 82 32, 84 38, 84 44 C 90 50, 94 58, 94 68 C 96 80, 92 92, 84 100 C 82 106, 82 112, 84 118 Z"
          fill="#0c0e18"
          stroke={GOLD}
          strokeWidth="2"
        />
        <path
          d="M84 44 C 100 52, 110 72, 108 94 C 106 108, 96 116, 90 118 C 100 108, 104 92, 102 76 C 100 62, 94 50, 84 44 Z"
          fill="#0c0e18"
          stroke={GOLD}
          strokeWidth="2"
        />
        <ellipse cx="68" cy="56" rx="1.6" ry="2.4" fill="#ffcf7d" />
        <ellipse cx="80" cy="58" rx="1.6" ry="2.4" fill="#ffcf7d" />
      </g>
    ),
    HORUS: (
      <g>
        <path
          d="M56 118 C 52 96, 52 84, 58 70 C 50 62, 48 50, 52 38 L 60 46 C 58 38, 58 32, 62 26 L 66 38 C 68 32, 70 28, 72 24 L 76 36 C 80 32, 82 34, 84 38 L 86 32 C 88 38, 88 44, 86 50 C 92 54, 96 62, 96 70 C 98 86, 92 100, 84 108 C 86 112, 86 114, 84 118 Z"
          fill="#0c0e18"
          stroke={GOLD}
          strokeWidth="2"
        />
        <path
          d="M70 66 C 78 62, 88 64, 92 70 C 90 80, 82 84, 76 82 C 72 80, 70 72, 70 66 Z"
          fill={GOLD}
          opacity="0.85"
        />
        <path d="M92 70 C 96 72, 100 70, 102 66 C 98 62, 94 62, 92 66" fill="#0c0e18" stroke={GOLD} strokeWidth="1.4" />
        <ellipse cx="66" cy="58" rx="1.6" ry="2.4" fill="#ffcf7d" />
        <ellipse cx="80" cy="58" rx="1.6" ry="2.4" fill="#ffcf7d" />
      </g>
    ),
    SEKHMET: (
      <g>
        <path
          d="M60 118 C 54 96, 54 82, 62 68 C 54 58, 52 44, 58 30 C 54 24, 52 20, 54 14 L 60 22 C 64 16, 66 12, 70 8 L 72 20 C 76 14, 80 12, 82 8 L 84 22 C 88 16, 92 18, 94 22 L 92 14 C 96 18, 98 24, 98 30 C 100 42, 96 52, 90 60 C 92 70, 92 84, 88 100 C 86 106, 84 112, 84 118 Z"
          fill="#0c0e18"
          stroke={GOLD}
          strokeWidth="2"
        />
        <path
          d="M52 66 C 60 60, 92 60, 100 66 C 98 74, 92 78, 84 78 C 76 78, 58 76, 52 66 Z"
          fill="#0c0e18"
          stroke={GOLD}
          strokeWidth="1.4"
          opacity="0.8"
        />
        <path d="M70 58 L 76 58" stroke={GOLD} strokeWidth="1.4" />
        <path d="M64 62 C 68 60, 72 60, 76 62" stroke={GOLD} strokeWidth="1.2" opacity="0.7" />
        <path d="M76 62 C 80 60, 84 60, 88 62" stroke={GOLD} strokeWidth="1.2" opacity="0.7" />
        <ellipse cx="68" cy="52" rx="1.6" ry="2.2" fill="#ffcf7d" />
        <ellipse cx="84" cy="52" rx="1.6" ry="2.2" fill="#ffcf7d" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id={`dgold-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d79b" />
          <stop offset="55%" stopColor="#c9a25c" />
          <stop offset="100%" stopColor="#8a6a2f" />
        </linearGradient>
      </defs>
      {shapes[kind]}
    </svg>
  );
}

interface DeitySelectorProps {
  active?: DeityKind;
  onSelect?: (kind: DeityKind) => void;
  className?: string;
}

export function DeitySelector({ active = "ANUBIS", onSelect, className }: DeitySelectorProps) {
  return (
    <div className={cn("deity-rail", className)} role="tablist" aria-label="Select a guardian deity">
      {DEITIES.map((d) => {
        const isActive = d.kind === active;
        return (
          <button
            key={d.kind}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect?.(d.kind)}
            className={cn("deity-card", isActive && "active")}
          >
            <span className={cn("deity-card-head", d.kind !== "ANUBIS" && "img")}>
              {d.kind === "HORUS" ? (
                <img
                  src="/Horus.png"
                  alt="Horus"
                  className="h-full w-full rounded-[0.3rem] object-cover"
                  draggable={false}
                />
              ) : d.kind === "SEKHMET" ? (
                <img
                  src="/Sekhmet.png"
                  alt="Sekhmet"
                  className="h-full w-full rounded-[0.3rem] object-cover"
                  draggable={false}
                />
              ) : d.kind === "THOTH" ? (
                <img
                  src="/Thoth.jpg"
                  alt="Thoth"
                  className="h-full w-full rounded-[0.3rem] object-cover"
                  draggable={false}
                />
              ) : (
                <DeityHead kind={d.kind} />
              )}
            </span>
            <span className="deity-card-name">{d.label}</span>
          </button>
        );
      })}
    </div>
  );
}
