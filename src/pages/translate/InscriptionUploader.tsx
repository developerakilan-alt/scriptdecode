import { useEffect, useRef, useState } from "react";
import { Upload, ScanLine, Image as ImageIcon, X, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 10;

interface InscriptionUploaderProps {
  image: string | null;
  fileName?: string | null;
  onFile: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function InscriptionUploader({ image, fileName, onFile, onRemove, disabled }: InscriptionUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    setDims(null);
  }, [image]);

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      toast.error("Unsupported file type — use JPG, PNG or WEBP");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      toast.error(`Image exceeds ${MAX_MB} MB`);
      return;
    }
    onFile(f);
  };

  return (
    <div className="relative">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {!image ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload an image of Egyptian hieroglyphs"
          onClick={() => !disabled && fileRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !disabled && fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "t-dropzone relative flex cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed border-gold/30 bg-obsidian/40 p-10 text-center outline-none focus-visible:border-gold/60",
            dragging && "t-dragging",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-gold/30 bg-gold/10 transition-transform duration-300 group-hover:scale-110" />
            {dragging ? (
              <ScanLine className="relative h-9 w-9 animate-pulse text-electric" />
            ) : (
              <Upload className="relative h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          <div>
            <p className="font-display text-base font-semibold tracking-wide text-ivory">
              {dragging ? "RELEASE TO SCAN INSCRIPTION" : "DRAG & DROP INSCRIPTION"}
            </p>
            <p className="mt-1 text-sm text-foreground/55">or click to upload</p>
          </div>

          <div className="flex items-center gap-3 font-mono-code text-[0.62rem] uppercase tracking-[0.24em] text-foreground/45">
            <span>JPG • PNG • WEBP</span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span>MAX 10 MB</span>
          </div>

          <span className="btn-ghost-gold rounded-lg px-6 py-2 text-xs font-medium">Choose Image</span>
          <span className="t-scan-beam" />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-electric/25 bg-midnight/60">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-electric/40 bg-electric/10">
                <Check className="h-4 w-4 text-electric" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono-code text-xs text-foreground/85">{fileName ?? "inscription-image"}</p>
                {dims && <p className="font-mono-code text-[0.6rem] text-foreground/45">{dims.w} × {dims.h} px</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="btn-ghost-gold flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Replace
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 transition-colors hover:bg-red-500/20"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={image}
              alt="Uploaded hieroglyph inscription"
              className="mx-auto max-h-72 w-auto object-contain"
              loading="lazy"
              onLoad={(e) => {
                const el = e.currentTarget;
                setDims({ w: el.naturalWidth, h: el.naturalHeight });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
