Doplňková řada údajů pod jménem — země, tým a kategorie v jedné liště s tmavým podkladem.

```jsx
<RiderMeta country="CZE" team="Ukázkový tým" category="Elite" />
<RiderMeta country="CZE" category="Masters" team="Dlouhý tým" order={['country','category','team']} />
```

Chybějící pole se skryje bez prázdného oddělovače a bez textů `null`/`undefined`. Ve variantě B tým přeteče na vlastní řádek a lišta nemá podklad.
