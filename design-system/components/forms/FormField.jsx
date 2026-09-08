import React, { useState } from 'react';

const base = { width: '100%', fontFamily: 'var(--svdt-font)', fontSize: 15, color: '#fff', background: 'var(--svdt-bg-soft)', border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius-sm)', padding: '13px 15px', transition: 'var(--svdt-transition)', lineHeight: 1.4, boxSizing: 'border-box' };

/** Labelled text/email/select/textarea field. Label always sits above the field — never a placeholder standing in for it. */
export function FormField({ label, required, type = 'text', placeholder, value, options, hint, error, id }) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || label;
  const style = { ...base, borderColor: error ? 'var(--svdt-brand)' : focus ? 'var(--svdt-red)' : 'var(--svdt-border)', boxShadow: error ? '0 0 0 3px rgba(227,6,19,.16)' : focus ? '0 0 0 3px rgba(255,26,26,.14)' : 'none' };
  const focusProps = { onFocus: () => setFocus(true), onBlur: () => setFocus(false) };
  return (
    <div style={{ marginBottom: 20, fontFamily: 'var(--svdt-font)' }}>
      <label htmlFor={fieldId} style={{ display: 'block', fontSize: 11, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--svdt-text-soft)', marginBottom: 8 }}>{label} {required && <span style={{ color: 'var(--svdt-red)' }}>*</span>}</label>
      {type === 'textarea' ? (
        <textarea id={fieldId} placeholder={placeholder} defaultValue={value} style={{ ...style, resize: 'vertical', minHeight: 96 }} {...focusProps} />
      ) : type === 'select' ? (
        <select id={fieldId} defaultValue={value} style={style} {...focusProps}>{(options || []).map((o) => <option key={o}>{o}</option>)}</select>
      ) : (
        <input id={fieldId} type={type} placeholder={placeholder} defaultValue={value} style={style} {...focusProps} />
      )}
      {hint && !error && <p style={{ fontSize: 12, color: 'var(--svdt-text-muted)', margin: '7px 0 0', lineHeight: 1.5 }}>{hint}</p>}
      {error && <p style={{ fontSize: 12, color: 'var(--svdt-err, #ff6b6b)', margin: '7px 0 0', lineHeight: 1.5, display: 'flex', gap: 6 }}><span>✕</span><span>{error}</span></p>}
    </div>
  );
}
