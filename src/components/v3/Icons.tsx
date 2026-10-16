// Thin line icons for v3 (24×24 grid, 1.5 stroke, currentColor), drawn to match DailyObjects' outline set.

type IconProps = { size?: number; className?: string };

const PATHS = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  account: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6z" /></>,
  basket: <><path d="M5 8h14l-1 12.5H6z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  chevronLeft: <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  chevronRight: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  chevronDown: <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />,
  share: <><circle cx="17.5" cy="5.5" r="2.5" /><circle cx="6.5" cy="12" r="2.5" /><circle cx="17.5" cy="18.5" r="2.5" /><path d="m8.7 10.8 6.6-4M8.7 13.2l6.6 4" /></>,
  truck: <><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  tag: <><path d="M3.5 12.6V4.5h8.1l8.9 8.9-8.1 8.1z" /><circle cx="8" cy="9" r="1.4" /></>,
  box: <><path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4z" /><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" /></>,
  scale: <><path d="M12 4v16M6 20h12M4.5 7.5h15" /><path d="m4.5 7.5-2.5 6a2.8 2.8 0 0 0 5 0zM19.5 7.5l-2.5 6a2.8 2.8 0 0 0 5 0z" /></>,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></>,
  facebook: <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z" />,
  pinterest: <><circle cx="12" cy="12" r="8.5" /><path d="M10.5 20.5 12.6 11M10.2 14.2c.5.9 1.4 1.3 2.4 1.3 2.4 0 3.9-2.2 3.9-4.7 0-2.5-2-4.3-4.5-4.3-2.8 0-4.6 1.9-4.6 4.2 0 1 .4 1.8 1 2.2" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="3.5" /><path d="m10 9 5 3-5 3z" /></>,
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 24, className }: IconProps & { name: IconName }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
