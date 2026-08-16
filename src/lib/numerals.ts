export interface NumeralUnit {
  value: number;
  glyph: string;
  name: string;
}

export const NUMERAL_UNITS: NumeralUnit[] = [
  { value: 1_000_000, glyph: "𓁨", name: "Heh — a million (the god Heh)" },
  { value: 100_000, glyph: "𓆐", name: "tadpole — one hundred thousand" },
  { value: 10_000, glyph: "𓂭", name: "pointing finger — ten thousand" },
  { value: 1_000, glyph: "𓆼", name: "lotus flower — one thousand" },
  { value: 100, glyph: "𓍢", name: "coiled rope — one hundred" },
  { value: 10, glyph: "𓎆", name: "heel bone — ten" },
  { value: 1, glyph: "𓏺", name: "single stroke — one" },
];

const GLYPH_TO_VALUE = new Map(NUMERAL_UNITS.map((u) => [u.glyph, u.value]));

export function numeralToEgyptian(n: number): string {
  const num = Math.max(0, Math.floor(n));
  if (num === 0) return "";
  let remaining = num;
  let out = "";
  for (const unit of NUMERAL_UNITS) {
    while (remaining >= unit.value) {
      out += unit.glyph;
      remaining -= unit.value;
    }
  }
  return out;
}

export function egyptianToNumeral(glyphs: string): number {
  let total = 0;
  for (const ch of Array.from(glyphs)) {
    const value = GLYPH_TO_VALUE.get(ch);
    if (value) total += value;
  }
  return total;
}

export function isNumeralGlyph(glyphs: string): boolean {
  return Array.from(glyphs).some((ch) => GLYPH_TO_VALUE.has(ch));
}
