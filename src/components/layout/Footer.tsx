import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Shield, Scale } from "lucide-react";
import { EyeMark } from "./Navbar";

const TOOLS_LINKS = [
  { to: "/translate", label: "Script Translation" },
  { to: "/full-script", label: "Full Script" },
  { to: "/pastoria", label: "Pastoria AI" },
  { to: "/dictionary", label: "Dictionary of Signs" },
];

const EXPLORE_LINKS = [
  { to: "/login", label: "Sign In / Guest Explorer" },
  { to: "/history", label: "My Scrolls" },
  { to: "/privacy", label: "Privacy", icon: Shield },
  { to: "/terms", label: "Terms", icon: Scale },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-gold/10 bg-obsidian/70">
      <div className="hieroglyph-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(60%_100%_at_50%_100%,hsla(43,80%,55%,0.12),transparent)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <EyeMark className="h-6 w-6 text-gold" />
              <span className="font-display text-base font-bold tracking-[0.28em]">
                SCRIPT<span className="text-gold"> DECODE</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Egyptian Script Intelligence. Translate ancient hieroglyphs, complete damaged inscriptions, and explore
              Egyptology with Pastoria AI.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@scriptdecode.ai", label: "Contact" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass-button flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <FooterColumn title="Sacred Tools" links={TOOLS_LINKS} />

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">Explore</h4>
            {EXPLORE_LINKS.map(({ to, label, icon: Icon }) =>
              Icon ? (
                <Link
                  key={to}
                  to={to}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Icon className="h-3.5 w-3.5 text-gold/50 transition-colors group-hover:text-gold" />
                  {label}
                </Link>
              ) : (
                <Link
                  key={to}
                  to={to}
                  className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <EyeMark className="h-3.5 w-3.5 text-gold/50 transition-colors group-hover:text-gold" />
                  {label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Script Decode · Egyptian Script Intelligence · Built in the Code Temple
          </p>
          <p className="font-mono-code text-[0.65rem] text-muted-foreground/60">
            script → translate → reconstruct → explore
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">{title}</h4>
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
