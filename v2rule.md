# Morucha — Design Rules v2

Primary aesthetic reference: **craftory.com** (Craftory, leather goods, Estonia).
Values below were measured from the live site at a 1440px viewport (computed styles and CSS variables), then adapted for Morucha.

v2 keeps **the same sections as v1** (see §10) but swaps the whole visual system. v1 was quiet editorial luxury: serif, gold, 140px padding. v2 is **modern Nordic craft**: one geometric sans, flat colour-blocked bands, edge-to-edge imagery with 10px gutters, and a big "stitched" display letterform as the signature.

Every page and component must follow these rules. If something isn't covered here, choose the **flatter, simpler, more graphic** option.

---

## 1. Design principles

1. **Modernity in an old craft.** No serif and no gold, so nothing reads as "heritage luxury". One clean geometric sans does all the work, and the craft shows through photography and the stitch motif.
2. **Edge-to-edge, tight gutters.** Content runs nearly full width with a **10px** page gutter and **10px** gaps between images. Images butt up against each other like a contact sheet.
3. **Big quiet space between sections, none inside them.** Sections are dense blocks (images 10px apart) separated by **100–160px** of empty greige.
4. **Colour blocks, not decoration.** Whole sections switch to a flat muted colour (dusty blue, olive, burnt orange). No gradients, shadows or textures.
5. **The stitch is the signature.** Oversized letters built from rounded dashes, like saddle-stitching, sit over hero and category images in off-white.
6. **Lowercase calm.** Sentence case everywhere, regular weight (400) only, and large text with tight leading. Bold is used only in the logo.
7. **Understated commerce.** Product cards show name and price on one line, a muted category, and colour dots. The only loud element is a small yellow "%" sale badge.

---

## 2. Colour

Measured from Craftory's CSS (`--color-*`, colour schemes and computed backgrounds). Use the token names in code; never hard-code hex values in components.

### Core palette

| Token | Hex | Craftory source | Use |
|---|---|---|---|
| `--clr-bg` | `#E4DFD9` | body bg `rgb(228,223,217)` | Default page background (warm greige). Header uses it too |
| `--clr-bg-2` | `#F3EEE8` | `--color-beige` | Light beige: stitch letters, hero text, product image wells |
| `--clr-bg-3` | `#DBD5CD` | `--color-lighter-grey` | Subtle alternate band, input backgrounds |
| `--clr-text` | `#363636` | body colour `rgb(54,54,54)` | All primary text, logo, icons, button borders |
| `--clr-text-2` | `#565656` | `--color-dark-grey` | Active tab, secondary headings |
| `--clr-text-muted` | `#ABA8A1` | card category colour | Product category, meta, captions |
| `--clr-text-faint` | `#C5C4BA` | `--color-mid-grey` | Inactive tabs, disabled |
| `--clr-line` | `#CAC6C1` | default border colour | Hairlines, dividers |
| `--clr-on-image` | `#EDECE9` | hero text `rgb(237,236,233)` | Text and stitch letters on photos |

### Colour-block bands (section backgrounds)

| Token | Hex | Craftory source | Use |
|---|---|---|---|
| `--clr-blue` | `#5A87B1` | image-with-text band `rgb(90,135,177)` | Story / editorial band |
| `--clr-olive` | `#888A6E` | `--color-green`, collection band | Collection carousel band |
| `--clr-orange` | `#EC8746` | footer `rgb(236,135,70)` | Footer |
| `--clr-orange-2` | `#DD7A3A` | `--color-orange` | Hover on orange, alternate warm band |
| `--clr-red` | `#C15253` | `--color-red` | Rare accent, error text |
| `--clr-yellow` | `#F0B55C` | `--color-yellow`, sale badge | Sale "%" badge, tiny highlights only |

### Product colour swatches (for leather colour dots)

| Token | Hex | Leather |
|---|---|---|
| `--sw-black` | `#2B2B2B` | Black |
| `--sw-cognac` | `#8B4A2B` | Cognac / tan |
| `--sw-biscuit` | `#E9E2D6` | Natural / biscuit |
| `--sw-cranberry` | `#9E1B2E` | Oxblood / cranberry |

