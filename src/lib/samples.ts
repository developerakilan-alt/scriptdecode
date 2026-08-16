export interface SampleImage {
  key: string;
  label: string;
  description: string;
  glyphs: string;
  missing?: string;
}

export const TRANSLATE_SAMPLES: SampleImage[] = [
  {
    key: "t-ankh",
    label: "Ankh Wedja Seneb",
    description: "The classic greeting — life, prosperity, health",
    glyphs: "𓋹𓆸𓋴𓈖𓃀",
  },
  {
    key: "t-sare",
    label: "Sa Re",
    description: "Son of Ra — the pharaoh's divine title",
    glyphs: "𓅭𓇳",
  },
  {
    key: "t-hotep",
    label: "Hotep Di Nesut",
    description: "An offering the king gives — the funeral formula",
    glyphs: "𓎛𓏏𓊵𓏏𓊪𓏏𓈘𓇓𓆤",
  },
];

export const FULLSCRIPT_SAMPLES: SampleImage[] = [
  {
    key: "f-ankh",
    label: "Ankh Wedja Seneb",
    description: "Only the opening signs survive",
    glyphs: "𓋹𓆸",
    missing: "𓋴𓈖𓃀",
  },
  {
    key: "f-djed",
    label: "Djed Medu",
    description: "Words spoken by — the spell opening",
    glyphs: "𓊽",
    missing: "𓅓𓂧𓅱",
  },
  {
    key: "f-hotep",
    label: "Hotep Di Nesut",
    description: "The offering formula, partially lost",
    glyphs: "𓎛𓏏𓊵𓏏",
    missing: "𓊪𓏏𓈘𓇓𓆤",
  },
];

const GOLD_A = "#f2d98c";
const GOLD_B = "#d4af37";
const GOLD_C = "#a67c1e";

function glyphWidths(text: string, fontSize: number) {
  return Array.from(text).length * fontSize * 0.62;
}

function buildSvg(s: SampleImage): string {
  const all = s.glyphs + (s.missing ?? "");
  const surviving = Array.from(s.glyphs).length;
  const fontSize = Math.max(42, Math.min(96, Math.floor(470 / Math.max(1, Array.from(all).length))));
  const totalW = glyphWidths(all, fontSize);
  const left = 320 - totalW / 2;
  const crackX = s.missing ? left + glyphWidths(s.glyphs, fontSize) : null;

  let extra = "";
  if (crackX !== null) {
    extra = `
    <path d="M ${crackX + 6} 84 L ${crackX - 4} 120 L ${crackX + 8} 158 L ${crackX - 6} 198 L ${crackX + 6} 240 L ${crackX - 4} 272 L ${crackX + 10} 292" fill="none" stroke="${GOLD_A}" stroke-opacity="0.55" stroke-width="2" stroke-linejoin="round"/>
    <path d="M ${crackX + 6} 84 L ${crackX - 4} 120 L ${crackX + 8} 158 L ${crackX - 6} 198 L ${crackX + 6} 240 L ${crackX - 4} 272 L ${crackX + 10} 292" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="6" stroke-linejoin="round"/>
    <polygon points="${crackX - 10},84 ${crackX + 40},84 ${crackX + 40},292 ${crackX - 10},292" fill="#080a14" opacity="0.45"/>
    <text x="${crackX + 78}" y="205" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.floor(fontSize * 0.9)}" font-weight="bold" fill="${GOLD_A}" fill-opacity="0.3">?</text>`;
  }

  const missingSvg = s.missing
    ? `<text x="320" y="205" text-anchor="middle" font-family="Segoe UI Historic, Noto Sans Egyptian Hieroglyphs, serif" font-size="${fontSize}" fill="${GOLD_B}" fill-opacity="0.16">${s.missing}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3047"/>
      <stop offset="0.55" stop-color="#1a1e30"/>
      <stop offset="1" stop-color="#0d101f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.6">
      <stop offset="0" stop-color="rgba(212,175,55,0.20)"/>
      <stop offset="1" stop-color="rgba(212,175,55,0)"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_A}"/>
      <stop offset="0.5" stop-color="${GOLD_B}"/>
      <stop offset="1" stop-color="${GOLD_C}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#stone)"/>
  <rect width="640" height="360" fill="url(#glow)"/>
  <g stroke="#ffffff" stroke-opacity="0.05">
    <line x1="0" y1="48" x2="640" y2="44"/>
    <line x1="0" y1="118" x2="640" y2="122"/>
    <line x1="0" y1="236" x2="640" y2="232"/>
    <line x1="0" y1="308" x2="640" y2="312"/>
  </g>
  <g stroke="${GOLD_B}" stroke-opacity="0.16" fill="none">
    <circle cx="112" cy="100" r="14"/>
    <rect x="500" y="246" width="34" height="26" rx="4"/>
    <path d="M 88 268 l 14 8 l 10 -12 l 12 14"/>
  </g>
  <rect x="60" y="70" width="520" height="206" rx="18" fill="#12162a" stroke="url(#gold)" stroke-width="3"/>
  <rect x="70" y="80" width="500" height="186" rx="14" fill="none" stroke="${GOLD_B}" stroke-opacity="0.3" stroke-width="1.5"/>
  <text x="320" y="205" text-anchor="middle" font-family="Segoe UI Historic, Noto Sans Egyptian Hieroglyphs, serif" font-size="${fontSize}" fill="url(#gold)">${s.glyphs}</text>
  ${missingSvg}
  ${extra}
  <text x="320" y="258" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="15" letter-spacing="4" fill="#cdb97e">${s.label.toUpperCase()}</text>
  <text x="320" y="286" text-anchor="middle" font-family="Georgia, serif" font-size="12" font-style="italic" fill="#8a91ab">${s.description}</text>
  <line x1="240" y1="310" x2="400" y2="310" stroke="${GOLD_B}" stroke-opacity="0.25"/>
  <text x="320" y="336" text-anchor="middle" font-family="Segoe UI Historic, serif" font-size="13" letter-spacing="6" fill="${GOLD_B}" fill-opacity="0.5">𓂀 𓋹 𓊽</text>
</svg>`;
}

export function sampleDataUri(s: SampleImage): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildSvg(s))}`;
}
