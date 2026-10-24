"use client";

import { useEffect, useRef } from "react";

// A flat sheet of evenly sized dots that shows up in a wide, soft area around the
// pointer, with a magnifier right under it: inside LENS_RADIUS the dots and their
// spacing grow by the same factor, so it reads as zooming into the sheet.
// Only the area inside FIELD_RADIUS is drawn, and the loop stops once the pointer rests.
// Sizes are CSS px at a 1440px-wide window and grow with wider windows, so the
// effect keeps the same share of the screen on 4K displays.
const SPACING = 26; // grid pitch
const FIELD_RADIUS = 620; // distance at which the sheet fades out
const LENS_RADIUS = 240; // edge of the magnified area
const DOT = 1.15; // dot radius on the flat sheet
const ZOOM = 0.7; // extra magnification at the centre (1.7×); above ~1.5 the grid folds over
const FIELD_ALPHA = 0.5; // sheet opacity close to the pointer
const LENS_ALPHA = 0.35; // extra opacity inside the lens
const BASE_WIDTH = 1440;
const MAX_SCALE = 2.5;

type RGB = [number, number, number];

function readRGB(style: CSSStyleDeclaration, name: string): RGB {
  const [r, g, b] = style.getPropertyValue(name).trim().split(/\s+/).map(Number);
  return [r || 0, g || 0, b || 0];
}

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // Touch screens have no hover position to follow
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let scale = 1;
    let base: RGB = [0, 0, 0];
    let hot: RGB = [0, 0, 0];
    const pointer = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    // Fades the whole patch in when the pointer arrives and out when it leaves the window
    let strength = 0;
    let target = 0;
    let raf = 0;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      base = readRGB(style, "--dot");
      hot = readRGB(style, "--dot-hot");
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (strength < 0.01) return;

      const spacing = SPACING * scale;
      const radius = FIELD_RADIUS * scale;
      const lensRadius = LENS_RADIUS * scale;
      const dot = DOT * scale;

      // The grid scrolls with the page, so dots pass under a resting pointer
      const offset = window.scrollY % spacing;
      const half = spacing / 2;
      const c0 = Math.floor((pos.x - radius) / spacing);
      const c1 = Math.ceil((pos.x + radius) / spacing);
      const r0 = Math.floor((pos.y + offset - radius) / spacing);
      const r1 = Math.ceil((pos.y + offset + radius) / spacing);

      for (let row = r0; row <= r1; row++) {
        const gy = row * spacing - offset + half;
        for (let col = c0; col <= c1; col++) {
          const gx = col * spacing + half;
          const dx = gx - pos.x;
          const dy = gy - pos.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= radius) continue;

          // Wide, gentle fade of the sheet (squared so it stays even near the pointer)
          const tf = 1 - dist / radius;
          const field = tf * tf * (3 - 2 * tf);

          // Lens weight: 1 under the pointer, 0 at the lens edge and beyond
          const tl = Math.max(0, 1 - dist / lensRadius);
          const lens = tl * tl * (3 - 2 * tl) * strength;

          // Magnifier: spacing and dot size grow by the same factor, most at the centre
          const magnify = 1 + ZOOM * lens;
          const mix = lens * lens;

          const r = Math.round(base[0] + (hot[0] - base[0]) * mix);
          const g = Math.round(base[1] + (hot[1] - base[1]) * mix);
          const b = Math.round(base[2] + (hot[2] - base[2]) * mix);
          const alpha = strength * (FIELD_ALPHA * Math.sqrt(field) + LENS_ALPHA * lens);
          ctx.fillStyle = `rgb(${r} ${g} ${b} / ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(gx + dx * (magnify - 1), gy + dy * (magnify - 1), dot * magnify, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      const follow = reduceMotion.matches ? 1 : 0.2;
      const fade = reduceMotion.matches ? 1 : 0.1;
      pos.x += (pointer.x - pos.x) * follow;
      pos.y += (pointer.y - pos.y) * follow;
      strength += (target - strength) * fade;

      const settled =
        Math.abs(pointer.x - pos.x) < 0.1 &&
        Math.abs(pointer.y - pos.y) < 0.1 &&
        Math.abs(target - strength) < 0.005;
      if (settled) strength = target;

      draw();
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      scale = Math.min(Math.max(width / BASE_WIDTH, 1), MAX_SCALE);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      // Appear where the pointer is instead of sliding in from the last exit point
      if (strength < 0.01) {
        pos.x = pointer.x;
        pos.y = pointer.y;
      }
      target = 1;
      start();
    };

    const onLeave = () => {
      target = 0;
      start();
    };

    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) onLeave();
    };

    // Theme switches change the dot colours
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });

    readColors();
    resize();
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", draw, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", draw);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onLeave);
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