### Rules
- The page background is **greige `#E4DFD9`**, never white. White appears only inside product photos.
- Text is **always `#363636`**, including on the blue, olive and orange bands. Craftory never flips to white text on colour bands. The only light text is `--clr-on-image`, used on photos.
- Use **at most three colour bands per page**, never two next to each other, always separated by a greige section.
- Yellow is for the sale badge only.
- Contrast: `#363636` on all the band colours passes AA for large text (≥ 24px). On `--clr-blue` and `--clr-olive`, keep body text at 16px+ and check it. `--clr-text-muted` on greige fails AA, so use it only for secondary meta beside primary text.

---

## 3. Typography

Craftory uses **one sans for everything** (Supreme LL by Lineto) plus a **custom stitch display face** (BR Naht by Brownfox) for oversized letters. Both are commercial.

### Font families

| Token | Family | Role |
|---|---|---|
| `--font-sans` | **Jost** (Google Fonts) 400, 400 italic, 700. Licensed alternative: **Supreme LL**. | Everything: nav, headings, body, buttons, prices |
| `--font-stitch` | **Morucha Stitch**: a custom SVG letter set built from rounded dashes (see §7). Licensed alternative: **BR Naht**. | Oversized hero and category letters only |

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

Jost is the closest free geometric match for Supreme (Futura-like round "o", single-storey feel, open counters). If budget allows, license Supreme LL Regular, Italic and Bold for the exact look.

### Type scale (desktop 1440 → mobile 375)

| Token | Use | Size | Weight | Line height | Tracking | Case |
|---|---|---|---|---|---|---|
| `--fs-stitch` | Stitch letters over images | `clamp(240px, 38vw, 600px)` | 400 | 0.7–1.2 | 0 | Upper |
| `--fs-h0` | Rare giant statement | `clamp(32px, 0.75rem + 3.333vw, 60px)` | 400 | 1.1 | 0 | Sentence |
| `--fs-statement` | Centred brand statement | `clamp(24px, 2.6vw, 38px)` | 400 | **1.1** | 0 | Sentence |
| `--fs-h1` | Editorial headline, large body in story band | `clamp(22px, 1.15rem + 0.98vw, 32px)` | 400 | **1.07** | 0 | Sentence |
| `--fs-h2` | Section tabs ("Bestsellers / New in / Sale") | `clamp(20px, 1.07rem + 0.78vw, 28px)` | 400 | 1.4 | 0 | Sentence |
| `--fs-h3` | Collection card titles | `clamp(18px, 1.03rem + 0.39vw, 28px)` | 400 | 1.5 | 0 | Sentence |
| `--fs-label` | Section eyebrow ("READING", "MORE") | `16px` | 400 | 1.25 | **0.04em** | **Upper** |
| `--fs-nav` | Header nav | `18px` (16px under 1200px) | 400 | 1.5 | 0 | Sentence |
| `--fs-body-lg` | Product name and price | `16px` | 400 | 1.5 | 0 | Sentence |
| `--fs-body` | Default body, footer, links | `14px` | 400 | **1.65** | 0 | Sentence |
| `--fs-small` | Buttons, captions | `14px` / `13px` | 400 | 1 (buttons) | 0 | Sentence |
| `--fs-xs` | Legal, badges | `12px` | 400 | 1.5 | 0 | Sentence |

### Rules
- **Weight 400 everywhere.** 700 is used only for the wordmark. No bold headings.
- **Large text, tight leading.** Headlines and the story-band paragraphs sit at 1.07–1.1 line height. Small body text loosens to 1.65.
- **No letter-spacing**, except uppercase eyebrow labels (0.04em).
- **Italic for one emphasised word** inside a headline, e.g. "Bringing modern thinking to an *old* craft." Never italicise a whole sentence.
- Story-band copy is set **big (32px), not small**, in a narrow ~460px column (a third of the grid). Long body text is set large rather than small.
- Root size stays `16px`; scale with the clamps above.

