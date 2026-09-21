import React from 'react';

/** Site footer. Top border is the only place brand red is used as a divider line. */
export function Footer({ columns = [], bottomLeft, bottomRight }) {
  return (
    <div style={{ padding: '44px 28px 26px', background: 'var(--svdt-bg-soft)', borderTop: '2px solid var(--svdt-brand)', fontFamily: 'var(--svdt-font)', color: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `1.4fr repeat(${columns.length}, 1fr)`, gap: 32 }}>
        <div>
          <svg width="44" height="44" viewBox="0 0 150 150" style={{ marginBottom: 14 }}><circle cx="75" cy="75" r="72" fill="#e30613" /><circle cx="75" cy="75" r="60" fill="none" stroke="#fff" strokeWidth="5" /><text x="75" y="88" textAnchor="middle" fill="#fff" fontFamily="Exo,Arial" fontSize="38" fontWeight="900">SVDT</text></svg>
          <p style={{ lineHeight: 1.7, margin: 0, fontSize: 13.5, color: 'var(--svdt-text-soft)' }}>Městský sjezd centrem Příbrami.<br />10. ročník — 23. května 2026.</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-red)', margin: '0 0 14px' }}>{col.title}</h4>
            {col.links.map((l) => <a key={l.label} href={l.href} style={{ display: 'block', fontSize: 13.5, color: 'var(--svdt-text-soft)', textDecoration: 'none', lineHeight: 2 }}>{l.label}</a>)}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--svdt-line)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--svdt-text-muted)', flexWrap: 'wrap', gap: 10 }}>
        <span>{bottomLeft}</span><span>{bottomRight}</span>
      </div>
    </div>
  );
}
