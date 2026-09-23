import React from 'react';

export function BroadcastStatus({ tone = 'info', children }) {
  return (
    <p className={`status${tone === 'error' ? ' error' : ''}`} role="status">{children}</p>
  );
}