---

## 4. Section heading pattern

Craftory headings are minimal: no gold dot, no three-tier stack. Use one of two forms only.

**A. Eyebrow label (default).** A single uppercase 16px label, centred over the section, sitting **~8–12px** above the content block:

```
                    READING                    ← --fs-label, uppercase, 0.04em, centred
[ full-width colour band / image grid starts 8–12px below ]
```

**B. Tab row (product sections).** Two to four headings at `--fs-h2` in an equal-column grid across the full width, centred in each column. The active tab is `--clr-text-2` with a 1px underline; inactive tabs are `--clr-text-faint`. Clicking a tab swaps the product row below.

```
   Bestsellers            New in              Sale
   ───────────
```

- Headings never have their own large display word. The **imagery and the stitch letters** carry the scale.
- Spacing: label → content `8–12px`. Tab row → content `40–48px`.

---

## 5. Spacing and layout

### Spacing scale
`2 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 96 · 120 · 160`

### The 10px system (the core of the look)

| Token | Value | Use |
|---|---|---|
| `--gutter` | **10px** desktop and mobile | Page side padding. Content is ~1420px wide on a 1440 screen |
| `--gap` | **10px** | Gap between images, cards and grid columns |
| `--gap-row` | 64px | Row gap in product grids (between rows of cards) |
| `--card-text-gap` | 8–10px | Image → caption/name |

### Section spacing (between sections)

| Breakpoint | Gap between sections |
|---|---|
| Desktop ≥ 1200px | **96–160px** (default 120px) |
| Tablet 768–1199px | 80–96px |
| Mobile < 768px | 56–64px |

Token: `--section-gap: clamp(56px, 8.3vw, 120px);` Use `--section-gap-lg: clamp(64px, 11vw, 160px)` before colour bands.

Inside colour bands: **10px** padding all round (images sit 10px from the band edge), plus 32px at the bottom when there's a scrollbar or caption.

### Containers
Craftory is almost always full-bleed. Use narrow containers only for centred statements.

| Token | Max width | Use |
|---|---|---|
| `--container-full` | 100% minus 2×10px | Default for everything |
| `--container-statement` | 980px | Centred brand statement |
| `--container-text` | 680px | Long-form text pages, forms |
| `--col-third` | `calc((100% - 20px) / 3)` | Story-band text column |

### Grid
- **Product row:** 4 columns at 1440 (each ~344px wide, 3:4 images), 10px gap. Horizontal scroll-snap carousel on smaller screens.
- **Category pair:** 2 columns, square (1:1) images, 10px gap.
- **Editorial band:** 3 equal columns: text, image, empty (or text, image, image), 10px gap and 10px padding.
- **Collection carousel:** cards about 1/3 viewport wide (3:4 image + title), 10px gap, bleeding off the right edge, scroll-snap.

---

## 6. Imagery

- **Radius: 0** on all images and image cards.
- Aspect ratios: hero **full viewport (100vh minus header)**; product **3:4**; category pair **1:1**; editorial **3:4**; collection cards **3:4**.
- Lifestyle photos: natural daylight, real people mid-gesture (hands holding wallets, a bag against a coat), cool urban backdrops (stone, navy wool, forest green). Slight film grain. Product in context, never cut out.
- Product cards: **first image is a lifestyle or close-up crop**; **on hover it swaps to a cut-out product on a `--clr-bg-2` well**, using `object-fit: contain` and a 0.1s opacity swap.
- Hero and category images carry a **stitch letter overlay** (see §7). No dark gradient overlays; choose photos with calm areas for the letters.
- Hover on collection and category images: zoom `scale(1.05)` over 0.6–1s ease.

---

## 7. Components

