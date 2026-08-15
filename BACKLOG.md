v016 | 2026-08-15 | 64 lines
# Backlog

The backlog for micronturbo.com. Tracks both short-term items (bugs, UI
improvements) and long-term ones (features, new pages). The process that
governs this file is CLAUDE.md Part C, "how-to: maintain the backlog", which
is ACTIVE for this project.

## Schema

`| ID | Status | Category | Item | Raised | Closed-by |`

- **ID** — `BL-###`, assigned at flush in cumulative sequence from the last
  BL number in this file. Never reused, never renumbered.
- **Raised** — the date the item entered the running block, `yyyy-mm-dd`.
- **Item** — one line. A literal pipe character must be escaped as `\|`, or it
  silently breaks the rendered view.

## Status

- **open** — raised, not started.
- **in-progress** — actively being worked.
- **review** — work is done and awaiting the human's check. Code moves items
  here; code never self-closes.
- **closed** — verified by the human. Closing is the human's alone and
  requires evidence in Closed-by: the `PR##` for code, or a stated reason
  otherwise.
- **discard** — will not be done. Requires the reason in Closed-by. A discard
  without a recorded reason is a vanished row.

Closed-by stays empty on every other status.

## Category

- **bug** — something is broken.
- **feature** — new functionality or a new page.
- **content** — copy, images, metadata, SEO artifacts.
- **style** — design-system and visual work; STYLE.md / STYLE.css.
- **infra** — DNS, hosting, certificates, build and deploy.
- **governance** — the governance docs and the processes themselves.

## Items

| ID | Status | Category | Item | Raised | Closed-by |
|---|---|---|---|---|---|
| BL-001 | closed | content | Remove `noindex,nofollow` from index.html when the placeholder is replaced by the real home page | 2026-08-07 | PR02 |
| BL-002 | open | infra | DMARC is set to `p=quarantine` with no SPF record and no MX; mail sent from or to micronturbo.com will bounce or be quarantined if the domain is ever used for email | 2026-08-07 | |
| BL-003 | open | infra | Decide whether to enable the Cloudflare proxy (orange cloud) on the apex and www records; requires SSL/TLS mode set to Full first, as Flexible causes a redirect loop against GitHub Pages | 2026-08-07 | |
| BL-004 | open | content | Build 404.html | 2026-08-07 | |
| BL-005 | open | content | Add sitemap.xml and robots.txt | 2026-08-07 | |
| BL-006 | closed | feature | Build `int-backlog.html`, the rendered backlog view; until it exists, Part C flush verification is performed in the raw file | 2026-08-07 | verified manually by human 2026-08-09 |
| BL-007 | open | style | Logo not finalized — export the Power Flame logo (variant 4a) from Claude Design to real SVG files: two-color dark, two-color light, and mono; plus the favicon renders at 16/32/48 | 2026-08-07 | |
| BL-008 | closed | style | Build STYLE.css and int-stylebook.html together on a branch, per STYLE.md section 7 | 2026-08-07 | PR01 |
| BL-009 | closed | style | Confirm or replace the placeholder Chinese/English names for `--mt-surface` (舱体蓝 Cabin) and `--mt-surface-high` (仪表蓝 Instrument); both were coined outside the Chinese identity source | 2026-08-07 | names confirmed by human 2026-08-08 |
| BL-010 | open | feature | Build the Traditional Chinese pages once Simplified is complete; needs a filename convention for a second Chinese script, a third partials file, a three-way language toggle, and a rewrite of the `-zh` suffix rule in SCOPE.md section 3 | 2026-08-07 | |
| BL-011 | open | governance | Write PROCESS.md, the procedure for building or adding a page; SCOPE.md section 3 defers it until the first real page exists, which it now does | 2026-08-07 | |
| BL-012 | open | content | Build `products`, `about`, `contact` and `privacy` in both languages; all four are linked from the nav and 404, and the hero's secondary button points at `contact` | 2026-08-07 | |
| BL-013 | closed | bug | `partials.js` fetched the header with default caching, so a browser could inject a stale nav into a current page — it kept rendering 繁 after the site switched to 简. Fixed by revalidating with `cache: 'no-cache'` | 2026-08-07 | PR04 |
| BL-014 | open | content | Confirm with the tech team what the 2 kW/kg power-density figure measures — turbine core, engine module, or complete system — and whether it is a platform peak rather than a launch-SKU figure; neither launch SKU reaches it (MT-6K ~600 W/kg, MT-75K ~1,875 W/kg) | 2026-08-08 | |
| BL-015 | closed | content | Replace the three Chinese placeholder pages (`products-zh.html`, `products-6k-zh.html`, `products-75k-zh.html`) with real translated content and remove their `noindex,nofollow` | 2026-08-08 | verified manually by human 2026-08-09 |
| BL-016 | open | content | Privacy pages carry `[LEGAL ENTITY NAME]`, `[REGISTERED ADDRESS]` and `[JURISDICTION]` placeholders and are `noindex,nofollow` until filled and reviewed | 2026-08-15 | |
| BL-017 | open | content | Chinese pages ship without PIPL treatment, deferred until the entity is confirmed. If mainland readers are in scope, cross-border transfer needs separate consent — a distinct checkbox on `contact-zh.html`, not the implied consent it currently uses — and `privacy-zh.html`'s 信息存放在哪里 section needs rewriting to match | 2026-08-15 | |
| BL-018 | review | feature | Build `contact-zh.html` — nav in `partials-zh.html` links it and it 404s. Blocked on audience: mainland readers cannot reach script.google.com, so the form needs a second endpoint or a graceful failure with an alternative contact route | 2026-08-15 | |
| BL-019 | open | feature | Readers who cannot reach script.google.com get the failure state on `contact-zh.html` with no alternative contact route offered. Revisit once the audience is settled | 2026-08-15 | |
