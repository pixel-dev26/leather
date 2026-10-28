# Hologramme Paris — Design Rules "Sage & Saddle"

Primary aesthetic reference: **adamis.in** (ADAMIS, leather goods, India).
Values below were measured from the live home page on 28 Oct 2026 (computed styles at desktop width, with screenshots of every section). They are adapted for Hologramme Paris, a Paris wholesaler of hats and leather goods that sells to professionals only (client site: hologrammeparis.com). The approved concept board is the visual source for this version: https://claude.ai/artifact/Xahu6xvLyrD3sVfJ8mwQQ2

This version is a **soft, shoppable leather boutique**: a pale sage page, one saddle-brown action colour, a light Playfair serif for names and headings over a plain grotesk for facts, round category photos, product rails with a heading on the left, and browsing by colour and by scene. It follows the reference's section order (see §10), filled with Hologramme's own products, categories, banners and logo. The design was first drafted for Morucha; this version carries only Hologramme content. Route: `/hologramme/`.

Every page and component must follow these rules. If something isn't covered here, choose the **softer, calmer, more browsable** option.

Values marked *(adapted)* are additions or adaptations; everything else is measured.

---

## 1. Design principles

1. **Sage paper, brown leather.** The page is a barely-green white (`#FAFFF4`). It is never cream, grey or pure white. Leather browns look richer on it.
2. **Serif for names, sans for facts.** Headings, navigation, product names and icon captions are Playfair Display at regular weight, sentence or title case, never all caps. Prices, labels, buttons and body copy are Funnel Sans.
3. **One action colour.** Saddle `#754025` fills every button, slider arrow and badge. Nothing decorative uses it.
4. **Browse, don't list.** Round category photos, rails that peek the next card, tabbed favourites, a colour explorer and a shop-the-look scene. Every block leads to products.
5. **Soft corners, no shadows.** Buttons 9px, product wells 8px, photo panels 10px, category photos fully round. No drop shadows on cards; depth comes from the sage wells.
6. **Calm motion.** One slow marquee, a crossfading hero, and sections that fade up once as they enter. Nothing bounces.
7. **The logo stays black and white.** Hologramme's wordmark is used as supplied (black in the header, white in the footer); no brand colour is added to the UI.

---

## 2. Colour

| Token | Value | adamis.in source | Use |
|---|---|---|---|
| `--clr-bg` | `#FAFFF4` | body background | Page, header, cards |
| `--clr-well` | `#F1F5EC` | product image wells | Product wells, trending stage |
| `--clr-band` | `#DFEAD6` | sliding bar, hover tint | Announcement bar, marquee band |
| `--clr-line` | `#C9D8BE` | dividers, special-offer pill | Rules, USP dividers, pills, swatch rings |
| `--clr-action` | `#754025` | buttons, slider arrows, badges | All actions |
| `--clr-action-hover` | `#5E321D` | *(adapted, derived)* | Hover/pressed on action fills |
| `--clr-leather` | `#7A382A` | footer leather | Footer background |
| `--clr-text` | `#404040` | body colour | Text, icons |
| `--clr-text-2` | `rgba(64,64,64,.7)` | secondary text | Product meta, body copy under headings |
| `--clr-text-3` | `rgba(64,64,64,.45)` | *(adapted)* | Inactive tabs, outlines (decorative only, never essential text) |
| `--clr-outline-word` | `#C2CFB6` | trending stage lettering | Outlined display words |
| `--clr-white` | `#FFFFFF` | card buttons | Icon buttons on product wells, text on brown |

Contrast: `--clr-text` on `--clr-bg` is 10:1; white on `--clr-action` is 9.2:1; `--clr-text-2` on `--clr-bg` is 5.3:1 (AA for body text).

---

## 3. Typography

| Role | Face | Size / line | Notes |
|---|---|---|---|
| Hero title | Playfair Display 400 | 54 / 1.05 (phone 34) | Sentence case |
| Section title (H2) | Playfair Display 400 | 34 / 1.15 (phone 28) | Centred, or left in a rail |
| Story title | Playfair Display 400 | 38 / 1.12 (phone 28) | |
| Card / collection title | Playfair Display 400 | 15 product, 26 collection | |
| Navigation | Playfair Display 400 | 16 (15 under 1500px) | One row, never wraps |
| Icon captions | Playfair Display 400 | 17 | |
| Body | Funnel Sans 400 | 16 / 1.55 | letter-spacing .01em |
| Price | Funnel Sans 400 | 14 | Tabular figures |
| Button | Funnel Sans 400 | 14 | No caps |
| Label / eyebrow | Funnel Sans 400 | 11, uppercase, +.14em | |
| Small | Funnel Sans 400 | 13 | |

