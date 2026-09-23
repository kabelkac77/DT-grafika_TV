# ResultsCard

Tabulka deseti výsledků kategorie a jízdy se společným panelem log vpravo — G01.

Zdroj: `DT-grafika-TV/karta-vysledky/` (studie 04, dílčí zadání `ZADANI_KARTA_VYSLEDKU.md`). Hodnoty 1:1 v `patterns/results-card.css`, pravidla zapouzdřená pod `.results-card`.

- **Obsah je uzavřený:** startovní číslo, jméno, stát, čas / ztráta. Lídr má čas `1:44.114`, ostatní ztrátu `+0.250 s`. Nejvýše 10 řádků, nejvýše 5 log.
- **Dlouhá jména** se zmenšují z 31 na nejméně 24 px, nadpis z 58 na nejméně 34 px — stejné pravidlo jako editor v repozitáři. Co se nevejde ani tak, je redakční rozhodnutí; editor v repozitáři kartu v tom případě skryje.
- **Loga** jsou jen soubory dodané zadavatelem. Rezervy `LOGO` (`showPlaceholders`) patří jen do náhledu.
- **Pohyb** (`phase`): tvar → linka pod nadpisem → reliéf a nápis akce → nadpis → tabulka jedním tahem shora dolů → loga; nástup do 720 ms, odchod 380 ms. Řádky se nikdy neanimují každý zvlášť. Podle pravidel rodiny, **čeká na schválení**.

Otevřené: stránkování nad deset výsledků, průběžné vs. finální výsledky, DNF / DNS / DQ (potvrzené jako zkratka místo času, v kartě zatím není).
