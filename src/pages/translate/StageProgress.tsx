import { cn } from "@/lib/utils";

const STAGES = ["INPUT", "AI DECIPHERING", "TRANSLATION"] as const;

interface StageProgressProps {
  active: number;
}

export function StageProgress({ active }: StageProgressProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3" role="navigation" aria-label="Translation stages">
      {STAGES.map((label, i) => {
        const state = i < active ? "done" : i === active ? "current" : "idle";
        return (
          <div key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono-code text-[0.62rem] font-bold transition-all duration-500",
                  state === "current" && "border-gold bg-gold/15 text-gold shadow-[0_0_18px_hsla(43,82%,56%,0.35)]",
                  state === "done" && "border-electric/50 bg-electric/10 text-electric",
                  state === "idle" && "border-foreground/15 bg-foreground/[0.03] text-foreground/35"
                )}
              >
                {state === "done" ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-mono-code text-[0.6rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 sm:text-[0.66rem]",
                  state === "current" && "text-gold",
                  state === "done" && "text-electric",
                  state === "idle" && "text-foreground/35"
                )}
              >
                {label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors duration-500",
                  i < active ? "bg-electric/40" : "bg-foreground/12"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
