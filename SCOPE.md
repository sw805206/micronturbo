v004 | 2026-08-07 | 173 lines
# Scope

## 1. Project

This repo holds micronturbo.com, a multi-page static company website.

Content is supplied by the human. Style direction comes from Claude Design,
captured in STYLE.css (tokens, shared patterns) with the decisions recorded in
STYLE.md.

The site will be multi-language, starting with English and Chinese. English is
the master in the editorial sense: English pages are written first and Chinese
follows from them, but there is no guaranteed one-to-one mapping and either
language may carry pages the other does not. Translated pages carry a filename
suffix — see section 3.

**Where it lives**

- Git repo: `https://github.com/sw805206/micronturbo`
- Local repo: `/Users/swai/sw805206/micronturbo`
- Hosting: GitHub Pages, deployed from `main`
- Domain: `micronturbo.com` (apex), owned, DNS managed on Cloudflare under
  `sw805206@icloud.com`. Pages custom domain, DNS records and CNAME file are
  configured by the human immediately after this initial commit.

## 2. Governance docs

Product docs, all in this repo:

- **SCOPE.md** — this file
- **BACKLOG.md** — the backlog table. Its rendered view is `int-backlog.html`,
  which is not yet built; until it exists, Part C flush verification is
  performed in the raw file
- **STYLE.md** — design-system decisions in words; the ratchet record of which
  page defined which pattern
- **STYLE.css** — design tokens and shared patterns; the single source of truth
  for all styling. Not yet created: it is publicly served, so per CLAUDE.md
  Part B it is built on a branch and merged by PR, not committed here

PROCESS.md is planned but does not yet exist. Each is added to this list in
the same commit that creates it. Until a doc is listed here it is not required
reading and its absence is not a blocker under CLAUDE.md Part A.

The CLAUDE.md Part C backlog process is ACTIVE for this project.

CLAUDE.md is deliberately not on that list: it holds universal working rules,
not product ones, and is synced from the disk master at
`/Users/swai/sw805206/CLAUDE.md`.

## 3. Architecture and conventions

There is no separate ARCHITECTURE.md — the site is small enough that this
section covers it.

### Stack and constraints

- Static multi-page HTML with vanilla JS. No frameworks (no React/Vue/jQuery,
  no Tailwind). STYLE.css is plain CSS with variables.

- Lean dependencies. Per-page CDN loads are by exception only, and each
  exception is recorded here before it is taken.

- **Exception taken: Google Fonts.** Space Grotesk (Latin and figures) and, once
  the Simplified/Traditional decision lands, Noto Sans SC (Chinese), loaded from
  `fonts.googleapis.com` with `preconnect`. Taken rather than self-hosting
  because Google serves CJK faces as unicode-range subsets, so a Chinese page
  fetches only the glyphs it uses; self-hosting Noto Sans SC correctly would mean
  running that subsetting ourselves, and self-hosting it naively would put a
  multi-megabyte font on every Chinese page. The cost is a third-party request in
  the critical path on every page. Consumers: all pages, via STYLE.css.

- All internal links are RELATIVE paths, for portability.

- Shared header and footer are served from a partials file, fetched per page.
  There is one per language: `partials.html` for English, `partials-zh.html`
  for Chinese. Which one a page fetches is derived from its own filename, not
  configured per page.

### Multi-language

DECIDED. Translated pages carry a filename suffix and live flat in the root
alongside their English counterparts: `products.html` and `products-zh.html`.
No language subdirectory. This keeps every page at one depth, so the
relative-path rule holds unchanged and no page needs `../` to reach a shared
asset. The cost is a busier root directory as pages and languages accumulate;
if that becomes the binding problem, the structure converts to subdirectories
by a mechanical move plus a path rewrite.

The `-zh` suffix is the single rule that drives everything. A page ending
`-zh.html` is Chinese, sets `lang` accordingly, and fetches `partials-zh.html`;
every other page is English and fetches `partials.html`. Adding a page requires
no configuration anywhere — the filename is the configuration.

The language toggle is a nav element and therefore lives in the partials files.
Each partials file points one direction only, so the markup carries no
conditional: `partials.html` offers Chinese, `partials-zh.html` offers English.
The toggle resolves to the current page's counterpart when it exists, and to
the home page in the other language when it does not. That fallback is what
lets the two language trees diverge without breaking navigation.

The toggle is NOT built until the first Chinese page exists. Until then it
would point at nothing, and suppressing it would need a list of translated
pages that has no other purpose. `partials.html` ships with the nav and no
toggle; the toggle and `partials-zh.html` are built together.

Still open: whether Chinese is Simplified or Traditional, which sets the `lang`
value (`zh-Hans` or `zh-Hant`), the CJK font stack in STYLE.css, and the
register the copy is written in. Deferred until the CJK font stack or the first
Chinese page is on the table, whichever comes first. Also deferred: `hreflang`
attributes, which are added when the second language is actually built —
reciprocal tags pointing at pages that do not exist are worse than none.

### Pages

Planned external pages: `index.html` (Home), `products.html`, `about.html`,
`contact.html`, `privacy.html`.

Only `index.html` exists, and only as a temporary placeholder carrying
`noindex,nofollow` so that Pages has something to serve while DNS and the
certificate are configured. It is replaced wholesale by the real home page and
carries no style, no partials and no content decisions.

The partials files are the source of truth for the nav, and therefore for which
pages are publicly reachable — a page not linked there is live but unlisted. No
doc restates it, and no doc tracks visibility separately. Each language's nav is
authoritative for that language only, so the two may list different page sets;
a page that exists but is not linked from its own language's partials is
unlisted in that language. Dropdowns are flat and single-tier, using the
`.mt-has-dropdown` mechanism. Neither partials file exists yet.

### Internal pages

Internal reference pages are published to the live site so they stay
bookmarkable from any device. They carry
`<meta name="robots" content="noindex,nofollow">`, are linked from nowhere, and
get NO `robots.txt` entry — a disallow would stop crawlers fetching the page and
therefore stop them ever reading the noindex, which is the opposite of what is
wanted.

This is obscurity, not privacy. Static hosting has no auth layer, so these pages
remain publicly fetchable by anyone who knows the URL; nothing client-sensitive
belongs on them.

None exist yet. Two are planned:

- `int-backlog.html` — the rendered backlog view, and the place Part C flush
  verification is performed. Fetches BACKLOG.md at runtime. Until it is built,
  flushes are verified in the raw file.
- `int-stylebook.html` — renders every STYLE.css token and pattern live. Per
  STYLE.md section 7 it ships in the same commit as STYLE.css, always.

### Build approach

- Foundations first: colors, fonts, type scale, spacing scale, and the shared
  header/footer live in STYLE.css.

- Later pages reuse rather than reinvent. The reuse check and the ratchet record
  live in STYLE.md.

- A pattern used on two or more pages belongs in STYLE.css. A genuine one-off
  may stay in a page-local style block, but must be built from existing tokens
  — `var(--mt-*)`, the spacing and type scales — never raw hex or px, and it
  gets a one-line note in STYLE.md's ratchet record so the next page that wants
  it promotes it instead of rebuilding it. STYLE.md holds the full rule.

- The procedure for building or adding a page lives in PROCESS.md, which is
  written after the first real page is built rather than guessed at before.

### Code discipline

Per CLAUDE.md Part B, which governs. One project fact it cannot know: this site
deploys from `main`, so Part B's protect-main rules apply in full.
