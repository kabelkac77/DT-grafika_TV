# Prompt pro Claude Design — animace karty jezdce SVDT

## Kontext

Máme schválenou statickou grafickou kartu jezdce (HTML/CSS, plátno 1920×1080,
broadcast overlay pro TV přenos Svatohorského Downtownu Příbram). Kartu teď
potřebujeme oživit animací nástupu a odchodu. Toto je referenční animace pro
celou budoucí rodinu grafik (výsledky, časomíra atd.) — styl animace se musí
dát později přenést i na ně, takže má vzniknout jako sada pravidel, ne jako
kód natvrdo vázaný jen na tuto kartu.

## Účel karty a kdy se objevuje

Karta se zobrazuje ve chvíli startu jezdce a po krátkou dobu (cca 3–5 sekund)
ho divákovi představuje — jméno, startovní číslo, tým, zemi, kategorii, případně
portrét. Na obrazovce je vždy jen jeden jezdec, žádný seznam ani souběžné karty.
Po odprezentování karta odejde a čeká na dalšího jezdce (samostatný, oddělený
cyklus nástup → krátké zobrazení → odchod).

## Úroveň provedení

Chceme **luxusní, prémiovou animaci na úrovni televizní grafiky** velkých
sportovních přenosů — ne web efekt s fade/slide navíc. Pohyb má působit
sebejistě, čistě, promyšleně. Žádná hravost, žádné pružinové doskoky,
žádné poskakování.

Animace **nesmí rušit celkový televizní obraz**: musí zůstat čitelná a
elegantní i nad pohybujícím se závodním záběrem, nesmí zabírat pozornost
víc, než kolik jí karta jezdce potřebuje, a musí nechat co nejvíc prostoru
volnému hlavnímu obrazu (živý závod). Karta zůstává ukotvená vlevo dole,
zbytek obrazu je vždy volný.

## Vizuální DNA karty (závazné, nemá se měnit)

- Barvy: značková `#E30613` jen na malé přesné plochy/linky, akcentní `#FF1A1A`
  výhradně na startovní číslo. Role obou červených se nesmí zaměnit ani v pohybu.
- Tmavý povrch karty `#19232e`, useknuté rohy (ne ostrý obdélník, ne kulatý roh),
  jemná textura MTB pneumatiky na pozadí, mizející gradientem doleva.
- Nad kartou siluetový architektonický reliéf Svaté Hory — je to samostatný
  vizuální prvek, ne pevně přilepený k tělu karty, a má prostor pro vlastní pohyb.
- Písmo Exo, příjmení nejtěžší řez a opticky dominuje, číslo nejtěžší řez v
  akcentní červené, tabulkové číslice.
- Dvě rozložení (vodorovné A, rohové B), obě ve variantě s portrétem i bez něj —
  animace musí fungovat na obou stejně.

## Co má animace obsahovat

### 1. Nástup karty
Navrhni 2–3 varianty směru/způsobu nástupu karty do obrazu (např. jemný posun
zdola, přisunutí od okraje, odkrývání na místě) a doporuč jednu jako hlavní směr
s odůvodněním, proč nejlépe sedí k „prémiové, klidné" povaze grafiky a k tomu,
že karta je ukotvená vlevo dole. Délka orientačně 400–700 ms, přesnou hodnotu
a easing křivku navrhni tak, aby pohyb působil jako promyšlený broadcast doběh
(např. výrazné zpomalení na konci), ne jako lineární web transition.

### 2. Kresba siluety Svaté Hory
Silueta se nemá jen objevit nebo prolnout — má se **vykreslit jako tahem tužky**,
tedy postupné odkrytí obrysu podél jeho vlastní linie (technicky např.
`stroke-dasharray` / `stroke-dashoffset` draw-on efekt na obrysu, případně
navazující výplň plochy poté, co je obrys hotový). Toto kreslení má vlastní,
od těla karty oddělené časování — navrhni, jestli má proběhnout před tělem karty,
po něm, nebo souběžně jinou křivkou, a zdůvodni to. Cíl: pocit ručně kreslené,
vrstvené grafiky, ne jednoho plochého fade.

### 3. Odkrývání obsahu karty
Navrhni, zda se jméno/číslo/sekundární údaje objeví najednou s tělem karty,
nebo v jemně odstupňovaných fázích (tvar karty → číslo → jméno → sekundární
údaje). Pokud fázovaně, urči pořadí a orientační zpoždění mezi fázemi tak,
aby celkový nástup i se siluetou nepřekročil rozumnou dobu pro krátké,
cca 3–5sekundové zobrazení karty.

### 4. Setrvání na obrazovce
Karta stojí klidně, bez opakovaných animací, po dobu cca 3–5 s (přesnou délku
řídí obsluha ručně, není to pevná hodnota v kódu).

### 5. Odchod karty
Navrhni odchod — může být zrcadlový k nástupu nebo jednodušší/rychlejší, ale
musí působit stejně úmyslně, ne jako obyčejné zmizení. Řekni, zda i tady může
mít silueta odlišené časování od těla karty (např. rozkreslí se zpět, karta
mezitím už odjíždí).

### 6. Pravidla pro přenositelnost
Popiš navrženou animaci jako obecně formulovanou sadu pravidel (délky, křivky,
pořadí fází) tak, aby šla později aplikovat i na jiné typy karet (výsledky,
časomíra) se stejným pocitem stylu, i když budou mít jiný obsah a možná
i jiný tvar.

## Tvrdá omezení

- Žádné opakované/nekonečné animace v klidovém stavu.
- Žádné vržené stíny, žádné plošné zatmavení celého obrazu.
- Nezaměňovat role barev `#E30613` a `#FF1A1A`.
- Neměnit kompozici karty (rozestupy, velikosti) — animovat jen pozici/
  viditelnost/odkrývání.
- Karta musí zůstat čitelná nad pohybujícím se závodním obrazem po celou dobu
  animace, včetně přechodových fází.
- Bez cizích značek, hover efektů nebo ovládacích prvků náhledu ve výsledné
  vysílané grafice.
- Na obrazovce je vždy jen jeden jezdec — neřešit souběžné karty ani fronty;
  další jezdec dostává vlastní plný cyklus odchod → nástup, ne přepis dat
  uvnitř stále zobrazené karty.

## Technický kontext

Zdrojová karta je čisté HTML/CSS/JS bez frameworků. Animace by měla zůstat
realizovatelná stejným způsobem (CSS transitions/animations, případně SVG
pro kreslený efekt siluety), aby šla napojit na stávající produkční pipeline
(`render.cjs`, Playwright, GitHub Actions). Plátno 1920×1080, průhledné okolí
karty, žádné pozadí není součástí grafického výstupu.

## Co chceme jako výstup

1. Doporučený hlavní směr nástupu s krátkým zdůvodněním + 1–2 alternativy k
   porovnání.
2. Popis časování kresby siluety vůči tělu karty.
3. Návrh fázování odkrývání obsahu (nebo zdůvodnění, proč vše najednou).
4. Konkrétní orientační délky a easing křivky pro nástup i odchod.
5. Krátký, obecně formulovaný soubor animačních pravidel použitelný i pro
   další typy karet.
