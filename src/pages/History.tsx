import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { History as HistoryIcon, Trash2, Save, BookOpen, ScrollText, Languages, Bot } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/lib/auth";
import {
  listHistoryEntries,
  removeHistoryEntry,
  clearHistory,
  updateHistoryNote,
  userIdFor,
  type HistoryEntry,
} from "@/lib/history";

const TOOL_META = {
  translate: { icon: Languages, label: "Script Translation", accent: "text-gold" },
  "full-script": { icon: ScrollText, label: "Full Script", accent: "text-electric" },
  pastoria: { icon: Bot, label: "Pastoria AI", accent: "text-turquoise" },
} as const;

export default function HistoryPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  const uid = user ? userIdFor(user.email) : null;

  useEffect(() => {
    if (uid) setEntries(listHistoryEntries(uid));
  }, [uid]);

  if (!user || !uid) {
    return (
      <PageLayout
        title="My Scrolls"
        eyebrow="Scribe's Archive"
        subtitle="Your saved translations and notes live in your personal scroll archive."
      >
        <div className="mx-auto max-w-md">
          <GlassCard className="p-10 text-center" hover={false}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <HistoryIcon className="h-6 w-6 text-gold" />
            </div>
            <h2 className="font-display text-xl text-gold">No scribe yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in or enter as a guest explorer to save your translations and personal notes.
            </p>
            <Link to="/login" className="btn-gold mt-6 inline-flex rounded-xl px-6 py-3 text-sm">
              Sign In / Guest Explorer
            </Link>
          </GlassCard>
        </div>
      </PageLayout>
    );
  }

  const saveNote = (id: string) => {
    updateHistoryNote(id, drafts[id] ?? "");
    setSaved(id);
    setTimeout(() => setSaved(null), 1500);
  };

  return (
    <PageLayout
      title="My Scrolls"
      eyebrow="Scribe's Archive"
      subtitle={`${user.name} — ${entries.length} saved translation${entries.length === 1 ? "" : "s"}`}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Keep personal notes beside every translation — saved privately in your browser.
          </p>
          {entries.length > 0 && (
            <button
              onClick={() => {
                clearHistory(uid);
                setEntries([]);
              }}
              className="btn-ghost-gold flex items-center gap-2 rounded-lg px-4 py-2 text-xs text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <GlassCard className="p-10 text-center" hover={false}>
            <BookOpen className="mx-auto mb-4 h-10 w-10 text-gold/60" />
            <h2 className="font-display text-lg text-gold">Your archive is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Translate a script or complete an inscription and it will appear here.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/translate" className="btn-gold rounded-xl px-5 py-2.5 text-sm">Translate a Script</Link>
              <Link to="/full-script" className="btn-ghost-gold rounded-xl px-5 py-2.5 text-sm">Full Script</Link>
            </div>
          </GlassCard>
        ) : (
          entries.map((e, i) => {
            const meta = TOOL_META[e.tool];
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <GlassCard className="p-5" hover={false}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <meta.icon className={`h-4 w-4 ${meta.accent}`} />
                    <span className="font-mono-code text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {meta.label}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground/60">
                      {new Date(e.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="font-mono-code text-xl text-gold">{e.source}</p>
                  <p className="mt-2 rounded-lg bg-obsidian/50 p-3 text-sm leading-relaxed text-foreground">
                    {e.output}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <input
                      value={drafts[e.id] ?? e.note ?? ""}
                      onChange={(ev) => setDrafts((d) => ({ ...d, [e.id]: ev.target.value }))}
                      placeholder="Add a personal note…"
                      className="w-full rounded-lg border border-gold/20 bg-obsidian/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none"
                      aria-label="Personal note"
                    />
                    <button
                      onClick={() => saveNote(e.id)}
                      className="btn-ghost-gold flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs"
                    >
                      <Save className="h-3.5 w-3.5" />
                      {saved === e.id ? "Saved" : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        removeHistoryEntry(e.id);
                        setEntries((prev) => prev.filter((x) => x.id !== e.id));
                      }}
                      className="glass-button flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-red-300"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
      </div>
    </PageLayout>
  );
}
