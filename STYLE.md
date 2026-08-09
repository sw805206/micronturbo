v009 | 2026-08-08 | 534 lines
# Style

The design-system decisions for micronturbo.com, in words. STYLE.css is the
implementation; this file is why. Where the two disagree, this file is wrong and
gets corrected — the CSS is what ships.

Every value named here exists as a token in STYLE.css. Pages consume tokens,
never raw hex or px. The rule and its one exception are in section 8.

## 1. Foundations

The site is DARK by default. `#0C1A2B` is the page ground on every page, in both
languages, and the palette's light values exist as an inversion of that ground
rather than as an alternative to it.

This follows the brand identity system, which is dark-first, and it suits the
subject: the product is a combustion device, and a dark ground is what lets the
warm accents read as heat rather than as decoration.

The cost is legibility in dense reference content — spec tables, long product
copy, datasheets — which is genuinely harder to read on a dark ground. Section 3
defines an inverted band for that case. It remains defined and unused.

## 2. Brand marks and names

The English wordmark is **Micronturbo**. The Chinese wordmark is **安恒燃动**.
These are the same company; neither is a translation of the other, and the
romanisation "Anheng Randong" appears in the identity deck but is NOT used on the
site.

The logo is Power Flame (焰启电源) — an opening power ring around a flame. The
selected variant is 4a: point flame, steel ring.

Usage rules, from the identity system:

- Minimum size 16px.
- Clear space on all sides of at least 20% of the mark's height.
- Mono versions (single-colour, `#0C1A2B` or `#F6F3EE`) for stamps, greyscale
  output, and any context where the two-colour mark cannot reproduce.

The mark does not yet exist as an SVG file. It exists only as a Claude Design
component and must be exported before any page can use it.

## 3. Colour

### Ground and surfaces

| Token | Value | Name | Role |
|---|---|---|---|
| `--mt-bg` | `#0C1A2B` | 航天墨蓝 Ink | Page ground |
| `--mt-surface` | `#12283F` | 舱体蓝 Cabin | Cards, panels |
| `--mt-surface-high` | `#1B3350` | 仪表蓝 Instrument | Raised within a surface |
| `--mt-border` | `rgba(255,255,255,0.08)` | — | Hairline on dark |
| `--mt-bg-rgb` | `12, 26, 43` | — | `--mt-bg` as channels, for `rgba()` |

`--mt-bg-rgb` is not a second colour. It is `--mt-bg` written as bare channels so
a translucent layer can be built from the ground colour with `rgba()` instead of
a hex literal that merely happens to match. The feature-row scrim is its only
consumer and needs two alphas of the same colour. The cost is that the two must
be kept in step by hand — CSS cannot derive one from the other — so a change to
`--mt-bg` is a change to both.

航天墨蓝 carries a Chinese name in the identity deck but no English one; Ink is
the English name assigned here. 航天 is the aerospace-industry term rather than
outer space, and 墨蓝 is ink-blue — the sense is engineering, not cosmos.

Cabin and Instrument are confirmed. Neither colour appears in the deck's palette
section — both were extracted from how the deck uses them, and the Chinese names
were coined here rather than by whoever designed the Chinese identity. They were
provisional on that basis until the names were confirmed directly.

`--mt-border` is not a colour. It is white at 8% alpha and renders differently
over every ground it sits on, so naming it would be naming a treatment.

### Text on dark

| Token | Value | Contrast on ground | Use |
|---|---|---|---|
| `--mt-text` | `#F6F3EE` | ~15:1 | Body, headings — 暖白 Paper |
| `--mt-text-2` | `#C6CDD6` | ~10:1 | Secondary copy |
| `--mt-text-3` | `#8A93A0` | ~5.3:1 | Muted copy, captions |
| `--mt-text-faint` | `#5E6B7A` | ~2.9:1 | DECORATIVE ONLY — 石墨灰 Slate |

