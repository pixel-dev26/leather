import Image from "next/image";
import { footer, logo } from "@/content/home-v11";
import Icon from "./Icons";
import styles from "./Footer.module.css";

/** v11rule.md §6 footer: ink, white logo and social buttons, four link columns, then the legal line and payment marks. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="v11-wrap">
        <div className={styles.cols}>
          <div className={styles.brand}>
            <Image src={logo.light} alt="Morucha" width={140} height={35} />
            <ul className={styles.social} aria-label="Morucha on social media [TBC]">
              <li><a href="#" aria-label="Instagram"><Icon name="instagram" size={16} /></a></li>
              <li><a href="#" aria-label="Facebook"><Icon name="facebook" size={16} /></a></li>
              <li><a href="#" aria-label="TikTok"><Icon name="tiktok" size={16} /></a></li>
            </ul>
          </div>
          {footer.columns.map((c) => (
            <details key={c.title} className={styles.col} open>
              <summary>{c.title}</summary>
              <ul>{c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </details>
          ))}
        </div>
        <div className={styles.base}>
          <p>{footer.legal}</p>
          <ul aria-label="Payment methods">{footer.payments.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </div>
    </footer>
  );
}
