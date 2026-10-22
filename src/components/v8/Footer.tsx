"use client";

// Light footer, like the reference: the newsletter form on the left; Company, Customer Support and Legal as navy
// underlined accordions with the region picker; contact links where the reference lists its socials (Morucha has
// none); the round stamp; then the copyright, company line and payment marks.
import Image from "next/image";
import { useState } from "react";
import { Chevron, UkFlag } from "./Icons";
import { NewsletterForm } from "./Newsletter";
import { Stamp } from "./Sections";
import styles from "./Footer.module.css";

type Link = { label: string; href: string };
type Props = {
  newsletter: { title: string; text: string; interests: string[] };
  groups: { title: string; links: Link[] }[];
  contact: Link[];
  address: string[];
  payments: string[];
  legal: string;
  badge: string;
};

const PAYMENT_NAMES: Record<string, string> = {
  visa: "Visa", mastercard: "Mastercard", amex: "American Express", applepay: "Apple Pay", googlepay: "Google Pay",
};

export default function Footer({ newsletter, groups, contact, address, payments, legal, badge }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <footer className={styles.footer} id="help">
      <div className={`v8-wrap ${styles.grid}`}>
        <div className={styles.news}>
          <h2 className={styles.label}>Newsletter</h2>
          <p className={styles.lead}>{newsletter.title}. {newsletter.text}</p>
          <NewsletterForm interests={newsletter.interests} button="Subscribe" />
          <p className={styles.small}>
            By signing up, you agree to Morucha sending you marketing emails and accept our <a href="#">Privacy Policy</a>. You can unsubscribe at any time.
          </p>
        </div>

        <div className={styles.groups}>
          {groups.map((g, i) => (
            <div key={g.title} className={styles.group}>
              <button className={`v8-link ${styles.groupBtn}`} aria-expanded={open === i} aria-controls={`v8-foot-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                {g.title}<Chevron />
              </button>
              <div id={`v8-foot-${i}`} className={`${styles.groupBody} ${open === i ? styles.groupOpen : ""}`} inert={open !== i}>
                <ul>
                  {g.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
                </ul>
              </div>
            </div>
          ))}
          <p className={styles.region}><UkFlag /> United Kingdom (GBP £)</p>
        </div>

        <div className={styles.contact}>
          <ul>
            {contact.map((c) => <li key={c.label}><a href={c.href}>{c.label}</a></li>)}
          </ul>
          <address>{address.map((line) => <span key={line}>{line}</span>)}</address>
        </div>

        <Stamp id="v8-footer-stamp" text={badge} className={styles.stamp} />
      </div>

      <div className={`v8-wrap ${styles.bottom}`}>
        <div>
          <p>© Copyright {new Date().getFullYear()} MORUCHA.</p>
          <p className={styles.legal}>{legal}</p>
        </div>
        <ul className={styles.payments} aria-label="Payment methods">
          {payments.map((p) => (
            <li key={p}><Image src={`/images/payments/${p}.svg`} alt={PAYMENT_NAMES[p] ?? p} width={38} height={24} /></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
