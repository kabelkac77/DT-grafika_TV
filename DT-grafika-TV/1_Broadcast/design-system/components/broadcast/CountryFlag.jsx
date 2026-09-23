import React from 'react';

export function CountryFlag({ code = 'CZE' }) {
  if (String(code).toUpperCase() !== 'CZE') return null;
  return <i className="flag" aria-label="Česká vlajka" />;
}
