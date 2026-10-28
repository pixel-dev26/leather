"use client";

import Image from "next/image";
import { useState } from "react";
import { footer, logo } from "@/content/home-v12";
import styles from "./Footer.module.css";

/**
 * v12rule.md §6 footer: an ink rule, four link columns with serif heads and the newsletter on the right (grey field, dark
 * button), then a second rule with the region, copyright and the Morucha bull where Ghurka has its seal.
 * The sign-up has no list behind it yet, so it only confirms on the page.
 */
export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {footer.columns.map((c) => (
          <div key={c.title}>
            <h2 className={styles.head}>{c.title}</h2>
            <ul>{c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
        ))}
        <div className={styles.news}>
          <h2 className={styles.head}>{footer.newsletter.title}</h2>
          <p>{footer.newsletter.text}</p>
          {sent ? (
            <p role="status" className={styles.sent}>Thank you. You’re on the list.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label htmlFor="v12-email" className="v12-sr">Email address</label>
              <input id="v12-email" type="email" required placeholder="Email Address" autoComplete="email" />
              <button type="submit">Sign Up</button>
            </form>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <p className={styles.region}>{footer.region}</p>
          <p className={styles.copy}>{footer.copyright}</p>
        </div>
        <Image src={logo} alt="Morucha" width={136} height={34} className={styles.mark} />
      </div>
    </footer>
  );
}