`--mt-text-faint` fails WCAG AA at every size. It is legal for rules, dividers,
disabled states and non-essential ornament. It is not legal for any text a reader
needs. The identity deck uses this value for 11–13px labels; that is a deck
convention and does not carry to the site.

### Accent

| Token | Value | Name | Role |
|---|---|---|---|
| `--mt-ignition` | `#F55B25` | 燃动橙 Ignition | Primary accent |
| `--mt-amber` | `#FFB020` | 炽芯金 Amber | Highlight, figures |
| `--mt-steel` | `#2E6C8E` | 钢青 Steel | Secondary cool, power ring |
| `--mt-hydro` | `#3FB870` | 氢能绿 Hydro | Low-carbon, hydrogen |
| `--mt-magnet` | `#9B7BE8` | 永磁紫 Magnet | Permanent-magnet generator |
| `--mt-vortex` | `#E0619B` | 涡流粉 Vortex | Turbine |

Contrast on `--mt-bg`: amber ~9:1 and is safe for text at any size; ignition
~4.5:1, which passes AA for normal text but sits close enough to the line that it
is reserved for display type, borders, rules and graphic elements rather than
running copy; steel ~2.2:1 and is NOT a text colour on dark — it is a graphic
colour only.

The three added hues all clear AA on `--mt-bg` — hydro 6.9:1, magnet 5.3:1,
vortex 5.3:1 — so unlike steel, each is legal as text on dark. They exist because
six categories needed six distinguishable hues and the three original accents are
all warm; nothing in the palette separated a fuel claim from a thermal one.

Amber is the figure colour. When a number is the point of a component, it is
amber; ignition carries the label or the rule above it. This is the one place the
two warm accents are not interchangeable — with one exception, recorded under the
six-way exception below.

#### Categorical order

Where a component assigns colour by category rather than by meaning — chart
series, icon sets, anything counted rather than ranked — the order is fixed:

| Slot | Token |
|---|---|
| c1 | `--mt-ignition` |
| c2 | `--mt-amber` |
| c3 | `--mt-steel` |
| c4 | `--mt-hydro` |
| c5 | `--mt-magnet` |
| c6 | `--mt-vortex` |

**c1 and c2 are only 23° apart in hue and must not sit adjacent as chart series.**
Side by side in a legend they read as one colour in two lightnesses rather than
as two categories, and the distinction collapses entirely for a red-green
colour-blind reader. The order above is the assignment order, not a promise that
any two consecutive slots are safe neighbours: a two-series chart takes c1 and
c3, not c1 and c2. Where the six are spatially separated — six cards in a grid,
each with its own label — the adjacency problem does not arise and the full order
is usable as written.

Steel remains graphic-only on dark. Its place at c3 is a categorical assignment
for fills, rules and icon strokes; it does not make steel legal as text.

#### The six-way exception

Where six categorical icons appear together, the figure beside them is NOT amber.
`.mt-alt__ours` in section 6 sets its figure to `--mt-text` and lets the icon
carry the colour.

Amber was tried first, as the rule says it should be. With six of them on screen,
each pairing a coloured icon with an amber number, amber stopped signalling and
started competing: the icons already carried the categorical colour, so the amber
figures added a seventh colour that meant nothing and drowned the six that did.
Neutral figures let the icon hue do the categorising and the number do the
reading.

This was first established on the point card, which the alternating feature rows
replaced. The rule outlived the component because it was never about that
component — it holds wherever the six categorical hues appear together, and the
amber rule holds everywhere a figure is the only coloured thing in its own.

### Inverted band

DEFINED AND UNUSED, still. These tokens exist so that a light section can be
built without inventing values, but no page uses them and no component has an
inverted variant yet. Variants are built when a page needs one — not in advance.

