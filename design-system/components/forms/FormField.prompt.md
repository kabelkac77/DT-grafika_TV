Large, high-contrast form field. Errors always carry an icon + text (never colour alone); focus ring is a loud red glow.

```jsx
<FormField label="E-mail" required type="email" error="Zadej platný e-mail." />
<FormField label="Kategorie" required type="select" options={['Elite muži','Elite ženy']} />
```
