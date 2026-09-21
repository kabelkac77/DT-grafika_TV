import React, { useState } from 'react';

/** Segmented pill radio group (e.g. shirt size). Selected pill fills brand red. */
export function RadioGroup({ name, options = [], defaultValue }) {
  const [val, setVal] = useState(defaultValue || options[0]);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length},1fr)`, gap: 10, fontFamily: 'var(--svdt-font)' }}>
      {options.map((o) => (
        <label key={o} style={{ position: 'relative' }}>
          <input type="radio" name={name} checked={val === o} onChange={() => setVal(o)} style={{ position: 'absolute', opacity: 0 }} />
          <span style={{ display: 'block', textAlign: 'center', fontSize: 12, fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase', padding: '14px 10px', borderRadius: 'var(--svdt-radius-sm)', border: '1px solid ' + (val === o ? 'transparent' : 'var(--svdt-border)'), color: val === o ? '#fff' : 'var(--svdt-text-soft)', background: val === o ? 'var(--svdt-brand)' : 'transparent', cursor: 'pointer', transition: 'var(--svdt-transition)' }}>{o}</span>
        </label>
      ))}
    </div>
  );
}
