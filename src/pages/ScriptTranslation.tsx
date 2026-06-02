import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import bg from "@/assets/translation-bg.jpg.asset.json";

const ScriptTranslation = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ symbols: string[]; translation: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResult(null);
      simulateAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        symbols: ["𓁀", "𓂀", "𓃀", "𓄀", "𓅀", "𓆀", "𓇀", "𓈀"],
        translation:
          "The great pharaoh rises with the sun, blessing the land of the Nile with prosperity and wisdom for a thousand years.",
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <PageLayout title="Script Translation" backgroundImage={bg.url}>
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Upload Area */}
        <GlassCard className="p-8" hover={false}>
          <div
            className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 border-dashed border-primary/30 p-12 transition-colors hover:border-primary/50"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-primary/60" />
            <p className="text-center text-muted-foreground">
              Click to upload an image of Egyptian hieroglyphs
            </p>
            <span className="glass-button rounded-lg px-6 py-2 text-sm font-medium text-foreground hover:bg-muted">
              Upload Image
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        </GlassCard>

        {/* Image Preview */}
        <AnimatePresence>
          {image && (
            <GlassCard className="overflow-hidden p-4" hover={false}>
              <div className="flex items-center gap-2 pb-3 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                Uploaded Image
              </div>
              <img
                src={image}
                alt="Uploaded hieroglyphs"
                className="w-full rounded-md object-contain"
                loading="lazy"
              />
            </GlassCard>
          )}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <motion.div
            className="flex flex-col items-center gap-3 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing hieroglyphs…</p>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6" hover={false}>
                <h3 className="mb-3 font-display text-lg text-primary">Extracted Symbols</h3>
                <div className="flex flex-wrap gap-3">
                  {result.symbols.map((s, i) => (
                    <span
                      key={i}
                      className="glass-button flex h-12 w-12 items-center justify-center rounded-lg text-2xl hover:bg-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <h3 className="mb-3 font-display text-lg text-primary">English Translation</h3>
                <p className="leading-relaxed text-foreground">{result.translation}</p>
                <button className="glass-button mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted">
                  <Download className="h-4 w-4" />
                  Download Result
                </button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default ScriptTranslation;
