"use client";

import { useState } from "react";
import Image from "next/image";
import { footer } from "@/content/home";
import styles from "./Footer.module.css";

const socialIcons: Record<(typeof footer.socials)[number], React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
  Pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 8.5c3.5-1 6 1 5 4s-4 3-4.5 1.5M11.5 11 9.5 20" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Hidesign-style footer on the logo maroon: three link columns, newsletter column with consent and socials. */
export default function Footer() {
  const [done, setDone] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <Image src="/brand/morucha-logo-white.png" alt="Morucha" width={667} height={256} className={styles.logo} />
          <p className={styles.tagline}>British Leather · Tanned with Care</p>
        </div>

        <div className={styles.main}>
          {footer.columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.news}>
            <h3 className={styles.colTitle}>{footer.newsletter.title}</h3>
            <p className={styles.newsText}>{footer.newsletter.text}</p>
            {done ? (
              <p className={styles.thanks} role="status">
                Thank you. Your first letter is on its way.
              </p>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  // TODO: connect to the mailing list provider (e.g. Shopify / Klaviyo)
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <label htmlFor="ft-email" className="visually-hidden">
                  Email address
                </label>
                <input id="ft-email" type="email" required placeholder="Enter your email" autoComplete="email" />
                <label className={styles.consent}>
                  <input type="checkbox" required />
                  <span>{footer.newsletter.consent}</span>
                </label>
                <button type="submit">Subscribe</button>
              </form>
            )}

            <p className={styles.followLabel}>Follow us</p>
            <ul className={styles.socials}>
              {footer.socials.map((s) => (
                <li key={s}>
                  <a href="#" aria-label={s}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                      {socialIcons[s]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Morucha. All rights reserved.</p>
          <p className={styles.payments}>{footer.payments}</p>
          <ul className={styles.legal}>
            {footer.legal.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
