Česká vlajka vykreslená CSS geometrií (bez obrázku), pro doplňkovou identifikaci země v kartě jezdce.

```jsx
<span className="country"><CountryFlag code="CZE" />CZE</span>
```

Pro jiné země než `CZE` vrací `null` — zobrazí se pouze ověřený textový kód. Nikdy nevykreslujte ikonu rozbitého obrázku.
