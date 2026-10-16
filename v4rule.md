# Morucha — Design Rules v4

Primary aesthetic reference: **supertannery.com** (Super Tannery Ltd, buffalo-leather tannery, Kanpur, est. 1953). It's built on WordPress + Elementor Pro with the Vamtam "Pixel Pier" theme.
Values below were measured from the live site at a **1440 × 1080** viewport (Elementor global kit variables, computed styles and element boxes), then checked at 390 × 844 for mobile. Each value is then adapted for Morucha.

v4 keeps **the same sections as v1** (see §10) but swaps the whole visual system. v1 was serif and gold editorial luxury; v2 was Nordic colour blocks. v4 is **industrial-modern monochrome**: warm greige paper, pure black ink, one geometric sans at four weights, black "glow" bands, hairline rules, and scroll-driven moments.

Every page and component must follow these rules. If something isn't covered here, choose the **plainer, more monochrome, more typographic** option.

> **Revision 4.1 (15 Oct 2026):** the logo starts **centred** at the top and docks to the **left corner** on scroll (§7 Logo). The hero halftone is **bolder and more defined**, with a wider zoom and a moving ripple (§7 Hero). The dark-band glow is now **brown leather** instead of violet, and it **follows the cursor** on the statement band and on Sustainability (§2 Glow).

> **Revision 4.2 (15 Oct 2026):** the brand video (`public/video/hero.mp4`) now plays **inside the hero**: the halftone becomes a black field with the core and every dot cut out, so the video shows through the burst under a soft dark shade. The separate film band below the hero is **removed**. v4 photography is now **Unsplash leather-wallet stock** (`src/content/images-v4.ts`, Unsplash License, no Unsplash+ images), swapped in for v1's shared images; the featured product is a brown bifold ("Heritage Bifold Wallet [TBC]").

> **Revision 4.3–4.4 (15 Oct 2026):** a very subtle leather grain on both glow bands (§2 Glow). The hero video is now the portrait tannery clip `public/video/hero-portrait.mp4` (22MB 4K; compress to a ~1920px landscape cut before launch). The hero headline is now **Jost Medium 500** with −0.005em tracking (rev 4.5; Bold 700 was tried and was too heavy), replacing Light 300. This is a deliberate exception to "display is light" (§3): it applies to the hero headline only, and every other title stays as specified.

---

## 1. Design principles

1. **Monochrome with one red mark.** The site is greige `#E9E9E7` and black `#000`. On Super Tannery the only saturated colour on light pages is the maroon crest; on Morucha it's the **red bull logo**. Nothing else on a light surface is coloured.
2. **Type does the talking.** One family (Plus Jakarta Sans) carries everything, from 14px captions to 70px statements. Scale contrast is extreme: huge light display words next to small, plain body text.
3. **Light against heavy.** Display titles are **light (300)** and very large ("Reinventing Leather", "Our Offerings"). Statements are **semibold (600)** and large. The tension between the two weights is the signature.
4. **Black glow bands.** Dark sections are pure black with a soft abstract violet, orchid and blush glow image on one side. They're used two or three times per page as rhythm breaks.
5. **Hairlines and rules, no decoration.** Sections are separated by a **1px solid black rule**. Inside sections, structure comes from 15%-black hairlines (the timeline, inputs, dividers). There are no ornaments, textures, shadows or gradients on UI.
6. **Side label, wide content.** The default section layout is a small bold label in a narrow left column (~25%) with the content in the wide right column (~75%).
7. **Scroll is the theatre.** A sticky hero zooms as you scroll, a statement lights up word by word, a headline swaps its last word, and cards fade and zoom in. The rest of the page stays still and calm.
8. **Square, except the menu.** Images, cards, buttons and inputs are square. The only rounded objects are the floating menu card (20px), the play pill (40px) and the slider dots.

---

## 2. Colour

Measured from Super Tannery's Elementor kit (`--e-global-color-vamtam_accent_*`) and computed backgrounds. Use the token names in code; never hard-code hex values in components.

### Core palette

| Token | Value | Super Tannery source | Use |
|---|---|---|---|
| `--clr-bg` | `#E9E9E7` | `accent_2`, body bg | Default page background (warm light greige). Footer too |
| `--clr-bg-2` | `#F4F4F3` | alt band on /our-offerings | Alternate light band; product and image wells |
| `--clr-surface` | `#FFFFFF` | `accent_5` | Text panels ("Our Brand"), cards on hover, menu card, product tiles |
| `--clr-ink` | `#000000` | `accent_6`, all headings and body | Primary text, headings, buttons, 1px section rules |
| `--clr-ink-2` | `#242627` | `accent_1` | Charcoal UI: play pill, menu links, icon fills |
| `--clr-muted` | `#5F6567` | `accent_3` | Default link colour, secondary text, captions, hero sub-line |
| `--clr-line` | `rgba(0,0,0,.15)` | `accent_7` (`#00000026`) | Hairlines: timeline, input underlines, dividers inside sections |
| `--clr-rule` | `#000000` | section `border-top: 1px solid` | Rule between light sections, footer link bar |

