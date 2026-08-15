v006 | 2026-08-15 | 218 lines
# Language

The canonical termbase for micronturbo.com, in ENGLISH. English is the source
of truth for terminology: this file records which word the site uses for a
thing and why, and it contains no translations.

Each language keeps its own file — `LANGUAGE-zh.md` for Simplified Chinese —
keyed to the English term in section 7.

## 1. Rules

**The EN term is the join key.** Every row in every language file is matched to
a row here by its English term, not by position and not by meaning. Renaming an
English term is therefore an edit to every language file, in the same commit.
A rename that lands alone silently orphans every translation of it.

**A term with no row in a language file is an untranslated gap, not an
omission.** The language files are allowed to be incomplete. A missing row says
"nobody has decided this yet" and is a question for the reviewers of that
language; it is not a defect in this file and does not block anything here.

**Only terms where the wrong choice is tempting earn a row.** This is not a
glossary of the site's vocabulary. A word earns a row when a competent
translator or writer, working without it, would plausibly reach for something
else — a near synonym that shifts the claim, a literal rendering that narrows
it, or a company-deck phrase the site has deliberately moved away from. Words
with one obvious rendering do not earn a row, and adding them dilutes the ones
that do.

## 2. English variant

**The site is written in American English.** Spelling and word choice follow US
usage:

gray not grey · meter not metre · liter not litre · metric ton not tonne ·
-ize not -ise (organize, optimize, realize) · -or not -our (color, favor,
labor) · center not centre · analyze not analyse · license as both noun and
verb · defense not defence · catalog not catalogue · program not programme ·
aluminum not aluminium · story not storey (a floor of a building) · single
-l- in inflections (traveled, fueled, modeling, canceled).

The list is illustrative, not exhaustive — US usage governs whether or not a
given pair appears above. Checking copy against these examples alone is how a
British form survives a sweep: `behaviour`, `labelled` and `storey` all did,
each belonging to a class named here without being spelled out.

This applies to **alt text and HTML comments** as well as visible copy. Mixed
spellings in comments get reproduced in copy: a comment is where the next
writer looks to see how the last one spelled something.

By the same reasoning it applies to **the governance docs** — this file,
SCOPE.md, STYLE.md, BACKLOG.md and the comment blocks in STYLE.css. They are
not published, but they are the prose a writer reads immediately before writing
page copy, and a spelling met there is the spelling that gets reproduced. The
one exception is this section, which has to name the rejected forms in order to
reject them.

**No contractions.** The site writes "it is", "does not", "cannot" in full.

**SI unit symbols are unaffected** — they are international, not English.

**American English does NOT license imperial units.** The site is metric
throughout: kW, kg, W/kg, °C, m, rpm, h. US spelling and US customary units are
separate decisions, and only the first has been made.

## 3. Localization policy

**Leads and scenario copy are LOCALIZED, not translated.** Paragraph count,
rhythm, framing and which scenarios are named may differ between languages. A
lead that lands in English may need three paragraphs where another language
needs two, or may need to name a different set of situations to reach the same
reader.

**What must hold across languages is TERMS** — especially any term that also
appears as a repeated label elsewhere on the same page. A comparison label that
drifts between its column heading and the prose around it reads as two
different things being compared.

**Chinese copy deliberately takes a stronger register than the English.** This
is intended, not drift, and should not be flattened toward the English on the
grounds that the two do not match.

## 4. Scope

This file owns **which words are used**. It does not own how they are set.

Typographic and CSS treatment lives in STYLE.md: the tracked micro-label and
its Latin-only restriction, the English-only Chicago title case at h1 and h2,
and any `:lang()` override that resets tracking or case for CJK. A decision
about letter-spacing, capitalization or font stack is a STYLE.md decision even
when it is provoked by a translation.

The dividing question is whether the decision would survive a change of
typeface. If it would, it belongs here; if it would not, it belongs in
STYLE.md.

## 5. Privacy

This file and every language file are committed to a public repo, and any page
built from them is publicly fetchable. Static hosting has no auth layer.

No competitor pricing. No unpublished performance claims. A figure that has not
cleared for publication does not get a row here on the grounds that a termbase
is an internal document — it is not one.

## 6. Units and numbers

**SI symbols stay Latin in figures and spec lines**: kW, kg, W/kg, °C, m, rpm,
h. This holds in every language. The figure patterns — the one-liner band, the
comparison table, the feature-row spec — set figures in tabular numerals, and a
local unit word breaks the column alignment those patterns exist to provide.

