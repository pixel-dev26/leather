import Reveal from "./Reveal";
import { rich } from "./rich";
import styles from "./ui.module.css";

type Props = {
  label: string;
  title: string; // supports *italic* accents and \n line breaks
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  size?: "xl" | "lg";
  className?: string;
};

/** Spica-style stacked heading: gold label → large serif display → serif sentence. */
export default function SectionHeading({ label, title, subtitle, align = "center", tone = "dark", size = "lg", className = "" }: Props) {
  return (
    <div className={`${styles.heading} ${styles[align]} ${tone === "light" ? styles.onDark : ""} ${className}`}>
      <Reveal>
        <p className={styles.label}>
          <span className={styles.dot} aria-hidden />
          {label}
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className={size === "xl" ? styles.displayXl : styles.display}>{rich(title)}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className={styles.subtitle}>{rich(subtitle)}</p>
        </Reveal>
      )}
    </div>
  );
}