Both faces load with `next/font/google`. adamis.in also uses Satoshi for some UI text; Funnel Sans replaces it everywhere *(adapted)*.

---

## 4. Section heading patterns

- **A. Centred:** H2 centred, 28px below it to content (Favourites, Collections, Explore by colour, Shop the look, Reviews).
- **B. Rail with side copy:** a 260px column on the left holding H2, one or two lines of `--clr-text-2` copy and a button; the rail fills the rest (New for winter, Visit our showrooms). On phones the copy stacks above the rail.

---

## 5. Spacing and layout

- Max content width **1800px**, side gutter **40px** desktop, **16px** phone.
- **72px** between home sections (phone 48px). Sections sit directly on `--clr-bg`; only the marquee, the trending stage and the footer have their own fills.
- Header: 36px announcement bar, then a 76px header row. The header sticks to the top after the bar scrolls away.
- Rails: 16px gap. Desktop shows 4 cards plus a peek of the next; tablet 2.5; phone 1.6.
- Breakpoints: phone < 600px, tablet 600–959px, desktop ≥ 960px.

---

## 6. Imagery

- Hologramme's own photos, from hologrammeparis.com/wp-content/uploads: the three homepage banners, category photos and product shots. They are hot-linked for now because the client site blocks non-browser downloads; copy them into `/public` before launch.
- Pexels stock (hot-linked from images.pexels.com) for the three places the client has no suitable photos: Collections for Every Shop, Explore by Collection and the Visit Our Showrooms tiles. Replace the showroom tiles with photos of the real Aubervilliers showrooms when the client supplies them.
- Product photos sit in `--clr-well` wells at 4:5, `object-fit: cover`, `mix-blend-mode: multiply` so the white studio ground takes the sage tint.
- Lifestyle panels: hero 1440:600 (phone 4:5), story 5:4, collections 3:4, colour explorer 16:7, shop the look 16:8.

---

## 7. Components

**Announcement bar.** `--clr-band`, 13px, centred message, chevrons left and right cycle messages.

**Header.** Left: serif nav on one row, with an underline that grows from the centre on hover. Below 1400px the nav moves into the drawer. Centre: Hologramme Paris wordmark (SVG), 34px high. Right: "EN · FR", search, log in, wishlist, basket icons (19px, 1.5 stroke). One link carries a tiny sage pill centred above it ("New" on Winter 2026).

**Header icons.** Icons drop in one after another on load. On hover a sage disc springs in behind the icon, a small saddle tooltip drops in below, and each icon has its own motion: search swings like a magnifier, account nods, the heart beats (and fills saddle with a ring burst when clicked), the basket swings. Phone: menu button, logo, basket; nav opens in a drawer.

**Hero slideshow.** Full-width photo, a soft dark gradient from the left, white eyebrow, title, one line and a light button. Crossfades every 6s; progress dots at the bottom centre (active dot is a 22px pill). Pauses on hover and for reduced motion.

**Marquee band.** `--clr-band`, 20px serif phrases separated by a 22px four-point star outline, 40s per loop.

**Round categories.** Five photos, max 170px including a ring, serif caption 12px below. Each photo has its own stroke ring around it in `--clr-line`: stitched dashes, a double ring, dots, broken arcs and a wave. On hover the ring turns slowly and darkens to saddle. Phone: a row you can swipe.

**Product card.** 4:5 well, 8px radius. Badge top left (saddle pill, e.g. "New"). Quick-view eye and wishlist heart top right on 26px white circles. Serif name (2 lines max), pack size and colour count in 13px `--clr-text-2`, then an underlined saddle "Log in for trade price" link in place of a price (Hologramme hides prices from the public), then optional swatches (12px circles with a 1px sage ring).

**Buttons.** 40px high, 18px side padding, 9px radius. Fill: saddle on white text. Line: 1px saddle border, saddle text. Link: underlined text, 4px offset.

**Rail controls.** Under each rail: a 32px saddle square (6px radius) with a white arrow, a 2px sage track with a darker thumb that follows the scroll, and the next arrow.

**Tabs.** 15px text, inactive `--clr-text-2`, active `--clr-text` with a 6px-offset underline.

