# SVDT Design System

**SVDT — Svatohorský Downtown Příbram**, an urban downhill mountain-bike race through the historic centre of Příbram, Czech Republic. Organizer: **COWÁRNA z.s.** Source site: [svdtpribram.cz](https://svdtpribram.cz/).

This system is bilingual (Czech-first, English gloss) and was built from a design-system export attached to this project at `svdt-design-system/` (local mount) — a v1.0 spec covering tokens, foundations, components, social, print and a partner deck. No Figma file or application codebase was attached; everything here derives from that static HTML/CSS export. If a Figma link or the product codebase becomes available later, re-run this process against it to tighten fidelity.

## What SVDT is

A single-day urban downhill race (10th edition, 23 May 2026): riders descend stairs, streets and purpose-built jumps through Příbram's town centre in front of a free-entry crowd, followed by results, partner recognition and an afterparty. The brand covers one product surface — the **event website** (svdtpribram.cz) — plus its satellite outputs: Instagram posts/stories, a Facebook cover/OG image, print (poster, flyer, on-site materials) and a partner sponsorship deck.

## Structure

- `styles.css` — root stylesheet, `@import`s only. Link this one file.
- `tokens/` — `colors.css`, `typography.css` (incl. the Exo `@import`), `spacing.css`, `effects.css`.
- `components/` — React primitives, grouped by concern (see below). Each folder has a `*.card.html` demo.
- `ui_kits/website/` — interactive click-through recreation of the homepage + rider registration flow.
- `guidelines/` — small Design-System-tab specimen cards (Colors, Type, Spacing, Brand) plus five `deep-dive-*.html` prose pages migrated from the original bilingual foundations docs (logo/clear-space, colour roles + contrast table, type rules, spacing/grid/breakpoints, motion/elevation/overlays) — open these for the full CZ/EN detail behind each card.
- `deck/partner-deck.html` — 5 reference slide layouts (title, numbers, packages, partner wall, contact) for the partner sponsorship presentation, with a full 1920×1080 spec table.
- `print/` — poster (A3), flyer (A5, both sides), on-site materials (bib, accreditation, finish banner) with CMYK/bleed specs.
- `social/` — Instagram post (1:1), Instagram story (9:16), Facebook cover/OG image specs.

## Components

- **Buttons** — `Button` (pill: primary/secondary/ghost/quiet; block: block/block-outline; sizes sm/default/lg)
- **Cards** — `Card` (basic/media/spot variants), `ScheduleRow` (race-day schedule line)
- **Navigation** — `Header` (sticky translucent nav), `Footer`
- **Results** — `ResultsTable` (tabular-numeral results with DNF state), `Podium` (top-3, brand red only — no gold/silver/bronze)
- **Stats** — `Countdown` (hero countdown), `StatBand` (3–4 figure strip), `StatCard` (figure + context copy)
- **Partners** — `PartnerWall` (one tier per instance — tier expressed by tile size only), `SponsorPackage`
- **Forms** — `FormField` (text/email/select/textarea + error/hint states), `RadioGroup` (segmented pill), `Checkbox`, `Alert` (error/ok/warn)

No component inventory was defined by a Figma file or codebase here (the source was static specimen HTML), so this list was authored to cover exactly what those specimen pages demonstrated — nothing extra was invented beyond what's listed under **Intentional additions** below.

### Intentional additions
- `ScheduleRow`, `Podium`, `StatCard`, `SponsorPackage` — the source specimens showed these as one-off markup blocks inside larger pages, not named components; they were extracted into their own reusable pieces since UI kits reference them repeatedly.

## Content fundamentals

- **Voice**: direct, second person, energetic — "Zažij atmosféru" (Experience the atmosphere), never formal/corporate Czech.
- **Casing**: uppercase for all headings and CTAs; sentence case for body copy. Never uppercase a paragraph longer than 2 lines.
- **Numbers over adjectives**: "140 jezdců, 25+ překážek" instead of vague superlatives — the brand leans on concrete race-day stats.
- **Errors say what to do, not what broke**: "Zadej platný e-mail" (Enter a valid email), not "Neplatný formát" (Invalid format).
- **No emoji** anywhere in the source material.
- **Bilingual pattern**: Czech is primary; English is a smaller, muted secondary line under each Czech heading/paragraph — never the reverse, never CZ/EN side by side as equals.
- **Tone don'ts**: no strings of exclamation marks, no clichés ("unforgettable experience"), no long sentences in headings.

## Visual foundations

- **Colour**: deliberately narrow. Near-black surfaces (`#05060A` → `#131A23`, five steps), four tints of white for text, and **two reds in separate roles**: brand red `#E30613` (logo, primary CTA, all print, full-colour surfaces under white text) vs. accent red `#FF1A1A` (glow, hover, numerals — never as a small-text background, since it fails AA at that weight). Green `#2EE08A` and amber `#FCB900` exist only for form success/warning states — the sole colours outside the red/black palette.
- **Type**: one typeface, **Exo** (Google Fonts, weights 500/700/800/900). Headings are uppercase weight 900 at tight leading (0.95–1.06); body copy is roomy at line-height 2.0 to keep long Czech sentences readable. All numerals (times, countdowns, stats) use `font-variant-numeric: tabular-nums`.
- **Spacing**: 4px base grid; one dominant vertical rhythm of 72px between sections. Containers at 1200px (content) / 1400px (galleries, logo walls), 12-column grid, 24px gutter.
- **Radii**: 0 for section CTAs and print (sharp, decisive), 6px inputs, 10px cards (default), 16px large media panels, pill (999px) for header/hero buttons and badges.
- **Elevation**: no drop shadows read on near-black — depth comes from a **red glow** (`0 0 24px rgba(255,26,26,.4)`) plus a 4px upward shift on hover. A card only glows when interactive; static cards stay flat.
- **Photo overlays**: any text over a photo requires ≥55% dark overlay (`rgba(5,6,10,.55)`) or a bottom-to-top gradient for card titles; a diagonal brand-red overlay is used for hero/poster treatments. This is a hard rule, not a suggestion.
- **Motion**: a single transition value, `.35s ease`, covers nearly everything (hover, card lift, glow). Faster `.18s ease` for input focus. Reduced-motion drops transforms/loops, keeps colour changes.
- **Backgrounds**: flat near-black or soft-alternating sections; no repeating textures, patterns or illustrated backgrounds. Photography is the only imagery style, always dark-graded with the overlay rules above.
- **Borders**: 1px hairlines (`--svdt-border` / `--svdt-line`) throughout; no double borders or heavy strokes except the 2px brand-red top rule on the footer and 3px accent bars on stat/podium cards.
- **Transparency/blur**: header uses `rgba(10,10,10,.92)` + 10px backdrop-blur when sticky; otherwise transparency is used sparingly (subtle hover backgrounds, dropdown shadows).
- **Imagery colour vibe**: cool, dark-graded, high-contrast urban/action photography (no actual photos were supplied — see Iconography/assets note below).
- **Cards**: 1px hairline border, 10px radius, no border-left accent stripes; hover = lift + glow only when clickable.

## Iconography

The source material uses **no icon font, no SVG icon set, and no emoji**. The only recurring graphic is the schematic SVDT roundel (circle + "SVDT/PŘÍBRAM" wordmark, built as inline SVG) used as a stand-in brand mark throughout the specimens — the source docs themselves flag it as schematic and point to a real logo file that was never supplied (`SVDT-logo-cervene_bile_uvnitr.png`). A few interface glyphs are plain characters (✓ ✕ ! for alerts, → for CTA arrows, › for mobile nav chevrons) rather than an icon system. If real UI icons are needed going forward, pick one CDN set (Lucide is a close stylistic match: geometric, single-weight strokes) and document it here — none is currently in use.

## Assets

**No logo file, photography, or illustration assets were supplied** — the attached export is specimen HTML only, with placeholder gradients standing in for photography and an inline-SVG roundel standing in for the logo. Per design-system policy, no logo was drawn or reconstructed for this system; the roundel above is kept only as the clearly-labelled schematic placeholder the source itself used. **Please attach**: the real SVDT logo (vector or the referenced PNG), race/event photography, and any partner logos, so `assets/` can be populated with real material.

## Fonts

**Exo** (Google Fonts, weights 400/500/700/800/900) is loaded via `@import` in `tokens/typography.css` — it's freely available on Google Fonts, so no substitution was needed and no local font files were bundled.

## Caveats & where to help

- **No logo/photography/partner-logo assets** were supplied — everything visual here is either a token, a component, or the schematic roundel/placeholder gradients called out above. Attach the real logo and photo library and this system gets dramatically more real.
- **No Figma file or product codebase** was attached, so component fidelity comes entirely from the static specimen HTML in `svdt-design-system/`; if the live site's code differs in any exact values, treat the live code as the source of truth and update tokens/components accordingly.
- The **UI kit covers only the homepage + registration flow** (the two screens the source specimens supported end-to-end); results archive, gallery, and full navigation subpages were not built since no source content existed for them.
- Please review the **content fundamentals and visual foundations** sections above for anything that reads off — they were synthesized from a fairly small specimen set and may miss nuance a live site visit or brand brief would catch.

Tell me what to prioritize next: real logo + photography ingestion, deeper UI kit screens (gallery, race info, contact), or a proper SKILL.md dry-run.
