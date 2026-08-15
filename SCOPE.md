v018 | 2026-08-15 | 358 lines
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
  which is BUILT; Part C flush verification is performed there
- **LANGUAGE.md** — the canonical ENGLISH termbase. English is the source of
  truth for terminology and the file carries no translations: it records which
  word the site uses for a thing and why. Each language keeps its own
  `LANGUAGE-xx.md` keyed to the English term, `LANGUAGE-zh.md` being the first.
  The English term is the join key, so renaming one is an edit to every language
  file in the same commit; a term with no row in a language file is an
  untranslated gap rather than an omission. Only terms where the wrong choice is
  tempting earn a row. Which words are used lives here — how they are set lives
  in STYLE.md
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

- **Exception taken: Google Apps Script form endpoint.** The contact form POSTs
  to a Google Apps Script web app on `script.google.com`, which appends the
  submission as a row to a Google Sheet. Taken because the site is static and
  GitHub Pages has no backend to post to, so a form either goes to a third party
  or does not exist.

  The sheet is the delivery path, not a copy of one. No mail is configured on
  `micronturbo.com` — BL-002 records DMARC at `p=quarantine` with no SPF and no
  MX — so there is no email route to fall back to and nothing here depends on
  one. That also means BL-002 does not block this page, which is the opposite of
  how it would read at a glance.

  Unlike the fonts exception this is NOT in the critical path: the request fires
  on submit, not on load, and a visitor who never submits never touches Google
  from this page. The cost is different in kind rather than in weight — whatever
  a visitor types into the form leaves the site and lands in a third-party
  document, which is a privacy fact `privacy.html` has to state plainly rather
  than a performance one.

  The endpoint URL is deployment-specific and lives in the page, not here; a
  redeploy of the script changes it. Consumers: `contact.html`.

  **The script's source is versioned here as `Code.gs` at the repo root, and it
  is the one file in the repo that pushing does not deploy.** Everything else
  here goes live when it reaches main; `Code.gs` goes live only when its
  contents are pasted into the Apps Script editor and a new version of the
  existing deployment is published by hand. Editing it and merging changes
  nothing that a visitor can reach, which is the opposite of every other file's
  behavior and the reason it is stated rather than assumed.

  It is kept under version control anyway, because the endpoint is one contract
  split across two systems and the page has to honor the half that runs in
  Google. Keeping only the page half is what let the two drift: the script
  required a subject the form treated as optional, dropped submissions under a
  timing threshold the page set lower, and rejected email addresses the page
  accepted — three failures invisible from either half alone, and all three
  found by reading them side by side.

  `doGet` answers a health check, so opening the `/exec` URL in a browser
  confirms which version is deployed without writing a row.

- **Dependency note, NOT a CDN exception: vendored icons.** The product pages
  carry six icons and the form patterns add a seventh, vendored inline as SVG
  markup in the page. Nothing is fetched at runtime and nothing is installed at
  build time, so this takes no exception against the rule above — it is recorded
  because the artwork is third-party and the licenses travel with it.

  | Icon | Source | License |
  |---|---|---|
  | Feather | Bootstrap Icons | MIT |
  | Clock, fuel, leaf, snowflake, zap | Lucide | ISC |
  | Circle-alert | Lucide | ISC |

  Both licenses permit use and modification with attribution retained. Inline
  rather than a sprite or an icon font because seven icons do not justify
  either, and inline SVG takes `currentColor`, which is what lets the
  categorical hues come from tokens.

  Circle-alert is the seventh, and it is the leading icon on
  `.mt-field__error`. `currentColor` is doing the same job there as it does for
  the six above, but for a semantic token rather than a categorical one: the
  icon inherits `--mt-error` from the message it sits in and carries no color of
  its own.

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

The toggle is BUILT and resolves across all four page pairs. Both partials files
carry it, each pointing one direction only, and the toggle anchor carries an
`hreflang` attribute naming the language it offers — `zh-Hans` on the English
toggle, `en` on the Chinese one. That attribute sits on the anchor, not in the
head. It is not an SEO alternate and never was; the head-level
`<link rel="alternate" hreflang>` that each page carries is a separate artifact,
and it is the one the resolver reads.

That link is the authoritative existence signal for a counterpart page, because
it is written by hand only where a counterpart really exists.
`resolveLangToggle()` in `partials.js` reads the toggle anchor's own `hreflang`
to learn which language the toggle offers, finds the matching
`link[rel="alternate"]` in the page's own head, and sets that href on the anchor
after the partials are injected. The counterpart filename is NOT derived from
the `-zh` suffix: a derived URL cannot be known to exist, and a toggle that 404s
is worse than one that lands on the home page. A page whose alternate is
missing, empty, or stale sends its toggle to the language home page.

This is the one thing the suffix convention does not give for free. A new
translated page must carry a reciprocal alternate on BOTH sides — the new page
pointing at its counterpart, the counterpart pointing back — or its toggle
silently goes home, with no error in the console and nothing wrong on the page.
Everything else about adding a page remains filename-driven.

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

Planned external pages: `index.html` (Home), `products.html`,
`products-6k.html`, `products-75k.html`, `about.html`, `contact.html`,
`privacy.html`.

The two SKU pages are children of the hub, reachable from the Products dropdown
and from the hub's own SKU cards. They are the first pages below the top level.

**Every planned external page is now built in English**: `index.html`,
`products.html`, `products-6k.html`, `products-75k.html`, `about.html`,
`contact.html` and `privacy.html`. All seven are indexable. The
`noindex,nofollow` placeholder that stood in during DNS and certificate setup
was replaced wholesale on the home page and the directive is gone from every
page that carried it. No nav link in either language 404s.

