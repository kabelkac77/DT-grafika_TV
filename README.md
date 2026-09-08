# SVDT — grafika pro televizní přenos

Repozitář obsahuje zadání, společný design systém a pracovní grafické výstupy pro televizní přenos a velkoplošné obrazovky závodu **Svatohorský Downtown Příbram (SVDT)**.

Projekt je ve fázi návrhu. Aktuální grafiky jsou vizuální studie, nikoliv schválené vysílací šablony.

## Aktuální struktura

| Cesta | Obsah |
| --- | --- |
| `ZADANI.md` | Společné zadání projektu, potvrzené požadavky a otevřené otázky |
| `design-system/` | Pravidla značky, designové tokeny, komponenty a ukázkové výstupy |
| `karta-jezdce/` | Vizuální studie G02 — představení jezdce, zdrojové soubory, podklady a náhledy |

Složky pro další grafické části budou vytvořeny až při zahájení jejich realizace, aby prázdná struktura nepředstírala hotový rozsah.

## Aktuální stav

- G02 — karta jezdce: existuje interaktivní vizuální studie ve variantách A a B.
- G01 a G03–G07: jsou vymezeny v zadání, ale zatím nemají vlastní implementaci.
- G08 — ztráta nebo zisk na úsecích: volitelné rozšíření závislé na dostupnosti mezičasů.
- Produkční formát, napojení časomíry a způsob odbavení musí být potvrzeny s režií.

## Jak otevřít kartu jezdce

1. Stáhněte nebo naklonujte repozitář.
2. Otevřete `karta-jezdce/index.html` v aktuálním Chrome nebo Edge.
3. Náhled funguje lokálně bez serveru a bez připojení k internetu.

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
