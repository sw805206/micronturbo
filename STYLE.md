v025 | 2026-08-15 | 826 lines
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
romanization "Anheng Randong" appears in the identity deck but is NOT used on the
site.

The logo is Power Flame (焰启电源) — an opening power ring around a flame. The
selected variant is 4a: point flame, steel ring.

Usage rules, from the identity system:

- Minimum size 16px.
- Clear space on all sides of at least 20% of the mark's height.
- Mono versions (single-color, `#0C1A2B` or `#F6F3EE`) for stamps, grayscale
  output, and any context where the two-color mark cannot reproduce.

The mark does not yet exist as an SVG file. It exists only as a Claude Design
component and must be exported before any page can use it.

## 3. Color

### Ground and surfaces

| Token | Value | Name | Role |
|---|---|---|---|
| `--mt-bg` | `#0C1A2B` | 航天墨蓝 Ink | Page ground |
| `--mt-surface` | `#12283F` | 舱体蓝 Cabin | Cards, panels |
| `--mt-surface-high` | `#1B3350` | 仪表蓝 Instrument | Raised within a surface |
| `--mt-border` | `rgba(255,255,255,0.08)` | — | Hairline on dark |
| `--mt-bg-rgb` | `12, 26, 43` | — | `--mt-bg` as channels, for `rgba()` |

`--mt-bg-rgb` is not a second color. It is `--mt-bg` written as bare channels so
a translucent layer can be built from the ground color with `rgba()` instead of
a hex literal that merely happens to match. The feature-row scrim is its only
consumer and needs two alphas of the same color. The cost is that the two must
be kept in step by hand — CSS cannot derive one from the other — so a change to
`--mt-bg` is a change to both.

航天墨蓝 carries a Chinese name in the identity deck but no English one; Ink is
the English name assigned here. 航天 is the aerospace-industry term rather than
outer space, and 墨蓝 is ink-blue — the sense is engineering, not cosmos.

Cabin and Instrument are confirmed. Neither color appears in the deck's palette
section — both were extracted from how the deck uses them, and the Chinese names
were coined here rather than by whoever designed the Chinese identity. They were
provisional on that basis until the names were confirmed directly.

`--mt-border` is not a color. It is white at 8% alpha and renders differently
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
running copy; steel ~2.2:1 and is NOT a text color on dark — it is a graphic
color only.

The three added hues all clear AA on `--mt-bg` — hydro 6.9:1, magnet 5.3:1,
vortex 5.3:1 — so unlike steel, each is legal as text on dark. They exist because
six categories needed six distinguishable hues and the three original accents are
all warm; nothing in the palette separated a fuel claim from a thermal one.

Amber is the figure color. When a number is the point of a component, it is
amber; ignition carries the label or the rule above it. This is the one place the
two warm accents are not interchangeable — with one exception, recorded under the
six-way exception below.

#### Categorical order

Where a component assigns color by category rather than by meaning — chart
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
Side by side in a legend they read as one color in two lightnesses rather than
as two categories, and the distinction collapses entirely for a red-green
color-blind reader. The order above is the assignment order, not a promise that
any two consecutive slots are safe neighbors: a two-series chart takes c1 and
c3, not c1 and c2. Where the six are spatially separated — six cards in a grid,
each with its own label — the adjacency problem does not arise and the full order
is usable as written.

Steel remains graphic-only on dark. Its place at c3 is a categorical assignment
for fills, rules and icon strokes; it does not make steel legal as text.

#### The six-way exception

Where six categorical icons appear together, the figure beside them is NOT amber.
`.mt-alt__ours` in section 6 sets its figure to `--mt-text` and lets the icon
carry the color.

Amber was tried first, as the rule says it should be. With six of them on screen,
each pairing a colored icon with an amber number, amber stopped signaling and
started competing: the icons already carried the categorical color, so the amber
figures added a seventh color that meant nothing and drowned the six that did.
Neutral figures let the icon hue do the categorizing and the number do the
reading.

