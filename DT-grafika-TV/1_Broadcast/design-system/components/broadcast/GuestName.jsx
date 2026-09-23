import React from 'react';

export function GuestName({ name = '' }) {
  const trimmed = name.trim();
  if (!trimmed) return null;
  const cut = trimmed.lastIndexOf(' ');
  const before = cut > 0 ? trimmed.slice(0, cut + 1) : '';
  const surname = cut > 0 ? trimmed.slice(cut + 1) : trimmed;
  return (
    <div className="guest-name">
      {before}
      <strong>{surname}</strong>
    </div>
  );
}
