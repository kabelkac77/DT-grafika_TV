# TimerCard

Kompaktní čas jízdy vpravo dole — G04.

Zdroj: `DT-grafika-TV/časomíra/` (HTML/CSS editor a PNG generátor). Hodnoty 1:1 v `patterns/timer-card.css`.

- Tichý trvalý překryv: rovná levá hrana, bez reliéfu, nápisu akce a textury; značková linka 4 px dole.
- **Čas sám neběží** — komponenta jen vykreslí zadaný zápis `1:23.456`. Neplatný zápis kartu skryje. Stavy před startem, za jízdy a v cíli určí časomíra.
- **Pohyb** (`phase`): tvar s linkou → popisek → čas jen prolnutím (tabulární číslice se nikdy neposouvají). Podle pravidel rodiny, **čeká na schválení** — dřívější návrh časomíry počítal s kartou bez nástupu.
