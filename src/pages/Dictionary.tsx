import { useState } from "react";
import { Search, Sigma, Hash, Copy, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import { SIGNS } from "@/lib/egypt";
import {
  NUMERAL_UNITS,
  numeralToEgyptian,
  egyptianToNumeral,
  isNumeralGlyph,
} from "@/lib/numerals";

const SIGNS_LIST = Object.values(SIGNS);

export default function Dictionary() {
  const [number, setNumber] = useState<string>("42");
  const [glyphInput, setGlyphInput] = useState("");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const numericValue = Math.max(0, Math.floor(Number(number) || 0));
  const egyptianOut = numeralToEgyptian(numericValue);
  const parsedNumber = isNumeralGlyph(glyphInput) ? egyptianToNumeral(glyphInput) : null;

  const copyGlyph = (g: string) => {
    navigator.clipboard?.writeText(g).then(() => {
      setCopied(g);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const filtered = query.trim()
    ? SIGNS_LIST.filter(
        (s) =>
          s.transliteration.toLowerCase().includes(query.toLowerCase()) ||
          s.meaning.toLowerCase().includes(query.toLowerCase())
      )
    : SIGNS_LIST;

  return (
    <PageLayout
      title="Dictionary of Signs"
      eyebrow="The Gardiner Corpus"
      subtitle="Browse the sacred signs, convert numbers between Arabic and Egyptian numerals, and learn each glyph's sound and meaning."
    >
      <div className="space-y-10">
        {/* Numerals */}
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6" hover={false}>
            <div className="mb-4 flex items-center gap-2">
              <Sigma className="h-5 w-5 text-gold" />
              <h3 className="font-display text-lg text-gold">Arabic → Egyptian</h3>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Enter a number
              </span>
              <div className="flex items-center gap-3 rounded-lg border border-gold/25 bg-obsidian/60 px-3">
                <Hash className="h-4 w-4 text-gold/60" />
                <input
                  type="number"
                  min={0}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full bg-transparent py-3 text-sm text-foreground focus:outline-none"
                  aria-label="Number to convert"
                />
              </div>
            </label>
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-gold/15 bg-obsidian/50 p-4">
              <span className="font-display text-3xl text-foreground">{numericValue}</span>
              <span className="text-gold/50">→</span>
              <span className="flex min-h-[2.5rem] flex-wrap items-center gap-1 text-3xl leading-none text-gold">
                {egyptianOut ? (
                  Array.from(egyptianOut).map((ch, i) => (
                    <span key={i} className="cursor-pointer transition-transform hover:scale-125" title="Numerical sign">
                      {ch}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Zero is written with no sign</span>
                )}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {NUMERAL_UNITS.map((u) => (
                <div key={u.value} className="flex items-center gap-2 rounded-lg border border-gold/10 bg-obsidian/40 px-3 py-2">
                  <span className="text-xl text-gold">{u.glyph}</span>
                  <div className="flex flex-col">
                    <span className="font-mono-code text-xs text-foreground">{u.value.toLocaleString()}</span>
                    <span className="text-[0.6rem] leading-tight text-muted-foreground">{u.name.split(" — ")[1] ?? u.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6" hover={false}>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-electric" />
              <h3 className="font-display text-lg text-gold">Egyptian → Arabic</h3>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Paste Egyptian numeral signs
              </span>
              <textarea
                value={glyphInput}
                onChange={(e) => setGlyphInput(e.target.value)}
                placeholder={"e.g. 𓍢𓍢𓎆𓎆𓏺𓏺𓏺 (223)"}
                rows={2}
                className="w-full rounded-lg border border-gold/25 bg-obsidian/60 p-3 font-mono-code text-2xl text-gold placeholder:text-sm placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none"
                aria-label="Egyptian numerals"
              />
            </label>
            <div className="mt-4 rounded-xl border border-gold/15 bg-obsidian/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Value</p>
              <p className="mt-1 font-display text-4xl text-foreground">
                {parsedNumber === null ? "—" : parsedNumber.toLocaleString()}
              </p>
              {parsedNumber === null && glyphInput.trim() && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Only numeral signs (𓏺 𓎆 𓍢 𓆼 𓂭 𓆐 𓁨) are counted.
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "1", g: "𓏺" },
                { label: "10", g: "𓎆" },
                { label: "100", g: "𓍢" },
                { label: "1,000", g: "𓆼" },
                { label: "10,000", g: "𓂭" },
                { label: "100,000", g: "𓆐" },
                { label: "1,000,000", g: "𓁨" },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setGlyphInput((v) => v + s.g)}
                  className="btn-ghost-gold flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs"
                >
                  <span className="text-lg leading-none">{s.g}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Sign browser */}
        <GlassCard className="p-6" hover={false}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Sigma className="h-5 w-5 text-gold" />
              <h3 className="font-display text-lg text-gold">Sign Browser</h3>
            </div>
            <div className="ml-auto flex items-center gap-3 rounded-lg border border-gold/25 bg-obsidian/60 px-3">
              <Search className="h-4 w-4 text-gold/60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search signs or meanings…"
                className="w-56 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search the sign dictionary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((s) => (
              <div
                key={s.glyph}
                className="group relative flex items-center gap-3 rounded-xl border border-gold/10 bg-obsidian/50 p-3 transition-colors hover:border-gold/40"
              >
                <span className="text-3xl text-gold transition-transform group-hover:scale-125">{s.glyph}</span>
                <div className="min-w-0">
                  <p className="truncate font-mono-code text-xs text-gold">{s.transliteration}</p>
                  <p className="truncate text-[0.68rem] leading-tight text-muted-foreground">{s.meaning}</p>
                </div>
                <button
                  onClick={() => copyGlyph(s.glyph)}
                  className="absolute right-2 top-2 text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100 hover:text-gold"
                  aria-label={`Copy ${s.transliteration}`}
                >
                  {copied === s.glyph ? <Check className="h-3.5 w-3.5 text-electric" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No signs match “{query}”. Try “ankh”, “sun”, or “life”.
            </p>
          )}

          <p className="mt-5 text-xs text-muted-foreground">
            {filtered.length} of {SIGNS_LIST.length} signs · Sorted by the Gardiner sign list families
          </p>
        </GlassCard>
      </div>
    </PageLayout>
  );
}
