// v9 line icons (1.5px strokes, currentColor).
import type { SVGProps } from "react";

const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>;
export const Search = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="m19.5 19.5-4.6-4.6" /></svg>;
export const User = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20.5c1.3-3.8 4.2-5.8 7.5-5.8s6.2 2 7.5 5.8" /></svg>;
export const Bag = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></svg>;
export const BagPlus = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5M12 12v5M9.5 14.5h5" /></svg>;
export const Menu = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M3.5 7h17M3.5 12h17M3.5 17h17" /></svg>;
export const Close = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5.5 5.5l13 13M18.5 5.5l-13 13" /></svg>;
export const Chevron = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>;
export const Pause = (p: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 12 12" aria-hidden {...p}><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>;
export const Play = (p: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 12 12" aria-hidden {...p}><path d="M3 1.5v9l7-4.5z" fill="currentColor" /></svg>;
export const Check = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;

export const promiseIcons = {
  van: <svg {...base} width={30} height={30}><path d="M2.5 6.5h11v9.5h-11zM13.5 9.5h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></svg>,
  clock: <svg {...base} width={30} height={30}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>,
  return: <svg {...base} width={30} height={30}><path d="M8.5 6 4.5 10l4 4" /><path d="M4.5 10H14a5.5 5.5 0 0 1 0 11h-3" /></svg>,
  gift: <svg {...base} width={30} height={30}><rect x="3.5" y="9" width="17" height="11" rx="1" /><path d="M2.5 9h19M12 9v11M12 9c-1.5-3-5-4-5.5-2S9 9 12 9Zm0 0c1.5-3 5-4 5.5-2S15 9 12 9Z" /></svg>,
} as const;
