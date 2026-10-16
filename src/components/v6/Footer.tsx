"use client";

// Footer: a newsletter row, link columns, then payment marks and legal links on one bottom line.
import Image from "next/image";
import { useState, type CSSProperties, type FormEvent } from "react";
import type { footer as FooterData, newsletter as NewsletterData } from "@/content/home-v6";
import { Arrow, Check } from "./Icons";
import styles from "./Footer.module.css";

export default function Footer({ data, newsletter }: { data: typeof FooterData; newsletter: typeof NewsletterData }) {
  const [joined, setJoined] = useState(false);
  const join = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // preview only: nothing is sent anywhere
    setJoined(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={`v6-wrap ${styles.club}`} data-reveal="up">
        <div>
          <h2 className={`v6-display ${styles.clubTitle}`}>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
        </div>
        {joined ? (
          <p className={styles.thanks}><Check /> Thanks, you&apos;re on the list.</p>
        ) : (
          <form onSubmit={join}>
            <label className="v6-sr" htmlFor="v6-email">Email address</label>
            <input id="v6-email" type="email" required placeholder="Email address" autoComplete="email" />
            <button className="v6-btn v6-btn--light" type="submit">Sign up<Arrow /></button>
          </form>
        )}
      </div>

      <div className={`v6-wrap ${styles.cols}`}>
        <div className={styles.brand} data-reveal="up">
          <Image src="/brand/morucha-logo-white.webp" alt="Morucha" width={667} height={256} className={styles.logo} />
          <a href="mailto:sales@morucha.co.uk">sales@morucha.co.uk</a>
        </div>
        {data.columns.map((col, i) => (
          <nav key={col.title} aria-label={col.title} data-reveal="up" style={{ "--d": (i + 1) * 80 } as CSSProperties}>
            <h3 className="v6-display">{col.title}</h3>
            <ul>
              {col.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}
            </ul>
          </nav>
        ))}
      </div>

      <div className={`v6-wrap ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Morucha</p>
        <ul className={styles.payments} aria-label="We accept">
          {data.payments.map((p) => (
            <li key={p}><Image src={`/images/payments/${p}.svg`} alt={p} width={40} height={25} /></li>
          ))}
        </ul>
        <ul className={styles.legal}>{data.legal.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
      </div>
    </footer>
  );
}
