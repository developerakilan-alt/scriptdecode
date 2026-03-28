import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Languages, ScrollText, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    to: "/translate",
    icon: Languages,
    title: "Script Translation",
    description: "Upload hieroglyph images and get AI-powered English translations",
  },
  {
    to: "/full-script",
    icon: ScrollText,
    title: "Full Script",
    description: "Reconstruct damaged or partial Egyptian inscriptions using AI",
  },
  {
    to: "/pastoria",
    icon: MessageCircle,
    title: "Pastoria",
    description: "Chat with an AI expert on Egypt, archaeology, and ancient history",
  },
];

const Index = () => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Background */}
    <img
      src={heroBg}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

    {/* Content */}
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-gold-gradient mb-4 font-display text-5xl font-bold tracking-wide md:text-7xl">
          Script Decode
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Unlock the secrets of ancient Egypt with AI-powered script analysis, translation, and archaeological insights.
        </p>
      </motion.div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.to}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
          >
            <Link
              to={f.to}
              className="glass-panel group flex flex-col items-center gap-4 rounded-xl p-8 text-center transition-all duration-300 hover:scale-105 glow-gold"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <f.icon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                {f.title}
              </h2>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Index;
