import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  mode: "guest" | "account";
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => User | null;
  signUp: (name: string, email: string, password: string) => User | null;
  guest: () => User;
  signOut: () => void;
  error: string | null;
}

const KEY = "sd:user";
const AuthContext = createContext<AuthContextValue | null>(null);

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function writeUser(user: User | null) {
  if (user) localStorage.setItem(KEY, JSON.stringify(user));
  else localStorage.removeItem(KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(readUser());
  }, []);

  const value: AuthContextValue = {
    user,
    error,
    signIn: (email, password) => {
      setError(null);
      if (!email.trim()) {
        setError("Enter your email address.");
        return null;
      }
      if (!password || password.length < 4) {
        setError("Password must be at least 4 characters.");
        return null;
      }
      const next: User = {
        name: email.split("@")[0] || "Explorer",
        email: email.trim(),
        mode: "account",
        createdAt: new Date().toISOString(),
      };
      setUser(next);
      writeUser(next);
      return next;
    },
    signUp: (name, email, password) => {
      setError(null);
      if (!name.trim()) {
        setError("Enter your name.");
        return null;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError("Enter a valid email address.");
        return null;
      }
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters.");
        return null;
      }
      const next: User = {
        name: name.trim(),
        email: email.trim(),
        mode: "account",
        createdAt: new Date().toISOString(),
      };
      setUser(next);
      writeUser(next);
      return next;
    },
    guest: () => {
      setError(null);
      const next: User = {
        name: "Guest Explorer",
        email: "guest@scriptdecode.local",
        mode: "guest",
        createdAt: new Date().toISOString(),
      };
      setUser(next);
      writeUser(next);
      return next;
    },
    signOut: () => {
      setUser(null);
      writeUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
