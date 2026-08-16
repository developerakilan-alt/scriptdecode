import { ScanLine, Braces, Network, Languages } from "lucide-react";
import { SectionHeading } from "@/components/ui-ext/SectionHeading";
import { Reveal } from "@/components/ui-ext/Reveal";

const STEPS = [
  {
    icon: ScanLine,
    title: "IMAGE RECOGNITION",
    text: "The inscription is optically isolated from stone, papyrus or amulet and normalized for analysis.",
  },
  {
    icon: Braces,
    title: "GLYPH IDENTIFICATION",
    text: "Each carved or written sign is matched against the local sign corpus to recover its phonetic value.",
  },
  {
    icon: Network,
    title: "CONTEXT ANALYSIS",
    text: "Sign sequences are cross-referenced with known phrase patterns to resolve grammar and intent.",
  },
  {
    icon: Languages,
    title: "TRANSLATION",
    text: "A readable English rendering is composed together with its transliteration and historical context.",
  },
];

export function DecipherProcess() {
  return (
    <section id="process" className="scroll-mt-24">
      <SectionHeading
        eyebrow="SECTION 05 — Methodology"
        title="HOW AI DECIPHERS"
        subtitle="A four-stage pipeline inspired by the work of Champollion and the modern computational analysis of the Rosetta Stone."
      />

      <div className="relative mt-14">
        {/* glowing connector line (desktop horizontal) */}
        <div className="absolute left-0 right-0 top-7 hidden h-px md:block">
          <Reveal className="h-full">
            <div className="h-px bg-gradient-to-r from-electric/10 via-electric/70 to-electric/10 shadow-[0_0_12px_hsla(190,90%,55%,0.6)]" />
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.14} y={22}>
              <div className="relative flex flex-col items-center gap-4 text-center">
                {/* node */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-electric/40 bg-midnight/80 shadow-[0_0_24px_hsla(190,90%,50%,0.3)] backdrop-blur-xl">
                  <s.icon className="h-6 w-6 text-electric" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-obsidian font-mono-code text-[0.6rem] font-bold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold tracking-[0.16em] text-ivory">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
