import { PenLine } from "lucide-react";
import { SignPicker } from "@/components/ui-ext/SignPicker";
import { DecipherButton } from "./DecipherButton";

interface GlyphInputProps {
  text: string;
  onChange: (value: string) => void;
  onDecipher: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function GlyphInput({ text, onChange, onDecipher, disabled, loading }: GlyphInputProps) {
  const count = Array.from(text).length;

  return (
    <div className="space-y-4">
      <div className="t-input relative overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-gold/15 px-4 py-2.5">
          <PenLine className="h-3.5 w-3.5 text-electric" />
          <span className="font-mono-code text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-foreground/55">
            Glyph Terminal
          </span>
          <span className="ml-auto flex items-center gap-2 font-mono-code text-[0.6rem] text-foreground/40">
            <span className="t-input-caret inline-block h-3 w-2 bg-electric/80" />
            READY
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={'Enter Egyptian glyphs, transliteration or words...\n\nGlyphs:  𓋹𓆸𓋴𓈖𓃀\nWords:   ankh wedja seneb'}
          rows={4}
          className="w-full resize-y bg-transparent p-4 font-mono-code text-base text-foreground placeholder:text-foreground/35 focus:outline-none"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/15 px-4 py-3">
          <span className="font-mono-code text-[0.62rem] tracking-[0.2em] text-foreground/40">
            {count} / 120 CHARACTERS
          </span>
          <SignPicker onPick={(g) => onChange(text + g)} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <DecipherButton onClick={onDecipher} disabled={disabled || count === 0} loading={loading} />
        <span className="font-mono-code text-[0.6rem] uppercase tracking-[0.2em] text-foreground/35">
          signs &amp; words are matched against the local corpus
        </span>
      </div>
    </div>
  );
}