This was first established on the point card, which the alternating feature rows
replaced. The rule outlived the component because it was never about that
component — it holds wherever the six categorical hues appear together, and the
amber rule holds everywhere a figure is the only colored thing in its own.

### Semantic color

One token, and it is not part of the palette above.

| Token | Value | Contrast on ground | Use |
|---|---|---|---|
| `--mt-error` | `#FF4F79` | ~5.5:1 | Error message text and its icon |

**It is semantic, not categorical.** It does not join the c1–c6 order in the
categorical block above and nothing counted may reference it. The categorical
hues answer "which of six", and this one answers "this is wrong" — a token that
tried to do both would put a validation color into a chart series the first time
someone needed a seventh slot.

**It never appears as a border, outline or fill.** An error field is marked by
the message beneath it, not by its own edge. The reason is the submit button:
`.mt-btn` is a hairline box in ignition, and ignition is reserved on any page
for the one action that matters most. An outlined error field puts a second
saturated box on the same screen, competing with the button for the attention
the button is supposed to own — and it does it at the moment the reader most
needs to be told where to go next. The message carries the color, the icon
carries it too, and the field stays a field.

It clears AA on `--mt-bg` at ~5.5:1, so it is legal for normal text there, which
is the only place it is used.

**There is deliberately no `--mt-inv-error`.** No light-ground page exists — the
inverted band below is still defined and unused — and the rule immediately under
it is that component-level inverted variants are not written speculatively. Its
absence is a decision, not a gap. The first page that builds a form on
`.mt-invert` adds it, and gets to pick a value against a ground it can actually
see, rather than inheriting a guess made here.

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
legal text color there, which it is not on dark.

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
stylesheet. This is deliberate: an `@import` inside STYLE.css would serialize the
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

### Title case

Headings use Chicago-style title case at h1 and h2. Capitalize the first and
last word of each unit, plus all nouns, pronouns, verbs, adjectives, adverbs and
subordinating conjunctions. Lowercase articles (a, an, the), coordinating
conjunctions (and, but, or, for, nor, so, yet) and all prepositions regardless of
length (at, on, to, for, with, between). Where a heading is two sentences, each
sentence is its own unit — the word before each full stop is a last word and
capitalizes.

h3 and below stay sentence case. The tracked micro-label is uppercase and is
unaffected.

English only. Chinese has no case, so the `-zh` pages are unaffected and this
rule does not create a translation obligation.

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
It sits above a heading to categorize the section. Those are its Latin values —
CJK does not take letter-spacing this way.

The Chinese equivalent was DECIDED when the first Chinese page was built, which
is the products hub. `:lang(zh)` resets `.mt-label` and `.mt-alt__vslbl` to
`letter-spacing: 0.1em` and `text-transform: none`, in STYLE.css section 7.

Two decisions are packed into that. **0.1em rather than 0** because a CJK label
still wants to read as a label: the glyphs are already on a fixed body and a
little air separates the label from body copy without opening the word up.
**`text-transform: none` rather than leaving it** because uppercase is a no-op on
Chinese glyphs but not on a Latin run sharing the element — a model number or an
SI symbol inside a Chinese label would have been the only thing the rule touched,
which is the opposite of what it is for.

The value matches the `:lang(zh) .mt-btn` override already in STYLE.css. Same
problem, same treatment, deliberately the same number: two tracked-CJK values
that differ by a hair would be a distinction nobody could see and everybody
would have to maintain.

Without the reset, 产品 renders at 0.28em and 锂电电源 at 0.14em — which reads
as broken spacing rather than as tracking, because a reader parses the gaps as
word boundaries in a script that has none.

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

  The anchor's `hreflang` attribute is functional, not decorative.
  `resolveLangToggle()` in `partials.js` reads it to learn which language the
  toggle offers, and uses it to select that page's matching
  `<link rel="alternate">`. Remove it from the partials markup and counterpart
  resolution stops site-wide — every toggle falls back to the language home
  page, silently and on every page at once. See SCOPE.md section 3.
