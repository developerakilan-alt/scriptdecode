import { useId } from "react";
import { cn } from "@/lib/utils";

interface WingOrnamentProps {
  className?: string;
  flip?: boolean;
  label?: string;
}

/**
 * Stylized ancient-Egyptian wing ornament, metallic antique gold with fine
 * engraved feather details. `flip` mirrors it to face outward.
 */
export function WingOrnament({ className, flip = false, label }: WingOrnamentProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <div
      className={cn("select-none", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        viewBox="0 0 220 64"
        className={cn("h-full w-full overflow-visible", flip && "-scale-x-100")}
        fill="none"
      >
        <defs>
          <linearGradient id={`wgold-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0d79b" />
            <stop offset="38%" stopColor="#c9a25c" />
            <stop offset="72%" stopColor="#8a6a2f" />
            <stop offset="100%" stopColor="#5e451f" />
          </linearGradient>
          <linearGradient id={`wstroke-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8e7b8" />
            <stop offset="100%" stopColor="#7a5c28" />
          </linearGradient>
          <filter id={`wshadow-${uid}`} x="-10%" y="-30%" width="120%" height="160%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor="#000" floodOpacity="0.55" />
          </filter>
        </defs>

        <g filter={`url(#wshadow-${uid})`}>
          {[
            [30, 12, 84, 4],
            [56, 10, 118, 5],
            [82, 10, 152, 8],
            [108, 11, 184, 13],
            [132, 13, 214, 20],
          ].map(([x0, y0, x1, y1], i) => (
            <path
              key={`u${i}`}
              d={`M ${x0} ${y0} C ${x0 + 18} ${y0 - 7}, ${x1 - 20} ${y1 - 6}, ${x1} ${y1} C ${x1 - 20} ${y1 + 8}, ${x0 + 14} ${y0 + 9}, ${x0} ${y0} Z`}
              fill={`url(#wgold-${uid})`}
              stroke={`url(#wstroke-${uid})`}
              strokeWidth="0.9"
            />
          ))}
          {[
            [20, 26, 80, 20],
            [44, 25, 112, 22],
            [70, 25, 148, 26],
            [96, 26, 182, 31],
            [122, 28, 212, 37],
          ].map(([x0, y0, x1, y1], i) => (
            <path
              key={`m${i}`}
              d={`M ${x0} ${y0} C ${x0 + 20} ${y0 - 8}, ${x1 - 22} ${y1 - 7}, ${x1} ${y1} C ${x1 - 22} ${y1 + 9}, ${x0 + 16} ${y0 + 10}, ${x0} ${y0} Z`}
              fill={`url(#wgold-${uid})`}
              stroke={`url(#wstroke-${uid})`}
              strokeWidth="0.9"
            />
          ))}
          {[
            [34, 44, 90, 54],
            [60, 44, 128, 57],
            [88, 45, 164, 57],
            [114, 46, 198, 53],
            [138, 47, 216, 50],
          ].map(([x0, y0, x1, y1], i) => (
            <path
              key={`l${i}`}
              d={`M ${x0} ${y0} C ${x0 + 18} ${y0 + 5}, ${x1 - 20} ${y1 + 6}, ${x1} ${y1} C ${x1 - 20} ${y1 - 7}, ${x0 + 14} ${y0 - 7}, ${x0} ${y0} Z`}
              fill={`url(#wgold-${uid})`}
              stroke={`url(#wstroke-${uid})`}
              strokeWidth="0.9"
            />
          ))}
          {[
            [36, 20, 120, 26],
            [58, 24, 158, 30],
            [88, 40, 150, 44],
          ].map(([x0, y0, x1, y1], i) => (
            <path
              key={`v${i}`}
              d={`M ${x0} ${y0} Q ${(x0 + x1) / 2} ${y0 + (y1 > y0 ? 6 : -6)} ${x1} ${y1}`}
              stroke="rgba(70, 50, 18, 0.55)"
              strokeWidth="1"
              fill="none"
            />
          ))}
          <rect x="8" y="22" width="26" height="20" rx="4" fill={`url(#wgold-${uid})`} stroke={`url(#wstroke-${uid})`} strokeWidth="0.9" />
          <rect x="8" y="26" width="26" height="1.4" fill="rgba(248, 231, 184, 0.5)" />
          <rect x="8" y="36" width="26" height="1.4" fill="rgba(0, 0, 0, 0.25)" />
          <circle cx="21" cy="32" r="3.4" fill="#f0d79b" stroke={`url(#wstroke-${uid})`} strokeWidth="0.8" />
          <circle cx="21" cy="32" r="1.3" fill="#5e451f" />
        </g>
      </svg>
    </div>
  );
}
