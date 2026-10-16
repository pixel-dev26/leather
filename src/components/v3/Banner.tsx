import type { Banner as BannerData } from "@/content/home-v3";
import BannerPicture from "./BannerPicture";
import Icon from "./Icons";
import styles from "./Banner.module.css";

/** Full-bleed one-column banner (v3rule.md §7): no overlay, text and button flip with the image tone. */
export default function Banner({ id, title, text, cta, art, alt, tone, points }: BannerData) {
  const dark = tone === "dark";
  return (
    <section id={id} className={`${styles.banner} ${dark ? styles.dark : ""}`} aria-labelledby={`${id}-h`}>
      <BannerPicture art={art} alt={alt} />
      <div className={styles.copy}>
        <h2 id={`${id}-h`}>{title}</h2>
        <p>{text}</p>
        {points && (
          <ul className={styles.points}>
            {points.map((pt) => (
              <li key={pt.text}>
                <Icon name={pt.icon} size={18} />
                {pt.text}
              </li>
            ))}
          </ul>
        )}
        <a href={cta.href} className={`v3-btn v3-btn--lg ${dark ? "v3-btn--light" : "v3-btn--dark"}`}>
          {cta.label}
        </a>
      </div>
    </section>
  );
}
