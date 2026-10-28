"use client";

import { useEffect, useRef } from "react";
import { withBase } from "@/lib/image-loader";

/** Block sizes (in CSS px) the photo steps through on hover: it breaks into pixels, then resolves back. */
const STEPS = [4, 8, 14, 22, 32, 22, 14, 9, 5, 3, 1];
const FRAME_MS = 65;

/**
 * hologramme-rule.md §7 collections: a canvas over the photo that plays a pixelate-and-resolve sequence whenever the
 * pointer enters the parent link. Draws the same `object-fit: cover` crop as the image underneath.
 */
export default function PixelHover({ src }: { src: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new window.Image();
    img.src = withBase(src);
    const small = document.createElement("canvas");
    let timer = 0;

    const draw = (block: number) => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      // cover crop of the source, as object-fit: cover does
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sw = w / scale;
      const sh = h / scale;
      const sx = (img.naturalWidth - sw) / 2;
      const sy = (img.naturalHeight - sh) / 2;
      small.width = Math.max(1, Math.ceil(w / block));
      small.height = Math.max(1, Math.ceil(h / block));
      const sctx = small.getContext("2d");
      const ctx = el.getContext("2d");
      if (!sctx || !ctx) return;
      sctx.imageSmoothingEnabled = true;
      sctx.drawImage(img, sx, sy, sw, sh, 0, 0, small.width, small.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, small.width, small.height, 0, 0, el.width, el.height);
    };

    const play = () => {
      if (reduced || !img.complete || !img.naturalWidth) return;
      window.clearInterval(timer);
      let i = 0;
      el.style.opacity = "1";
      draw(STEPS[0]);
      timer = window.setInterval(() => {
        i += 1;
        if (i >= STEPS.length) {
          window.clearInterval(timer);
          el.style.opacity = "0";
          return;
        }
        draw(STEPS[i]);
      }, FRAME_MS);
    };

    host.addEventListener("mouseenter", play);
    host.addEventListener("focus", play);
    return () => {
      window.clearInterval(timer);
      host.removeEventListener("mouseenter", play);
      host.removeEventListener("focus", play);
    };
  }, [src]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, pointerEvents: "none" }}
    />
  );
}
