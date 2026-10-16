// <img> for a product photo (/images/products/<handle>/NN.webp) that loads the smaller WebP copies
// scripts/resize-product-images.mjs makes in <handle>/w320/, w640/ and w960/. `widths` picks the copies to
// offer (pass `sizes` when there is more than one); `original` is the photo's own width and also offers the
// full-size file, for images that can show larger than 960px.
// The static export can live in a sub-folder, so the photo paths get its base path (empty in dev).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const sized = (src, w) => src.replace(/\/([^/]+)\.(?:webp|jpe?g|png)$/i, `/w${w}/$1.webp`);

export default function ProductPhoto({ src: path, widths = [320, 640, 960], original, sizes, ...rest }) {
  const src = path.startsWith('/') ? `${base}${path}` : path;
  const set = widths.map((w) => `${sized(src, w)} ${w}w`);
  if (original) set.push(`${src} ${original}w`);
  const fallback = sized(src, widths[widths.length - 1]);
  if (set.length === 1) return <img src={fallback} {...rest} />;
  return <img src={fallback} srcSet={set.join(", ")} sizes={sizes} {...rest} />;
}
