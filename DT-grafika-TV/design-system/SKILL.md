---
name: svdt-design
description: Use this skill to generate well-branded interfaces and assets for SVDT (Svatohorský Downtown Příbram, an urban downhill mountain-bike race in Příbram, Czech Republic), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key facts to keep in mind:
- Two reds, two roles: `--svdt-brand` (#E30613 — logo, primary CTA, print) vs `--svdt-red` (#FF1A1A — glow, hover, numerals). Never swap them.
- One typeface, Exo, always uppercase 900 for headings, tabular numerals for anything numeric.
- No drop shadows — depth is a red glow plus a 4px hover lift, only on interactive elements.
- No logo file or photography was supplied; never draw a logo — use plain type and flag the gap.
