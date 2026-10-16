"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

// Radial halftone burst (v4rule.md §6, §7 Hero): crisp black dots on white that grow towards the centre
// and meet a solid black core. Drawn on a canvas, only for the visible area, so it stays sharp at any zoom.
// A slow ripple travels outwards through the dot field while the hero is on screen.
const ACROSS = 96; // dots across the burst's diameter (fewer = bigger, more defined dots)
const CORE = 0.34; // solid core, as a fraction of the radius
const RIPPLE = 0.22; // ripple strength (fraction of dot radius)

export type HalftoneHandle = { setZoom: (zoom: number) => void };

type Props = {
  className?: string;
  zoom: number;
  /** cutout: paint the black field and punch the core + dots out of it, so whatever sits behind the canvas (the hero video) shows through */
  cutout?: boolean;
};

const Halftone = forwardRef<HalftoneHandle, Props>(function Halftone({ className, zoom, cutout = false }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef = useRef(zoom);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const z = zoomRef.current;
    const t = timeRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = cutout ? "#000" : "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#000";
    if (cutout) ctx.globalCompositeOperation = "destination-out";

    const R = (Math.max(w, h) / 2) * z; // burst radius on screen
    const pitch = (2 * R) / ACROSS;
    const cx = w / 2, cy = h / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, R * CORE + pitch * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // grid aligned to the burst centre, limited to the viewport
    const i0 = Math.floor(-cx / pitch) - 1, i1 = Math.ceil((w - cx) / pitch) + 1;
    const j0 = Math.floor(-cy / pitch) - 1, j1 = Math.ceil((h - cy) / pitch) + 1;
    ctx.beginPath();
    for (let i = i0; i <= i1; i++) {
      for (let j = j0; j <= j1; j++) {
        const x = cx + i * pitch, y = cy + j * pitch;
        const d = Math.hypot(x - cx, y - cy) / R;
        if (d >= 1 || d < CORE) continue;
        // dots overlap (solid) just outside the core, touch at ~0.5R, then shrink to nothing at the rim
        const base = Math.pow((1 - d) / (1 - CORE), 1.15);
        const wave = 1 + RIPPLE * Math.sin(d * 22 - t * 1.6);
        const r = Math.min(pitch * 0.78, pitch * 0.72 * base * wave);
        if (r < 0.6) continue;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, Math.PI * 2);
      }
    }
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }, [cutout]);

  useImperativeHandle(ref, () => ({
    setZoom: (z: number) => { zoomRef.current = z; draw(); },
  }), [draw]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(c);

    // ripple loop, only while visible and motion is allowed
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = false, start = 0;
    const tick = (now: number) => {
      if (!start) start = now - timeRef.current * 1000;
      timeRef.current = (now - start) / 1000;
      draw();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !still) { start = 0; raf = requestAnimationFrame(tick); }
    });
    io.observe(c);
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); };
  }, [draw]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
});

export default Halftone;
