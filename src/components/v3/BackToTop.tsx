"use client";

import { useEffect, useState } from "react";
import Icon from "./Icons";

/** v3rule.md §7: 52px white circle with a green ring, shown after the first screen. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={show ? 0 : -1}
      style={{
        position: "fixed", right: 32, bottom: 40, zIndex: 30, width: 52, height: 52, borderRadius: "50%",
        display: "grid", placeItems: "center", background: "#fff", color: "#000",
        border: "2px solid var(--clr-action)",
        opacity: show ? 1 : 0, transform: show ? "none" : "translateY(12px)", pointerEvents: show ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <Icon name="arrowUp" size={22} />
    </button>
  );
}
