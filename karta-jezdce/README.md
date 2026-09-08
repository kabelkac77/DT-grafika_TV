# SVDT — karta jezdce, verze 06.4

Aktuální zdrojová verze podle návrhu 06.4 schváleného zadavatelem v konverzaci. Nahrazuje studii 03. Jde o skutečné HTML/CSS s editovatelnými údaji, ne o vložený obrázek návrhu. Formát odbavení a kontrola v pohybujícím se obrazu zůstávají k ověření s režií.

## Čtyři varianty

| Rozložení | Portrét | Výsledek |
| --- | --- | --- |
| A | ano | Vodorovná karta s portrétem, číslem vlevo od jména |
| A | ne | Kratší vodorovná karta bez prázdného místa |
| B | ano | Rohová karta, portrét vlevo, údaje vpravo |
| B | ne | Užší rohová karta s přeskládanými údaji |

Celý reliéf Svaté Hory je součástí horní hrany, u rohových variant leží mimo portrét. Samostatné bílé logo bylo na žádost zadavatele odstraněno. Grafitovou plochu doplňuje jemná vektorová stopa MTB pneumatiky. Jméno a příjmení sdílejí řádek, příjmení je výraznější. Číslo je červené #FF1A1A; drobná spodní linka používá #E30613. Portrét má měkký přechod do podkladu a číslo leží mimo rameno.

Schválené změny (textura, smíšená velikost písmen jména a lokální měkký přechod portrétu) mají pro tuto kartu přednost před obecnými webovými pravidly design systému. Původní architektonická maska zůstává zdrojem celého reliéfu; generovaný návrh není zdrojem loga.

## Otevření a editace

Otevřete `index.html`. Přepněte rozložení A/B a přepínač portrétu. Údaje lze upravit v editoru; okamžité změny v prohlížeči se neukládají. Trvalé ukázkové údaje jsou v `data.js`. `srovnani.html` zobrazuje všechny čtyři varianty ze zdrojového vykreslení.

- `app.js`: společná struktura a chování všech variant, bezpečné vkládání textu.
- `style.css`: písmo Exo, ovládání a pracovní plátno.
- `production.css`: aktuální kompozice 06.4, rozměry, textura a portrét.
- `relief-mask.css`: původní vložená maska reliéfu pro offline provoz.
- `assets/mtb-tread.svg`: editovatelný dekorativní vzorek špalkového MTB dezénu, není značkou výrobce.
- `render.cjs`: generování náhledů a kontroly.
- `relief.css`: historická studie 02; aktuální stránka ji již nenačítá.

Pracovní plátno je 1920 × 1080, karta je 96 px od levého a 80 px od spodního okraje. A má šířku 1120 px (bez portrétu 940 px), B 610 px (bez portrétu 470 px). Dlouhé texty mohou zvýšit výšku karty; pevné bezpečné okraje se kontrolují. Okolí overlaye je průhledné. Závodní fotografie není součástí průhledných exportů.

## Generování na počítači i iPadu

Lokálně: Node.js 22+, `npm install`, `npx playwright install chromium`, `npm run render`.

Na iPadu v GitHubu: **Actions → SVDT — generování náhledů → Run workflow**. Balíček `svdt-karta-jezdce-nahledy` obsahuje náhledy a `kontrola.json`. Stejná kontrola se spouští při Pull Requestu a změně karty v `main`.

`nahledy/SVDT-srovnani-A-B.png` nyní zobrazuje všechny čtyři varianty (název zachován kvůli existujícím odkazům). `A/B-detail*.png` jsou výřezy pro přehledovou kompozici; `A/B-overlay*.png` jsou průhledná pracovní plátna 1920 × 1080. Staré PNG je nutné po změně kódu regenerovat; zdrojem pravdy je HTML/CSS.

## Data a kontrola

Ukázkové údaje jsou fiktivní. Skutečný portrét je možné nahrát, neplatný obrázek přepne na podobu bez portrétu. Chybějící volitelná pole se skryjí bez prázdných oddělovačů. Chybějící jméno nebo číslo potlačí kartu. Dlouhá jména se zalamují bez vynechávání částí, tým může zabrat více řádků. Při překročení kapacity se zobrazí upozornění obsluze. Česká vlajka je CSS geometrie; jiné země používají textový kód.

Render kontroluje načtení písem a obrázků, přetečení, bezpečnou horní hranici, povinná i volitelná data, přepínání viditelnosti a neplatný portrét. Exportuje také světlé/tmavé pozadí a poloviční náhledy. Výsledek konkrétního běhu je v `kontrola.json` a v GitHub Actions; tento dokument nepředjímá jeho úspěch.

## Použité podklady

- Zadání `ZADANI_KARTA_JEZDCE.md`, nadřazené `../ZADANI.md`, rozbalený `../design-system/` a původní referenční fotografie poskytnutá mimo tento repozitář. Samotný archiv design systému ani původní referenční složka nejsou v repozitáři uloženy. Cizí grafika z reference nebyla převzata.
- **Závodní fotografie:** [oficiální fotogalerie SVDT](https://svdtpribram.cz/fotogalerie/), [přímý zdroj DSC_2695-45.jpg](https://svdtpribram.cz/wp-content/uploads/2026/03/DSC_2695-45.jpg). Lokálně `assets/zavod-skocny-zaber.jpg`. Záběr skoku v příbramské ulici. Použita jako podklad návrhu na výslovný pokyn zadavatele, s kompozičním výřezem do 16 : 9; bez retuše a bez dodatečného zatmavení. Autor není v načteném výpisu galerie uveden, není zde domýšlen.
- **Logo:** [originální PNG SVDT](https://svdtpribram.cz/wp-content/uploads/2026/03/SVDT-logo-cervene_bile_uvnitr.png), beze změny uložené jako `assets/logo-svdt.png`. Na přání lepšího začlenění je ve vysílané kartě návrhová bílá adaptace `assets/logo-ink.svg` s potlačeným kruhovým podkladem. Reliéf využívá skutečný horní motiv loga, nikoliv nově vymyšlenou značku. Proporce samotného motivu zůstávají zachované; základna je zakomponovaná do těla karty.
- **Exo:** skutečné lokální fonty 400/500/700/800/900, [Google Fonts](https://fonts.google.com/specimen/Exo). Licence v `assets/Exo-OFL.txt`. Bez náhradního písma.
- **Ilustrační portrét:** anonymní postava v helmě, vytvořená vestavěným imagegen v první studii. Soubor `assets/portrait.png`, prompt a režim v `PROMPT.md`. V této revizi nebyl generován nový obraz.

Fotografie Svaté Hory z předchozích studií zůstává pouze v podkladech: Jirka Jiroušek, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Svat%C3%A1_Hora_u_P%C5%99%C3%ADbrami_-_leteck%C3%BD_pohled.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Aktuální náhled ji nepoužívá. Dřívější fotografické výřezy a úpravy v archivovaných studiích jsou pod touto licencí.

