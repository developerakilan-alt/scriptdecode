import { SIGNS } from "@/lib/egypt";
import { Counter } from "@/components/ui-ext/Counter";
import { SectionHeading } from "@/components/ui-ext/SectionHeading";
import { Reveal } from "@/components/ui-ext/Reveal";

const STATS = [
  { value: 3000, suffix: "+", label: "YEARS OF SCRIPT EVOLUTION", note: "from the earliest signs to the late hieroglyphs" },
  { value: SIGNS.length, suffix: "+", label: "CORE GLYPH SIGNS", note: "indexed in the decipherment corpus" },
  { value: 3, suffix: "", label: "HISTORICAL PERIODS", note: "from the Old Kingdom through Ptolemaic rule" },
];

export function HistoricalContext() {
  return (
    <section id="history" className="scroll-mt-24">
      <SectionHeading
        eyebrow="SECTION 06 — Heritage"
        title="THE SCRIPT ACROSS TIME"
        subtitle="Hieroglyphs were written for more than three millennia — the longest continuous writing system of the ancient world."
      />

      <div className="relative mt-12 overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-b from-[#1a1e30] to-[#0b0e1d] px-6 py-12 md:px-12">
        <div className="pointer-events-none absolute inset-0 hieroglyph-pattern opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <p className="relative text-center font-mono-code text-xl tracking-[0.6em] text-gold/60">𓂀 𓋹 𓊽 𓆄 𓇳</p>

        <div className="relative mt-10 grid gap-10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.14} y={20}>
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="font-display text-5xl font-bold text-gold md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} duration={1.8} />
                </span>
                <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                <span className="font-mono-code text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-ivory">{s.label}</span>
                <span className="max-w-[16rem] text-xs leading-relaxed text-foreground/55">{s.note}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="relative mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-foreground/60">
          What the Greeks called <em>hieroglyphika</em> — sacred carvings — the Egyptians themselves named{" "}
          <span className="text-gold">medu netjer</span>, the god's words. The same signs that opened a tomb in the
          Valley of the Kings open a century of data inside this laboratory.
        </p>
      </div>
    </section>
  );
}