### Header
- Height **59px** desktop (16px vertical padding), 56px mobile. Side padding **10px**.
- **3-column grid** `1fr auto 1fr`: nav links left, **centred bold wordmark** (MORUCHA, sans 700, ~28px set, ~160px wide), utilities right (Region/GBP, Account, `Bag (0)`).
- Nav: 18px, regular, sentence case, 40px column gap. Links are plain text: no underline, no uppercase.
- Cart count: a small `--clr-text` circle with the number in `--clr-bg` (16px diameter, 11px digit).
- Background is `--clr-bg` and solid. The header is sticky but **hides on scroll down and shows on scroll up** (translateY transition 0.3s).
- Dropdown (mega-menu): a 2px underline grows from the left under the active item (0.25s), and the panel is `--clr-bg` with link lists at `--fs-nav`.

### Hero (slideshow)
- Full-bleed image, `100vh − header`.
- **Giant stitch word centred** over the image in `--clr-on-image` (e.g. "HI", "NEW", "SS26"), about 550px tall at 1440.
- A small caption below it (20px, `--clr-on-image`, e.g. the year or collection name).
- Pagination: a small rounded pill of dots in `--clr-bg-2` at bottom centre.
- Slide transition: image opacity 0 → 1 (0.3s) plus `scale(1.1) → 1` (1s).
- No buttons in the hero. The whole slide is a link.

### Stitch letters (signature motif)
- Each glyph is built from **vertical rounded dashes**: stroke width ≈ 4.5% of the letter height, dash length ≈ 18%, gap ≈ 6%, fully round caps. They read like saddle-stitch holes running down a strap.
- Colour: `--clr-on-image` / `--clr-bg-2` (`#F3EEE8`) at 100%, over photos only.
- Implementation: an SVG component `<StitchWord text="M" />` that draws each letter from a small path library (A–Z, 0–9), or license BR Naht and set it with `font-family: var(--font-stitch)`.
- Use: the hero word, and **one capital letter per category image** (e.g. "W" over Wallets, "B" over Bags) centred at ~600px.
- Never use stitch letters for body text, buttons or anything under 120px.

### Buttons

| Type | Style |
|---|---|
| Outline (default) | 1px `--clr-text` border, transparent bg, `--clr-text` text, 14px/1, padding `10px 13px`, **radius 7px**, sentence case. Hover: fill `--clr-text`, text `--clr-bg` (0.2s). |
| Solid | bg `--clr-text`, text `--clr-bg`, radius 7px, `clamp(16px, 0.85rem + 0.37vw, 20px)`, full-width on product pages. Hover: 85% opacity. |
| Text link | 14px with a 1px underline at the text baseline (`background-size: 100% 1px`). Hover: underline shrinks to 0 width from the right (0.3s). |
| Arrow link | `↪ Wallets` (the hook arrow U+21AA plus a label), 14px, under category images. |
| Faded link | Footer and nav lists at 65% opacity → 100% on hover (0.2s). |

Buttons are small and quiet. There are no big primary CTAs and no uppercase buttons.

### Product card
- 3:4 image well, 0 radius, no border or shadow.
- **Sale badge**: a `--clr-yellow` pill (40×46px, radius 999px) with "%" in `--clr-text`, top-right, 10px inset.
- **Quick-add** ("Choose" + bag icon) appears on hover as a bar along the bottom of the image, ~22px text, 20px side padding.
- Under the image (8px gap):
  - Row 1: **name** left, **price** right, both 16px `--clr-text`. "From £77" with the old price struck through in `--clr-text-muted`.
  - Row 2: **category** left in `--clr-text-muted`, **colour dots** right (10px circles, 6px gap, the selected one with a 1px ring).
- No star ratings, no "New" ribbons. The yellow % badge is the only badge.

### Category pair (multi-column)
- Two 1:1 images side by side, 10px gap, a stitch capital centred over each, and an `↪ Label` link 8px below each image.

### Editorial colour band (image with text)
- The eyebrow label sits above the band on greige.
- The band is a full-bleed `--clr-blue` block with 10px padding and a 3-column grid:
  - Col 1: headline at `--fs-h1` (one italic word), then ~117px of space, then the paragraph **also at `--fs-h1`**, then an outline button 32px below.
  - Col 2: a 3:4 image, vertically centred.
  - Col 3: empty (lets the colour breathe), or a second image.

