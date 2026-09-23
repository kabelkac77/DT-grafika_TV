(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const keys = Object.keys(window.SVDT_SPLIT);
  const params = new URLSearchParams(location.search);
  const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clock = s => /^\d{1,2}:[0-5]\d\.\d{3}$/.test(s);
  const delta = s => /^[+-]\d{1,3}\.\d{3}$/.test(s);
  const elapsed = s => Number(s.split(':')[0])*60+Number(s.split(':')[1]);
  const color = s => !s || Number(s)===0 ? 'neutral' : Number(s)<0 ? 'gaining' : 'losing';
  const deltaText = s => !s ? '—' : Number(s)===0 ? '0.000' : s.replace('-', '−');
  const stopwatch = '<svg class="stopwatch" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="14" r="8"/><path d="M9 2h6M12 2v4M18 7l2-2M12 10v4l3 2"/></svg>';
  const layer = document.createElement('div'); layer.id='split-layer'; $('stage').append(layer);
  keys.forEach(k => { $('g08-'+k).value=params.get('g08-'+k)??window.SVDT_SPLIT[k]; $('g08-'+k).addEventListener('input', render); });
  for(const k of ['first','last','number','team','country','category']) if(params.has('rider-'+k)) $(k).value=params.get('rider-'+k);
  window.svdt.render();
  function render() {
    const d=Object.fromEntries(keys.map(k=>[k,$('g08-'+k).value.trim()]));
    const times=[d.time1,d.time2,d.finishTime];
    const diffs=[d.delta1,d.delta2,d.finishDelta];
    const error=!d.leader || d.leader.length>36 || (d.leaderCountry && !/^[A-Z]{3}$/.test(d.leaderCountry)) || times.some(s=>s&&!clock(s)) || diffs.some(s=>s&&!delta(s)) || times.some((s,i)=>s&&i>0&&(!times[i-1]||elapsed(s)<elapsed(times[i-1]))) || diffs.some((s,i)=>s&&!times[i]) || (d.rank && (!/^[1-9]\d{0,2}$/.test(d.rank)||!d.finishTime));
    $('split-status').className='status'+(error?' error':'');
    $('split-status').textContent=error?'Zkontrolujte lídra (max. 36 znaků), zemi (CZE), časy (1:23.456) v pořadí, rozdíly (+0.447 / -0.144) a pořadí (1–999).':'Ukázkové hodnoty. Prázdné časy a rozdíly se zobrazí jako pomlčka. Porovnání je od startu vůči lídrovi.';
    layer.hidden=Boolean(error)||!$('overlay').firstElementChild||$('overlay').firstElementChild.classList.contains('off');
    if(error) return false;
    const leaderFlag=d.leaderCountry==='CZE'?'<i class="flag" aria-label="Česká vlajka"></i>':'';
    layer.innerHTML=`<div class="leader"><span class="vs">VS</span><small>LÍDR</small>${leaderFlag}${leaderFlag?'':'<span>'+escape(d.leaderCountry)+'</span>'}<span class="leader-name">${escape(d.leader.slice(0,d.leader.lastIndexOf(' ')+1))}<strong>${escape(d.leader.slice(d.leader.lastIndexOf(' ')+1).toUpperCase())}</strong></span></div><div class="splits">${[1,2].map(i=>`<section class="split ${color(d['delta'+i])}" aria-label="Mezičas ${i}"><div class="rail"></div><div class="label">${stopwatch}<span>${i}</span></div><div class="duration">${escape(d['time'+i]||'—')}</div><div class="delta ${color(d['delta'+i])==='losing'?'loss':color(d['delta'+i])==='gaining'?'gain':''}">${deltaText(d['delta'+i])}</div></section>`).join('')}</div><article class="timer-card ${color(d.finishDelta)}"><div class="finish-row"><div class="totaldelta"><small>CÍL</small>${deltaText(d.finishDelta)}</div><div class="rank" aria-label="Pořadí">${escape(d.rank||'—')}</div></div><div class="timer-time">${escape(d.finishTime||'—')}</div></article>`;
    return true;
  }
  // Rider editor owns its existing markup and assets; update visibility with it.
  new MutationObserver(render).observe($('overlay'),{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  $('g08-link').onclick=()=>{
    if(!render()) return;
    const url=new URL(location.href);
    keys.forEach(k=>url.searchParams.set('g08-'+k,$('g08-'+k).value.trim()));
    for(const k of ['first','last','number','team','country','category'])url.searchParams.set('rider-'+k,$(k).value);
    url.searchParams.set('background',$('background').value);url.searchParams.set('portrait',$('portrait').checked?'1':'0');
    history.replaceState(null,'',url);$('split-status').textContent='Nastavení je v adrese. Vlastní nahraný portrét se do odkazu neukládá.';
  };
  window.svdtSplit={render,setData(data){keys.forEach(k=>{if(Object.hasOwn(data,k))$('g08-'+k).value=String(data[k]??'');});return render();}};
  render();
})();
