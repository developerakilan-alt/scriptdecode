import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  hover?: boolean;
}

const GlassCard = ({ children, className, strong, hover = true }: GlassCardProps) => (
  <motion.div
    className={cn(
      strong ? "glass-panel-strong" : "glass-panel",
      "gold-frame relative overflow-hidden rounded-xl",
      hover && "transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35",
      className
    )}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default GlassCard;
