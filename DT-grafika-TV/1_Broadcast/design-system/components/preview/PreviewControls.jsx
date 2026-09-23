import React from 'react';

export function PreviewControls({ fields = [], toggles = [], action, children }) {
  return (
    <section className="controls" aria-label="Ovládání náhledu">
      {fields.map((f) => (
        <label key={f.id}>
          {f.label}
          <select value={f.value} onChange={(e) => f.onChange(e.target.value)}>
            {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
      ))}
      {toggles.map((t) => (
        <label className="check" key={t.id}>
          <input type="checkbox" checked={t.checked} onChange={(e) => t.onChange(e.target.checked)} />
          {t.label}
        </label>
      ))}
      {children}
      {action ? <button type="button" onClick={action.onClick}>{action.label}</button> : null}
    </section>
  );
}
