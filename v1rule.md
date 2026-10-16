# Morucha — Design Rules v1

Primary aesthetic reference: **spica-inc.jp** (Motoazabu Spica, bespoke shoemaker, Tokyo).
Values below were measured from the live site at a 1440px viewport, then adapted for an English-language UK leather brand.

Every page and component must follow these rules. If something isn't covered here, choose the quieter, more spacious option.

> **Revision 1.1 (15 Oct 2026):** paper-grain texture on every surface (§2b), wider 1440px container and more generous spacing (§5), italic gold heading accents (§3), layered and staggered photo compositions (§5), and a Hidesign-style bestseller slider (§7). The secondary reference for the bestseller section is **hidesign.com**.

> **Revision 1.2 (15 Oct 2026):** the brand colour now comes from the **Morucha bull logo** (`#C2010B`), and every brown is replaced by maroon (§2). The paper texture is now **one subtle grain layer** (§2b). Sections are compact and **each fits in one viewport** (§5). The real logo is used in the header and footer (§7).

> **Revision 1.3 (15 Oct 2026):** four sections rebuilt from new references, plus a new e-commerce section (§7b):
> - **Our Leathers** → product slider like Hidesign's "Our Bestsellers" (hides sold like products)
> - **The Process** → Oliver Co London's "Discover a better way" (photo band + dark panel with accordion)
> - **Made with Morucha** → Hidesign's "Get to know us better" (Instagram community grid)
> - **Footer** → Hidesign's light footer with a built-in newsletter (the standalone Newsletter section is removed)
> - **New: Product spotlight** → DailyObjects product page (gallery, swatches, quantity, add to basket, feature icons, detail accordions)
>
> Additional references: **olivercompanylondon.com**, **dailyobjects.com**.

> **Revision 1.4 (15 Oct 2026):** two more sections rebuilt and one added, using minimal "shop-row" patterns:
> - **Our Leathers** → Nour Hammour's "New" row (nour-hammour.com)
> - **Bestsellers** → Chesterfield's "Shop by category" (chesterfieldbags.com)
> - **New: Discover cards** → Chesterfield's trio of tall story cards, placed after Shop by category
> - The shared `ProductSlider` component is retired; nothing on the page uses it any more.

---

## 1. Design principles

1. **Quiet luxury, not retail noise.** Warm off-white paper, maroon-black ink, the logo's maroon as the brand colour, with gold as a small secondary accent. No bright colours, no badges shouting "SALE", no drop shadows.
2. **Photography does the selling.** Big full-bleed images, tight crops of hands, tools, hides and grain. Text sits beside or over images; it never competes with them.
3. **Editorial rhythm.** Every section opens with the same three-tier heading: small gold label → large serif display word → serif sentence headline. Body copy is short and set in narrow columns.
4. **One section, one screen.** Each section fits within a single viewport (≤ 900px tall at 1440×900). Space is generous but disciplined: 64–96px section padding.
5. **Square and flat.** 0 border radius on images, cards and buttons. No gradients on UI, no shadows.
6. **Slow, soft motion.** Everything fades and rises in at 0.6s ease-out, staggered by 0.1s.
7. **Subtle paper everywhere.** No flat fills. Every background carries a fine, barely visible grain (§2b). It should be felt, not seen.
8. **Layered, editorial compositions.** Photos overlap, offset and stagger: an inset photo across a seam, alternate cards dropped lower, thin gold frames offset behind images. Avoid plain, even grids.

---

## 2. Colour

The structure comes from Spica's CSS variables; the hues come from the Morucha logo. Use the token names in code; never hard-code hex values in components.

**Brand colour:** `--clr-brand` **`#C2010B`**, the exact red of the Morucha bull, sampled from the logo on morucha.co.uk. All darker maroons below are derived from it.

### Core palette

| Token | Hex | Use |
|---|---|---|
| `--clr-text` | `#2A1718` | Primary text, headings, icons, nav (maroon-black) |
| `--clr-text-2` | `#6F6264` | Secondary text, captions, meta |
| `--clr-text-light` | `#F8F5F2` | Text on dark or image backgrounds |
| `--clr-bg` | `#F7F4F0` | Default page background (warm off-white) |
| `--clr-bg-2` | `#EFE8E1` | Alternate section background (soft sand) |
| `--clr-bg-light` | `#FBFAF7` | Lighter paper for alternate sections, form fields, tiles (replaces pure white) |
| `--clr-dark` | `#5C0A10` | Dark feature sections, announcement bar (deep maroon) |
| `--clr-dark-2` | `#33070A` | Footer / darkest band (near-black maroon) |