### Collection carousel band
- Eyebrow label centred above. Full-bleed `--clr-olive` band, padding `10px 10px 32px`.
- Horizontal scroll-snap row of cards (~1/3 viewport wide): a 3:4 image, then the title at `--fs-h3` 24px below, left aligned.
- A thin custom scrollbar or none. No arrows on desktop; drag or scroll to move.

### Statement + stamp
- A centred `--container-statement` with one or two lines at `--fs-statement`.
- Below it (24px), a **circular monogram stamp** (~100×112px, line art in `--clr-text`), with Morucha's initials set in a script/italic oval seal.

### Forms (newsletter, trade)
- Inputs: transparent or `--clr-bg-3` bg, 1px `--clr-text` border, **radius 0** (Craftory `--input-border-radius: 0`), padding `10px 13px`, 16px text.
- Selects use radius 7px like buttons.
- Focus: 1px border becomes 2px. No glow.
- Labels are 14px sentence case above the field. Errors are `--clr-red`.

### Footer (superseded by §12C; kept for reference)
- Full-bleed **`--clr-orange`** band, padding `32px 10px 10px`.
- Top row: two link groups on a 6-column grid. Left: Contact, Instagram, Facebook (inline, 12px gap). Right: Delivery, Returns, Terms, Privacy. 16px faded links.
- Bottom: **a giant MORUCHA wordmark SVG spanning the full width** (~1405×214 at 1440) in `--clr-text`.
- No newsletter form, payment icons or 4-column sitemap in the footer. It stays this minimal.

---

## 8. Motion

| Property | Value |
|---|---|
| Smooth scroll | Lenis-style inertial scroll (lerp ~0.1). Disable for reduced motion |
| Link and colour hover | `color 0.2s ease-in-out` |
| Underline links | `background-size 0.3s ease-in-out` |
| Button hover | `color 0.2s, background-color 0.2s` |
| Product image swap | `opacity 0.1s ease-in-out` |
| Image zoom on hover | `transform 0.8s cubic-bezier(.2,.7,.2,1)`, scale 1.05 |
| Hero slide | opacity 0.3s plus scale 1.1 → 1 over 1s |
| Header | hide/show `transform 0.3s` on scroll direction |
| Section reveal | fade up 16px, 0.6s ease-out (subtle; most of the motion is in the imagery) |

- Respect `prefers-reduced-motion`: no smooth scroll, no zoom or scale, opacity only.

---

## 9. Responsive rules

| Breakpoint | Name |
|---|---|
| `≥ 1200px` | Desktop |
| `1000–1199px` | Laptop |
| `700–999px` | Tablet |
| `< 700px` | Mobile |

- The gutter stays **10px** at every size, and gaps stay 10px.
- Product row becomes a horizontal scroll-snap carousel below 1000px (cards ~70vw on mobile).
- Category pair stacks to 1 column under 700px. Stitch letters scale with `--fs-stitch`.
- Editorial band stacks: text first, then the image, at full width.
- Header under 1000px: hamburger left, wordmark centre, bag right. The menu opens as a full-screen greige panel with 28px links.
- Tab-row headings shrink to `--fs-h2` mobile (20px) and scroll horizontally if needed.
- Footer wordmark always spans the full width (SVG with `width: 100%`).

---

## 10. Applying the rules to Morucha's home page sections (same sections as v1)

