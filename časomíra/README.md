# G04 — časomíra

HTML/CSS generátor kompaktního času v pravém dolním rohu televizního obrazu. Navazuje na písmo Exo, tmavý panel a červený akcent ostatních karet. Levý okraj je rovný; bez reliéfu, loga a textury, aby dlouhodobě zobrazovaná grafika nerušila jízdu.

Pracovní plátno: **1920 × 1080**, karta **344 × 112 px**, odsazení zprava **96 px**, zdola **80 px**. Rozměry jsou implementační návrh odvozený z ostatních karet, nikoli potvrzený produkční formát. Původní obrazový návrh nebyl při implementaci dostupný pro přesné porovnání.

## Použití

- Otevřete `index.html` nebo vyberte Časomíru ve společném generátoru o složku výše.
- Zadejte ukázkový čas `1:23.456`, vyberte pozadí, případně kartu skryjte.
- „Uložit údaje do odkazu“ zapíše nastavení do URL; nemění soubory na GitHubu.
- Výchozí ukázka je v `data.js`. Přijímá se `m:ss.mmm` či `mm:ss.mmm`, nejvýše `99:59.999`. Neplatný nebo prázdný čas kartu skryje.
- `?capture=1&background=transparent&time=1%3A23.456` zobrazí čisté plátno bez editoru.

## PNG a iPad

V GitHub **Actions → SVDT — generování náhledů → Run workflow** lze vyplnit `timer_time`. Po dokončení stáhněte artefakt `svdt-grafika-nahledy`, složku `časomíra/nahledy/`.

Lokálně po instalaci závislostí a Chromium: `npm run render:casomira`. Společný `npm run render` zahrnuje všechny čtyři grafiky. Výstupy: průhledné plátno, detail, světlé a tmavé pozadí i ukázka na záběru trati. PNG slouží k náhledu, samo se neaktualizuje.

## Data a stav

Čas **je fiktivní a sám neběží**. `window.svdtTimer.setTime('2:34.567')` představuje pouze lokální vstup do vykreslení. Není to hotová integrace poskytovatele. Transport, přesnost, stavy před startem / za jízdy / v cíli a chování při výpadku je nutné dohodnout s časomírou a režií. Animace zůstávají k upřesnění zadavatelem.

`render.cjs` kontroluje export, font, umístění, nejdelší čas, neplatný vstup, skrytí, obnovení z URL a editor při šířce iPadu. Výsledek ukládá do `kontrola.json`.
