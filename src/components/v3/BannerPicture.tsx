import type { BannerArt } from "@/content/images-v3";

/** Art-directed banner image: landscape crop on desktop, portrait crop under 600px (v3rule.md §6). */
export default function BannerPicture({ art, alt, priority }: { art: BannerArt; alt: string; priority?: boolean }) {
  return (
    <picture>
      <source media="(max-width: 599px)" srcSet={art.mobile} />
      <img
        src={art.desktop}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </picture>
  );
}