### Accents

| Token | Hex | Use |
|---|---|---|
| `--clr-gold` | `#A88B58` | Labels, small caps, ornaments, thin rules, link hover |
| `--clr-gold-dark` | `#826D48` | Gold on light backgrounds when contrast needs a lift |
| `--clr-gold-light` | `#C9AD7A` | Gold on dark backgrounds |
| `--clr-primary` | `#A8020C` | Primary CTA buttons, italic heading accents, link hovers (logo maroon, deepened for contrast) |
| `--clr-primary-dark` | `#7C0109` | Primary CTA hover |
| `--clr-primary-light` | `#C2010B` | Exact logo red, for rare highlights only |
| `--clr-green` | `#4E6C30` | Secondary CTA (trade / wholesale) |
| `--clr-green-dark` | `#425F25` | Secondary CTA hover |

### Neutrals and lines

| Token | Hex | Use |
|---|---|---|
| `--clr-line` | `#E6E0DA` | Dividers on light paper |
| `--clr-line-warm` | `#D9CBC4` | Dividers on off-white |
| `--clr-mono-4` | `#9D9797` | Disabled states, placeholder icons |
| `--clr-placeholder` | `#CCCCCC` | Form placeholder text |

### Rules
- The page background is **off-white paper (`#F7F4F0` + subtle grain)**, never pure white. Use light paper (`#FBFAF7`) to break up alternating sections.
- Alternate section backgrounds in this order: off-white → light paper or sand → **one** dark maroon feature section → off-white. Don't place two dark sections next to each other.
- Gold is for **small things only**: labels, rules, ornaments, numbers. Never use it for body text or large fills.
- Maroon (`--clr-primary`) is the brand colour: the main conversion button (at most one maroon button per viewport), the one italic word in each heading, and hover states. No brown anywhere.
- Overlays on photos use maroon-black tints: `rgba(34, 8, 10, …)`.
- Text on images always gets a dark overlay: `linear-gradient(rgba(49,37,37,.55), rgba(49,37,37,.25))` or flat `rgba(0,0,0,.35)`.
- Minimum contrast: body text must meet WCAG AA (4.5:1). `#706A6A` on `#F5F1EC` passes for body text; gold `#A88B58` doesn't, so use it only for text 14px+ in uppercase with tracking, or for decoration.

---

## 2b. Paper texture (subtle)

A single fine-grain noise layer, generated in code as a tiled SVG (`feTurbulence`, `baseFrequency .9`, 160px tile). There are no fibres, mottling or visible pattern. At normal viewing distance the background should read as a soft, warm off-white; the grain only shows up close.

| Token | Use | Opacity |
|---|---|---|
| `--tex-grain` | Light backgrounds, maroon-black speckle | **7%** |
| `--tex-grain-light` | Dark maroon backgrounds, light speckle | **6%** |

Use the utility classes; never set a flat `background` on a section:

| Class | Base colour | Layer |
|---|---|---|
| `.bg-paper` | `--clr-bg` | grain |
| `.bg-paper-light` | `--clr-bg-light` | grain |
| `.bg-sand` | `--clr-bg-2` | grain |
| `.bg-dark` | `--clr-dark` | light grain |
| `.bg-darkest` | `--clr-dark-2` | light grain |

If the texture ever looks "busy" or patterned, it's too strong: lower the opacity rather than adding layers.

The `<body>`, the scrolled header, the mobile menu and the announcement bar all carry the texture too. Hero photos get a light grain overlay (`mix-blend-mode: overlay`) so photography and paper feel like one material.

---

## 3. Typography

Spica pairs a Japanese Mincho (serif) and a Japanese Gothic (sans) with **EB Garamond** and **Montserrat** for Latin text. For Morucha (English only), Garamond takes over the Mincho role and a light humanist sans takes over the Gothic role.

### Font families (Google Fonts)

