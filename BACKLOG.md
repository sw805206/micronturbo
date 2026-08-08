v008 | 2026-08-08 | 58 lines
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
| BL-005 | open | content | Add favicon, sitemap.xml and robots.txt | 2026-08-07 | |
| BL-006 | open | feature | Build `int-backlog.html`, the rendered backlog view; until it exists, Part C flush verification is performed in the raw file | 2026-08-07 | |
| BL-007 | open | style | Export the Power Flame logo (variant 4a) from Claude Design to real SVG files: two-colour dark, two-colour light, and mono; plus favicon renders at 16/32/48. Blocks partials.html | 2026-08-07 | |
| BL-008 | closed | style | Build STYLE.css and int-stylebook.html together on a branch, per STYLE.md section 7 | 2026-08-07 | PR01 |
| BL-009 | close | style | Confirm or replace the placeholder Chinese/English names for `--mt-surface` (舱体蓝 Cabin) and `--mt-surface-high` (仪表蓝 Instrument); both were coined outside the Chinese identity source | 2026-08-07 | names confirmed by human 2026-08-08 |
| BL-010 | open | feature | Build the Traditional Chinese pages once Simplified is complete; needs a filename convention for a second Chinese script, a third partials file, a three-way language toggle, and a rewrite of the `-zh` suffix rule in SCOPE.md section 3 | 2026-08-07 | |
| BL-011 | open | governance | Write PROCESS.md, the procedure for building or adding a page; SCOPE.md section 3 defers it until the first real page exists, which it now does | 2026-08-07 | |
| BL-012 | open | content | Build `products`, `about`, `contact` and `privacy` in both languages; all four are linked from the nav and 404, and the hero's secondary button points at `contact` | 2026-08-07 | |
| BL-013 | closed | bug | `partials.js` fetched the header with default caching, so a browser could inject a stale nav into a current page — it kept rendering 繁 after the site switched to 简. Fixed by revalidating with `cache: 'no-cache'` | 2026-08-07 | PR04 |
