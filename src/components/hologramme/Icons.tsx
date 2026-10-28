// Thin line icons for the Hologramme version (24×24 grid, 1.5 stroke, currentColor), plus the 40×40 promise icons (hologramme-rule.md §7).

type IconProps = { size?: number; className?: string };

const PATHS = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  account: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.6" /></>,
  basket: <><path d="M5 8h14l-1 12.5H6z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  chevronLeft: <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  chevronRight: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  spark: <path d="M12 2.5 13.5 10.5 21.5 12 13.5 13.5 12 21.5 10.5 13.5 2.5 12 10.5 10.5Z" />,
  play: <path d="M9 7v10l8-5z" fill="currentColor" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></>,
  facebook: <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z" />,
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 24, className }: IconProps & { name: IconName }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {PATHS[name]}
    </svg>
  );
}

const PROMISES = {
  leather: <><path d="M8 12c4-4 8-2 12-6 4 4 8 2 12 6v8c0 8-6 13-12 15-6-2-12-7-12-15z" /><path d="m14 20 4 4 8-8" /></>,
  rfid: <><rect x="8" y="16" width="24" height="17" rx="2" /><path d="M14 16v-4a6 6 0 0 1 12 0v4M20 22v5" /></>,
  hand: <><path d="M7 30 29 8M11 34l4-4M29 12l4-4" /><path d="m13 13 15 15" strokeDasharray="2 3" /></>,
  gift: <><rect x="7" y="16" width="26" height="17" rx="1" /><path d="M5 16h30v-5H5zM20 11v22M20 11c-3-6-9-4-7 0M20 11c3-6 9-4 7 0" /></>,
  truck: <><path d="M4 12h20v16H4zM24 18h7l5 5v5H24z" /><circle cx="11" cy="30" r="3" /><circle cx="30" cy="30" r="3" /></>,
  clock: <><circle cx="20" cy="20" r="13" /><path d="M20 12v8l5 4" /></>,
  shield: <><path d="M20 5l12 5v9c0 8-6 14-12 16-6-2-12-8-12-16v-9z" /><path d="m15 20 4 4 7-7" /></>,
  returns: <><path d="M10 14h16a8 8 0 0 1 0 16H14" /><path d="m15 9-5 5 5 5" /></>,
  phone: <path d="M12 6h5l2 7-3.5 2a19 19 0 0 0 9.5 9.5L27 21l7 2v5a3 3 0 0 1-3 3C19.5 31 9 20.5 9 9a3 3 0 0 1 3-3z" />,
  tag: <><path d="M6 20V7h13l15 15-13 13z" /><circle cx="13" cy="14" r="2.2" /></>,
  store: <><path d="M6 15 9 7h22l3 8M6 15h28v3a4 4 0 0 1-7 2.6A4 4 0 0 1 20 21a4 4 0 0 1-7-.4A4 4 0 0 1 6 18z" /><path d="M8 22v11h24V22M17 33v-7h6v7" /></>,
  spark: <><path d="M20 5 22.5 17.5 35 20 22.5 22.5 20 35 17.5 22.5 5 20 17.5 17.5Z" /><path d="M31 6v5M28.5 8.5h5" /></>,
} as const;

export function PromiseIcon({ name, size = 42 }: { name: keyof typeof PROMISES; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.3}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PROMISES[name]}
    </svg>
  );
}
