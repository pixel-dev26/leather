import Image from "next/image";
import { footer, newsletter } from "@/content/home-v2";
import styles from "./Footer.module.css";

/** v2rule.md §12C: deep band after septiemelargeur.fr + Craftory-style giant wordmark. The reassurance points now live in the Trade section. */
export default function Footer() {
  return (
    <footer>
      <div className={styles.band}>
        <div className={styles.intro}>
          <Image src="/brand/morucha-logo-light.png" alt="Morucha" width={667} height={256} className={styles.logo} />
          <p className={styles.tagline}>{footer.tagline}</p>
          <p className={styles.mission}>{footer.mission}</p>
        </div>

        <div className={styles.grid}>
          <form className={styles.newsletter} action="#">
            <p className={styles.colTitle}>{newsletter.label}</p>
            <p className={styles.nlText}>{newsletter.text}</p>
            <label htmlFor="ft-email" className="visually-hidden">
              Email address
            </label>
            <input id="ft-email" type="email" placeholder="Email address" autoComplete="email" required />
            <button type="submit">Subscribe</button>
          </form>
          {footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className={styles.colTitle}>{c.title}</p>
              <ul className={styles.links}>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <ul className={styles.socials}>
            {footer.socials.map((s) => (
              <li key={s}>
                <a href="#">{s}</a>
              </li>
            ))}
          </ul>
          <p className={styles.copy}>© {new Date().getFullYear()} Morucha Leather</p>
          <ul className={styles.socials}>
            {footer.legal.map((s) => (
              <li key={s}>
                <a href="#">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        <svg className={styles.wordmark} viewBox="0 0 1000 150" aria-hidden>
          <text x="0" y="138" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="190" fontWeight="700" fill="currentColor" style={{ fontFamily: "var(--font-sans)" }}>
            MORUCHA
          </text>
        </svg>
      </div>
    </footer>
  );
}
