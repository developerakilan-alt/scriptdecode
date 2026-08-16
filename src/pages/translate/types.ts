export type Mode = "upload" | "text";

export interface GlyphResult {
  glyph: string;
  meaning: string;
  known: boolean;
}

export interface WordResult {
  word: string;
  meaning: string;
  known: boolean;
}

export type Breakdown = (GlyphResult | WordResult)[];

export interface DecipherResult {
  source: string;
  transliteration: string;
  breakdown: Breakdown;
  english: string;
  note: string;
  confidence: number;
  period: string;
  context: string;
  interpretation: string;
}

export const PROCESSING_STAGES = [
  "SCANNING INSCRIPTION",
  "IDENTIFYING GLYPHS",
  "ANALYZING CONTEXT",
  "CROSS-REFERENCING SCRIPT",
  "GENERATING TRANSLATION",
  "DECIPHERMENT COMPLETE",
] as const;
