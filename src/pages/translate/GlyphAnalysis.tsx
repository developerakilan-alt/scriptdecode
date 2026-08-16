import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Fingerprint } from "lucide-react";
import { SIGNS } from "@/lib/egypt";
import type { Breakdown } from "./types";
import { cn } from "@/lib/utils";

export function GlyphAnalysis({ breakdown }: { breakdown: Breakdown }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {breakdown.map((b, i) => {
        const isGlyph = "glyph" in b;
        const glyph = isGlyph ? (b as { glyph: string }).glyph : null;
        const code = glyph ? SIGNS[glyph]?.transliteration ?? "unidentified" : (b as { word: string }).word;
        const meaning = b.meaning;
        const known = b.known;
        const expanded = open === i;

        return (
          <div
            key={i}
            className={cn(
              "group relative overflow-hidden rounded-xl border transition-all duration-300",
              known
                ? "border-gold/20 bg-obsidian/50 hover:border-gold/50 hover:shadow-[0_0_24px_hsla(43,82%,56%,0.16)]"
                : "border-orange-400/25 bg-obsidian/50 hover:border-orange-400/50"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              className="flex w-full items-center gap-3 px-3.5 py-3 text-left"
              aria-expanded={expanded}
            >
              <span
                className={cn(
                  "t-glyph-chip h-11 w-11 shrink-0 text-2xl",
                  !known && "opacity-60 grayscale"
                )}
              >
                {glyph ?? (b as { word: string }).word.slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono-code text-[0.62rem] uppercase tracking-[0.24em] text-electric">
                  {known ? (isGlyph ? "GLYPH" : "WORD") : "UNMATCHED"}
                  {isGlyph && <span className="ml-2 text-gold">{code}</span>}
                </span>
                <span className={cn("block truncate text-xs", known ? "text-foreground/85" : "text-orange-300")}>{meaning}</span>
              </span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-300", expanded && "rotate-180")} />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gold/10 px-3.5 py-3 font-mono-code text-[0.65rem] leading-relaxed text-foreground/60">
                    <p className="flex items-start gap-2">
                      <Fingerprint className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                      {known
                        ? `Catalogue entry ${isGlyph ? `— ${code}` : ""}: ${meaning}. Verified against the local sign corpus.`
                        : "Not present in the local corpus — the closest visual match could not be confirmed."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
