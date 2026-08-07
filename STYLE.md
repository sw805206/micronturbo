v001 | 2026-08-07 | 223 lines
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
defines an inverted band for that case. It is defined and unused as of v001.

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

| Token | Value | Role |
|---|---|---|
| `--mt-bg` | `#0C1A2B` | Page ground |
| `--mt-surface` | `#12283F` | Cards, panels |
| `--mt-surface-high` | `#1B3350` | Raised within a surface |
| `--mt-border` | `rgba(255,255,255,0.08)` | Hairline on dark |

### Text on dark

| Token | Value | Contrast on ground | Use |
|---|---|---|---|
| `--mt-text` | `#F6F3EE` | ~15:1 | Body, headings |
| `--mt-text-2` | `#C6CDD6` | ~10:1 | Secondary copy |
| `--mt-text-3` | `#8A93A0` | ~5.3:1 | Muted copy, captions |
| `--mt-text-faint` | `#5E6B7A` | ~2.9:1 | DECORATIVE ONLY |

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

Contrast on `--mt-bg`: amber ~9:1 and is safe for text at any size; ignition
~4.5:1, which passes AA for normal text but sits close enough to the line that it
is reserved for display type, borders, rules and graphic elements rather than
running copy; steel ~2.2:1 and is NOT a text colour on dark — it is a graphic
colour only.

Amber is the figure colour. When a number is the point of a component, it is
amber; ignition carries the label or the rule above it. This is the one place the
two warm accents are not interchangeable.

### Inverted band

DEFINED AND UNUSED as of v001. These tokens exist so that a light section can be
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

The two deep accents exist because `--mt-ignition` on `--mt-inv-bg` is ~3.3:1 and
`--mt-amber` is far worse. Neither is legal as text on a light ground. The deep
variants clear AA at ~5.7:1 and ~5.4:1. Steel needs no variant — it reads at
~5.1:1 on light and is a legal text colour there, which it is not on dark.

The band is applied by a single wrapper class, `.mt-invert`, which resets the
ground and text tokens for its subtree. Component-level inverted variants do not
exist and are not written speculatively.

## 4. Typography

Space Grotesk for Latin text and all figures. Noto Sans SC for Chinese. Both are
served from Google Fonts — the CDN exception is recorded in SCOPE.md section 3.

The Chinese stack is NOT in STYLE.css as of v001. Noto Sans SC is a Simplified
face, and whether the site is Simplified or Traditional is still open per SCOPE.md
section 3. Loading it now would silently decide that. The stack is added when that
decision lands.

Weights: 900 headline, 700 figures and emphasis, 500 medium, 400 body.

| Token | Size | Use |
|---|---|---|
| `--mt-text-display` | `clamp(2.5rem, 5vw, 4rem)` | Hero only, once per page |
| `--mt-text-h1` | `3rem` | Page title |
| `--mt-text-h2` | `2.125rem` | Section heading |
| `--mt-text-h3` | `1.375rem` | Subsection heading |
| `--mt-text-lg` | `1.125rem` | Lead paragraph |
| `--mt-text-base` | `1rem` | Body |
| `--mt-text-sm` | `0.875rem` | Captions, table cells |
| `--mt-text-xs` | `0.75rem` | Tracked micro-labels |

Root is 16px. Line heights: 1.05 display, 1.2 headings, 1.7 body.

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

### Deferred

Header, footer, nav and the dropdown mechanism are NOT specified in v001. Those
decisions are made when `partials.html` is designed, and recording them before
that would be guessing. The dropdown mechanism is named `.mt-has-dropdown` in
SCOPE.md; nothing else about it is settled.

## 7. The stylebook

`int-stylebook.html` renders every token and pattern in this file live. It is an
internal page: `noindex,nofollow`, linked from nowhere, no robots.txt entry, per
SCOPE.md.

**It ships in the same commit as STYLE.css, always.** A stylebook that lags the
CSS is worse than no stylebook, because it reports a state the site is not in. If
a change to STYLE.css cannot be reflected in the stylebook in the same commit, the
change waits.

As of v001 the stylebook carries no header or footer section, because
`partials.html` does not exist. It gains one when partials is built. It does not
carry an inline copy of the nav in the meantime — a duplicate is exactly the drift
this section exists to prevent.

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
| — | — | — |

Empty as of v001. No page has been built.
