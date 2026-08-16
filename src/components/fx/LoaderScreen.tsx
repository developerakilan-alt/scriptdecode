import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EyeOfHorus } from "@/components/EyeOfHorus";

export function LoaderScreen() {
  const [hide, setHide] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sd:seen")) {
      setUnmount(true);
      return;
    }
    sessionStorage.setItem("sd:seen", "1");
    const t1 = setTimeout(() => setHide(true), 2400);
    const t2 = setTimeout(() => setUnmount(true), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (unmount) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-obsidian"
      animate={hide ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      aria-label="Loading"
    >
      <div className="hieroglyph-pattern pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,hsla(43,80%,55%,0.12),transparent_70%)]" />

      <div className="relative w-40 animate-float">
        <EyeOfHorus phase="open" />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        <p className="font-mono-code text-xs uppercase tracking-[0.5em] text-gold animate-pulse-glow">
          Opening the Temple
        </p>
        <div className="h-px w-64 overflow-hidden rounded-full bg-gold/15">
          <div className="h-full w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
