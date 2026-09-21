import React from 'react';
import { Button } from '../buttons/Button.jsx';

/** Sticky translucent header. One primary CTA only; active item marked with a red underline, never a filled background. */
export function Header({ items = [], activeHref, ctaLabel = 'Registrace', ctaHref = '#', lang = 'EN' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '14px 24px', background: 'rgba(10,10,10,.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--svdt-line)', fontFamily: 'var(--svdt-font)' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
        <svg width="38" height="38" viewBox="0 0 150 150"><circle cx="75" cy="75" r="72" fill="#e30613" /><circle cx="75" cy="75" r="60" fill="none" stroke="#fff" strokeWidth="5" /><text x="75" y="88" textAnchor="middle" fill="#fff" fontFamily="Exo,Arial" fontSize="38" fontWeight="900">SVDT</text></svg>
        <b style={{ fontSize: 15, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, color: '#fff' }}>Svatohorský<small style={{ display: 'block', fontSize: 8.5, fontWeight: 700, letterSpacing: '.22em', color: 'var(--svdt-text-muted)' }}>Downtown Příbram</small></b>
      </span>
      <nav style={{ display: 'flex', gap: 2, marginLeft: 'auto', alignItems: 'center' }}>
        {items.map((it) => (
          <a key={it.href} href={it.href} style={{
            fontSize: 13, fontWeight: 700, color: it.href === activeHref ? '#fff' : 'var(--svdt-text-mid)',
            textDecoration: 'none', padding: '9px 13px', borderRadius: 6, position: 'relative', whiteSpace: 'nowrap',
            borderBottom: it.href === activeHref ? '2px solid var(--svdt-red)' : '2px solid transparent',
          }}>{it.label}</a>
        ))}
      </nav>
      <span style={{ display: 'flex', gap: 10, alignItems: 'center', marginLeft: 14 }}>
        <a href="#" style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.08em', color: 'var(--svdt-text-muted)', padding: 8, textDecoration: 'none' }}>{lang}</a>
        <Button variant="primary" size="sm" href={ctaHref}>{ctaLabel}</Button>
      </span>
    </div>
  );
}
