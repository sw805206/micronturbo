v001 | 2026-08-09 | 122 lines
# Language

The canonical termbase for micronturbo.com, in ENGLISH. English is the source
of truth for terminology: this file records which word the site uses for a
thing and why, and it contains no translations.

Each language keeps its own file — `LANGUAGE-zh.md` for Simplified Chinese —
keyed to the English term in section 5.

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

## 2. Scope

This file owns **which words are used**. It does not own how they are set.

Typographic and CSS treatment lives in STYLE.md: the tracked micro-label and
its Latin-only restriction, the English-only Chicago title case at h1 and h2,
and any `:lang()` override that resets tracking or case for CJK. A decision
about letter-spacing, capitalisation or font stack is a STYLE.md decision even
when it is provoked by a translation.

The dividing question is whether the decision would survive a change of
typeface. If it would, it belongs here; if it would not, it belongs in
STYLE.md.

## 3. Privacy

This file and every language file are committed to a public repo, and any page
built from them is publicly fetchable. Static hosting has no auth layer.

No competitor pricing. No unpublished performance claims. A figure that has not
cleared for publication does not get a row here on the grounds that a termbase
is an internal document — it is not one.

## 4. Units and numbers

**SI symbols stay Latin in figures and spec lines**: kW, kg, W/kg, °C, m, rpm,
h. This holds in every language. The figure patterns — the one-liner band, the
comparison table, the feature-row spec — set figures in tabular numerals, and a
local unit word breaks the column alignment those patterns exist to provide.

**Prose may use local unit words.** A sentence of running copy is not a column
and is free to say the unit however that language says it.

**Comma every three digits**: 2,000 W/kg, 160,000 rpm, 3,000 hours.

**En dash for ranges, no spaces**: 9–12 kg, 500–800 hours, 50–130 W/kg.

## 5. Terms

### Brand and product names

| EN | Definition |
|---|---|
| Micronturbo | The English company name and wordmark. Not an abbreviation and never shortened on the site. It has a Chinese counterpart rather than a translation — see STYLE.md section 2, which also records that the romanisation in the identity deck is not used here. |
| MT-6K | The 6 kW launch SKU. A model designation, invariant across languages and never translated, transliterated or spaced. |
| MT-75K | The 75 kW launch SKU. Same rule as MT-6K. |
| More in pipeline | The third card on the products hub. A signpost that further systems follow, NOT a third product: it names no SKU, carries three indicative ratings rather than a spec, and takes the secondary button. Wording must sit clearly below the two that ship. |

### Technical terms

| EN | Definition |
|---|---|
| micro gas turbine generator system | The full product-category phrase, and the whole technical claim in five words: a gas turbine, at micro scale, driving a generator, as a complete system. It is what the brand callout exists to say. Not abbreviated in running copy to "turbine", "the engine" or "generator" — each drops one of the four parts. |
| rated output | The power the unit is specified to deliver continuously, as distinct from a peak. It is the basis on which the comparison tables pair us with a competitor: same rated output, different everything else. Claims about holding output at altitude are stated as a percentage of it. |
| power density | Power per unit mass, at system level, in W/kg. System level is the point — it counts the complete unit, not a core or a module. The 2,000 W/kg platform figure and the two SKU figures (~600 and ~1,875 W/kg) are different measurements and are never presented as one. |
| cold start | Starting from cold at −40 °C, in seconds. It is a START claim. It does not assert an operating range, a rated output at that temperature, or storage limits, and must not be loosened into "works at −40 °C". |
| fuels | The multi-fuel capability, always counted rather than enumerated: "8 fuels". Individual fuels are named only as examples ("petrol, diesel, gas and more") or where a specific one carries its own claim. A full list invites a specification argument the page is not making. |
| hydrogen | One of the two low-carbon fuels the system supports. Named explicitly because it is the fuel that makes the sustainability claim structural rather than incremental. |
| methanol | The other low-carbon fuel. Appears paired with hydrogen: on its own it is not enough to carry the low-carbon claim, and the pairing is what distinguishes the claim from a fossil-fuel engine that happens to tolerate a blend. |
| AC + DC | Dual electrical output from one unit. The contrast is the AC-only piston set, and that contrast is the reason the term appears at all — DC alone would read as a limitation rather than an addition. |

### Competing technologies

| EN | Definition |
|---|---|
| Lithium station | A portable lithium battery power station — the class of product a person carries to a site. Not a vehicle traction pack and not grid-scale storage; both are different products with different numbers, and the comparison lines only hold against the portable class. |
| Piston set | A reciprocating internal-combustion generator set, petrol or diesel. The site's second named comparator throughout. "Set" is doing real work: the comparison is against the complete generator set, not against an engine. |

### Feature words

The six words on the alternating feature rows of the products hub, in fixed
order. Each is a single word carrying a whole argument, so each is chosen for
what it excludes as much as for what it says.

| EN | Definition |
|---|---|
| Mobility | Whether the unit can reach the site at all — carried, flown, taken up stairs. Deliberately broader than portability, which is only a statement about weight; the claim is about arrival. |
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
