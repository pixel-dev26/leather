import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  link?: { label: string; href: string };
  center?: boolean;
  dark?: boolean;
  id?: string;
  children?: ReactNode; // e.g. tabs under the title
};

/** v11rule.md §4 heading pattern: tiny tracked label, large serif title, optional light line, quiet link on the right. */
export default function SectionHead({ eyebrow, title, sub, link, center, dark, id, children }: Props) {
  return (
    <div className={`v11-sh ${center ? "v11-sh--center" : ""} ${dark ? "v11-sh--dark" : ""}`}>
      <div>
        <p className="v11-eyebrow">{eyebrow}</p>
        <h2 id={id} className="v11-h2">{title}</h2>
        {sub && <p className="v11-sub">{sub}</p>}
        {children}
      </div>
      {link && <a href={link.href} className="v11-link">{link.label}</a>}
    </div>
  );
}
