import React from 'react';

export function BroadcastStage({ background = 'race', safeArea = false, children }) {
  const viewport = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1920));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="viewport" ref={viewport}>
      <div className={`stage ${background}${safeArea ? ' safe' : ''}`} style={{ transform: `scale(${scale})` }}>
        <div className="scene" />
        <div className="safe-area" />
        {children}
      </div>
    </div>
  );
}
