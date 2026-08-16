import { motion } from "framer-motion";
import { EyeOfHorus } from "@/components/EyeOfHorus";
import { cn } from "@/lib/utils";

interface StoneMonumentProps {
  className?: string;
}

const GLYPHS = [
  "𓋹", "𓂀", "𓊽", "𓅃", "𓆈", "𓃀", "𓁹", "𓇋",
  "𓍑", "𓏏", "𓅱", "𓂋", "𓎟", "𓏤", "𓆄", "𓇾",
  "𓃗", "𓂝", "𓀭", "𓊃", "𓆓", "𓍹", "𓎗", "𓏾",
  "𓁶", "𓐍", "𓈖", "𓀀", "𓆰", "𓅄", "𓀗", "𓎛",
];

export function StoneMonument({ className }: StoneMonumentProps) {
  return (
    <div className={cn("stone-monument", className)}>
      {/* pedestal glow rising behind the slab */}
      <div className="pedestal-glow" aria-hidden />
      <div className="pedestal-rays" aria-hidden />

      {/* irregular stone slab */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="tablet-slab"
      >
        <div className="tablet-glyphs" aria-hidden>
          {GLYPHS.map((g, i) => (
            <span key={i} className={cn("glyph-cell", i % 3 === 0 && "lit")}>
              {g}
            </span>
          ))}
        </div>
        <div className="tablet-sheen" aria-hidden />

        {/* glowing Eye of Horus */}
        <div className="slab-eye" aria-hidden>
          <div className="slab-eye-glow" />
          <EyeOfHorus phase="open" className="h-full w-auto" label="Glowing Eye of Horus" />
        </div>

        <span className="tablet-band">WADJET · THE SEEING EYE</span>
      </motion.div>

      {/* circular technological pedestal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="pedestal"
      >
        <div className="pedestal-ring pedestal-ring-outer" />
        <div className="pedestal-ring pedestal-ring-inner" />
        <div className="pedestal-core" />
        <div className="pedestal-ring-symbols" aria-hidden>
          <span>𓂀</span>
          <span>𓋹</span>
          <span>𓊽</span>
          <span>𓅃</span>
          <span>𓆈</span>
          <span>𓁹</span>
          <span>𓍹</span>
          <span>𓆓</span>
        </div>
      </motion.div>
    </div>
  );
}