- **Burger** — below 768px only. 44px tap target, three bars that cross into an
  X on open. Honors `prefers-reduced-motion`.
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
  Honors `prefers-reduced-motion`.

  Rows inside the panel are full width, so the hit area is the panel rather than
  the word. That is why the current row takes an inset amber rule instead of the
  underline the top level uses: there is no word to underline.

### Defined by the product pages

Nine patterns, in STYLE.css section 10. They share one property worth stating
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

  The image sits at 70% opacity over `--mt-bg`, under a scrim built from
  `--mt-bg-rgb` running 0.15 to 0.5 down the frame, and the word sits
  bottom-left in the dense end.

  Those three numbers were set together, after the first attempt got them
  wrong. At 45% over `--mt-surface` with a 0.25–0.75 scrim, the image was being
  darkened twice: the mid-navy surface showing through lifted every black off
  the floor, the scrim crushed the whites, and the photograph kept **7% of its
  tonal range** — its brightest pixel landing barely above the page ground. It
  read as blue haze rather than as a picture. Muting an image and darkening it
  for legibility are two jobs, and opacity was doing both badly.

  Now the ground behind the image is `--mt-bg`, so shadows reach the floor; the
  image is bright enough to read; and the scrim alone handles legibility. That
  recovers about **2.6× the tonal range**. The word moves to the bottom to pay
  for it — the scrim is densest there, which is worth roughly a third more
  contrast than the center, and it also stops the word being stamped across
  whatever the photograph is of.

  Our figure leads at `--mt-text-h3` with the categorical icon; the two
  comparison lines sit beneath it in `--mt-text-3` with `--mt-text-faint`
  labels. That ordering is the argument: the claim first, the context second,
  never the competitor's number at the same weight as ours.
- **Comparison table** — `.mt-table` in `.mt-table-wrap`. Our column takes a
  surface fill and an ignition rule; the competitor's is left uncolored. It
  scrolls below its breakpoint rather than wrapping, because a three-column
  comparison that wraps has stopped being a comparison.
- **SKU cards** — `.mt-sku-card` in `.mt-skus`, at `1fr 1fr 0.7fr`. The narrow
  third column holds the pipeline card, which is a signpost rather than a
  product, and takes `--mt-steel` so it reads as future rather than as a third
  thing competing with the two that ship.
- **Use-case grid** — `.mt-use` in `.mt-uses`. Picture-led, three across.
- **Brand callout** — `.mt-callout`. A surface box with a single-sided ignition
  border and therefore no radius, following the data column idiom above. On the
  hub it replaces the section heading rather than sitting under one: it is the
  only place on the page that says what the product physically is, so it carries
  more weight than a heading would.

  The box spans the container so its edges line up with the feature rows below
  it, and **the text has no max-width** — it fills the box and is inset only by
  the padding. An earlier version capped the text inside a full-width box, which
  left a band of dead space down the right and made the box look broken rather
  than measured. If a future edit reaches for `max-width` here, this is why it
  is not there.

- **Full-measure lead** — `.mt-lead--full`, releasing `.mt-lead`'s 62ch cap.

  The cap is right for sustained reading and wrong for a section lead, which is
  a line or two introducing the thing beneath it. At 62ch such a lead stops
  around 800px above a table or a row of cards running to 1190, and the ragged
  right edge reads as a mistake rather than as a measure.

  **The rule this sets: a paragraph in a full-width section runs the full width;
  a paragraph in a grid column takes its column.** So the modifier goes on the
  hub's hero lead and section leads, and on the three SKU section leads — and
  NOT on the SKU hero intros, which sit in the hero grid's left column and are
  already measured by it, nor on the feature-row descriptions, nor on `.mt-lead`
  itself, which the home page uses at the correct cap.

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
- **Backlink** — `.mt-backlink`. The return path from a SKU page to the hub.

### Defined by the contact page

Eight patterns, in STYLE.css section 11. They are the first components on the
site that take input rather than present it, and that changes what the rules are
for: every other pattern here is judged on how it reads, and these are judged on
whether a reader can complete them.

