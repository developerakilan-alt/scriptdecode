import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui-ext/Reveal";
import { SectionHeading } from "@/components/ui-ext/SectionHeading";
import { Counter } from "@/components/ui-ext/Counter";
import { DailyHieroglyph } from "@/components/ui-ext/DailyHieroglyph";
import { ParallaxGlyphs } from "@/components/ui-ext/ParallaxGlyphs";
import { MagneticButton } from "@/components/ui-ext/MagneticButton";
import { useScrollSpy } from "@/components/ui-ext/useScrollSpy";
import { dispatchSpy } from "@/lib/spy";
import { AnubisShowcase } from "@/components/home/AnubisShowcase";
import { EyeHorusShowcase } from "@/components/home/EyeHorusShowcase";
import { DeitySelector } from "@/components/home/DeitySelector";
import {
  RoyalPortrait,
  GoldScarab,
  ScholarMask,
  ScanOrb,
  AICore,
} from "@/components/home/FeatureVisuals";

const FEATURES = [
  {
    to: "/translate",
    spyId: "tool-translate",
    badge: "AI Translator",
    title: "AI TRANSLATOR",
    desc: "Advanced AI model trained on thousands of hieroglyphic inscriptions and ancient texts.",
    statLabel: "ACCURACY RATE",
    statNum: 98.7,
    statSuffix: "%",
    statDecimals: 1,
    visual: <RoyalPortrait className="h-full w-full" />,
    orb: <ScanOrb className="h-full w-full orb-spin" />,
    accent: "text-gold",
  },
  {
    to: "/full-script",
    spyId: "tool-full-script",
    badge: "Script Completion",
    title: "SCRIPT COMPLETION",
    desc: "Fill in damaged or incomplete hieroglyphic texts with AI precision and historical context.",
    statLabel: "SUCCESS RATE",
    statNum: 96.3,
    statSuffix: "%",
    statDecimals: 1,
    visual: <GoldScarab className="h-full w-full" />,
    orb: <ScanOrb className="h-full w-full orb-spin-rev" />,
    accent: "text-electric",
  },
  {
    to: "/pastoria",
    spyId: "tool-pastoria",
    badge: "Pastoria AI",
    title: "PASTORIA AI",
    desc: "Ask anything about ancient Egypt. Get answers from our AI scholar and historian.",
    statLabel: "KNOWLEDGE BASE",
    statNum: 10,
    statSuffix: "K+",
    statDecimals: 0,
    visual: <ScholarMask className="h-full w-full" />,
    orb: <AICore className="h-full w-full orb-spin" />,
    accent: "text-turquoise",
  },
];

