"use client";

// v9 motion: one observer for the whole page. Anything with data-reveal gets .is-in when it scrolls into view (CSS in
// app/v9/v9.css); everything shows at once when the visitor prefers reduced motion.
import { useEffect } from "react";

/** Fired by a product card's quick add with the product's name; the header's bag keeps the count. */
export const ADD_TO_BAG_EVENT = "v9:add-to-bag";

export function MotionRoot() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v9");
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
