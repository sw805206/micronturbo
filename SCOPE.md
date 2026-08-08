v006 | 2026-08-07 | 181 lines
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
  for all styling. It is publicly served, so per CLAUDE.md Part B every change
  to it goes on a branch and merges by PR, never direct to main

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

- **Exception taken: Google Fonts.** Space Grotesk (Latin and figures) and Noto
  Sans SC (Chinese), loaded from
  `fonts.googleapis.com` with `preconnect`. Taken rather than self-hosting
  because Google serves CJK faces as unicode-range subsets, so a Chinese page
  fetches only the glyphs it uses; self-hosting Noto Sans SC correctly would mean
  running that subsetting ourselves, and self-hosting it naively would put a
  multi-megabyte font on every Chinese page. The cost is a third-party request in
  the critical path on every page. Loaded by `<link>` tags in each page's own
  `<head>`, not by an `@import` in STYLE.css — see STYLE.md section 4 for why.
  Consumers: all pages.

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

The toggle is BUILT, as of the home page. Both partials files carry it, each
pointing one direction only, and each carries a reciprocal `hreflang`. Until a
second translated page exists both toggles resolve to the other language's home
page, which is the documented fallback rather than a gap.

DECIDED: Chinese is **Simplified**. `lang="zh-Hans"`, `hreflang="zh-Hans"`, and
the CJK stack in STYLE.css is Noto Sans SC / PingFang SC / Microsoft YaHei. The
Chinese wordmark is 安恒燃动, matching STYLE.md section 2.

Traditional was built first and merged, then replaced. It is deferred until
Simplified is complete, and is not carried alongside in the meantime: the `-zh`
suffix is a single slot, so two Chinese scripts cannot coexist under the current
convention. Adding Traditional later means a filename convention for a second
Chinese script, a third partials file, a three-way toggle, and a rewrite of the
suffix rule below — it is a structural change, not a translation pass.

### Pages

Planned external pages: `index.html` (Home), `products.html`, `about.html`,
`contact.html`, `privacy.html`.

Built: `index.html` and `index-zh.html`, the home page in both languages. The
`noindex,nofollow` placeholder that stood in during DNS and certificate setup
has been replaced wholesale and the directive is gone — the home page is
indexable. `products`, `about`, `contact` and `privacy` are linked from the nav
in both languages but do not exist yet, so those links 404 until they are
built.

The partials files are the source of truth for the nav, and therefore for which
pages are publicly reachable — a page not linked there is live but unlisted. No
doc restates it, and no doc tracks visibility separately. Each language's nav is
authoritative for that language only, so the two may list different page sets;
a page that exists but is not linked from its own language's partials is
unlisted in that language. Dropdowns are flat and single-tier, using the
`.mt-has-dropdown` mechanism, which is named but not yet built — no page has
needed a dropdown. Both partials files exist, along with `partials.js`, which
derives which one to fetch from the page's own filename.

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

- `int-stylebook.html` — BUILT. Renders every STYLE.css token and pattern live.
  Per STYLE.md section 7 it ships in the same commit as STYLE.css, always.
- `int-backlog.html` — the rendered backlog view, and the place Part C flush
  verification is performed. Fetches BACKLOG.md at runtime. NOT yet built; until
  it is, flushes are verified in the raw file.

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