### Dark bands

| Token | Value | Source | Use |
|---|---|---|---|
| `--clr-dark` | `#000000` | hero, "About Us", "Experience" bands | Dark band background |
| `--clr-on-dark` | `#FFFFFF` | hero title, about statement | Primary text on black |
| `--clr-on-dark-2` | `#E9E9E7` | "Experience" statement and label | Secondary statement text on black |
| `--clr-line-dark` | `rgba(255,255,255,.2)` | `accent_8` (`#FFFFFF33`) | Hairlines on black |
| `--clr-scrim` | `rgba(0,0,0,.56)` | `vamtam_sticky_header_bg_color` (`#0000008F`) | Header background once scrolled |

### Glow (dark-band imagery only)

**v4.1:** the glow is **brown leather**, not Super Tannery's violet. The layout of the bloom (one side of a black band, soft orb, blurred falloff) stays the same; only the hues change. It's drawn in CSS as layered radial gradients (never an image).

| Token | Hex | Role in the glow |
|---|---|---|
| `--glow-honey` | `#F2C58C` | Hot centre of the orb |
| `--glow-amber` | `#D9924A` | Inner bloom |
| `--glow-cognac` | `#A8602C` | Bloom body |
| `--glow-saddle` | `#7A4220` | Falloff |
| `--glow-umber` | `#4A2614` | Dim resting haze on the band's edge |
| `--glow-espresso` | `#24130A` | Outer edge into black |

**Cursor glow:** each black band has a static umber haze on its resting side plus a brighter leather orb (`<CursorGlow side="left|right" />`, ~58vw wide, `blur(30px)`). While the pointer is over the band, the orb eases towards it (lerp 0.07 per frame) and drifts back to its resting spot when the pointer leaves. It doesn't follow on touch screens or with reduced motion. The statement band rests right; Sustainability rests left.

**Leather grain (rev 4.3):** both glow bands also carry a very subtle embossed pebble-leather texture: a 320px tiled SVG (`feTurbulence` fractal noise, base frequency 0.13, lit by `feDiffuseLighting` in `#C9A07A`). It sits above the glow and below the copy at **7.5% opacity, `mix-blend-mode: screen`**. It should be felt, not seen: if the grain is noticeable at arm's length, lower the opacity. No other section gets a texture.

### Brand

| Token | Hex | Use |
|---|---|---|
| `--clr-brand` | `#C2010B` | **Logo only**: the Morucha bull, sampled in v1. Never use it for buttons, links, tags or text. |

### Rules
- Light pages are **greige `#E9E9E7` + black `#000`**. White appears only as a surface (panels, cards, menu) and never as the page background.
- Alternate light sections with a 1px black rule (`border-top: 1px solid var(--clr-rule)`), not with colour. Use `--clr-bg-2` for at most two bands per page (product and swatch areas).
- Use **two or three black glow bands per page**, never next to each other. The hero counts as one.
- Glow colours live **inside imagery only**: no violet buttons, no orchid text, no gradient UI.
- Links are `--clr-muted` and turn `--clr-ink` on hover (kit `a` / `a:hover`).
- Contrast: black on `#E9E9E7` is 17.3:1, and `#5F6567` on `#E9E9E7` is 4.9:1 (passes AA for body text). `#E9E9E7` on black is also 17.3:1.

---

## 3. Typography

Super Tannery uses **Plus Jakarta Sans** for everything, loaded as self-hosted Light 300, Regular 400, Medium 500 and SemiBold 600. Only the hero headline uses **Jost Light 300**. Both are free on Google Fonts, so v4 has no font licensing issue.

> Their CSS asks for weight 700 on statements and timeline titles, but no 700 file is loaded, so the browser renders SemiBold 600. **v4 uses 600 as its heaviest weight.** Don't load or set 700.

### Font families

