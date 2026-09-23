import React from 'react';
import { GuestName } from './GuestName.jsx';
import { SvataHoraRelief } from './SvataHoraRelief.jsx';
import { EVENT_WORDMARK } from './eventWordmark.js';

export function GuestCard({ name = '', role = '', phase = 'idle', wordmarkSrc = EVENT_WORDMARK, style }) {
  const trimmedName = name.trim();
  const trimmedRole = role.trim();
  if (!trimmedName) return null;
  const anim = phase === 'in' ? 'anim-in' : phase === 'out' ? 'anim-out' : null;
  return (
    <article className={['guest-card', anim].filter(Boolean).join(' ')} aria-label="Karta hosta" style={style}>
      <SvataHoraRelief />
      <img className="event-wordmark" src={wordmarkSrc} alt="Svatohorský Down Town" />
      <div className="guest-shell">
        <GuestName name={trimmedName} />
        {trimmedRole ? <div className="guest-role">{trimmedRole}</div> : null}
      </div>
    </article>
  );
}
