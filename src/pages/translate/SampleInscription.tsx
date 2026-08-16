import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui-ext/TiltCard";
import { SectionHeading } from "@/components/ui-ext/SectionHeading";
import { SIGNS } from "@/lib/egypt";
import { sampleDataUri, type SampleImage } from "@/lib/samples";

function translitOf(glyphs: string): string {
  return Array.from(glyphs)
    .map((g) => SIGNS[g]?.transliteration ?? "?")
    .join(" ");
}

interface SampleInscriptionProps {
  samples: SampleImage[];
  onRun: (s: SampleImage) => void;
  disabled?: boolean;
}

export function SampleInscription({ samples, onRun, disabled }: SampleInscriptionProps) {
  return (
    <section id="samples" className="scroll-mt-24">
      <SectionHeading
        eyebrow="SECTION 04 — Specimens"
        title="SAMPLE ANCIENT INSCRIPTIONS"
        subtitle="Decode authentic inscriptions from the temple corpus. Each specimen is engraved in the same style as the recovered originals."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {samples.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard intensity={4} className="h-full">
              <button
                type="button"
                onClick={() => onRun(s)}
                disabled={disabled}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-[#232839] to-[#0d101f] text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_0_40px_hsla(43,82%,56%,0.28),0_0_60px_hsla(190,90%,50%,0.14)] disabled:opacity-40"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* stone speckle */}
                <div className="t-stone pointer-events-none absolute inset-0 opacity-60" />
                <div className="pointer-events-none absolute inset-0 hieroglyph-pattern opacity-40" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                <div className="relative p-4">
                  <img
                    src={sampleDataUri(s)}
                    alt={s.label}
                    loading="lazy"
                    className="aspect-[16/9] w-full rounded-xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 space-y-1.5">
                    <p className="font-display text-sm font-bold tracking-[0.14em] text-gold">{s.label.toUpperCase()}</p>
                    <p className="font-mono-code text-[0.62rem] uppercase tracking-[0.2em] text-electric">{translitOf(s.glyphs)}</p>
                    <p className="text-xs leading-snug text-foreground/60">{s.description}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-gold/15 pt-3">
                    <span className="font-mono-code text-[0.58rem] uppercase tracking-[0.24em] text-gold/70 transition-colors group-hover:text-gold">
                      ✦ Decipher Specimen
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                  </div>
                </div>
              </button>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