| Token | Value | Role |
|---|---|---|
| `--mt-inv-bg` | `#F6F3EE` | Band ground |
| `--mt-inv-surface` | `#FFFFFF` | Cards within the band |
| `--mt-inv-border` | `#E4E0D8` | Hairline on light |
| `--mt-inv-text` | `#0C1A2B` | Body, headings |
| `--mt-inv-text-2` | `#5E6B7A` | Secondary copy |
| `--mt-inv-text-3` | `#A9A59C` | DECORATIVE ONLY (~2.1:1) |
| `--mt-inv-ignition` | `#A83C15` | Ignition for text on light |
| `--mt-inv-amber` | `#8A5A06` | Amber for text on light |
| `--mt-inv-hydro` | `#1E7E45` | Hydro for text on light |
| `--mt-inv-magnet` | `#7B5EC1` | Magnet for text on light |
| `--mt-inv-vortex` | `#B7467A` | Vortex for text on light |

The deep accents exist because `--mt-ignition` on `--mt-inv-bg` is ~3.3:1 and
`--mt-amber` is far worse. Neither is legal as text on a light ground. The deep
variants clear AA — ignition ~5.7:1, amber ~5.4:1, hydro 4.60:1, magnet 4.50:1,
vortex 4.55:1. Steel needs no variant — it reads at ~5.1:1 on light and is a
legal text colour there, which it is not on dark.

The three new deep variants are tighter to the 4.5:1 line than the two originals.
That is deliberate: pulling them darker still would have cost the hue separation
the categorical order depends on, and a set of six that all read as muted is
worth less than a set of six that stay distinguishable at the legal minimum.
They are legal for normal text and are not comfortable for long passages.

The band is applied by a single wrapper class, `.mt-invert`, which resets the
ground and text tokens for its subtree. Component-level inverted variants do not
exist and are not written speculatively.

## 4. Typography

Space Grotesk for Latin text and all figures. Noto Sans SC for Chinese — the
script decision is Simplified, recorded in SCOPE.md section 3. Both are
served from Google Fonts — the CDN exception is recorded in SCOPE.md section 3.

STYLE.css declares the family in `--mt-font`; it does NOT fetch it. The fetch is
three `<link>` tags in each page's own `<head>` — two `preconnect`, one
stylesheet. This is deliberate: an `@import` inside STYLE.css would serialise the
font request behind the stylesheet fetch, delaying first paint on every page. The
cost is that a page omitting those tags falls back to `system-ui` silently, with
no error anywhere, so the head block is carried verbatim in PROCESS.md when that
file is written.

The Chinese stack IS in STYLE.css as of v005, as `--mt-font-cjk`: Noto Sans SC,
then `PingFang SC` and `Microsoft YaHei` as platform fallbacks. It is applied by
a `:lang(zh)` rule, not a class — the `lang` attribute on the page is the
switch, so no page opts in by hand.

Weights are per family — the two faces do not share an axis, and the identity
deck lists them separately.

Space Grotesk tops out at 700: headings, figures and emphasis at 700, medium at
500, body at 400. There is no 900. Requesting one returns HTTP 400 from Google
Fonts, and `font-weight: 900` in CSS clamps silently to 700 — identical pixels,
no error, no warning.

Noto Sans SC does carry 900 and uses it for headings, with 700 / 500 / 400
below.

Weight 600 exists in Space Grotesk but is not used. It is excluded from the font
request rather than fetched unused on every page.

| Token | Size | Use |
|---|---|---|
| `--mt-text-display` | `clamp(2.5rem, 5vw, 4rem)` | Home page and hub hero only, once per page |
| `--mt-text-h1` | `3rem` | Page title |
| `--mt-text-h2` | `2.125rem` | Section heading |
| `--mt-text-h3` | `1.375rem` | Subsection heading |
| `--mt-text-lg` | `1.125rem` | Lead paragraph |
| `--mt-text-base` | `1rem` | Body |
| `--mt-text-sm` | `0.875rem` | Captions, table cells |
| `--mt-text-xs` | `0.75rem` | Tracked micro-labels |

