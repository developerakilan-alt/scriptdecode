import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DecipherButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function DecipherButton({ onClick, disabled, loading, className }: DecipherButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn("t-decipher w-full rounded-2xl px-7 py-4 sm:w-auto", className)}
      aria-label="Decipher inscription"
    >
      <Sparkles className={cn("h-4 w-4", loading && "animate-pulse")} />
      <span>{loading ? "DECIPHERING…" : "✦ DECIPHER INSCRIPTION"}</span>
    </button>
  );
}
