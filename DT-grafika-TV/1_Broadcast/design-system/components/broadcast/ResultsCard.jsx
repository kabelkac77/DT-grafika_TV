import React from 'react';
import { SvataHoraRelief } from './SvataHoraRelief.jsx';
import { EVENT_WORDMARK } from './eventWordmark.js';

// G01 — přepis šablony a vykreslení z DT-grafika-TV/karta-vysledky/app.js (draw, fit, formatTime).
const formatTime = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}.${String(ms % 1000).padStart(3, '0')}`;
const fit = (el, max, min) => {
  el.style.fontSize = `${max}px`;
  while (el.scrollWidth > el.clientWidth && parseFloat(el.style.fontSize) > min) el.style.fontSize = `${parseFloat(el.style.fontSize) - 1}px`;
};

export function ResultsCard({ category = '', runType = '', results = [], logos = [], showPlaceholders = false,
  phase = 'idle', wordmarkSrc = EVENT_WORDMARK, style }) {
  const root = React.useRef(null);
  const rows = results.slice(0, 10);
  React.useLayoutEffect(() => {
    const card = root.current;
    if (!card) return;
    card.querySelectorAll('td:nth-child(2)').forEach((el) => fit(el, 31, 24));
    const title = card.querySelector('.table-title h2'), run = card.querySelector('.table-title > span');
    title.style.fontSize = '58px'; run.style.fontSize = '32px';
    while (title.offsetWidth + run.offsetWidth + 28 > title.parentElement.clientWidth && parseFloat(title.style.fontSize) > 34) {
      title.style.fontSize = `${parseFloat(title.style.fontSize) - 1}px`;
      run.style.fontSize = `${Math.max(24, parseFloat(run.style.fontSize) - 0.5)}px`;
    }
  });
  if (!category || !runType || !rows.length) return null;
  const anim = phase === 'in' ? 'anim-in' : phase === 'out' ? 'anim-out' : null;
  return (
    <article ref={root} className={['results-card', anim].filter(Boolean).join(' ')} aria-label="Výsledky" style={style}>
      <SvataHoraRelief />
      <img className="event-wordmark" src={wordmarkSrc} alt="Svatohorský Down Town" />
      <div className="results-shell">
        <section className="standings">
          <header className="table-title"><h2>{category}</h2><span>{runType}</span></header>
          <table aria-label="Výsledky jezdců">
            <colgroup><col className="number-col" /><col className="name-col" /><col className="country-col" /><col className="time-col" /></colgroup>
            <thead><tr><th scope="col">ČÍSLO</th><th scope="col">JMÉNO</th><th scope="col">STÁT</th><th scope="col">ČAS / ZTRÁTA</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.number} className={i ? undefined : 'leader'}>
                  <td>{r.number}</td>
                  <td><span>{r.firstName + ' '}</span><strong>{r.lastName}</strong></td>
                  <td className="country">{r.country}</td>
                  <td>{i ? `+${((r.timeMs - rows[0].timeMs) / 1000).toFixed(3)} s` : formatTime(r.timeMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <aside className="logos" aria-label="Loga sponzorů">
          {[0, 1, 2, 3, 4].map((i) => logos[i]
            ? <div className="logo-slot" key={i}><img src={logos[i].src} alt={logos[i].alt} /></div>
            : <div className={showPlaceholders ? 'logo-slot placeholder' : 'logo-slot'} key={i}>{showPlaceholders ? 'LOGO' : null}</div>)}
        </aside>
      </div>
    </article>
  );
}
