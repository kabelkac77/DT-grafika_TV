/* SVDT — most mezi režijním pultem a grafickou komponentou. Protokol verze 1.
 *
 * Komponenta si nedrží žádnou provozní logiku režie. Tenhle soubor jen
 * přebírá připravená data a pokyn ke stavu (IN / OUT) a hlásí zpět,
 * jestli je karta připravená k vysílání. Viz ZADANI.md, oddíl 8.1.
 *
 * Soubor je nečinný, pokud stránka neběží v rámci jiného okna, takže
 * nijak nezasahuje do samostatných editorů ani do generování PNG.
 */
(() => {
  'use strict';
  if (window.parent === window) return;

  const PROTOCOL = 1;
  const send = message => window.parent.postMessage({ svdt: PROTOCOL, ...message }, '*');

  /* --- rozpoznání komponenty podle rozhraní, které sama vystavuje --- */
  const kind =
    window.svdtSplit ? 'G08' :
    window.SVDTResults ? 'G01' :
    window.svdtTimer ? 'G04' :
    window.svdtGuest ? 'G05' :
    window.svdt ? 'G02' : null;
  if (!kind) return;

  const $ = id => document.getElementById(id);
  const stage = () => document.querySelector('.stage');

  /* --- společná IN / OUT animace náhledu ---
     Provizorní. Finální animace patří ke každé komponentě zvlášť a bude
     zadána samostatně; tady jde jen o to, aby byl v pultu vidět rozdíl
     mezi náběhem a řízeným skrytím. */
  const css = document.createElement('style');
  css.textContent = `
    .stage{transition:opacity .3s ease}
    .stage.svdt-out{opacity:0}
    .stage.svdt-out .rider-card,.stage.svdt-out #results-card,
    .stage.svdt-out #timer,.stage.svdt-out #guest,.stage.svdt-out #split-layer{
      transform:translateY(26px);transition:transform .3s ease}
    .stage .rider-card,.stage #results-card,.stage #timer,
    .stage #guest,.stage #split-layer{transition:transform .3s ease}`;
  document.head.append(css);

  const setField = (id, value) => { const el = $(id); if (el && value !== undefined) el.value = String(value ?? ''); };
  const setCheck = (id, value) => { const el = $(id); if (el && value !== undefined) el.checked = Boolean(value); };

  /* --- předání dat konkrétní komponentě --- */
  function apply(d) {
    if (kind === 'G01') {
      window.SVDTResults.setData({
        category: d.category, runType: d.runType,
        results: d.results, logos: d.logos || []
      });
      return;
    }
    if (kind === 'G04') { window.svdtTimer.setTime(d.time); return; }
    if (kind === 'G05') { setField('name', d.name); setField('role', d.role); window.svdtGuest.render(); return; }

    /* G02 i G08 staví na kartě jezdce. */
    for (const key of ['first', 'last', 'number', 'team', 'country', 'category']) setField(key, d[key]);
    setCheck('portrait', d.portrait);
    if (d.variant && $('variant')) $('variant').value = d.variant;
    window.svdt.render();

    if (kind === 'G08') window.svdtSplit.setData({
      leader: d.leader, leaderCountry: d.leaderCountry,
      time1: d.time1, delta1: d.delta1, time2: d.time2, delta2: d.delta2,
      finishTime: d.finishTime, finishDelta: d.finishDelta, rank: d.rank
    });
  }

  /* --- stav připravenosti: komponenta si validuje data sama,
         pult jen přebírá její vlastní hlášení --- */
  function report() {
    const boxes = [$('status'), $('split-status')].filter(Boolean);
    const bad = boxes.find(el => el.classList.contains('error'));
    send({
      type: 'status', graphic: kind,
      ok: !bad,
      message: (bad || boxes[0] || {}).textContent || ''
    });
  }

  window.addEventListener('message', event => {
    const m = event.data;
    if (!m || m.svdt !== PROTOCOL) return;
    try {
      if (m.type === 'load') { apply(m.payload || {}); requestAnimationFrame(report); }
      if (m.type === 'state') {
        const s = stage();
        if (s) s.classList.toggle('svdt-out', m.state === 'out');
        send({ type: 'state', graphic: kind, state: m.state });
      }
    } catch (error) {
      send({ type: 'status', graphic: kind, ok: false, message: 'Komponenta odmítla data: ' + error.message });
    }
  });

  /* Náhled startuje skrytý; pult si ho rozsvítí povelem. */
  const boot = () => { stage()?.classList.add('svdt-out'); send({ type: 'ready', graphic: kind }); };
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);
})();