**The Chinese tree now matches it page for page**: `index-zh.html`,
`products-zh.html`, `products-6k-zh.html`, `products-75k-zh.html`,
`about-zh.html`, `contact-zh.html` and `privacy-zh.html`. All seven are
indexable, and all seven pairs carry reciprocal alternates in both directions,
so no toggle anywhere on the site falls back to a language home page.

Section 1 says either language may carry pages the other does not, and that
remains the rule rather than a description of today. The trees happen to be
level; nothing requires them to stay that way, and the `-zh` suffix convention
plus the alternate-driven toggle exist precisely so they can diverge without
breaking navigation. This paragraph is a count, not a constraint — it is the
sentence to correct when the two next differ, not a reason to hold a page back.

`contact.html` was for a time the one page with no Chinese counterpart, and the
first to rely on the toggle fallback rather than a reciprocal alternate. That
is no longer true — `contact-zh.html` exists, the pair carries alternates in
both directions, and the Chinese nav, home hero and hub CTA all resolve. The
fallback itself is unchanged and still specified above; it simply has no
consumer among the built pairs.

`contact.html` is also the first page that takes input rather than presents it.
The form patterns it uses are in STYLE.css section 11 and STYLE.md section 6;
the endpoint it posts to is the Apps Script exception recorded above.

`about.html` is the first page built from the bio card, `.mt-bio` in STYLE.css
section 13, and the first to consume `.mt-stat`, `.mt-datum`, `.mt-grid--3` and
`.mt-grid--4` — four patterns carried from the identity system in v001 that had
sat with no page consumer until it shipped. It is also the only English page
that fetches Noto Sans SC, because its bio cards set Han names under
`lang="zh-Hans"`.

`products-zh.html`, `products-6k-zh.html` and `products-75k-zh.html` carry real
translated content and are indexable. They stood as holding pages under
`noindex,nofollow` while the Chinese dropdown needed somewhere to point; that
directive is gone, and the Chinese product tree is now live in full.

Each was built by copying its English counterpart and replacing text in place,
so the three pairs are structurally identical — same classes, same inline
styles, same vendored SVGs, same image sources and crop positions. That is the
convention for a translated page, not an accident of how these three were made:
it keeps every STYLE.css pattern proven once rather than once per language, and
it makes a structural diff against the English page a usable check. A Chinese
page that needs different markup is a signal that the pattern, not the page,
needs work. Terminology comes from `LANGUAGE-zh.md`; the typographic
consequences of setting that terminology are in STYLE.md.

The partials files are the source of truth for the nav, and therefore for which
pages are publicly reachable — a page not linked there is live but unlisted. No
doc restates it, and no doc tracks visibility separately. Each language's nav is
authoritative for that language only, so the two may list different page sets;
a page that exists but is not linked from its own language's partials is
unlisted in that language. Dropdowns are flat and single-tier, using the
`.mt-has-dropdown` mechanism, which is now BUILT and used by Products in both
languages — the English parent lists MT-6K and MT-75K, the Chinese parent lists
the same two under the same product names. The parent link still navigates to
the hub; the keyboard map and the mobile behavior are specified in STYLE.md
section 6. Both partials files exist, along with `partials.js`, which derives
which one to fetch from the page's own filename and wires the dropdown after
injection.

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
- `int-backlog.html` — BUILT. The rendered backlog view, and the place Part C
  flush verification is performed. Fetches BACKLOG.md at runtime with
  `cache: 'no-cache'`, so it revalidates rather than reporting the state before
  a flush that was pushed moments earlier.
- `int-language-zh.html` — BUILT. The EN/CN pair review page. Puts each English
  page beside its Chinese counterpart, slot by slot, and highlights any Chinese
  cell carrying a `变体` (a rejected form) or a `泛称` (a generic term that may
  want narrowing) from LANGUAGE-zh.md. It holds NO copy of its own: the page
  pairs and both LANGUAGE files are fetched at load time with
  `cache: 'no-cache'` and paired by DOM position, so it cannot drift from the
  pages it reviews. A snapshot needing regeneration whenever copy changes is
  the failure mode the page exists to avoid.

  **Which pairs it reviews is a hand-maintained list, and it is the one part of
  this page that does drift.** `PAIRS` near the top of the file names the
  English pages; everything else about a pair is derived. It holds four — index,
  products and the two SKU pages — while the site now has seven, so `about`,
  `contact` and `privacy` are built, paired and NOT reviewed. Any pair added
  later is invisible here until someone edits that array. The page reports its
  own count in the header ("四组页面结构一致"), which is what makes the gap
  findable, but nothing warns that a pair is missing: an unreviewed pair looks
  exactly like a pair with no problems. Adding a pair to the site is therefore
  two edits, not one, and three of the seven are currently outstanding.

  Its chrome — headings, column labels, legend, error states — is in Chinese,
  unlike the other two internal pages. This is deliberate and not an
  inconsistency: `int-stylebook.html` and `int-backlog.html` are read by the
  maintainer, while this page is read by the Chinese-side marketing and
  engineering reviewers, and a review tool in a language its reviewers do not
  read is a tool nobody uses.

  The filename is the configuration. `int-language-zh.html` reads
  `LANGUAGE-zh.md` and the `-zh` page pairs; a future `int-language-ja.html`
  would read `LANGUAGE-ja.md` and the `-ja` pairs, with no other change to the
  convention.

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