| # | Section | v2 layout pattern | Background |
|---|---|---|---|
| 1 | Announcement bar | 32px tall, centred 13px sentence case, e.g. "Free UK delivery over £75" | `--clr-text` with `--clr-bg` text |
| 2 | Header / nav | §7 header: 59px, 3-col grid, centred bold wordmark, sticky hide-on-scroll | `--clr-bg` |
| 3 | Hero | Full-bleed slideshow, giant stitch word ("HELLO" / "SS26") plus a small caption, pill dots | Image |
| 4 | Statement banner | Centred two-line statement at `--fs-statement` plus a circular monogram stamp below | `--clr-bg` |
| 5 | Our leathers | Eyebrow "OUR LEATHERS" + **category-pair pattern**: two square images (e.g. Full-grain / Veg-tan) with stitch capitals and `↪` links. Or a 4-up row for four leathers | `--clr-bg` |
| 6 | Bestsellers | **Tab row** (Bestsellers / New in / Sale) + 4-up product cards, 10px gaps | `--clr-bg` |
| 7 | Our story | Eyebrow "OUR STORY" + **editorial colour band**: big 32px text column + 3:4 image + empty column, outline "Read more" button | `--clr-blue` |
| 8 | The process | Eyebrow "THE PROCESS" + a 5-up row of 3:4 images, each with a stitch numeral (1–5) overlaid and an `↪ Step name` link under it. Scrolls on mobile | `--clr-bg` |
| 9 | Leather goods collections | **Collection slider (§12A)**: centred portrait image + giant italic names (Wallets, Purses, Cardholders, Travel bags). Eyebrow "SHOP BY COLLECTION" | `--clr-bg` |
| 10 | Sustainability | Editorial band **mirrored** (empty column + image + text). Use greige rather than a third colour, with three short points in `--fs-h1` | `--clr-bg-3` |
| 11 | Made with Morucha | Eyebrow "MADE WITH MORUCHA" + **collection carousel band** (§7) of 3:4 maker photos with `--fs-h3` captions | `--clr-olive` |
| 12 | Trade and wholesale | Centred statement at `--fs-statement`, three short benefit lines in a 3-col grid at `--fs-h3`, then two outline buttons ("Open a trade account", "Request swatch box") | `--clr-bg` |
| 13 | Newsletter | **Flyout popup (§12B)**, plus the newsletter column in the footer. No separate inline section | — |
| 14 | Footer | **§12C**: reassurance strip + deep band with tagline, newsletter, link columns, giant wordmark | `--clr-deep` |

Colour-band rhythm on the home page: greige → **blue (7)** → greige → **olive (11)** → greige → **deep footer (14)**. Orange stays in the palette for the announcement bar and one-off bands. Never put two bands next to each other.

---

## 11. CSS token starter

```css
:root {
  /* colour */
  --clr-bg: #e4dfd9;
  --clr-bg-2: #f3eee8;
  --clr-bg-3: #dbd5cd;
  --clr-text: #363636;
  --clr-text-2: #565656;
  --clr-text-muted: #aba8a1;
  --clr-text-faint: #c5c4ba;
  --clr-line: #cac6c1;
  --clr-on-image: #edece9;
  --clr-blue: #5a87b1;
  --clr-olive: #888a6e;
  --clr-orange: #ec8746;
  --clr-orange-2: #dd7a3a;
  --clr-red: #c15253;
  --clr-yellow: #f0b55c;
  --sw-black: #2b2b2b;
  --sw-cognac: #8b4a2b;
  --sw-biscuit: #e9e2d6;
  --sw-cranberry: #9e1b2e;

  /* type */
  --font-sans: "Jost", "Supreme LL", "Futura", system-ui, sans-serif;
  --font-stitch: "BR Naht", var(--font-sans);
  --fs-stitch: clamp(240px, 38vw, 600px);
  --fs-h0: clamp(2rem, 0.75rem + 3.333vw, 3.75rem);
  --fs-statement: clamp(1.5rem, 2.6vw, 2.375rem);
  --fs-h1: clamp(1.375rem, 1.146rem + 0.976vw, 2rem);
  --fs-h2: clamp(1.25rem, 1.067rem + 0.78vw, 1.75rem);
  --fs-h3: clamp(1.125rem, 1.03rem + 0.39vw, 1.75rem);
  --fs-label: 1rem;
  --fs-nav: 1.125rem;
  --fs-body-lg: 1rem;
  --fs-body: 0.875rem;
  --fs-small: 0.8125rem;
  --fs-xs: 0.75rem;
  --lh-tight: 1.07;
  --lh-heading: 1.1;
  --lh-body: 1.65;
  --ls-label: 0.04em;

  /* layout */
  --gutter: 10px;
  --gap: 10px;
  --gap-row: 64px;
  --section-gap: clamp(56px, 8.3vw, 120px);
  --section-gap-lg: clamp(64px, 11vw, 160px);
  --header-h: 59px;
  --container-statement: 980px;
  --container-text: 680px;
  --radius-btn: 7px;
  --radius-pill: 999px;
  --radius: 0;

  /* motion */
  --ease: ease-in-out;
  --ease-zoom: cubic-bezier(.2, .7, .2, 1);
  --t-fast: 0.2s;
  --t-mid: 0.3s;
  --t-slow: 0.8s;
}
```

