import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CopyShare({
  text,
  title,
  className,
}: {
  text: string;
  title?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch {
        /* cancelled by user */
      }
      return;
    }
    copy();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={copy}
        className="btn-ghost-gold flex items-center gap-2 rounded-lg px-4 py-2 text-xs"
      >
        {copied ? <Check className="h-4 w-4 text-electric" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <button onClick={share} className="btn-ghost-gold flex items-center gap-2 rounded-lg px-4 py-2 text-xs">
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
