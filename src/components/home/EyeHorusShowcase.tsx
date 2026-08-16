import { cn } from "@/lib/utils";

interface EyeHorusShowcaseProps {
  className?: string;
}

export function EyeHorusShowcase({ className }: EyeHorusShowcaseProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* ambient gold glow behind the eye */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[120%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse 52% 46% at 50% 45%, rgba(201,162,92,0.16), rgba(4,3,6,0.35) 55%, transparent 78%)" }}
        aria-hidden
      />

      {/* figure — uploaded Eye of Horus image, transparent bg, masked to dissolve into the page bg */}
      <div className="relative aspect-[450/600] w-full overflow-hidden rounded-t-[140px] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%),linear-gradient(to_left,black_92%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%),linear-gradient(to_left,black_92%,transparent_100%)] [-webkit-mask-composite:source-in]">
        <img
          src="/EyeOfHorus.png"
          alt="Eye of Horus"
          className="h-full w-full select-none object-cover"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-obsidian/60 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
