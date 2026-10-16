"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { footer } from "@/content/home-v3";
import Icon, { type IconName } from "./Icons";
import styles from "./Footer.module.css";

const SOCIAL_ICONS: Record<(typeof footer.socials)[number], IconName> = {
  Instagram: "instagram",
  Facebook: "facebook",
  Pinterest: "pinterest",
  YouTube: "youtube",
};

/**
 * v3rule.md §7 Footer: newsletter + link columns on grey, accordions, social and payments, black bar.
 * The "Featured in" press block is left out until Morucha has real press to show.
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.newsletter}>
          <p className={styles.heading}>{footer.newsletter}</p>
          {done ? (
            <p className={styles.thanks} role="status">
              Thanks, you&apos;re on the list.
            </p>
          ) : (
            <form className={styles.form} onSubmit={subscribe}>
              <label htmlFor="v3-email" className="visually-hidden">
                Email address
              </label>
              <input id="v3-email" type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              <button type="submit" className="v3-btn v3-btn--lg v3-btn--action">
                Subscribe
              </button>
            </form>
          )}
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <p className={styles.heading}>{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.accordions}>
        {footer.accordions.map((a) => (
          <details key={a.title} className={styles.acc}>
            <summary>
              {a.title}
              <Icon name="chevronDown" size={20} />
            </summary>
            <ul>
              {a.links.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className={styles.bottomRow}>
        <Link href="/v3" className={styles.logo} aria-label="Morucha home">
          <Image src="/brand/morucha-logo.webp" alt="Morucha" width={667} height={256} />
        </Link>
        <div>
          <p className={styles.heading}>Follow us on</p>
          <ul className={styles.socials}>
            {footer.socials.map((s) => (
              <li key={s}>
                <a href="#" aria-label={s}>
                  <Icon name={SOCIAL_ICONS[s]} size={24} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.heading}>We accept</p>
          <ul className={styles.payments}>
            {footer.payments.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bar}>
        <p>{footer.copyright}</p>
        <p className={styles.legal}>
          {footer.legal.map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
