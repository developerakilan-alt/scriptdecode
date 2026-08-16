import { SIGNS } from "@/lib/egypt";

const GLYPH_KEYS = Object.keys(SIGNS);

function rowGlyphs(seed: number, count: number): string {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(GLYPH_KEYS[(seed * 7 + i * 3) % GLYPH_KEYS.length]);
  }
  return out.join("");
}

export function StonePlaque({ className }: { className?: string }) {
  const rows = [rowGlyphs(3, 5), rowGlyphs(7, 5), rowGlyphs(11, 5), rowGlyphs(5, 5)];

  return (
    <svg
      viewBox="0 0 320 420"
      className={className}
      role="img"
      aria-label="Ancient Egyptian stele with carved hieroglyphs and the Eye of Horus"
    >
      <defs>
        <linearGradient id="t-stone-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#545a72" />
          <stop offset="0.42" stopColor="#373c50" />
          <stop offset="1" stopColor="#1a1e2f" />
        </linearGradient>
        <linearGradient id="t-gold-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2d98c" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#9a7418" />
        </linearGradient>
        <radialGradient id="t-glow-g" cx="0.5" cy="0.4" r="0.65">
          <stop offset="0" stopColor="rgba(212,175,55,0.22)" />
          <stop offset="1" stopColor="rgba(212,175,55,0)" />
        </radialGradient>
      </defs>

      <rect width="320" height="420" rx="14" fill="url(#t-stone-g)" />
      <rect width="320" height="420" rx="14" fill="url(#t-glow-g)" />

      <g fill="none" stroke="#ffffff" strokeOpacity="0.045">
        <path d="M0 60h320M0 150h320M0 300h320M0 372h320" />
      </g>

      {/* weathered speckle */}
      <g fill="#ffffff" fillOpacity="0.05">
        {Array.from({ length: 60 }).map((_, i) => (
          <circle key={i} cx={(i * 53) % 320} cy={(i * 37) % 420} r={1 + ((i * 7) % 3)} />
        ))}
      </g>

      {/* gold cartouche frame */}
      <rect x="34" y="26" width="252" height="350" rx="12" fill="none" stroke="url(#t-gold-g)" strokeWidth="3" opacity="0.9" />
      <rect x="42" y="34" width="236" height="334" rx="9" fill="none" stroke="#d4af37" strokeOpacity="0.28" strokeWidth="1" />

      {/* corner ornaments */}
      <g stroke="#d4af37" strokeOpacity="0.5" fill="none" strokeWidth="1.5">
        <path d="M44 34l0 -8l8 0M266 34l0 -8l-8 0M44 368l0 8l8 0M266 368l0 8l-8 0" />
      </g>

      {/* Eye of Horus */}
      <g stroke="#e6c05a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M96 86 l24 6 l13 -10 l12 8 l28 -10" />
        <path d="M84 112 q46 -26 92 -10 q30 8 24 20 q4 14 -26 22 q-38 8 -72 -4 q-22 -8 -18 -28 z" />
        <circle cx="138" cy="128" r="9" fill="#e6c05a" stroke="none" />
        <path d="M100 142 q10 24 26 26" />
        <path d="M164 138 q10 22 26 24" />
      </g>

      {/* hieroglyph rows */}
      <g fontFamily="'Segoe UI Historic','Noto Sans Egyptian Hieroglyphs',serif" textAnchor="middle" fontSize="24">
        {rows.map((r, i) => (
          <text key={i} x="160" y={212 + i * 40} fill="#d4a843" stroke="rgba(0,0,0,0.5)" strokeWidth="3" paintOrder="stroke">
            {r}
          </text>
        ))}
      </g>

      {/* cracks */}
      <g fill="none" stroke="#05060c" strokeOpacity="0.6" strokeWidth="2" strokeLinejoin="round">
        <path d="M44 96 L72 128 L64 168 L92 206 L86 244 L108 288 L100 330" />
        <path d="M236 60 L228 96 L252 128 L244 168" />
      </g>

      {/* carved base line */}
      <line x1="96" y1="374" x2="224" y2="374" stroke="#d4af37" strokeOpacity="0.35" />
      <text x="160" y="392" textAnchor="middle" fontFamily="'Segoe UI Historic',serif" fontSize="12" letterSpacing="5" fill="#cdb97e" fillOpacity="0.6">
        𓂀 𓋹 𓊽
      </text>
    </svg>
  );
}
