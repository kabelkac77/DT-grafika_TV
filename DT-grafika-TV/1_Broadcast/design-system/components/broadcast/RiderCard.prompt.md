Celá karta jezdce před startem — složí reliéf, startovní číslo, jméno, doplňkové údaje a portrét do schválené kompozice 06.5 — nad reliéfem je vystředěný nápis akce SVATOHORSKÝ / DOWN / TOWN.

```jsx
<div className="stage">
  <div className="scene" />
  <RiderCard variant="A" first="Adam" last="Novák" number="27"
    team="Ukázkový tým" country="CZE" category="Elite"
    portraitSrc="assets/portrait.png" />
</div>
```

Varianty: `variant="A"` vodorovná lišta 1120 px (bez portrétu 940 px), `variant="B"` rohový blok 610 px (bez portrétu 470 px). Vynechání `portraitSrc` kartu přeskládá bez prázdného rámečku. Dlouhá jména (>15 znaků) samy přepnou na menší stupeň písma. Karta patří do prvku s `.stage` (1920 × 1080); okolí musí zůstat průhledné.

**Animace.** `phase="in"` spustí fázovaný nástup (tvar → značková linka → silueta → portrét → jméno → číslo → údaje, poslední prvek dosedne v 760 ms), `phase="out"` odchod (380 ms, silueta se zasune první). Mezi nimi drž kartu v klidu nejméně 3,5 s (`--svdt-tv-hold-min`). Přechod na dalšího jezdce je vždy plný cyklus odchod → pauza → nástup, nikdy přepis dat v zobrazené kartě. Pravidla a rozhodnutí: `guidelines/deep-dive-animace.html`.

```jsx
const [phase, setPhase] = React.useState('in');
// odchod a nástup dalšího jezdce
setPhase('out');
setTimeout(() => { setRider(next); setPhase('in'); }, 380 + 200);
```
