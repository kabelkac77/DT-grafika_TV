import React from 'react';

/** Checkbox with a full-label click target (min 44px tall) — never a bare 19px box. */
export function Checkbox({ label, defaultChecked, id }) {
  return (
    <label htmlFor={id || label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', padding: '4px 0', fontFamily: 'var(--svdt-font)' }}>
      <input id={id || label} type="checkbox" defaultChecked={defaultChecked} style={{ width: 19, height: 19, flex: '0 0 19px', accentColor: 'var(--svdt-brand)', marginTop: 2, padding: 0 }} />
      <span style={{ fontSize: 13.5, color: 'var(--svdt-text-soft)', lineHeight: 1.55 }}>{label}</span>
    </label>
  );
}
