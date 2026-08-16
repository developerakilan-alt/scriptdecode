import { ScanSearch, Keyboard } from "lucide-react";
import type { Mode } from "./types";
import { cn } from "@/lib/utils";

interface WorkspaceTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  disabled?: boolean;
}

const TABS: { key: Mode; label: string; icon: typeof ScanSearch }[] = [
  { key: "upload", label: "IMAGE SCAN", icon: ScanSearch },
  { key: "text", label: "TYPE GLYPHS", icon: Keyboard },
];

export function WorkspaceTabs({ mode, onChange, disabled }: WorkspaceTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-gold/20 bg-obsidian/60 p-1.5" role="tablist" aria-label="Input method">
      {TABS.map((t) => {
        const active = mode === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.key)}
            disabled={disabled}
            className={cn(
              "relative flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono-code text-[0.66rem] font-semibold uppercase tracking-[0.24em] transition-all duration-300",
              active
                ? "bg-gradient-to-b from-gold/20 to-gold/5 text-gold shadow-[inset_0_1px_0_hsla(43,82%,60%,0.4),0_0_20px_hsla(43,82%,56%,0.2)]"
                : "text-foreground/45 hover:text-foreground/75"
            )}
          >
            {active && <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />}
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
