import React from 'react';
import { BibNumber } from './BibNumber.jsx';
import { RiderName } from './RiderName.jsx';
import { RiderMeta } from './RiderMeta.jsx';
import { RiderPortrait } from './RiderPortrait.jsx';
import { SvataHoraRelief } from './SvataHoraRelief.jsx';
import { EVENT_WORDMARK } from './eventWordmark.js';

export function RiderCard({
  variant = 'A',
  first = '',
  last = '',
  number = '',
  team = '',
  country = '',
  category = '',
  showFlag = true,
  portraitSrc = '',
  visible = true,
  phase = 'idle',
  wordmarkSrc = EVENT_WORDMARK,
  style,
}) {
  const [portraitValid, setPortraitValid] = React.useState(true);
  React.useEffect(() => setPortraitValid(true), [portraitSrc]);
  const ready = Boolean((first || last) && number);
  if (!ready) return null;
  const hasPortrait = Boolean(portraitSrc) && portraitValid;
  const long = last.length > 15 || first.length > 15;
  const order = variant === 'A' ? ['country', 'team', 'category'] : ['country', 'category', 'team'];
  const anim = phase === 'in' ? 'anim-in' : phase === 'out' ? 'anim-out' : null;
  const cls = ['rider-card', variant, !hasPortrait && 'no-portrait', long && 'long', !visible && 'off', anim]
    .filter(Boolean).join(' ');
  return (
    <article className={cls} aria-label="Karta jezdce" style={style}>
      <SvataHoraRelief />
      <img className="event-wordmark" src={wordmarkSrc} alt="Svatohorský Down Town" />
      <div className="shell">
        <BibNumber number={number} />
        <div className="identity">
          <RiderName first={first} last={last} />
          <RiderMeta country={country} team={team} category={category} showFlag={showFlag} order={order} />
        </div>
      </div>
      {hasPortrait ? <RiderPortrait src={portraitSrc} onInvalid={() => setPortraitValid(false)} /> : null}
    </article>
  );
}
