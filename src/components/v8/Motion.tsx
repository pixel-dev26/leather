"use client";

// v8 motion: one observer for the whole page. Elements with data-reveal get .is-in the first time they scroll into
// view (CSS in app/v8/v8.css does the rest). Everything shows at once when the visitor prefers reduced motion.
import { useEffect } from "react";

export function MotionRoot() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v8");
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
