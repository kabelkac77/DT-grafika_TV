Brand button in two families — pills for header/hero, sharp-corner blocks for section CTAs — never mixed in one row.

```jsx
<Button variant="primary">Registrace</Button>
<Button variant="ghost" size="sm">Pro diváky</Button>
<Button variant="block">Zobrazit celou galerii →</Button>
```

Variants: `primary` (brand red, max 1 per screen — the main action), `secondary` (brand red + outline, equal-weight alternative), `ghost` (outline only, tertiary nav), `quiet` (no fill, link-like), `block`/`block-outline` (accent red, 0 radius, end-of-section CTA). Sizes: `sm` (11px, needs a padded touch target), `default`, `lg`. Disabled buttons drop to `--svdt-bg-card-soft` with muted text and no glow.
