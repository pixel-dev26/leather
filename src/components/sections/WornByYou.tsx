import { makers } from "@/content/home";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { rich } from "@/components/ui/rich";
import styles from "./WornByYou.module.css";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const Stars = ({ className }: { className: string }) => (
  <span className={className} role="img" aria-label="Five stars">
    ★★★★★
  </span>
);

/** "Carried by You" (Popov / Thursday / Mismo): a staggered mosaic of customer photos, one pinned to its product,
 *  with verified review cards in between. */
export default function WornByYou() {
  const [p1, p2, p3, p4, p5] = makers.items;
  const [r1, r2] = makers.reviews;
  const { featured } = makers;

  const post = (m: typeof p1, cls: string, i: number) => (
    <Reveal as="li" delay={i} className={`${styles.post} ${cls}`}>
      <a href={makers.href} className="hover-zoom" aria-label={`Shop this piece: ${m.caption}`}>
        <Photo {...m.image} sizes="(max-width: 767px) 50vw, 17vw" />
        <span className={styles.overlay}>
          <em>{m.caption}</em>
          Shop this piece →
        </span>
      </a>
    </Reveal>
  );

  return (
    <section id="makers" className={`bg-paper ${styles.makers}`} aria-label={makers.label}>
      <div className={styles.head}>
        <div>
          <p className={styles.label}>{makers.hashtag}</p>
          <h2 className={styles.title}>{rich(makers.display)}</h2>
        </div>
        <div className={styles.actions}>
          <p className={styles.rating}>{makers.rating}</p>
          <a href={makers.share.href} className={styles.share}>
            <InstagramIcon />
            {makers.share.label}
          </a>
        </div>
      </div>

      <ul className={styles.mosaic}>
        <Reveal as="li" className={`${styles.post} ${styles.big}`}>
          <a href={makers.href} className="hover-zoom" aria-label={`Customer photo: ${p1.caption}`}>
            <Photo {...p1.image} sizes="(max-width: 767px) 100vw, 34vw" />
          </a>
          <a href={featured.href} className={styles.pin}>
            <span className={styles.pinImg}>
              <Photo {...featured.image} sizes="56px" />
            </span>
            <span className={styles.pinText}>
              <b>{featured.name}</b>
              <span>
                {featured.price} · {featured.handle}
              </span>
            </span>
            <span className={styles.pinShop}>Shop</span>
          </a>
        </Reveal>
        {post(p2, styles.drop, 1)}
        <Reveal as="li" delay={2} className={`${styles.review} ${styles.reviewDark}`}>
          <figure>
            <Stars className={styles.stars} />
            <blockquote>&ldquo;{r1.quote}&rdquo;</blockquote>
            <figcaption>
              {r1.name} · bought the {r1.product}
            </figcaption>
          </figure>
        </Reveal>
        {post(p3, "", 3)}
        <Reveal as="li" delay={4} className={styles.review}>
          <figure>
            <Stars className={styles.stars} />
            <blockquote>&ldquo;{r2.quote}&rdquo;</blockquote>
            <figcaption>
              {r2.name} · {r2.product}
            </figcaption>
          </figure>
        </Reveal>
        {post(p4, styles.lift, 5)}
        {post(p5, styles.wide, 6)}
      </ul>
    </section>
  );
}