**Promise row.** Four 42px line icons with serif captions, divided by 1px `--clr-line` rules. Optional 13px sans sub-line.

**Collections triptych.** Three 3:4 photos edge to edge, bottom gradient, serif title and underlined "Explore now". On hover the photo breaks into pixels and resolves back (about 0.7s, drawn on a canvas over the photo). No zoom.

**Trending stage.** `--clr-well` panel, 520px tall. Outlined Playfair words (`-webkit-text-stroke: 1.2px --clr-outline-word`) behind one product. Colour dots below swap the product; a frosted mini card on the right links to it.

**Colour explorer.** Colour names with 22px dots, active one in full text colour; a wide photo below with a pill link "Shop {colour}".

**Shop the look.** Heading in the container; the photo runs edge to edge of the screen (16:7, max 80% of the screen height, no rounded corners) with 32px numbered hotspots (sage-white with a soft halo). Clicking a hotspot opens a small product card beside it.

**Reviews.** A full-width `--clr-well` band. Left (max 380px): eyebrow, H2, then the Google score between two sage rules (88px Playfair "4.8", saddle stars, Google "G" and "Average rating on Google"), and a line button to the Google listing. Right: one featured review on a `--clr-bg` card (16px radius, 1px sage border) with a large outlined quote mark in `--clr-outline-word`, stars, an FR/EN pill switch (French original, English translation marked "Translated from French"), the quote in Playfair 22–32px, a saddle initials avatar, the name and a "Google review" tag. A 3px saddle bar along the card's bottom fills over 7s, then the next review fades in; hover pauses it. Below the card: a pill tab per reviewer (initials and name) and two round outline arrows. Stacks to one column under 960px.

**Footer.** `--clr-leather` with a fine grain and a 1.5px dashed "stitch" border inset 12px. Logo (white), one line, newsletter field, link columns, contact, then payment marks and copyright.

---

## 8. Motion

- `.reveal`: fade and 24px rise, 0.6s ease-out, once.
- Header icons: staggered drop-in on load; per-icon hover motion (§7).
- Category rings: one turn per 9s on hover.
- Collections: pixelate-and-resolve on hover, 11 frames at 65ms.
- Hero crossfade 0.8s. Marquee linear. Hover on cards: photo scales to 1.04 over 0.5s.
- `prefers-reduced-motion`: no icon motion, no pixel effect, no marquee, no crossfade, no reveal offset.

---

## 9. Responsive rules

- Header becomes menu / logo / basket under 1400px.
- Rails swipe with scroll-snap; arrows stay visible.
- Story, rails-with-copy and Visit our showrooms stack under 960px.
- Collections stack to one column under 600px (4:3).
- Reels show three under 600px.

---

## 10. Section order

| # | Section | adamis.in source |
|---|---|---|
| 1 | Announcement bar | announcement bar |
| 2 | Header | header |
| 3 | Hero slideshow | custom slideshow |
| 4 | Promise marquee | sliding bar |
| 5 | Round categories | lifestyle circles |
| 6 | Bestsellers rail | best sellers |
| 7 | Craft story | image with text |
| 8 | Favourites (Men / Women / Card Holders) | tabbed favourites |
| 9 | Craft promises | USP icons |
| 10 | Collections for every pocket | lifestyle collections |
| 11 | Trending stage | trending now |
| 12 | Explore by colour | explore by colors |
| 13 | Shop the look | shop the look |
| 14 | Customer reviews | stories that inspired us |
| 15 | Visit our showrooms | inside the world |
| 16 | Service promises | footer USPs |
| 17 | Leather footer | footer |

---

## 11. Changes from the reference *(Hologramme Paris)*

- No prices: trade customers log in for prices, as on hologrammeparis.com. Cards show pack size (e.g. Pack of 12) instead.
- Range is hats (winter, summer, kids) and leather goods (wallets, belts, pouches, bags, umbrellas).
- No signup popup; the newsletter lives in the footer.
- No floating chat button.
- Logo is Hologramme's black/white SVG wordmark.
- Reviews are the client's own Google reviews from its homepage, kept in French. Contact details, opening hours and the VAT/shipping note come from the client's footer. Delivery times and founding story are marked [TBC].

---

## 12. Don'ts

- No pure white page background, no cream.
- No uppercase headings; no bold Playfair.
- No second accent colour; no red outside the logo.
- No shadows on cards or buttons.
- No invented facts (prices, policies, reviews, dates). Use [TBC].
