# SVDT — animace grafických karet pro TV (zadání pro Claude Design)

Zdroj: schválená karta jezdce, verze 06.4 (`karta-jezdce/`), HTML/CSS bez závislostí,
plátno 1920 × 1080. Toto zadání extrahuje vizuální styl karty jezdce jako **referenční
DNA** pro rodinu grafik, které se budou postupně objevovat v TV přenosu (karta jezdce,
výsledková tabulka, časomíra, rozhovorová jmenovka...). Cíl: všechny mají působit jako
jedna vizuální rodina, ne jako oddělené grafiky.

## 1. Účel

Navrhnout animovaný nástup a odchod (in/out) grafické karty přes živý obraz TV
přenosu, v identitě SVDT, který bude opakovaně použitelný napříč různými typy karet
(jezdec, výsledek, časomíra...). Tato karta jezdce je referenční vzor stylu — první,
na které se pravidla animace ustálí a pak přenesou dál.

## 2. Vizuální DNA (z karty jezdce 06.4 — závazné)

### Barvy
- `--brand: #E30613` — značková červená. Používá se na malé, přesné plochy: spodní
  4px linka karty (`.shell:after`), akcentní linky/oddělovače. Nikdy jako velká plocha.
- `--accent: #FF1A1A` — akcentní červená. Používá se výhradně na startovní číslo /
  klíčové číselné údaje (`.bib strong`). Rozdíl rolí obou červených je záměrný a
  musí zůstat zachovaný i v animaci (např. barva se v pohybu nesmí zaměňovat).
- Tmavý povrch karty: `#19232e` (proměnná `--surface`), s jemným gradientem do
  `#17212c` a texturou (viz níže).
- Text: bílá `#fff` pro hlavní jméno, `#c1cad3` / `#e2e7ec` pro sekundární údaje
  (tým, země, kategorie).

### Tvar a materiál
- Karta má **useknuté rohy** (`clip-path: polygon(...)`) — ne ostrý obdélník, ne
  zaoblený roh. Tenký úkos cca 10–14 px na dvou protilehlých rozích.
- Jemná diagonální textura MTB pneumatiky na pozadí karty (`assets/mtb-tread.svg`),
  velmi tlumená (opacity ~0.35), mizející směrem doleva gradientem — dekor, ne hlavní prvek.
- Siluetový reliéf Svaté Hory nad kartou, maskovaný jako architektonický obrys
  (`.architecture`), barva tmavě modro-šedá (`#26323f` → `#19232e`), se světlou
  1px hranou (`#8795a3`). Je to značkový podpis karty, ne pozadí. **Pro animaci
  není pevnou, staticky přilepenou součástí shellu karty** — je to samostatný
  vizuální prvek nad kartou a smí (resp. má) mít vlastní pohyb/časování nezávislé
  na tvaru karty (viz animační bod 4 níže), pokud to zesílí pocit prémiové vrstvené
  grafiky.
- Portrét (je-li) má měkký gradientní přechod do podkladu karty (mask-image
  fade doprava), nikdy ostrý ořez.

### Typografie
- Písmo **Exo** (400/500/700/800/900), žádné jiné písmo ani systémový fallback
  ve finální grafice.
- Jméno: křestní jméno lehčí řez (400), příjmení nejtěžší řez (900), verzálky,
  mírně negativní stopování. Sdílejí jeden řádek/blok, příjmení opticky dominuje.
- Číslo: nejtěžší řez (900), velké, tabulkové číslice (`font-variant-numeric:
  tabular-nums`), barva `--accent`.
- Sekundární údaje (tým/země/kategorie): střední řez, menší velikost, oddělené
  tenkou svislou linkou mezi položkami.

### Rozměry (na plátně 1920×1080)
- Karta ukotvená **96 px od levého okraje, 80 px od spodního okraje**.
- Bezpečná zóna pro klíčový obsah: min. 5 % od okrajů plátna (96 px / 54 px).
- Dvě rozložení, každé ve variantě s portrétem / bez portrétu:
  - **Vodorovná (A):** šířka 1120 px (bez portrétu 940 px), nízký pruh, portrét
    vlevo jako úzký sloupec.
  - **Rohová (B):** šířka 610 px (bez portrétu 470 px), portrét nahoře, údaje pod ním.

## 3. Animace — aktuální stav a co je potřeba navrhnout

**Aktuálně hotovo (jen fade, žádný pohyb tvaru):**
- Nástup/odchod: změna `opacity` + `translateY(24px)`, délka 350 ms, `ease`.
- Respektuje `prefers-reduced-motion` (animace se vypne).
- Žádné opakované animace, žádné poskakování, žádné hover efekty (ty existují jen
  v editačním rozhraní náhledu, nikdy ne ve vysílaném obraze).

**Úroveň provedení: prémiová, televizní kvalita.** Toto není rychlá interní
úprava webové komponenty — je to grafika, která poběží v živém TV přenosu a musí
působit jako placená broadcast grafika (srovnatelná s grafikou velkých sportovních
přenosů), ne jako web widget s CSS transition navíc. Plynulost, načasování a detail
odkrývání mají mít prioritu před jednoduchostí implementace.

