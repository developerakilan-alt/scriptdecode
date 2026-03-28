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
      "rounded-lg",
      hover && "transition-all duration-300 hover:scale-[1.02]",
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
