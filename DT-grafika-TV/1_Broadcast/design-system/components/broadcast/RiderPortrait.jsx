import React from 'react';

export function RiderPortrait({ src, alt = 'Portrét jezdce', onInvalid }) {
  if (!src) return null;
  return (
    <div className="portrait-area">
      <img src={src} alt={alt} onError={onInvalid} />
    </div>
  );
}
