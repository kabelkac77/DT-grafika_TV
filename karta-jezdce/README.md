# SVDT — karta jezdce, studie 03

Aktuální náhled používá skutečnou závodní fotografii z oficiální fotogalerie. Reliéf Svaté Hory je nižší, má vyhlazený obrys, tenkou světelnou hranu a jemný červený boční akcent. Je propojen se souvislou grafitově tmavou plochou karty. Startovní číslo používá akcentní červenou #FF1A1A; značková #E30613 zůstává na drobných plochách a linkách. Bílé logo je začleněné do společného tmavého pole.

## Otevření a úpravy

Otevřete `index.html` v Chrome nebo Edge. Náhled funguje lokálně bez internetu a instalace. Nabízí varianty A/B, plnou podobu i podobu bez portrétu, ukázkové scénáře, světlé a tmavé pozadí, průhledné okolí, bezpečné okraje a zobrazení/skrytí karty. V sekci „Upravit údaje v náhledu“ lze změnit data a nahrát vlastní portrét. Tyto změny se neukládají automaticky.

- `data.js`: trvalá fiktivní ukázková data.
- `style.css`: základní rozložení a skutečné lokální fonty Exo.
- `relief.css`: kompozice reliéfu ze studie 02.
- `production.css`: aktuální úpravy studie 03; rozměry, materiál, akcenty, fotografie.
- `build-relief.cjs`: skládá SVG podklady ze skutečného loga a vyhlazuje architektonickou masku, bez ručního překreslení značky.
- `relief-mask.css`: vložená SVG maska pro offline provoz, generovaná uvedeným skriptem.
- `app.js`: přepínání a chování ukázkových dat.

## Náhledy

`nahledy/SVDT-srovnani-A-B.png` je společná prezentační tabule. `srovnani.html` je její editovatelný zdroj.

Pro oba směry jsou v `nahledy/` plné náhledy, podoby bez portrétu, dlouhá jména s portrétem i bez něj, neúplné volitelné údaje, světlé/tmavé pozadí, poloviční 960 × 540 náhledy a samostatné transparentní PNG (`*-overlay.png`, `*-overlay-bez-portretu.png`). Hlavní pracovní plátno je 1920 × 1080. Karta je 96 px od levého a 80 px od spodního okraje. Okolí karty je průhledné; závodní fotografie není součástí overlay exportů.

Varianta A má šířku 1560 px (bez portrétu 1280 px) a nízkou spodní lištu. Varianta B má šířku 640 px a skládá informace nad sebe. Výška viditelného reliéfu je A 132 px, B 108 px; světlá hrana je přibližně 1,5 px. Žádné opakované pohyby, vržené stíny ani plošné zatmavení závodní fotografie. Přechod zobrazení/skrytí 350 ms respektuje omezený pohyb.

Předchozí kompletní návrhy jsou zachované v `../karta-jezdce-v01/` a `../karta-jezdce-v02/`.

## Použité podklady

- Zadání `ZADANI_KARTA_JEZDCE.md`, nadřazené `ZADANI.md`, `SVDT Design System.zip` a referenční fotografie ze složky `Zadání_foto`. Cizí grafika z reference nebyla převzata.
- **Závodní fotografie:** [oficiální fotogalerie SVDT](https://svdtpribram.cz/fotogalerie/), [přímý zdroj DSC_2695-45.jpg](https://svdtpribram.cz/wp-content/uploads/2026/03/DSC_2695-45.jpg). Lokálně `assets/zavod-skocny-zaber.jpg`. Záběr skoku v příbramské ulici. Použita jako podklad návrhu na výslovný pokyn zadavatele, s kompozičním výřezem do 16 : 9; bez retuše a bez dodatečného zatmavení. Autor není v načteném výpisu galerie uveden, není zde domýšlen.
- **Logo:** [originální PNG SVDT](https://svdtpribram.cz/wp-content/uploads/2026/03/SVDT-logo-cervene_bile_uvnitr.png), beze změny uložené jako `assets/logo-svdt.png`. Na přání lepšího začlenění je ve vysílané kartě návrhová bílá adaptace `assets/logo-ink.svg` s potlačeným kruhovým podkladem. Reliéf využívá skutečný horní motiv loga, nikoliv nově vymyšlenou značku. Proporce samotného motivu zůstávají zachované; základna je zakomponovaná do těla karty.
- **Exo:** skutečné lokální fonty 400/500/700/800/900, [Google Fonts](https://fonts.google.com/specimen/Exo). Licence v `assets/Exo-OFL.txt`. Bez náhradního písma.
- **Ilustrační portrét:** anonymní postava v helmě, vytvořená vestavěným imagegen v první studii. Soubor `assets/portrait.png`, prompt a režim v `PROMPT.md`. V této revizi nebyl generován nový obraz.

Fotografie Svaté Hory z předchozích studií zůstává pouze v podkladech: Jirka Jiroušek, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Svat%C3%A1_Hora_u_P%C5%99%C3%ADbrami_-_leteck%C3%BD_pohled.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Aktuální náhled ji nepoužívá. Dřívější fotografické výřezy a úpravy v archivovaných studiích jsou pod touto licencí.

## Ukázková data a krajní případy

Údaje jsou fiktivní. Jméno na kartě **neoznačuje jezdce v závodní fotografii**. Ilustrační postava rovněž není jeho portrét. Žádné datum, ročník, výsledek ani partner nebyl přidán do grafiky. Reklamy zachycené na skutečné fotografii jsou součástí záběru, nikoliv novými partnerskými bloky.

Dlouhé příjmení může využít další řádek; písmo má pevné větší a menší návrhové velikosti (aktuální dlouhé jméno: A 52 px, B 44 px). Tým se zalamuje. Navržené redakční pravidlo: nejvýše dva řádky týmu, poté schválená kratší oficiální podoba. Automatická trojtečka ani neomezené zmenšování se nepoužívají. Extrémní text nad kapacitu vyžaduje úpravu kompozice před vysíláním.

Chybějící volitelná pole se skryjí bez prázdných oddělovačů. Chybějící jméno nebo číslo kartu potlačí a zobrazí zprávu obsluze. Neplatný portrét aktivuje variantu bez portrétu. Česká vlajka je CSS geometrie; další kódy zemí se zobrazí textově. Náhled není produkční validátor dat.

## Kontrola

V Chrome znovu vyrenderováno 18 kompozic a ověřeno 5 funkčních stavů: zobrazení/skrytí, chybějící povinná i volitelná pole, neplatný portrét. Všech 23 kontrol prošlo bez chyby JavaScriptu a bez detekovaného přetečení textu; načetlo se písmo i obrazové podklady. Výsledky v `kontrola.json`. Vizuálně zkontrolovány oba hlavní směry, dlouhá jména, světlé pozadí a poloviční náhled. Jezdec na zvoleném podkladu zůstává viditelný.

`render.cjs` slouží k opětovnému exportu v tomto prostředí (Node.js, Playwright, Chrome). Na jiném počítači nastavte `PLAYWRIGHT_MODULE` na instalovaný modul Playwright. Otevření běžného náhledu tyto nástroje nepotřebuje.

Stále jde o statickou vizuální studii. Kontrola pohybujícího se závodního obrazu, skutečné portréty, finální formát režie, pozice televizního loga a produkční odbavení zůstávají pro navazující tvorbu vysílacích šablon.