**Prose may use local unit words.** A sentence of running copy is not a column
and is free to say the unit however that language says it.

**Comma every three digits**: 2,000 W/kg, 160,000 rpm, 3,000 hours.

That rule applies to **measurement figures in copy** and to nothing else —
4,000 m, 3,000 hours, 2,000 W/kg, 160,000 rpm. It does NOT apply to CSS values
and breakpoints (1000px, 1180px), hex colors, years, version stamps, or line
counts. The scope has to be stated because a blind four-digit sweep would
corrupt every one of those, and the sweep is the obvious way to enforce the
rule.

Note that ISO and SI both permit an unseparated four-digit number, so 4000 m is
not wrong in the abstract. This site takes the comma for internal consistency:
3,000 小时 and 2,000 W/kg are already set that way, and a page carrying both
forms is the actual defect.

**En dash for ranges, no spaces**: 9–12 kg, 500–800 hours, 50–130 W/kg.

**Power density is expressed in W/kg site-wide; battery capacity in kWh.** Never
kW/hr — that is not a unit of power density, and it is the error a reader who
half-remembers kWh reaches for.

### Punctuation

**Punctuation follows the conventions of the language it appears in, never the
other language's.**

English takes `,` and `—` with surrounding spaces.

Chinese takes `，` and `——`. The 破折号 is two em-widths per GB/T 15834 and
carries no surrounding spaces. Chinese uses `、` only between list items and
`，` between clauses, including before 还是 and 而非.

## 7. Terms

### Market and product categories

| EN | Definition |
|---|---|
| mobile power | The market category the site competes in: power that travels to where the work is. Deliberately broad — it includes trailer-mounted sets, which a person cannot carry. The category, not a claim about any one product. |
| portable power | The subset of mobile power that a person moves without machinery. Narrower than mobile power and not a synonym for it: every portable product is mobile, and the trailer-mounted majority of the category is not portable. |
| turbine generator | The public-facing category name for the architecture, set against "piston generator" as its opposite number. Used where a reader needs the class rather than the full technical phrase. |
| microturbine generator system | The full product-category phrase, and the whole technical claim in four parts: a turbine, at micro scale, driving a generator, as a complete system. It is what the brand callout exists to say. Not abbreviated in running copy to "turbine", "the engine" or "generator" — each drops one of the parts. |

### Brand and product names

| EN | Definition |
|---|---|
| Micronturbo | The English company name and wordmark. Not an abbreviation and never shortened on the site. It has a Chinese counterpart rather than a translation — see STYLE.md section 2, which also records that the romanization in the identity deck is not used here. |
| MT-6K | The 6 kW launch SKU. A model designation, invariant across languages and never translated, transliterated or spaced. |
| MT-75K | The 75 kW launch SKU. Same rule as MT-6K. |
| More in pipeline | The third card on the products hub. A signpost that further systems follow, NOT a third product: it names no SKU, carries three indicative ratings rather than a spec, and takes the secondary button. Wording must sit clearly below the two that ship. |

### Technical terms

| EN | Definition |
|---|---|
| rated output | The power the unit is specified to deliver continuously, as distinct from a peak. It is the basis on which the comparison tables pair us with a competitor: same rated output, different everything else. Claims about holding output at altitude are stated as a percentage of it. |
| power density | Power per unit mass, at system level, in W/kg. System level is the point — it counts the complete unit, not a core or a module. The 2,000 W/kg platform figure and the two SKU figures (~600 and ~1,875 W/kg) are different measurements and are never presented as one. |
| cold start | Starting from cold at −40 °C, in seconds. It is a START claim. It does not assert an operating range, a rated output at that temperature, or storage limits, and must not be loosened into "works at −40 °C". |
| fuels | The multi-fuel capability, always counted rather than enumerated: "8 fuels". Individual fuels are named only as examples ("gasoline, diesel, gas and more") or where a specific one carries its own claim. A full list invites a specification argument the page is not making. |
| hydrogen | One of the two low-carbon fuels the system supports. Named explicitly because it is the fuel that makes the sustainability claim structural rather than incremental. |
| methanol | The other low-carbon fuel. Appears paired with hydrogen: on its own it is not enough to carry the low-carbon claim, and the pairing is what distinguishes the claim from a fossil-fuel engine that happens to tolerate a blend. |
| AC + DC | Dual electrical output from one unit. The contrast is the AC-only piston set, and that contrast is the reason the term appears at all — DC alone would read as a limitation rather than an addition. |
| turbomachinery | The engineering field the company came out of: rotating machinery that transfers energy to or from a fluid, which is the class containing both the turbine and the compressor. Used for the research group at Beihang and never as a description of the product — the product is a `microturbine generator system`. |
| forward-engineered | Designed from requirements rather than derived from an existing engine. The claim is about origin, and it is what the wholly-own-intellectual-property line rests on: a reverse-engineered architecture could not carry it. Not a synonym for "new" or "clean-sheet", both of which describe the result instead of where the design came from. |
| commercial production | Manufacture for sale at volume, as distinct from a prototype build. The site states where each system stands relative to it and never claims one has arrived. Shortening it to "production" is what would blur a ten-unit prototype run into a shipping product. |

