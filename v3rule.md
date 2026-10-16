# Morucha — Design Rules v3

Primary aesthetic reference: **dailyobjects.com** (DailyObjects, design-led accessories, India).
Values below were measured from the live site on 15 Oct 2026: the home page, a product page (Walnut Ellipse Leather Watch Band) and a listing page (power banks), at a **1440×900** viewport, with spot checks at **375×812**. They are adapted for Morucha, a UK leather brand.

v3 keeps **the same sections as v1** (see §10) but swaps the whole visual system. v1 was quiet editorial luxury (serif, gold, paper grain). v2 was Nordic craft (one geometric sans, colour bands, 10px gutters). v3 is **clean, confident modern retail**: pure white page, black condensed uppercase headings, product photography on pale grey wells, full-bleed campaign banners, and one green action colour.

Every page and component must follow these rules. If something isn't covered here, choose the **cleaner, more product-first, more shoppable** option.

Values marked *(Morucha)* are additions or adaptations; everything else is measured.

---

## 1. Design principles

1. **White page, black type, product in colour.** The page is pure `#FFFFFF`, text is `#000000`, and almost all colour comes from the photography. UI chrome stays monochrome.
2. **Loud headings, quiet body.** Every heading is **Roboto Condensed Bold in UPPERCASE**, short and punchy ("NEW IN STYLE", "PUFT COLLECTION"). Everything else is a plain grotesk (Graphik) at 13–18px, sentence case, regular weight.
3. **Product on grey.** Product shots sit on soft `#F7F7F7` wells, lit like a studio catalogue. Campaign images are bright, high-key and full-bleed.
4. **A strict 80px rhythm.** Sections stack on white with exactly **80px** between them. There are no section backgrounds, bands or textures; the content blocks themselves (banners, card rows) create the rhythm.
5. **Shoppable everywhere.** Every block ends in an action: "View All", "Shop now!", a button or a product card. Headings sit left with "View All" right.
6. **Flat and nearly square.** No shadows and no gradients on UI. Corners are small: 4px buttons, 6px option chips, 10px only on collection cards. Product images and banners are square-cornered.
7. **One action colour.** Green `#20A87E` marks commerce actions (Add to basket, Subscribe) and nothing decorative. Coral `#E66B55` is only for promotions.

---

## 2. Colour

Measured from DailyObjects' computed styles and CSS variables. Use the token names in code; never hard-code hex values in components.

### Core palette

| Token | Hex | DailyObjects source | Use |
|---|---|---|---|
| `--clr-bg` | `#FFFFFF` | body bg | Page background, header, cards, featured-in block |
| `--clr-surface` | `#F7F7F7` | product image wells, PDP gallery, footer | Image wells, product gallery, footer, selected option chip, delivery field |
| `--clr-text` | `#000000` | body colour | Headings, body, prices, buttons, icons |
| `--clr-text-nav` | `rgba(0,0,0,.87)` | nav links | Header nav only |
| `--clr-ink` | `#1A1B1F` | Material `on-surface` | Tab labels, accordion titles, input text |
| `--clr-text-2` | `#909090` | product subtitle, struck MRP | Secondary meta ("Available in 4 colours"), struck prices, notes, placeholders |
| `--clr-text-3` | `#666666` | form hover/label colour | Secondary text that must pass AA (5.7:1) *(Morucha: use instead of `#909090` when the text is essential)* |
| `--clr-icon` | `#44474E` | wishlist heart | Outline icons on cards |
| `--clr-inverse` | `#000000` | footer bottom bar, dark buttons | Bottom bar, black buttons, active tab pill |

### Action and promo

| Token | Hex | DailyObjects source | Use |
|---|---|---|---|
| `--clr-action` | `#20A87E` | Add to Cart, Subscribe, See More Features, stars, back-to-top ring | Commerce actions only |
| `--clr-action-hover` | `#178A66` | *(Morucha, derived)* | Hover/pressed for green buttons |
| `--clr-promo` | `#E66B55` | listing "FREE DUFFLE BAG" tag; same hue as the promo strip | Promo strip background, promo tags on cards |
| `--clr-promo-ink` | `#FFE4D6` | promo strip lettering (sampled from artwork, approx.) | Text and pill on the promo strip |
| `--clr-error` | `#B3261E` | form error variables | Field errors |
| `--clr-brand` | `#C2010B` | *(Morucha logo)* | **Logo only.** Never used for UI |

### Lines, dots and overlays