Root is 16px. Line heights: 1.05 display, 1.2 headings, 1.7 body.

**`--mt-text-display` means the home page and the products hub specifically, not
any page with a hero.** SKU heroes use `--mt-text-h1` with display leading —
`.mt-hero--sku h1` sets `line-height: var(--mt-leading-display)`, so the headline
keeps display rhythm at heading size.

The reason is the column, not the type. A SKU hero splits its row between a
headline-plus-paragraph and an image, so its text column runs roughly 430–515px
where the home page hero gives the slogan the full measure. At display size in
that column the headline wrapped to three lines, which drove the text column to
1.5–1.7× the height of the image beside it and left the image floating in a
half-empty row. At `--mt-text-h1` it sits on two lines and the columns pair
within ~10%. The 75K headline still takes three lines between 1000 and ~1150px
because its second line is the longer of the two — that band is accepted as a
mild imbalance rather than shrinking the type again.

**The tracked micro-label** is a named pattern, not an ad-hoc style:
`--mt-text-xs`, weight 500, `letter-spacing: 0.28em`, uppercase, ignition orange.
It sits above a heading to categorise the section. Latin only — CJK does not take
letter-spacing this way, and the Chinese equivalent is decided when the first
Chinese page is built.

## 5. Spacing, radii, layout

Spacing is a 4-based scale. `--mt-space-1` through `--mt-space-10`:
4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

Radii collapse the identity deck's five values to three, because nothing in the
deck distinguished 12 from 14 or 16 from 18:

- `--mt-radius-sm` — 10px
- `--mt-radius` — 14px
- `--mt-radius-lg` — 18px

Layout: `--mt-container` 1180px, `--mt-gutter` 40px desktop and 24px below 768px.

**Single-sided borders take no radius.** The stat card and data column patterns in
section 6 use a border on one edge only; a radius on those is a rendering artefact,
not a design decision.

## 6. Components

### Carried from the identity system

Three patterns arrive already earned — the identity deck uses each of them more
than once, and they are what makes the brand recognisable:

- **Stat card** — surface ground, 3px accent border on the top edge, no radius.
  Label in `--mt-text`, figure in amber at `--mt-text-h3` or larger, supporting
  line in `--mt-text-3`.
- **Data column** — 2px accent border on the left edge, no radius, no ground.
  Figure first at display scale, label below in `--mt-text-3`. Used in rows of
  three or four.
- **Numbered section rule** — a two-digit ordinal in ignition, tracked, followed
  by a 1px hairline filling the remaining width. Marks a major section boundary.

### Defined by the home page

Header, footer and nav are specified as of v005, and live in STYLE.css sections
8 and 9. The markup is not in STYLE.css — it is injected at runtime from the
partials files, per SCOPE.md section 3.

- **Header** — sticky, page ground, hairline bottom border, 68px minimum
  height. The wordmark sits left, nav right.
- **Nav item** — a 2px transparent bottom border that fills with `--mt-border`
  on hover and amber on the current page. The current page also carries
  `aria-current="page"`, set by `partials.js`.
- **Language toggle** — `.mt-lang`, a fixed 36px square with a hairline border
  and `--mt-radius-sm`. Fixed dimensions rather than padding, so "EN" and "简"
  render the same shape despite different glyph widths. It is excluded from the
  nav item rules with `:not(.mt-lang)` so it keeps its own box, which also lets
  it render outside a nav — the stylebook shows it standalone.
- **Burger** — below 768px only. 44px tap target, three bars that cross into an
  X on open. Honours `prefers-reduced-motion`.
- **Footer** — hairline top border, legal line left, links right, both at
  `--mt-text-xs` in `--mt-text-3`.
- **Buttons** — `.mt-btn` is a hairline box in ignition. `.mt-btn--secondary`
  takes `--mt-border` instead, so it sits beside the primary without competing;
  ignition stays reserved for the one action that matters most on a page.
  `.mt-hero__actions` is the row that holds them.
