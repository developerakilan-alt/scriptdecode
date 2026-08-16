import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard } from "lucide-react";
import { SIGNS } from "@/lib/egypt";

const SIGNS_LIST = Object.values(SIGNS);

export function SignPicker({ onPick }: { onPick: (glyph: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-ghost-gold flex items-center gap-2 rounded-lg px-4 py-2 text-xs"
        aria-expanded={open}
        aria-label="Open hieroglyph sign picker"
      >
        <Keyboard className="h-4 w-4" />
        Sign Picker
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border border-gold/20 bg-midnight/90 p-4 backdrop-blur-xl">
              <p className="mb-3 font-mono-code text-[0.62rem] uppercase tracking-[0.3em] text-gold/70">
                Tap a sign to insert it
              </p>
              <div className="grid max-h-64 grid-cols-6 gap-1.5 overflow-y-auto sm:grid-cols-8 md:grid-cols-10">
                {SIGNS_LIST.map((s) => (
                  <button
                    key={s.glyph}
                    onClick={() => {
                      onPick(s.glyph);
                      setOpen(false);
                    }}
                    title={`${s.transliteration} — ${s.meaning}`}
                    className="group relative flex aspect-square items-center justify-center rounded-lg border border-gold/15 bg-obsidian/60 text-2xl text-gold transition-all hover:border-gold/50 hover:bg-gold/10 hover:scale-110"
                  >
                    {s.glyph}
                    <span className="pointer-events-none absolute -top-1 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded border border-gold/30 bg-midnight px-2 py-1 font-mono-code text-[0.58rem] text-gold group-hover:block">
                      {s.transliteration}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
