import React from 'react';

// G04 — přepis DT-grafika-TV/časomíra/index.html a app.js. Čas sám neběží; neplatný zápis kartu skryje.
const VALID = /^\d{1,2}:[0-5]\d\.\d{3}$/;

export function TimerCard({ time = '', label = 'ČAS JÍZDY', phase = 'idle', style }) {
  if (!VALID.test(time)) return null;
  const anim = phase === 'in' ? 'anim-in' : phase === 'out' ? 'anim-out' : null;
  return (
    <article className={['timer-card', anim].filter(Boolean).join(' ')} aria-label="Čas jízdy" style={style}>
      <span className="timer-label">{label}</span>
      <span className="timer-time">{time}</span>
    </article>
  );
}
