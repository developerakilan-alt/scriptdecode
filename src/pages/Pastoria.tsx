import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import { CopyShare } from "@/components/ui-ext/CopyShare";
import { answerQuestion, formatAnswer } from "@/lib/egypt";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What are hieroglyphs?",
  "Who built the pyramids?",
  "Explain mummification",
  "Tell me about Cleopatra",
  "What is the Book of the Dead?",
  "Tell me about Anubis",
];

const Pastoria = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const topic = answerQuestion(text);
      setMessages((prev) => [...prev, { role: "assistant", content: formatAnswer(topic) }]);
      setLoading(false);
    }, 1400);
  };

  return (
    <PageLayout
      title="Pastoria AI"
      eyebrow="Sacred Chat"
      subtitle="Chat with an AI expert on Egypt, archaeology, and ancient mythology — every answer comes in 5 key points."
    >
      <div className="mx-auto flex h-[calc(100vh-15rem)] min-h-[480px] max-w-3xl flex-col">
        <GlassCard className="flex-1 overflow-y-auto p-4 md:p-6" hover={false}>
          {messages.length === 0 && (
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 glow-gold">
                <Bot className="h-10 w-10 text-gold" />
              </div>
              <div className="text-center">
                <h2 className="mb-2 font-display text-2xl text-gold">Welcome to Pastoria</h2>
                <p className="text-sm text-muted-foreground">
                  Your AI archaeology assistant. Ask me anything about ancient Egypt!
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="btn-ghost-gold flex items-center gap-1.5 rounded-full px-4 py-2 text-xs"
                  >
                    <Sparkles className="h-3 w-3 text-gold" />
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
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                      <Bot className="h-4 w-4 text-gold" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed border ${
                      m.role === "user"
                        ? "bg-electric/10 text-foreground border-electric/20"
                        : "glass text-foreground"
                    }`}
                  >
                    <div className="[&_ul]:space-y-1 [&_li]:list-none [&_strong]:text-gold">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                    {m.role === "assistant" && (
                      <div className="mt-3">
                        <CopyShare text={m.content} title="Pastoria answer" />
                      </div>
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                      <User className="h-4 w-4 text-gold" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                  <Bot className="h-4 w-4 text-gold" />
                </div>
                <div className="glass flex items-center gap-1 rounded-xl px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold/60" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold/60" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold/60" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </div>
          <div ref={bottomRef} />
        </GlassCard>

        {messages.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="btn-ghost-gold flex-shrink-0 rounded-full px-3 py-1.5 text-xs"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="glass-panel mt-2 flex items-center gap-3 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && send(input)}
            placeholder="Ask about ancient Egypt…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={loading}
            aria-label="Message Pastoria"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="btn-gold flex h-9 w-9 items-center justify-center rounded-lg disabled:opacity-30"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pastoria;
