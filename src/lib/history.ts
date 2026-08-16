export interface HistoryEntry {
  id: string;
  userId: string;
  tool: "translate" | "full-script" | "pastoria";
  source: string;
  output: string;
  note?: string;
  createdAt: string;
}

const KEY = "sd:history";

export function userIdFor(email: string): string {
  return email || "anonymous";
}

function readAll(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function writeAll(entries: HistoryEntry[]) {
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function addHistoryEntry(entry: Omit<HistoryEntry, "id" | "createdAt">): HistoryEntry {
  const full: HistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  writeAll([full, ...all]);
  return full;
}

export function listHistoryEntries(userId: string): HistoryEntry[] {
  return readAll().filter((e) => e.userId === userId);
}

export function updateHistoryNote(id: string, note: string) {
  const all = readAll().map((e) => (e.id === id ? { ...e, note } : e));
  writeAll(all);
}

export function removeHistoryEntry(id: string) {
  writeAll(readAll().filter((e) => e.id !== id));
}

export function clearHistory(userId: string) {
  writeAll(readAll().filter((e) => e.userId !== userId));
}
