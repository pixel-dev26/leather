import type { ImageSlot } from "@/content/home";
import styles from "./ui.module.css";

type Props = ImageSlot & { className?: string; showCaption?: boolean };

/** Warm leather-toned stand-in for a photo. Replace with next/image once real photography exists. */
export default function Placeholder({ alt, tone = "mid", className = "", showCaption = true }: Props) {
  return (
    <div role="img" aria-label={alt} className={`${styles.ph} ${styles[`ph_${tone}`]} ${className}`}>
      {showCaption && <span className={styles.phCaption}>{alt}</span>}
    </div>
  );
}
