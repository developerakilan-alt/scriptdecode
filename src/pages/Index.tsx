import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Languages, ScrollText, MessageCircle, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ThemeToggle from "@/components/ThemeToggle";
import heroBg from "@/assets/home-bg.jpg.asset.json";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const features = [
  {
    to: "/translate",
    icon: Languages,
    title: "Script Translation",
    description: "Upload hieroglyph images and get AI-powered English translations of ancient symbols.",
  },
  {
    to: "/full-script",
    icon: ScrollText,
    title: "Full Script",
    description: "Reconstruct damaged or partial Egyptian inscriptions using intelligent AI analysis.",
  },
  {
    to: "/pastoria",
    icon: MessageCircle,
    title: "Pastoria",
    description: "Chat with an AI expert on Egypt, archaeology, and ancient mythological history.",
  },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".snap-section");
      if (sections.length < 2) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${(sections.length - 1) * window.innerHeight}`,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.3, max: 0.8 },
          ease: "power2.inOut",
        },
      });

      sections.forEach((section) => {
        const items = section.querySelectorAll(".reveal");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background across all snap sections */}
      <img
        src={heroBg.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/60" />

      {/* Theme Toggle */}
      <div className="fixed right-4 top-4 z-30">
        <ThemeToggle />
      </div>

      {/* Section 1: Hero */}
      <section className="snap-section relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-gold-gradient mb-6 font-display text-6xl font-bold tracking-wide md:text-8xl">
            Script Decode
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/80 md:text-xl">
            Unlock the secrets of ancient Egypt with AI-powered script analysis, translation, and archaeological insights.
          </p>
          <div className="mt-12 flex animate-bounce justify-center text-primary">
            <ChevronDown className="h-8 w-8" />
          </div>
        </motion.div>
      </section>

      {/* Section 2: Features */}
      <section className="snap-section relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <h2 className="reveal text-gold-gradient mb-12 text-center font-display text-4xl font-bold md:text-5xl">
          Explore the Mysteries
        </h2>
        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="reveal glass-panel group flex flex-col items-center gap-4 rounded-xl p-8 text-center transition-all duration-300 hover:scale-105 glow-gold"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <f.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="text-sm text-foreground/75">{f.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 3: Credits */}
      <section className="snap-section relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="glass-panel-strong reveal max-w-2xl rounded-2xl p-10 text-center md:p-14">
          <h2 className="text-gold-gradient mb-6 font-display text-3xl font-bold md:text-4xl">
            Where Past Meets Intelligence
          </h2>
          <p className="mb-8 text-foreground/80">
            Built with reverence for the ancients and the precision of modern AI.
          </p>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Designed by
          </p>
          <p className="mt-3 font-display text-lg text-foreground">
            Archana · Kannimatha · Bhuvana · Deepika
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
