# Broadcast Design System — snímek z Claude Design

Kopie projektu **„SVDT grafika TV — Broadcast Design System“** z Claude Design
([artifact](https://claude.ai/artifact/2pbjw5c39Xsm8UxKzLotCq), verze 8, 23. 9. 2026).
Zdrojem pravdy zůstává Claude Design; tato složka je snímek pro archiv a pro práci
bez přístupu k Claude Design. Při další změně v Claude Design se snímek přepíše celý.

Nezaměňovat se složkou `design-system/` v kořeni repozitáře — to je webový a
značkový systém SVDT (web, sociální sítě, tisk). Tady je jen TV grafika.

## Co obsahuje

| Oblast | Soubory |
| --- | --- |
| Tokeny | `tokens.json`, `tokens/*.css` (barvy, typografie, rozestupy, efekty, broadcast, pohyb, host) |
| Vzory | `patterns/*.css` — karta jezdce, karta hosta, reliéf, nápis akce, výsledky, časomíra, split time |
| Animace | `patterns/rider-card-motion.css`, `guest-card-motion.css`, `family-motion.css`; pravidla v `guidelines/motion-*.html` a `deep-dive-animace.html` |
| Komponenty | `components/broadcast/*.jsx` (G02 karta jezdce, G05 host, G01 výsledky, G04 časomíra, G08 split time), náhledy v `components/*/preview.html` |
| Předlohy | `templates/`, `ui_kits/` — karta jezdce a karta hosta |
| Podklady | `assets/` — písmo Exo, logo, reliéf Svaté Hory, dezén pneumatiky, portrét, náhledy |
| Vstupní stylopis | `styles.css` (jen `@import`) |

## Stav animací

- **G02 karta jezdce, G05 jmenovka hosta** — nástup a odchod rozkreslené a převzaté
  do `../../karta-jezdce/motion.css`.
- **G01 výsledky, G04 časomíra, G08 split time** — pohyb odvozený z pravidel rodiny
  (`patterns/family-motion.css`, `guidelines/motion-family.html`). **Čeká na schválení.**

Pravidla rodiny: pořadí vrstev tvar → linka → podpis → hlavní text → klíčové číslo →
sekundární lišta; krok 60–80 ms; nástup nejvýš 760 ms, odchod nejvýš 380 ms;
čísla jen prolnutím; tabulka výsledků se odkrývá shora jedním pohybem, nikdy po řádcích.

## Co ve snímku chybí a proč

- `api/`, `tokens.css`, `manifest.json` — generuje je stránka Design System
  v Claude Design; ve stažené podobě byly zastaralé, proto nejsou součástí snímku.
  Zdrojem tokenů je `tokens.json` a `tokens/*.css`.
- `assets/logo-ink.svg`, `svata-hora-relief.svg`, `mtb-tread.svg` a fotografie jsou
  nahrazené originály z `../../karta-jezdce/assets/` — Claude Design při nahrání
  SVG odstraňuje vložené obrázky a do fotografií přidává metadata.
- `assets/Brand/event-wordmark.png` — nápis akce, v Claude Design uložený jako podklad
  (asset), protože nahrané SVG by přišlo o vložený obrázek.

Náhledy `components/*/preview.html` jsou psané pro prostředí Claude Design (načítá
k nim tokeny, knihovny a `components/bundle.js`); samostatně v prohlížeči se nevykreslí.
Živé grafiky jsou v sousedních složkách karet a v pultu `../`.