| Token | Value | Use |
|---|---|---|
| `--clr-line` | `#E0E0E0` | Option chips, dividers, list rules |
| `--clr-line-soft` | `rgba(191,191,191,.2)` | Accordion row dividers |
| `--clr-line-header` | `rgba(0,0,0,.16)` | 1px hairline under the header |
| `--clr-field-border` | `#BFBFBF` | Outlined inputs (focus: `#000`) |
| `--clr-dot` | `#BFBFBF` | Carousel bullets |
| `--clr-skeleton` | `#CACACB` | Image placeholder before load |
| `--clr-arrow-hero` | `rgba(0,0,0,.35)` | Round hero arrows (at 80% opacity) |
| `--clr-arrow-slider` | `rgba(0,0,0,.30)` | Square slider arrows (at 80% opacity) |

### Rules
- The page is **pure white**. `#F7F7F7` is the only other surface, used for image wells, the product gallery and the footer.
- Text is **black**, not dark grey. Secondary text is `#909090`.
- **Green is for buying.** Add to basket, Subscribe, the back-to-top ring, rating stars and the active gallery dot. Never for headings, links or backgrounds.
- **Coral is for promotions.** The promo strip and small "FREE …" / "NEW" tags on cards. Nothing else.
- The **Morucha red** stays inside the logo. It doesn't appear on buttons, links or tags. *(If Morucha later wants red buttons, change only `--clr-action` to `#A8020C`; nothing else moves.)*
- No gradients on UI, no paper texture, no colour-block bands.
- **Contrast:** `#909090` on white is 3.2:1, and white on `#20A87E` is 3.0:1. Both fail WCAG AA for 16px text, but DailyObjects uses them anyway. For Morucha, keep `#909090` for non-essential meta only (use `--clr-text-3` for anything the shopper needs), and keep the green as measured for the look. If an accessibility audit requires AA, darken `--clr-action` to `#148060` (4.9:1).

---

## 3. Typography

DailyObjects uses **two families**, and serves them under misleading names: what its CSS calls `"Roboto Regular"` is actually **Graphik Regular**, `"Roboto Medium"` is **Graphik Medium**, and `"Roboto Condensed"` is **Roboto Condensed Bold** (only the Bold file is loaded, so every condensed heading renders bold whatever weight the CSS asks for).

### Font families

| Token | Family | Role |
|---|---|---|
| `--font-head` | **Roboto Condensed 700** (Google Fonts, exact match) | All headings, nav, buttons, prices, option labels, footer headings. Always UPPERCASE |
| `--font-body` | **Graphik** Regular 400 / Medium 500 (Commercial Type, licensed). Free stand-in: **Inter** 400 / 500 | Body, product names, card labels, tab pills, links, forms |

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

Inter is the closest free neutral grotesk to Graphik. If budget allows, license Graphik Regular and Medium for the exact look.

### Type scale (desktop 1440 → mobile 375)

| Token | Use | Font | Desktop | Mobile | Weight | Line height | Case |
|---|---|---|---|---|---|---|---|
| `--fs-display` | Hero and full-bleed banner titles | Condensed | **38px** | 31px | 700 | 1.2 | UPPER |
| `--fs-h1` | Section headings ("SHOP BY CATEGORY"), collection card titles | Condensed | **28px** | 28px | 700 | 1.2 | UPPER |
| `--fs-h2` | Centred block headings ("EVERYDAY INSPIRATION", "FEATURED IN") | Condensed | 26px | 24px *(Morucha)* | 700 | 1.2 | UPPER |
| `--fs-price-lg` | Product page price and struck price | Condensed | 24px | 22px | 700 | 1.2 | — |
| `--fs-title-lg` | Product page product name | Body | 24px | 20px | 400 | 1.25 (30px) | Sentence |
| `--fs-label` | Option labels (SIZE, COLOUR), "EXCITING OFFERS" | Condensed | 18px | 16px | 700 | 1.2 | UPPER |
| `--fs-ui` | Large buttons, footer headings, footer accordion titles | Condensed | 16px | 16px | 700 | 1.2 | UPPER |
| `--fs-nav` | Header nav | Condensed | 15px | — | 700 | 1 | UPPER |
| `--fs-btn-sm` | Small buttons (hero, "See more") | Condensed | 13px | 13px | 700 | 1.2 | UPPER |
| `--fs-body-lg` | Category card labels | Body | 18px | 15px | 400 | 1.5 (27px) | Sentence |
| `--fs-body` | Product names and subtitles, banner subtitles, "View All", inputs | Body | **16px** | 13px (cards) / 16px | 400 | 1.2 (1.3 for two-line names) | Sentence |
| `--fs-body-md` | Tab pills, product page accordion titles | Body | 16px | 14px | **500** | 1.2 | Sentence |
| `--fs-sm` | Option chips, offer lines, Instagram line | Body | 14px | 13px | 400 | 1.3 | Sentence |
| `--fs-xs` | Collection card subtext, footer links, swatch names, price notes, copyright | Body | 13px | 12px | 400 | 1.3 | Sentence |
| `--fs-xxs` | Legal links | Body | 12px | 12px | 400 | 1.3 | Sentence |

