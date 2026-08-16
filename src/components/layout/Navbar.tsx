import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Command, Languages, User, LogOut, History, BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { onSpy } from "@/lib/spy";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "HOME", spy: "home" },
  { to: "/translate", label: "TRANSLATE", spy: "translate" },
  { to: "/full-script", label: "FULL SCRIPT", spy: "full-script" },
  { to: "/pastoria", label: "PASTORIA", spy: "pastoria" },
  { to: "/dictionary", label: "DICTIONARY", spy: "dictionary" },
];

function NavEmblem() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="nav-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d79b" />
          <stop offset="50%" stopColor="#c9a25c" />
          <stop offset="100%" stopColor="#7a5c28" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke="url(#nav-gold)" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18" stroke="url(#nav-gold)" strokeWidth="0.7" opacity="0.55" />
      <circle cx="24" cy="24" r="13.5" stroke="url(#nav-gold)" strokeWidth="0.5" opacity="0.4" />
      <path
        d="M8.5 24C8.5 24 13.5 15.5 24 15.5s15.5 8.5 15.5 8.5-5.5 8.5-15.5 8.5S8.5 24 8.5 24Z"
        stroke="url(#nav-gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3" fill="url(#nav-gold)" />
      <circle cx="24" cy="24" r="1.1" fill="#5e451f" />
      <path d="M33.5 20l4-2.2" stroke="url(#nav-gold)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M35.5 18.5l-.9.9" stroke="url(#nav-gold)" strokeWidth="1.2" strokeLinecap="round" />
      {[
        [24, 1.8],
        [42.2, 24],
        [24, 46.2],
        [5.8, 24],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.1" fill="#f0d79b" />
      ))}
    </svg>
  );
}

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center md:h-12 md:w-12">
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-60"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, hsla(43,82%,56%,0.25), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative h-full w-full drop-shadow-[0_0_6px_hsla(43,82%,56%,0.45)]">
          <NavEmblem />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-sm font-bold tracking-[0.28em] text-foreground md:text-base">
          SCRIPT<span className="text-gold"> DECODE</span>
        </span>
        <span className="mt-1 text-[0.52rem] uppercase tracking-[0.4em] text-electric">Egyptian Script Intelligence</span>
      </div>
    </Link>
  );
}

export function EyeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2 12C2 12 6 4 12 4s10 8 10 8-4 8-10 8S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
      <path d="M18 7l3-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20.5 5.5l-1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  if (!user) {
    return (
      <Link
        to="/login"
        className="glass-button flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-foreground/80 transition-colors hover:text-gold"
      >
        <User className="h-4 w-4" />
        Log In
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="glass-button flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-foreground/80 transition-colors hover:text-gold"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 font-display text-[0.6rem] font-bold text-gold">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="hidden max-w-[8rem] truncate sm:inline">{user.name}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-gold/20 bg-midnight/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
            role="menu"
          >
            <div className="border-b border-gold/10 px-4 py-3">
              <p className="truncate text-sm text-foreground">{user.name}</p>
              <p className="mt-0.5 truncate text-[0.65rem] text-muted-foreground">
                {user.mode === "guest" ? "Guest Explorer" : user.email}
              </p>
            </div>
            {[
              { icon: History, label: "My Scrolls", to: "/history" },
              { icon: BookOpen, label: "Dictionary", to: "/dictionary" },
            ].map(({ icon: Icon, label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-gold/10 hover:text-gold"
                role="menuitem"
              >
                <Icon className="h-4 w-4 text-gold/60" />
                {label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                signOut();
                navigate("/");
              }}
              className="flex w-full items-center gap-2.5 border-t border-gold/10 px-4 py-2.5 text-left text-sm text-foreground/80 transition-colors hover:bg-red-400/10 hover:text-red-300"
              role="menuitem"
            >
              <LogOut className="h-4 w-4 text-gold/60" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spy, setSpy] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => setSpy(null), [location.pathname]);

  useEffect(() => {
    const unsubscribe = onSpy(setSpy);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenCommand();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenCommand]);

  const isSpied = (item: { to: string; spy: string }) =>
    location.pathname === "/" && spy !== null && spy === item.spy;

  return (
    <header className="nav-enter fixed inset-x-0 top-0 z-40 px-4 pt-3 md:px-6">
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-gold/0 via-gold to-electric"
        style={{ scaleX: progress }}
      />
      <nav
        className={cn(
          "nav-glass relative mx-auto flex h-16 max-w-[1440px] items-center gap-4 rounded-2xl px-4 transition-all duration-500 md:h-[84px] md:px-5",
          scrolled && "nav-glass-scrolled"
        )}
      >
        <Logo />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn("nav-link py-1", (isActive || isSpied(item)) && "active")}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <button
            onClick={onOpenCommand}
            className="glass-button hidden items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="text-muted-foreground/80">Ctrl</span>
            <span>K</span>
          </button>
          <Link
            to="/translate"
            className="btn-gold hidden rounded-lg px-5 py-2.5 text-xs tracking-wide lg:inline-flex"
          >
            <Languages className="h-4 w-4" />
            TRANSLATE
          </Link>
          <UserMenu />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="glass-button flex h-10 w-10 items-center justify-center rounded-lg xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-gold/15 bg-obsidian/80 backdrop-blur-xl xl:hidden md:mx-6"
          >
            <div className="grid grid-cols-2 gap-1 px-4 py-4 sm:grid-cols-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-4 py-3 font-display text-xs tracking-[0.2em] text-foreground/70 transition-colors hover:bg-midnight hover:text-gold",
                        (isActive || isSpied(item)) && "bg-midnight text-gold"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-3 px-4 pb-5">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommand();
                }}
                className="glass-button flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs text-muted-foreground"
              >
                <Command className="h-4 w-4" /> COMMAND
              </button>
              <Link
                to="/translate"
                onClick={() => navigate("/translate")}
                className="btn-gold flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs"
              >
                <Languages className="h-4 w-4" /> TRANSLATE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