- **Form container** — `.mt-form`, capped at `--mt-form-width` (`38rem`, 608px).
  Narrower than `.mt-lead`'s 62ch, which measures 636px in Space Grotesk at the
  root size, and deliberately so. A measure is set by how far the eye travels back to
  the start of the next line; a form is set by how far the eye travels from a
  label to the field it names and then down to the next label. Long rows make a
  form look like a wall, and the fields do not need the width — nothing typed
  into a name, an email or a company field wants 62 characters.

- **Two-column row** — `.mt-form__row`, used twice: name beside company, and
  email beside subject. Both collapse to one column at **560px**.

  The second pair was not in the original spec, which put email full width.
  That was written when a third field shared the row and the columns would have
  come out around 160px, which is too narrow for an address. The third field
  was cut, and at roughly 290px per column both a full email address and a
  short subject fit comfortably — so pairing them is free, and it saves a
  scroll on a page whose message field is already tall.

  That number is from the content, not from the page. A name field has to show a
  full name without scrolling it: roughly 26 characters at `--mt-text-base`,
  which is about 230px of text, plus `--mt-space-4` of padding on each side and
  the hairline, so about 264px of field. Two of those with a `--mt-space-5` gap
  between them is 552px. Below that the pair stops being two usable fields and
  becomes two cramped ones, so it collapses at 560.

  On the stack the row's `row-gap` goes to zero. `.mt-field` already carries
  its own bottom margin, and leaving the gap on top of it opened twice the
  space between two stacked fields that a field outside a row gets — which
  reads as the pair having come apart rather than as spacing. The column gap is
  unaffected, because on one column there is no column.

  This is the rule the product patterns already follow — content-shaped grids
  break where their content breaks, not at the global 768. Worth noting that 560
  is named in the breakpoint list above but has had no consumer since the
  one-liner band was retired in v015; this pattern reoccupies the number rather
  than adding a seventh.

- **Field** — `.mt-field`, the label-plus-control-plus-message unit. The unit
  exists so the message has somewhere to live that is bound to its own field.
  An error line that is a sibling of the form rather than of the field drifts
  the moment a row reflows.

- **Label** — `.mt-field__label`, visible, above the control. Not a placeholder
  standing in for a label: a placeholder disappears on focus, which removes the
  question at exactly the moment the reader starts answering it, and it leaves
  a filled form with no way to check what each value was for.

- **Controls** — `input` and `textarea` on `--mt-surface`, a 1px `--mt-border`
  hairline, `--mt-radius-sm`. The radius matches `.mt-btn` because the field and
  the button sit in the same form and a form built from two different corner
  radii reads as two components that happen to be adjacent.

  Text is `--mt-text`. **Placeholder is `--mt-text-3`, not `--mt-text-faint`** —
  faint is marked decorative-only in section 3 and fails AA at every size, and a
  placeholder is read text even when it is only a hint.

- **Focus** — the border goes `--mt-ignition` and a soft ring is added, built as
  a `box-shadow` in ignition at low alpha, `--mt-space-1` wide. Visible focus is
  not optional. The ring rather than a thicker border because a border that
  changes width reflows the field by a pixel and makes the whole row twitch on
  tab.

  The low alpha comes from `--mt-ignition-rgb`, ignition written as bare
  channels. Same idiom as `--mt-bg-rgb` in section 3 and the same caveat: CSS
  cannot derive one from the other, so a change to `--mt-ignition` is a change
  to both.

  `.mt-field--focus` is a forced-state hook sharing this declaration block
  rather than carrying its own copy. A focused field is invisible at rest, so
  the stylebook cannot review it any other way — the same problem the nav
  dropdown has in section 6. One block behind two selectors is what stops the
  specimen reporting a focus ring the site does not have.

  This is the one place ignition is legal on a field edge, and it does not
  contradict the no-border rule for errors: focus is transient and applies to
  exactly one field at a time, so it never competes with the submit button the
  way a set of persistent error outlines would.

  The transition honors `prefers-reduced-motion`, per the burger and dropdown
  precedent in sections 8 and 9.

