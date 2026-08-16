import { useEffect } from "react";

export function RippleFX() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "button, a[href], [role='button'], [role='tab']"
      );
      if (!target || e.button !== 0) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const span = document.createElement("span");
      span.className = "ripple-fx";
      span.style.width = `${size}px`;
      span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      target.appendChild(span);
      setTimeout(() => span.remove(), 700);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
