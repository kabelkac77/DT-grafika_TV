# Režijní pult — ukázka ovládání

Nákres toho, jak by se grafika během přenosu odbavovala. Slouží k tomu, abychom se
nad konkrétní obrazovkou shodli na způsobu ovládání dřív, než se cokoli postaví
napevno. **Není to ostrý systém a nic z toho není napojené na skutečný provoz.**

Vychází z oddílů 7 a 8 [ZADANI.md](../ZADANI.md) a používá jenom grafiky, které už
v repozitáři jsou.

## Jak to spustit

```bash
npm install      # jednorázově
npm run pult     # http://localhost:4173/broadcast/
```

Pult jde otevřít i přímo ze souboru (`broadcast/index.html`), ale přes `npm run pult`
je to spolehlivější — prohlížeče v režimu `file://` část věcí omezují.

## Co pult umí

| Oblast | Chování |
| --- | --- |
| Stavy | Preview → Take → Program → Out podle oddílu 7 zadání |
| Program | Až tři vrstvy současně, každá se svým cílem, odpočtem a vlastním OUT |
| Výstupy | TV a LED lze zapnout společně i zvlášť; dole je vidět, co na kterém výstupu opravdu je |
| Kolize | Grafiky mají zóny na obraze. Při střetu pult varuje a TAKE kolizní vrstvu nahradí |
| Připravenost | Komponenta si validuje data sama; pult její verdikt jen přebírá a podle něj TAKE povolí, nebo zakáže |
| Auto out | Přednastavená doba zobrazení, kterou jde přepsat nebo vypnout |
| Nouze | CUT ALL sundá vše ze všech výstupů jedním povelem |
| Makra | Pojmenovaný sled grafik, který se připraví do fronty; odklepnout ho musí obsluha |
| Ruční oprava | Kterýkoli text náhledu jde přepsat; oprava se označí štítkem i v protokolu |
| Protokol | Časová stopa všech povelů, včetně odmítnutých |

Klávesy: `1`–`5` grafika do náhledu, `↑ ↓` pohyb v seznamu objektů, `mezerník` TAKE,
`O` OUT nejvrchnější vrstvy, `X` CUT ALL, `T` / `L` cílový výstup, `?` nápověda.

## Co je v ukázce skutečné

Všech pět grafik v monitorech jsou opravdové komponenty z tohoto repozitáře —
[G01 výsledky](../karta-vysledky/), [G02 karta jezdce](../karta-jezdce/),
[G04 časomíra](../časomíra/), [G05 jmenovka hosta](../karta-hosta/) a
[G08 split time](../split-time/). Pult je otevírá v režimu `?capture=1` s průhledným
pozadím a posílá jim data. Karta si data sama zkontroluje a nahlásí zpět, jestli je
připravená k vysílání — proto pult opravdu odmítne odbavit kartu bez jména nebo
s textem, který přetéká.

## Co je jen naznačené

- **Žádné napojení na časomíru.** Startovní listina, časy, mezičasy i výsledky
  v `data.js` jsou vymyšlené. Skutečné rozhraní je otevřená otázka (oddíl 6 zadání).
- **Žádná automatika.** Makra jen připraví sled, spouští ho obsluha.
- **LED je pracovní ořez TV varianty.** Vlastní LED rozložení je samostatná dodávka;
  počet, rozměr, orientace a mapování panelů nejsou potvrzené (oddíl 8.2).
- **Formát výstupu do režie není zvolen.** Monitory jsou webový náhled, nic víc.
- **IN a OUT animace jsou provizorní** a společné pro všechny karty. Finální animace
  patří ke každé komponentě zvlášť.
- **Role, počet pracovišť a hardwarové ovladače** nejsou řešeny (čeká: režie).

## Rozhraní mezi pultem a grafikou

`bridge.js` se přikládá ke každé grafické stránce a je nečinný, pokud stránka neběží
v rámci jiného okna — na samostatné editory ani na generování PNG tedy nemá vliv.
Komponenta si nedrží žádnou provozní logiku režie; jen přebere data a pokyn ke stavu.

Pult → grafika:

```js
{svdt: 1, type: 'load',  payload: { /* údaje podle grafiky */ }}
{svdt: 1, type: 'state', state: 'in' | 'out'}
```

Grafika → pult:

```js
{svdt: 1, type: 'ready',  graphic: 'G02'}
{svdt: 1, type: 'status', graphic: 'G02', ok: true, message: '…'}
{svdt: 1, type: 'state',  graphic: 'G02', state: 'in'}
```

## Soubory

| Soubor | Obsah |
| --- | --- |
| `index.html` | Rozvržení pultu |
| `app.js` | Stavový model, kolize, fronta, protokol, klávesy |
| `data.js` | Ukázková data, registr grafik a maker — jediné místo, kde se upravuje obsah |
| `bridge.js` | Rozhraní mezi pultem a grafickou komponentou |
| `style.css` | Vzhled pultu |

## Otázky, které z ukázky vyplynuly

Nepatří sem odpovědi, jen seznam k projednání:

- Kolik grafik smí být na obraze současně a které dvojice se vylučují?
- Má se auto out počítat od IN animace, nebo od jejího dokončení?
- Potřebuje režie druhé pracoviště jen pro náhled, nebo stačí jeden pult?
- Kdo smí ručně opravit data a má se oprava někam zapisovat?
- Má být fronta z makra krokovaná obsluhou, nebo se má umět rozjet sama?
