import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => (
  <div className="min-h-screen bg-background hieroglyph-pattern">
    <header className="glass-panel-strong sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-4 px-6 py-4">
        <Link
          to="/"
          className="glass-button flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground"
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
);

export default PageLayout;
