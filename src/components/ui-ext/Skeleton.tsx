import { cn } from "@/lib/utils";

export function SkeletonBar({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "animate-shimmer rounded bg-gradient-to-r from-midnight/60 via-gold/20 to-midnight/60",
        className
      )}
    />
  );
}

export function SkeletonCard({ rows = 4 }: { rows?: number }) {
  return (
    <div className="glass-panel gold-frame overflow-hidden p-6" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-shimmer rounded-xl bg-gradient-to-r from-midnight/60 via-gold/20 to-midnight/60" />
        <SkeletonBar className="h-4 w-1/3" />
      </div>
      <div className="mt-5 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonBar key={i} className="h-3.5" style={{ width: `${92 - i * 9}%` }} />
        ))}
      </div>
    </div>
  );
}
