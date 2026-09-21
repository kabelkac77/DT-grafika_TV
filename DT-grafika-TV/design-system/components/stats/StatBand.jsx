import React from 'react';

/** Quick-glance stat strip below a hero. 3–4 figures max — a 5th breaks the rhythm. */
export function StatBand({ stats = [] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length},1fr)`, border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius)', overflow: 'hidden', background: 'var(--svdt-bg-card)', fontFamily: 'var(--svdt-font)' }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ padding: '32px 22px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid var(--svdt-line)' : 'none' }}>
          <b style={{ display: 'block', fontSize: 38, fontWeight: 900, lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{s.value}</b>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-text-soft)', marginTop: 10, lineHeight: 1.5 }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