---

## 12. Secondary reference: septiemelargeur.fr

The user likes its clean look. Three patterns are taken from it and restyled with v2 tokens. Everything else stays Craftory.

### Added tokens
| Token | Value | Use |
|---|---|---|
| `--font-serif` | **Instrument Serif** italic (Google Fonts). Septième uses Freight Display Book Italic. | Only for the giant collection names, footer tagline and popup title |
| `--clr-deep` | `#3B1E2B` (Septième footer `#3D182C`, warmed slightly) | Footer band, solid popup button |
| `--clr-deep-text-2` | `rgba(255,255,255,.65)` | Faded footer links and text |
| `--fs-serif-xl` | `clamp(44px, 5.6vw, 80px)`, letter-spacing 0.04em | Collection names |

The italic serif is the **only** exception to "one sans". Use it for these three places and nowhere else.

### A. Collection slider (home §9, from Septième's 3rd section)
- Section height ≈ 100vh (900px), on `--clr-bg`.
- **One centred portrait image** (~590×740 at 1440, 4:5) that crossfades (opacity 0.5s) when the active collection changes.
- **A horizontal row of giant italic collection names** (`--fs-serif-xl`) runs across the vertical centre of the image, overflowing both sides. The active name is centred, sits over the photo in `--clr-on-image`, and has a small uppercase "Discover" link (13px, 0.15em tracking, underlined) under it. Inactive names are `--clr-text` at 35% opacity.
- Click a name, or use the arrow keys or swipe, to change the active collection. The row slides with `transform 0.6s cubic-bezier(.2,.7,.2,1)`.

### B. Newsletter flyout popup
- Appears once per visitor (per-browser storage flag) **8s after load or at 50% scroll**. Fixed at bottom centre, 820px wide (calc(100% − 20px) on mobile), on `--clr-bg-2` with 10px padding.
- Two columns: **form left** (an uppercase spaced label "LETTERS FROM THE TANNERY", an italic serif title, a 14px line, an email input with a 1px `--clr-text` border, radius 0, 48px high, and a full-width solid `--clr-deep` button with uppercase 13px text at 0.2em tracking) and a **3:4 image right**. The image is hidden under 700px.
- A close × top-right. Esc closes it. Slides up 24px and fades in over 0.4s.

### C. Footer (replaces §7 footer)
- Above it: a **reassurance strip** on `--clr-bg-3` with a 1px `--clr-line` top border and 64px vertical padding. Four centred items, each a 24px line icon, an uppercase 13px label (0.15em tracking) and a 14px line: Free UK delivery / Returns within 30 days / Lifetime repairs / Contact.
- The band is `--clr-deep` with white text and 96px top padding:
  1. A centred italic serif tagline (40px, e.g. "*Leather that ages with you*").
  2. An uppercase mission line (16–20px, 0.18em tracking, max 820px).
  3. A small monogram mark (56px).
  4. A **4-column grid**: newsletter (label, 65% text, underline-only input, white button with deep text) | Shop | Help | About. Column headings are uppercase 13px at 0.15em tracking; links are 16px at 65% → 100% opacity.
  5. A bottom bar: socials, uppercase copyright in 50% white, legal links.
  6. Finish with **Craftory's giant full-width MORUCHA wordmark** in white at 12% opacity. This ties the two references together.

---

