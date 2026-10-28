# Morucha — Design Rules v12 "Numbered"

Primary reference: **ghurka.com** (Ghurka, leather goods, New York), measured on 28 Oct 2026 at 1440 × 900 and 390 × 844 (computed styles and screenshots of every section).
Approved board: https://claude.ai/artifact/1ZMwCUrL28tJKJxTLJnDdW

v12 is a **white, photo-led leather house** where every product is called by its model number. Colour comes from the photographs; type is quiet, set in sentence case, with no capitals and no tracking. All products, prices, photos and copy are Morucha’s own. No Ghurka logo, photo or wording is used.

If something isn’t covered here, choose the **plainer, bigger-photo** option.

---

## 1. Principles

1. **White page, warm ink.** Text is `#140D0A`, never pure black. The only dark fills are the announcement band and the newsletter button.
2. **Photos carry the colour.** 720px full-bleed hero and photo pairs between product rows.
3. **Named by number.** A product with an M-code in its store title is shown as `<shape name> No. <code>` (M-2028 → *Soft Bifold No. 2028*). Without a code it keeps its plain name. A number is never made up.
4. **Two faces, no shouting.** Serif only for section titles, tile labels and footer heads. Everything else is the grotesk at 14px / 450. No uppercase, no letter-spacing.
5. **No boxes.** Cards have no border, shadow or radius. The only rules are 1px ink lines in the footer and a hairline under the header.
6. **Morucha red is the logo only.**

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--clr-bg` | `#FFFFFF` | Page, header |
| `--clr-ink` | `#140D0A` | Text, footer rules |
| `--clr-ink-2` | `#776E6E` | Small labels, [TBC] text |
| `--clr-well` | `#F4F2F1` | Product wells (photos use `mix-blend-mode: multiply`) |
| `--clr-band` | `#20202C` | Announcement band |
| `--clr-btn` | `#13142A` | Newsletter button |
| `--clr-field` | `#E9ECEF` | Email field, region box |
| `--clr-hair` | `#ECE8E5` | Header hairline, drawer rows |

## 3. Type

Ghurka uses Reckless Neue and Suisse Intl (paid). v12 uses the closest free faces: **Newsreader** and **Hanken Grotesk**, both loaded as variable fonts.

| Role | Face | Size / line |
|---|---|---|
| Section title, hero title | Newsreader 400 | 32 / 1.15 (phone 28) |
| Tile label | Newsreader 400 | 32 (phone 24) |
| Footer head | Newsreader 400 | 20 / 1.2 |
| Nav, card name, price | Hanken Grotesk 450 | 14 / 1.5 |
| Body paragraph | Hanken Grotesk 400 | 15 / 1.75 |
| Hero line | Hanken Grotesk 400 | 16 |
| Button, View All | Hanken Grotesk 400 | 15 |
| Small label | Hanken Grotesk 400 | 13, ink 2 |
| Announcement | Hanken Grotesk 450 | 12 (phone 11), white |

## 4. Layout

- Photo blocks (`--block`): 720px desktop, 560px tablet, 390px phone.
- Side gutter (`--gutter`): 32 / 20 / 16px. Rails start 16px from the edge and run off the right side.
- Breakpoints: 960px (header becomes a drawer, rails show 2.4 cards) and 600px (pairs stack, rails show 1.7 cards).

## 5. Buttons and links

- **Outlined button:** 1px border, 5px radius, 50px tall, 15px text. On the hero it is 400px wide on a 12% white fill. Fills ink on hover.
- **Text link:** 15px, 1px underline, 4px offset.

## 6. Components

- **Announcement:** one message, 32px band, close ✕ on the right.
- **Header:** 64px, sticky, white. Shop links left, logo centred (30px tall), Our Story plus search, account and bag right. Under 960px: menu and search left, logo, account and bag right; links move into a left drawer.
- **Hero:** full-bleed photo, bottom fade, centred serif title, one line and the outlined button 64px from the bottom.
- **Rail:** centred serif title, “View All” under it, arrows on the right. Cards 388 × 466 well at 1440 (`min(388px, 27vw)`), 12px apart, scroll-snap.
- **Product card:** well, then name left and price right on one line, then 16px colour squares with the selected one underlined. Second photo fades in on hover. A grey label top-left only when true for that product (e.g. “Gift box” where the title says so).
- **Photo pair:** two tiles edge to edge, bottom fade, serif label and “Shop Now ›” 30px from the left, 54px from the bottom.
- **Materials:** centred title and paragraph, then a row of 320px photos with centred captions.
- **Story:** centred title, paragraph and an outlined button.
- **Footer:** ink rule; four link columns and the newsletter (grey field, dark button); second ink rule; region box, copyright and the Morucha logo bottom-right.

## 7. Content rules

- Products, prices, colours and photos come from `src/content/products.json` via v11’s card records (`src/content/home-v12.ts`).
- “New In” lists the products created in the newest year; the hero line counts them.
- “Our Bestsellers” is the same list as v11.
- Still [TBC]: founding year and story, Instagram handle, newsletter offer. The short shape names are drafts for Morucha to confirm.

## 8. Section order

1. Announcement · 2. Header · 3. Hero · 4. New In rail · 5. Men / Women pair · 6. Our Bestsellers rail · 7. Card Holders / Gifts pair · 8. Choose Your Leather · 9. Story · 10. Footer
