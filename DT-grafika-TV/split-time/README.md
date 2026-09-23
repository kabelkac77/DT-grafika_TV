# G08 — split time

Generátor podle návrhu 04: původní karta jezdce s portrétem, reliéfem a logem vlevo, lídr pod ní, dva mezičasy označené symbolem stopek a čísly 1 a 2. Vpravo cílový čas, rozdíl a pořadí v samostatném poli. Start se nezobrazuje.

Časy i rozdíly jsou **kumulované od startu vůči lídrovi**, nikoli rozdíly za jednotlivý úsek. Minus = náskok (zelená), plus = ztráta (červená), nula = shodný čas (neutrální). Výchozí ukázka: první mezičas +0.447, druhý −0.144, cíl −0.026 a pořadí 1. Všechna data jsou fiktivní.

## Editor

Otevřete `split-time/index.html` nebo položku Split time ve společném `index.html`. Upravte údaje jezdce a lídra, mezičasy, rozdíly a pořadí. Karta využívá přímo styly, vykreslování a podklady `karta-jezdce/`, sdílený wordmark a styl `časomíra/`; nevytváří jejich kopie.

- Časy: `0:31.700`, `1:13.289`, `1:44.114` (nejvýše `99:59.999`).
- Rozdíly: `+0.447`, `-0.144`, `+0.000`.
- Pořadí: 1–999, nezávisle zadané z dat časomíry; automaticky se nepočítá.
- Chybějící údaje ponechte prázdné: zobrazí se pomlčka. Vyplňujte postupně od prvního mezičasu. Neplatné údaje srovnávací grafiku skryjí a editor ohlásí chybu.
- Ukládání do odkazu uchová textová data, pozadí a zapnutí portrétu. Vlastní nahraný portrét do URL nepatří.
- Výchozí srovnávací data jsou v `data.js`, jezdec vychází ze společného editoru.

## PNG a iPad

**GitHub Actions → SVDT — generování náhledů → Run workflow**. Volitelný vstup `split_json` přijímá objekt podle `data.js` (lze zadat pouze měněná pole). Výsledky jsou v artefaktu `svdt-grafika-nahledy`, složce `split-time/nahledy/`.

Lokálně: `npm install`, `npx playwright install chromium`, `npm run render:split-time`. Také součást `npm run render`. Exportuje průhledné plátno 1920 × 1080 a náhled na záběru, světlém a tmavém pozadí. `?capture=1&background=transparent` skryje ovládání.

## Rozsah

Pracovní rozměry dle návrhu, bez animací a živého připojení. `window.svdtSplit.setData({...})` je pouze lokální vykreslovací rozhraní, nikoli datový protokol poskytovatele. Zdroj mezičasů, zacházení se změnou lídra, výpadky a ostré odbavení je nutné potvrdit s časomírou/režií.
