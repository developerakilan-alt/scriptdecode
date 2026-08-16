import { motion } from "framer-motion";
import { Download, FileSearch, Landmark, Sparkles } from "lucide-react";
import { CopyShare } from "@/components/ui-ext/CopyShare";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { GlyphAnalysis } from "./GlyphAnalysis";
import type { DecipherResult } from "./types";
import { cn } from "@/lib/utils";

interface TranslationResultProps {
  result: DecipherResult;
  image: string | null;
  onDownload: () => void;
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <span className="flex items-center gap-2 font-mono-code text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-electric">
        <span className="h-px w-4 bg-electric/50" />
        {label}
      </span>
      {children}
    </div>
  );
}

export function TranslationResult({ result, image, onDownload }: TranslationResultProps) {
  const glyphChips = result.breakdown
    .map((b) => ("glyph" in b ? b.glyph : null))
    .filter((g): g is string => Boolean(g));

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-gold/25 bg-midnight/55 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_0%,hsla(43,82%,56%,0.08),transparent_60%)]" />

      {/* header */}
      <div className="relative flex flex-wrap items-center gap-3 border-b border-gold/15 px-6 py-5 md:px-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 glow-gold">
          <FileSearch className="h-5 w-5 text-gold" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold tracking-[0.16em] text-ivory">DECIPHERMENT RESULT</h3>
          <p className="font-mono-code text-[0.58rem] uppercase tracking-[0.24em] text-foreground/45">{result.note}</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <button onClick={onDownload} className="btn-ghost-gold flex items-center gap-2 rounded-lg px-4 py-2 text-xs">
            <Download className="h-4 w-4" />
            Download Result
          </button>
          <CopyShare text={`${result.source}\n\nTransliteration: ${result.transliteration}\n\nEnglish: ${result.english}\n\nNote: ${result.note}`} title="Script Decode decipherment" />
        </div>
      </div>

      <div className="relative space-y-7 px-6 py-7 md:px-8">
        {/* ORIGINAL */}
        <Field label="Original">
          {image ? (
            <img src={image} alt="Original inscription" className="max-h-56 rounded-xl border border-gold/15 object-contain" loading="lazy" />
          ) : (
            <p className="font-mono-code text-2xl leading-loose tracking-wider text-gold">{result.source}</p>
          )}
        </Field>

        <hr className="t-hr" />

        {/* DETECTED GLYPHS */}
        {glyphChips.length > 0 ? (
          <Field label="Detected Glyphs">
            <div className="flex flex-wrap gap-2">
              {glyphChips.map((g, i) => (
                <span key={i} className="t-glyph-chip h-12 w-12 text-2xl">{g}</span>
              ))}
            </div>
          </Field>
        ) : (
          <Field label="Detected Words">
            <div className="flex flex-wrap gap-2">
              {result.breakdown.map((b, i) => (
                <span key={i} className="rounded-lg border border-electric/30 bg-electric/5 px-3 py-1.5 font-mono-code text-xs text-electric">
                  {("word" in b ? b.word : b.glyph)}
                </span>
              ))}
            </div>
          </Field>
        )}

        <hr className="t-hr" />

        {/* TRANSLITERATION */}
        <Field label="Transliteration">
          <p className="font-mono-code text-lg tracking-widest text-ivory">{result.transliteration}</p>
        </Field>

        <hr className="t-hr" />

        {/* TRANSLATION + CONFIDENCE */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Field label="Translation">
            <p className="text-xl leading-relaxed text-ivory md:text-2xl">{result.english}</p>
          </Field>
          <div className="mx-auto md:mx-0">
            <ConfidenceMeter value={result.confidence} />
          </div>
        </div>

        <hr className="t-hr" />

        {/* HISTORICAL CONTEXT */}
        <div className="grid gap-7 md:grid-cols-2">
          <Field label="Historical Context">
            <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground/75">
              <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
              {result.context}
            </p>
          </Field>
          <Field label="Script Period">
            <p className="font-display text-lg font-semibold text-gold">{result.period}</p>
          </Field>
        </div>

        <hr className="t-hr" />

        {/* AI INTERPRETATION */}
        <Field label="AI Interpretation">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground/75">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
            {result.interpretation}
          </p>
        </Field>

        <hr className="t-hr" />

        {/* GLYPH ANALYSIS */}
        <Field label="Glyph Analysis Catalogue">
          <GlyphAnalysis breakdown={result.breakdown} />
        </Field>
      </div>
    </motion.div>
  );
}
