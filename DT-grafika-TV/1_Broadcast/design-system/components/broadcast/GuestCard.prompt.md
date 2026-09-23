Jmenovka hosta pro vstupy mezi jízdami — jméno a funkce, nic víc.

```jsx
<div className="stage">
  <GuestCard name="Jan Novák" role="moderátor" />
</div>
```

Umístit vlevo dole, mimo obličej mluvící osoby; okolí zůstává průhledné. Prázdná funkce druhý řádek vypustí; bez jména se karta nevykreslí. Dlouhá jména se zalamují (`overflow-wrap:anywhere`) — písmo se nikdy neomezeně nezmenšuje, a pokud text přesáhne bezpečný prostor, kartu je třeba potlačit a upravit text.

**Animace.** `phase="in"` / `phase="out"` používá stejné křivky a stejné pořadí vrstev jako `RiderCard` (tvar → značková linka → kresba siluety → text), jen bez portrétu, čísla a sekundární lišty. Zadání karty hosta animaci samo neschvaluje — sjednocení s kartou jezdce je pokyn zadavatele, ne převzatý předpis.