| Token | Family | Role |
|---|---|---|
| `--font-sans` | **Plus Jakarta Sans** 300 / 400 / 500 / 600 | Everything: labels, statements, titles, body, buttons, nav, footer |
| `--font-display` | **Jost** 300 | Hero headline only (one place per page) |

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Jost:wght@300&display=swap" rel="stylesheet">
```

### Type scale (desktop 1440 → mobile 390)

The kit sets most sizes with `clamp()` on `vw`. The measured px at 1440 and 390 are given so the rules can be checked.

| Token | Use | Font | 1440 → 390 | Weight | Line height | Tracking | Super Tannery example |
|---|---|---|---|---|---|---|---|
| `--fs-hero` | Hero headline | Jost | 140 → 51px · `clamp(50px, 9.7vw, 180px)` | 300 | **1.0** | 0 | "Reinventing / Leather" |
| `--fs-hero-sub` | Hero sub-line | Sans | 33 → 24px · `clamp(22px, 2.3vw, 36px)` | 400 | 1.2 | 0 | "Since 1953" in `--clr-muted` |
| `--fs-display` | Centred section display word | Sans | 86 → 39px · `clamp(40px, 6vw, 120px)` | 400 | 1.2 | 0 | "Events" |
| `--fs-title` | Page / big section title | Sans | 70 → 40px · `clamp(40px, 4.9vw, 90px)` | **300** | 1.2 | 0 | "Our Offerings" |
| `--fs-statement` | Scroll-reveal statement, rotating headline | Sans | 70 → 36px · `clamp(36px, 4.9vw, 90px)` | **600** | 1.2 | 0 | "Super Tannery Ltd, is the world's leading…" / "Creating Excellent Leather" |
| `--fs-label` | Side label (section name) | Sans | 32 → 24px · `clamp(24px, 2.2vw, 50px)` | 600 (500 on dark) | 1.3 | 0 | "About Us", "We Offer", "Our Brand", "Experience" |
| `--fs-h3` | Card title | Sans | 32 → 24px · `clamp(24px, 2.2vw, 50px)` | 400 | 1.3 | 0 | "Leather", "Accessories", "Equestrian" |
| `--fs-h4` | Timeline / list item title, sub-section | Sans | 26–30 → 22px · `clamp(22px, 1.9vw, 40px)` | 600 | 1.3 | 0 | "Council of Leather Exports", "Finished Leather" |
| `--fs-lead` | Dark-band statement, lead paragraph | Sans | 28 → 22px · `clamp(22px, 1.95vw, 30px)` | 400 | 1.4 | 0 | "Super Tannery is Government recognised…" |
| `--fs-h5` | Year / step number, footer link bar, intro sentence | Sans | 20px · `clamp(18px, 1.4vw, 28px)` | 400 | 1.3–1.5 | 0 | "2022-2023", "Sensing the dynamics…" |
| `--fs-menu` | Menu card links | Sans | 28 → 24px | 400 | 1.2 | 0 | "About Super Tannery" |
| `--fs-body` | Body copy | Sans | 16px · `clamp(16px, 0.8vw, 22px)` | 400 | **1.4** | 0 | Card text |
| `--fs-body-sm` | Panel paragraphs | Sans | 15px | 400 | 1.5 | 0 | "Our Brand" text |
| `--fs-button` | Buttons, text links | Sans | 16–19px · `clamp(16px, 1.3vw, 19px)` | 600 (500 for text links) | 1.6 | 0 | "Click to see all recognitions" |
| `--fs-small` | Footer meta, captions, timeline detail | Sans | 14px · `clamp(14px, 0.6vw, 18px)` | 400 | 1.2 | 0 | "Copyright ©2026…" |
| `--fs-overline` | Rare uppercase tag | Sans | 12px | 500 | 1.2 | **0.05em** | (kit token `e323030`; v4 raises the 9px minimum to 12px) |

### Rules
- **No letter-spacing.** Everything is set at normal tracking, except the rare uppercase overline (0.05em).
- **Sentence case** for everything except the overline. No uppercase nav, labels or buttons.
- **Display is light, statements are heavy.** `--fs-title` and `--fs-hero` are 300. `--fs-statement` and `--fs-label` are 600. Never set a big title at 600, and never set a statement at 300.
- **Tight leading on big type:** 1.0 (hero) and 1.2 (display, title, statement). Body copy is only 1.4. The airy 1.95 body setting of v1 is gone.
- Body measure: keep paragraphs to **≤ 900px** (Super Tannery's text column `--content-width: 900px`). Their "Our Brand" panel runs to 952px; v4 caps it.
- No italics anywhere. Emphasis comes from weight (600) or from the black/grey contrast in the scroll reveal.
- Base `html` font size stays 16px. Fluid sizes come from the clamps above.

---

## 4. Section heading patterns

Super Tannery uses three heading forms. Pick one per section.

**A. Side label (default).** A short label at `--fs-label` / 600 sits top-left in a ~25% column. The content fills the ~75% column to the right, and the label's top aligns with the content's top. Optionally, a small mark (logo, badge) sits under the label (the "Equestria" logo under "Our Brand").

```
About Us          Super Tannery Ltd, is the world's leading Buffalo
                  leather tannery and specializes in the manufacturing…
                  More to about us ↗
