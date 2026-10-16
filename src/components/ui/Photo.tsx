import Image from "next/image";
import type { ImageSlot } from "@/content/home";
import { withBase } from "@/lib/image-loader";
import Placeholder from "./Placeholder";
import styles from "./ui.module.css";

type Props = ImageSlot & {
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string; // object-position, e.g. "30% 50%"
  original?: boolean; // always the full-size file, never a smaller product-photo copy (featured galleries)
};

/** Cover-fit photo that fills its parent (packshots are shown whole); falls back to the leather placeholder when no src is set. */
export default function Photo({ src, alt, tone, fit, className = "", sizes = "50vw", priority, position, original }: Props) {
  if (!src) return <Placeholder alt={alt} tone={tone} className={className} />;
  return (
    <div className={`${styles.photo} ${fit === "contain" ? styles.packshot : ""} ${className}`}>
      <Image src={original ? withBase(src) : src} unoptimized={original} alt={alt} fill sizes={sizes} priority={priority} style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}