**Kontext nasazení:** na obrazovce se v jednu chvíli objevuje vždy jen jeden
jezdec — nejde o seznam/žebříček ani o souběžné karty vedle sebe. Animace tedy
neřeší rozestupy mezi více kartami ani hromadné přepínání; řeší jeden ucelený
cyklus pozornosti diváka: karta se objeví, jezdec je jasně identifikován, karta
odejde. Další jezdec dostane vlastní, samostatný cyklus nástup/odchod.

**Co má Claude Design navrhnout/rozšířit:**
1. Vstupní animace (in) — jak karta „přijede" do obrazu. Sebejistý, prémiový
   broadcast pohyb — ne hravý/pružinový, ne rychlý „web fade". Zvážit jemný pohyb
   zprava/zdola v souladu s ukotvením vlevo dole, nebo postupné odkrývání textur/
   architektury/textu ve fázích (nejdřív tvar karty, pak text, pak číslo). Klidně
   v řádu 400–700 ms, pokud to zvýší pocit kvality — délka není svázaná strohým
   webovým standardem 350 ms, tu hodnotu bereme jako dosavadní pracovní výchozí bod,
   ne jako strop.
2. Výstupní animace (out) — může být zrcadlová k nástupu nebo jednodušší/rychlejší;
   měla by ale působit stejně úmyslně a čistě jako nástup, ne jako obyčejné zmizení.
3. Protože je na obrazovce vždy jen jeden jezdec, animace řeší jen dva stavy karty
   (schovaná / zobrazená) a přechod mezi nimi pro dalšího jezdce je vždy plný cyklus
   odchod → (pauza) → nástup, nikdy plynulý přepis dat uvnitř stále zobrazené karty.
4. Jak se má chovat reliéf/textura během pohybu — mají se hýbat spolu s kartou
   jako jeden celek, nebo se objevit s jiným, jemně odlišeným časováním (parallax)?
   Viz bod 2 níže — silueta už teď není pevně svázaná s kartou, takže má prostor
   pro vlastní, samostatný vstup.
5. Přenositelnost patternu na další typy karet (výsledky, časomíra) — animace by
   měla být definovaná jako sada pravidel (délka, křivka, pořadí odkrývání), ne
   jen jako hotový kód vázaný na tuto jednu kartu.

## 4. Tvrdá omezení (nepřekračovat)

- Žádné opakované/nekonečné animace v klidovém stavu — karta jednou nastoupí,
  chvíli stojí klidně, jednou odejde.
- Žádné vržené stíny, žádné velké plošné zatmavení přes celý obraz kvůli kontrastu.
- Barvy `--brand` a `--accent` se nesmí zaměnit ani sloučit do jedné role.
- Animace nesmí měnit kompozici karty (rozestupy, velikosti) — jen její pozici/
  viditelnost/odkrývání.
- Karta musí i uprostřed animace zůstat čitelná nad pohybujícím se závodním
  obrazem (žádná průhlednost, která by splynula s pozadím).
- Bez cizích značek, hover efektů nebo prvků ovládání náhledu ve výsledné animaci.
- Na obrazovce je vždy jen jeden jezdec — animace neřeší souběžné karty, fronty
  ani hromadné přepínání seznamu; pouze jeden čistý cyklus nástup/odchod na jezdce.
- I přes prémiovou úroveň provedení animace nesmí sklouznout k hravosti/pružinovým
  efektům — cíl je uklidněná, sebejistá elegance odpovídající broadcast grafice,
  ne showy motion design.

## 5. Technický kontext

- Zdrojová karta je čisté HTML/CSS/JS bez frameworků a bez závislostí — animace
  by měla zůstat v tomtéž duchu (CSS transitions/animations, případně malý JS),
  aby ji šlo napojit na stejný produkční pipeline (`render.cjs`, Playwright,
  GitHub Actions).
- Plátno 1920×1080, průhledné okolí karty (broadcast overlay), žádné pozadí není
  součástí grafického výstupu.
- Cílové prostředí: TV přenos + velkoplošné obrazovky (přesný způsob přehrávání/
  keyingu zatím neurčen produkcí — otevřený bod, viz zadání karty jezdce bod 12).

## 6. Otevřené otázky pro Claude Design

- Preferovaný směr vstupu karty (zprava, zdola, kombinovaně)?
- Fázované odkrývání prvků (tvar → text → číslo) vs. jeden plynulý pohyb celku?
- Jaké přesné, odlišené časování dostane architektonická silueta oproti tělu
  karty, aby vznikl pocit vrstvené, prémiové grafiky (např. lehké zpoždění nebo
  jiná křivka pohybu), a jak dlouho smí trvat, aniž by to začalo působit pomalu?
- Jaká přesná délka a easing křivka nejlépe vystihne „prémiový broadcast" pocit
  (např. pomalejší doběh na konci pohybu místo lineárního/ease-out webového stylu)?
