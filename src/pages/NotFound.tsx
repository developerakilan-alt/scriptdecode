import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye } from "lucide-react";
import { EyeOfHorus } from "@/components/EyeOfHorus";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="hieroglyph-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_50%,hsla(43,70%,45%,0.1),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-48"
      >
        <EyeOfHorus phase="open" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative"
      >
        <p className="text-gold-gradient font-display text-8xl font-black md:text-9xl">404</p>
        <h1 className="mt-2 font-display text-xl uppercase tracking-[0.3em] text-foreground md:text-2xl">
          This Chamber Does Not Exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
          The Eye of Horus searched every corridor of the temple and found no such path. Return to the entrance hall.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link to="/" className="btn-gold rounded-xl px-8 py-4 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Link>
          <Link to="/translate" className="btn-ghost-gold rounded-xl px-8 py-4 text-sm">
            <Eye className="mr-2 h-4 w-4" />
            Translate a Script
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
