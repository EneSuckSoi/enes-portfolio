"use client";

import { useEffect, useRef } from "react";

// Soft, out-of-focus colour fields behind the page. Gradients fade to
// transparent on their own, so no CSS blur filter (and no repaint cost) is needed.
// One field trails the pointer; the other two drift slowly.
const glow = (color: string) =>
  `radial-gradient(circle at center, ${color} 0%, transparent 68%)`;

export default function AmbientBackground() {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = followerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const size = el.offsetWidth;
    const pos = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 };
    const target = { ...pos };
    let raf = 0;

    const apply = () => {
      el.style.transform = `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`;
    };

    const tick = () => {
      // Low easing factor: the glow lags well behind the cursor, so it reads as ambient light
      pos.x += (target.x - pos.x) * 0.05;
      pos.y += (target.y - pos.y) * 0.05;
      apply();
      const settled = Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    apply();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="glow h-[70vmax] w-[70vmax] -left-[20vmax] -top-[25vmax]"
        style={{ background: glow("var(--glow-2)"), animation: "drift 38s ease-in-out infinite" }}
      />
      <div
        className="glow h-[60vmax] w-[60vmax] -bottom-[25vmax] -right-[15vmax]"
        style={{ background: glow("var(--glow-3)"), animation: "drift 46s ease-in-out infinite reverse" }}
      />
      <div
        ref={followerRef}
        className="glow left-0 top-0 h-[44vmax] w-[44vmax]"
        style={{ background: glow("var(--glow-1)") }}
      />
    </div>
  );
}