## 14. v2.1 updates (after first review)

- **Bigger headings.** Every section opens with one centred sentence-case title at `--fs-title` (`clamp(32px, …, 56px)`). It replaces the 16px uppercase eyebrow from §4A. Tab rows use `--fs-h2` (26 → 40px). Card titles under images use `--fs-h3` (20 → 28px). Product names and prices use `--fs-card` (17 → 20px).
- **Real logo.** The header uses `/public/brand/morucha-logo.png` (red bull + MORUCHA) at 50px tall in a 72px header (40px in a 60px header on mobile). The footer uses `morucha-logo-light.png` above the tagline. The giant footer wordmark stays.
- **Imagery.** Temporary lifestyle and product photography is from olivercompanylondon.com, and the featured product gallery is from dailyobjects.com (see `src/content/images-v2.ts`). Neither is licensed; replace all of it before launch.
- **Made with Morucha** autoplays one card every 3.5s, with segmented progress bars, play/pause and prev/next. It pauses on hover, on focus, when off-screen and when the visitor prefers reduced motion.
- **Trade & wholesale** benefits get animated line icons (96px, 1.2 stroke). Strokes draw in on scroll, then idle loops play: swatches fan out of the box, a running stitch travels round the hide, the price tag swings.
- **Sustainability** is interactive. It has three columns on the sand band: headline + big italic serif figure | crossfading photo | selectable list. The list auto-advances every 6s with a progress hairline. Clicking a point (or using the arrow keys) takes over, and the photo and figure change with it.
- **§12D Featured product (new, after the DailyObjects product page).** Placed after the collection slider:
  - Left: a vertical thumbnail rail and a 4:5 main image on `#ecebe8`, with hover-zoom (1.8×), arrows and dots. It is sticky on desktop.
  - Right: an eyebrow, the name at `--fs-title`, price + struck price, 40px colour swatches that switch the gallery, a quantity stepper and a solid "Add to bag" button (it flips to "✓ Added" on olive and increments the header bag count), a 4-up feature icon row, accordions (details / specifications / delivery), and "Pairs well with" mini cards with "+ Add".

### v2.2 updates
- **Statement stamp** is a true circle (120×120 viewBox, two rings, text on an r47 circle).
- **Our story band:** text is white on the blue. The right column holds four stats (italic serif figures + 15px labels between white hairlines). The figures are placeholders until Morucha confirms them.
- **Featured product** fits one viewport on desktop: the grid height is `clamp(560px, 100svh − header − 40px, 860px)`, the gallery fills that height, and the buy box is compact (name at `--fs-h2`, 32px swatches, 50px button, accordions closed by default, "Pairs well with" in one row of three).
- **Sustainability** reads left to right: commitments accordion (auto-advancing) | photo with the active figure overlaid | "Questions, answered" FAQ accordion.
- **Made with Morucha** always autoplays. There is no play/pause button, and it only rests while off-screen. Prev/next arrows stay.
- **Trade & wholesale** merges the four service points (delivery, returns, repairs, contact) into its card grid. It is one hairline grid with 3 large benefit cards on top and 4 smaller service cards below, all with animated line icons. The footer no longer has a separate strip.

---

## 13. Don'ts

- No serif fonts (except the italic serif uses in §12), no gold, no oxblood CTAs. Those belong to v1.
- No bold headings, no uppercase buttons, no letter-spaced body text.
- No white page background and no white text on colour bands (text stays `#363636`).
- No drop shadows, gradients, overlays on hero images, or textures.
- No large page margins. The gutter is 10px; don't box content into a 1200px container (except statements and text pages).
- No two colour bands in a row, and no more than three per page.
- Radius only on buttons (7px) and pills (badge, dots). Images and inputs stay square.
- No trust-badge strips, star ratings or "NEW" ribbons on cards.
- Don't use stitch letters under 120px or for text people need to read.
- Don't copy Craftory's content, imagery, wordmark, monogram stamp or the BR Naht font files. Only the visual system is referenced. License BR Naht or Supreme LL properly if you use them.
