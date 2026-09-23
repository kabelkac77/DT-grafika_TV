import React from 'react';
import { RiderCard } from './RiderCard.jsx';
import { CountryFlag } from './CountryFlag.jsx';

// G08 — přepis vrstvy mezičasů z DT-grafika-TV/split-time/app.js. Karta jezdce je vždy varianta A zmenšená na 60 %.
const tone = (s) => (!s || Number(s) === 0 ? 'neutral' : Number(s) < 0 ? 'gaining' : 'losing');
const deltaText = (s) => (!s ? '—' : Number(s) === 0 ? '0.000' : s.replace('-', '−'));
const Stopwatch = () => (
  <svg className="stopwatch" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="14" r="8" /><path d="M9 2h6M12 2v4M18 7l2-2M12 10v4l3 2" /></svg>
);

export function SplitTime({ rider = {}, leader = '', leaderCountry = '', time1 = '', delta1 = '', time2 = '', delta2 = '',
  finishTime = '', finishDelta = '', rank = '', phase = 'idle', style }) {
  const anim = phase === 'in' ? 'anim-in' : phase === 'out' ? 'anim-out' : null;
  const cut = leader.lastIndexOf(' ');
  return (
    <div className="split-time" style={style}>
      <RiderCard {...rider} variant="A" phase={phase} />
      {leader ? (
        <div className={['split-layer', anim].filter(Boolean).join(' ')}>
          <div className="leader">
            <span className="vs">VS</span><small>LÍDR</small>
            {leaderCountry === 'CZE' ? <CountryFlag code="CZE" /> : <span>{leaderCountry}</span>}
            <span className="leader-name">{leader.slice(0, cut + 1)}<strong>{leader.slice(cut + 1).toUpperCase()}</strong></span>
          </div>
          <div className="splits">
            {[[time1, delta1], [time2, delta2]].map(([t, d], i) => (
              <section className={`split ${tone(d)}`} aria-label={`Mezičas ${i + 1}`} key={i}>
                <div className="rail" />
                <div className="label"><Stopwatch /><span>{i + 1}</span></div>
                <div className="duration">{t || '—'}</div>
                <div className={`delta ${tone(d) === 'losing' ? 'loss' : tone(d) === 'gaining' ? 'gain' : ''}`}>{deltaText(d)}</div>
              </section>
            ))}
          </div>
          <article className={`timer-card ${tone(finishDelta)}`}>
            <div className="finish-row"><div className="totaldelta"><small>CÍL</small>{deltaText(finishDelta)}</div><div className="rank" aria-label="Pořadí">{rank || '—'}</div></div>
            <div className="timer-time">{finishTime || '—'}</div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