| Token | Family | Role |
|---|---|---|
| `--font-display` | **EB Garamond** 400 / 500, plus italic | Display words, headings, quotes, prices, serif buttons |
| `--font-label` | **Montserrat** 500 / 600 | Small uppercase labels, nav, eyebrow text, tags |
| `--font-body` | **Montserrat** 400 | Body copy, UI text, forms |

```html
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type scale (desktop 1440 → mobile 375, fluid with `clamp()`)

| Token | Use | Font | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|---|
| `--fs-display-xl` | Section display word in split sections ("Our *Story*") | Garamond | `clamp(46px, 6vw, 96px)` | 400 | 1.0 | 0.01em |
| `--fs-display` | Section title (default) | Garamond | `clamp(36px, 4.4vw, 68px)` | 400 | 1.1 | 0.02em |
| `--fs-h2` | Sentence headline under the display word | Garamond | `clamp(22px, 2vw, 30px)` | 400 italic | 1.5 | 0.04em |
| `--fs-h3` | Card / sub-section titles | Garamond | `clamp(19px, 1.6vw, 24px)` | 400 | 1.4 | 0.03em |
| `--fs-label` | Eyebrow labels | Montserrat | `12px` | 500 | 1.6 | 0.16em, uppercase |
| `--fs-nav` | Header nav links | Montserrat | `14px` | 500 | 1.6 | 0.1em, uppercase |
| `--fs-body` | Paragraphs | Montserrat | `14–15px` | 400 | **1.95** | 0.06em |
| `--fs-body-sm` | Card text, footer links | Montserrat | `13–14px` | 400 | 1.9 | 0.08em |
| `--fs-caption` | Image captions, meta, legal | Montserrat | `12px` | 400 | 1.6 | 0.08em |

### Rules
- **Body line height is 1.95** with 0.06em tracking. This airy setting is the core of the Spica feel; don't tighten it.
- Headings are **weight 400–500**, never bold. Emphasis comes from size and space, not weight.
- Display words are Title Case English ("Philosophy", "About Us"). Labels are UPPERCASE Montserrat. Never set Garamond in all caps above 20px.
- Body paragraphs max **34–38em wide** (about 560–600px). Spica's text columns are 564px.
- Prefer EB Garamond *italic* for quotes, pull lines and the craftsman's voice.
- **Italic maroon accent:** set one word of each display heading in Garamond italic, coloured `--clr-primary` (or `--clr-gold-light` on dark), e.g. "The *Hides*", "Our *Bestsellers*". In content, wrap the word in `*asterisks*`; the `rich()` helper renders it as `<em>`. Use one accent per heading.
- Hero headline: `clamp(50px, 7vw, 116px)`, line height 1.
- Italic Garamond is also used for numerals (01–05), sub-headlines, captions and prices.
- Base root size is fluid: `html { font-size: clamp(14px, 0.82vw + 4px, 16px); }`, so rem values scale gently with the viewport, as on Spica.

---

## 4. Section heading pattern (use on every section)

Spica opens every section with the same stacked structure. Morucha copies it exactly:

```
• (6px gold dot or 40px gold hairline, optional)
SERVICE                                   ← label: Montserrat 13px, gold, uppercase, 0.1em
Order Made Shoes                          ← display: EB Garamond 56–120px, 400
Comfort you create, then grow into        ← h2: EB Garamond 24–34px, 500 (optional)
```

- Alignment: **centred** for full-width sections; **left** in split (image + text) sections.
- Spacing: label → display `16px`; display → h2 `24px`; h2 → body `40px`; heading block → content `64–80px`.
- The display word may be oversized and overlap an image edge in split layouts. It's a signature Spica move ("Philosophy" and "About Us" sit large above or beside the photo).

---

## 5. Spacing and layout

### Spacing scale (8px base)

`4 · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120 · 140`

### Section padding

| Breakpoint | Vertical padding (top and bottom) | Side gutter |
|---|---|---|
| Wide ≥ 1600px | **96px** | **88px** |
| Desktop 1200–1599px | 72–96px | 54–72px |
| Tablet 768–1199px | 64–72px | 35–54px |
| Mobile < 768px | **64px** | **20px** |

Tokens: `--section-pad: clamp(64px, 6vw, 96px);`, `--heading-gap: clamp(32px, 3.4vw, 52px);` (heading block → content), `--gutter: clamp(20px, 4.5vw, 88px);`

### Viewport-fit rule

Every section must fit in **one viewport**: no taller than 900px at 1440×900, measured with `section.getBoundingClientRect().height`. To make sure of that, image heights inside sections are capped to the viewport height rather than set only by aspect ratio:

| Element | Size rule |
|---|---|
| Split-section photo (Story, Sustainability) | `height: min(84vh, 760px)`, min 520px |
| Collection cards | `height: clamp(320px, 56vh, 520px)` |
| Process step photos | `height: clamp(180px, 24vh, 260px)` |
| Carousel cards (Leathers, Makers) | width `clamp(210px, min(18.5vw, 29vh), 320px)` |
| Trade photo | `height: min(70vh, 600px)`, 4:5 |
| Statement photos | `max-height: 58vh` / `44vh` |
| Bestsellers | 5 cards visible ≥ 1200px (4 on laptop), 4:4.8 images |

Staggers are kept small (16–40px), and display sizes use `--fs-display` except in split sections. Measured at 1440×900, the tallest section is 896px.

### Containers

| Token | Max width | Use |
|---|---|---|
| `--container-lg` | **1440px** | Default content width (wider than Spica's 1188px for a more expansive feel) |
| `--container-md` | 1120px | Narrower grids, framed newsletter block |
| `--container-sm` | 760px | Centred text blocks, quotes, form row |
| `--text-col` | 600px | Paragraph column in split layouts |

### Grid
- 12-column grid, **32px gutter** desktop, 16px mobile.
- Cards: 3-up desktop, 2-up tablet, 1-up mobile (2-up for products on mobile).
- Gaps between cards: 32px desktop, 16px mobile.

### Signature layouts
1. **Split bleed:** the image runs off one edge of the viewport (about 52% width, height `min(84vh, 760px)`) and the text column sits in the other half with 72–160px inner padding. Alternate left and right between consecutive split sections (Spica's `home_about_us` / `--reverse`).
2. **Full-bleed band:** a 100vw image or dark band with centred heading and 3 tall cards (Spica's "Order Made Shoes": dark oxblood band, three 3:4 image cards with a large Garamond initial "S / P / B" over each).
3. **Carousel row:** a horizontal slider that bleeds off the right edge, with circular outline arrows. Cards are 210–320px wide; in "Made with Morucha" the images are square and every other card drops 16px.
4. **Layered inset:** in split sections, a smaller 4:5 photo (150–230px) overlaps the seam between the image and text columns. It has a 12px paper-coloured matte and a thin gold frame offset 28px behind it.
5. **Staggered grid:** in four- and five-up image grids (Collections, Process), even items drop 24–40px for an editorial rhythm.
6. **Offset frame:** a single feature photo (Trade) has a 1px gold rectangle offset 24px down and right behind it, plus a circular badge overlapping the corner.
7. **Watermark word:** dark bands carry one huge italic Garamond word at 3–5% opacity behind the content ("Process"; "MORUCHA" in the footer).
8. **Editorial triptych:** the statement banner sits between two photos of different sizes, one aligned high and the other low.

---

## 6. Imagery

- **Radius: 0.** All images are sharp-cornered.
- Aspect ratios: hero **16:9 full-bleed (100vh max)**; split images **4:5** or **1:1**; cards **3:4**; product shots **4:5**.
- `object-fit: cover` always.
- Style: warm, low-key light; dark backgrounds or natural wood; shallow depth of field; hands at work; tools; texture close-ups. Colour-grade warm with slightly lifted blacks.
- No cut-out products on pure white in editorial sections. White-background product shots are allowed only inside product grids.
- Hero overlay text is white (`--clr-text-light`) over a darkened image.
- Hover on image cards: image scales to `1.04` over 0.6s, with the card title fixed in place.

---

## 7. Components

### Logo
- The real Morucha logo (red bull above the "MORUCHA" wordmark), taken from morucha.co.uk and turned into transparent PNGs:
  - `public/brand/morucha-logo.png`: black wordmark, for light backgrounds
  - `public/brand/morucha-logo-light.png`: off-white wordmark, for dark and photo backgrounds
- Header: 52px tall (44px once scrolled, 38px on mobile). The light version shows over the hero and crossfades to the dark version when the header turns solid. Footer: light version, 64px tall.
- Never recolour the bull; it is the brand colour source.

### Header
- Height **84px** desktop, 64px mobile. Side padding = gutter.
- Layout: logo left, uppercase Montserrat nav centre-right, cart icon in a **thin 1px circular outline (36px)**, then a hamburger.
- Transparent over the hero with light text; on scroll it becomes off-white paper with dark text (0.6s transition).
- Nav link padding `0 15px`, 14px Montserrat 500, 0.1em tracking, uppercase. Hover: colour turns gold.

### Buttons
| Type | Style |
|---|---|
| Primary | bg `--clr-primary`, text `#F7F7F7`, EB Garamond 16px/500, 0.08em tracking, padding `16px 32px`, radius 0. Hover: `--clr-primary-dark`. |
| Secondary | bg `--clr-green`, same metrics (trade/wholesale CTA). |
| Ghost | 1px `--clr-text` border, transparent, text `--clr-text`. Hover: fills `--clr-text`, text turns cream. |
| Text link ("View more →") | Montserrat 13px uppercase 0.1em, gold, with a 40px gold line before or under it that extends to 64px on hover. |

