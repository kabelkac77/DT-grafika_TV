import React, { useState } from 'react';

const TIER_CFG = { general: { cols: 1, height: 150, fontSize: 30 }, main: { cols: 3, height: 110, fontSize: 20 }, support: { cols: 5, height: 78, fontSize: 13 }, media: { cols: 6, height: 62, fontSize: 11 } };

/** One tier of the partner wall. Tier is expressed by tile size only — never by border colour. Logos keep original colours; never recolour to brand red. */
export function PartnerWall({ tier = 'main', label, sublabel, partners = [] }) {
  const cfg = TIER_CFG[tier] || TIER_CFG.main;
  return (
    <div style={{ fontFamily: 'var(--svdt-font)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <b style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--svdt-red)', whiteSpace: 'nowrap' }}>{label}</b>
        <i style={{ flex: 1, height: 1, background: 'var(--svdt-line)' }} />
        <small style={{ fontFamily: 'ui-monospace,Consolas,monospace', fontSize: 10.5, color: 'var(--svdt-text-muted)' }}>{sublabel}</small>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cfg.cols},1fr)`, gap: 14 }}>
        {partners.map((p) => <Tile key={p} name={p} height={cfg.height} fontSize={cfg.fontSize} />)}
      </div>
    </div>
  );
}
function Tile({ name, height, fontSize }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: hover ? 'var(--svdt-bg-card-soft)' : 'var(--svdt-bg-card)', border: '1px solid ' + (hover ? 'var(--svdt-red)' : 'var(--svdt-border)'), borderRadius: 'var(--svdt-radius)', height, display: 'grid', placeItems: 'center', transition: 'var(--svdt-transition)', cursor: 'pointer' }}>
      <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.04em', color: hover ? '#fff' : 'var(--svdt-text-muted)', fontSize, textAlign: 'center', padding: '0 12px', transition: 'var(--svdt-transition)' }}>{name}</span>
    </div>
  );
}