- **Hero** — a two-column grid at `1fr 1.55fr`, image right, that stacks at
  1000px. It stacks earlier than the nav breaks to the burger, because between
  768 and 1000px the text column falls to roughly 264px and wraps the slogan;
  the two breakpoints answer different questions and are deliberately not
  shared.

- **Nav dropdown** — `.mt-has-dropdown` on the `<li>`, `.mt-dd` on the panel.
  Flat, one tier. A second tier would need hover intent, a safe-triangle cursor
  path and a mobile back affordance; four nav items do not justify any of it.

  The parent stays a real link, and that decision drives the keyboard map.
  **Enter navigates** to the hub page; **Space** and **Down** open the panel.
  The tempting alternative — Enter toggles — was rejected because the panel
  lists only the two SKUs, so intercepting Enter would leave `products.html`
  with no keyboard route at all while mouse users kept theirs. Escape closes
  and returns focus to the parent, arrows and Home/End move within the panel,
  and moving focus out of the item closes it. `aria-expanded` sits on the
  parent link. On the desktop layout hover opens as well.

  Below 768px the panel goes `position: static` and expands inline inside the
  burger overlay — no hover, no second overlay, since a panel floating above a
  panel has nothing to float over. It collapses by `max-height` so the rows
  below close up rather than leaving a gap. Crossing the breakpoint closes any
  open panel, because an overlay left over from the other layout reads as stuck.
  Honours `prefers-reduced-motion`.

  Rows inside the panel are full width, so the hit area is the panel rather than
  the word. That is why the current row takes an inset amber rule instead of the
  underline the top level uses: there is no word to underline.

### Defined by the product pages

Ten patterns, in STYLE.css section 10. They share one property worth stating
once: each carries its own breakpoints — 900/520, 860/480, 560, 1000 — rather
than the global 768. These are content-shaped grids and they break where their
content breaks. A six-card grid and a three-column comparison table do not fail
at the same width, and forcing both onto the page's breakpoint would break one
of them early and the other late.

- **Alternating feature row** — `.mt-alt__row`, with `--flip` swapping the
  sides. Two equal columns: a muted image carrying the feature word, and a
  description with our figure under it and two comparison lines beneath that.
  The media is always first in the DOM, so the stacked order below 860px reads
  image-then-text on every row; `--flip` resets there rather than alternating,
  which in one column would only look like an inconsistency.

  The image sits at 45% opacity under a `--mt-bg` scrim built from
  `--mt-bg-rgb`, because the word has to stay legible over an arbitrary
  photograph. The gradient runs 0.25 to 0.75 down the frame — denser at the
  bottom, where the eye leaves the image for the copy.

  Our figure leads at `--mt-text-h3` with the categorical icon; the two
  comparison lines sit beneath it in `--mt-text-3` with `--mt-text-faint`
  labels. That ordering is the argument: the claim first, the context second,
  never the competitor's number at the same weight as ours.
- **One-liner** — `.mt-line` in `.mt-lines`. The same six claims on a SKU page,
  where the hero has already made the argument and they only need restating.
  A bounded band, hairline top and bottom, rather than six more cards.
- **Comparison table** — `.mt-table` in `.mt-table-wrap`. Our column takes a
  surface fill and an ignition rule; the competitor's is left uncoloured. It
  scrolls below its breakpoint rather than wrapping, because a three-column
  comparison that wraps has stopped being a comparison.
- **SKU cards** — `.mt-sku-card` in `.mt-skus`, at `1fr 1fr 0.7fr`. The narrow
  third column holds the pipeline card, which is a signpost rather than a
  product, and takes `--mt-steel` so it reads as future rather than as a third
  thing competing with the two that ship.
