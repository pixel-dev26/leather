import Image from "next/image";
import { footer } from "@/content/home";
import { footerV4 } from "@/content/home-v4";
import styles from "./Footer.module.css";

/** §10 row 15: Super Tannery footer — logo + newsletter, link bar between black rules, meta row. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`v4-inner ${styles.top}`}>
        <a href="#top" className={styles.logo} aria-label="Back to top">
          <Image src="/brand/morucha-logo.png" alt="Morucha" width={667} height={256} />
        </a>
        <form className={styles.news} action="#" aria-label="Newsletter">
          <p className={styles.newsText}>{footer.newsletter.text}</p>
          <div className={styles.newsRow}>
            <label htmlFor="f-email" className={styles.sr}>Email address</label>
            <input id="f-email" type="email" required placeholder="Email address" className="v4-input" autoComplete="email" />
            <button type="submit" className="v4-btn">Subscribe</button>
          </div>
        </form>
      </div>

      <nav className={`v4-inner ${styles.bar}`} aria-label="Footer">
        {footerV4.bar.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
      </nav>

      <div className={`v4-inner ${styles.meta}`}>
        <p className={styles.copy}>Copyright ©{new Date().getFullYear()} | All rights reserved by Morucha Ltd.</p>
        <div className={styles.contact}>
          <p>
            <span className="tbc">{footerV4.phone}</span>
            <span className={styles.vr} aria-hidden />
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
          </p>
          <p><span className="tbc">{footerV4.address}</span></p>
          <p className={styles.legal}>{footer.legal.map((l) => <a key={l} href="#">{l}</a>)}</p>
        </div>
        <p className={styles.company}>{footerV4.company}</p>
      </div>
    </footer>
  );
}
