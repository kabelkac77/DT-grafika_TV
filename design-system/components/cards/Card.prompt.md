Content container in three variants: plain text card, photo card with title overlay, and numbered spot card for maps/spectator points. Only interactive cards (`href`/`onClick`) get the hover lift + red glow — never a static card.

```jsx
<Card label="Hlavní závod" title="Elite muži">Kvalifikace 11:00, finále 15:00.</Card>
<Card variant="media" tag="Novinka" title="Šalina jump">Nová překážka nad schody.</Card>
<Card variant="spot" number={1} title="Start — Svatá Hora">Nejlepší pohled na odjezd.</Card>
```

Max 3 columns on desktop, 2 tablet, 1 mobile. Media variant always needs the bottom gradient for title contrast — never place text on a raw photo.
