import { motion } from "framer-motion";
import { useState } from "react";

export function PageReveal() {
  const [done, setDone] = useState(false);
  if (done) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-[#060811]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.42, duration: 0.36, ease: "easeOut" }}
      onAnimationComplete={() => setDone(true)}
      aria-hidden
    >
      <motion.div
        className="h-px w-56 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
