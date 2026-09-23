Panel obsluhy nad náhledem — vodorovná řada přepínačů a jedno červené tlačítko akce.

```jsx
<PreviewControls
  fields={[{ id:'variant', label:'Rozložení', value:variant, options:[{value:'A',label:'A — horizontální lišta'},{value:'B',label:'B — kompaktní blok'}], onChange:setVariant }]}
  toggles={[{ id:'portrait', label:'Ilustrační portrét', checked:portrait, onChange:setPortrait }]}
  action={{ label: visible ? 'Skrýt kartu' : 'Zobrazit kartu', onClick: () => setVisible(v => !v) }}
/>
```

Tlačítka, popisky variant ani ovládání náhledu nesmějí být součástí vysílaného obrazu.
