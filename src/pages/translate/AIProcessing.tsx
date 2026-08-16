import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Check, Loader2 } from "lucide-react";
import { PROCESSING_STAGES } from "./types";
import { StonePlaque } from "./StonePlaque";
import { cn } from "@/lib/utils";

interface AIProcessingProps {
  image: string | null;
  duration: number;
}

export function AIProcessing({ image, duration }: AIProcessingProps) {
  const [step, setStep] = useState(0);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = performance.now();
    const tick = setInterval(() => {
      const elapsed = performance.now() - (startedAt.current ?? 0);
      const p = Math.min(1, elapsed / duration);
      const s = Math.min(PROCESSING_STAGES.length - 1, Math.floor(p * PROCESSING_STAGES.length));
      setStep(s);
      if (p >= 1) clearInterval(tick);
    }, 120);
    return () => clearInterval(tick);
  }, [duration]);

  const progress = Math.round(((step + 1) / PROCESSING_STAGES.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-electric/30 bg-midnight/50 p-5 shadow-[0_0_60px_hsla(190,90%,50%,0.14)] backdrop-blur-xl md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,hsla(190,90%,50%,0.08),transparent_60%)]" />

      <div className="relative mb-6 flex flex-wrap items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-electric/40 bg-electric/10">
          <ScanLine className="h-5 w-5 animate-pulse text-electric" />
        </span>
        <div>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-ivory">AI DECIPHERING SEQUENCE</p>
          <p className="font-mono-code text-[0.6rem] uppercase tracking-[0.24em] text-foreground/45">visual analysis · no backend processing</p>
        </div>
        <span className="ml-auto font-mono-code text-lg font-bold text-electric">{progress}%</span>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* scanning preview */}
        <div className="relative overflow-hidden rounded-2xl border border-electric/25 bg-obsidian/60">
          <div className="absolute inset-0">
            {image ? (
              <img src={image} alt="Scanning inscription" className="h-full w-full object-contain" loading="lazy" />
            ) : (
              <div className="flex h-full items-center justify-center p-6">
                <StonePlaque className="h-64" />
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/80" />
          <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
            <div className="t-scan-beam" />
            <div className="absolute inset-x-0 top-0 h-full animate-pulse bg-[linear-gradient(180deg,transparent,hsla(190,92%,60%,0.08),transparent)]" />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2">
            <span className="font-mono-code text-[0.58rem] uppercase tracking-[0.24em] text-electric">SCAN ACTIVE</span>
            <span className="flex items-center gap-1.5 font-mono-code text-[0.58rem] text-foreground/50">
              <Loader2 className="h-3 w-3 animate-spin" /> OPTICAL
            </span>
          </div>
          {/* detected glyph highlight grid */}
          <div className="absolute inset-0 grid grid-cols-4 gap-px opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={cn("border border-electric/10", i % 3 === 1 && "animate-pulse bg-electric/10")} />
            ))}
          </div>
        </div>

        {/* stages */}
        <ol className="relative space-y-2.5">
          {PROCESSING_STAGES.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} className="relative pl-10">
                {i < PROCESSING_STAGES.length - 1 && (
                  <span className={cn("absolute left-[13px] top-7 h-[calc(100%-8px)] w-px", done ? "bg-electric/50" : "bg-foreground/12")} />
                )}
                <span
                  className={cn(
                    "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border font-mono-code text-[0.62rem] font-bold transition-all duration-500",
                    done && "border-electric/50 bg-electric/15 text-electric",
                    current && "border-electric bg-electric/20 text-electric shadow-[0_0_16px_hsla(190,90%,55%,0.5)]",
                    !done && !current && "border-foreground/15 text-foreground/30"
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : current ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={cn(
                    "pt-1 font-mono-code text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                    done && "text-foreground/50",
                    current && "text-electric",
                    !done && !current && "text-foreground/30"
                  )}
                >
                  {label}
                  {current && <span className="t-input-caret ml-1 inline-block h-3 w-1.5 bg-electric/70 align-middle" />}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* progress bar */}
      <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric/60 via-electric to-electric/60 shadow-[0_0_12px_hsla(190,90%,55%,0.8)]"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.25 }}
        />
      </div>

      <AnimatePresence>
        {step === PROCESSING_STAGES.length - 1 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center font-display text-xs font-bold tracking-[0.3em] text-gold"
          >
            ✦ ASSEMBLING DECIPHERMENT RESULT ✦
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
