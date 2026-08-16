import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ToolSwitcher } from "@/components/ui-ext/ToolSwitcher";
import { useAuth } from "@/lib/auth";
import { addHistoryEntry, userIdFor } from "@/lib/history";
import { translateGlyphs, translateTransliteration, randomPhrase, PHRASES, type Phrase } from "@/lib/egypt";
import { TRANSLATE_SAMPLES, sampleDataUri, type SampleImage } from "@/lib/samples";
import { SectionHeading } from "@/components/ui-ext/SectionHeading";

import { TranslateBackdrop } from "./translate/TranslateBackdrop";
import { PageReveal } from "./translate/PageReveal";
import { TranslateHero } from "./translate/TranslateHero";
import { StageProgress } from "./translate/StageProgress";
import { WorkspaceTabs } from "./translate/WorkspaceTabs";
import { InscriptionUploader } from "./translate/InscriptionUploader";
import { GlyphInput } from "./translate/GlyphInput";
import { DecipherButton } from "./translate/DecipherButton";
import { AIProcessing } from "./translate/AIProcessing";
import { AnalysisStandby } from "./translate/AnalysisStandby";
import { TranslationResult } from "./translate/TranslationResult";
import { ArtifactShowcase } from "./translate/ArtifactShowcase";
import { SampleInscription } from "./translate/SampleInscription";
import { DecipherProcess } from "./translate/DecipherProcess";
import { HistoricalContext } from "./translate/HistoricalContext";
import { HistoricalCTA } from "./translate/HistoricalCTA";
import { isGlyphInput, confidenceOf, transliterationOf, contextOf, interpretationOf } from "./translate/lib";
import type { Mode, DecipherResult } from "./translate/types";

