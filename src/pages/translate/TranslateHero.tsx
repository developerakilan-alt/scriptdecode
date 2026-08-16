import { motion } from "framer-motion";
import { EyeOfHorus } from "@/components/EyeOfHorus";

export function TranslateHero() {
  return (
    <section className="relative pt-32 text-center md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5"
      >
        <div className="mb-1 flex items-center gap-3">
          <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-gold/60 md:block" />
          <span className="eyebrow">Ancient AI Laboratory</span>
          <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-gold/60 md:block" />
        </div>

        <h1 className="font-display text-4xl font-bold leading-tight tracking-wide md:text-6xl">
          <span className="block text-ivory">DECIPHER THE ANCIENTS</span>
          <span className="text-gold-gradient mt-2 block">TRANSLATE THE UNKNOWN.</span>
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
          Upload an ancient Egyptian inscription or enter hieroglyphs to let AI analyze, decipher and contextualize the script.
        </p>

        <div className="relative mt-3 h-10 w-56">
          <motion.div
            className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute left-1/2 top-3 w-24 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <EyeOfHorus phase="scan" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </section>
  );
}
