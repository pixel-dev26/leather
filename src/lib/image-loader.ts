// next/image loader (next.config.ts → images.loaderFile). Nothing is resized at request time, same as the
// previous `unoptimized: true`. Local files ("/brand/…") get the base path so they resolve under the static
// review export at /l/. The width only goes into a URL fragment, which servers ignore; it keeps srcset
// entries distinct, so Next doesn't warn that the loader ignores width.
//
// Product photos (/images/products/<handle>/NN.jpg|png) have smaller WebP copies made by
// scripts/resize-product-images.mjs in <handle>/w320/, w640/ and w960/. Each srcset entry gets the smallest
// copy at least that wide, and anything wider than 960 gets the original. The featured-product galleries
// skip the loader (`unoptimized`, with withBase) so their main photos are always the originals.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const PRODUCT_PHOTO = /^(\/images\/products\/[^/]+)\/([^/]+)\.(?:jpe?g|png)$/i;
const SIZED_WIDTHS = [320, 640, 960]; // keep in step with scripts/resize-product-images.mjs

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const photo = PRODUCT_PHOTO.exec(src);
  const sized = photo && SIZED_WIDTHS.find((w) => w >= width);
  const path = sized ? `${photo[1]}/w${sized}/${photo[2]}.webp` : src;
  const url = path.startsWith("/") ? `${base}${path}` : path;
  return `${url}#w${width}`;
}

/** Same base-path rule for non-image assets referenced by absolute path (e.g. <video src>), and for images with `unoptimized`. */
export const withBase = (path: string) => (path.startsWith("/") ? `${base}${path}` : path);
