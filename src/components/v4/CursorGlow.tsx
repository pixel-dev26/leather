"use client";

import { useEffect, useRef } from "react";

/**
 * Brown leather glow for black bands (v4rule.md §2 Glow, §8). Sits at a resting spot on one side of
 * its band and eases towards the cursor while the pointer is over the band, then drifts back.
 * Place it as the first child of a `.v4-glow` section.
 */
export default function CursorGlow({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const rest = () => ({ x: host.clientWidth * (side === "right" ? 0.82 : 0.16), y: host.clientHeight * (side === "right" ? 0.5 : 0.62) });
    let target = rest();
    let x = target.x, y = target.y;
    let raf = 0;

    const place = () => { el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`; };
    const loop = () => {
      x += (target.x - x) * 0.07;
      y += (target.y - y) * 0.07;
      place();
      raf = Math.abs(target.x - x) + Math.abs(target.y - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => { target = rest(); kick(); };
    const onResize = () => { target = rest(); x = target.x; y = target.y; place(); };

    place();
    window.addEventListener("resize", onResize);
    if (!still && fine) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [side]);

  return <div ref={ref} className={`v4-glow-orb v4-glow-orb--${side}`} aria-hidden />;
}
