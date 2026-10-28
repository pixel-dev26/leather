# Morucha — Design Rules v11 "Bone & Brass" (premium revision)

Primary aesthetic reference: **harberlondon.com** (Harber London, leather goods, UK), measured on 28 Oct 2026 (computed styles at 1024px, screenshots of every section).
The premium revision (28 Oct 2026) also draws on cuero.in, adamis.in, buffalojackson.com, laticoleathers.com, willleathergoods.com, billytannery.co.uk and sagebrown.co.uk.
Approved boards: concept https://claude.ai/artifact/KrQdoB87upPCUzq5kGHrDy, section designs https://claude.ai/artifact/VB4qQYo4dfHs6Q8oGvWd44 and the revision (premium pass, version 2) https://claude.ai/artifact/B4KenwbYy1JPjDqWr7rzfH. Where they differ, the revision wins.

v11 is a **quiet, London-tailored leather house**: a bone page with near-black ink bands, a bookish Baskerville serif over a light Figtree, products floating on soft stone wells, hairlines instead of boxes, and brass only as a small accent. All products, prices, photos and copy are Morucha's own. No logo, photo or wording from any reference is used.

Every page and component must follow these rules. If something isn't covered here, choose the **quieter, roomier, more photographic** option.

Values marked *(Morucha)* are additions or adaptations; everything else is measured from the references.

---

## 1. Design principles

1. **More air.** 112px between sections (88 tablet, 64 phone). One idea per block.
2. **Photos lead.** Images are larger than the text beside them.
3. **No boxes.** Product and collection cards have no border or fill of their own; products float on a stone well. Hairlines (`--clr-hair`) separate rows.
4. **Quiet type.** Body copy Figtree 300–400; labels in 10–11px tracked capitals; product and section names in Baskerville. Never bold serif, never uppercase serif.
5. **Bone page, ink bands.** Craft, wallet finder, film and footer sit on ink. Light and dark blocks alternate at the end of the page.
6. **Brass, rarely.** Numbers in lists, one stroke in each drawn icon, the focus ring and the italic word in the about heading. Never a fill.
7. **Morucha's red is the logo only.**

---

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--clr-bg` | `#F7F4EF` | Page, header, menu, finder results panel |
| `--clr-stone` | `#EDE8E0` | Quiet panels |
| `--clr-well` | `#EFEAE2` *(Morucha)* | Product and collection wells (photos use `mix-blend-mode: multiply`) |
| `--clr-ink` | `#1C1B19` | Text, announcement line, dark bands, footer |
| `--clr-ink-2` | `#6B655C` | Secondary text (5.3:1 on bone) |
| `--clr-hair` | `#E4DDD2` *(Morucha)* | Hairlines |
| `--clr-line` | `#DDD6CB` | Stronger rules |
| `--clr-brass` | `#AE9362` | Accents only (see §1.6) |
| `--clr-on-ink` / `--clr-on-ink-2` | white 85% / 65% | Text on ink |

Ink on bone is 15.6:1.

---

## 3. Typography

| Role | Face | Size / line | Notes |
|---|---|---|---|
| Section title (H2) | Libre Baskerville 400 | 42 / 1.1 (tablet 34, phone 28) | −1.5% tracking |
| About statement | Libre Baskerville 400 | 34–60 fluid / 1.06 | One brass italic word |
| Craft statement | Libre Baskerville 400 | 30 / 1.4 (phone 22) | White 85% |
| Hero panel title | Libre Baskerville 400 | 32 / 1.12 (phone 28) | |
| Product / list name | Libre Baskerville 400 | 15 / 1.35 | |
| Menu links (header) | Figtree 500 | 11, caps, +16% | Underline grows from the left |
| Mega-menu links | Libre Baskerville 400 | 15 / 2 | |
| Eyebrow | Figtree 600 | 10, caps, +20% | |
| Link CTA | Figtree 500 | 11, caps, +16% | 1px underline, 4px offset |
| Body / sub | Figtree 300 | 15–16 / 1.6 | |
| Price | Figtree 400 | 13, tabular | Ink 2 |

---

## 4. Layout and the heading pattern

- Content width 1440px; gutter 40px (tablet 28, phone 16); grid gap 20px (phone 12).
- **Every section has a heading** (`SectionHead`): eyebrow, serif H2, optional light sub-line, optional link on the right; 48px below it. Centred for collections and the newsletter; light-on-ink inside dark bands. Tabs sit under the title.
- Corners: 3px on photos and wells, 5px on buttons. Breakpoints: phone < 600, tablet 600–959, header drawer < 1100.

---

## 5. Imagery

