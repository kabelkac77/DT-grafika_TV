import React from 'react';

const PILL_STYLES = {
  live: { background: 'var(--svdt-brand)', color: '#fff' },
  soon: { background: 'rgba(255,255,255,.08)', color: 'var(--svdt-text-soft)' },
  done: { background: 'transparent', color: 'var(--svdt-text-muted)', boxShadow: 'inset 0 0 0 1px var(--svdt-border)' },
};

/** One row of a day schedule. `now` highlights the active row with a left red bar. */
export function ScheduleRow({ time, title, detail, status = 'soon', now = false }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 18, alignItems: 'center',
      padding: '16px 22px', borderBottom: '1px solid var(--svdt-line)',
      background: now ? 'rgba(227,6,19,.09)' : 'transparent',
      boxShadow: now ? 'inset 3px 0 0 var(--svdt-red)' : 'none',
    }}>
      <time style={{ fontSize: 19, fontWeight: 900, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{time}</time>
      <div><b style={{ fontSize: 15, fontWeight: 700, display: 'block', lineHeight: 1.3 }}>{title}</b><small style={{ fontSize: 12.5, color: 'var(--svdt-text-muted)', display: 'block', lineHeight: 1.4 }}>{detail}</small></div>
      <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 'var(--svdt-radius-pill)', lineHeight: 1, whiteSpace: 'nowrap', ...PILL_STYLES[status] }}>
        {status === 'live' ? 'Právě teď' : status === 'done' ? 'Hotovo' : 'Následuje'}
      </span>
    </div>
  );
}
