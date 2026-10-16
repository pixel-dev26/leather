// Thin line icons for v4 (v4rule.md §7): 1.2–1.5px strokes, no fills, currentColor.
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ArrowNE = ({ className }: P) => (
  <svg viewBox="0 0 14 14" strokeWidth={1.3} className={className} {...base}><path d="M2 12 12 2M4.5 2H12v7.5" /></svg>
);

export const Chevron = ({ className, dir = "right" }: P & { dir?: "left" | "right" | "down" }) => (
  <svg viewBox="0 0 30 30" strokeWidth={1.4} className={className} {...base}
    style={{ transform: dir === "left" ? "rotate(180deg)" : dir === "down" ? "rotate(90deg)" : undefined }}>
    <path d="m11 6 9 9-9 9" />
  </svg>
);

export const Play = ({ className }: P) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden><path d="M6 3.5v13l11-6.5z" fill="currentColor" /></svg>
);

export const Leaf = ({ className }: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.4} className={className} {...base}>
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 13 11" />
  </svg>
);

export const Chat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.5} className={className} {...base}>
    <path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" />
  </svg>
);

export const Plus = ({ className, open }: P & { open?: boolean }) => (
  <svg viewBox="0 0 16 16" strokeWidth={1.3} className={className} {...base}>
    <path d="M2 8h12" />{!open && <path d="M8 2v12" />}
  </svg>
);

/* 70px offer-card illustrations (Super Tannery "We Offer" line icons) */
export const OfferIcon = ({ name, className }: P & { name: string }) => (
  <svg viewBox="0 0 70 70" strokeWidth={1.2} className={className} {...base}>
    {name === "wallet" && (
      <>
        <rect x="10" y="20" width="50" height="34" rx="2" />
        <path d="M10 28h50M44 37h16v10H44a5 5 0 0 1 0-10Z" />
        <circle cx="46" cy="42" r="1.4" />
        <path d="M16 20l26-8 4 8" strokeDasharray="2 2.5" />
      </>
    )}
    {name === "bag" && (
      <>
        <path d="M12 26h46l-3 30H15z" />
        <path d="M25 26v-6a10 10 0 0 1 20 0v6" />
        <path d="M15 34h40" strokeDasharray="2 2.5" />
        <rect x="30" y="38" width="10" height="7" rx="1" />
      </>
    )}
    {name === "hide" && (
      <>
        <path d="M22 10c4 3 9 4 13 4s9-1 13-4c2 5 1 9-2 12 4 4 10 6 12 12-5 0-8 2-9 5 3 6 3 13-1 21-5-4-9-5-13-5s-8 1-13 5c-4-8-4-15-1-21-1-3-4-5-9-5 2-6 8-8 12-12-3-3-4-7-2-12Z" />
        <path d="M35 22v30" strokeDasharray="2 2.5" />
      </>
    )}
  </svg>
);
