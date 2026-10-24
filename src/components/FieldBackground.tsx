"use client";

import { useEffect, useRef } from "react";

// A grid of short strokes that turn toward the pointer, like iron filings
// around a magnet. Strokes near the pointer grow and take the accent color.
const GAP = 26;
const LENGTH = 7;
const RADIUS = 240;
const LEVELS = 5;

export default function FieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let angles = new Float32Array(0);
    let raf = 0;

    // Smoothed pointer position and influence strength (0 until the pointer moves)
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };
    const colors = { field: "", accent: "" };

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors.field = style.getPropertyValue("--field").trim();
      colors.accent = style.getPropertyValue("--accent").trim();
    };

    const targetAngle = (x: number, y: number) =>
      Math.atan2(pointer.y - y, pointer.x - x);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / GAP) + 1;
      rows = Math.ceil(height / GAP) + 1;

      if (pointer.target === 0) {
        // Resting point: upper right, beside the hero name
        pointer.x = pointer.tx = width * 0.78;
        pointer.y = pointer.ty = height * 0.3;
      }
      angles = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          angles[r * cols + c] = targetAngle(c * GAP, r * GAP);
        }
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const buckets = Array.from({ length: LEVELS + 1 }, () => new Path2D());

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP;
          const y = r * GAP;
          const a = angles[r * cols + c];
          const d = Math.hypot(pointer.x - x, pointer.y - y);
          const t = Math.max(0, 1 - d / RADIUS) ** 2 * pointer.strength;
          const level = Math.ceil(t * LEVELS);
          const half = (LENGTH * (1 + t * 0.9)) / 2;
          const dx = Math.cos(a) * half;
          const dy = Math.sin(a) * half;
          buckets[level].moveTo(x - dx, y - dy);
          buckets[level].lineTo(x + dx, y + dy);
        }
      }

      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.field;
      ctx.stroke(buckets[0]);
      ctx.strokeStyle = colors.accent;
      for (let i = 1; i <= LEVELS; i++) {
        ctx.globalAlpha = 0.2 + (i / LEVELS) * 0.6;
        ctx.stroke(buckets[i]);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      pointer.strength += (pointer.target - pointer.strength) * 0.08;

      let moving =
        Math.abs(pointer.tx - pointer.x) > 0.1 ||
        Math.abs(pointer.ty - pointer.y) > 0.1 ||
        Math.abs(pointer.target - pointer.strength) > 0.005;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          let diff = targetAngle(c * GAP, r * GAP) - angles[i];
          // A stroke looks the same rotated by π, so take the shortest turn modulo π
          diff -= Math.PI * Math.round(diff / Math.PI);
          if (Math.abs(diff) > 0.002) moving = true;
          angles[i] += diff * 0.12;
        }
      }

      draw();
      // Stop the loop once everything has settled; the next pointer move restarts it
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!raf && !reducedMotion.matches) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.target = 1;
      start();
    };

    const onPointerLeave = () => {
      pointer.target = 0;
      start();
    };

    // Re-read token colors when the theme class on <html> changes
    const observer = new MutationObserver(() => {
      readColors();
      draw();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    readColors();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
