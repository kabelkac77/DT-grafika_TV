import React from 'react';

/** Results table. Times/gaps use tabular numerals and right alignment; top 3 get a fading red left bar, gap-to-leader is the only accent-red figure. */
export function ResultsTable({ caption, rows = [] }) {
  const posColor = (i) => (i < 3 ? 'var(--svdt-red)' : '#fff');
  return (
    <div style={{ border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius)', overflow: 'hidden', background: 'var(--svdt-bg-card)', fontFamily: 'var(--svdt-font)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {caption && <caption style={{ captionSide: 'top', textAlign: 'left', padding: '12px 18px', fontSize: 12, color: 'var(--svdt-text-muted)' }}>{caption}</caption>}
        <thead><tr>
          {['Poř.', 'Č.', 'Jezdec', 'Kategorie', 'Čas', 'Ztráta'].map((h, i) => (
            <th key={h} style={{ textAlign: i >= 4 ? 'right' : 'left', fontSize: 10.5, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-text-muted)', padding: '16px 18px', background: 'var(--svdt-bg-soft)', borderBottom: '1px solid var(--svdt-border)', whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.bib} style={{ background: i === 0 ? 'linear-gradient(90deg,rgba(227,6,19,.16),transparent 55%)' : 'transparent' }}>
              <td style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)', fontSize: 19, fontWeight: 900, fontVariantNumeric: 'tabular-nums', color: posColor(i), width: '1%', boxShadow: i < 3 ? `inset 3px 0 0 rgba(227,6,19,${i === 0 ? 1 : i === 1 ? .55 : .3})` : 'none' }}>{r.dnf ? '—' : i + 1}</td>
              <td style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)' }}><span style={{ display: 'inline-grid', placeItems: 'center', minWidth: 34, height: 26, padding: '0 7px', borderRadius: 5, background: 'var(--svdt-bg-soft)', border: '1px solid var(--svdt-border)', fontSize: 12.5, fontWeight: 900, fontVariantNumeric: 'tabular-nums', color: 'var(--svdt-text-soft)' }}>{r.bib}</span></td>
              <td style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)' }}><span style={{ color: '#fff', fontWeight: 700, fontSize: 15, display: 'block' }}>{r.name}</span><span style={{ fontSize: 12, color: 'var(--svdt-text-muted)' }}>{r.team}</span></td>
              <td style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)', color: 'var(--svdt-text-mid)', fontSize: 14 }}>{r.category}</td>
              {r.dnf ? <td colSpan={2} style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)', color: 'var(--svdt-text-muted)', fontSize: 12, fontWeight: 900, letterSpacing: '.1em', textAlign: 'right' }}>DNF</td> : (<>
                <td style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)', fontVariantNumeric: 'tabular-nums', fontWeight: 900, color: '#fff', fontSize: 15, textAlign: 'right', whiteSpace: 'nowrap' }}>{r.time}</td>
                <td style={{ padding: '15px 18px', borderBottom: '1px solid var(--svdt-line)', fontVariantNumeric: 'tabular-nums', color: 'var(--svdt-red)', fontSize: 13, textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap' }}>{r.gap || '—'}</td>
              </>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