```

**B. Centred display word.** A single word at `--fs-display` / 400, centred, ~20px above a full-width slider or gallery ("Events").

**C. Page title + rule.** A title at `--fs-title` / 300, left-aligned at the gutter, then a **1px black rule** across the full width, then content 30px below ("Our Offerings"). Use it at the top of inner pages, and once on the home page at most.

- Spacing: label/title → content `20–30px`. Section top padding → label `8vh`.
- There's no eyebrow, gold dot or three-tier stack. One heading per section.

---

## 5. Spacing and layout

### Spacing scale
Super Tannery's theme uses viewport-relative spacing (`--vamtam-content-space-l: min(6vh, 50px)` and multiples of it) plus fixed 30px gaps.

| Token | Value | Use |
|---|---|---|
| `--space-xs` | `calc(var(--space-l) * .1)` (≈5px) | Icon to text |
| `--space-s` | `calc(var(--space-l) * .2)` (≈10px) | Tight stacks |
| `--space-m` | `calc(var(--space-l) * .4)` (≈20px) | Heading → text, title → slider |
| `--space-l` | `min(6vh, 50px)` | Block gap inside a section |
| `--space-xl` | `calc(var(--space-l) * 1.5)` (75px) | Large block gap |
| `--space-xxl` | `calc(var(--space-l) * 2)` (100px) | Before a closing CTA |
| `--gap` | **30px** | Grid and card gaps, card padding, gutter |
| `--gap-slider` | **40px** | Between slides |

### Section padding

| Breakpoint | Vertical padding | Side gutter |
|---|---|---|
| Desktop > 1024px | **8vh** (86px at 1080, 72px at 900) | **30px** |
| Tablet 768–1024px | 40px top / 80px bottom | 30px |
| Mobile ≤ 767px | 30–60px | **20px** |

Tokens: `--section-pad: clamp(48px, 8vh, 110px);` `--gutter: 30px;` (`20px` on mobile).

Scroll-driven sections are deliberately tall: the hero track is ~1.7 × viewport (1853px at 1080), and the statement band is ~0.9 × viewport. Every other section should fit in one viewport at 1440 × 900.

### Containers

| Token | Max width | Use |
|---|---|---|
| `--container` | `min(100%, 2000px)` | Default: full width minus the 30px gutters (Super Tannery's `e-con-inner`) |
| `--container-text` | 900px | Timeline, long text, centred blocks |
| `--col-label` | 25% (min 260px) | Side-label column |
| `--col-content` | 75% | Content column |

### Grid
- **Side-label split:** 25 / 75 at ≥ 768px. Content starts at x ≈ 386px at 1440.
- **Feature split ("We Offer"):** ~40 / 60. The left column (statement, video pill, intro) stays still while the right column stacks cards with 30px gaps.
- **Product / swatch rows:** 3-up (swatches) or 4-up (products), 30px gap, inside the container.
- **Slider:** 2 slides visible, 40px gap, 3:2 images, chevrons sitting in the gutters.
- **Timeline:** 900px wide, centred, two columns of 450px meeting on a 1px centre line. Items alternate sides, and the right column is offset down by half an item.

---

## 6. Imagery

- **Radius: 0** on every image.
- **Documentary, not styled.** Real tannery and workshop footage: drone or wide shots of the works, hides on racks, swatches hanging on rails, people at machines, team photos. A full-bleed **autoplay, muted, looping video** sits right after the hero.
- **Glow images** for dark bands: an abstract soft violet/orchid bloom on black, anchored to one edge (`background-size: contain; background-position: 100% 50%` for the statement band; `0% 100%` for the "Experience" band). See §2 Glow.
- **Halftone burst:** the hero background is a radial halftone of black dots on white, scaled up so only its dark centre and the dot edge show. Morucha draws its own as an SVG (see §7 Hero). Don't use Super Tannery's file.
- Aspect ratios: hero film **16:9 full-bleed**; slider images **3:2**; swatch cards **3:2**; product tiles **1:1** on white; card icons 70px square line illustrations.
- Product shots are cut out on **pure white** inside product tiles (Super Tannery's belt grid). Lifestyle images never go inside tiles.
- Captions sit **under** images, centred, in `--fs-small`: the name in `--clr-ink`, the detail in `--clr-muted` ("Olive / Application: Furniture Upholstery").
- No overlays or gradients on photos, no text over photos (the hero text sits over the halftone, not a photo), and no hover zoom on documentary images.

---

## 7. Components

### Logo
- `public/brand/morucha-logo-light.png` over black (hero, dark bands, scrolled header), and `public/brand/morucha-logo.png` over greige.
- **v4.1 position:** at the very top of the page the logo sits **centred** in the header at 88px tall (68px tablet, 50px mobile). As soon as the page scrolls (> 40px) it glides to the **left corner** (0.6s, `cubic-bezier(.2,.7,.2,1)`) and stays fixed there at 72px (56px tablet, 40px mobile), 52px once the dark scrim header appears.
- The bull's red (`--clr-brand`) is the only colour on the page. Never recolour it, put it in a box, or add a tagline lockup.

### Header
- **Fixed, transparent**, 124px tall at the top of the page (80px tablet, 70px mobile). Side padding 30px.
- Two items only: **logo left**, **"Menu" + a two-line hamburger icon right** (18px / 400, icon 38 × 30). There are no visible nav links.
- Super Tannery's "Menu" stays `#E9E9E7` even over light sections and almost disappears. v4 fixes that: after the visitor scrolls past the hero, the header turns `--clr-scrim` with `backdrop-filter: blur(12px)`, shrinks to 84px, and shows the light logo and light "Menu" (0.3s).
- Cart for e-commerce: a text button "Bag (0)" left of "Menu", same 18px style.

### Menu card (Super Tannery popup)
- Opens from "Menu" as a **floating white card at the top right**: 428px wide, 15px from the top and right edges, **radius 20px**, shadow `2px 5px 10px 3px rgba(0,0,0,.03)`. There's no page overlay.
- Body: padding `30px 20px`. Links at `--fs-menu` (28px / 400, `--clr-ink-2`), each with `18px 0` padding. Items with children show a small ▾ caret and expand inline.
- Footer row: a hairline above, padding `25px 30px`, small links ("Trade", "Journal") at 16px / 500 on the left, and **"Let's talk ↗"** on the right.
- Opens with a fade (0.3s). Esc, a click outside or the hamburger closes it. Mobile: full width minus 20px.

