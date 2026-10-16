import styles from "./SideTabs.module.css";

/** Vertical tabs pinned to the right edge (Spica pattern). Hidden on mobile. */
export default function SideTabs() {
  return (
    <aside className={styles.tabs} aria-label="Quick links">
      <a href="#trade" className={`${styles.tab} ${styles.trade}`}>Trade enquiries</a>
      <a href="mailto:sales@morucha.co.uk?subject=Swatch%20box" className={`${styles.tab} ${styles.swatch}`}>
        Request swatches
      </a>
    </aside>
  );
}