### Rules
- **Headings are always Roboto Condensed Bold UPPERCASE**, with **no letter-spacing** (DailyObjects tracks headings at `normal`; buttons at a barely-there `0.006em`). Never set Graphik/Inter in uppercase for headings, and never set the condensed face in lowercase.
- **Body is never bold.** Graphik/Inter runs at 400; 500 is only for tab pills and accordion titles.
- **Tight leading.** Headings and short UI text sit at 1.2. Even 2–3 line banner paragraphs use 1.2. Only long-form text (accordion content, policies) loosens to 1.5. *(Morucha)*
- Headings are short: two to four words. Each is followed, at most, by **one sentence-case line** ("Layer. Lift. Lock.", "Comfort carry inspired by nostalgia").
- Product names are single-line with an ellipsis in sliders, and two lines max in grids.
- Prices are **condensed**: black price, then the struck price in `#909090`, 10px apart. Currency is `£`.
- Root size `16px`. No fluid `clamp()` scaling on desktop: DailyObjects uses fixed px sizes and swaps them at the mobile breakpoint.

---

## 4. Section heading pattern

DailyObjects uses three heading forms. Use them exactly; there are no eyebrow labels, display words or italic accents.

**A. Row heading (default for content sections).** Heading left, "View All" right, bottom-aligned on one row across the gutter width.

```
SHOP BY CATEGORY                                                    View All
[ content starts 16–24px below ]
```

- Heading: `--fs-h1` (28px condensed uppercase).
- "View All": body 16px black, underlined, right-aligned. It is a text link, never a button.
- Heading → content: **16px** (card rows, tabs) or **24px** (product sliders).

**B. Row heading + tab pills.** As A, then a row of tab pills 16px below, then the content 16px below the pills (see §7 Tab pills).

```
SHOP BY CATEGORY                                                    View All
[ Tech ] ( Bags ) ( Work Essentials )
[ cards ]
```

**C. Centred heading (community and press blocks).** A centred `--fs-h2` (26px) heading, a centred 14px body line 8px below it, then the content 32px below.

```
                        EVERYDAY INSPIRATION
             Follow @morucha to join the #MoruchaMakers community
```

**On images** (hero, full-bleed banners, collection cards) the title is part of the image overlay, bottom-left (see §7).

---

## 5. Spacing and layout

