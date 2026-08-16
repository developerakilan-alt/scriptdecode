import { motion } from "framer-motion";
import { Radar } from "lucide-react";

export function AnalysisStandby() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-3xl border border-dashed border-foreground/15 bg-midnight/30 px-6 py-14 text-center backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,hsla(190,90%,50%,0.05),transparent_70%)]" />
      <div className="relative mx-auto flex w-fit flex-col items-center gap-4">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-electric/25 bg-electric/5">
          <Radar className="h-7 w-7 animate-pulse text-electric" />
          <span className="absolute inset-0 animate-ping rounded-full border border-electric/20" style={{ animationDuration: "3s" }} />
        </span>
        <p className="font-display text-sm font-bold tracking-[0.28em] text-ivory">AWAITING DECIPHERMENT</p>
        <p className="max-w-md text-xs leading-relaxed text-foreground/55">
          Upload or type an inscription above and the AI analysis sequence will materialize in this chamber —
          scanning, glyph identification, context and translation.
        </p>
      </div>
    </motion.div>
  );
}
