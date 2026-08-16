import { useId } from "react";

function useUid() {
  return useId().replace(/:/g, "");
}

/** Egyptian royal female bust — gold/black sculptural styling */
export function RoyalPortrait({ className }: { className?: string }) {
  const id = useUid();
  return (
    <svg viewBox="0 0 120 150" className={className} fill="none">
      <defs>
        <linearGradient id={`rp-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d79b" />
          <stop offset="50%" stopColor="#c9a25c" />
          <stop offset="100%" stopColor="#7a5c28" />
        </linearGradient>
        <linearGradient id={`rp-skin-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0b380" />
          <stop offset="100%" stopColor="#a06a3a" />
        </linearGradient>
      </defs>
      {/* nemes headdress */}
      <path d="M22 44 C 26 18, 48 6, 72 10 C 92 13, 102 30, 100 50 L 92 46 C 94 30, 84 20, 70 18 C 52 16, 38 26, 34 44 Z" fill="#10131f" stroke={`url(#rp-${id})`} strokeWidth="1.6" />
      <path d="M34 40 L 60 36 L 60 20" stroke={`url(#rp-${id})`} strokeWidth="1.2" opacity="0.8" />
      <path d="M60 36 L 90 32" stroke={`url(#rp-${id})`} strokeWidth="1.2" opacity="0.8" />
      {/* face */}
      <path d="M40 42 C 40 30, 80 30, 80 42 C 82 66, 74 90, 60 94 C 46 90, 38 66, 40 42 Z" fill={`url(#rp-skin-${id})`} />
      {/* eye makeup + eyes */}
      <path d="M46 52 L 56 50 L 55 56 L 46 58 Z" fill="#10131f" />
      <path d="M74 52 L 64 50 L 65 56 L 74 58 Z" fill="#10131f" />
      <path d="M40 46 C 44 44, 52 44, 56 46 L 50 52 Z" fill="#10131f" />
      {/* brows */}
      <path d="M44 44 C 48 40, 54 40, 58 42" stroke="#10131f" strokeWidth="2" />
      <path d="M76 44 C 72 40, 66 40, 62 42" stroke="#10131f" strokeWidth="2" />
      {/* nose + mouth */}
      <path d="M60 52 C 58 60, 58 66, 62 68" stroke="#10131f" strokeWidth="1.4" />
      <path d="M54 78 C 58 80, 62 80, 66 78" stroke="#10131f" strokeWidth="1.4" />
      {/* broad gold collar */}
      <path d="M34 92 C 42 102, 78 102, 86 92 C 92 100, 94 108, 90 116 C 74 126, 46 126, 30 116 C 26 108, 28 100, 34 92 Z" fill={`url(#rp-${id})`} />
      <path d="M36 100 C 48 108, 72 108, 84 100" stroke="#3a2a12" strokeWidth="1.2" />
      <path d="M38 108 C 50 115, 70 115, 82 108" stroke="#3a2a12" strokeWidth="1.2" />
      <path d="M40 92 C 40 88, 80 88, 80 92" stroke={`url(#rp-${id})`} strokeWidth="1.4" />
      <path d="M60 96 L 60 118" stroke="#3a2a12" strokeWidth="1" />
    </svg>
  );
}

/** Detailed ancient Egyptian golden scarab */
export function GoldScarab({ className }: { className?: string }) {
  const id = useUid();
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none">
      <defs>
        <radialGradient id={`sc-${id}`} cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#f4dd9b" />
          <stop offset="45%" stopColor="#d9b24a" />
          <stop offset="80%" stopColor="#9a7a38" />
          <stop offset="100%" stopColor="#6b4f20" />
        </radialGradient>
      </defs>
      {/* legs */}
      <g stroke="#8a6a2f" strokeWidth="3" strokeLinecap="round">
        <path d="M34 52 L 22 44 M34 58 L 22 58 M34 64 L 22 70" />
        <path d="M86 52 L 98 44 M86 58 L 98 58 M86 64 L 98 70" />
      </g>
      {/* body */}
      <path d="M60 14 C 76 14, 84 26, 82 44 C 80 62, 70 78, 60 82 C 50 78, 40 62, 38 44 C 36 26, 44 14, 60 14 Z" fill={`url(#sc-${id})`} stroke="#5e451f" strokeWidth="2" />
      {/* head + clypeus */}
      <path d="M60 14 C 54 10, 50 8, 48 4 C 58 6, 66 6, 72 4 C 70 8, 66 10, 60 14 Z" fill={`url(#sc-${id})`} stroke="#5e451f" strokeWidth="1.6" />
      {/* wing case split + detail lines */}
      <path d="M60 18 C 58 34, 58 60, 60 80" stroke="#5e451f" strokeWidth="1.6" />
      <path d="M48 24 C 44 38, 44 56, 50 70 M72 24 C 76 38, 76 56, 70 70" stroke="#5e451f" strokeWidth="1.3" />
      <path d="M52 36 C 46 40, 42 48, 44 56 M68 36 C 74 40, 78 48, 76 56" stroke="#f8e7b8" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="30" r="1.8" fill="#3a2a12" />
    </svg>
  );
}

