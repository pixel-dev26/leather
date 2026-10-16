// v6 line icons (1.6px strokes, currentColor).
import type { SVGProps } from "react";

const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden {...p}><path d="M0 6h20M15 1l5 5-5 5" /></svg>
);
export const Search = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>;
export const User = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>;
export const Heart = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M12 20s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20Z" /></svg>;
export const Bag = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></svg>;
export const Menu = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M3 7h18M3 12h18M3 17h18" /></svg>;
export const Close = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>;
export const Chevron = ({ dir = "right", ...p }: SVGProps<SVGSVGElement> & { dir?: "left" | "right" }) => (
  <svg {...base} {...p}><path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} /></svg>
);
export const Check = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;

export const perkIcons = {
  shield: <svg {...base} width={34} height={34}><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" /><path d="M9 12l2 2 4-4" /></svg>,
  leather: <svg {...base} width={34} height={34}><path d="M7 4c3 2 7 2 10 0l3 4-3 2v10H7V10L4 8l3-4Z" /><path d="M9.5 13h5M9.5 16h5" strokeDasharray="1.5 1.5" /></svg>,
  gift: <svg {...base} width={34} height={34}><rect x="3.5" y="9" width="17" height="11" rx="1" /><path d="M2.5 9h19M12 9v11M12 9c-1.5-3-5-4-5.5-2S9 9 12 9Zm0 0c1.5-3 5-4 5.5-2S15 9 12 9Z" /></svg>,
  van: <svg {...base} width={34} height={34}><path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5V16h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>,
} as const;
