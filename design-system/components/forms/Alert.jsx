import React from 'react';

const KIND = {
  error: { bg: 'rgba(227,6,19,.1)', bar: 'var(--svdt-brand)', titleColor: '#ff6b6b', icon: '✕' },
  ok: { bg: 'rgba(46,224,138,.08)', bar: 'var(--svdt-ok, #2ee08a)', titleColor: 'var(--svdt-ok, #2ee08a)', icon: '✓' },
  warn: { bg: 'rgba(252,185,0,.08)', bar: 'var(--svdt-warn, #fcb900)', titleColor: 'var(--svdt-warn, #fcb900)', icon: '!' },
};

/** Status message. The green/yellow pair here are the only colours in the system outside the core red/black palette. */
export function Alert({ kind = 'ok', title, children }) {
  const k = KIND[kind] || KIND.ok;
  return (
    <div style={{ display: 'flex', gap: 14, padding: '16px 20px', borderRadius: 'var(--svdt-radius)', fontSize: 13.5, lineHeight: 1.6, background: k.bg, boxShadow: `inset 3px 0 0 ${k.bar}`, color: 'var(--svdt-text-mid)', fontFamily: 'var(--svdt-font)' }}>
      <span>{k.icon}</span>
      <div><b style={{ display: 'block', fontSize: 12, fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 3, color: k.titleColor }}>{title}</b>{children}</div>
    </div>
  );
}
