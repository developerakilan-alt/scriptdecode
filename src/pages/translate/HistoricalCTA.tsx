import { Link } from "react-router-dom";
import { ScrollText, BookOpen, ArrowUp } from "lucide-react";
import { SectionHeading } from "@/components/ui-ext/SectionHeading";
import { MagneticButton } from "@/components/ui-ext/MagneticButton";
import { Reveal } from "@/components/ui-ext/Reveal";

export function HistoricalCTA() {
  return (
    <section id="cta" className="scroll-mt-24 pb-10">
      <SectionHeading
        eyebrow="SECTION 07 — Continue the Quest"
        title="THE ANCIENTS ARE STILL SPEAKING"
        subtitle="Carry the decipherment further — explore the full temple corpus or browse the living dictionary of signs."
      />

      <Reveal delay={0.1} y={20}>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton as="a" href="/full-script" className="btn-gold rounded-xl px-8 py-4 text-sm" ariaLabel="Open Full Script tool">
            <ScrollText className="h-4 w-4" />
            Full Script Corpus
          </MagneticButton>
          <MagneticButton as="a" href="/dictionary" className="btn-ghost-gold rounded-xl px-8 py-4 text-sm" ariaLabel="Open Dictionary">
            <BookOpen className="h-4 w-4" />
            Browse the Dictionary
          </MagneticButton>
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="#laboratory"
            className="flex items-center gap-2 font-mono-code text-[0.62rem] uppercase tracking-[0.28em] text-foreground/45 transition-colors hover:text-gold"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Return to the Laboratory
          </a>
        </div>
      </Reveal>
    </section>
  );
}