Minimum width 240px for primary and secondary buttons (Spica's are about 297px). Arrows: thin 1px line arrow, never a chunky chevron.

### Floating side tabs
Spica pins vertical tabs to the right edge of the viewport (oxblood, vertical text: "Book / Contact", "Gift"). Morucha uses **two** of them: **"Trade enquiries"** (maroon) and **"Request swatches"** (gold-dark). Width 44px, vertical text in Montserrat 12px uppercase. Hide below 768px.

### Floating info card
Spica shows a small "Access" card bottom-right (image + Garamond title). Morucha may use this for **"Visit the tannery"** or **"Free UK delivery"**. 280×110px, image background with an overlay. It must be dismissible.

### Shop rows (minimal, full-bleed)
Our Leathers and Shop by category share one pattern: a small italic Garamond title (24–30px, one maroon italic accent) on the left, quiet controls on the right, then a **full-bleed row** that starts on the gutter and runs off the right edge. There's no big three-tier heading here; these rows should feel like a boutique shelf, not a feature section.

**Our Leathers (Nour Hammour "New")**, `sections/OurLeathers`
- Header: "New *leathers*" left; small arrow buttons + underlined "View all" (Montserrat 12px) right.
- Cards: `clamp(220px, min(23.5vw, 40vh), 380px)` wide, **2:3**, 4px gaps, image on a `#EFEAE4` tile; the second photo crossfades in on hover; optional small tag chip top-left.
- Text under each card, no centring: name (Montserrat 12px/500), one-line description (Garamond 16px), price (Montserrat 12px, `--clr-text-2`).
- Background `.bg-paper-light`; padding `clamp(48px, 5vw, 80px)`.

**Shop by category (Chesterfield)**, `sections/Bestsellers` (id `#bestsellers` kept)
- Header: "Shop by *category*" left; round 40px outline arrows right (maroon on hover).
- Cards: `clamp(200px, min(19.6vw, 42vh), 340px)` wide, **7:10**, 6px gaps, lifestyle photos with a bottom maroon-black gradient; category name in white italic Garamond (19–24px) bottom-left; a 40px underline grows under it on hover.
- Nine categories, then a centred underlined "Shop all leather goods" link.

### Discover cards (Chesterfield trio), `sections/DiscoverCards`
- Three equal tall cards almost edge to edge (12–16px side padding, 10–16px gaps), height `min(86vh, 860px)`.
- Bottom-left copy: a two-line italic Garamond headline (24–30px, white), then an underlined Montserrat 13px link that turns gold-light on hover.
- Content: "Crafted by nature. / Refined by hand." → Discover our leather · "Tanned with patience. / Built to last." → Meet our story · "New season / collection." → Find your favourite. No unverified claims (e.g. "family-owned") until Morucha confirms them.
- Tablet: 2 + 1 layout. Mobile: stacked, 480px tall.

### Product slider (retired in revision 1.4, kept here for reference)
One shared component drives both **Bestsellers** and **Our Leathers**:

| Option | Bestsellers | Our Leathers |
|---|---|---|
| `layout` | `center`: centred title, tabs, arrows over the images | `split`: title left, arrows top-right, left-aligned card text |
| `columns` | 5 (4 on laptop) | 4 (3 on laptop) |
| Tabs | All · Wallets · Purses · Cardholders · Gifts | none |
| Quick action | "Add to basket" | "Order a swatch" |
| Price | £XX | "From £XX / sq ft" (swatch box: Free) |
| Background | `.bg-paper` | `.bg-sand` |

Active tabs, arrows on hover, the progress thumb and tags all use maroon (`--clr-primary`).

### Bestseller slider (detail)
- Centred heading ("Our *Bestsellers*"), then a row of **category tabs** (All · Wallets · Purses · Cardholders · Gifts): Montserrat 12px uppercase, 0.2em tracking, with a gold underline that grows from the centre on the active tab.
- **Slider:** 4 cards visible on desktop, 3 on laptop, 1.4 on mobile (swipe). Circular 56px arrows sit over the left and right edges of the images; an arrow hides when you reach that end.
- **Progress line** under the slider: 320px wide, 1px track with a 2px dark thumb.
- Then a centred ghost button, "Shop all leather goods".

### Product card
- 4:5 image on a soft sand tile (`#ECE5DB`), no border, no shadow.
- **Hover swap:** a second photo crossfades in (0.8s) while the image zooms to 1.04.
- Top-left: one tag ("Bestseller", "New", "Limited") in gold-dark Montserrat 10px uppercase on a light-paper chip. Top-right: a round blurred wishlist button.
- Quick-add: "Add to basket" bar slides up from the bottom of the image on hover (always visible on mobile).
- Text is centred below: material and colour (Montserrat 10px uppercase, gold-dark), name (Garamond 21px/400), price (Garamond 18px, `--clr-text-2`).

### Product spotlight (DailyObjects-style), `sections/ProductSpotlight`
- Two columns (1.15fr / 1fr). **Left:** vertical strip of 76px thumbnails (4:5) + main image at `min(78vh, 680px)`, with crossfade, round prev/next buttons and a "01 / 06" counter. The active thumbnail gets a maroon outline.
- **Right:** gold label "Featured Piece" → name in Garamond 30–44px with the colour in maroon italic → price (Garamond 28px) + struck-through compare-at price + "Inclusive of VAT".
- Colour swatches: 30px circles, the selected one outlined in `--clr-text`; the selected name shows in the label.
- Buy row: quantity stepper (− 1 +), full-width maroon "Add to basket" (54px tall), square wishlist button. Below it, a dispatch note.
- 2×2 feature list with line icons in maroon (compact design, detailed storage, premium leather, zip closure).
- Accordions (Product details · Specifications · Delivery & returns), **closed by default** so the section fits one viewport. Then the product code.
- Mobile: gallery stacks, thumbnails scroll horizontally under the main image.

### Forms (newsletter, trade)
- Fields: white bg, 1px `--clr-line-warm` border, radius 0, height 52px, padding `0 20px`, Montserrat 15px.
- Focus: border becomes `--clr-text`, no glow.
- Labels: Montserrat 12px uppercase gold, above the field.

### Dividers and ornaments
- 1px hairlines in `--clr-line-warm` (or gold at 40% opacity).
- Small gold dot (6px) or short 40px gold rule above labels.
- An optional circular "stamp" mark (logo in a ring, like Spica's "Motoazabu Spica" seal) placed off-grid near text blocks.

### Process accordion (Oliver Co-style), `sections/Process`
- A large full-width photo band (`clamp(340px, 58vh, 620px)`, craft photo, maroon gradient), then a `.bg-dark` panel.
- **Video play button** centred on the band: 104px glass circle (80px on mobile) with a light 1px ring, two pulsing rings, and an italic "Watch the film" with "Inside the tannery · duration" in small caps. On hover it fills off-white with a maroon icon.
- Clicking opens a **lightbox** (maroon-black 88% backdrop, 16:9 frame up to 1100px, round close button; Escape or a backdrop click closes it). `process.film.src` takes an `.mp4` or a YouTube/Vimeo embed URL; while it is empty the lightbox shows the poster with "Film coming soon".
- **Exception to the viewport-fit rule:** because the band was enlarged on request, this section is about 1,050–1,100px tall on desktop.
- Panel, left: gold label, statement headline in Garamond 30–50px (max 17ch, one italic gold-light accent), ghost-light button.
- Panel, right: numbered accordion (italic gold numerals 01–05, Garamond step titles, thin plus that turns into a minus). An open step shows its text plus a 140px 4:3 thumbnail. The first step is open by default; 1px rules at 22% light.

### Community grid (Hidesign "Get to know us better"), `sections/MadeWithMorucha`
- Header row: heading + Instagram invite on the left, outlined "Follow @handle" button on the right.
- Six square posts in one row (3 on tablet, 2 on mobile), 8px gaps. On hover, a maroon overlay at 72% shows the Instagram icon and an italic caption.

### Footer (Hidesign-style, light)
- `.bg-sand` with a hairline top border; text in `--clr-text`.
- Top row: dark logo (52px) + tagline separated by a vertical hairline.
- Four columns: **My Account**, **Still Curious?**, **Quick Links** (13px links in `--clr-text-2`, maroon on hover), and a wider **Newsletter** column (intro, email field, required consent checkbox, maroon "Subscribe" button, "Follow us" with four round outline social icons).
- Bottom bar: copyright · payment methods · legal links.

### Footer (previous dark version, retired)
- Background `--clr-dark-2` (`#2B2020`), text `--clr-text-light`, links at 80% opacity → 100% on hover.
- Padding 90px top and bottom.
- Top row: two large CTA buttons side by side (maroon "Contact us", green "Trade account").
- Then a 4-column link grid, logo, address, socials, payment icons, copyright in 12px.

---

## 8. Motion

| Property | Value |
|---|---|
| Default transition | `all 0.6s ease-out` (Spica `--transit-default`) |
| Scroll reveal | opacity 0 → 1, translateY(24px) → 0, 0.6s ease-out |
| Stagger | children delayed by 0.1s steps (`.delay-1` … `.delay-6`) |
| Hero | slow crossfade slider, 6s per slide, 1.2s fade; hero text blurs in (filter blur 8px → 0) |
| Image hover | scale 1.04, 0.6s |
| Link hover | colour to gold, 0.3s |

- Respect `prefers-reduced-motion`: disable translate and blur, keep opacity only.
- No parallax on mobile.

---

## 9. Responsive rules

| Breakpoint | Name |
|---|---|
| `≥ 1200px` | Desktop |
| `1024–1199px` | Laptop |
| `768–1023px` | Tablet |
| `< 768px` | Mobile |

- Split bleed layouts stack below 1024px: image first (full width), then text.
- Display words scale down with clamp; never smaller than 40px on mobile for `--fs-display-xl`.
- Nav collapses to a hamburger below 1024px; the menu opens as a full-screen cream overlay with large Garamond links (32px).
- Body text stays at 15px on mobile, line height 1.9.
- Side gutter on mobile is 20px. Never allow horizontal scroll.

---

## 10. Applying the rules to Morucha's home page sections

| # | Section | Layout pattern | Background |
|---|---|---|---|
| 1 | Announcement bar | 40px tall, centred Montserrat 11px uppercase; only the first half shows on mobile | `.bg-dark` texture |
| 2 | Header / nav | Transparent over hero → cream paper on scroll | paper on scroll |
| 3 | Hero | Full-bleed photo crossfade (7s, slow 1.12 → 1 zoom), left-weighted maroon-black gradient, light grain overlay, vertical "Est. — United Kingdom" side text, "01 ── 03" counter with filling progress bars | Photo |
| 4 | Statement banner | **Editorial triptych**: a 3:4 photo aligned high, a large Garamond sentence with an italic accent and a rotating seal, and a 4:5 photo aligned low | `.bg-paper` |
| 5 | Our leathers | **Nour Hammour "New" row** (§7 Shop rows) | `.bg-paper-light` |
| 6 | Bestsellers → Shop by category | **Chesterfield category row** (§7 Shop rows) | `.bg-paper` |
| 6a | Discover cards (new) | **Chesterfield trio** of tall story cards (§7) | `.bg-paper` |
| 6b | Product spotlight | **DailyObjects-style product detail** (§7) | `.bg-paper-light` |
| 7 | Our story | **Split bleed** + **layered inset** + "Est." stamp on the photo | `.bg-paper` |
| 8 | The process | **Oliver Co-style**: photo band + dark panel (statement left, step accordion right) | `.bg-dark` |
| 9 | Leather goods collections | 4 **staggered** tall cards (56vh), bottom-aligned title, piece count at the top, inset frame on hover | `.bg-sand` |
| 10 | Sustainability | **Split bleed reversed** + **layered inset** (top-left); 3 italic-numeral points | `.bg-paper` |
| 11 | Made with Morucha | **Hidesign community grid**: heading + Instagram invite, six square posts with maroon hover overlay | `.bg-paper-light` |
| 12 | Trade and wholesale | Two columns: **offset-frame** photo with green "Free swatch box" badge, and a heading, benefit list and buttons | `.bg-sand` |
| 13 | ~~Newsletter~~ | Removed: the sign-up now lives in the footer's Newsletter column | n/a |
| 14 | Footer | **Hidesign-style light footer** (§7) | `.bg-sand` |

---

## 11. CSS token starter

```css
:root {
  /* colour */
  --clr-brand: #c2010b; /* Morucha bull */
  --clr-text: #2a1718;
  --clr-text-2: #6f6264;
  --clr-text-light: #f8f5f2;
  --clr-bg: #f7f4f0;
  --clr-bg-light: #fbfaf7;
  --clr-bg-2: #efe8e1;
  --clr-white: #ffffff;
  --clr-dark: #5c0a10;
  --clr-dark-2: #33070a;
  --clr-gold: #a88b58;
  --clr-gold-dark: #826d48;
  --clr-gold-light: #c9ad7a;
  --clr-primary: #a8020c;
  --clr-primary-dark: #7c0109;
  --clr-primary-light: #c2010b;
  --clr-green: #4e6c30;
  --clr-green-dark: #425f25;
  --clr-line: #e6e0da;
  --clr-line-warm: #d9cbc4;

  /* type */
  --font-display: "EB Garamond", "Times New Roman", serif;
  --font-label: "Montserrat", system-ui, sans-serif;
  --font-body: "Montserrat", system-ui, sans-serif;
  --fs-display-xl: clamp(46px, 6vw, 96px);
  --fs-display: clamp(36px, 4.4vw, 68px);
  --fs-h2: clamp(22px, 2vw, 30px);
  --fs-h3: clamp(19px, 1.6vw, 24px);
  --fs-label: 12px;
  --fs-body: clamp(14px, 0.25vw + 12px, 15px);
  --fs-body-sm: 13px;
  --fs-caption: 12px;
  --lh-body: 1.95;
  --lh-heading: 1.4;
  --ls-body: 0.06em;
  --ls-label: 0.16em;

  /* layout */
  --section-pad: clamp(64px, 6vw, 96px);
  --heading-gap: clamp(32px, 3.4vw, 52px);
  --gutter: clamp(20px, 4.5vw, 88px);
  --container-lg: 1440px;
  --container-md: 1120px;
  --container-sm: 760px;
  --text-col: 560px;
  --radius: 0;

  /* subtle paper grain: see src/app/globals.css for the SVG data URIs */
  --paper: var(--tex-grain);
  --paper-size: 160px 160px;
  --paper-dark: var(--tex-grain-light);
  --paper-dark-size: 160px 160px;

  /* motion */
  --transit: all 0.6s ease-out;
}
```

---

## 12. Don'ts

- No rounded corners, pill buttons or drop shadows.
- No bold (700) headings.
- No pure black (`#000`) text or pure white page background.
- No more than one maroon button per viewport.
- No icon-heavy "trust badge" strips.
- No stock-looking cut-outs in editorial sections.
- No tight line heights on body copy (below 1.8).
- No flat, untextured section backgrounds, and no visibly patterned ones either: the grain stays subtle.
- No brown. Dark tones are maroon, derived from the logo.
- No section taller than one viewport.
- No even, uniform image grids where a stagger or layered inset fits.
- Don't copy Spica's content or logo. **Spica's and DailyObjects' photos are temporary preview images only** (listed in `src/content/images.ts`). They aren't licensed to Morucha and must be replaced with Morucha's own photography before launch.