Morucha's own photos only (`/public/images/banners/w960|w1600`, `/public/images/products`). Product photos are `contain` on a stone well with multiply; lifestyle photos are `cover`. The film is portrait, so its frame is 4:5.

---

## 6. Components

**Announcement line.** Ink, one centred line of the four promises, 10px caps.

**Header.** Bone, 76px, sticky, hairline under it. Shop links left (Men, Women, Card holders, Hunter leather, New in), logo centred, Gifts and Our story plus search, wishlist and basket on the right. Men and Women open a full-width menu on hover or focus: three link columns and a 16:10 photo. Under 1100px: menu button, logo, icons; a left drawer holds every link, with Men and Women folding open.

**Hero.** Three photo panels under the header, `min(100vh − 110px, 768px)`, bottom fade, serif title, one line, white button; H1 in tracked caps top left. Phone stacks them.

**Promise band.** Four hand-drawn icons (40px) between hairlines, serif title and one light line each, fine vertical rules. Phone 2 × 2.

**Hand-drawn icons** (`Drawn.tsx`). 48×48, a firm 1.25 line plus a fainter offset "ghost" line, one brass detail. `DrawGroup` sketches them as the group enters the screen (1.6s, brass last) and again on hover of any item. Reduced motion shows them drawn.

**Product card.** No border. 4:5 stone well, product at ~78% with multiply, "New" in 9px caps for the newest year, wishlist heart. Serif name, then price and up to five 9px colour dots. No star ratings until real reviews exist.

**Rail.** Scroll-snap row, then thin arrows, an "01 / 08" counter and a hairline progress track. 4 / 2.3 / 1.5 cards in view (new arrivals 2 / 2.2 / 1.5).

**Collections.** Six items: 3:4 stone well with the product, a drawn icon, serif name and a caps count from store data. Then two wide 320px photo banners (1.5 / 1).

**Craft band.** Ink, heading, serif statement, three numbered pillars with hairlines.

**New arrivals.** Editorial spread: tall 4:5 photo (sticky on desktop) beside the heading, a 72px serif count of new products and a rail of all of them.

**Gifting.** Large 4:3 photo beside heading, dashed list and link.

**Wallet finder.** Ink band, heading, three steps with chip options; matching products on a bone panel.

**Hunter leather.** Large 5:6 photo beside heading, sub-line with the hunter count, a hairline list of three products with stone thumbnails, and a link.

**Film.** Ink band; portrait 4:5 video frame with an outlined play button beside a heading, three numbered facts and a link. Plays with controls on click.

**Feed.** Heading with the handle [TBC]; mosaic of one large photo and six squares, each captioned with what to shop.

**FAQ.** Heading left; questions right as `<details>`, ink rule above the first, hairlines between; the first starts open. Answers only restate Morucha's own policies.

**Newsletter.** Light, centred between hairlines; drawn envelope, heading, one underlined field with a text button; inline thank-you. Discount [TBC].

**About.** One large serif sentence beside two short paragraphs, founding story [TBC] and three link CTAs.

**Footer.** Ink, white logo, social buttons, four link columns (accordions on phones), legal line and payment marks.

---

## 7. Motion

Photos scale to 1.03–1.05 over 0.8–1.2s on hover; header underlines grow in 0.35s; mega menu fades and drops 6px in 0.25s; icons draw as in §6. `prefers-reduced-motion` removes all of it.

---

## 8. Section order

| # | Section | Reference |
|---|---|---|
| 1 | Announcement line | harberlondon.com |
| 2 | Header with full menu | laticoleathers.com, sagebrown.co.uk, cuero.in |
| 3 | Three-panel hero | harberlondon.com |
| 4 | Promise band | cuero.in, adamis.in |
| 5 | Our bestsellers | harberlondon.com, buffalojackson.com |
| 6 | Shop by collection | buffalojackson.com, willleathergoods.com, adamis.in |
| 7 | Our craft | harberlondon.com |
| 8 | New for 2026 | adamis.in, harberlondon.com |
| 9 | Gifting | harberlondon.com (personalisation) |
| 10 | Wallet finder | harberlondon.com (device finder) |
| 11 | Hunter leather | buffalojackson.com |
| 12 | On film | harberlondon.com, buffalojackson.com |
| 13 | Carried every day | laticoleathers.com |
| 14 | Good to know (FAQ) | laticoleathers.com |
| 15 | Newsletter | willleathergoods.com |
| 16 | About Morucha | billytannery.co.uk |
| 17 | Footer | harberlondon.com |

---

## 9. Don'ts

- No reference brand's logo, photos or copy.
- No borders or shadows on cards; no second accent colour; no red outside the logo.
- No bold or uppercase serif.
- No invented facts (reviews, discounts, dates, durations). Instagram handle, newsletter discount, contact details and founding story stay [TBC].
