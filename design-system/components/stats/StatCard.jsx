import React, { useState } from 'react';

/** Stat with supporting context copy — for partner decks and press materials. Left brand-red bar; glows red on hover. */
export function StatCard({ value, label, children }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: 'var(--svdt-bg-card)', border: '1px solid ' + (hover ? 'var(--svdt-red)' : 'var(--svdt-border)'), borderRadius: 'var(--svdt-radius)',
      padding: 26, position: 'relative', overflow: 'hidden', fontFamily: 'var(--svdt-font)', boxShadow: hover ? '0 0 24px var(--svdt-red-glow)' : 'none', transition: 'var(--svdt-transition)',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--svdt-brand)' }} />
      <b style={{ display: 'block', fontSize: 44, fontWeight: 900, lineHeight: 1, fontVariantNumeric: 'tabular-nums', marginBottom: 8, color: '#fff' }}>{value}</b>
      <span style={{ display: 'block', fontSize: 12, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--svdt-red)', lineHeight: 1.4 }}>{label}</span>
      <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--svdt-text-soft)', lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}