const ScriptTranslation = () => {
  const [mode, setMode] = useState<Mode>("upload");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(1800);
  const [result, setResult] = useState<DecipherResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const persist = (r: { source: string; english: string }) => {
    if (!user) return;
    addHistoryEntry({
      userId: userIdFor(user.email),
      tool: "translate",
      source: r.source,
      output: r.english,
    });
    toast.success("Saved to My Scrolls");
  };

  const buildDecipher = (
    source: string,
    breakdown: DecipherResult["breakdown"],
    english: string,
    note: string,
    transliteration?: string
  ): DecipherResult => {
    const base = {
      source,
      breakdown,
      english,
      note,
      transliteration: transliteration ?? transliterationOf(breakdown),
      confidence: confidenceOf(breakdown),
      period: "",
      context: "",
      interpretation: "",
    };
    const ctx = contextOf(base);
    const full: DecipherResult = { ...base, ...ctx, interpretation: interpretationOf({ ...base, ...ctx }) };
    return full;
  };

  const runTextTranslation = (input: string) => {
    setLoading(true);
    setDuration(1800);
    setTimeout(() => {
      if (isGlyphInput(input)) {
        const breakdown = translateGlyphs(input);
        const known = breakdown.filter((b) => b.known);
        const meanings = known.map((b) => b.meaning.split(" — ")[0]).join(", ");
        const r = buildDecipher(
          input,
          breakdown,
          known.length > 0
            ? `${meanings} — the hieroglyphs spell out these meanings in sequence.`
            : "None of the signs are in the local dictionary. Try transliterated words like 'ankh' or 'nefer'.",
          "Sign-by-sign dictionary translation"
        );
        setResult(r);
        persist(r);
      } else {
        const breakdown = translateTransliteration(input);
        const known = breakdown.filter((b) => b.known);
        const r = buildDecipher(
          input,
          breakdown,
          known.length > 0
            ? `${known.map((b) => b.word).join(" + ")} = ${known.map((b) => b.meaning).join(", ")}.`
            : "No words matched. Try 'ankh', 'nefer', 're', 'maat', 'hotep', 'djed', 'wedja', 'seneb'.",
          "Transliteration dictionary lookup"
        );
        setResult(r);
        persist(r);
      }
      setLoading(false);
    }, 1800);
  };

  const runImageTranslation = (src: string, name: string) => {
    setImage(src);
    setFileName(name);
    setResult(null);
    setLoading(true);
    setDuration(3000);
    setTimeout(() => {
      const p = randomPhrase();
      const r = buildDecipher(
        p.full,
        translateGlyphs(p.full),
        `${p.transliteration} — "${p.english}"`,
        "Best-matching inscription from the temple corpus",
        p.transliteration
      );
      setResult(r);
      persist(r);
      setLoading(false);
    }, 3000);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      runImageTranslation(reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([
      `Source: ${result.source}\n\nTransliteration: ${result.transliteration}\n\nEnglish: ${result.english}\n\nNote: ${result.note}`,
    ], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script-translation.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const runSample = (s: SampleImage) => {
    setImage(sampleDataUri(s));
    setFileName(`${s.key}.svg`);
    setResult(null);
    setLoading(true);
    setDuration(2400);
    setTimeout(() => {
      const p: Phrase = PHRASES.find((x) => x.name === s.label) ?? randomPhrase();
      const r = buildDecipher(
        p.full,
        translateGlyphs(p.full),
        `${p.transliteration} — "${p.english}"`,
        "Sample inscription from the temple corpus",
        p.transliteration
      );
      setResult(r);
      persist(r);
      setLoading(false);
    }, 2400);
  };

  const activeStage = loading ? 1 : result ? 2 : 0;

  const firstGlyph = result?.breakdown.find((b) => "glyph" in b);
  const detectedGlyph = firstGlyph && "glyph" in firstGlyph ? firstGlyph.glyph : undefined;
  const detectedLabel =
    firstGlyph && "glyph" in firstGlyph
      ? (result?.transliteration ?? "").split(" ")[0] || undefined
      : undefined;

  return (
    <div className="translate-lab relative min-h-screen overflow-x-hidden">
      <TranslateBackdrop />
      <PageReveal />

      <main className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <TranslateHero />
        <ToolSwitcher />

        {/* SECTION 02 — Translation Laboratory */}
        <section id="laboratory" className="scroll-mt-24">
          <div className="mb-8">
            <SectionHeading
              eyebrow="SECTION 02 — The Laboratory"
              title="TRANSLATION LABORATORY"
              align="left"
              subtitle="Feed the system an inscription and follow the three stages of the decipherment."
            />
          </div>

          <div className="mt-2">
            <StageProgress active={activeStage} />
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* workspace card */}
            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-midnight/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 font-mono-code text-[0.62rem] font-bold text-gold">
                    IN
                  </span>
                  <p className="font-mono-code text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-foreground/60">
                    Inscription Input
                  </p>
                  <span className="ml-auto font-mono-code text-[0.58rem] text-foreground/35">STEP 01 / 03</span>
                </div>

                <WorkspaceTabs mode={mode} onChange={setMode} disabled={loading} />

                <div className="mt-5">
                  {mode === "upload" ? (
                    <div className="space-y-5">
                      <InscriptionUploader
                        image={image}
                        fileName={fileName}
                        onFile={handleFile}
                        onRemove={() => {
                          setImage(null);
                          setFileName(null);
                        }}
                        disabled={loading}
                      />
                      <div className="flex justify-center">
                        <DecipherButton
                          onClick={() => {
                            if (image) runImageTranslation(image, fileName ?? "inscription");
                          }}
                          disabled={!image || loading}
                          loading={loading}
                        />
                      </div>
                    </div>
                  ) : (
                    <GlyphInput
                      text={text}
                      onChange={setText}
                      onDecipher={() => runTextTranslation(text)}
                      disabled={!text.trim()}
                      loading={loading}
                    />
                  )}
                </div>

                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} />
              </div>

              {/* artifact showcase with holographic panels */}
              <div className="rounded-3xl border border-electric/15 bg-midnight/30 p-4 backdrop-blur-md lg:hidden">
                <p className="mb-2 text-center font-mono-code text-[0.58rem] uppercase tracking-[0.3em] text-foreground/45">
                  Artifact Analysis Chamber
                </p>
                <ArtifactShowcase
                  detectedGlyph={detectedGlyph}
                  detectedLabel={detectedLabel}
                  meaning={firstGlyph && "glyph" in firstGlyph ? firstGlyph.meaning : undefined}
                  confidence={result?.confidence ?? null}
                  period={result?.period}
                  analysis={result?.context}
                  active={loading}
                  done={Boolean(result)}
                />
              </div>
            </div>

            {/* artifact column (desktop) */}
            <div className="relative hidden lg:block">
              <div className="sticky top-24">
                <p className="mb-4 text-center font-mono-code text-[0.6rem] uppercase tracking-[0.34em] text-foreground/45">
                  Artifact Analysis Chamber
                </p>
                <ArtifactShowcase
                  detectedGlyph={detectedGlyph}
                  detectedLabel={detectedLabel}
                  meaning={firstGlyph && "glyph" in firstGlyph ? firstGlyph.meaning : undefined}
                  confidence={result?.confidence ?? null}
                  period={result?.period}
                  analysis={result?.context}
                  active={loading}
                  done={Boolean(result)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03 — AI Analysis Result */}
        <section id="analysis" className="scroll-mt-24 pt-10">
          <div className="mb-8">
            <SectionHeading
              eyebrow="SECTION 03 — The Decipherment"
              title="AI ANALYSIS RESULT"
              align="left"
              subtitle="The reconstruction chamber — where signs, words and context are resolved into a single reading."
            />
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <AIProcessing key="processing" image={image} duration={duration} />
            ) : result ? (
              <TranslationResult key="result" result={result} image={image} onDownload={download} />
            ) : (
              <AnalysisStandby key="standby" />
            )}
          </AnimatePresence>
        </section>

        {/* SECTION 04 — Sample Ancient Inscriptions */}
        <section className="pt-24">
          <SampleInscription samples={TRANSLATE_SAMPLES} onRun={runSample} disabled={loading} />
        </section>

        {/* SECTION 05 — How AI Deciphers */}
        <section className="pt-24">
          <DecipherProcess />
        </section>

        {/* SECTION 06 — Historical Context */}
        <section className="pt-24">
          <HistoricalContext />
        </section>

        {/* SECTION 07 — Call To Action */}
        <section className="pt-24">
          <HistoricalCTA />
        </section>
      </main>
    </div>
  );
};

export default ScriptTranslation;
