# SVDT — grafika pro televizní přenos

Repozitář obsahuje zadání, společný design systém a pracovní grafické výstupy pro televizní přenos a velkoplošné obrazovky závodu **Svatohorský Downtown Příbram (SVDT)**.

Karta jezdce G02 má schválený vizuální směr 06.4 zapracovaný do zdrojového kódu. Napojení dat a ostré odbavení zůstávají k ověření s režií.

## Aktuální struktura

| Cesta | Obsah |
| --- | --- |
| `ZADANI.md` | Společné zadání projektu, potvrzené požadavky a otevřené otázky |
| `karta-vysledky/` | G01 — deset výsledků, loga, HTML/CSS generátor a zadání |
| `karta-hosta/` | HTML/CSS editor a generování decentní jmenovky hosta (jméno a funkce) |
| `design-system/` | Pravidla značky, designové tokeny, komponenty a ukázkové výstupy |
| `karta-jezdce/` | Vizuální studie G02 — představení jezdce, zdrojové soubory, podklady a náhledy |
| `docs/` | Dashboard stavu zadání — `dashboard.body.html` je zdroj, `index.html` se z něj generuje |

Složky pro další grafické části budou vytvořeny až při zahájení jejich realizace, aby prázdná struktura nepředstírala hotový rozsah.

## Karta hosta

[Schválený návrh a zadání karty hosta](karta-hosta/README.md) — studie 01. Jméno a funkce pro vstupy mezi jízdami; navazuje na kartu jezdce 06.4. HTML/CSS editor a generování PNG jsou implementované; animace následuje později.

## Dashboard stavu zadání

Přehled toho, co je v zadání potvrzené, co je rozpracované a na kom se čeká, najdete
v `docs/`. Zobrazuje otevřené otázky podle oddílů `ZADANI.md`, připravenost jednotlivých
oddílů, stav grafických částí G01–G08 a postup projektu.

- Zdroj obsahu: `docs/dashboard.body.html` — data jsou v poli `SECTIONS` ve skriptu na konci souboru.
- Po úpravě spusťte `npm run dashboard`; vygeneruje se samostatná stránka `docs/index.html`.
- Dashboard je ruční shrnutí stavu zadání, ne automaticky generovaný výstup z `ZADANI.md`.

## Aktuální stav

- G02 — karta jezdce: aktuální verze **06.5**, vodorovná a rohová karta, obě s portrétem i bez něj. Celý reliéf, jemná MTB stopa a menší bílý nápis z loga pod reliéfem.
- G05 — karta hosta: funkční jmenovka se jménem a funkcí, společné generování s kartou jezdce.
- G01 — karta výsledků: funkční HTML/CSS generátor podle studie 04; [zdroje a návod](karta-vysledky/README.md), [zadání](karta-vysledky/ZADANI_KARTA_VYSLEDKU.md). Živá data a editor rozmístění log navazují později.
- G03, G04, G06 a G07: jsou vymezeny v zadání, ale zatím nemají vlastní implementaci.
- G08 — ztráta nebo zisk na úsecích: volitelné rozšíření závislé na dostupnosti mezičasů.
- Produkční formát, napojení časomíry a způsob odbavení musí být potvrzeny s režií.

## Jak otevřít kartu jezdce

1. Stáhněte nebo naklonujte repozitář.
2. Otevřete `karta-jezdce/index.html` v aktuálním Chrome nebo Edge.
3. Náhled funguje lokálně bez serveru a bez připojení k internetu.

Všechny čtyři varianty najdete v [přehledové kompozici](karta-jezdce/nahledy/SVDT-srovnani-A-B.png) nebo v `karta-jezdce/srovnani.html`.

Podrobnosti, použité podklady a kontrolní scénáře jsou popsány v [dokumentaci karty jezdce](karta-jezdce/README.md).

## Generování náhledů z iPadu

Náhledy není nutné generovat přímo na iPadu. V záložce **Actions** lze ručně spustit workflow **SVDT — generování náhledů**. GitHub na vzdáleném počítači nainstaluje potřebné nástroje, vytvoří náhledy, provede kontroly a zpřístupní výsledný ZIP jako artefakt běhu.

Stejné ověření probíhá automaticky při změnách karty jezdce v Pull Requestu. Pro lokální spuštění na počítači slouží příkazy `npm install`, `npx playwright install chromium` a `npm run render`.

## Pravidla pro další grafické části

- Každá grafická část G01–G07 dostane vlastní složku a vlastní `README.md`.
- Společné barvy, typografie a vizuální principy vycházejí z `design-system/`.
- Zdrojové soubory, editovatelné podklady a exporty musí být jasně rozlišené.
- Externí nebo neveřejné podklady se v dokumentaci označí jako podklady mimo repozitář.
- Ukázková data musí být označena jako fiktivní a nesmí se zaměnit za skutečné výsledky.
- Produkční rozhodnutí se nezafixují, dokud je nepotvrdí režie, časomíra nebo zadavatel.

## Grafické soubory a velikost repozitáře

GitHub blokuje běžné Git soubory nad 100 MB a u velkých souborů může zobrazovat varování. Velké editovatelné zdroje, například PSD, AI nebo TIFF, proto později uložíme přes Git LFS nebo do dohodnutého úložiště.

Vygenerované náhledy se mají udržovat pouze v rozsahu potřebném pro kontrolu a schválení. Pravidla pro exporty a automatické kontroly doplníme v navazujícím technickém kroku.

## Společný generátor

Otevřete `index.html` pro výběr karty jezdce, hosta nebo výsledků. `npm run render` generuje všechny tři karty, `npm run render:host` pouze hosta a `npm run render:jezdec` pouze jezdce. V Actions můžete při ručním spuštění zadat jméno a funkci hosta; PNG všech karet najdete v balíčku `svdt-grafika-nahledy`. Úpravy v prohlížeči se nepřenášejí automaticky do Actions — použijte vstupní pole workflow nebo změňte data.js.


Výsledky samostatně: `npm run render:vysledky`. V Actions lze zadat `results_category`, `results_run_type` a kompletní `results_json`. [Návod k výsledkové kartě](karta-vysledky/README.md).


## Společný styl — 9. 9. 2026

Všechny čtyři varianty jezdce, host a výsledková tabulka používají menší nápis SVATOHORSKÝ / DOWN / TOWN centrovaný pod celým reliéfem. Bez kruhu, přidané linky a letopočtu. Písmo je převzaté z původního loga ve společném `design-system/brand/event-wordmark.svg`. Host je mírně menší (620 px). Aktuální zdrojové náhledy jsou ve složkách karet; animace zadavatel upřesní později.