### Competing technologies

| EN | Definition |
|---|---|
| Lithium station | A portable lithium battery power station — the class of product a person carries to a site. Not a vehicle traction pack and not grid-scale storage; both are different products with different numbers, and the comparison lines only hold against the portable class. |
| Piston set | A reciprocating internal-combustion generator set, gasoline or diesel. The site's second named comparator throughout. "Set" is doing real work: the comparison is against the complete generator set, not against an engine. |
| piston engine | The reciprocating internal-combustion architecture itself, as a class of technology — not a product. Distinct from `piston set`, which is the packaged generator built around one. The site uses the architecture term only in statements about technology class, where the peers are "battery" and "turbine" ("neither a battery nor a piston engine"), and the product term everywhere a comparison is made. Swapping one for the other either compares us to an engine we do not sell against, or claims a whole product category where only an architecture was meant. |

### Feature words

The six words on the alternating feature rows of the products hub, in fixed
order. Each is a single word carrying a whole argument, so each is chosen for
what it excludes as much as for what it says.

| EN | Definition |
|---|---|
| Mobility | Whether the unit can reach the site at all — carried, flown, taken up stairs. Deliberately broader than portability, which is only a statement about weight; the claim is about arrival. Kept in English because it also has to cover the MT-75K, which two people carry rather than one. |
| Efficiency | Power out per kilogram carried. On this page it is the power-density argument, not a thermal or fuel-conversion claim, and it must not be allowed to drift into one. |
| Toughness | Survival and full function in hostile conditions. It covers two environments at once — extreme cold and altitude — and any narrowing to one of them loses half the row. |
| Versatility | Adapting to what the site has, principally in fuel but not only. Narrowing it to "multi-fuel" would make the word a restatement of its own figure. |
| Durability | Service life measured in running hours, and holding rated output across them. The claim is cost per hour, not warranty length. |
| Sustainability | The carbon consequence of the fuel chosen, including what point-of-use accounting hides upstream. Concrete and fuel-specific — not a general environmental posture. |

### Applications and scenarios

| EN | Definition |
|---|---|
| walking robot | A legged robot platform. The claim is powering its onboard compute, which is what the weight figure unlocks; wheeled and tracked platforms are not what this term covers. |
| industrial drone | A commercial or industrial unmanned aircraft, as against a consumer camera drone. The claim is hybrid range extension in place of a battery-only pack. |
| eVTOL | Electric vertical take-off and landing aircraft. Kept as the Latin acronym in every language — it is how the industry names the category. |
| off-grid | A site with no mains supply available, as a property of the place rather than a description of a fault. Distinct from a grid outage, which is what standby power answers. |
| standby power | Power held ready against the loss of a supply that normally exists. The opposite case to off-grid, and the two are not interchangeable: one replaces a grid that failed, the other serves a place that never had one. |
| home backup | Standby power at consumer scale, in a dwelling. A scenario rather than a product class, and the one place on the site where the reader is not a professional operator. |
| air taxi | A passenger-carrying eVTOL service, named as a use rather than as an aircraft class. Distinct from `eVTOL`, which is the vehicle category: this is what the vehicle is for. It sits beside a rescue team and a polar station to show the power-density argument reaching civil aviation and not only industrial equipment. |
| polar station | A permanently staffed research station in a polar region. The scenario is sustained operation where resupply is measured in months, which is what makes every kilogram of generator a kilogram of something else left behind. Not a synonym for `off-grid`, which is a property of a place rather than a place. |
| compute ceiling | The limit a walking robot meets when its power source cannot feed both movement and onboard computation. The claim is that power density sets how capable the machine can be and not only how strong. Stated as a ceiling being raised, never as a bottleneck being removed — see the note on 算力天花板 in LANGUAGE-zh.md, which records the same choice against the company deck's own phrasing. |
