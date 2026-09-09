# Karta hosta — funkční verze 01

Karta je implementována v HTML/CSS. Otevřete `index.html` nebo společný rozcestník `../index.html`. Editor obsahuje jméno, funkci, pozadí a okamžité zobrazení/skrytí. Animace zatím není nastavena.

## Údaje a export

- Jméno a funkci upravíte přímo v editoru. Prázdná funkce se skryje, bez jména se skryje celá karta.
- Tlačítko „Uložit údaje do odkazu“ vloží údaje do URL. Zkopírujte adresu pro další otevření stejného náhledu. Tento krok nezapisuje do GitHubu.
- Trvalé výchozí údaje změňte v `data.js`.
- Na iPadu: **Actions → SVDT — generování náhledů → Run workflow**. Do nepovinných polí `guest_name` a `guest_role` můžete napsat vlastní údaje. ZIP **svdt-grafika-nahledy** obsahuje obě karty a při vyplněném jménu také `host-vlastni.png`.
- Lokálně: `npm install`, `npx playwright install chromium`, `npm run render` pro obě karty; `npm run render:host` jen pro hosta.
- PNG s průhledným okolím je `host-overlay.png` (1920 × 1080); `host-detail.png` je těsný náhled. Další exporty ověřují světlé/tmavé pozadí, dlouhý text a chybějící funkci.

## Vzhled a zdroje

Písmo Exo a barevné proměnné se načítají ze stylu karty jezdce; stejná je maska celého reliéfu i SVG stopa pneumatiky. Tyto soubory se neduplikují. Vlastní kompozice je v `style.css`, bezpečné vkládání textu a editor v `app.js`.

Karta má pracovní šířku 660 px, levý okraj 96 px a spodní okraj 80 px. Dlouhý text se zalamuje; pokud překročí bezpečný prostor, karta se potlačí a editor zobrazí upozornění. Finální odbavení a pohybující se záběr ověří režie.

[Schválená studie](nahledy/karta-hosta-studie-01.jpg) zůstává referenčním obrázkem; generované PNG vznikají z HTML/CSS. Ilustrační fotografie ze studie není součástí karty. [Zadání](ZADANI_KARTA_HOSTA.md).

## Náhled vykreslený z kódu

![Karta hosta — HTML/CSS](nahledy/host-detail.png)

[Průhledný overlay 1920 × 1080](nahledy/host-overlay.png)
