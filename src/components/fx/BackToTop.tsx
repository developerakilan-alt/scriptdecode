import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass-panel-strong fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-2xl text-gold transition-all hover:border-gold/50 hover:shadow-[0_0_28px_hsla(43,82%,56%,0.35)]"
          aria-label="Back to top"
        >
          𓋹
        </motion.button>
      )}
    </AnimatePresence>
  );
}