- **Use-case grid** — `.mt-use` in `.mt-uses`. Picture-led, three across.
- **Image slot** — `.mt-shot`, with `--hero` at 3/2 and `--use` at 4/3.
  `.mt-shot--img` puts a real image in the same box at the same ratio, so
  replacing a render with photography does not reflow the page.

  `--hero` was 16/9 and moved to 3/2 for two reasons pointing the same way: the
  taller slot brings the image nearer the height of the text column beside it,
  and 3/2 is the native ratio of the landscape hero source, which crops
  losslessly there where 16/9 cost it 15.7%. Crop position is per-image data and
  is set inline on the image, not here.
- **SKU hero** — `.mt-hero--sku`, overriding `.mt-hero` to `1.05fr 1.1fr` with
  `align-items: center`, stacking at 1000px like the base hero. The home page
  carries a short slogan in the text column; a SKU page carries a headline plus
  a paragraph, so the home ratio is wrong in both directions.

  The first attempt was `1.15fr 1fr` with `align-items: start`, which made the
  text column both wider and taller than the image and then pinned the image to
  the top of it. The image sat in a half-empty column. Centring pairs the two on
  their midlines; near-equal tracks give the copy room, because the copy is the
  argument on a SKU page and the image is support. Compressing the text column
  instead only pushes the headline onto a third line, which is what caused the
  imbalance in the first place.

  Its image slot is `.mt-shot--hero` at 3:2 — see the note under section 4 on
  why the headline drops to `--mt-text-h1` here.
- **Status note** — `.mt-status`. A hairline column, not a card: it is a caveat
  on the claims above it, not a claim of its own.
- **Backlink** — `.mt-backlink`. The return path from a SKU page to the hub.

## 7. The stylebook

`int-stylebook.html` renders every token and pattern in this file live. It is an
internal page: `noindex,nofollow`, linked from nowhere, no robots.txt entry, per
SCOPE.md.

**It ships in the same commit as STYLE.css, always.** A stylebook that lags the
CSS is worse than no stylebook, because it reports a state the site is not in. If
a change to STYLE.css cannot be reflected in the stylebook in the same commit, the
change waits.

**Every page's `?v=` query matches the current STYLE.css version, and is bumped
in the same commit that bumps the stamp.** Each page links the stylesheet as
`href="STYLE.css?v=010"`, where the number is STYLE.css's own `v###`. Changing
the query changes the URL, so a browser holding the old file has nothing to
match against and must refetch.

The reason is the cache window. GitHub Pages serves STYLE.css with
`cache-control: max-age=600`, and the stylesheet is a separate request from the
page that uses it, so their cache entries expire independently. Without the
query, a returning visitor can pair new HTML with CSS up to ten minutes old. The
failure is not a blank page — it renders **styled above the fold and unstyled
below it**, because the old file still carries the shared header, footer, hero
and container rules and lacks only the newest patterns. It looks like a broken
deploy and is not one; the server is serving the correct file to anyone without
a warm cache, which is why it cannot be reproduced with `curl`.

Verify before pushing any STYLE.css change:

```
grep -l 'rel="stylesheet"' *.html | xargs grep -L 'STYLE.css?v=010'
```

It lists any page out of step and should return nothing. The scoping matters:
`partials.html` and `partials-zh.html` are fragments injected into pages that
already carry the link, so they hold no stylesheet reference of their own. A
bare `grep -L 'STYLE.css?v=010' *.html` reports both as failures — the check
must ask only pages that link a stylesheet at all.

This is a mitigation, not the fix. It costs a returning visitor a full CSS
refetch on every release, and it only works if the query is actually bumped —
a stamp bumped without the query is the same bug with an extra step. BL-003,
putting the site behind the Cloudflare proxy, is the durable answer, because it
allows a purge at release instead of waiting out someone else's TTL.

The stylebook still carries NO header or footer section, now by choice rather
than by absence. Both are injected at runtime from the partials files and are
visible on any real page; an inline copy in the stylebook would be exactly the
drift this section exists to prevent. What it does carry, in section 10, is the
parts that are not injected: the two button variants, the language toggle
standalone, and a Simplified Chinese specimen for `--mt-font-cjk`.

