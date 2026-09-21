# G01 — karta výsledků

> Aktualizace 9. 9. 2026: platí společný styl s menším bílým nápisem SVATOHORSKÝ / DOWN / TOWN vycentrovaným pod celým reliéfem. Pouze písmo z původního loga, bez kruhu, přidané linky a roku. Tato aktualizace nahrazuje předchozí zákaz samostatného nápisu. Animace budou upřesněny zadavatelem později; tato změna žádné nové animace nezavádí.


Stav: implementace 01 podle poslední schválené studie 04; zadavatel 9. 9. 2026 požádal o uložení zdrojů, generátoru a tohoto zadání do GitHubu.

## Potvrzený vzhled a obsah

- Jedna společná grafická plocha: vlevo výsledky, vpravo menší prostor pro loga. Žádný nadpis „Partneři“.
- Celý reliéf Svaté Hory na pravém vnějším kraji horní hrany; nesmí být oříznutý. Stejný podklad jako u karty jezdce a hosta, bez dalšího bílého loga DownTown.
- Grafitové pozadí, jemná stopa MTB pneumatiky, bílé písmo Exo, střídmý červený akcent. Výsledky mají přednost před logy.
- Hlavička: měnitelná kategorie a typ jízdy (například ELITE / KVALIFIKACE). Příklady kategorií ani jízd nejsou napevno závodními pravidly.
- Deset výsledků: startovní číslo, jméno, stát třípísmenným kódem (CZE), čas / ztráta. Číslo je startovní číslo, nikoli pořadí.
- První řádek obsahuje absolutní čas, další kladný rozdíl proti vedoucímu, například +0.250 s. Při shodě časů +0.000 s; pořadí při shodě zachovat podle zdroje.
- Jména a časy později přicházejí z externího serveru. Aktuální data jsou fiktivní.

## Co je implementováno

HTML/CSS karta s odděleným data.js a API window.SVDTResults.setData(data). Náhled má změnu kategorie a jízdy, import/export JSON, světlé/tmavé/průhledné pozadí, ukázkové rezervy log a okamžité skrytí. Společný generátor vytváří PNG stejně jako u ostatních karet. Animace zatím není určena.

Pracovní plátno 1920 × 1080. Panel vlevo 96 px, nahoře 190 px, šířka 1728 px. Reliéf zasahuje nad panel, celý zůstává uvnitř bezpečného prostoru. Pravý sloupec má šířku 320 px; nejde o samostatnou kartu. Parametry jsou pracovní do ověření s režií.

Výstup capture=1 skrývá ovládání a prezentační popisky. Výchozí průhledný PNG neobsahuje pomocné rámečky ani slovo LOGO. Světlý a tmavý kontrolní náhled rezervy záměrně ukazuje. Skutečná loga se načítají z assets/ a zachovávají poměr stran.

## Datová smlouva první verze

- category, runType: neprázdné texty.
- results: nejvýše 10 záznamů v pořadí od nejrychlejšího; number, firstName, lastName, country, timeMs.
- timeMs je celé nezáporné číslo v milisekundách. Formát lídra m:ss.mmm, rozdíly +s.mmm s. Rozdíl se počítá z integer hodnot, nikoli z desetinných sekund.
- logos: nepovinné pole nejvýše pěti objektů src a alt. Cesty jsou lokální, například assets/partner.png. Výchozí pole je prázdné.
- Generátor neurčuje soutěžní pořadí ani nejlepší jízdu: přijímá již vybranou kategorii, jízdu a seřazenou desítku. Neseřazené časy, duplicitní startovní čísla, více než 10 řádků nebo neplatná data odmítne. Při neplatném importu zůstane poslední platná sada a editor hlásí chybu.
- Méně než 10 dodaných výsledků nevytváří fiktivní řádky. Prázdná sada skryje kartu. Dlouhé jméno se zmenšuje nejvýše na 24 px; pokud se stále nevejde, karta se skryje s upozorněním, místo oříznutí jména.

## Navazující HTML editor nad přenosem — potvrzený požadavek

Při tvorbě HTML vrstvy pro přenos vytvořit také editor. Rozmístění log nechává zadavatel na volbě obsluhy v tomto editoru. Loga zůstávají součástí jedné výsledkové tabulky. Obsluha má upravovat jejich rozmístění a velikost v pravé části a vidět náhled před odvysíláním. Ovládací prvky editoru se nesmějí dostat do obrazu.

Nynější rozložení pěti míst je pouze výchozí ukázka, nikoli pevná budoucí hierarchie partnerů. Volné rozmísťování, ukládání konfigurací a oddělené odbavení do živého přenosu zatím nejsou implementovány. Způsob propojení editoru s vysílanou vrstvou, počet míst, poměry log a technické prostředí se upřesní při realizaci této vrstvy.

## Externí server — další etapa

Dohodnout endpoint, formát zpráv, identifikaci závodu/kategorie/jízdy, aktualizační interval nebo push protokol, CORS a případnou autentizaci. Adaptér pak převede odpověď na datovou smlouvu karty. setData je připravený vstup rendereru, nikoli hotové síťové napojení.

S časomírou a režií určit: autoritativní pořadí, penalizace, DNS/DNF/DSQ, stránkování při více než deseti výsledcích, průběžné versus finální výsledky, stáří dat, opravy, výpadky a chování při obnově spojení. Nynější renderer podporuje jen platné dokončené časy; další stavy nepředstírat nulovým časem. Způsob synchronizace a aktualizace viditelné tabulky ani animace nejsou tímto dokumentem schváleny.

## Ověření

Automatický renderer kontroluje deset řádků, čas a rozdíl, shodu časů, bezpečnost textu, dlouhá jména, neplatný import, prázdnou tabulku, import/export JSON, skrytí ovládání a celý reliéf. Kontroly a PNG jsou v artefaktu GitHub Actions. Ostré nasazení vyžaduje zkoušku čitelnosti nad pohybujícím se přenosem a potvrzení technických parametrů režií.


Sdílený zdroj písma loga: `../../design-system/brand/event-wordmark.svg`; pozice a velikosti: `../../design-system/brand/event-wordmark.css`. Jde o výřez původního loga se zachovanými tvary písmen a texturou, nikoli náhradní font. Osa nápisu je shodná s osou celého reliéfu. Automatické kontroly ověřují načtení, vystředění, umístění uvnitř karty a nepřekrývání údajů ani partnerů. Aktuální náhledy vznikají z kódu; starší studie jsou pouze historické reference.
