"use client";

// Rapha's white footer: a sign-up in capitals with "send me emails about" checkboxes, four columns of links, then a
// bottom line with the payment cards, the region and the company details. The sign-up only confirms on the page.
import Image from "next/image";
import { useState, type FormEvent } from "react";
import type { footer as footerData } from "@/content/home-v9";
import styles from "./Footer.module.css";

const paymentNames: Record<string, string> = { visa: "Visa", mastercard: "Mastercard", amex: "American Express", applepay: "Apple Pay", googlepay: "Google Pay" };

export default function Footer({ data }: { data: typeof footerData }) {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) setDone(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={`v9-wrap ${styles.signup}`}>
        <div>
          <h2 className="v9-h2">{data.newsletter.title}</h2>
          <p className={styles.signupText}>{data.newsletter.text}</p>
        </div>
        {done ? (
          <p className={styles.thanks} role="status"><strong className="v9-label">Thank you</strong>Look out for our next email.</p>
        ) : (
          <form className={styles.form} onSubmit={submit}>
            <label className={styles.field}>
              <span className="v9-label">Email address</span>
              <input type="email" required autoComplete="email" placeholder="you@example.com" />
            </label>
            <fieldset className={styles.interests}>
              <legend className="v9-label">Send me emails about</legend>
              {data.newsletter.interests.map((n) => (
                <label key={n} className={styles.check}>
                  <input type="checkbox" defaultChecked />
                  <span>{n}</span>
                </label>
              ))}
            </fieldset>
            <button type="submit" className="v9-btn">Sign up</button>
          </form>
        )}
      </div>

      <div className={`v9-wrap ${styles.cols}`}>
        {data.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className={`v9-label ${styles.colTitle}`}>{c.title}</p>
            <ul>{c.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
          </nav>
        ))}
        <div>
          <p className={`v9-label ${styles.colTitle}`}>{data.contact.title}</p>
          <ul>{data.contact.lines.map((l) => <li key={l}>{l.includes("@") ? <a href={`mailto:${l}`}>{l}</a> : l}</li>)}</ul>
        </div>
      </div>

      <div className={`v9-wrap ${styles.bottom}`}>
        <Image src="/brand/morucha-logo.webp" alt="Morucha" width={667} height={256} className={styles.logo} />
        <ul className={styles.payments} aria-label="We accept">
          {data.payments.map((p) => <li key={p}><Image src={`/images/payments/${p}.svg`} alt={paymentNames[p] ?? p} width={40} height={25} /></li>)}
        </ul>
        <p className={styles.region}>United Kingdom · £ GBP</p>
      </div>
      <p className={`v9-wrap ${styles.legal}`}>© 2026 Morucha. {data.legal}</p>
    </footer>
  );
}