The nav dropdown is the one deliberate exception. Section 10 renders it inline
and open, because a panel that is invisible at rest cannot be reviewed any other
way. Only its resting appearance is the specimen — `partials.js` is not loaded
there, so nothing in it responds to a key. The behaviour is proven on a real
page. An inline specimen that pretended otherwise would be the same drift.

## 8. The reuse rule

A pattern used on two or more pages belongs in STYLE.css.

A genuine one-off may live in a page-local `<style>` block, but it must be built
from existing tokens — `var(--mt-*)`, the spacing and type scales — never raw hex
or px. It also gets a line in the ratchet record below, so the next page that
wants it promotes it rather than rebuilding it.

The inverted band tokens in section 3 are the one deliberate exception to
"patterns are defined when they are needed." They are defined in advance because
inventing colour values under deadline is how a palette drifts.

## 9. Ratchet record

Which page defined which pattern. One line each, appended as pages are built.

| Pattern | Defined by | Promoted to STYLE.css |
|---|---|---|
| Header, nav, language toggle, burger | Home page | v002 §8 |
| Footer | Home page | v002 §8 |
| Hero grid, slogan, primary button | Home page | v002 §9 |
| `:lang(zh)` CJK family switch | Home page (zh) | v002 §7 |
| Secondary button, `.mt-hero__actions` | Home page | v004 §9 |
| `.mt-has-dropdown`, `.mt-dd` nav dropdown | Products (both languages) | v007 §8 |
| Categorical accents — hydro, magnet, vortex, and the three deep variants | Products hub | v008 §1 |
| `.mt-sku-card` / `.mt-skus` SKU cards | Products hub | v008 §10 |
| `.mt-alt__row` alternating feature row | Products hub | v010 §10 |
| `--mt-bg-rgb` | Products hub | v010 §1 |
| `.mt-line` / `.mt-lines` one-liners | MT-6K, MT-75K | v008 §10 |
| `.mt-table` / `.mt-table-wrap` comparison table | MT-6K, MT-75K | v008 §10 |
| `.mt-use` / `.mt-uses` use-case grid | MT-6K, MT-75K | v008 §10 |
| `.mt-shot` image slot | MT-6K, MT-75K | v008 §10 |
| `.mt-hero--sku` hero ratio override | MT-6K, MT-75K | v008 §10 |
| `.mt-intro`, `.mt-status`, `.mt-backlink` | MT-6K, MT-75K | v008 §10 |

**Retired in v010:** `.mt-point` / `.mt-points`, `.mt-time*` and `--mt-time-when`.
The hub rebuild replaced the point cards with the alternating feature rows and
deleted the pipeline section, which left the timeline with no consumer. Their
rows are removed rather than struck through — the ratchet record tracks what is
in STYLE.css now, and a row for a selector that no longer exists would send the
next page looking for it. A pattern that loses its last consumer comes out of the
CSS in the same commit that removes the consumer, or it becomes dead weight
nobody dares delete later.

Every row up to the dropdown is the home page. That was expected for the first
page built and was not evidence of reuse — the rule in section 8 earns its keep
from the second page onward, when the question becomes whether to promote or
rebuild. The dropdown is the first row raised by a second page, and it went
straight into STYLE.css because both language partials needed it at once.

The product-page rows are the first real test of the rule, and they went into
STYLE.css directly rather than living page-local first. Each was built as a
one-off in a mock and each is used by at least two of the three pages — the
point card and the one-liner are the same six claims in two forms, and the
table, use-case grid, image slot and SKU hero appear on both SKU pages. A
pattern used twice belongs in STYLE.css, and these were used twice before any
of them shipped.

No page-local one-offs exist. Nothing has been built outside STYLE.css.
