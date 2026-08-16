import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: SectionHeadingProps) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls} ${className ?? ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-gold-gradient font-display text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">{subtitle}</p>}
    </Reveal>
  );
}
