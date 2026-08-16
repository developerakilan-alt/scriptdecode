import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, UserPlus, Compass, Eye, Mail, Lock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Tab = "signin" | "signup";

export default function Login() {
  const { signIn, signUp, guest, error } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const submit = () => {
    const result =
      tab === "signin" ? signIn(email, password) : signUp(name, email, password);
    if (result) navigate("/");
  };

  const asGuest = () => {
    guest();
    navigate("/");
  };

  return (
    <PageLayout
      title="Enter the Temple"
      eyebrow="The Gates of Egypt"
      subtitle="Create a scribe's account to keep your translations and notes — or wander in as a guest explorer."
    >
      <div className="mx-auto max-w-md">
        <GlassCard className="p-7" hover={false}>
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-gold/15 bg-obsidian/50 p-1.5">
            {(
              [
                { key: "signin" as Tab, label: "Sign In", icon: User },
                { key: "signup" as Tab, label: "Create Account", icon: UserPlus },
              ]
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  setTab(t.key);
                  setLocalError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all",
                  tab === t.key
                    ? "bg-gold/15 text-gold border border-gold/40"
                    : "text-muted-foreground border border-transparent hover:text-foreground"
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          {(error || localError) && (
            <p className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-300">
              {error ?? localError}
            </p>
          )}

          <div className="space-y-4">
            {tab === "signup" && (
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</span>
                <div className="flex items-center gap-3 rounded-lg border border-gold/25 bg-obsidian/60 px-3">
                  <User className="h-4 w-4 text-gold/60" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nefertari"
                    className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Name"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</span>
              <div className="flex items-center gap-3 rounded-lg border border-gold/25 bg-obsidian/60 px-3">
                <Mail className="h-4 w-4 text-gold/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scribe@temple.com"
                  className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Email"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Password</span>
              <div className="flex items-center gap-3 rounded-lg border border-gold/25 bg-obsidian/60 px-3">
                <Lock className="h-4 w-4 text-gold/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder={tab === "signup" ? "At least 6 characters" : "Your password"}
                  className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Password"
                />
              </div>
            </label>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={submit}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm"
            >
              <Eye className="h-4 w-4" />
              {tab === "signin" ? "Enter the Temple" : "Begin Your Journey"}
            </motion.button>

            <div className="relative py-1 text-center">
              <span className="relative z-10 bg-transparent px-3 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                or
              </span>
            </div>

            <button
              onClick={asGuest}
              className="btn-ghost-gold flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm"
            >
              <Compass className="h-4 w-4" />
              Continue as Guest Explorer
            </button>
          </div>
        </GlassCard>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Accounts are stored privately in your browser. Already decoding?{" "}
          <Link to="/translate" className="text-gold hover:underline">
            Skip straight to a tool
          </Link>
        </p>
      </div>
    </PageLayout>
  );
}
