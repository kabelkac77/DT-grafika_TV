import React, { useState } from 'react';

/** Content container. Lifts 4px with a red glow on hover only when interactive (href/onClick present). */
export function Card({ variant = 'basic', label, title, children, image = false, tag, number, href, onClick }) {
  const [hover, setHover] = useState(false);
  const interactive = !!(href || onClick);
  const glow = interactive && hover;
  const wrap = {
    background: glow ? 'var(--svdt-bg-card-soft)' : 'var(--svdt-bg-card)',
    border: '1px solid ' + (glow ? 'var(--svdt-red)' : 'var(--svdt-border)'),
    borderRadius: 'var(--svdt-radius)',
    overflow: 'hidden',
    transition: 'var(--svdt-transition)',
    transform: glow ? 'translateY(-4px)' : 'none',
    boxShadow: glow ? '0 0 24px var(--svdt-red-glow)' : 'none',
    cursor: interactive ? 'pointer' : 'default',
    textDecoration: 'none', color: 'inherit', display: 'block',
  };
  const Tag = href ? 'a' : 'div';

  if (variant === 'media') {
    return React.createElement(Tag, { style: wrap, href, onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) },
      <div style={{ height: 150, position: 'relative', background: 'radial-gradient(circle at 35% 40%,#4a5568 0,transparent 48%),linear-gradient(135deg,#5a6472,#171c22)' }}>
        {tag && <span style={{ position: 'absolute', top: 14, left: 14, background: 'var(--svdt-brand)', color: '#fff', fontSize: 10, fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 'var(--svdt-radius-pill)', lineHeight: 1 }}>{tag}</span>}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(5,6,10,0) 30%,rgba(5,6,10,.92) 100%)' }} />
        <h3 style={{ position: 'absolute', left: 18, right: 18, bottom: 14, fontSize: 20, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, margin: 0, color: '#fff' }}>{title}</h3>
      </div>,
      <div style={{ padding: 24 }}><p style={{ margin: 0, fontSize: 13.5, color: 'var(--svdt-text-soft)', lineHeight: 1.65 }}>{children}</p></div>
    );
  }
  if (variant === 'spot') {
    return React.createElement(Tag, { style: wrap, href, onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) },
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 20 }}>
        <span style={{ flex: '0 0 42px', height: 42, borderRadius: 'var(--svdt-radius-pill)', background: 'var(--svdt-brand)', display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 900, color: '#fff' }}>{number}</span>
        <div><h3 style={{ fontSize: 16, margin: '0 0 4px', fontWeight: 700 }}>{title}</h3><p style={{ margin: 0, fontSize: 13.5, color: 'var(--svdt-text-soft)', lineHeight: 1.65 }}>{children}</p></div>
      </div>
    );
  }
  return React.createElement(Tag, { style: wrap, href, onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) },
    <div style={{ padding: 24 }}>
      {label && <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-red)', display: 'block', marginBottom: 10 }}>{label}</span>}
      <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, lineHeight: 1.25 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--svdt-text-soft)', lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}
