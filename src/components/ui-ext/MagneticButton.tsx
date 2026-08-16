import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  as = "button",
  href,
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center justify-center">
      {children}
    </motion.span>
  );

  if (as === "a") {
    return (
      <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} className="inline-block">
        <a href={href} onClick={onClick} className={cn("inline-flex", className)} aria-label={ariaLabel}>
          {content}
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} className="inline-block">
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn("inline-flex", className)}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    </div>
  );
}
