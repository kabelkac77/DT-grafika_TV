import React from 'react';

/** Sponsorship package card. Set `highlighted` on at most one package per screen. */
export function SponsorPackage({ name, price, priceUnit, features = [], highlighted = false }) {
  return (
    <div style={{ background: 'var(--svdt-bg-card)', border: '1px solid ' + (highlighted ? 'var(--svdt-brand)' : 'var(--svdt-border)'), borderRadius: 'var(--svdt-radius)', padding: 26, position: 'relative', overflow: 'hidden', fontFamily: 'var(--svdt-font)', color: '#fff' }}>
      {highlighted && <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--svdt-brand)', color: '#fff', fontSize: 9.5, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '0 0 0 8px' }}>Nejžádanější</span>}
      <h3 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-red)' }}>{name}</h3>
      <p style={{ fontSize: 34, fontWeight: 900, lineHeight: 1, margin: '0 0 18px', fontVariantNumeric: 'tabular-nums' }}>{price}{priceUnit && <small style={{ fontSize: 13, fontWeight: 700, color: 'var(--svdt-text-muted)' }}> {priceUnit}</small>}</p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {features.map((f, i) => (
          <li key={f} style={{ fontSize: 13, color: 'var(--svdt-text-soft)', lineHeight: 1.5, padding: '9px 0 9px 22px', borderBottom: i < features.length - 1 ? '1px solid var(--svdt-line)' : 'none', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, top: 15, width: 9, height: 9, borderRadius: '50%', background: 'var(--svdt-brand)' }} />{f}
          </li>
        ))}
      </ul>
    </div>
  );
}
