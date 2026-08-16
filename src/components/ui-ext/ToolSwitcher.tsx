import { Link, useLocation } from "react-router-dom";
import { Languages, ScrollText, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const TOOLS = [
  { to: "/translate", label: "Translate", icon: Languages },
  { to: "/full-script", label: "Full Script", icon: ScrollText },
  { to: "/pastoria", label: "Pastoria", icon: Bot },
];

export function ToolSwitcher() {
  const { pathname } = useLocation();
  const isToolPage = TOOLS.some((t) => pathname.startsWith(t.to));
  if (!isToolPage) return null;

  return (
    <div className="sticky top-20 z-30 mx-auto mb-8 -mt-2 w-fit rounded-full border border-gold/25 bg-obsidian/85 px-2 py-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl md:top-[88px]">
      <div className="flex items-center gap-1">
        {TOOLS.map((t) => {
          const active = pathname.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-2 text-xs tracking-wide transition-all md:px-4",
                active
                  ? "border-gold/40 bg-gold/15 text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
