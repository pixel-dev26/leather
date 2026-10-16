"use client";

// v6 motion: one observer for the whole page instead of one per component.
//   data-reveal="up|fade|wipe"   gets .is-in when it scrolls into view (CSS in app/v6/v6.css does the rest);
//                                elements added later (filtered product grids) are picked up too.
//   data-parallax="0.12"         moves at that fraction of the scroll, relative to the middle of the screen.
//   .v6-scrub                    gets --p = how many of its words have "lit up" so far (scroll-scrubbed text).
// Everything stays put when the visitor prefers reduced motion.
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";

export function MotionRoot() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v6");
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = (el: Element) => el.classList.add("is-in");

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watch = (scope: ParentNode) =>
      scope.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => (reduced ? reveal(el) : io.observe(el)));
    watch(root);
    const mo = new MutationObserver((records) =>
      records.forEach((r) => r.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return;
        if (n.matches("[data-reveal]")) {
          if (reduced) reveal(n);
          else io.observe(n);
        }
        watch(n);
      })),
    );
    mo.observe(root, { childList: true, subtree: true });

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        if (!reduced) {
          root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.bottom < -200 || r.top > vh + 200) return;
            const speed = Number(el.dataset.parallax) || 0.1;
            el.style.setProperty("--py", `${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px`);
          });
        }
        root.querySelectorAll<HTMLElement>(".v6-scrub").forEach((el) => {
          const r = el.getBoundingClientRect();
          const words = Number(el.dataset.words) || 1;
          // 0 when the text's top reaches 85% of the screen, all words lit when its bottom reaches 45%
          const start = vh * 0.85, end = vh * 0.45;
          const t = reduced ? 1 : Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
          el.style.setProperty("--p", (t * (words + 1)).toFixed(2));
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}

/** Text that rises word by word out of masks when it scrolls into view, or when a parent gets .is-in. */
export function SplitText({
  text, as: Tag = "span", className = "", delay = 0, reveal = true, style, id,
}: {
  text: string;
  id?: string;
  as?: ElementType;
  className?: string;
  delay?: number; // ms
  reveal?: boolean; // false: a parent controls .is-in (e.g. the active hero slide)
  style?: CSSProperties;
}) {
  let i = 0;
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag id={id} className={`v6-split ${className}`} data-reveal={reveal ? "" : undefined} style={{ ...style, "--d": delay } as CSSProperties}>
      <span className="v6-sr">{text}</span>
      <span aria-hidden>
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="w"><span style={{ "--i": i++ } as CSSProperties}>{w}</span></span>
            {wi < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}

type Part = string | { accent: string };

/** A statement whose words light up one after another as it scrolls up the screen; { accent } phrases turn red. */
export function ScrubStatement({ parts, className = "" }: { parts: Part[]; className?: string }) {
  let i = 0;
  const tokens = parts.map((part, pi) => {
    const text = typeof part === "string" ? part : part.accent;
    const accent = typeof part === "object";
    return (
      <Fragment key={pi}>
        {text.split(/\s+/).filter(Boolean).map((w, wi) => (
          <span key={wi} className={`sw${accent ? " accent" : ""}`} style={{ "--i": i++ } as CSSProperties}>{w} </span>
        ))}
      </Fragment>
    );
  });
  const plain = parts.map((p) => (typeof p === "string" ? p : p.accent)).join(" ");
  return (
    <p className={`v6-scrub ${className}`} data-words={i}>
      <span className="v6-sr">{plain}</span>
      <span aria-hidden>{tokens}</span>
    </p>
  );
}

/** Counts up from 0 to `to` the first time it scrolls into view. */
export function CountUp({
  to, duration = 1400, className = "", decimals = 0, prefix = "",
}: { to: number; duration?: number; className?: string; decimals?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(to); return; }
    let frame = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(to * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);
  return <span ref={ref} className={className}>{prefix}{value.toFixed(decimals)}</span>;
}
