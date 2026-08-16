import { SIGNS } from "@/lib/egypt";
import { cn } from "@/lib/utils";

export function Glyph({
  glyph,
  className,
  tooltip = true,
}: {
  glyph: string;
  className?: string;
  tooltip?: boolean;
}) {
  const sign = SIGNS[glyph];
  if (!sign || !tooltip) {
    return (
      <span className={cn("glyph-hover cursor-default", className)} aria-hidden="true">
        {glyph}
      </span>
    );
  }
  return (
    <span className="group relative inline-flex" aria-hidden="true">
      <span className={cn("glyph-hover", className)}>{glyph}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-40 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-lg border border-gold/30 bg-midnight/95 px-3 py-2 text-left opacity-0 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-200 group-hover:-translate-y-2 group-hover:opacity-100">
        <span className="block font-mono-code text-[0.62rem] uppercase tracking-[0.2em] text-gold">
          {sign.transliteration}
        </span>
        <span className="mt-0.5 block text-[0.7rem] text-foreground/85">{sign.meaning}</span>
      </span>
    </span>
  );
}
