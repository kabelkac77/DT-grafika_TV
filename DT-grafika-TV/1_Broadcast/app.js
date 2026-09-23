/* SVDT — režijní pult. Ukázka ovládání, ne ostrý systém.
 *
 * Co tu opravdu běží: stavový model Preview → Take → Program → Out, vrstvy
 * programu, cílové výstupy TV a LED, kontrola kolizí zón na obraze, auto out,
 * nouzové skrytí, fronta z makra, ruční oprava dat a protokol.
 *
 * Co tu neběží: časomíra, automatika a jakékoli odbavení mimo prohlížeč.
 * Grafiky v monitorech jsou skutečné komponenty z tohoto repozitáře; data do
 * nich chodí zprávou postMessage přes broadcast/bridge.js.
 */
(() => {
  'use strict';

  const D = window.SVDT_BC_DATA;
  const GRAPHICS = window.SVDT_BC_GRAPHICS;
  const MACROS = window.SVDT_BC_MACROS;
  const $ = id => document.getElementById(id);
  const gfx = id => GRAPHICS.find(g => g.id === id);
  const MAX_LAYERS = 3;

  /* Časy pohybu podle design systému (karta-jezdce/motion.css).
     Výměna grafiky je vždy celý cyklus odchod → pauza → nástup; data se ve
     vysílané kartě nikdy nepřepisují. Karta musí po nástupu stát v klidu
     nejméně 3,5 s, proto je nejkratší auto out 5 s (0,76 s nástup + 3,5 s klid). */
  const MOTION = { in: 760, out: 380, pause: 200, hold: 3500 };
  const CYCLE_MS = MOTION.out + MOTION.pause;
  const MIN_DURATION = Math.ceil((MOTION.in + MOTION.hold) / 1000);
  let layerSeq = 0;

  /* Ořez LED náhledu z TV plátna. Skutečný rozměr panelů potvrdí dodavatel LED. */
  const LED = { top: 720, height: 360 };
  const TV_STRIP = 128;

  const state = {
    run: D.runs[1].id,
    category: D.categories[0],
    tab: 'riders',
    riderBib: D.riders[0].bib,
    guestIndex: 0,
    background: 'race',
    safe: false,
    options: {},                 /* volby jednotlivých grafik, např. rozložení karty jezdce */
    manual: {},                  /* ručně přepsané hodnoty aktuálního náhledu */
    preview: null,
    program: [],
    pending: null,               /* čekající nástup po odchodu předchozí grafiky */
    queue: null
  };
  for (const g of GRAPHICS) if (g.options) state.options[g.id] = Object.fromEntries(g.options.map(o => [o.id, o.value]));

  /* ================= plochy s grafikou ================= */

  const surfaces = {
    pv:  { host: $('pv-frames'),  frames: new Map(), mode: 'full' },
    pg:  { host: $('pg-frames'),  frames: new Map(), mode: 'full' },
    tv:  { host: $('tv-frames'),  frames: new Map(), mode: 'tv' },
    led: { host: $('led-frames'), frames: new Map(), mode: 'led' }
  };

  function frameFor(name, gid) {
    const surface = surfaces[name];
    let frame = surface.frames.get(gid);
    if (!frame) {
      frame = document.createElement('iframe');
      frame.src = gfx(gid).frame + '?capture=1&background=transparent';
      frame.title = gid + ' — ' + gfx(gid).name;
      frame.hidden = true;
      frame.dataset.gid = gid;
      frame.queue = [];
      frame.isReady = false;
      frame.sent = '';
      surface.frames.set(gid, frame);
      surface.host.append(frame);
      scale();
    }
    return frame;
  }

  function post(frame, message) {
    if (frame.isReady) frame.contentWindow.postMessage({ svdt: 1, ...message }, '*');
    else frame.queue.push(message);
  }

  window.addEventListener('message', event => {
    const m = event.data;
    if (!m || m.svdt !== 1) return;
    const frame = [...Object.values(surfaces)].flatMap(s => [...s.frames.values()])
      .find(f => f.contentWindow === event.source);
    if (!frame) return;

    if (m.type === 'ready') {
      frame.isReady = true;
      for (const queued of frame.queue.splice(0)) post(frame, queued);
    }
    /* Připravenost hlásí komponenta sama. Pult jen převezme její verdikt
       z náhledové plochy a podle něj povolí nebo zakáže TAKE. */
    if (m.type === 'status' && surfaces.pv.frames.get(frame.dataset.gid) === frame
        && state.preview && state.preview.gid === frame.dataset.gid) {
      state.preview.ok = m.ok;
      state.preview.message = m.message;
      if (!m.ok) log('err', frame.dataset.gid, 'Komponenta hlásí: ' + m.message);
      drawPreview();
      drawTransport();
    }
  });

  /* Srovná plochu s tím, co na ní má být. items = [{gid, payload, nonce}] odspodu nahoru.
     Nástup se přehraje, když se grafika objeví nebo když přijde nový nonce
     (nové TAKE, nově připravený náhled); pouhá změna dat nástup nespouští. */
  function syncSurface(name, items) {
    const surface = surfaces[name];
    const wanted = new Map(items.map(i => [i.gid, i.payload]));
    for (const [gid, frame] of surface.frames) {
      if (wanted.has(gid)) continue;
      if (!frame.hidden) { post(frame, { type: 'state', state: 'out' }); hideLater(frame); }
    }
    items.forEach((item, index) => {
      const frame = frameFor(name, item.gid);
      const serialized = JSON.stringify(item.payload);
      frame.style.zIndex = String(index + 1);
      if (frame.sent !== serialized) { frame.sent = serialized; post(frame, { type: 'load', payload: item.payload }); }
      if (frame.hidden || frame.nonce !== item.nonce) {
        frame.hidden = false; clearTimeout(frame.hider);
        frame.nonce = item.nonce;
        post(frame, { type: 'state', state: 'in' });
      }
    });
  }

  function hideLater(frame) {
    clearTimeout(frame.hider);
    frame.hider = setTimeout(() => { frame.hidden = true; frame.sent = ''; frame.nonce = null; }, MOTION.out + 70);
  }

  function scale() {
    for (const [name, surface] of Object.entries(surfaces)) {
      const box = surface.host.parentElement;
      let ratio = box.clientWidth / 1920;
      if (surface.mode === 'led') {
        box.style.height = Math.round(LED.height * ratio) + 'px';
        surface.host.style.transform = `translateY(${-LED.top * ratio}px)`;
      }
      if (surface.mode === 'tv') {
        /* Malý kontrolní monitor: měřítko drží výška, ne šířka. */
        ratio = TV_STRIP / 1080;
        box.style.height = TV_STRIP + 'px';
        surface.host.style.width = Math.round(1920 * ratio) + 'px';
        surface.host.style.height = TV_STRIP + 'px';
      }
      for (const frame of surface.frames.values()) frame.style.transform = `scale(${ratio})`;
    }
  }
  new ResizeObserver(scale).observe(document.body);

  /* ================= data pro grafiky ================= */

  const runLabel = () => D.runs.find(r => r.id === state.run).label;
  const rider = () => D.riders.find(r => r.bib === state.riderBib) || D.riders[0];
  const guest = () => D.guests[state.guestIndex];
  const results = category => D.riders.filter(r => r.category === category)
    .sort((a, b) => a.time - b.time).slice(0, 10)
    .map(r => ({ number: r.bib, firstName: r.first, lastName: r.last, country: r.country, timeMs: r.time }));

  function buildPayload(gid) {
    const r = rider(), o = state.options[gid] || {};
    if (gid === 'G01') return { category: state.category.toUpperCase(), runType: runLabel().toUpperCase(), results: results(state.category), logos: [] };
    if (gid === 'G04') return { time: D.clock };
    if (gid === 'G05') return { name: guest().name, role: guest().role };
    const base = { first: r.first, last: r.last, number: r.bib, team: r.team, country: r.country, category: r.category };
    if (gid === 'G02') return { ...base, variant: o.variant, portrait: o.portrait && r.portrait };
    const s = D.splits[r.bib] || D.splits._;
    return { ...base, portrait: r.portrait, variant: 'A', leader: D.leader.name, leaderCountry: D.leader.country, ...s };
  }

  const objectLabel = gid => {
    const kind = gfx(gid).object;
    if (kind === 'rider') { const r = rider(); return `#${r.bib} ${r.first} ${r.last} · ${r.category}`; }
    if (kind === 'guest') { const g = guest(); return `${g.name} · ${g.role}`; }
    if (kind === 'category') return `${state.category} · ${runLabel()} · ${results(state.category).length} výsledků`;
    return 'Ukázkový čas ' + D.clock;
  };

  /* ================= Preview ================= */

  function arm(gid, { keepQueue = false } = {}) {
    const g = gfx(gid);
    if (!keepQueue) state.queue = null;
    state.manual = {};
    state.preview = {
      gid, payload: buildPayload(gid), targets: { ...g.targets },
      duration: g.duration > 0 ? Math.max(g.duration, MIN_DURATION) : MIN_DURATION, autoOut: g.duration > 0,
      nonce: ++layerSeq,
      ok: false, message: 'Komponenta ještě neodpověděla…', edited: false
    };
    $('target-tv').checked = state.preview.targets.tv;
    $('target-led').checked = state.preview.targets.led;
    $('auto-out').checked = state.preview.autoOut;
    $('duration').value = state.preview.duration;
    log('prep', gid, 'Připraveno do náhledu — ' + objectLabel(gid));
    draw();
  }

  /* Objekt se změnil, ale grafika zůstává — přenačti data, pokud je uživatel
     ručně nepřepsal. Ruční oprava má přednost, dokud se grafika nepřipraví znovu. */
  function refreshPreview() {
    if (!state.preview) return;
    state.preview.payload = { ...buildPayload(state.preview.gid), ...state.manual };
    draw();
  }

  /* ================= Take / Out ================= */

  const zonesOf = gid => gfx(gid).zones;
  const collisions = gid => state.program.filter(l => l.gid !== gid && zonesOf(l.gid).some(z => zonesOf(gid).includes(z)));

  function takeBlock() {
    const p = state.preview;
    if (!p) return 'Není co odvysílat. Vyberte grafiku.';
    if (!p.ok) return 'Komponenta není připravená k vysílání.';
    if (!p.targets.tv && !p.targets.led) return 'Nezvolen žádný cílový výstup.';
    const replacing = collisions(p.gid).length + (state.program.some(l => l.gid === p.gid) ? 1 : 0);
    if (state.pending) return 'Probíhá výměna grafiky…';
    if (state.program.length - replacing >= MAX_LAYERS) return `Program už nese ${MAX_LAYERS} vrstvy. Nejdřív něco sundejte.`;
    return null;
  }

  function take() {
    const blocked = takeBlock();
    if (blocked) { log('err', state.preview ? state.preview.gid : '—', 'TAKE odmítnut: ' + blocked); draw(); return; }
    const p = state.preview;
    const duration = p.autoOut ? Math.max(p.duration, MIN_DURATION) : 0;
    const layer = {
      gid: p.gid, payload: p.payload, targets: { ...p.targets },
      label: objectLabel(p.gid), edited: p.edited, nonce: ++layerSeq, deadline: null
    };
    const targets = [p.targets.tv && 'TV', p.targets.led && 'LED'].filter(Boolean).join(' + ');

    const commit = () => {
      state.pending = null;
      layer.startedAt = Date.now();
      if (duration) {
        layer.deadline = layer.startedAt + duration * 1000;
        layer.timer = setTimeout(() => drop(layer, 'auto out'), duration * 1000);
      }
      state.program.push(layer);
      log('take', layer.gid, `TAKE → ${targets} · ${layer.label}` + (layer.edited ? ' · ručně upraveno' : ''));
      draw();
    };

    /* Co musí z obrazu pryč, odejde celým odchodem; nová grafika nastoupí
       až po pauze. Totéž platí pro stejnou grafiku s novými daty. */
    const leaving = [...collisions(p.gid), ...state.program.filter(l => l.gid === p.gid)];
    for (const old of leaving) drop(old, old.gid === p.gid ? 'výměna dat — odchod před novým nástupem' : 'kolize zóny s ' + p.gid);

    nextInQueue();
    if (leaving.length) { state.pending = setTimeout(commit, CYCLE_MS); draw(); }
    else commit();
  }

  function drop(layer, reason) {
    const index = state.program.indexOf(layer);
    if (index < 0) return;
    clearTimeout(layer.timer);
    state.program.splice(index, 1);
    const early = reason === 'ruční OUT' && Date.now() - layer.startedAt < MOTION.in + MOTION.hold;
    log('out', layer.gid, 'OUT — ' + reason + (early ? ' · dřív než po 3,5 s klidu' : ''));
    draw();
  }

  function panic() {
    if (!state.program.length) { log('out', '—', 'CUT ALL na prázdný program.'); draw(); return; }
    clearTimeout(state.pending); state.pending = null;
    for (const layer of [...state.program]) { clearTimeout(layer.timer); }
    state.program = [];
    log('err', '—', 'CUT ALL — nouzové skrytí všech vrstev na všech výstupech.');
    draw();
  }

  /* ================= fronta z makra ================= */

  function startMacro(macro) {
    state.queue = { name: macro.name, steps: [...macro.steps], index: 0 };
    arm(macro.steps[0], { keepQueue: true });
    log('prep', macro.steps[0], `Makro „${macro.name}" — krok 1 z ${macro.steps.length}.`);
  }

  function nextInQueue() {
    const q = state.queue;
    if (!q) return;
    q.index += 1;
    if (q.index >= q.steps.length) { log('prep', '—', `Makro „${q.name}" dokončeno.`); state.queue = null; state.preview = null; return; }
    arm(q.steps[q.index], { keepQueue: true });
    log('prep', q.steps[q.index], `Makro „${q.name}" — krok ${q.index + 1} z ${q.steps.length}.`);
  }

  /* ================= protokol ================= */

  const entries = [];
  function log(kind, gid, message) {
    entries.unshift({ kind, gid, message, at: new Date() });
    if (entries.length > 120) entries.pop();
    drawLog();
  }
  function drawLog() {
    $('log-body').replaceChildren(...entries.map(e => {
      const line = document.createElement('div');
      line.className = 'log-line k-' + e.kind;
      const t = document.createElement('span'); t.className = 't'; t.textContent = e.at.toLocaleTimeString('cs-CZ');
      const k = document.createElement('span'); k.className = 'k'; k.textContent = e.gid;
      const m = document.createElement('span'); m.className = 'm'; m.textContent = e.message;
      line.append(t, k, m);
      return line;
    }));
  }

  /* ================= vykreslení rozhraní ================= */

  function draw() { drawObjects(); drawGraphics(); drawPreview(); drawProgram(); drawTransport(); drawFrames(); }

  function drawFrames() {
    const item = l => ({ gid: l.gid, payload: l.payload, nonce: l.nonce });
    syncSurface('pv', state.preview ? [item(state.preview)] : []);
    syncSurface('pg', state.program.map(item));
    syncSurface('tv', state.program.filter(l => l.targets.tv).map(item));
    syncSurface('led', state.program.filter(l => l.targets.led).map(item));
    $('pv-empty').hidden = Boolean(state.preview);
    $('pg-empty').hidden = state.program.length > 0;
  }

  function drawObjects() {
    const needle = $('search').value.trim().toLowerCase();
    const list = $('object-list');
    list.replaceChildren();

    const items = state.tab === 'riders'
      ? D.riders.filter(r => !needle || (r.bib + ' ' + r.first + ' ' + r.last + ' ' + r.team).toLowerCase().includes(needle))
        .map(r => ({ key: r.bib, lead: '#' + r.bib, title: r.first + ' ' + r.last, sub: `${r.category} · ${r.country}${r.team ? ' · ' + r.team : ''}`, on: r.bib === state.riderBib }))
      : D.guests.filter(g => !needle || (g.name + ' ' + g.role).toLowerCase().includes(needle))
        .map((g, i) => ({ key: i, lead: '☻', title: g.name, sub: g.role, on: i === state.guestIndex }));

    $('objects-count').textContent = items.length + (state.tab === 'riders' ? ' JEZDCŮ' : ' HOSTŮ');

    for (const item of items) {
      const row = document.createElement('button');
      row.type = 'button'; row.className = 'row'; row.setAttribute('aria-selected', String(item.on));
      row.innerHTML = '<span class="bib"></span><span class="who"><b></b><small></small></span>';
      row.querySelector('.bib').textContent = item.lead;
      row.querySelector('b').textContent = item.title;
      row.querySelector('small').textContent = item.sub;
      row.onclick = () => {
        if (state.tab === 'riders') state.riderBib = item.key; else state.guestIndex = item.key;
        refreshPreview(); draw();
      };
      list.append(row);
    }
  }

  function drawGraphics() {
    const host = $('graphics');
    host.replaceChildren();
    for (const g of GRAPHICS) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'g-card' + (state.program.some(l => l.gid === g.id) ? ' on-air' : '');
      card.setAttribute('aria-selected', String(state.preview?.gid === g.id));
      card.innerHTML = '<span class="gid"></span><span><b></b><small></small></span><kbd></kbd>';
      card.querySelector('.gid').textContent = g.id;
      card.querySelector('b').textContent = g.name;
      card.querySelector('small').textContent = g.hint;
      card.querySelector('kbd').textContent = g.key;
      card.onclick = () => arm(g.id);
      host.append(card);
    }

    const macros = $('macros');
    macros.replaceChildren();
    for (const m of MACROS) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'macro';
      button.innerHTML = '<span></span><span class="steps"></span>';
      button.children[0].textContent = m.name;
      button.children[1].textContent = m.steps.join(' → ');
      button.onclick = () => { startMacro(m); draw(); };
      macros.append(button);
    }

    const box = $('queue-box');
    box.replaceChildren();
    if (state.queue) {
      const q = document.createElement('div');
      q.className = 'queue';
      q.innerHTML = '<p></p><div class="steps"></div><button class="ghost" type="button">Zrušit frontu</button>';
      q.querySelector('p').textContent = `FRONTA · ${state.queue.name.toUpperCase()} · KROK ${state.queue.index + 1}/${state.queue.steps.length}`;
      q.querySelector('.steps').textContent = state.queue.steps
        .map((s, i) => (i === state.queue.index ? '▸ ' : '') + s).join('   ');
      q.querySelector('button').onclick = () => { state.queue = null; log('prep', '—', 'Fronta zrušena obsluhou.'); draw(); };
      box.append(q);
    }
    drawManual();
  }

  const LABELS = {
    first: 'Jméno', last: 'Příjmení', number: 'Číslo', team: 'Tým', country: 'Země', category: 'Kategorie',
    time: 'Čas', name: 'Jméno', role: 'Funkce', runType: 'Jízda', leader: 'Lídr', leaderCountry: 'Země lídra',
    time1: 'Mezičas 1', delta1: 'Rozdíl 1', time2: 'Mezičas 2', delta2: 'Rozdíl 2',
    finishTime: 'Cílový čas', finishDelta: 'Cílový rozdíl', rank: 'Pořadí', variant: 'Rozložení'
  };

  function drawManual() {
    const host = $('manual');
    host.replaceChildren();
    if (!state.preview) {
      const p = document.createElement('p');
      p.className = 'out-note';
      p.textContent = 'Až bude v náhledu grafika, půjde tu její údaje ručně přepsat. Oprava se označí v protokolu i na náhledu.';
      host.append(p);
      return;
    }
    for (const [key, value] of Object.entries(state.preview.payload)) {
      if (typeof value !== 'string' || !LABELS[key]) continue;
      const label = document.createElement('label');
      label.className = 'opts-label';
      label.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;font-family:var(--f-mono);font-size:10px;letter-spacing:.06em;color:var(--muted)';
      const span = document.createElement('span'); span.textContent = LABELS[key];
      const input = document.createElement('input');
      input.value = value;
      input.style.cssText = 'width:132px;background:var(--raised);border:1px solid var(--line);border-radius:2px;padding:4px 6px;font-size:12px;color:var(--ink)';
      input.oninput = () => {
        state.manual[key] = input.value;
        state.preview.payload = { ...state.preview.payload, [key]: input.value };
        state.preview.edited = true;
        drawPreview(); drawFrames();
      };
      label.append(span, input);
      host.append(label);
    }
  }

  function drawPreview() {
    const p = state.preview;
    const meta = $('pv-meta');
    meta.replaceChildren();
    $('pv-options').hidden = true;

    if (!p) {
      $('pv-tag').textContent = 'PRÁZDNÉ';
      $('pv-title').textContent = '—';
      $('pv-sub').textContent = 'Vyberte objekt vlevo a grafiku vpravo.';
      $('pv-msg').textContent = '';
      $('pv-msg').className = 'msg';
      return;
    }

    const g = gfx(p.gid);
    const targets = [p.targets.tv && 'TV', p.targets.led && 'LED'].filter(Boolean).join(' + ') || 'BEZ VÝSTUPU';
    $('pv-tag').textContent = targets;
    $('pv-title').textContent = g.name;
    $('pv-sub').textContent = objectLabel(p.gid);

    const chips = [['gid', p.gid], ['on', targets], ['on', p.autoOut && p.duration ? 'AUTO OUT ' + p.duration + ' S' : 'RUČNÍ OUT']];
    if (p.edited) chips.push(['edited', 'RUČNĚ UPRAVENO']);
    for (const [kind, text] of chips) {
      const chip = document.createElement('span');
      chip.className = 'chip ' + kind; chip.textContent = text;
      meta.append(chip);
    }

    const clash = collisions(p.gid);
    const msg = $('pv-msg');
    if (!p.ok) { msg.className = 'msg bad'; msg.textContent = 'NEPŘIPRAVENO — ' + p.message; }
    else if (clash.length) { msg.className = 'msg warn'; msg.textContent = 'KOLIZE ZÓNY s ' + clash.map(l => l.gid).join(', ') + '. TAKE tuhle vrstvu nahradí.'; }
    else { msg.className = 'msg ok'; msg.textContent = 'PŘIPRAVENO K VYSÍLÁNÍ. ' + p.message; }

    if (g.options) {
      const box = $('pv-options');
      box.hidden = false;
      box.replaceChildren();
      for (const option of g.options) {
        const label = document.createElement('label');
        const span = document.createElement('span'); span.textContent = option.label.toUpperCase();
        let input;
        if (option.type === 'select') {
          input = document.createElement('select');
          for (const [value, text] of option.values) input.add(new Option(text, value));
          input.value = state.options[g.id][option.id];
          input.onchange = () => { state.options[g.id][option.id] = input.value; refreshPreviewKeepManual(); };
        } else {
          input = document.createElement('input'); input.type = 'checkbox';
          input.checked = state.options[g.id][option.id];
          input.onchange = () => { state.options[g.id][option.id] = input.checked; refreshPreviewKeepManual(); };
        }
        label.append(span, input);
        box.append(label);
      }
    }
  }

  function refreshPreviewKeepManual() {
    state.preview.payload = { ...buildPayload(state.preview.gid), ...state.manual };
    draw();
  }

  function drawProgram() {
    const host = $('pg-layers');
    host.replaceChildren();
    for (const layer of [...state.program].reverse()) {
      const row = document.createElement('div');
      row.className = 'layer';
      row.innerHTML = '<span class="gid"></span><span><b></b><small></small></span><span class="cd mono"></span><button class="out" type="button">OUT</button>';
      row.querySelector('.gid').textContent = layer.gid;
      row.querySelector('b').textContent = gfx(layer.gid).name + (layer.edited ? ' · ručně' : '');
      row.querySelector('small').textContent = [layer.targets.tv && 'TV', layer.targets.led && 'LED'].filter(Boolean).join(' + ') + ' · ' + layer.label;
      row.querySelector('.out').onclick = () => drop(layer, 'ruční OUT');
      layer.countdownEl = row.querySelector('.cd');
      host.append(row);
    }
    tick();
    $('pg-tag').textContent = state.program.length + (state.program.length === 1 ? ' VRSTVA' : state.program.length < 5 && state.program.length ? ' VRSTVY' : ' VRSTEV');
    $('pg-mon').classList.toggle('live', state.program.length > 0);

    const live = state.program.length > 0;
    $('onair').classList.toggle('live', live);
    $('onair-text').textContent = live ? 'VE VYSÍLÁNÍ' : 'MIMO VYSÍLÁNÍ';
    $('dot-tv').classList.toggle('live', state.program.some(l => l.targets.tv));
    $('dot-led').classList.toggle('live', state.program.some(l => l.targets.led));
    $('dot-tv').lastChild.textContent = state.program.some(l => l.targets.tv) ? 'VYSÍLÁ' : 'MIMO';
    $('dot-led').lastChild.textContent = state.program.some(l => l.targets.led) ? 'VYSÍLÁ' : 'MIMO';
  }

  function drawTransport() {
    const blocked = takeBlock();
    const p = state.preview;
    const takeButton = $('btn-take');
    const replacing = p && collisions(p.gid).length > 0;
    takeButton.disabled = Boolean(blocked);
    takeButton.classList.toggle('replace', Boolean(!blocked && replacing));
    takeButton.firstChild.textContent = !blocked && replacing ? 'TAKE / NAHRADIT' : 'TAKE';
    $('take-note').textContent = blocked || (replacing ? 'sundá ' + collisions(p.gid).map(l => l.gid).join(', ') : 'mezerník');
    $('btn-out').disabled = state.program.length === 0;
  }

  function tick() {
    for (const layer of state.program) {
      if (!layer.countdownEl) continue;
      layer.countdownEl.textContent = layer.deadline ? Math.max(0, Math.ceil((layer.deadline - Date.now()) / 1000)) + 's' : '∞';
    }
  }
  setInterval(tick, 250);
  setInterval(() => { $('clock').textContent = new Date().toLocaleTimeString('cs-CZ'); }, 1000);
  $('clock').textContent = new Date().toLocaleTimeString('cs-CZ');

  /* ================= ovládací prvky ================= */

  for (const run of D.runs) $('run').add(new Option(run.label, run.id));
  for (const category of D.categories) $('category').add(new Option(category, category));
  $('run').value = state.run;
  $('category').value = state.category;
  $('run').onchange = () => { state.run = $('run').value; refreshPreview(); log('prep', '—', 'Kontext: ' + runLabel()); };
  $('category').onchange = () => { state.category = $('category').value; refreshPreview(); log('prep', '—', 'Kontext: kategorie ' + state.category); };

  $('search').oninput = drawObjects;
  for (const [button, tab] of [[$('tab-riders'), 'riders'], [$('tab-guests'), 'guests']]) {
    button.onclick = () => {
      state.tab = tab;
      $('tab-riders').setAttribute('aria-selected', String(tab === 'riders'));
      $('tab-guests').setAttribute('aria-selected', String(tab === 'guests'));
      drawObjects();
    };
  }

  $('btn-take').onclick = take;
  $('btn-out').onclick = () => { const top = state.program.at(-1); if (top) drop(top, 'ruční OUT'); };
  $('btn-panic').onclick = panic;
  $('target-tv').onchange = () => { if (state.preview) { state.preview.targets.tv = $('target-tv').checked; draw(); } };
  $('target-led').onchange = () => { if (state.preview) { state.preview.targets.led = $('target-led').checked; draw(); } };
  $('auto-out').onchange = () => { if (state.preview) { state.preview.autoOut = $('auto-out').checked; draw(); } };
  $('duration').min = String(MIN_DURATION);
  $('duration').onchange = () => {
    const wanted = Number($('duration').value) || MIN_DURATION;
    const value = Math.max(MIN_DURATION, Math.min(60, Math.round(wanted)));
    if (value !== wanted) log('prep', state.preview ? state.preview.gid : '—', `Doba zobrazení upravena na ${value} s — nejkratší je ${MIN_DURATION} s (nástup + 3,5 s klidu).`);
    $('duration').value = value;
    if (state.preview) { state.preview.duration = value; draw(); }
  };

  $('bg-toggle').onclick = () => {
    state.background = state.background === 'race' ? 'black' : 'race';
    const race = state.background === 'race';
    $('bg-toggle').textContent = 'Podklad: ' + (race ? 'záběr' : 'černá');
    $('bg-toggle').setAttribute('aria-pressed', String(race));
    for (const id of ['pv-screen', 'pg-screen']) {
      $(id).classList.toggle('bg-race', race);
      $(id).classList.toggle('bg-black', !race);
    }
  };
  $('safe-toggle').onclick = () => {
    state.safe = !state.safe;
    $('safe-toggle').setAttribute('aria-pressed', String(state.safe));
    for (const id of ['pv-screen', 'pg-screen']) $(id).classList.toggle('safe-on', state.safe);
  };
  $('log-clear').onclick = () => { entries.length = 0; drawLog(); };
  $('help-open').onclick = () => $('help').showModal();
  $('help-close').onclick = () => $('help').close();

  /* ================= klávesnice ================= */

  document.addEventListener('keydown', event => {
    if (event.target.matches('input, select, textarea') || event.metaKey || event.ctrlKey || event.altKey) return;
    const graphic = GRAPHICS.find(g => g.key === event.key);
    if (graphic) { event.preventDefault(); arm(graphic.id); return; }
    const key = event.key.toLowerCase();
    if (event.key === ' ') { event.preventDefault(); take(); }
    else if (key === 'o') { event.preventDefault(); const top = state.program.at(-1); if (top) drop(top, 'ruční OUT'); }
    else if (key === 'x') { event.preventDefault(); panic(); }
    else if (key === 't') { $('target-tv').checked = !$('target-tv').checked; $('target-tv').onchange(); }
    else if (key === 'l') { $('target-led').checked = !$('target-led').checked; $('target-led').onchange(); }
    else if (event.key === '?') { $('help').showModal(); }
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const rows = [...$('object-list').children];
      const current = rows.findIndex(r => r.getAttribute('aria-selected') === 'true');
      const next = rows[Math.min(rows.length - 1, Math.max(0, current + (event.key === 'ArrowDown' ? 1 : -1)))];
      next?.click();
    }
  });

  /* ================= start ================= */

  log('prep', '—', 'Pult spuštěn. Ukázková data, žádné napojení na časomíru ani na režii.');
  draw();
})();
