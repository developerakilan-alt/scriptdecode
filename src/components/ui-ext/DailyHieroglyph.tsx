import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { SIGNS, type Sign } from "@/lib/egypt";

function pickDailySign(): Sign {
  const list = Object.values(SIGNS);
  const day = Math.floor(Date.now() / 86_400_000);
  return list[day % list.length];
}

export function DailyHieroglyph() {
  const sign = useMemo(pickDailySign, []);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(sign.transliteration);
    utter.lang = "en-US";
    utter.rate = 0.8;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="glass-panel-strong gold-frame relative flex flex-col items-center gap-4 overflow-hidden px-6 py-8 text-center sm:flex-row sm:text-left">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_100%_at_0%_50%,hsla(43,80%,55%,0.1),transparent_60%)]" />
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-6xl text-gold glow-gold animate-float">
        {sign.glyph}
      </div>
      <div className="relative flex-1">
        <p className="font-mono-code text-[0.62rem] uppercase tracking-[0.34em] text-gold/70">
          Hieroglyph of the Day
        </p>
        <p className="mt-1 font-display text-xl font-semibold text-foreground">
          {sign.transliteration}
        </p>
        <p className="mt-1 text-sm text-foreground/70">{sign.meaning}</p>
        <button
          onClick={speak}
          disabled={speaking}
          className="btn-ghost-gold mt-3 flex items-center gap-2 rounded-lg px-4 py-2 text-xs disabled:opacity-50"
        >
          <Volume2 className={`h-4 w-4 ${speaking ? "animate-pulse text-electric" : ""}`} />
          {speaking ? "Speaking…" : "Pronounce"}
        </button>
      </div>
    </div>
  );
}
