"use client";

// v7 motion: one observer for the whole page. Anything with data-reveal gets .is-in when it scrolls into view and
// rises a little (CSS in app/v7/v7.css); everything shows at once when the visitor prefers reduced motion.
import { useEffect } from "react";

/** Fired by a product card's heart with detail +1 (saved) or -1 (removed); the header's heart keeps the count. */
export const WISHLIST_EVENT = "v7:wishlist";

export function MotionRoot() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v7");
    if (!root) return;
    const reveal = (el: Element) => el.classList.add("is-in");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
