import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";
import { BackToTop } from "@/components/fx/BackToTop";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <BackToTop />

      <motion.main
        key={location.pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
}
