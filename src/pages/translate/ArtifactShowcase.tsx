import { Suspense, lazy } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";
import { HolographicPanel } from "./HolographicPanel";
import { StonePlaque } from "./StonePlaque";

const ArtifactScene = lazy(() => import("./ArtifactScene"));

interface ArtifactShowcaseProps {
  detectedGlyph?: string;
  detectedLabel?: string;
  meaning?: string;
  confidence?: number | null;
  period?: string;
  analysis?: string;
  active?: boolean;
  done?: boolean;
}

export function ArtifactShowcase({
  detectedGlyph,
  detectedLabel,
  meaning,
  confidence,
  period,
  analysis,
  active = false,
  done = false,
}: ArtifactShowcaseProps) {
  const isMobile = useIsMobile(1024);
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[420px] md:h-[520px] lg:h-[560px]">
      {/* rotating dashed orbit */}
      <svg viewBox="0 0 400 400" className="t-dash-orbit absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 opacity-60" aria-hidden>
        <circle cx="200" cy="200" r="196" fill="none" stroke="hsla(190,92%,62%,0.35)" strokeWidth="1" />
      </svg>
      <svg viewBox="0 0 400 400" className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 opacity-50" aria-hidden>
        <circle cx="200" cy="200" r="196" fill="none" stroke="hsla(43,82%,56%,0.28)" strokeWidth="1" />
      </svg>

      {/* ground ring */}
      <div
        className="absolute left-1/2 top-1/2 h-[76%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{
          border: "1px solid hsla(190,92%,62%,0.22)",
          boxShadow: "0 0 40px hsla(190,90%,50%,0.12), inset 0 0 40px hsla(190,90%,50%,0.1)",
          transform: "translate(-50%,-42%) rotateX(68deg)",
        }}
        aria-hidden
      />

      {/* artifact */}
      <div
        className={`absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
          done ? "drop-shadow-[0_0_40px_hsla(43,82%,56%,0.45)]" : active ? "drop-shadow-[0_0_34px_hsla(190,90%,55%,0.4)]" : "drop-shadow-[0_0_24px_rgba(0,0,0,0.6)]"
        }`}
      >
        <div className="relative aspect-[320/420] touch-pan-y">
          {!reducedMotion && !isMobile ? (
            <Suspense fallback={<StonePlaque className="h-full w-full" />}>
              <div className="absolute inset-0">
                <ArtifactScene />
              </div>
            </Suspense>
          ) : (
            <StonePlaque className="h-full w-full animate-float-slow" />
          )}
        </div>
      </div>

      {/* holographic panels */}
      <HolographicPanel title="DETECTED GLYPH" value={detectedGlyph ?? "—"} sub={detectedLabel ?? "awaiting input"} className="absolute left-0 top-[4%] w-40 lg:w-44" />
      <HolographicPanel title="MEANING" value={meaning ?? "—"} sub={meaning ? undefined : "awaiting inscription"} className="absolute left-0 bottom-[12%] w-44 lg:w-48" />
      <HolographicPanel title="AI CONFIDENCE" accent="gold" value={confidence == null ? "—" : `${confidence.toFixed(1)}%`} sub={confidence == null ? "awaiting analysis" : "TRANSLATION CONFIDENCE"} align="right" className="absolute right-0 top-[6%] w-36 lg:w-40" />
      <HolographicPanel title="SCRIPT PERIOD" value={period ?? "—"} sub="derived from corpus" align="right" className="absolute right-0 bottom-[16%] w-44 lg:w-52" />
      <HolographicPanel
        title="ANALYSIS"
        accent={done ? "gold" : "cyan"}
        value={active ? "SCANNING…" : done ? "CONTEXT MATCH" : analysis ?? "STANDBY"}
        sub={active ? "sequence in progress" : done ? "cross-reference resolved" : "awaiting inscription"}
        align="center"
        className="absolute left-1/2 top-[46%] w-40 -translate-x-1/2 lg:w-44"
      />
    </div>
  );
}
