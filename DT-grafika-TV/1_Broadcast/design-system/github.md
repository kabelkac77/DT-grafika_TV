# Zdrojový repozitář

repo: kabelkac77/SVDT2027
branch: main
package: DT-grafika-TV

## Last sync

date: 2026-09-23
commit: 15665de (main)

### Updated in this project

- Repozitář přejmenován na `kabelkac77/SVDT2027`, projekt TV grafiky přesunut do `DT-grafika-TV/`, webový `design-system/` leží v kořeni. Odkazy a mapa obrazovek srovnány.
- **Karta jezdce 06.5** (commit cd79fa9, 9. 9. 2026): nápis akce vystředěný na reliéfu (`patterns/event-wordmark.css`, `components/broadcast/eventWordmark.js`), varianta A drží vpravo 250 px, trojmístné číslo v dlouhých datech 68 px.
- **Karta hosta** (tentýž commit): šířka 620 px, odsazení 16 / 184 / 14 / 24 px, výška min. 102 px, jméno 36 px, funkce 24 px, reliéf 160 × 60 px, nápis akce.
- Nápis akce doplněn do animace: naskočí po dokreslení siluety, odchází s ní. Stejné pravidlo používá repozitář v `DT-grafika-TV/karta-jezdce/motion.css`.
- Do podkladů přidán PNG render nápisu akce (skupina Brand).
- **Zařazeny G01, G04 a G08:** `ResultsCard`, `TimerCard`, `SplitTime` s živými náhledy, typy a návody; styly 1:1 z repozitáře zapouzdřené v `patterns/results-card.css`, `timer-card.css`, `split-time.css`.
- **Pohyb G01, G04, G08** podle pravidel rodiny v `patterns/family-motion.css` a na kartě `guidelines/motion-family.html` (čeká na schválení); v G08 zachovává zmenšení karty jezdce.

### Updated in the previous sync (2026-09-09T10:56:00Z)

- Přidána **karta hosta 01** — `GuestCard`, `GuestName`, `tokens/guest.css`, `patterns/guest-card.css`, UI kit `ui_kits/karta-hosta/`.
- Chování animace karty hosta sjednoceno s kartou jezdce (`patterns/guest-card-motion.css`) na pokyn zadavatele.
- Nové karty do záložky Design System: plochy, typografie a rozměry hosta + převzaté chování animace.
- Zkopírovány náhledy `host-detail.png` a `karta-hosta-studie-01.jpg`.

## Screen map

Cesty ve zdroji jsou vůči kořeni repozitáře.

| Obrazovka / soubor v projektu | Zdrojové soubory v repozitáři |
| --- | --- |
| `ui_kits/karta-jezdce/index.html`, `data.js`, `page.css` | `DT-grafika-TV/karta-jezdce/index.html`, `app.js`, `data.js`, `style.css` |
| `ui_kits/karta-hosta/index.html`, `data.js` | `DT-grafika-TV/karta-hosta/index.html`, `app.js`, `data.js` |
| `patterns/rider-card.css` | `DT-grafika-TV/karta-jezdce/production.css` |
| `patterns/guest-card.css`, `tokens/guest.css` | `DT-grafika-TV/karta-hosta/style.css` |
| `patterns/event-wordmark.css`, `components/broadcast/eventWordmark.js` | `design-system/brand/event-wordmark.css`, `event-wordmark.svg` |
| `patterns/rider-card-motion.css`, `patterns/guest-card-motion.css`, `tokens/motion.css` | `uploads/ZADANI_ANIMACE_KARTY.md`, `uploads/PROMPT_CLAUDE_DESIGN_ANIMACE.md`; kopie v repozitáři `DT-grafika-TV/karta-jezdce/motion.css` |
| `patterns/relief-mask.css` | `DT-grafika-TV/karta-jezdce/relief-mask.css` |
| `patterns/results-card.css`, `components/broadcast/ResultsCard.jsx` | `DT-grafika-TV/karta-vysledky/style.css`, `index.html`, `app.js` |
| `patterns/timer-card.css`, `components/broadcast/TimerCard.jsx` | `DT-grafika-TV/časomíra/style.css`, `index.html`, `app.js` |
| `patterns/split-time.css`, `components/broadcast/SplitTime.jsx` | `DT-grafika-TV/split-time/style.css`, `app.js` |
| `patterns/family-motion.css`, `guidelines/motion-family.html` | `DT-grafika-TV/karta-jezdce/motion.css` (oddíl G01, G04, G08) |
| `patterns/preview-harness.css` | `DT-grafika-TV/karta-jezdce/style.css`, `DT-grafika-TV/karta-hosta/style.css` |
| `components/broadcast/Rider*`, `BibNumber`, `CountryFlag`, `SvataHoraRelief` | `DT-grafika-TV/karta-jezdce/app.js`, `production.css` |
| `components/broadcast/GuestCard`, `GuestName` | `DT-grafika-TV/karta-hosta/app.js`, `style.css` |
| `components/preview/*` | `DT-grafika-TV/karta-jezdce/index.html`, `app.js`, `style.css` |
| `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` | `design-system/tokens/*.css` |
| `tokens/broadcast.css` | `DT-grafika-TV/karta-jezdce/production.css`, `style.css` |
| `guidelines/brand-reference.html` | `DT-grafika-TV/karta-jezdce/srovnani.html`, `nahledy/*.png` |
| `assets/*` | `DT-grafika-TV/karta-jezdce/assets/*`, `nahledy/*`, `DT-grafika-TV/karta-hosta/nahledy/*` |

## Sync history

### 2026-09-23
commit: 15665de — srovnání s verzí 06.5 a s novou strukturou repozitáře (viz Last sync).

### 2026-09-09T06:59:00Z
commit: c1187caa1fb98181bcdb00cb6bb8bae494666c4e — první build z podstromu `karta-jezdce/` (tokeny, kompozice 06.4, komponenty, UI kit, podklady).
