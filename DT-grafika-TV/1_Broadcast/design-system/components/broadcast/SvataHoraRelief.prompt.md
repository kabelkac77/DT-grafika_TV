Celý reliéf Svaté Hory vystupující z horní hrany karty — dvě maskované vrstvy (světlá hrana + grafitové těleso).

```jsx
<SvataHoraRelief />
```

Vyžaduje `patterns/relief-mask.css` (maska pochází z originálního loga). Reliéf leží mimo portrét. Samostatné bílé logo se od verze 06.4 nezobrazuje; od 06.5 nese `RiderCard` i `GuestCard` na reliéfu vystředěný nápis akce (`patterns/event-wordmark.css`), osa nápisu je vždy shodná s osou reliéfu. Nikdy nekreslete náhradní značku.

Tři vrstvy: `.edge` světlá hrana (kreslí se první), `.face` grafitové těleso (výplň dobíhá za hranou) a `.tip` světlý hrot, který je vidět jen během kresby při `phase="in"` u `RiderCard`. Bez animační fáze je reliéf staticky vykreslený.