- **Error** — `.mt-field__error`, below the control, in `--mt-error`, led by a
  vendored inline alert icon taking `currentColor`. **The field border does not
  change.** Section 3 carries the reasoning; the short version is that the
  message says what is wrong and the button stays the only ignition-bordered box
  on the page.

  Color is not the only channel: the icon and the text carry the same message,
  so the state survives a reader who cannot separate the hue from the body copy
  around it.

- **Consent line** — `.mt-form__consent`, beside the submit rather than above
  it. It is the last thing read before the action, which is where a consent
  statement belongs.

  The link inside it takes `white-space: nowrap`. The paragraph shares its row
  with the button, so it is narrow at every width — including full desktop —
  and a two-word document name wrapped through the middle, "Privacy" ending one
  line and "Policy" starting the next. That reads as two links rather than one.
  The line still wraps; it wraps around the name instead of through it.

- **Status block** — `.mt-form__status`, the thank-you and the form-level error.
  Success reuses `--mt-hydro`; no success token was added, because hydro already
  means the good outcome everywhere else on the site and a second green would be
  a distinction nobody could name. `--modifier` classes select which of the two
  it is.

- **Honeypot** — `.mt-form__trap`. Offscreen, and **not** the existing
  `.mt-visually-hidden` utility, which is the reuse a reader of section 8 would
  expect. That utility exists to hide something from the eye while keeping it in
  the accessibility tree, which is the exact opposite of what a honeypot needs:
  a screen-reader user would find the field, fill it in, and be classified as a
  bot for using assistive technology. The trap therefore pairs its own offscreen
  rule with `aria-hidden="true"`, `tabindex="-1"` and `autocomplete="off"` in
  the markup, and the markup half is not optional.

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
`href="STYLE.css?v=018"`, where the number is STYLE.css's own `v###`. Changing
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
grep -l 'rel="stylesheet"' *.html | xargs grep -L 'STYLE.css?v=018'
```

It lists any page out of step and should return nothing. The scoping matters:
`partials.html` and `partials-zh.html` are fragments injected into pages that
already carry the link, so they hold no stylesheet reference of their own. A
bare `grep -L 'STYLE.css?v=018' *.html` reports both as failures — the check
must ask only pages that link a stylesheet at all.

This is a mitigation, not the fix. It costs a returning visitor a full CSS
refetch on every release, and it only works if the query is actually bumped —
a stamp bumped without the query is the same bug with an extra step. BL-003,
putting the site behind the Cloudflare proxy, is the durable answer, because it
allows a purge at release instead of waiting out someone else's TTL.

The stylebook still carries NO header or footer section, now by choice rather
than by absence. Both are injected at runtime from the partials files and are
visible on any real page; an inline copy in the stylebook would be exactly the
drift this section exists to prevent. What it does carry is the parts that are
not injected: the two button variants and the language toggle standalone, both
in section 10, and the Simplified Chinese specimen for `--mt-font-cjk`, which
sits in section 04 beside the type scale it belongs to.

That specimen also carries the `:lang(zh)` label resets, as four rows pairing
each label with its own Latin setting: `.mt-label` at 0.28em against 产品, and
`.mt-alt__vslbl` at 0.14em against 锂电电源. A reset is a difference, not a
value, so a single specimen would prove nothing — the pair is the test, and a
regression reads as the Chinese row opening out to match the Latin one above it.

The nav dropdown is the one deliberate exception. Section 10 renders it inline
and open, because a panel that is invisible at rest cannot be reviewed any other
way. Only its resting appearance is the specimen — `partials.js` is not loaded
there, so nothing in it responds to a key. The behavior is proven on a real
page. An inline specimen that pretended otherwise would be the same drift.

## 8. The reuse rule

A pattern used on two or more pages belongs in STYLE.css.

A genuine one-off may live in a page-local `<style>` block, but it must be built
from existing tokens — `var(--mt-*)`, the spacing and type scales — never raw hex
or px. It also gets a line in the ratchet record below, so the next page that
wants it promotes it rather than rebuilding it.

The inverted band tokens in section 3 are the one deliberate exception to
"patterns are defined when they are needed." They are defined in advance because
inventing color values under deadline is how a palette drifts.

## 9. Ratchet record

Which page defined which pattern. One line each, appended as pages are built.

The first row is not a page. The four carried patterns came from the identity
system rather than from anything built here, and they are recorded so the table
accounts for everything in STYLE.css rather than only for what pages added. A
reader who finds `.mt-rule` in the CSS and no row for it cannot tell whether it
was carried, forgotten, or orphaned.

| Pattern | Defined by | Promoted to STYLE.css |
|---|---|---|
| `.mt-label`, `.mt-rule`, `.mt-stat`, `.mt-datum` | Identity system | v001 §5 |
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
| `.mt-callout` brand callout | Products hub | v012 §10 |
| `.mt-lead--full` full-measure lead | Products hub, MT-6K, MT-75K | v012 §10 |
| `.mt-table` / `.mt-table-wrap` comparison table | MT-6K, MT-75K | v008 §10 |
| `.mt-use` / `.mt-uses` use-case grid | MT-6K, MT-75K | v008 §10 |
| `.mt-shot` image slot | MT-6K, MT-75K | v008 §10 |
| `.mt-hero--sku` hero ratio override | MT-6K, MT-75K | v008 §10 |
| `.mt-intro`, `.mt-backlink` | MT-6K, MT-75K | v008 §10 |
| `:lang(zh)` label reset | Products (zh) | v014 §7 |
| Hero image bottom-aligned to a form field | Contact page | page-local |
| `--mt-error` semantic token | Contact page | v016 §1 |
| `--mt-ignition-rgb`, `--mt-form-width` | Contact page | v016 §1 |
| `.mt-field--focus` forced-state hook | Contact page | v016 §11 |
| `.mt-form`, `.mt-form__row` form container and row | Contact page | v016 §11 |
| `.mt-field`, `.mt-field__label`, `.mt-field__error` | Contact page | v016 §11 |
| `input` / `textarea` control styling and focus ring | Contact page | v016 §11 |
| `.mt-form__consent`, `.mt-form__status` | Contact page | v016 §11 |
| `.mt-form__trap` honeypot | Contact page | v016 §11 |

**Page-local, not promoted:** the contact page bottom-aligns its hero image
with the message field rather than with the form or the column. It stretches
the media, takes the image out of flow, and reserves the consent block in
tokens. It stays page-local because it is an answer to one page's content —
the height of one form — not a pattern. A second page that wants it is the
signal to promote it, and at that point the reserved gap has to stop being
that page's consent row and become something a pattern can name.

**Retired in v015:** `.mt-line` / `.mt-lines`. The one-liner band was removed
from all four SKU pages, which left it with no consumer. Its row is deleted
rather than edited, because nothing shared it — the v013 note below explains
when a row is kept instead.

The claim the band carried that the table did not is power density, and it
survives as a row in the comparison table rather than as a pattern. That is the
test worth recording: a pattern is retired when its last consumer goes, not when
the content it carried goes, and those were two different questions here.

Same shape as v013 — the consumers came off in one commit and the CSS in the
next, so the content decision stays revertible on its own.

**Retired in v013:** `.mt-status`. The development-status notes were removed from
both SKU pages, which left it with no consumer. Its row is edited rather than
deleted, because `.mt-intro` and `.mt-backlink` shared it and both remain.

Worth recording alongside the rule below: the pattern was retired in the commit
after the one that removed its consumers, not the same one. That was deliberate —
the page change was a content decision that might have been reversed, and
retiring the CSS in the same breath would have made reverting it a two-file job.
The rule's intent is that dead CSS does not survive the decision, not that the
two must land in a single commit.

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
