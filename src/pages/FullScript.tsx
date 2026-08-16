import { useRef, useState } from "react";
import { Upload, Image as ImageIcon, Download, ScrollText, Sparkles, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import { EyeOfHorus } from "@/components/EyeOfHorus";
import { SignPicker } from "@/components/ui-ext/SignPicker";
import { CopyShare } from "@/components/ui-ext/CopyShare";
import { SkeletonCard } from "@/components/ui-ext/Skeleton";
import { useAuth } from "@/lib/auth";
import { addHistoryEntry, userIdFor } from "@/lib/history";
import { completePhrase, randomPhrase, translateGlyphs, PHRASES, type Phrase } from "@/lib/egypt";
import { FULLSCRIPT_SAMPLES, sampleDataUri, type SampleImage } from "@/lib/samples";

type Mode = "upload" | "text";

const ScriptCompletion = () => {
  const [mode, setMode] = useState<Mode>("upload");
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    partial: string;
    phrase: Phrase;
    reconstructed: string;
    matchedBy: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const persist = (phrase: Phrase, partial: string) => {
    if (!user) return;
    addHistoryEntry({
      userId: userIdFor(user.email),
      tool: "full-script",
      source: partial,
      output: `${phrase.transliteration} — "${phrase.english}"`,
    });
    toast.success("Saved to My Scrolls");
  };

  const buildResult = (partial: string) => {
    const match = completePhrase(partial);
    if (!match) {
      setResult({
        partial,
        phrase: {
          name: "No match",
          partial,
          full: partial,
          transliteration: "—",
          english: `No phrase in the corpus matches "${partial}". Try a known opening such as 𓋹𓆸 (ankh wedja…) or the word "ankh".`,
        },
        reconstructed: "",
        matchedBy: "none",
      });
      return;
    }
    setResult({
      partial,
      phrase: match.phrase,
      reconstructed: match.reconstructed,
      matchedBy: match.matchedBy,
    });
    persist(match.phrase, partial);
  };

  const runText = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setLoading(true);
    setTimeout(() => {
      buildResult(trimmed);
      setLoading(false);
    }, 1500);
  };

  const handleText = () => runText(text);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResult(null);
      setLoading(true);
      setTimeout(() => {
        const p = randomPhrase();
        buildResult(p.partial);
        setLoading(false);
      }, 3200);
    };
    reader.readAsDataURL(file);
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob(
      [`Partial: ${result.partial}\n\nEgyptian (completed): ${result.phrase.full}\nTransliteration: ${result.phrase.transliteration}\nEnglish: ${result.phrase.english}`],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reconstructed-script.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const runSample = (s: SampleImage) => {
    setImage(sampleDataUri(s));
    setResult(null);
    setLoading(true);
    setTimeout(() => {
      const p: Phrase = PHRASES.find((x) => x.name === s.label) ?? randomPhrase();
      buildResult(p.partial);
      setLoading(false);
    }, 2200);
  };

  return (
    <PageLayout
      title="Full Script"
      eyebrow="Ancient Tool"
      subtitle="Upload a damaged script or type its surviving fragment — the AI completes the sentence in Egyptian and English."
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <GlassCard className="p-6" hover={false}>
          <div className="mb-5 flex gap-2">
            {[
              { key: "upload" as Mode, label: "Upload Image", icon: ImageIcon },
              { key: "text" as Mode, label: "Type Partial Text", icon: PenLine },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
                  mode === m.key
                    ? "bg-gold/15 text-gold border border-gold/40"
                    : "text-muted-foreground border border-transparent hover:text-foreground"
                }`}
              >
                <m.icon className="h-4 w-4" />
                {m.label}
              </button>
            ))}
          </div>

          {mode === "upload" ? (
            <div
              className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed border-gold/30 p-12 transition-colors hover:border-gold/50"
              onClick={() => fileRef.current?.click()}
              role="button"
              aria-label="Upload a damaged or partial Egyptian script"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 transition-transform group-hover:scale-110">
                <Upload className="h-7 w-7 text-gold" />
              </div>
              <p className="text-center text-muted-foreground">
                Upload a damaged or partial Egyptian script — the surviving glyphs are read and the missing part is rebuilt
              </p>
              <span className="btn-ghost-gold rounded-lg px-6 py-2 text-sm font-medium">Upload Image</span>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={'Type the surviving fragment, e.g. 𓋹𓆸 (ankh wedja…) or "sa" — and the temple completes the phrase'}
                rows={3}
                className="w-full rounded-xl border border-gold/25 bg-obsidian/60 p-4 font-mono-code text-lg text-foreground placeholder:text-sm placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none"
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleText}
                  disabled={!text.trim() || loading}
                  className="btn-gold flex items-center gap-2 rounded-xl px-6 py-3 text-sm disabled:opacity-40"
                >
                  <Sparkles className="h-4 w-4" />
                  Complete the Script
                </button>
                <button onClick={() => { const sample = "𓋹𓆸"; setText(sample); runText(sample); }} className="btn-ghost-gold rounded-xl px-4 py-2 text-xs">
                  Try sample
                </button>
                <SignPicker onPick={(g) => setText((t) => t + g)} />
              </div>
            </div>
          )}

          {mode === "upload" && (
            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                <ImageIcon className="h-4 w-4 text-gold/60" />
                No damaged photo? Try a broken inscription
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {FULLSCRIPT_SAMPLES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => runSample(s)}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-xl border border-gold/20 bg-obsidian/40 text-left transition-all hover:border-gold/50 hover:shadow-[0_0_26px_hsla(43,82%,56%,0.18)] disabled:opacity-40"
                  >
                    <img
                      src={sampleDataUri(s)}
                      alt={s.label}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="font-display text-xs font-semibold text-gold">{s.label}</p>
                      <p className="text-[0.65rem] leading-snug text-foreground/70">{s.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        <AnimatePresence>
          {image && (
            <GlassCard className="overflow-hidden p-4" hover={false}>
              <div className="flex items-center gap-2 pb-3 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4 text-electric" />
                Original (Damaged) Image
              </div>
              <img src={image} alt="Original script" className="w-full rounded-md object-contain" loading="lazy" />
            </GlassCard>
          )}
        </AnimatePresence>

        {loading && (
          <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="w-14">
                <EyeOfHorus phase="scan" />
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <ScrollText className="h-4 w-4 animate-pulse text-gold" />
                Reconstructing script…
              </p>
            </div>
            <SkeletonCard rows={3} />
            <SkeletonCard rows={4} />
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-6" hover={false}>
                <div className="mb-3 flex items-center gap-2">
                  <ScrollText className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-lg text-gold">Surviving Fragment</h3>
                </div>
                <p className="font-mono-code text-3xl tracking-wider text-gold">{result.partial}</p>
                {result.partial !== result.phrase.full && result.reconstructed && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Detected {result.phrase.name} ({result.matchedBy === "glyphs" ? "glyph match" : "word match"})
                  </p>
                )}
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-electric" />
                  <h3 className="font-display text-lg text-gold">Completed — Egyptian</h3>
                </div>
                <p className="text-3xl leading-loose tracking-widest text-gold">{result.phrase.full}</p>
                {result.reconstructed && (
                  <p className="mt-3 rounded-lg border border-electric/20 bg-electric/5 px-3 py-2 font-mono-code text-xs text-electric">
                    Reconstructed section: {result.reconstructed}
                  </p>
                )}
                <p className="mt-2 font-mono-code text-sm text-muted-foreground">{result.phrase.transliteration}</p>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="mb-3 flex items-center gap-2">
                  <LanguagesIcon />
                  <h3 className="font-display text-lg text-gold">Completed — English</h3>
                </div>
                <p className="leading-relaxed text-foreground">{result.phrase.english}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {translateGlyphs(result.phrase.full).filter((s) => s.known).map((s) => s.meaning.split(" — ")[0]).join(" · ")}
                </p>
                <button onClick={download} className="btn-ghost-gold mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm">
                  <Download className="h-4 w-4" />
                  Download Result
                </button>
                <div className="mt-3">
                  <CopyShare
                    text={`${result.partial}\n→ ${result.phrase.transliteration}\n→ ${result.phrase.english}`}
                    title="Script Decode reconstruction"
                  />
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

const LanguagesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gold">
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

export default ScriptCompletion;
