import React from 'react';
import { CountryFlag } from './CountryFlag.jsx';

export function RiderMeta({ country, team, category, showFlag = true, order = ['country', 'team', 'category'] }) {
  const parts = {
    country: country ? (
      <span className="country" key="country">
        {showFlag ? <CountryFlag code={country} /> : null}
        {String(country).toUpperCase()}
      </span>
    ) : null,
    team: team ? <span className="team" key="team">{team}</span> : null,
    category: category ? <span className="category" key="category">{category}</span> : null,
  };
  const items = order.map((k) => parts[k]).filter(Boolean);
  if (!items.length) return null;
  return <div className="meta">{items}</div>;
}
