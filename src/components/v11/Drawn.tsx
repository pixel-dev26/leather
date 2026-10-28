"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * v11rule.md §6 hand-drawn icons (48×48). Each shape is drawn twice, a firm line and a fainter offset "ghost", so it
 * reads as pen on paper; one brass detail per icon. `DrawGroup` sketches every icon inside it once as it scrolls into
 * view and again when one of its items is hovered. Styles live in v11.css (.v11-hd).
 */
const ICONS = {
  wallet: <>
    <path pathLength={1} d="M7.5 15.2c9.8-.6 22.9-.4 33.4.3.8 6.2.9 12.6.2 19.1-11 .8-22.6.9-33.3.2-.9-6.5-.9-13.1-.3-19.6z" />
    <path pathLength={1} className="ghost" d="M8.2 16c9.5-.3 22.4-.2 32.3.4.6 5.9.6 12-.1 18.2" />
    <path pathLength={1} d="M24.3 15.6c.3 6.4.2 12.8-.2 19.3" />
    <path pathLength={1} className="acc" d="M11 12.4c5.2-.6 10.9-.7 16.6-.2l-.2 3.5" />
    <path pathLength={1} d="M30 21.4c2.6-.2 5.1-.1 7.4.2M30.3 25.6c2.2-.1 4.3 0 6.4.2" />
  </>,
  clutch: <>
    <path pathLength={1} d="M6.6 17.8c11.5-1 23.3-1 34.9.1.6 5.6.4 11.2-.4 16.6-11.2.9-22.6 1-33.9.1-.9-5.4-1.1-11.1-.6-16.8z" />
    <path pathLength={1} className="ghost" d="M7.4 18.6c11-.7 22.4-.7 33.4.2" />
    <path pathLength={1} d="M6.9 18.1c5.8 4.6 11.4 7.3 17.2 7.4 5.9-.1 11.6-2.8 17.1-7.5" />
    <circle pathLength={1} className="acc" cx="24.1" cy="26.6" r="2.3" />
  </>,
  cards: <>
    <path pathLength={1} d="M10.4 18.6c9.3-.5 18.7-.4 27.9.2.4 5.3.4 10.7-.2 16-9.2.6-18.5.6-27.6 0-.5-5.4-.6-10.8-.1-16.2z" />
    <path pathLength={1} className="acc" d="M13.6 18.4l1-5.4c7.4-.6 14.9-.4 22.3.4l-.6 5.3" />
    <path pathLength={1} className="ghost" d="M16.6 13.3l.7-3.4c5.6-.3 11.2-.2 16.7.3l-.4 3.3" />
    <path pathLength={1} d="M14.6 29.7c5.9-.3 11.9-.3 17.8 0" />
  </>,
  hide: <>
    <path pathLength={1} d="M17.6 8.6c2.4 2.2 4.4 2.7 6.4 2.6 2.1-.1 4.2-.9 6.2-2.6 1.8 2.9 2 5.4 4.6 6.6 2.7 1.2 4.3 1.1 5.6 3-2 2.4-2.7 4.4-2.4 7 .3 2.8 1.6 4.6 2.3 7.3-2.3.9-4.3 1.2-5.6 3.3-1.4 2.2-1.5 4.3-3.4 5.9-2.3-1.4-4.6-1.9-7.3-1.8-2.6.1-4.7.8-6.9 1.9-1.6-1.8-1.9-3.8-3.2-5.8-1.4-2-3.4-2.5-5.6-3.5.8-2.6 2-4.5 2.2-7.2.2-2.7-.6-4.6-2.6-7 1.5-1.8 3.2-1.9 5.8-3 2.6-1.2 3-3.7 4.3-6.7z" />
    <path pathLength={1} className="acc" d="M18.6 13.4c3.6 1.9 7.4 1.9 11 .1 1.6 3 4.6 4.3 7 4.9-1.3 2.4-1.7 4.8-1.4 7.4.3 2.5 1 4.4 1.5 6.4-2.6.9-4.4 2.6-5.6 5.3-3.6-1.3-7.6-1.4-11.3.1-1.1-2.6-3-4.4-5.6-5.3.8-2 1.3-4 1.4-6.4.1-2.6-.4-4.9-1.6-7.3 2.7-.6 4.9-2.2 6.6-5.2z" />
  </>,
  tap: <>
    <path pathLength={1} d="M8.4 15.8c10.2-.6 20.7-.5 31 .2.6 5.7.6 11.5 0 17.2-10.3.7-20.6.7-30.9 0-.6-5.8-.6-11.6-.1-17.4z" />
    <path pathLength={1} className="ghost" d="M9.2 16.6c10-.4 20-.3 29.6.2" />
    <path pathLength={1} d="M12.4 21.4c2.4-.2 4.7-.2 7 0v4.2c-2.3.2-4.6.2-6.9 0z" />
    <path pathLength={1} className="acc" d="M27.4 20.2c1.4 2.6 1.4 5.6.1 8.4M31 18.6c2.2 3.6 2.2 7.8.1 11.6M34.6 17.2c2.9 4.6 2.9 10 .1 14.6" />
  </>,
  gift: <>
    <path pathLength={1} d="M10.2 21.6c9.3-.4 18.6-.3 27.8.2.3 6.1.2 12.1-.3 18.2-9.1.5-18.2.5-27.3 0-.6-6.1-.7-12.2-.2-18.4z" />
    <path pathLength={1} d="M7.6 15.8c11-.5 22-.4 33 .2.2 2 .2 4-.1 6-11 .4-22 .3-32.9-.2-.2-2-.2-4 0-6z" />
    <path pathLength={1} d="M24.2 15.9c.4 8 .3 16.1-.2 24.2" />
    <path pathLength={1} className="acc" d="M24 15.8c-3.6-4.4-9.2-6.4-10.4-3.4-1 2.6 5.2 3.6 10.4 3.4 5.2.2 11.4-.8 10.4-3.4-1.2-3-6.8-1-10.4 3.4z" />
  </>,
  van: <>
    <path pathLength={1} d="M5.6 14.2c7.2-.4 14.4-.3 21.6.2.4 5.8.3 11.6-.2 17.4-7.1.4-14.2.4-21.3 0-.4-5.9-.5-11.8-.1-17.6z" />
    <path pathLength={1} d="M27.4 19.4c3.4-.3 6.6-.2 9.6.4 2.4 2.4 4.2 4.6 5.4 7.4.1 1.6.1 3.1-.1 4.6-5 .3-10 .2-14.9-.1" />
    <circle pathLength={1} className="acc" cx="13.4" cy="33.4" r="3.2" />
    <circle pathLength={1} className="acc" cx="34.6" cy="33.4" r="3.2" />
    <path pathLength={1} className="ghost" d="M9 20.2c3.6-.2 7.2-.2 10.8 0M9.4 24.6c2.6-.1 5.2-.1 7.8 0" />
  </>,
  clock: <>
    <path pathLength={1} d="M24.4 8.2c8.8.2 15.6 7 15.4 15.8-.2 8.8-7.2 15.8-16 15.6-8.6-.2-15.4-7.4-15.2-16 .2-8.6 7.2-15.6 15.8-15.4z" />
    <path pathLength={1} className="ghost" d="M23.6 9.2c8.2.4 14.6 6.8 14.6 15" />
    <path pathLength={1} className="acc" d="M24.2 14.4c-.2 3.4-.2 6.6 0 9.8 2.4 1.4 4.6 2.6 6.8 3.8" />
  </>,
  return: <>
    <path pathLength={1} d="M12.4 17.4c3.2-5.6 9.4-8.8 16-7.8 7.8 1.2 13.2 8.4 12 16.2-1.2 7.6-8.6 12.8-16.2 11.8-5.2-.8-9.4-4.2-11.2-8.8" />
    <path pathLength={1} className="acc" d="M11 9.6c.3 2.8.6 5.4 1.4 7.8 2.6-.2 5.2-.6 7.8-1.2" />
    <path pathLength={1} className="ghost" d="M27.6 11c6.6 1.4 11.2 7.6 10.2 14.4" />
  </>,
  mail: <>
    <path pathLength={1} d="M7.6 13.8c10.8-.5 21.8-.4 32.8.2.5 6.8.4 13.6-.2 20.4-10.9.6-21.8.6-32.6 0-.6-6.9-.6-13.8 0-20.6z" />
    <path pathLength={1} className="acc" d="M8 14.4c5.4 4.6 10.6 8.2 16 9.2 5.4-1 10.8-4.6 16.2-9.4" />
    <path pathLength={1} className="ghost" d="M8.6 33.6c4.6-3.6 8.8-6.6 12.6-8.6M39.4 33.4c-4.4-3.4-8.6-6.4-12.4-8.4" />
  </>,
} as const;

export type DrawnName = keyof typeof ICONS;

export function Drawn({ name, size = 40, className }: { name: DrawnName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={`v11-hd ${className ?? ""}`} aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

/** Sketches the icons inside it once on entering the screen, and again when any `[data-redraw]` child is hovered. */
export function DrawGroup({ children, className, as: Tag = "div", ...rest }: { children: ReactNode; className?: string; as?: "div" | "ul" | "section" } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => {
      el.classList.remove("v11-drawing");
      void el.offsetWidth; // restart the CSS animation
      el.classList.add("v11-drawing");
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        play();
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    const items = el.querySelectorAll("[data-redraw]");
    items.forEach((i) => i.addEventListener("mouseenter", play));
    return () => {
      io.disconnect();
      items.forEach((i) => i.removeEventListener("mouseenter", play));
    };
  }, []);
  const El = Tag as "div";
  return <El ref={ref as React.RefObject<HTMLDivElement>} className={className} {...rest}>{children}</El>;
}