function EgyIcon({ kind, className }: { kind: "pyramid" | "ankh" | "eye"; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      {kind === "pyramid" && (
        <>
          <path d="M20 4 L 34 32 H 6 Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M20 4 L 20 32" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
          <path d="M13 22 L 20 12 L 27 22" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <path d="M6 32 H 34" stroke="currentColor" strokeWidth="1.4" />
        </>
      )}
      {kind === "ankh" && (
        <path
          d="M20 8 C 14 8, 12 12, 12 16 C 12 20, 15 21, 17 21 C 17 26, 17 30, 17 34 H 23 C 23 30, 23 26, 23 21 C 25 21, 28 20, 28 16 C 28 12, 26 8, 20 8 Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      )}
      {kind === "eye" && (
        <>
          <path
            d="M4 20C4 20 10 12 20 12s16 8 16 8-6 8-16 8S4 20 4 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="3.2" fill="currentColor" />
          <path d="M30 16l4-2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32.4 14l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

const DUST = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  top: `${18 + ((i * 37) % 70)}%`,
  size: 1.5 + ((i * 7) % 10) * 0.35,
  dur: 12 + ((i * 5) % 14),
  delay: ((i * 1.7) % 12).toFixed(2),
  dx: ((i % 5) - 2) * 3,
}));

const JOURNEY = [
  { step: "01", label: "UPLOAD", desc: "Offer a photo of hieroglyphs or type their symbols and words" },
  { step: "02", label: "DECODE", desc: "The Eye of Horus reads every sign and reconstructs its meaning" },
  { step: "03", label: "EXPLORE", desc: "Read the English translation or ask Pastoria to go deeper" },
];

function MagneticCTA({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="inline-block">
      <motion.span style={{ x: sx, y: sy }} className="inline-flex">
        {children}
      </motion.span>
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [figure, setFigure] = useState<"anubis" | "horus" | "sekhmet" | "thoth">("anubis");
  const spy = useScrollSpy([
    { id: "hero", spy: "home" },
    { id: "tool-translate", spy: "translate" },
    { id: "tool-full-script", spy: "full-script" },
    { id: "tool-pastoria", spy: "pastoria" },
  ]);

  useEffect(() => {
    dispatchSpy(spy);
    return () => dispatchSpy(null);
  }, [spy]);

  return (
    <div className="relative">
      {/* ============ HOME BACKGROUND IMAGE (fixed, home only) ============ */}
      <div className="home-page-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="home-page-bg-overlay pointer-events-none fixed inset-0 z-0" aria-hidden />

      {/* ============ HERO ============ */}
      <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="hero-atmosphere pointer-events-none absolute inset-0" />
        <div className="hero-volumetric pointer-events-none absolute inset-0" />
        <div className="hieroglyph-pattern pointer-events-none absolute inset-0 opacity-20" />
        <ParallaxGlyphs />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {DUST.map((d, i) => (
            <span
              key={i}
              className="dust-bit"
              style={
                {
                  left: d.left,
                  top: d.top,
                  width: `${d.size}px`,
                  height: `${d.size}px`,
                  "--d": `${d.dur}s`,
                  "--delay": `${d.delay}s`,
                  "--dx": `${d.dx}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="z-10 mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-6 px-4 pb-8 pt-28 text-center md:pt-32 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.8fr)_minmax(0,1.45fr)] lg:gap-5 lg:px-8 lg:pb-10">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 flex justify-center lg:order-1 lg:justify-end"
          >
            <AnubisShowcase figure={figure} className="w-full max-w-[355px] lg:max-w-[560px] lg:translate-y-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 flex flex-col items-center text-center lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="hero-badge">
                <span className="hero-badge-icon">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="hero-badge-text">Egyptian Script Intelligence</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.34 }}
              className="hero-title mt-6"
            >
              SCRIPT DECODE
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hero-subtitle-row"
            >
              <img src="/Left wing .png" alt="" draggable={false} className="hero-wing hero-wing-img" />
              <span className="hero-subtitle">Speak the Ancients</span>
              <img src="/RIght Wing .png" alt="" draggable={false} className="hero-wing hero-wing-img hero-wing-img-r" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base"
            >
              Translate Egyptian hieroglyphs into English, complete damaged inscriptions in Egyptian and English, and
              explore the world of the pharaohs with an AI scholar —{" "}
              <span className="text-gold">three sacred tools</span>, one ancient temple.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-8 flex max-w-full flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <MagneticCTA>
                <Link
                  to="/translate"
                  aria-label="Translate a Script"
                  className="group relative block max-w-full shrink-0 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <img
                    src="/TranslateButton.jpg"
                    alt="Translate a Script"
                    draggable={false}
                    className="h-[96px] w-auto max-w-full select-none"
                  />
                </Link>
              </MagneticCTA>
              <MagneticButton
                as="button"
                onClick={() => navigate("/pastoria")}
                className="btn-ghost-gold rounded-xl px-8 py-4 text-sm tracking-wide"
              >
                <Bot className="mr-2 h-4 w-4 text-gold" />
                ASK PASTORIA
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="order-3 flex justify-center lg:justify-end lg:mr-12"
          >
            <EyeHorusShowcase className="max-w-[270px] md:max-w-[360px]" />
          </motion.div>
          {/* Deity rail — pinned to the right corner of the grid on desktop */}
          <div className="relative z-10 order-3 flex justify-center py-4 lg:order-none lg:absolute lg:right-1 lg:top-1/2 lg:-translate-y-1/2 lg:block lg:py-0">
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <DeitySelector
                className="max-w-[110px]"
                active={
                  figure === "horus" ? "HORUS" : figure === "sekhmet" ? "SEKHMET" : figure === "thoth" ? "THOTH" : "ANUBIS"
                }
                onSelect={(kind) => {
                  if (kind === "HORUS") setFigure("horus");
                  else if (kind === "SEKHMET") setFigure("sekhmet");
                  else if (kind === "THOTH") setFigure("thoth");
                  else if (kind === "ANUBIS") setFigure("anubis");
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Statistics bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="relative z-10 mx-auto w-full max-w-[960px] px-4 pb-10 md:px-8"
        >
          <div className="stat-bar">
            {[
              { kind: "pyramid" as const, value: 3000, suffix: "+", label: "Years of History" },
              { kind: "ankh" as const, value: 40, suffix: "+", label: "Hieroglyph Signs" },
              { kind: "eye" as const, value: 5, suffix: "", label: "Points per Answer" },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <EgyIcon kind={s.kind} className="stat-icon" />
                <div className="text-left">
                  <p className="stat-value">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============ DAILY GLYPH ============ */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 md:px-8">
        <DailyHieroglyph />
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="relative overflow-hidden py-24">
        <div className="temple-arch pointer-events-none absolute inset-x-0 top-0 h-full" aria-hidden />
        <div className="temple-column temple-column-l pointer-events-none" aria-hidden />
        <div className="temple-column temple-column-r pointer-events-none" aria-hidden />
        <div className="corner-ornament corner-ornament-l pointer-events-none" aria-hidden />
        <div className="corner-ornament corner-ornament-r pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Three Sacred Tools"
            title={<>Ancient Instruments</>}
            subtitle="Every tool is a futuristic artifact inside the temple — mythology fused with machine intelligence, every element purposeful."
          />
          <div className="features-grid mt-12">
            {FEATURES.map((f, i) => (
              <Reveal key={f.to} delay={i * 0.08}>
                <Link to={f.to} className="group block h-full">
                  <article
                    id={f.spyId}
                    className="feature-card relative flex h-full flex-col gap-4 overflow-hidden p-6"
                  >
                    <div className="feature-orb feature-orb-cyan" aria-hidden />
                    <div className="feature-orb feature-orb-gold" aria-hidden />
                    <div className="feature-visual">
                      {f.visual}
                      <div className="feature-orb feature-orb-core">{f.orb}</div>
                    </div>
                    <div className="feature-heading">
                      <p className={`feature-badge ${f.accent}`}>{f.badge}</p>
                      <h3 className="feature-title">{f.title}</h3>
                    </div>
                    <p className="feature-desc">{f.desc}</p>
                    <div className="feature-stat">
                      <span className={`feature-stat-value ${f.accent}`}>
                        <Counter value={f.statNum} suffix={f.statSuffix} decimals={f.statDecimals} />
                      </span>
                      <span className="feature-stat-label">{f.statLabel}</span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNEY ============ */}
      <section className="relative border-y border-gold/10 bg-midnight/40 py-24">
        <div className="hieroglyph-pattern pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="The Path of Understanding"
            title={<>From Hieroglyph to Insight</>}
            subtitle="The same journey that once let scribes record history now lets you read it — in English, in seconds."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {JOURNEY.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-gold/10 bg-obsidian/50 p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-gold-gradient font-display text-2xl font-bold">{p.step}</span>
                    <ArrowRight className={`h-4 w-4 text-gold/40 ${i === 2 ? "hidden" : ""}`} />
                  </div>
                  <h3 className="font-display text-sm font-bold tracking-[0.18em] text-foreground">{p.label}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-8">
        <Reveal>
          <div className="glass-panel-strong gold-frame relative overflow-hidden px-6 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_90%_at_50%_0%,hsla(43,80%,55%,0.14),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_70%_at_85%_100%,hsla(190,90%,50%,0.1),transparent_60%)]" />
            <div className="relative">
              <span className="eyebrow">The Core Awaits</span>
              <h2 className="text-gold-gradient mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
                Speak the language of the pharaohs
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm text-foreground/65 md:text-base">
                Decode an ancient inscription, complete a damaged text, or ask Pastoria about the world of the gods.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton
                  as="button"
                  onClick={() => navigate("/translate")}
                  className="btn-gold rounded-xl px-8 py-4 text-sm"
                >
                  TRANSLATE A SCRIPT
                </MagneticButton>
                <MagneticButton
                  as="button"
                  onClick={() => navigate("/full-script")}
                  className="btn-ghost-gold rounded-xl px-8 py-4 text-sm"
                >
                  Complete an Inscription
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
