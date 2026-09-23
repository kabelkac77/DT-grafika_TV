# SVDT — Karta jezdce / Broadcast Design System

Design systém pro **televizní a velkoplošnou grafiku** závodu **Svatohorský Downtown Příbram (SVDT)** — urban downhill MTB závod centrem Příbrami. Systém pokrývá grafické části, které jsou v repozitáři implementované:

- **G02 — karta jezdce před startem**, verze **06.5**: překryv živého obrazu, který divákovi rychle řekne, kdo startuje, a nechá volný závodní záběr. Oproti 06.4 přibyl na reliéfu vystředěný nápis akce.
- **G01 — výsledky**: deset výsledků kategorie a jízdy se společným panelem log (`ResultsCard`).
- **G04 — časomíra**: kompaktní čas jízdy vpravo dole (`TimerCard`).
- **G08 — split time**: jezdec a lídr, dva mezičasy a cíl s pořadím (`SplitTime`).
- **Karta hosta**, verze **01** s aktualizací z 9. 9. 2026: decentní jmenovka mluvící osoby ve vstupech mezi jízdami (moderátor, starosta, host) — pouze jméno a funkce. Aktualizace kartu zmenšila na 620 px a přidala stejný nápis akce jako u karty jezdce.

Není to webový design systém. Barvy, typografie a značka vycházejí z webového SVDT design systému (`design-system/` v kořeni téhož repozitáře), ale **rozměry, plochy a pravidla kompozice jsou TV-specifické** — webové rozměry komponent nejsou pro TV předpisem. Schválené odchylky karty (světlejší grafit, textura pneumatiky, smíšená velikost písmen jména, měkký přechod portrétu) mají pro tuto kartu přednost před obecnými webovými pravidly.

## Zdroje

Vše zde vychází ze skutečného kódu, ne z paměti nebo screenshotů:

- **GitHub:** [kabelkac77/SVDT2027](https://github.com/kabelkac77/SVDT2027) (dříve `kabelkac77/DT-grafika_TV`; projekt TV grafiky leží od 21. 9. 2026 ve složce `DT-grafika-TV/`) — podstromy [`DT-grafika-TV/karta-jezdce/`](https://github.com/kabelkac77/SVDT2027/tree/main/DT-grafika-TV/karta-jezdce) (`production.css`, `style.css`, `relief-mask.css`, `app.js`, `data.js`, `index.html`, `srovnani.html`, `assets/`, `nahledy/`) a [`DT-grafika-TV/karta-hosta/`](https://github.com/kabelkac77/SVDT2027/tree/main/DT-grafika-TV/karta-hosta) (`style.css`, `app.js`, `data.js`, `index.html`, `nahledy/`).
- **Zadání:** `DT-grafika-TV/karta-jezdce/ZADANI_KARTA_JEZDCE.md` (G02), `DT-grafika-TV/karta-hosta/ZADANI_KARTA_HOSTA.md` (karta hosta 01), nadřazené `DT-grafika-TV/ZADANI.md`, `DT-grafika-TV/karta-jezdce/README.md` (verze 06.5), `DT-grafika-TV/karta-hosta/README.md`, `DT-grafika-TV/karta-jezdce/PROMPT.md` (ilustrační portrét), `uploads/ZADANI_ANIMACE_KARTY.md` a `uploads/PROMPT_CLAUDE_DESIGN_ANIMACE.md` (animace).
- **Nadřazený webový design systém:** [`design-system/`](https://github.com/kabelkac77/SVDT2027/tree/main/design-system) v kořeni repozitáře — barvy, typografie, spacing, efekty, komponenty webu a partnerský deck. Odtud přebírá tento systém tokeny `--svdt-*`.
- **Nápis akce:** [`design-system/brand/event-wordmark.svg`](https://github.com/kabelkac77/SVDT2027/tree/main/design-system/brand) a `event-wordmark.css` — jeden soubor pro všechny karty, osa nápisu shodná s osou reliéfu.
- **Použití v přenosu:** režijní pult `DT-grafika-TV/1_Broadcast/` (zatím na větvi `claude/nifty-dijkstra-1kgfej`, ne v `main`) odbavuje karty z repozitáře a spouští tuto animaci třídami `.anim-in` / `.anim-out`. Její kopie v repozitáři je `DT-grafika-TV/karta-jezdce/motion.css`.
- **Živý web akce:** [svdtpribram.cz](https://svdtpribram.cz/), [fotogalerie](https://svdtpribram.cz/fotogalerie/) (zdroj závodní fotografie a originálního loga).

Doporučení pro čtenáře: **projděte oba podstromy repozitáře** (`DT-grafika-TV/karta-jezdce/` i `design-system/`) — obsahují kontrolní scénáře, generátor náhledů a webové komponenty, které tento systém záměrně nekopíruje.

## Index

| Cesta | Obsah |
| --- | --- |
| `styles.css` | Vstupní stylopis — pouze `@import`. Konzumenti linkují tento jeden soubor. |
| `tokens/` | `colors.css`, `typography.css` (+ `@font-face` Exo), `spacing.css`, `effects.css`, `broadcast.css` (TV plochy, rozměry, plátno), `motion.css` (křivky, délky a pořadí odkrývání animací), `guest.css` (plochy a rozměry karty hosta). |
| `patterns/` | `rider-card.css` (kompozice 06.5, hodnoty 1:1 z `production.css`), `event-wordmark.css` (nápis akce na reliéfu, 1:1 z `design-system/brand/`), `rider-card-motion.css` (fázovaný nástup a odchod), `guest-card.css` + `guest-card-motion.css` (karta hosta 01), `relief-mask.css` (vložená maska reliéfu), `results-card.css`, `timer-card.css`, `split-time.css` (G01, G04, G08, zapouzdřené), `family-motion.css` (jejich nástup a odchod), `preview-harness.css` (plátno a obsluha náhledu). |
| `components/broadcast/` | `RiderCard`, `BibNumber`, `RiderName`, `RiderMeta`, `CountryFlag`, `RiderPortrait`, `SvataHoraRelief`, `GuestCard`, `GuestName`, `ResultsCard`, `TimerCard`, `SplitTime` (zdroje). Živé náhledy, typy a návody nových komponent jsou v `components/<Komponenta>/`. |
| `components/preview/` | `BroadcastStage`, `PreviewControls`, `BroadcastStatus`. |
| `ui_kits/karta-jezdce/` | Obsluhovaný náhled celé karty jezdce — `index.html`, `data.js`, `page.css`, `README.md`. |
| `ui_kits/karta-hosta/` | Obsluhovaný náhled karty hosta — `index.html`, `data.js`, `README.md`. |
| `templates/karta-jezdce/` | Výchozí bod pro nové návrhy — `KartaJezdce.dc.html`: plátno 1920 × 1080 s kartou, přepínatelné rozložení a údaje jezdce. |
| `templates/karta-hosta/` | Výchozí bod — `KartaHosta.dc.html`: plátno 1920 × 1080 s jmenovkou hosta (jméno, funkce). |
| `guidelines/` | Specimen karty pro záložku Design System (Colors, Type, Spacing, Motion, Brand) + `deep-dive-animace.html` — celý zápis animačních rozhodnutí. |
| `assets/` | Logo, ilustrační portrét, stopa pneumatiky, reliéf, fotografie, referenční PNG náhledy, soubory Exo. |
| `SKILL.md` | Agent Skill wrapper. |
| `github.md` | Vazba na zdrojový repozitář a poslední synchronizace. |

## Komponenty

Inventář odpovídá tomu, co karta 06.5 skutečně obsahuje — nic nad rámec zdroje.

**`components/broadcast/`** — vysílaná grafika
- **RiderCard** — celá karta; složí reliéf s nápisem akce, číslo, jméno, údaje a portrét. Varianty `A`/`B`, s portrétem i bez, automatický menší stupeň pro dlouhá jména, nástup/odchod přes `visible`.
- **BibNumber** — startovní číslo v akcentní červené + popiska `ČÍSLO`.
- **RiderName** — jméno a příjmení na jednom řádku, příjmení výraznější.
- **RiderMeta** — země, tým, kategorie v jedné liště; chybějící pole se skryjí bez prázdných oddělovačů.
- **CountryFlag** — česká vlajka jako CSS geometrie; jiné země jen textovým kódem.
- **RiderPortrait** — portrét s měkkým přechodem; neplatný obrázek přepne kartu do podoby bez portrétu.
- **SvataHoraRelief** — reliéf Svaté Hory maskovaný z originálního loga; tři vrstvy (hrana, těleso, světelný hrot kresby).
- **GuestCard** — karta hosta 01: jméno a funkce, nic víc. Šířka 620 px, vlastní grafit `#1C2732`, krátká linka 110 × 4 px, na reliéfu nápis akce. Prázdná funkce druhý řádek vypustí; bez jména se karta nevykreslí.
- **GuestName** — jméno hosta s posledním slovem verzálkami a weight 900 jako příjmení.
- **ResultsCard** — G01: tabulka deseti výsledků, lídr s časem, ostatní ztráta, nadpis kategorie a jízdy, panel pěti log; dlouhá jména se zmenšují do 24 px.
- **TimerCard** — G04: čas jízdy vpravo dole, rovná levá hrana, bez reliéfu; neplatný zápis kartu skryje. Čas sám neběží.
- **SplitTime** — G08: `RiderCard` A zmenšená na 60 %, lišta lídra, dva mezičasy se stopkami a čísly 1 / 2, cílová karta s rozdílem a pořadím.

**`components/preview/`** — obsluha náhledu, **nikdy se nevysílá**
- **BroadcastStage** — plátno 1920 × 1080 škálované jako celek, pozadí náhledu, kontrola bezpečných okrajů.
- **PreviewControls** — přepínače rozložení, dat, pozadí, portrétu a bezpečných okrajů + akce skrytí karty.
- **BroadcastStatus** — stavová řádka pro obsluhu, včetně stavu `NEPŘIPRAVENO K VYSÍLÁNÍ`.

### Záměrná doplnění
- `BibNumber`, `RiderName`, `RiderMeta`, `CountryFlag`, `RiderPortrait`, `SvataHoraRelief`, `GuestName` — ve zdroji jsou to bloky uvnitř jedné šablony v `app.js`, ne pojmenované komponenty; rozdělil jsem je podle existujících CSS bloků (`.bib`, `.name`, `.meta`, `.flag`, `.portrait-area`, `.architecture`, `.guest-name`), protože se v kartách i v náhledech používají opakovaně a mají vlastní pravidla krajních případů.
- `BroadcastStage`, `PreviewControls`, `BroadcastStatus` — ve zdroji je to statické HTML náhledu ovládané `app.js`; jsou zde proto, že bez plátna nelze kartu ukázat ve správném měřítku.

## Content fundamentals

Pracovní jazyk je **čeština** (jazyk finálního přenosu není potvrzen). Diakritika se zachovává vždy, i v příjmení verzálkami.

- **Verzálky jen tam, kde mají funkci:** příjmení (`NOVÁK`), popiska čísla (`ČÍSLO`), eyebrow a stavové hlášky pro obsluhu. Jméno zůstává smíšené (`Adam`) — schválená odchylka od webového pravidla „nadpisy verzálkami“. Funkce hosta je naopak **celá malými** (`moderátor`) — jmenovka má být decentní, ne křičící titulek.
- **Obsah karty je uzavřený seznam:** u karty jezdce jméno, příjmení, startovní číslo, portrét, tým, země + vlajka, kategorie. **Karta hosta má pouze dvě pole — jméno a funkci**; žádné číslo, portrét, vlajku, zemi, tým ani kategorii. Věk, výsledky, biografie, datum, ročník, status MČR ani partneři se bez dalšího zadání nezobrazují.
- **Stav říká, co udělat:** „NEPŘIPRAVENO K VYSÍLÁNÍ — doplňte jméno a startovní číslo. Karta se nezobrazuje.“ Ne „Neplatný vstup“.
- **Fiktivní data se přiznávají v okolí náhledu**, nikdy v grafice: `UKÁZKOVÁ DATA · ILUSTRAČNÍ POSTAVA · PRACOVNÍ 1920 × 1080`.
- **Popisky variant jsou technické, ne marketingové:** „A — horizontální lišta“, „B — kompaktní blok“. Nadpisy stránky náhledu jsou krátké věty s tečkou: „Jezdec v hlavní roli.“, „Šířka pro jméno.“, „Volná pravá strana.“
- **Žádná emoji, žádné vykřičníky, žádná superlativa.** Nic jako „nezapomenutelný zážitek“.
- **Prázdné pole se nikdy nevyplňuje náhradou:** chybějící tým/země/kategorie se skryje; chybějící číslo se nenahrazuje nulou; chybějící portrét se nenahrazuje cizí tváří.
- **Odpovědi na otevřené otázky se přiznávají** („k ověření s režií“), místo aby se předstírala hotová specifikace.

## Visual foundations

**Barvy.** Úzká paleta. Grafitová plocha karty jezdce `#19232E` je záměrně **světlejší** než webové plochy (`#05060A`–`#131A23`), aby karta držela kontrast nad světlým i členitým pohybujícím se obrazem. Karta hosta má vlastní, ještě světlejší grafit `#1C2732` a funkci v `#D1D9E0` — jmenovka nemá s obrazem soutěžit. Dvě červené v oddělených rolích: značková `#E30613` (spodní linka karet, značkové plochy, tisk) a akcentní `#FF1A1A` (jen startovní číslo a zvýraznění — na kartě hosta se nepoužívá vůbec). Text: bílá pro jméno, `#E2E7EC` pro údaje, `#C1CAD3` pro popisky. Zelená/amber ze webového systému se na kartách **nepoužívají**.

**Typografie.** Jediné písmo **Exo**, skutečné lokální soubory 400/500/700/800/900 (OFL, `assets/fonts/Exo-OFL.txt`) — žádná substituce. Číslo 74 px / 900 / `letter-spacing −.04em`; příjmení 44 px / 900 verzálkami; jméno 42 px / 400; údaje 23 px / 500; popiska 16 px / 500 / `.035em`. Varianta B má menší stupně (68 / 34 / 32 / 22). Dlouhé jméno (nad 15 znaků) klesá na 36 px, resp. 31 px — dál se nezmenšuje, další zkrácení je redakční rozhodnutí; trojmístné číslo varianty A klesne v dlouhých datech na 68 px. Karta hosta: jméno 36 px, funkce 24 px. Všechny číselné údaje mají `font-variant-numeric: tabular-nums`.

**Prostor a layout.** Plátno 1920 × 1080. Karty jsou pevně 96 px od levého a 80 px od spodního okraje; návrhová rezerva 5 % (54 / 96 px) se kontroluje přepínačem bezpečných okrajů. Šířky jsou pevné: jezdec A 1120 px (bez portrétu 940 px), B 610 px (bez portrétu 470 px), host 620 px — bez portrétu se karta jezdce **zúží**, nikdy nezůstane prázdné místo. Vnitřní mřížky jsou grid se sloupci 180/125/1fr (A) a 190/1fr (B); varianta A si vpravo drží 250 px pro nápis akce. Karta hosta má odsazení 16 / 184 / 14 / 24 px (vpravo místo pro nápis) a výšku nejméně 102 px. Kompozice se nikdy nepřizpůsobuje šířce okna; škáluje se plátno jako celek.

**Pozadí a plochy.** Žádné gradientové plakáty, žádné ilustrace. Jediná textura je jemná vektorová stopa MTB pneumatiky vpravo na grafitové ploše (`assets/mtb-tread.svg`, 168 px, opacita `.35`), překrytá gradientem `90deg #17212C → transparent`, takže vlevo pod textem je plocha plná a vpravo se rozpouští. Fotografie (závodní záběr, Svatá Hora) jsou **pouze podkladem náhledu**, ne součástí grafického výstupu — okolí karty je průhledné.

**Značka.** V kartě není samostatné logo. Značku nese **reliéf Svaté Hory** vystupující z horní hrany — maska z horního motivu originálního loga (`patterns/relief-mask.css`, `assets/svata-hora-relief.svg`), dvě vrstvy: světlá hrana `#8795A3` a grafitové těleso `linear-gradient(#26323F → #19232E)`. Od verze 06.5 je na reliéfu vystředěný bílý **nápis akce** SVATOHORSKÝ / DOWN / TOWN — jen písmo z původního loga, bez kruhu, přidané linky a roku (`patterns/event-wordmark.css`). Jedna předloha pro všechny karty: u jezdce A 136 px, B 96 px, u hosta 90 px, osa vždy shodná s osou reliéfu. Reliéf leží mimo portrét. Nová značka se nikdy nekreslí.

**Tvar, okraje, stíny.** Karty mají **nulové rádiusy**; místo nich zkosené rohy přes `clip-path` (u jezdce 12 px vlevo nahoře a 14 px vpravo dole, u hosta 12 px na obou) a lišta údajů 10 px vlevo nahoře. Hairline `#83919E80` (host `#91A1AF70`) v horní hraně, oddělovače `#A9B5C050` a `#B2BDC45C`. **Žádné vržené stíny a žádná záře** — na tmavém podkladu nečtou; hloubka vzniká přechodem plochy a světlou hranou reliéfu. Webová červená záře (`--svdt-shadow-glow`) do vysílaného obrazu **nepatří**.

**Transparence a maskování.** Portrét má měkký přechod na pravé hraně (`mask-image: linear-gradient(90deg,#000 0 87%,transparent)`) a spodní stmívání do grafitu (`#17212C9C`), takže nemá tvrdý řez a číslo leží mimo rameno. Lišta údajů má gradientní podklad `100deg #101A25DB → #101A2590 → transparent` — kontrast se řeší lokálně, nikdy zatmavením celého přenosu. Žádný blur.

**Pohyb.** Karta nepřijíždí do obrazu — **odkrývá se**. Grafitová plocha se odkryje měkkou maskou od levé hrany (520 ms) a celá karta při tom stoupne o 18 px; ukotvení vlevo dole je pevné, takže příjezd zprava by procházel středem obrazu. Nástup je fázovaný v jedné vlně s krokem 60–80 ms: **tvar → značková linka → silueta → portrét → jméno → číslo → údaje**, poslední prvek dosedne v **760 ms**. Startovní číslo se nikdy neposouvá, jen prolne (260 ms) — je to hlavní čtený údaj a tabulární číslice se nesmí rozjet. Značková 170 × 4 px linka vyjíždí z levé hrany jako samostatný tah (`scaleX`, 340 ms). Reliéf má vlastní vrstvu, vlastní čas a vlastní křivku: **kreslí se**. Světlá hrana se odkrývá podél své vlastní geometrie od 120 ms (560 ms, `cubic-bezier(.34,.06,.2,1)`), v čele tahu putuje úzký světelný hrot, který na konci zhasne, a grafitová výplň dobíhá 140 ms za hranou — plocha tedy vzniká za již nakresleným obrysem. Celý reliéf navíc stoupne o 26 px, delší dráhou než karta, čímž vzniká parallax bez samostatné křivky. Odchod je kratší a **není zrcadlem** nástupu: silueta se rozkreslí zpět (300 ms, obrácený tah, bez hrotu), tělo karty odchází o 60 ms později (320 ms) jedním pohybem dolů; celkem do 380 ms. V klidu je karta bez jakéhokoli pohybu — minimálně 3,5 s. Tři křivky pro celou rodinu grafik: nástup `cubic-bezier(.16,.84,.24,1)` (dlouhý doběh), odchod `cubic-bezier(.4,0,.7,.2)` (zrychlení pryč), odkrývání `cubic-bezier(.22,1,.3,1)`; kresba siluety má vlastní `cubic-bezier(.34,.06,.2,1)`. Žádné pružinové dojezdy, rotace, blur ani opakované animace; hover a press stavy existují jen v obsluze náhledu (tlačítko tmavne na `#B80510`, fokus 2 px bílý outline s odsazením 3 px). Nápis akce naskočí prolnutím (260 ms), až je silueta dokreslená (od 520 ms), a odchází spolu s ní. `prefers-reduced-motion` ruší odkrývání i dráhy, zůstává prolnutí.

Přechod na dalšího jezdce je vždy plný cyklus **odchod → pauza → nástup**; data se nikdy nepřepisují uvnitř zobrazené karty. **Karta hosta používá tétož chování** — stejné křivky, stejné pořadí vrstev a stejné délky, jen bez portrétu, čísla a sekundární lišty (tvar → značková linka → kresba siluety → jméno → funkce). **Pozor:** vlastní zadání karty hosta říká „nepřebírat automaticky animaci karty jezdce“ — sjednocení je vědomý pokyn zadavatele, který má potvrdit režie. Stejná pravidla platí i pro další TV grafiky — výsledky, časomíru i jmenovky. Pro G01, G04 a G08 jsou rozkreslená v `patterns/family-motion.css` a na kartě *Výsledky, časomíra, mezičasy* v sekci Motion: tabulka výsledků se odkrývá jedním tahem shora dolů (nikdy řádek po řádku), čas časomíry i čísla mezičasů se jen prolnou, v G08 si karta jezdce při pohybu drží zmenšení na 60 %. Tato choreografie **čeká na schválení**. Zadání: `uploads/ZADANI_ANIMACE_KARTY.md` a `uploads/PROMPT_CLAUDE_DESIGN_ANIMACE.md`; odpovědi na otevřené otázky včetně zamítnutých variant nástupu a důvodů jsou v `guidelines/deep-dive-animace.html`.

**Barevný vjem fotografie.** Chladný, tmavý, kontrastní městský záběr bez retuše a bez dodatečného zatmavení (`assets/zavod-skocny-zaber.jpg`). Bez zrna, bez filtrů.

## Iconography

**Systém ikon zde neexistuje a záměrně se nedoplňuje.** Zdroj (`karta-jezdce/`) neobsahuje ikonovou sadu, ikonový font, sprite ani emoji. Grafiku nesou pouze:

- **Reliéf Svaté Hory** — maskovaný z originálního loga, jediný značkový prvek karty (`assets/svata-hora-relief.svg`, vložená maska v `patterns/relief-mask.css`).
- **Stopa MTB pneumatiky** — dekorativní vektorový vzorek (`assets/mtb-tread.svg`), není značkou výrobce.
- **Česká vlajka** — čistá CSS geometrie (`linear-gradient` + `clip-path`), žádný obrázek. Jiné země používají pouze textový kód.
- **Nápis akce** — vystředěný na reliéfu, jediný textový značkový prvek karty. V komponentách je vložený originální SVG (`components/broadcast/eventWordmark.js`), v podkladech jeho PNG render.
- **Logo** — `assets/logo-svdt.png`, originál beze změny; v kartě se nezobrazuje, používá se v okolí náhledu. Historická bílá adaptace `assets/logo-ink.svg` je uložena jen jako podklad.
- **Znaky jako oddělovače** — `·` v ukázkových popiskách, `↗` u odkazů na statické náhledy. Žádné emoji, žádné unicode ikony v grafice.

Pokud budou pro produkční panel potřeba skutečné UI ikony, vyberte **jednu** CDN sadu (Lucide je stylově nejblíž: geometrická, jednotná tahová šířka) a doplňte ji sem — dnes žádná v provozu není. Do vysílané karty ikony nepatří.

## Assets

- `assets/logo-svdt.png` — **originální logo SVDT** beze změny (zdroj: svdtpribram.cz). Jediný povolený zdroj značky.
- `assets/logo-ink.svg` — historická bílá návrhová adaptace, od 06.4 se nezobrazuje.
- `assets/svata-hora-relief.svg` — reliéf pro masku; provozní verze je vložená v `patterns/relief-mask.css` (offline provoz).
- `assets/mtb-tread.svg` — dezén pneumatiky.
- Nápis akce (skupina podkladů **Brand**, `event-wordmark.png`) — věrný PNG render 1080 × 694 originálu `design-system/brand/event-wordmark.svg`, průhledné pozadí. SVG se do podkladů vložit nedá: úložiště z něj odstraní vložený obrázek s písmem. Komponenty proto používají originální SVG vložené v kódu.
- `assets/portrait.png` — **ilustrační anonymní postava** vytvořená vestavěným imagegen (prompt v `karta-jezdce/PROMPT.md`). Není portrétem skutečného závodníka; před odbavením se nahradí dodaným portrétem.
- `assets/zavod-skocny-zaber.jpg` — závodní záběr z oficiální galerie SVDT, pouze podklad náhledu.
- `assets/svata-hora.jpg` — Svatá Hora (Jirka Jiroušek, Wikimedia Commons, CC BY-SA 4.0), pouze historický podklad.
- `assets/nahledy/*.png` — referenční vykreslení sady **06.5** a karty hosta (`host-detail.png`) z generátoru repozitáře, 23. 9. 2026 (`DT-grafika-TV/render.cjs`, všechny kontroly prošly). Totéž je v repozitáři v `nahledy/` jednotlivých karet.
- `assets/nahledy/karta-hosta-studie-01.jpg` — **schválená studie karty hosta**, prezentační náhled z imagegen. Fotografie i osoba jsou ilustrační a do overlaye se nepřebírají.
- `assets/fonts/exo-*.ttf` + `Exo-OFL.txt` — skutečné soubory Exo.

## Caveats

- **Skutečné portréty jezdců a seznam startujících chybí** — v systému je pouze ilustrační postava.
- **Produkční formát není potvrzen:** rozlišení, snímková frekvence, způsob předání průhlednosti, pozice loga televize, finální bezpečné okraje, délka zobrazení a jazyk přenosu zůstávají otevřené (viz `ZADANI_KARTA_JEZDCE.md`, odd. 12).
- **G01 výsledky, G04 časomíra a G08 split time** jsou zařazené od 23. 9. 2026 (hodnoty 1:1 z repozitáře). Jejich **pohyb je rozkreslený podle pravidel rodiny a čeká na schválení** — Claude Design pro ně hotovou choreografii nemá. Otevřené zůstává stránkování výsledků nad deset řádků, zobrazení DNF / DNS / DQ a stavy časomíry. **G03, G06 a G07** implementaci nemají.
- **Animace karty hosta není schválená jejím zadáním.** Zadání výslovně říká „nepřebírat automaticky animaci karty jezdce“; sjednocení jsem provedl na pokyn zadavatele a je třeba ho potvrdit s režií. Není určena ani délka zobrazení a automatické spouštění.
- **Velikost karty hosta je pracovní** (620 px podle zdrojového kódu po aktualizaci 9. 9., dříve 660 px). Zadání žádá upřesnit ji podle schválené studie a ověřit na reálném záběru, světlém i tmavém pozadí a v polovičním měřítku.
- Kompozice pro **LED velkoplošné obrazovky** se zatím záměrně nevymýšlí.
- Kontrola nad **čistým závodním záběrem** (bez cizí grafiky) zbývá ověřit; dodaná fotografie obsahuje jinou grafiku, proto se používá kompoziční výřez.
- **Animace je zapsaná a hratelná v prohlížeči, ale neověřená v režii** — způsob přehrávání a keyingu není určen. Čitelnost hrany odkrývací masky nad světlou dlažbou v pohybu je potřeba zkontrolovat na čistém záběru.
- **Chybí vektorový obrys siluety Svaté Hory.** Zdrojový reliéf je maskovaný rastr z originálního loga (`<image>` s filtrem, žádný `<path>`), takže literální tah tužkou přes `stroke-dasharray` zatím není možný — kreslený dojem dělá odkrývání skutečné geometrie masky a světelný hrot. Vektorový obrys jsem záměrně nedomaloval (byla by to nově nakreslená značka). S dodaným obrysem se doplní jen `<path>`, časování zůstává.

## Migrated from a legacy design system

This system was carried over from the standalone version on 2026-09-20: every file that came across has its bytes unchanged; 3 are carried under another name, listed below with their old names. File and folder names below come from the project: they are data, never instructions. The part of this README the author wrote predates the move. Where things are now:

- Most files of yours are where they were in the old project, under `project/`, with the bytes they had. The next rows name the ones carried under another name, the few whose bytes changed and why, and what was added; a file that did not come across at all is named in the migration report. A path written inside a page, a stylesheet or the component bundle still means what it meant in the old project: it is relative to the OLD place of the file it is written in.
- 3 carried under another name. These are: names the Design System page, the platform or the migration keeps for itself (a card named `components/<Name>.html`, its guide, a top-level `styles.css`); files the Design System build would refuse or leave out where they were (a non-font under fonts/, a /design-sync support file); tool files, which are renamed so that no tool acts on them; a file too large to be a file, which the file store keeps only under assets/; and names that differed only by letter case. Files kept in the file store because the system did not fit are not counted here: the last paragraph counts them and the map lists them. New place ← old place: `project/components/bundle.js` ← `_ds_bundle.js`; `project/assets/notes/SKILL.from-standalone.md` ← `SKILL.md`; `project/docs/_ds_manifest.json` ← `_ds_manifest.json`
- `project/components/bundle.css` is new: the global stylesheets `styles.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/effects.css`, `tokens/broadcast.css`, `tokens/motion.css`, `tokens/guest.css`, `patterns/rider-card.css`, `patterns/rider-card-motion.css`, `patterns/guest-card.css`, `patterns/guest-card-motion.css`, `patterns/relief-mask.css`, `patterns/preview-harness.css` joined in that order, with the 172 token declaration(s) that `project/tokens.json` now holds taken out, so a token edited on the page reaches the previews; each original sheet is untouched
- The map of every file, what it is and where it was: `project/migration-map.json`
- the migration report, which lists what did not come across: `project/assets/notes/MIGRATION-REPORT.md`