### Spacing scale
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 60 · 80 · 100`

### Section rhythm

| Token | Desktop | Mobile | Measured |
|---|---|---|---|
| `--section-gap` | **80px** | 48px | Every home section is separated by 80px (±1px) of white |
| `--heading-gap` | 16px | 16px | Heading → tabs → cards |
| `--heading-gap-slider` | 24px | 16px | Heading → product slider images |

Sections themselves have **no vertical padding and no background**. The 80px gap does all the separating.

### Gutters (side padding)

| Token | Desktop | Mobile | Used by |
|---|---|---|---|
| `--gutter` | **48px** | **16px** | Category tabs, collection cards, Instagram row |
| `--gutter-slider` | 34px | 16px | Product sliders, header logo and icons |
| `--gutter-footer` | 5% (≈71px at 1440) | 16px | Footer, bottom bar |
| `--inset-banner` | **80px** left, **60px** bottom | 28px left, 32px bottom | Text and dots on hero and full-bleed banners |

Hero, full-bleed banners and the promo strip run **edge to edge** (no gutter).

### Containers
DailyObjects has **no max-width container**: content spans the viewport minus the gutter. *(Morucha: above 1680px, cap card rows and the footer at 1680px centred so cards don't balloon. Banners stay full-bleed.)*

### Grids and gaps (at 1440)

| Pattern | Columns visible | Card size | Gap |
|---|---|---|---|
| Category tab cards | 4 | 320×397 (4:5) | 16px |
| Product slider | 3 (4th starts off-screen) | 442×442 (1:1) | 16px |
| Collection cards | 3 | 426×639 (2:3) | 24px |
| Instagram row | ~3.9, marquee | 353×353 (1:1) | 15px |
| Listing grid (shop pages) | 4 | 325×385 (5:6) | 18px columns, 36px rows |

Image → caption: **8px** (category cards), **14px** (product cards). Name → subtitle: **4px**.

### Measured section heights (1440×900)

| Block | Height |
|---|---|
| Header | 80px |
| Promo strip | 89px + 10px white below |
| Hero carousel | **643px** (≈ 45vw) |
| Category tabs section | 529px |
| Product slider section | 566px |
| Collection cards section | 689px |
| Full-bleed banner | **643px** |
| Instagram section | 485px |
| Footer (all parts) | 1162px |

Sections don't need to fit one viewport (v1 rule dropped); they follow these natural heights.

---

## 6. Imagery

- **Radius 0** on product images, category images, hero and full-bleed banners. **10px** on collection cards only.
- Aspect ratios: hero and banners **≈ 2.2:1** (643px tall at 1440; portrait art on mobile, 570px tall); category cards **4:5**; product slider **1:1**; listing grid **5:6**; collection cards **2:3**; Instagram **1:1**; product page gallery fills **50% width × (100vh − header)**.
- **Product shots:** the product centred on a `#F7F7F7` well, studio-lit, soft natural shadow, no props. Use `object-fit: contain` with ~8% breathing room, or photograph on matching grey and use `cover`.
- **Campaign/banner shots:** bright, high-key, daylight. Clean grey or warm-neutral seamless backdrops, top-down flat lays of several colourways arranged in a grid, or people in daylight against pale walls. Leave **clear space bottom-left** for the title; there is no overlay.
- For Morucha: wallets, purses and cardholders laid out in colourways on pale grey; hides and swatches fanned on a light table; hands holding goods in daylight. **No dark, moody, low-key shots** (that was v1).
- **No overlays on banners.** Text colour flips per image instead: black text on light photos, white on dark (`tone: "light" | "dark"` on each slide).
- Collection cards: DailyObjects bakes a soft bottom shade into its photos. *(Morucha: add `linear-gradient(to top, rgba(0,0,0,.45), transparent 45%)` because our photos won't have it.)*
- Hover: no image zoom on DailyObjects. *(Morucha may add `scale(1.03)` over 0.4s on collection cards only.)*

---

## 7. Components

### Logo
- `public/brand/morucha-logo.png` (red bull above the black MORUCHA wordmark). DailyObjects' logo is a 135×27 horizontal lockup; Morucha's stacked logo needs more height: **44px tall** in the 80px header, 32px on mobile.
- Footer: same dark logo, 40px tall.

### Header
- **80px** tall, white, **1px `rgba(0,0,0,.16)` bottom hairline**, no shadow. **Not sticky**: it scrolls away with the page.
- Logo at the left gutter (34px). Nav starts ~340px from the left, so it sits left-of-centre.
- Nav: Roboto Condensed 700, **15px**, UPPERCASE, `rgba(0,0,0,.87)`, **25px** between items, no underline. One item may carry a small decorative accent (DailyObjects marks "GIFTING"); Morucha marks **"TRADE"** with a 2px green bar above it *(Morucha)*.
- Right: three **16px line icons** (search, account, basket), **34px** apart, 46px from the right edge.
- Mega-menu on hover: a white panel under the hairline with condensed uppercase column headings and 16px body links *(Morucha; structure not measured)*.
- Mobile (< 600px): **52px** tall. Hamburger and search left, logo centred, account and basket right (24px icons).

### Promo strip (announcement bar)
- Sits **under the header**, full-bleed, **89px** tall, `--clr-promo` background, then **10px of white** before the hero.
- One huge line in Roboto Condensed 700 UPPERCASE, **≈56px**, `--clr-promo-ink`, starting ~120px from the left: "FREE UK DELIVERY OVER £75".
- Right: a cream pill (≈240×28, radius 999px, `--clr-promo-ink` fill) with 15px condensed coral text: "LIMITED TIME OFFER" / "TRADE ACCOUNTS OPEN".
- Mobile: two lines at ~28px, pill under the text, ~82px tall.
- DailyObjects ships this as an image; Morucha builds it in HTML so it stays crisp and editable.

### Hero carousel
- Full-bleed, **643px** (≈ 45vw) desktop, **570px** portrait on mobile. Autoplay, one slide at a time, horizontal slide transition.
- Text block **bottom-left**, 80px from the left, 60px from the bottom, max ~430px wide:
  - Title `--fs-display` (38px), 2px gap
  - Subtitle 16px body, 24px gap
  - **Small button** (see Buttons): black on light slides, white on dark slides.
- Text colour follows the slide's `tone`: black on light images, white on dark.
- **Arrows:** 38px circles, `rgba(0,0,0,.35)` at 80% opacity, white 25px chevron, 22px from each edge, vertically centred.
- **Bullets:** bottom-right, 80px from the right, aligned with the button. 6px `#BFBFBF` dots, 8px apart; the active bullet is a **60×6 pill** (radius 10px) with a white fill that grows across the slide's duration as a timer.

### Buttons

| Type | Style |
|---|---|
| Small (hero, centred blocks) | Roboto Condensed 700, **13px** UPPERCASE, padding `11px 24px` (37px tall), **radius 4px**. Black bg + white text, or white bg + black text on dark images. |
| Large (banners, product page, footer) | Roboto Condensed 700, **16px** UPPERCASE, padding `16px 32px` (**51px** tall), radius 4px. Black or white per image tone. |
| Action (Add to basket, Subscribe) | Large metrics, `--clr-action` bg, white text. Full width on the product page. Hover `--clr-action-hover`. |
| Outline (secondary, disabled check) | 1px border, transparent, radius 4px. Disabled: border and text `rgba(0,0,0,.26)`. |
| "View All" link | Body 16px, black, underlined, no arrow. |
| "Shop now!" (on cards) | Body 16px, white, paired with a 41px outline circle arrow at the card's bottom-right. |

- Buttons never have shadows, never use sentence case and never go wider than their label + padding (except the full-width Add to basket).
- At most **one green button per viewport**.

### Tab pills
- Body **Medium 16px**, padding `6px 12px` (31px tall), **radius 4px**, **1px black border**, 12px apart.
- Active: black fill, white text. Inactive: white fill, `--clr-ink` text.
- 16px below the heading row and 16px above the cards. Switching a tab swaps the card row in place.

### Slider arrows (product rows)
- **38px square** (radius 0), `rgba(0,0,0,.30)` at 80% opacity, white 25px chevron.
- Sits over the right edge of the last visible card, centred on the image height. "Prev" appears only after the row has moved.

### Category card (Shop by category)
- 4:5 image (320×397 at 1440), radius 0, no border, product on a light grey seamless backdrop.
- Label 8px below: body **18px**/27px, black, sentence case ("Phone Cases").
- *(Morucha)* An optional second line in `#909090` 16px for "From £XX / sq ft".

### Product card
**In sliders (home):**
- 1:1 image on a `#F7F7F7` well, radius 0.
- Name 14px below: body 16px black, one line, ellipsis.
- Subtitle 4px below: body 16px `#909090` ("Available in 4 colours").

**In grids (listing pages, and Morucha's Bestsellers):**
- 5:6 image on `#F7F7F7`; **24px outline heart** (`--clr-icon`) top-right, 12px inset.
- **Colour dots** 8px under the image: 14px circles, 8px apart; the selected one gets a 1px black ring with a 2px white gap.
- Name: body 16px/1.3, black, two lines max.
- Price row 4px below: **condensed 16px** black price + **struck price** condensed 16px `#909090`, 10px apart.
- Optional promo tag: condensed **13px UPPERCASE** in `--clr-promo` ("FREE GIFT BOX").
- No hover card lift, no quick-add bar, no star ratings on cards.

### Collection card (Trending collection)
- **2:3** (426×639 at 1440), **radius 10px**, overflow hidden, 24px apart, three in a row.
- Text bottom-left, 24px from the left, ~32px from the bottom, all white:
  - Title `--fs-h1` (28px condensed), 4px gap
  - Subtext body 13px, 20px gap
  - "Shop now!" body 16px
- A **41px white outline circle with an arrow** sits bottom-right, 24px in.

### Full-bleed banner (one-column banner)
- 100vw × **643px**, image `cover`, no overlay, radius 0.
- Text block bottom-left, 80px / 60px inset, max ~430px wide: title `--fs-display` (38px) → 2px → subtitle 16px (up to three lines, line height 1.2) → 24px → **large button**.
- Two tones, chosen per image:
  - **Light image:** black title and text, **black button** with white text ("ENQUIRE NOW").
  - **Dark image:** white title and text, **white button** with black text ("SHOP NOW").

### Instagram marquee (Everyday inspiration)
- Centred heading (form C). 1:1 tiles, **353px**, 15px apart, radius 0, inside the 48px gutters.
- The row scrolls continuously to the left as a marquee and pauses on hover. Each tile links to the post.
- No captions, no overlay, no Instagram icon on the tile.

### Product spotlight (product page buy box)
Two halves, **50 / 50**, full-bleed:

**Left: gallery**
- `#F7F7F7`, height `100vh − 80px` (≈ 820px), image `contain`.
- Plain grey chevrons (no background) at both sides, vertically centred.
- Dot pagination at bottom centre: small grey dots, the active one in `--clr-action`.
- Top-right: video, share and wishlist line icons (24px, `--clr-icon`), 20px apart.

**Right: buy box** (padding `56px 100px`, ~513px content width)
1. Name: body **24px/30px**, 400, black, 13px gap.
2. Price row: price **condensed 24px** black, struck price condensed 24px `#909090`, then "Inclusive of VAT" body 13px `#909090`.
3. Rating: five 16px stars in `--clr-action`, "5.0/5" 13px, "(5 reviews)" 11px `#909090`.
4. Option label: condensed **18px UPPERCASE**, 12px below it the options:
   - **Size chips:** body 14px, padding `10px 16px` (40px tall), **radius 6px**, 1px `#E0E0E0` border, 12px apart. Selected: 1px black border + `#F7F7F7` fill.
   - **Colour swatches:** **42px circles**, 26px apart, colour name in 13px body 8px below. Selected: 1px black ring with a 3px white gap.
5. **Add to basket:** full-width action button, 51px tall.
6. **Delivery check:** a `#F7F7F7` field (60px tall, "Enter postcode to check delivery") + an outline "CHECK" button (109px, disabled until a postcode is typed).
7. "EXCITING OFFERS" label + offer lines: 16px line icon, body 14px text, 1px `#E0E0E0` rule between lines, "Learn more" 12px underlined at the right.
8. **Accordions:** "Product Details", "Specifications", "Delivery & Returns". 56px rows, body **Medium 16px** `--clr-ink`, chevron right, 1px `--clr-line-soft` divider, closed by default.
9. Product code: label body Medium 13px + value 13px `#909090` after a thin divider.

Mobile: the gallery becomes a full-width swipe carousel (1:1) with dots; the buy box follows with 16px gutters, and Add to basket becomes a sticky bottom bar *(Morucha)*.

### Forms
- **Newsletter field:** white fill, 1px `#BFBFBF` border, radius 4px, 51px tall, ~400px wide, body 16px, placeholder `#909090`. The green Subscribe button sits 8px to the right at the same height.
- Focus: border becomes 1px `#000`. No glow.
- Errors: text and border `--clr-error`.

### Accordion (footer)
- Full-width rows on `#F7F7F7`, **76px** tall, separated by 1px `#E0E0E0`.
- Title condensed **16px UPPERCASE** `--clr-ink`, at the footer gutter. Chevron at the right gutter. Content opens below in body 13px.

### Back-to-top button (replaces v1's side tabs)
- **52px circle**, white fill, **2px `--clr-action` border**, black up-arrow, bottom-right (32px from the right, 40px from the bottom). Appears after the first screen; smooth-scrolls to the top.
- *(Morucha)* v1's "Trade enquiries" side tab becomes the green-accented "TRADE" nav item instead. No vertical side tabs.

### Footer
Stacked, top to bottom:
1. **Featured in** (white, 48px top padding): centred `--fs-h2` heading, 32px gap, two rows of greyscale press logos (~135px block), then a small green "SEE MORE FEATURES" button, 48px bottom padding. *(Morucha: only if real press exists. Never invent press logos. Otherwise skip this block.)*
2. **Main** (`#F7F7F7`, padding `48px 5%`), three columns:
   - Newsletter: condensed 16px UPPERCASE title ("GET FIRST LOOK AT NEW LEATHERS, OFFERS & TANNERY NEWS"), 24px gap, email field + green Subscribe.
   - **Know us** and **Help desk** columns starting at ~56% width: condensed 16px UPPERCASE headings, 24px gap, body **13px** links, ~22px apart.
3. **Accordions** (`#F7F7F7`): "Popular on Morucha", "Leather guides", "Gifts". 76px rows.
4. **Bottom row** (`#F7F7F7`): logo left; "FOLLOW US ON" (condensed 16px, 24px gap) + six 24px social icons; at the right, "WE ACCEPT" + payment marks *(Morucha, replacing DailyObjects' app-store badges)*.
5. **Bottom bar:** black, **88px**, padding `34px 5%`. "© 2026 Morucha Leather Ltd." body 13px white at the left; "Terms of use | Privacy policy" 12px white at the right with a 1px white divider.

---

## 8. Motion

DailyObjects is almost static. Keep motion functional.

| Property | Value |
|---|---|
| Default transition | `0.3s ease` (bullets, tabs, buttons) |
| Hero | autoplay slide every **5s** *(Morucha)*; horizontal slide 0.5s; active bullet fills as a timer |
| Sliders | horizontal translate 0.4s ease-out, one card per click; swipe on touch |
| Instagram row | continuous marquee (~40px/s), pauses on hover and focus |
| Tabs | instant swap of the card row (a 0.2s opacity fade is allowed) |
| Accordions | height 0.25s ease, chevron rotates 180° |
| Buttons | background colour 0.2s on hover |

- No scroll-reveal animations, no parallax, no blur-ins.
- Respect `prefers-reduced-motion`: stop hero autoplay and the marquee, and keep everything else instant.

---

## 9. Responsive rules

DailyObjects uses Angular Flex Layout breakpoints:

| Breakpoint | Name |
|---|---|
| `≥ 1280px` | Desktop |
| `960–1279px` | Laptop |
| `600–959px` | Tablet |
| `< 600px` | Mobile |

- Gutter becomes **16px** below 600px; section gap becomes **48px**.
- Header: 52px, hamburger + search left, centred logo, account + basket right. The menu opens as a full-height white drawer from the left with condensed 18px uppercase links.
- Section headings **stay 28px** on mobile; the hero title drops to 31px.
- Hero and banners switch to **portrait art** (≈ 570px tall) with the text block 28px from the left and 32px from the bottom.
- Card rows become **swipe rows**: category cards ~1.4 visible, product cards ~1.9 visible (13px names), collection cards ~1.2 visible. A **2px progress bar** sits centred under the row (track `#E0E0E0`, thumb `#000`, ~150px wide). Arrows hide on touch.
- Tab pills scroll horizontally if they overflow.
- Product page stacks: gallery, then buy box.
- Footer columns stack; link columns sit two-up.
- Never allow horizontal page scroll.

---

## 10. Applying the rules to Morucha's home page sections (same sections as v1)

| # | Section (v1) | v3 pattern (DailyObjects source) | Notes |
|---|---|---|---|
| 1 | Header / nav | **Header** (§7) | 80px, white, hairline, condensed nav, "TRADE" accent |
| 2 | Announcement bar | **Promo strip** under the header (DailyObjects "Free duffle bag" strip) | Coral, 89px, "FREE UK DELIVERY OVER £75" + pill |
| 3 | Hero | **Hero carousel**: 3 bright campaign slides, bottom-left title + subtitle + small button, round arrows, timer bullets | Tone per slide |
| 4 | Statement banner | **Centred statement** (form C): `--fs-h2` heading ("TANNED BY HAND SINCE [YEAR TBC]"), one 18px body sentence (max 640px), small black button "Our story" | No images, so two full-bleed images never sit back to back |
| 5 | Our leathers | **Shop-by-category tabs** (form B): tabs "Hides · Leather goods · Bags", four 4:5 cards each, 18px label + grey note ("From £XX / sq ft" for hides) | "View All" → all leathers |
| 6 | Bestsellers | **Product slider** with **tab pills** (All · Wallets · Purses · Cardholders · Gifts), 3 per view, 1:1 cards using the grid-card price row (name, £ price, struck price, colour dots) | Square slider arrows |
| 7 | Discover cards | **Collection cards** ×3 (2:3, radius 10px): "Crafted by nature", "Tanned with patience", "New season" + "Shop now!" + circle arrow | Row heading "DISCOVER MORUCHA" |
| 8 | Product spotlight | **Product page buy box** (§7), 50/50: Voyager Passport Wallet | Row heading above: "FEATURED PIECE" |
| 9 | Our story | **Full-bleed banner, light tone**: "OUR STORY", 2–3 line paragraph, black "READ OUR STORY" button | Workshop daylight photo |
| 10 | The process | **Product slider pattern**, 5 steps, 1:1 images: name = step ("Selection"), grey subtitle = one-line description | Heading "THE PROCESS", "View All" → process page |
| 11 | Leather goods collections | **Collection cards** (Wallets · Purses · Cardholders · Gifts), 3 visible + slider | Heading "SHOP BY COLLECTION" |
| 12 | Sustainability | **Full-bleed banner, dark tone**: "RESPONSIBLY TANNED", subtitle, white "LEARN MORE" button | |
| 13 | Made with Morucha | **Instagram marquee** (form C): "MADE WITH MORUCHA" + "Follow @morucha…" | |
| 14 | Trade and wholesale | **Full-bleed banner, light tone** (DailyObjects "Corporate gifting"): "TRADE & WHOLESALE", paragraph, black "ENQUIRE NOW" | Optional 3 offer lines with line icons under the paragraph |
| 15 | Side tabs | **Back-to-top button** (§7) | Trade link moves to the nav |
| 16 | Footer (with newsletter) | **Footer** (§7): featured-in (only if real) → newsletter + link columns → accordions → social + payments → black bar | Newsletter lives here, as in v1 |

Rhythm: banners and card rows alternate down the page, all separated by 80px of white. DailyObjects allows two banners back to back (Corporate gifting, Step inside); Morucha keeps at least one card row between banners except where noted.

Files *(Morucha, following v2's structure)*: route `src/app/v3/`, components in `src/components/v3/`, copy in `src/content/home-v3.ts`, photos in `src/content/images-v3.ts`.

---

## 11. CSS token starter

```css
:root {
  /* colour */
  --clr-bg: #ffffff;
  --clr-surface: #f7f7f7;
  --clr-text: #000000;
  --clr-text-nav: rgba(0, 0, 0, 0.87);
  --clr-ink: #1a1b1f;
  --clr-text-2: #909090;
  --clr-text-3: #666666;
  --clr-icon: #44474e;
  --clr-inverse: #000000;
  --clr-action: #20a87e;
  --clr-action-hover: #178a66;
  --clr-promo: #e66b55;
  --clr-promo-ink: #ffe4d6;
  --clr-error: #b3261e;
  --clr-brand: #c2010b; /* logo only */
  --clr-line: #e0e0e0;
  --clr-line-soft: rgba(191, 191, 191, 0.2);
  --clr-line-header: rgba(0, 0, 0, 0.16);
  --clr-field-border: #bfbfbf;
  --clr-dot: #bfbfbf;
  --clr-skeleton: #cacacb;
  --clr-arrow-hero: rgba(0, 0, 0, 0.35);
  --clr-arrow-slider: rgba(0, 0, 0, 0.3);

  /* type */
  --font-head: "Roboto Condensed", "Arial Narrow", sans-serif; /* weight 700 only */
  --font-body: "Graphik", "Inter", system-ui, sans-serif;
  --fs-display: 38px;
  --fs-h1: 28px;
  --fs-h2: 26px;
  --fs-price-lg: 24px;
  --fs-title-lg: 24px;
  --fs-label: 18px;
  --fs-ui: 16px;
  --fs-nav: 15px;
  --fs-btn-sm: 13px;
  --fs-body-lg: 18px;
  --fs-body: 16px;
  --fs-sm: 14px;
  --fs-xs: 13px;
  --fs-xxs: 12px;
  --lh-tight: 1.2;
  --lh-name: 1.3;
  --lh-long: 1.5;
  --ls-btn: 0.006em;

  /* layout */
  --section-gap: 80px;
  --heading-gap: 16px;
  --heading-gap-slider: 24px;
  --gutter: 48px;
  --gutter-slider: 34px;
  --gutter-footer: 5%;
  --inset-banner-x: 80px;
  --inset-banner-y: 60px;
  --header-h: 80px;
  --strip-h: 89px;
  --banner-h: 643px;
  --card-gap: 16px;
  --page-max: 1680px; /* Morucha */

  /* shape */
  --radius-btn: 4px;
  --radius-chip: 6px;
  --radius-card: 10px;
  --radius-round: 50%;
  --radius-pill: 999px;

  /* motion */
  --t: 0.3s ease;
}

@media (max-width: 599px) {
  :root {
    --fs-display: 31px;
    --fs-h2: 24px;
    --fs-label: 16px;
    --section-gap: 48px;
    --gutter: 16px;
    --gutter-slider: 16px;
    --gutter-footer: 16px;
    --inset-banner-x: 28px;
    --inset-banner-y: 32px;
    --header-h: 52px;
    --banner-h: 570px;
  }
}
```

---

## 12. Don'ts

- No serif, no italics, no gold, no paper grain (v1). No colour-block bands, stitch letters or 10px gutters (v2).
- No off-white or tinted page background. The page is `#FFFFFF`; `#F7F7F7` is the only other surface.
- No lowercase or sentence-case headings, and no letter-spaced uppercase. Headings are condensed bold UPPERCASE at normal tracking.
- No bold body text and no third typeface.
- No shadows, no gradients on UI, no overlays on banner photos (pick photos with clean space instead).
- No radius on product images, category images or banners. Radius only: 4px buttons and pills, 6px option chips, 10px collection cards, round swatches, dots and arrows.
- No green outside commerce actions, no coral outside promotions, and no Morucha red outside the logo.
- No more than one green button per viewport.
- No star ratings, ribbons or quick-add bars on home cards.
- No padding or backgrounds on sections; use the 80px gap.
- No dark, moody photography.
- Don't invent press logos, reviews or ratings. The "Featured in" block and star ratings appear only with real data.
- Don't copy DailyObjects' logo, copy, photography or font files. Graphik is commercial; license it or use Inter. **Any DailyObjects photos used while building v3 are temporary preview images only.** They aren't licensed to Morucha and must be replaced with Morucha's own photography before launch.
