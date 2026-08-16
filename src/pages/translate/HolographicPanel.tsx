import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicPanelProps {
  title: string;
  value: React.ReactNode;
  sub?: string;
  accent?: "cyan" | "gold";
  className?: string;
  align?: "left" | "right" | "center";
  floatDelay?: number;
}

export function HolographicPanel({
  title,
  value,
  sub,
  accent = "cyan",
  className,
  align = "left",
  floatDelay = 0,
}: HolographicPanelProps) {
  const isGold = accent === "gold";
  const accentText = isGold ? "text-gold" : "text-electric";
  const accentBorder = isGold ? "hsla(43,82%,60%,0.5)" : "hsla(190,92%,62%,0.55)";
  const alignCls = align === "center" ? "items-center text-center" : align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: floatDelay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "animate-float-slow relative flex flex-col gap-1 rounded-xl border bg-midnight/55 px-3.5 py-2.5 backdrop-blur-xl",
        alignCls,
        className
      )}
      style={{ borderColor: accentBorder, boxShadow: `0 0 22px ${isGold ? "hsla(43,82%,56%,0.14)" : "hsla(190,90%,50%,0.12)"}, inset 0 0 16px hsla(0,0%,100%,0.03)` }}
    >
      <div className="t-holo-corners" />
      <span className="font-mono-code text-[0.56rem] font-medium uppercase tracking-[0.28em] text-foreground/55">{title}</span>
      <span className={cn("font-display text-sm font-bold md:text-base", accentText)}>{value}</span>
      {sub && <span className="text-[0.62rem] leading-snug text-foreground/60">{sub}</span>}
      <div className={cn("t-holo-line w-full", align === "center" ? "" : "")} />
    </motion.div>
  );
}
