import React from 'react';

/** Podium for the top 3. Gold/silver/bronze colours are never used — SVDT ranks purely by fading brand red. */
export function Podium({ second, first, third }) {
  const Slot = ({ data, rank, big }) => (
    <div style={{ background: 'var(--svdt-bg-card)', border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius)', padding: big ? '30px 18px 26px' : '22px 18px', textAlign: 'center', position: 'relative', overflow: 'hidden', fontFamily: 'var(--svdt-font)' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: rank === 1 ? 'var(--svdt-brand)' : rank === 2 ? 'rgba(227,6,19,.55)' : 'rgba(227,6,19,.3)' }} />
      <div style={{ fontSize: big ? 58 : 44, fontWeight: 900, lineHeight: 1, color: 'var(--svdt-red)', fontVariantNumeric: 'tabular-nums', marginBottom: 10 }}>{rank}</div>
      <div style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.15, color: '#fff', marginBottom: 4 }}>{data.name}</div>
      <div style={{ fontSize: 12, color: 'var(--svdt-text-muted)', marginBottom: 12 }}>{data.team}</div>
      <div style={{ fontSize: 20, fontWeight: 900, fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{data.time}</div>
    </div>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr 1fr', gap: 16, alignItems: 'end' }}>
      <Slot data={second} rank={2} /><Slot data={first} rank={1} big /><Slot data={third} rank={3} />
    </div>
  );
}
