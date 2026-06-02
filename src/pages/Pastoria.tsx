import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import bg from "@/assets/pastoria-bg.jpg.asset.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What are hieroglyphs?",
  "Who built the pyramids?",
  "Explain mummification",
  "Tell me about Cleopatra",
  "What is the Rosetta Stone?",
];

const mockResponses: Record<string, string> = {
  default: `Here are some key points about ancient Egypt:

• **Ancient Egypt** lasted for over 3,000 years, from around 3100 BCE to 30 BCE
• The civilization developed along the **Nile River**, which provided fertile land for agriculture
• Egyptians created one of the earliest writing systems — **hieroglyphs** — consisting of over 700 symbols
• They built monumental structures including **pyramids, temples, and the Great Sphinx**
• Their advancements in **medicine, mathematics, and astronomy** influenced later civilizations

Feel free to ask me anything specific about Egyptian history, archaeology, or ancient scripts!`,
};

const Pastoria = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isEgyptRelated = (text: string) => {
    const keywords = [
      "egypt", "pharaoh", "pyramid", "hieroglyph", "nile", "mummy", "mummif",
      "sphinx", "cleopatra", "tutankhamun", "rosetta", "archaeology", "ancient",
      "temple", "tomb", "papyrus", "scarab", "anubis", "osiris", "isis", "ra",
      "dynasty", "kingdom", "scroll", "inscription", "script", "glyph", "obelisk",
      "sarcophagus", "cartouche", "ankh", "history", "civilization", "artifact",
    ];
    const lower = text.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let reply: string;
      if (!isEgyptRelated(text)) {
        reply =
          "I appreciate your curiosity! However, I'm **Pastoria** — an archaeology assistant specialized in **ancient Egypt, hieroglyphs, and archaeological history**. I can only help with topics in those areas. Try asking me about pyramids, mummification, or the Rosetta Stone!";
      } else {
        reply = mockResponses.default;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <PageLayout title="Pastoria" backgroundImage={bg.url}>
      <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-3xl flex-col">
        {/* Chat Area */}
        <GlassCard className="flex-1 overflow-y-auto p-4 md:p-6" hover={false}>
          {messages.length === 0 && (
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="mb-2 font-display text-2xl text-primary">Welcome to Pastoria</h2>
                <p className="text-sm text-muted-foreground">
                  Your AI archaeology assistant. Ask me anything about ancient Egypt!
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="glass-button flex items-center gap-1.5 rounded-full px-4 py-2 text-xs text-foreground hover:bg-muted"
                    >
                    <Sparkles className="h-3 w-3 text-primary" />
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed border ${
                        m.role === "user"
                          ? "bg-primary/20 text-foreground border-primary/20"
                          : "bg-card text-foreground border-border"
                      }`}
                    >
                    {m.content.split("\n").map((line, li) => (
                      <p key={li} className={li > 0 ? "mt-1" : ""}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, pi) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={pi} className="text-primary">{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={pi}>{part}</span>
                          )
                        )}
                      </p>
                    ))}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="glass-button flex items-center gap-1 rounded-xl px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </div>
          <div ref={bottomRef} />
        </GlassCard>

        {/* Suggestions when chatting */}
        {messages.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="glass-button flex-shrink-0 rounded-full px-3 py-1.5 text-xs text-foreground hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-md">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && send(input)}
            placeholder="Ask about ancient Egypt…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={loading}
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="glass-button flex h-9 w-9 items-center justify-center rounded-lg text-primary disabled:opacity-30 hover:bg-muted"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pastoria;
