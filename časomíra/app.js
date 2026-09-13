(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let visible = true;
  const valid = value => typeof value === 'string' && /^\d{1,2}:[0-5]\d\.\d{3}$/.test(value);
  $('time').value = params.get('time') ?? window.SVDT_TIMER.time;
  if ([...$('background').options].some(o => o.value === params.get('background'))) $('background').value = params.get('background');
  if (params.get('capture') === '1') document.body.classList.add('capture');
  function render() {
    const time = $('time').value.trim();
    const ok = valid(time);
    $('timer-time').textContent = ok ? time : '';
    $('timer').hidden = !visible || !ok;
    $('stage').className = 'stage ' + $('background').value;
    $('status').className = 'status' + (ok ? '' : ' error');
    $('status').textContent = ok ? 'Ukázkový čas. Živá časomíra není připojena.' : 'Zadejte čas ve formátu 1:23.456 (nejvýše 99:59.999).';
  }
  $('time').addEventListener('input', render);
  $('background').addEventListener('change', render);
  $('toggle').onclick = () => { visible = !visible; $('toggle').textContent = visible ? 'Skrýt kartu' : 'Zobrazit kartu'; render(); };
  $('link').onclick = () => {
    if (!valid($('time').value.trim())) return;
    const url = new URL(location.href);
    url.searchParams.set('time', $('time').value.trim());
    url.searchParams.set('background', $('background').value);
    history.replaceState(null, '', url);
    $('status').textContent = 'Údaje jsou v adrese stránky. Odkaz zkopírujte z adresního řádku.';
  };
  const resize = () => { $('stage').style.transform = `scale(${$('viewport').clientWidth / 1920})`; };
  new ResizeObserver(resize).observe($('viewport'));
  // Local rendering boundary only: not a provider protocol or running stopwatch.
  window.svdtTimer = { setTime(value) { $('time').value = typeof value === 'string' ? value : ''; render(); return valid($('time').value.trim()); } };
  render(); resize();
})();
