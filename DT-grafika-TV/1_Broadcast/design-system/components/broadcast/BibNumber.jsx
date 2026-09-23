import React from 'react';

export function BibNumber({ number, label = 'ČÍSLO' }) {
  if (!number) return null;
  return (
    <div className="bib">
      <small>{label}</small>
      <strong>{number}</strong>
    </div>
  );
}
