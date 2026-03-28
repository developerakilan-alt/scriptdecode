import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2, ScrollText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";

const FullScript = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ reconstructed: string; explanation: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResult(null);
      simulateReconstruction();
    };
    reader.readAsDataURL(file);
  };

  const simulateReconstruction = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        reconstructed:
          "𓁀𓂀𓃀𓄀𓅀 𓆀𓇀𓈀𓉀𓊀 𓋀𓌀𓍀𓎀𓏀\n𓐀𓑀𓒀𓓀𓔀 𓕀𓖀𓗀𓘀𓙀 𓚀𓛀𓜀𓝀𓞀",
        explanation:
          "The AI detected 4 missing sections in the original inscription. Based on linguistic patterns from the New Kingdom period and contextual analysis of surrounding glyphs, the missing portions were reconstructed. The text appears to be a funerary inscription dedicated to a high priest, containing standard offering formulas and references to the afterlife journey.",
      });
      setLoading(false);
    }, 3500);
  };

  return (
    <PageLayout title="Full Script">
      <div className="mx-auto max-w-3xl space-y-8">
        <GlassCard className="p-8" hover={false}>
          <div
            className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 border-dashed border-primary/30 p-12 transition-colors hover:border-primary/50"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-primary/60" />
            <p className="text-center text-muted-foreground">
              Upload a damaged or partial Egyptian script for AI reconstruction
            </p>
            <span className="glass-button rounded-lg px-6 py-2 text-sm font-medium text-foreground">
              Upload Image
            </span>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </div>
        </GlassCard>

        <AnimatePresence>
          {image && (
            <GlassCard className="overflow-hidden p-4" hover={false}>
              <div className="flex items-center gap-2 pb-3 text-sm text-muted-foreground">
                <ImageIcon className="h-4 w-4" />
                Original (Damaged) Image
              </div>
              <img src={image} alt="Original script" className="w-full rounded-md object-contain" loading="lazy" />
            </GlassCard>
          )}
        </AnimatePresence>

        {loading && (
          <motion.div className="flex flex-col items-center gap-3 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Reconstructing script…</p>
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-6" hover={false}>
                <div className="mb-3 flex items-center gap-2">
                  <ScrollText className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg text-primary">Reconstructed Script</h3>
                </div>
                <pre className="whitespace-pre-wrap rounded-lg bg-secondary/50 p-4 text-2xl leading-loose tracking-widest text-foreground">
                  {result.reconstructed}
                </pre>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <h3 className="mb-3 font-display text-lg text-primary">Reconstruction Analysis</h3>
                <p className="leading-relaxed text-foreground">{result.explanation}</p>
                <button className="glass-button mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-foreground">
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

export default FullScript;
