import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  backgroundImage?: string;
}

const PageLayout = ({ title, children, backgroundImage }: PageLayoutProps) => (
  <div className="relative min-h-screen hieroglyph-pattern">
    {backgroundImage && (
      <>
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none fixed inset-0 bg-background/60 backdrop-blur-sm" />
      </>
    )}
    <div className="relative z-10">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95">
        <div className="container mx-auto flex items-center gap-4 px-6 py-4">
          <Link
            to="/"
            className="glass-button flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <motion.h1
            className="text-gold-gradient text-xl font-display font-bold md:text-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {title}
          </motion.h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6">{children}</main>
    </div>
  </div>
);

export default PageLayout;
