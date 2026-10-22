// v8 line icons (1.4px strokes, currentColor), drawn light to sit with the regular-weight type.
import type { SVGProps } from "react";

const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Arrow = ({ dir = "right", ...p }: SVGProps<SVGSVGElement> & { dir?: "left" | "right" }) => (
  <svg {...base} {...p} style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const Search = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" /></svg>;
export const Bag = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 7.5h14V21H5z" /><path d="M9 7.5V6a3 3 0 0 1 6 0v1.5" /></svg>;
export const Menu = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M3 6.5h18M3 12h18M3 17.5h18" /></svg>;
export const Close = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>;
export const Chevron = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>;
export const Pause = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M9 6v12M15 6v12" /></svg>;
export const Play = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M8 5.5v13l10-6.5-10-6.5Z" /></svg>;

/** The UK flag, for the region picker. */
export const UkFlag = () => (
  <svg width="20" height="12" viewBox="0 0 60 36" aria-hidden>
    <clipPath id="v8-uk"><path d="M0 0h60v36H0z" /></clipPath>
    <g clipPath="url(#v8-uk)">
      <path d="M0 0h60v36H0z" fill="#012169" />
      <path d="M0 0l60 36M60 0 0 36" stroke="#fff" strokeWidth="7" />
      <path d="M0 0l60 36M60 0 0 36" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="11" />
      <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);
