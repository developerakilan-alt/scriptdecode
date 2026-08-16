import { motion } from "framer-motion";
import { EyeMark } from "@/components/layout/Navbar";
import { ToolSwitcher } from "@/components/ui-ext/ToolSwitcher";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, subtitle, eyebrow, children }: PageLayoutProps) => (
  <div className="relative min-h-screen hieroglyph-pattern">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_50%_at_50%_-5%,hsla(43,70%,45%,0.08),transparent_60%)]" />
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="eyebrow">{eyebrow ?? "Sacred Tool"}</span>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 glow-gold">
            <EyeMark className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h1 className="text-gold-gradient font-display text-3xl font-bold md:text-5xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-foreground/65 md:text-base">{subtitle}</p>}
          </div>
        </div>
      </motion.div>
      <ToolSwitcher />
      {children}
    </div>
  </div>
);

export default PageLayout;
