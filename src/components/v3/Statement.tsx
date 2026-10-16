import { statement } from "@/content/home-v3";
import styles from "./Statement.module.css";

/** v3rule.md §10 row 4: centred statement (heading form C), no image, so two banners never sit back to back. */
export default function Statement() {
  return (
    <section className={styles.statement} aria-labelledby="statement-h">
      <h2 id="statement-h">{statement.title}</h2>
      <p>{statement.text}</p>
      <a href={statement.cta.href} className="v3-btn v3-btn--sm v3-btn--dark">
        {statement.cta.label}
      </a>
    </section>
  );
}
