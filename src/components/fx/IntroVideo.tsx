import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function IntroVideo() {
  const [phase, setPhase] = useState<"playing" | "leaving" | "gone">(() =>
    new URLSearchParams(window.location.search).get("intro") === "0" ? "gone" : "playing"
  );
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (phase === "playing") {
      videoRef.current?.play().catch(() => setPhase("leaving"));
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const t = setTimeout(() => setPhase("gone"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-hidden bg-black"
      animate={phase === "leaving" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <video
        ref={videoRef}
        src="/Opening.mp4"
        autoPlay
        muted={muted}
        playsInline
        onEnded={() => setPhase("leaving")}
        onClick={() => setPhase("leaving")}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_100%,rgba(0,0,0,0.72),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-4 px-6">
        <button
          onClick={() => setPhase("leaving")}
          className="btn-gold rounded-xl px-10 py-4 text-sm tracking-[0.22em]"
        >
          ENTER THE TEMPLE
        </button>
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center gap-2 text-xs tracking-[0.25em] text-foreground/60 transition-colors hover:text-gold"
          aria-label={muted ? "Unmute intro" : "Mute intro"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {muted ? "UNMUTE" : "MUTE"}
        </button>
      </div>
    </motion.div>
  );
}