### Buttons

| Type | Style (measured) |
|---|---|
| Outline (default) | 1px `--clr-ink` border, transparent, `--clr-ink` text, `--fs-button` / 600 / 1.6, padding **`13px 33px 15px`**, **radius 0**. Hover/focus: fill `--clr-ink`, text `#FFF`, 0.3s. Optional leading 18px icon. |
| Outline on dark | Same, with a white border and text. Hover: fill white, text black. |
| Text link with arrow | `--fs-button` / 500, `--clr-ink` (white on dark), followed by a **thin ↗ arrow** (north-east, 1.2px stroke) with 10px gap. Hover: the arrow nudges 3px up and right. ("More to about us ↗", "Let's talk ↗") |
| Play pill | A 68 × 46px **charcoal pill** (`--clr-ink-2`, radius 40px) with a 20px white ▶ that pulse-grows on hover, then a 16px / 500 label 15px to its right ("Check out our Corporate Video"). Opens the brand film in a lightbox. |
| Solid (e-commerce only) | bg `--clr-ink`, white text, same metrics as outline. Hover: `--clr-ink-2`. Use it only for "Add to bag". |

There are no maroon, gold or coloured buttons and no pill CTAs.

### Hero (Super Tannery)
- A **scroll track ~1.7 × viewport tall** (1853px at 1080) holds a **sticky, full-viewport black panel** (`position: sticky; top: 0`).
- **Halftone burst background (v4.1, bolder):** a canvas component `<Halftone />` draws a square grid of crisp black dots on white (**96 dots across** the burst's diameter, so each dot is large and well defined). Dot radius grows towards the centre until the dots merge into a solid black core (34% of the radius). It starts at **1.9×** (dots clearly visible round the edges and corners) and zooms gently to **3×** over the hero's scroll track, so the dot field stays in view for most of the scroll. A slow **ripple** travels outwards through the dot field while the hero is on screen (dot radius ±22%, ~4s per wave). The ripple is off with reduced motion. Generate it in code. Don't use an image.
- Centred text block:
  - Headline at `--fs-hero` in **Jost 300**, white, line height 1.0, over two lines.
  - ~70px gap, then the sub-line at `--fs-hero-sub` in `--clr-muted`.
- No buttons, no slide dots, no overlay. Header items sit over it in light colours.
- **Video (rev 4.2):** a full-bleed `<video autoplay muted loop playsinline>` sits behind the halftone, under a radial shade (`rgba(0,0,0,.55)` centre → `.3` edge). The halftone draws in cutout mode, so the video shows through the core and the dots while the area between dots stays black. The video counter-zooms 1.06 → 1 as the burst opens, and it's paused with reduced motion. There's no separate film band.
- Mobile: no sticky track. The halftone shows whole and centred behind the text, then the film follows (as a 16:9 band).

### Statement band (Super Tannery "About Us")
- Black band with a glow image anchored right (`contain`, `100% 50%`). Side-label layout: label `--fs-label` / 500 in white on the left, statement at `--fs-statement` / 600 in white on the right (content column, ~1000px wide).
- **Word-by-word scroll reveal:** each word starts at opacity **0.1** and reaches 1 as the band scrolls through the viewport. Words ahead of the reading point fade 0.7 → 0.3 → 0.1. Use `prefers-reduced-motion` to show the full text at 1.
- A text link with ↗ sits ~80px below the statement.

### Offer cards (Super Tannery "We Offer")
- **Left column (sticky on desktop):** a rotating headline at `--fs-statement` / 600, "Creating excellent" + a swapping last word (Leather → Belts → Bags → Accessories) with a letter-by-letter swirl, 2.5s per word. Then the play pill (~40px below), then an intro sentence at `--fs-h5` / 400 (max 460px, ~120px below).
- **Right column:** a side label ("We Offer") and then a stack of cards with 30px gaps, each card 75% of the column wide:
  - Padding **30px**. Background: a white overlay at **50% opacity** on greige (reads as `#F4F4F3`), going to **100% white on hover** (0.3s). A small ↗ arrow icon appears top-right on hover.
  - A 70px line-illustration icon (zooms in on reveal), ~40px space, title `--fs-h3` / 400, 20px, then body `--fs-body`.
  - The whole card is a link.

### Side-label text panel (Super Tannery "Our Brand")
- 1px black rule above the section. Label left (`--fs-label` / 600) with a small mark under it (280px wide max).
- Right: a **white panel** (`--clr-surface`), padding `30px`, with paragraphs at `--fs-body-sm` / 1.5 and 15px between them, ending in an inline "Read more…" in `--clr-muted`.

### Timeline (Super Tannery recognitions)
- Centred, 900px wide. A small mark (81px logo) sits at the top centre, and a **1px `--clr-line` vertical line** runs from it down the middle.
- Items alternate left and right. Each column is 450px with a 1px line on its inner edge. Each item has **324px of space above** its text (so items stagger), then:
  - Number or year at `--fs-h5` / 400 ("2022-2023" → "01")
  - ~15px, then the title at `--fs-h4` / 600
  - ~10px, then the detail at `--fs-small` in `--clr-ink`
  - ~20px, then a 1px horizontal `--clr-line` under the item, running from the centre line outwards, with a tiny tick at its outer end.
- Leave **20vh** of space after the timeline before the next band.

### Glow band (Super Tannery "Experience")
- A ~343px black band with the glow image anchored bottom-left (`contain`, `0% 100%`): a violet bloom plus a blush orb.
- Label left (`--fs-label` / 600, `--clr-on-dark-2`), sitting over the glow. On the right (starting at ~43% of the width, max ~660px), the statement at `--fs-lead` / 400 in `--clr-on-dark-2`.
- A **centred outline button** with a leading icon sits on greige 20px **below** the band ("🏅 Click to see all recognitions").

### Image slider (Super Tannery "Events")
- A centred display word (Form B) above it.
- 2 slides visible, moving 2 at a time, **3:2 images**, 40px gap, infinite loop, autoplay 5s, slide speed 0.5s, pauses on hover and on interaction.
- Thin 30px chevrons in `#494949` sit in the 10–30px gutters, outside the images.
- **Pill pagination** 15px below: **6 × 6px** dots in `--clr-ink` at **20%** opacity, the active one stretched to **20 × 6px** at 100%, radius 6px.

### Swatch slider (Super Tannery /our-offerings "Finished Leather")
- On a `--clr-bg-2` band, with 57px side padding (a little inset from the gutter). Heading `--fs-h4` / 600 at the left, intro paragraphs at `--fs-body`, then a 3-up slider of **3:2 swatch images (443 × 295 at 1440) with 20px gaps**.
- It **glides continuously**: 1s transitions with almost no pause, infinite, and it stops on hover.
- A centred caption under each image: the name at `--fs-small` in `--clr-ink`, and the detail line in `--clr-muted`. Pill pagination as above.

### Product tile (Super Tannery belt grid, extended for e-commerce)
- A white tile (`--clr-surface`), 1:1 product image on white, no border, no shadow, radius 0.
- Under it (15px): name at `--fs-h5` / 400 and price at `--fs-body` in `--clr-muted`, then a text link "Add to bag ↗".
- Hover: the tile picks up a 1px `--clr-ink` outline (0.3s). There's no image swap or zoom.
- No badges except a single overline tag (`--fs-overline`, uppercase, `--clr-ink`) top-left inside the tile.

### Forms (newsletter, trade)
- **Underline inputs** (kit): no box, only `border-bottom: 1px solid var(--clr-line)`, radius 0, padding `1.5em 1em 1em`, `--fs-body`. Hover and focus turn the underline `--clr-ink`. No glow.
- Labels sit above at `--fs-body` / 400. Errors are `#D63637` (WPForms default) at `--fs-small`.
- The submit is the outline button.

### Footer (Super Tannery)
- On `--clr-bg`, padding `0 30px`, 20px margin at the bottom.
- Row 1: the logo (dark version, 96px tall) at the left. Space for the newsletter on the right (underline email + outline "Subscribe").
- Row 2: a **link bar between two 1px black rules**, 68px tall. Four links at `--fs-h5` / 400 (20px), `justify-content: space-between`, `20px 0` padding.
- Row 3 (`--fs-small`): copyright in `--clr-muted` on the left; contact details centred, with phone and email split by a 1px vertical rule and the address on the line below; legal links ("Privacy policy", "Sitemap") under that; company number on the right.

### Floating buttons
- Super Tannery pins a round WhatsApp button (bottom left, 56px) and a language switcher (bottom right). v4 replaces v1's side tabs with **one 56px black circle bottom-left** with a white chat icon, which opens trade enquiries. It's hidden while the menu is open.

---

## 8. Motion

| Property | Value (measured or derived) |
|---|---|
| Page transition | Fade from a `--clr-bg` overlay, **1000ms** (kit `e-page-transition`) |
| Hero | Sticky panel scales **1 → 1.1** while its halftone background, already at **~4.4×**, keeps zooming in (≈6× after 500px of scroll), so the dot field pushes outwards past the edges (Elementor motion FX, desktop only) |
| Statement reveal | Word opacity 0.1 → 1, driven by scroll position (not time) |
| Rotating headline | Letter "swirl" swap, ~2.5s per word, loops |
| Section labels | `fadeInUp` on entering the viewport (Elementor default: 1.25s, translateY 100% → 0) |
| Card icons | `zoomIn` on entering (scale 0.3 → 1, fade) |
| Card hover | Overlay opacity 0.5 → 1, **0.3s**; card transform 0.4s |
| Buttons | Colour and background **0.3s** |
| Play icon | `pulse-grow` on hover |
| Image slider | 0.5s slide, autoplay 5s, pause on hover |
| Swatch slider | Continuous glide, 1s per step, pause on hover |
| Menu card | Fade in 0.3s |

- Respect `prefers-reduced-motion`: no scroll scaling, no word reveal (full opacity), no rotating word (show the first one), fades only.
- Scroll effects run on desktop only (> 1024px), as on Super Tannery. Tablet and mobile get static layouts.

---

## 9. Responsive rules

| Breakpoint | Name |
|---|---|
| `> 1024px` | Desktop |
| `768–1024px` | Tablet |
| `≤ 767px` | Mobile |

These are Super Tannery's active Elementor breakpoints (767 / 1024).

- Gutter: 30px desktop and tablet, **20px mobile**.
- Side-label splits stack below 768px: the label goes on top at 24px, then the content.
- Hero headline 51px on mobile, centred. The halftone shows whole (not zoomed), centred behind the text.
- The statement band drops the word reveal on mobile and shows the statement at 36px / 600.
- Offer cards are 2-up (each `50% − 15px`) on tablet, and full width with 25px padding on mobile.
- The timeline collapses to one column on mobile: the centre line moves to the left at 20px, and items stack with 40px top padding instead of 324px.
- The image slider shows 1 slide plus a 15% peek on mobile, and chevrons are hidden (swipe).
- The footer link bar wraps to 2 × 2 with `space-evenly` and 10px padding on mobile.
- Header: logo 48px, hamburger only (the "Menu" word is hidden), 70px tall.
- Never allow horizontal scroll.

---

## 10. Applying the rules to Morucha's home page sections (same sections as v1)

Copy comes from `src/content/home.ts` (keep the `[TBC]` markers). Photos are temporary, as in v1.

| # | Section | v4 layout pattern | Background |
|---|---|---|---|
| 1 | Announcement bar | 36px, centred `--fs-small` / 500, sentence case, `--clr-on-dark-2` ("Free UK delivery · Order before 3:30pm for same-day dispatch"). It scrolls away (it isn't sticky) | `--clr-dark` |
| 2 | Header / nav | §7 header: fixed, transparent, logo left, "Bag (0)" + "Menu ≡" right, scrim after the hero. Nav links live in the **menu card** | transparent → `--clr-scrim` |
| 3 | Hero | **Super Tannery hero:** a black sticky panel, own SVG halftone burst, Jost 300 headline centred over two lines ("Leather that / ages with you"), sub-line at `--fs-hero-sub` in `--clr-muted` ("British leather · Since [YEAR TBC]"). Scroll: scale 1 → 1.1 plus a halftone zoom. The **brand video plays through the halftone cut-out** (rev 4.2); no film band follows. No buttons | `--clr-dark` |
| 4 | Statement banner | **Statement band:** label "Our Promise", the v1 statement at `--fs-statement` / 600 with the word reveal, glow right, "More about us ↗" | `--clr-dark` + glow |
| 5 | Our leathers | **Swatch slider:** heading "Our Leathers" (`--fs-h4`), intro, 3-up 3:2 swatches with captions (name / "From £XX / sq ft · 3.0–3.5mm"), pill dots, "Order a swatch box ↗" | `--clr-bg-2` |
| 6 | Bestsellers | 1px rule above, **Form B** "Bestsellers" centred, a row of text tabs (All · Wallets · Purses · Cardholders · Gifts, `--fs-h5`, active underlined 1px), then 4-up **product tiles**, 30px gaps, and a centred outline "Shop all leather goods" | `--clr-bg` |
| 7 | Discover cards | **Offer cards:** sticky left "Crafting excellent / [Wallets · Bags · Leather · Gifts]" with the play pill ("Watch our film") and intro; right: label "Discover" + 3 icon cards (Wallets, Bags, Leather by the hide) | `--clr-bg` |
| 8 | Product spotlight | 1px rule. 50 / 50: left a 1:1 gallery on white (`--clr-surface`) with 76px thumbnails in a vertical rail and pill dots; right a side label "Featured piece", name at `--fs-title` / 300, price at `--fs-lead`, swatches (30px squares, 1px ink ring when selected), qty stepper (underline style), solid "Add to bag", hairline accordions (Details · Specifications · Delivery) closed by default | `--clr-bg` |
| 9 | Our story | **Side-label text panel:** "Our Story" + small bull mark under it; white panel with the story paragraphs and "Read more…" | `--clr-bg` |
| 10 | The process | **Timeline:** bull mark at the top, five steps alternating left and right; the number "01–05" at `--fs-h5`, step title at `--fs-h4` / 600, one-line detail. 20vh after it | `--clr-bg` |
| 11 | Leather goods collections | **Image slider:** Form B "Collections", 2-up 3:2 images (Wallets, Purses, Cardholders, Travel), caption under each (name at `--fs-h5` + "12 pieces" muted), chevrons and pill dots | `--clr-bg` |
| 12 | Sustainability | **Glow band:** label "Sustainability", statement at `--fs-lead`, then three short points in a row split by `--clr-line-dark` vertical hairlines; then the centred outline button below the band ("Read our sustainability commitments") | `--clr-dark` + glow |
| 13 | Made with Morucha | 1px rule; **side label** "Made with Morucha" + "Follow @morucha ↗"; right: 3 × 2 grid of 1:1 maker photos, 30px gaps, captions (`@handle`, `--fs-small`, muted) | `--clr-bg` |
| 14 | Trade and wholesale | **Side label** "Trade" (+ "Free swatch box" overline); right: white panel, a 3-column hairline list of benefits (`--fs-h4` titles + `--fs-body`), then an underline-input enquiry form (name, business, email, message) and an outline "Open a trade account" button | `--clr-bg-2` |
| 15 | Footer | **Super Tannery footer** (§7) with the newsletter in row 1 | `--clr-bg` |

Dark rhythm on the home page: **hero (3) + statement (4)** form one dark run that opens the page, then greige, then the **glow band (12)**. Only the hero and statement may touch. The film between them carries the transition.

---

## 11. CSS token starter

```css
:root {
  /* colour */
  --clr-bg: #e9e9e7;
  --clr-bg-2: #f4f4f3;
  --clr-surface: #ffffff;
  --clr-ink: #000000;
  --clr-ink-2: #242627;
  --clr-muted: #5f6567;
  --clr-line: rgba(0, 0, 0, 0.15);
  --clr-rule: #000000;
  --clr-dark: #000000;
  --clr-on-dark: #ffffff;
  --clr-on-dark-2: #e9e9e7;
  --clr-line-dark: rgba(255, 255, 255, 0.2);
  --clr-scrim: rgba(0, 0, 0, 0.56);
  --clr-brand: #c2010b; /* Morucha bull: logo only */

  /* glow (imagery only) */
  --glow-honey: #f2c58c;
  --glow-amber: #d9924a;
  --glow-cognac: #a8602c;
  --glow-saddle: #7a4220;
  --glow-umber: #4a2614;
  --glow-espresso: #24130a;

  /* type */
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-display: "Jost", "Plus Jakarta Sans", sans-serif;
  --fs-hero: clamp(50px, 9.7vw, 180px);
  --fs-hero-sub: clamp(22px, 2.3vw, 36px);
  --fs-display: clamp(40px, 6vw, 120px);
  --fs-title: clamp(40px, 4.9vw, 90px);
  --fs-statement: clamp(36px, 4.9vw, 90px);
  --fs-label: clamp(24px, 2.2vw, 50px);
  --fs-h3: clamp(24px, 2.2vw, 50px);
  --fs-h4: clamp(22px, 1.9vw, 40px);
  --fs-lead: clamp(22px, 1.95vw, 30px);
  --fs-h5: clamp(18px, 1.4vw, 28px);
  --fs-menu: clamp(24px, 1.95vw, 32px);
  --fs-body: clamp(16px, 0.8vw, 22px);
  --fs-body-sm: 15px;
  --fs-button: clamp(16px, 1.3vw, 19px);
  --fs-small: clamp(14px, 0.6vw, 18px);
  --fs-overline: 12px;
  --lh-hero: 1;
  --lh-tight: 1.2;
  --lh-heading: 1.3;
  --lh-body: 1.4;
  --ls-overline: 0.05em;

  /* layout */
  --gutter: 30px;
  --gap: 30px;
  --gap-slider: 40px;
  --section-pad: clamp(48px, 8vh, 110px);
  --space-l: min(6vh, 50px);
  --space-m: calc(var(--space-l) * 0.4);
  --space-s: calc(var(--space-l) * 0.2);
  --space-xs: calc(var(--space-l) * 0.1);
  --space-xl: calc(var(--space-l) * 1.5);
  --space-xxl: calc(var(--space-l) * 2);
  --container: min(100%, 2000px);
  --container-text: 900px;
  --col-label: 25%;
  --header-h: 124px;
  --header-h-scrolled: 84px;
  --radius: 0;
  --radius-menu: 20px;
  --radius-pill: 40px;

  /* motion */
  --t-fast: 0.3s;
  --t-card: 0.4s;
  --t-page: 1s;
  --ease: ease;
}

@media (max-width: 767px) {
  :root { --gutter: 20px; --header-h: 70px; }
}
```

---

## 12. Don'ts

- No serif fonts, no italics, no gold, no maroon buttons (v1), and no colour-block bands or stitch letters (v2).
- No colour on light surfaces except the logo's red. Glow colours appear only inside dark-band imagery.
- No weight 700. Big titles are 300, statements and labels 600.
- No letter-spacing (except the uppercase overline), and no uppercase nav, labels or buttons.
- No rounded corners on images, cards, buttons or inputs. Only the menu card (20px), the play pill and the slider dots are rounded.
- No drop shadows, except the menu card's barely-there 3% shadow.
- No boxed inputs. Inputs are underline only.
- No paper grain or textures. Surfaces are flat greige, white and black.
- No text over photographs. Hero text sits on the halftone; statements sit on black.
- No two glow bands in a row (the hero → statement run is the one exception), and no more than three dark bands per page.
- Don't copy Super Tannery's content, crest, photos, film, glow images or halftone image. Only the visual system is referenced. The fonts (Plus Jakarta Sans, Jost) are free Google Fonts. **All photography and video stay temporary preview material** until Morucha supplies its own.
