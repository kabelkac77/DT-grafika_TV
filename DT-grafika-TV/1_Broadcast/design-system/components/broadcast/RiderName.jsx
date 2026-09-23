import React from 'react';

export function RiderName({ first, last }) {
  return (
    <div className="name">
      {first ? <span className="first">{first}</span> : null}
      {last ? <span className="last">{last}</span> : null}
    </div>
  );
}
