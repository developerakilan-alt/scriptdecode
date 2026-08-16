import { SIGNS } from "@/lib/egypt";
import type { Breakdown, DecipherResult } from "./types";

export function confidenceOf(breakdown: Breakdown): number {
  if (breakdown.length === 0) return 0;
  const known = breakdown.filter((b) => b.known).length;
  return Math.round((known / breakdown.length) * 1000) / 10;
}

export function transliterationOf(breakdown: Breakdown): string {
  const parts = breakdown.map((b) => {
    if ("glyph" in b) return SIGNS[b.glyph]?.transliteration ?? "?";
    return b.word;
  });
  return parts.filter(Boolean).join(" ");
}

export function isGlyphInput(s: string): boolean {
  return Array.from(s).some((c) => c.codePointAt(0)! >= 0x13000);
}

function hasAny(haystack: string, needles: string[]): boolean {
  const h = haystack.toLowerCase();
  return needles.some((n) => h.includes(n));
}

export function contextOf(r: Pick<DecipherResult, "english" | "note" | "breakdown">): {
  period: string;
  context: string;
} {
  const all = `${r.english} ${r.note} ${r.breakdown.map((b) => "meaning" in b ? b.meaning : "").join(" ")}`;
  const glyphs = r.breakdown.map((b) => ("glyph" in b ? b.glyph : "")).join("");
  const isFunerary = hasAny(all, ["osiris", "offering", "afterlife", "spell", "dead", "funeral", "eternity"]);
  const isRoyal = hasAny(all, ["king", "pharaoh", "royal", "son of ra", "two lands", "divine heir", "nesut"]);
  const isGreeting = hasAny(all, ["greeting", "life, prosperity", "good wishes", "ankh wedja"]);
  const isTemple = hasAny(all, ["house of life", "temple", "library", "scribe"]);
  const isSpell = hasAny(glyphs, ["𓊽", "𓅓", "𓂧", "𓅱"]);
  const isRa = hasAny(glyphs, ["𓇳", "𓅭"]);

  if (isSpell || isFunerary) {
    return {
      period: "New Kingdom (c. 1550–1069 BCE)",
      context: "Funerary & ritual context — opening of a mortuary spell or offering formula.",
    };
  }
  if (isRoyal || isRa) {
    return {
      period: "Middle–New Kingdom (c. 2055–1069 BCE)",
      context: "Royal titulary — a title of divine kingship or the pharaoh's five great names.",
    };
  }
  if (isGreeting) {
    return {
      period: "Archaic to Greco-Roman (c. 3100 BCE – 395 CE)",
      context: "Formal greeting formula — widely attested on amulets, tombs and monuments.",
    };
  }
  if (isTemple) {
    return {
      period: "Ramesside period (c. 1292–1069 BCE)",
      context: "Temple & scribal culture — connected with institutional learning and archives.",
    };
  }
  return {
    period: "Archaic to Ptolemaic (local corpus)",
    context: "General votive inscription — the meaning is resolved entirely from the local sign corpus.",
  };
}

export function interpretationOf(r: DecipherResult): string {
  const known = r.breakdown.filter((b) => b.known);
  if (known.length === 0) {
    return "No signs or words matched the local dictionary. Try entering attested glyphs (e.g. 𓋹𓆸𓋴𓈖𓃀) or transliterated words such as 'ankh', 'nefer' or 'maat'.";
  }
  const senses = known.map((b) => ("glyph" in b ? b.meaning : b.meaning)).slice(0, 4);
  const joined = senses.join("; ");
  return `The system resolved ${known.length} of ${r.breakdown.length} detected elements against the local sign corpus. Leading senses: ${joined}. ${r.context}`;
}
