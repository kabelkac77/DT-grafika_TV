# UI kit — karta jezdce (G02, verze 06.5)

Rekreace obsluhovaného náhledu z `DT-grafika-TV/karta-jezdce/index.html` zdrojového repozitáře, postavená na komponentách tohoto design systému.

- `index.html` — spustitelný náhled. Přepíná rozložení A/B, ukázková data, pozadí (závodní záběr / světlé / tmavé / průhledné okolí), portrét a bezpečné okraje; kartu lze skrýt a zobrazit.
- Obal stránky (hlavička, editor údajů, srovnání variant, patička) je vložený přímo v `index.html` — záměrně, aby se kód náhledu nekompiloval do knihovny komponent. Grafiku samotnou vykresluje `RiderCard`, plátno `BroadcastStage`, obsluhu `PreviewControls` a `BroadcastStatus`.
- `data.js` — čtyři ukázkové scénáře ze zadání: běžný, dlouhé texty, neúplný, chybějící jméno/číslo. **Fiktivní data.**
- `page.css` — pouze obal stránky náhledu; nepatří do design tokenů.

Ovládání, popisky a stavová řádka nejsou součástí vysílaného obrazu. Závodní fotografie je podklad náhledu, ne grafický výstup.

Druhá obrazovka zdroje (`srovnani.html`, statická přehledová sada čtyř variant) je v tomto systému zastoupena kartou **Schválená sada 06.4** v `guidelines/brand-reference.html` — vychází ze stejných PNG náhledů.
