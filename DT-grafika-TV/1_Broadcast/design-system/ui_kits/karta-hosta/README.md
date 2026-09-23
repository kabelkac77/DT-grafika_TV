# UI kit — karta hosta (verze 01)

Rekreace obsluhovaného náhledu z `DT-grafika-TV/karta-hosta/index.html` zdrojového repozitáře, postavená na komponentách tohoto design systému.

- `index.html` — spustitelný náhled. Přepíná ukázková data, pozadí (neutrální vstup / závodní záběr / světlé / tmavé / průhledné okolí), bezpečné okraje a přehrává nástup i odchod. Obal stránky je vložený přímo v souboru, aby se kód náhledu nekompiloval do knihovny komponent.
- `data.js` — čtyři ukázkové scénáře: běžný, dlouhé jméno a funkce, bez funkce, chybějící jméno. **Fiktivní data.**
- Styl obalu stránky se přebírá z `../karta-jezdce/page.css` — neduplikuje se.

Grafiku vykresluje `GuestCard` (jméno `GuestName`, reliéf `SvataHoraRelief`), plátno `BroadcastStage`, obsluhu `PreviewControls` a `BroadcastStatus`.

Ovládání, popisky a stavová řádka nejsou součástí vysílaného obrazu. Ilustrační fotografie a osoba ze schválené studie se do overlaye nepřebírají.

**Animace.** Chování je sjednoceno s kartou jezdce (stejné křivky, stejné pořadí vrstev, nástup do 760 ms, odchod do 380 ms) podle pokynu zadavatele. Vlastní zadání karty hosta animaci zatím neschvaluje a výslovně říká „nepřebírat automaticky animaci karty jezdce“ — sjednocení je tedy vědomé rozhodnutí, které má potvrdit režie.
