// v7 line icons (1.4px strokes, currentColor), drawn light like Bucherer's.
import type { SVGProps } from "react";

const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden {...p}><path d="M0 5h12.5M9 1l4 4-4 4" /></svg>
);
export const Search = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="m19.5 19.5-4.6-4.6" /></svg>;
export const User = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20.5c1.3-3.8 4.2-5.8 7.5-5.8s6.2 2 7.5 5.8" /></svg>;
export const Heart = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M12 19.5s-7.5-4.4-7.5-10A4.1 4.1 0 0 1 12 7.2a4.1 4.1 0 0 1 7.5 2.3c0 5.6-7.5 10-7.5 10Z" /></svg>;
export const Bag = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 8.5h14v12H5z" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></svg>;
export const Menu = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M3.5 7h17M3.5 12h11M3.5 17h17" /></svg>;
export const Close = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5.5 5.5l13 13M18.5 5.5l-13 13" /></svg>;
export const Chevron = ({ dir = "right", ...p }: SVGProps<SVGSVGElement> & { dir?: "left" | "right" }) => (
  <svg {...base} {...p}><path d={dir === "left" ? "m14.5 5.5-6.5 6.5 6.5 6.5" : "m9.5 5.5 6.5 6.5-6.5 6.5"} /></svg>
);
export const At = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={34} height={34} {...p}><circle cx="12" cy="12" r="3.6" /><path d="M15.6 9v4.2a2.4 2.4 0 0 0 4.8 0V12a8.4 8.4 0 1 0-3.3 6.7" /></svg>
);
export const Globe = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={18} height={18} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.6 3.5 5.4 3.5 8.5s-1.1 5.9-3.5 8.5c-2.4-2.6-3.5-5.4-3.5-8.5s1.1-5.9 3.5-8.5Z" /></svg>;

export const serviceIcons = [
  // van, clock, express, return
  <svg key="van" {...base} width={28} height={28}><path d="M2.5 6.5h11v9.5h-11zM13.5 9.5h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></svg>,
  <svg key="clock" {...base} width={28} height={28}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
  <svg key="fast" {...base} width={28} height={28}><path d="M3 8h6M2 12h5M3 16h6" /><path d="M10 6.5h7l3.5 4V17h-10.5z" /><circle cx="13.5" cy="17.5" r="1.5" /></svg>,
  <svg key="return" {...base} width={28} height={28}><path d="M8.5 6 4.5 10l4 4" /><path d="M4.5 10H14a5.5 5.5 0 0 1 0 11h-3" /></svg>,
];
