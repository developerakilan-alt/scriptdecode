import { cn } from "@/lib/utils";

interface AnubisShowcaseProps {
  className?: string;
  figure?: "anubis" | "horus" | "sekhmet" | "thoth";
}

export function AnubisShowcase({ className, figure = "anubis" }: AnubisShowcaseProps) {
  const isHorus = figure === "horus";
  const isSekhmet = figure === "sekhmet";
  const isThoth = figure === "thoth";
  const figureSrc = isHorus ? "/Horus.png" : isSekhmet ? "/Sekhmet.png" : isThoth ? "/Thoth.jpg" : "/Anubis.png";
  const figureAlt = isHorus
    ? "Horus, falcon god of the sky"
    : isSekhmet
      ? "Sekhmet, goddess of war"
      : isThoth
        ? "Thoth, god of wisdom"
        : "Anubis, guardian of the underworld";
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className="relative w-full max-w-[420px] flex-1">
        {/* rotating dashed orbit */}
        <svg
          viewBox="0 0 400 400"
          className="t-dash-orbit absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 opacity-50"
          aria-hidden
        >
          <circle cx="200" cy="200" r="196" fill="none" stroke="hsla(43,82%,56%,0.4)" strokeWidth="1" />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className="absolute left-1/2 top-1/2 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 opacity-40"
          aria-hidden
        >
          <circle cx="200" cy="200" r="196" fill="none" stroke="hsla(190,92%,62%,0.3)" strokeWidth="1" />
        </svg>

        {/* ground glow */}
        <div
          className="pointer-events-none absolute bottom-[4%] left-1/2 h-20 w-[72%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, hsla(43,82%,56%,0.32), transparent 70%)" }}
          aria-hidden
        />

        {/* ambient dark-gold glow behind the figure so the dissolve feels intentional */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[120%] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(ellipse 52% 44% at 50% 42%, rgba(201,162,92,0.14), rgba(4,3,6,0.35) 55%, transparent 78%)" }}
          aria-hidden
        />

        {/* figure — uploaded image, background cut out; transparent container, masked to dissolve into the page bg */}
        <div
          className={cn(
            "relative overflow-hidden rounded-t-[140px] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%),linear-gradient(to_left,black_90%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%),linear-gradient(to_left,black_90%,transparent_100%)] [-webkit-mask-composite:source-in]",
            isHorus ? "aspect-[400/600]" : isSekhmet ? "aspect-[4/5]" : isThoth ? "aspect-[400/600]" : "aspect-[375/600]"
          )}
        >
          <img
            key={figure}
            src={figureSrc}
            alt={figureAlt}
            className={cn("h-full w-full select-none object-cover", isSekhmet && "scale-[1.1]")}
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-obsidian/70 via-obsidian/20 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-obsidian/50 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
