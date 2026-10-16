import Reveal from "@/components/ui/Reveal";
import { reassurance, tradeV2 } from "@/content/home-v2";
import { Title } from "./Title";
import styles from "./Trade.module.css";

type Icon = (typeof tradeV2.benefits)[number]["icon"] | (typeof reassurance)[number]["icon"];

/**
 * Animated line icons: every stroke draws itself in when the card scrolls into view (pathLength + dashoffset),
 * then a small idle loop plays (swatches fan, stitch runs, tag swings, van rolls, arrow turns, needle sews, letter lifts).
 */
function TradeIcon({ name, size = 96 }: { name: Icon; size?: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className={`${styles.icon} ${styles[name]}`} viewBox="0 0 64 64" width={size} height={size} aria-hidden {...common}>
      {name === "swatch" && (
        <>
          <g className={styles.fan}>
            <rect className={styles.sw1} x="22" y="8" width="12" height="30" rx="2" pathLength={1} />
            <rect className={styles.sw2} x="26" y="8" width="12" height="30" rx="2" pathLength={1} />
            <rect className={styles.sw3} x="30" y="8" width="12" height="30" rx="2" pathLength={1} />
          </g>
          <path d="M10 30h44v24H10z" pathLength={1} fill="var(--clr-bg)" />
          <path d="M10 30l6-8h32l6 8" pathLength={1} />
          <path d="M26 42h12" pathLength={1} />
        </>
      )}
      {name === "hide" && (
        <>
          <path
            d="M20 8c4 3 8 4 12 4s8-1 12-4c1 5 3 8 8 9-2 5-2 9 0 13-3 4-3 9-1 14-5 1-8 4-9 9-3-2-7-3-10-3s-7 1-10 3c-1-5-4-8-9-9 2-5 2-10-1-14 2-4 2-8 0-13 5-1 7-4 8-9z"
            pathLength={1}
          />
          <path
            className={styles.stitch}
            d="M22 14c3 2 7 3 10 3s7-1 10-3c1 3 3 5 6 6-1 4-1 7 0 10-2 3-2 7-1 10-3 1-5 3-6 6-3-1-6-2-9-2s-6 1-9 2c-1-3-3-5-6-6 1-3 1-7-1-10 1-3 1-6 0-10 3-1 5-3 6-6z"
            strokeWidth={1.1}
          />
        </>
      )}
      {name === "tag" && (
        <>
          <path d="M14 8c4 0 6 3 6 7" pathLength={1} />
          <g className={styles.swing}>
            <path d="M20 15l20 0 14 14-20 20-14-14z" pathLength={1} />
            <circle cx="26" cy="21" r="2.5" pathLength={1} />
            <path d="M32 33l8 8M30 39l4-4" pathLength={1} />
          </g>
        </>
      )}
      {name === "van" && (
        <>
          <g className={styles.drive}>
            <path d="M6 20h30v22H6zM36 28h12l8 8v6H36z" pathLength={1} />
            <circle cx="16" cy="44" r="4" pathLength={1} fill="var(--clr-bg)" />
            <circle cx="46" cy="44" r="4" pathLength={1} fill="var(--clr-bg)" />
          </g>
          <path className={styles.road} d="M4 54h56" strokeDasharray="6 5" />
        </>
      )}
      {name === "return" && (
        <g className={styles.turn}>
          <path d="M46 22A18 18 0 1 0 50 36" pathLength={1} />
          <path d="M47 12v10H37" pathLength={1} />
        </g>
      )}
      {name === "needle" && (
        <>
          <g className={styles.sew}>
            <path d="M44 6L22 38" pathLength={1} />
            <path d="M44 6l2 2-21 32" pathLength={1} />
          </g>
          <path className={styles.thread} d="M8 52h48" strokeDasharray="4 4" />
        </>
      )}
      {name === "mail" && (
        <>
          <path d="M8 24h48v30H8z" pathLength={1} />
          <g className={styles.letter}>
            <path d="M16 12h32v26H16z" pathLength={1} fill="var(--clr-bg)" />
            <path d="M22 20h20M22 26h14" pathLength={1} />
          </g>
          <path d="M8 24l24 18 24-18" pathLength={1} fill="var(--clr-bg)" />
        </>
      )}
    </svg>
  );
}

/** Trade & wholesale: three trade benefits plus the four service points, as one bordered card grid with animated icons. */
export default function Trade() {
  return (
    <section className={styles.trade} id="trade" aria-labelledby="trade-h">
      <Title id="trade-h">{tradeV2.title}</Title>
      <Reveal as="p" className={styles.text}>
        {tradeV2.text}
      </Reveal>

      <div className={styles.grid}>
        {tradeV2.benefits.map((b, i) => (
          <Reveal key={b.title} delay={i * 2} className={`${styles.card} ${styles.cardLg}`}>
            <TradeIcon name={b.icon} />
            <p className={styles.cardTitle}>{b.title}</p>
            <p className={styles.cardText}>{b.text}</p>
          </Reveal>
        ))}
        {reassurance.map((r, i) => (
          <Reveal key={r.title} delay={i * 2 + 1} className={`${styles.card} ${styles.cardSm}`}>
            <TradeIcon name={r.icon} size={64} />
            <p className={styles.cardLabel}>{r.title}</p>
            <p className={styles.cardText}>{r.text}</p>
          </Reveal>
        ))}
      </div>

      <div className={styles.buttons}>
        <a href={tradeV2.primary.href} className={`${styles.button} ${styles.buttonSolid}`}>
          {tradeV2.primary.label}
        </a>
        <a href={tradeV2.secondary.href} className={styles.button}>
          {tradeV2.secondary.label}
        </a>
      </div>
    </section>
  );
}
