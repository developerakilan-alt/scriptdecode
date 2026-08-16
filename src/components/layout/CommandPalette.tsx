import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command as CommandIcon,
  Home,
  Languages,
  ScrollText,
  Bot,
  Search,
  BookOpen,
  LogIn,
  History as HistoryIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const go = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  const groups = [
    {
      heading: "NAVIGATE",
      items: [
        { id: "home", icon: Home, label: "Home", desc: "Temple entrance", to: "/" },
        { id: "translate", icon: Languages, label: "Script Translation", desc: "Egyptian script to English", to: "/translate" },
        { id: "fullscript", icon: ScrollText, label: "Full Script", desc: "Inscription reconstruction", to: "/full-script" },
        { id: "pastoria", icon: Bot, label: "Pastoria AI", desc: "Egypt archaeology chat", to: "/pastoria" },
        { id: "dictionary", icon: BookOpen, label: "Dictionary of Signs", desc: "Gardiner signs + Egyptian numerals", to: "/dictionary" },
        { id: "login", icon: LogIn, label: "Sign In / Guest Explorer", desc: "Save translations as a scribe", to: "/login" },
        { id: "history", icon: HistoryIcon, label: "My Scrolls", desc: "Saved translations and notes", to: "/history" },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-obsidian/70 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-gold/20 bg-midnight/95 shadow-2xl shadow-black/60 backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="AI Command Center" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-display [&_[cmdk-group-heading]]:text-[0.62rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-gold/70">
              <div className="flex items-center gap-3 border-b border-gold/10 px-4">
                <CommandIcon className="h-4 w-4 text-gold" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command…  e.g. optimize this function"
                  className="flex-1 bg-transparent py-4 font-mono-code text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Command.List className="max-h-[46vh] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No command found.
                </Command.Empty>
                {groups.map((g) => (
                  <Command.Group key={g.heading} heading={g.heading}>
                    {g.items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={`${item.label} ${item.desc}`}
                        onSelect={() => go(item.to)}
                        className={cn(
                          "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                          "aria-selected:bg-gold/10 aria-selected:text-gold data-[selected=true]:bg-gold/10"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0 text-electric" />
                        <div className="flex flex-col">
                          <span className="text-foreground/90">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.desc}</span>
                        </div>
                        <div className="ml-auto hidden items-center gap-1 text-muted-foreground/60 group-aria-selected:text-gold md:flex">
                          <Search className="h-3 w-3" />
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>
              <div className="flex items-center gap-4 border-t border-gold/10 px-4 py-2.5 text-[0.65rem] text-muted-foreground">
                <span className="flex items-center gap-1"><kbd className="rounded border border-gold/25 px-1">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="rounded border border-gold/25 px-1">↵</kbd> select</span>
                <span className="flex items-center gap-1"><kbd className="rounded border border-gold/25 px-1">esc</kbd> close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
