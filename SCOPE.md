v002 | 2026-08-07 | 125 lines
# Scope

## 1. Project

This repo holds micronturbo.com, a multi-page static company website.

Content is supplied by the human. Style direction comes from Claude Design,
captured in STYLE.css (tokens, shared patterns) with the decisions recorded in
STYLE.md.

The site will be multi-language, starting with English and Chinese. English is
the master. The English site is built first; the directory-vs-suffix structure
for translated pages is UNDECIDED and must be settled before the second page is
built — see section 3.

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

STYLE.md, STYLE.css and PROCESS.md are planned but do not yet
exist. Each is added to this list in the same commit that creates it. Until a
doc is listed here it is not required reading and its absence is not a blocker
under CLAUDE.md Part A.

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
  exception is recorded here before it is taken. There are currently no
  exceptions.

- All internal links are RELATIVE paths, for portability.

- Shared header and footer are served from `partials.html`, fetched per page.

### Multi-language — OPEN

Undecided: whether translated pages live in a language subdirectory
(`/zh/products.html`) or carry a filename suffix (`products-zh.html`). The
choice interacts with the relative-path rule and with serving one
`partials.html` to every page, so it is settled before the second page is
built, not after. Also open: language switcher mechanism, `lang`/`hreflang`
attributes, and whether STYLE.css needs a CJK font stack.

### Pages

Planned external pages: `index.html` (Home), `products.html`, `about.html`,
`contact.html`, `privacy.html`.

Only `index.html` exists, and only as a temporary placeholder carrying
`noindex,nofollow` so that Pages has something to serve while DNS and the
certificate are configured. It is replaced wholesale by the real home page and
carries no style, no partials and no content decisions.

`partials.html` is the source of truth for the nav, and therefore for which
pages are publicly reachable — a page not linked there is live but unlisted. No
doc restates it, and no doc tracks visibility separately. Dropdowns are flat and
single-tier, using the `.tf-has-dropdown` mechanism. It does not exist yet.

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

None exist yet. `int-backlog.html` — the rendered backlog view, and the place
Part C flush verification is performed — fetches BACKLOG.md at runtime. It is
not yet built; until it is, flushes are verified in the raw file.

### Build approach

- Foundations first: colors, fonts, type scale, spacing scale, and the shared
  header/footer live in STYLE.css.

- Later pages reuse rather than reinvent. The reuse check and the ratchet record
  live in STYLE.md.

- A pattern used on two or more pages belongs in STYLE.css. A genuine one-off
  may stay in a page-local style block, but must be built from existing tokens
  — `var(--tf-*)`, the spacing and type scales — never raw hex or px, and it
  gets a one-line note in STYLE.md's ratchet record so the next page that wants
  it promotes it instead of rebuilding it. STYLE.md holds the full rule.

- The procedure for building or adding a page lives in PROCESS.md, which is
  written after the first real page is built rather than guessed at before.

### Code discipline

Per CLAUDE.md Part B, which governs. One project fact it cannot know: this site
deploys from `main`, so Part B's protect-main rules apply in full.