/** Obsidian Egyptian AI scholar — masked guardian with glowing cyan eyes */
export function ScholarMask({ className }: { className?: string }) {
  const id = useUid();
  return (
    <svg viewBox="0 0 120 150" className={className} fill="none">
      <defs>
        <linearGradient id={`sm-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232838" />
          <stop offset="100%" stopColor="#0c0e18" />
        </linearGradient>
        <filter id={`sm-glow-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* hood / head cloth */}
      <path d="M24 40 C 26 16, 48 6, 72 10 C 92 13, 102 30, 100 50 C 96 78, 84 100, 60 110 C 40 104, 28 82, 24 40 Z" fill={`url(#sm-${id})`} stroke="#8a6a2f" strokeWidth="1.6" />
      {/* gold brow band */}
      <path d="M36 44 C 48 38, 76 38, 88 44" stroke="#c9a25c" strokeWidth="2.4" />
      {/* mask face */}
      <path d="M44 50 C 44 42, 80 42, 80 50 C 82 66, 76 84, 62 88 C 48 84, 42 66, 44 50 Z" fill="#10131f" stroke="#c9a25c" strokeWidth="1.2" />
      {/* glowing cyan eyes */}
      <g filter={`url(#sm-glow-${id})`}>
        <path d="M50 60 L 58 58 L 57 64 L 50 66 Z" fill="#3fd8ff" />
        <path d="M74 60 L 66 58 L 67 64 L 74 66 Z" fill="#3fd8ff" />
      </g>
      {/* gold neck/collar */}
      <path d="M34 96 C 44 106, 80 106, 90 96 C 94 104, 94 112, 88 118 C 74 126, 50 126, 36 118 C 30 112, 30 104, 34 96 Z" fill="#0d1019" stroke="#c9a25c" strokeWidth="1.6" />
      <path d="M38 104 C 50 112, 74 112, 86 104" stroke="#c9a25c" strokeWidth="1" opacity="0.7" />
      {/* cloak shoulders */}
      <path d="M22 112 C 18 124, 20 134, 24 142 L 96 142 C 102 134, 104 124, 100 112" fill="#0c0e18" stroke="#8a6a2f" strokeWidth="1.4" />
    </svg>
  );
}

/** Circular Egyptian technological scanning orb (gold) */
export function ScanOrb({ className }: { className?: string }) {
  const id = useUid();
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      <defs>
        <radialGradient id={`so-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8e7b8" />
          <stop offset="45%" stopColor="#c9a25c" />
          <stop offset="100%" stopColor="#6b4f20" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="46" stroke="#c9a25c" strokeWidth="1.2" strokeDasharray="4 7" />
      <circle cx="60" cy="60" r="38" stroke="#8a6a2f" strokeWidth="1" />
      <circle cx="60" cy="60" r="26" fill={`url(#so-${id})`} opacity="0.85" />
      <circle cx="60" cy="60" r="26" stroke="#f8e7b8" strokeWidth="1" />
      <path d="M60 40 L 60 52 M60 68 L 60 80 M40 60 L 52 60 M68 60 L 80 60" stroke="#3a2a12" strokeWidth="1.6" />
      <path d="M60 34 C 44 34, 30 45, 30 60" stroke="#f0d79b" strokeWidth="1.6" strokeDasharray="3 5" />
    </svg>
  );
}

/** Futuristic cyan AI intelligence core */
export function AICore({ className }: { className?: string }) {
  const id = useUid();
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      <defs>
        <radialGradient id={`ai-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9f9ff" />
          <stop offset="35%" stopColor="#3fd8ff" />
          <stop offset="100%" stopColor="#0e7fa8" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="46" stroke="#3fd8ff" strokeWidth="1.2" strokeDasharray="5 6" />
      <circle cx="60" cy="60" r="36" stroke="#0e7fa8" strokeWidth="1" />
      <circle cx="60" cy="60" r="26" stroke="#7ceaff" strokeWidth="0.8" strokeDasharray="2 5" />
      <circle cx="60" cy="60" r="18" fill={`url(#ai-${id})`} opacity="0.9" />
      <circle cx="60" cy="60" r="18" stroke="#d9f9ff" strokeWidth="1" />
      <path d="M60 40 C 48 46, 42 56, 42 68 C 48 64, 52 62, 60 70 C 68 62, 74 66, 78 70 C 78 56, 70 46, 60 40 Z" fill="#0a1a24" opacity="0.85" />
      <path d="M60 26 L 60 34 M60 86 L 60 94 M26 60 L 34 60 M86 60 L 94 60" stroke="#7ceaff" strokeWidth="1.4" />
    </svg>
  );
}
