# SplitTime

Jezdec a lídr, dva mezičasy od startu a cíl s pořadím — G08.

Zdroj: `DT-grafika-TV/split-time/` (návrh 04). Hodnoty 1:1 v `patterns/split-time.css`, zapouzdřené pod `.split-time` — v repozitáři je G08 samostatná stránka, kde pravidla platí globálně.

- Karta jezdce je `RiderCard` varianty A zmenšená na 60 % a posazená nad lištu lídra.
- Mezičasy nesou symbol stopek a číslo 1 / 2 místo nápisu SPLIT; start se nezobrazuje. Záporný rozdíl je zelený (rychlejší než lídr), kladný červený, nulový a prázdný neutrální.
- Prázdné hodnoty se ukážou jako pomlčka. Bez lídra se vrstva mezičasů nevykreslí.
- **Pohyb** (`phase`): karta jezdce má svůj nástup se zachovaným měřítkem, vedle ní dva úseky s krokem 60 ms, čísla jen prolnutím, cílová karta a nakonec lišta lídra; poslední prvek dosedne v 760 ms. Podle pravidel rodiny, **čeká na schválení**.

Otevřené: zdroj mezičasů, změna lídra během jízdy a rozlišení času úseku a času od startu (čeká na časomíru).
