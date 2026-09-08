import React from 'react';

/** Hero countdown — one per page, white numerals + red unit labels, always tabular/zero-padded. */
export function Countdown({ heading, days, hours, minutes, seconds, dateLine }) {
  const pad = (n) => String(n).padStart(2, '0');
  const Unit = ({ v, label }) => (
    <div style={{ minWidth: 112, background: 'var(--svdt-bg-soft)', border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius)', padding: '20px 14px' }}>
      <b style={{ display: 'block', fontSize: 52, fontWeight: 900, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em' }}>{typeof v === 'number' && label !== 'Dní' ? pad(v) : v}</b>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 900, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--svdt-red)', marginTop: 10 }}>{label}</span>
    </div>
  );
  return (
    <div style={{ background: 'var(--svdt-bg-card)', border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius)', padding: '44px 28px', textAlign: 'center', fontFamily: 'var(--svdt-font)', color: '#fff' }}>
      <h3 style={{ fontSize: 50, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 28px' }}>{heading}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Unit v={days} label="Dní" /><Unit v={hours} label="Hodin" /><Unit v={minutes} label="Minut" /><Unit v={seconds} label="Sekund" />
      </div>
      <p style={{ margin: '26px 0 0', fontSize: 13, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-text-soft)' }}>{dateLine}</p>
    </div>
  );
}
