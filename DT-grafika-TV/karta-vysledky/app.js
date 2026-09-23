(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let data, visible = true;
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = (value, label, max) => {
    if (typeof value !== 'string' || !value.trim() || value.length > max) throw new Error(`${label}: vyplňte nejvýše ${max} znaků.`);
    return value.trim();
  };
  function validate(input) {
    if (!input || typeof input !== 'object') throw new Error('Chybí objekt s výsledky.');
    const result = {category:text(input.category,'Kategorie',40),runType:text(input.runType,'Typ jízdy',48),results:[],logos:[]};
    if (!Array.isArray(input.results) || input.results.length > 10) throw new Error('Jedna tabulka smí obsahovat nejvýše 10 výsledků.');
    const numbers = new Set();
    result.results = input.results.map((r, index) => {
      const number = text(String(r.number ?? ''),'Číslo',6);
      if (numbers.has(number)) throw new Error('Startovní čísla musí být jedinečná.');
      numbers.add(number);
      if (!Number.isSafeInteger(r.timeMs) || r.timeMs < 0 || r.timeMs > 86400000) throw new Error('Čas musí být celé nezáporné číslo v milisekundách (nejvýše 24 hodin).');
      if (index && r.timeMs < input.results[index-1].timeMs) throw new Error('Výsledky musí být seřazené od nejrychlejšího.');
      if (!/^[A-Z]{3}$/.test(r.country)) throw new Error('Stát musí mít tři velká písmena, například CZE.');
      return {number,firstName:text(r.firstName,'Jméno',60),lastName:text(r.lastName,'Příjmení',60),country:r.country,timeMs:r.timeMs};
    });
    if (input.logos !== undefined && (!Array.isArray(input.logos) || input.logos.length > 5)) throw new Error('Ukázkové rozložení podporuje nejvýše 5 log.');
    result.logos = (input.logos || []).map(logo => {
      const src = text(logo.src,'Cesta k logu',500);
      // Portable repository-local assets only. Remote server integration is separate.
      if (!/^assets\/[a-zA-Z0-9_./-]+\.(png|jpg|jpeg|webp|svg)$/i.test(src) || src.split('/').includes('..')) throw new Error('Logo musí být soubor v assets/ této karty.');
      return {src,alt:text(logo.alt,'Název loga',80)};
    });
    return result;
  }
  function formatTime(ms) {
    return `${Math.floor(ms/60000)}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;
  }
  function fit(element, max, min) {
    element.style.fontSize = `${max}px`;
    while (element.scrollWidth > element.clientWidth && parseFloat(element.style.fontSize) > min) element.style.fontSize = `${parseFloat(element.style.fontSize)-1}px`;
    return element.scrollWidth <= element.clientWidth;
  }
  function draw() {
    $('rows').replaceChildren(); $('logos').replaceChildren();
    $('category-title').textContent=data.category; $('run-title').textContent=data.runType;
    for (const [index,r] of data.results.entries()) {
      const tr=document.createElement('tr'); if (!index) tr.className='leader';
      for (const value of [r.number,'',r.country,index ? `+${((r.timeMs-data.results[0].timeMs)/1000).toFixed(3)} s` : formatTime(r.timeMs)]) {
        const td=document.createElement('td'); td.textContent=value; tr.append(td);
      }
      const first=document.createElement('span'), last=document.createElement('strong');
      first.textContent=r.firstName+' ';last.textContent=r.lastName;tr.children[1].append(first,last);tr.children[2].className='country';$('rows').append(tr);
    }
    for (let i=0;i<5;i++) {
      const slot=document.createElement('div');slot.className='logo-slot';
      if (data.logos[i]) {
        const img=document.createElement('img');img.src=data.logos[i].src;img.alt=data.logos[i].alt;
        img.addEventListener('error',()=>{ $('results-card').hidden=true; report('Logo se nepodařilo načíst: '+data.logos[i].src,true); });slot.append(img);
      } else if ($('placeholders').checked) {slot.classList.add('placeholder');slot.textContent='LOGO';}
      $('logos').append(slot);
    }
    $('results-card').hidden=!visible || !data.results.length;
    if (!visible || !data.results.length) return;
    const names=[...$('rows').querySelectorAll('td:nth-child(2)')];
    const fits=names.map(el=>fit(el,31,24));
    const title=$('category-title'), run=$('run-title');title.style.fontSize='58px';run.style.fontSize='32px';
    while (title.offsetWidth+run.offsetWidth+28 > title.parentElement.clientWidth && parseFloat(title.style.fontSize)>34) {title.style.fontSize=(parseFloat(title.style.fontSize)-1)+'px';run.style.fontSize=Math.max(24,parseFloat(run.style.fontSize)-.5)+'px';}
    if (fits.includes(false) || title.offsetWidth+run.offsetWidth+28>title.parentElement.clientWidth) { $('results-card').hidden=true;report('Text přesahuje čitelný prostor. Zkraťte jej; karta je skrytá.',true); }
  }
  function report(message,error=false) { $('status').textContent=message;$('status').classList.toggle('error',error); }
  function setData(input) {
    const next=validate(input); data=next;
    $('category').value=data.category;$('run-type').value=data.runType;
    report(data.results.length ? 'Místní náhled · '+data.results.length+' výsledků. Živý server zatím není připojen.' : 'Bez výsledků je karta skrytá.');draw();
  }
  window.SVDTResults={setData,getData:()=>clone(data),formatTime};
  if (params.get('capture')==='1') document.body.classList.add('capture');
  $('background').value=['light','dark'].includes(params.get('background'))?params.get('background'):'transparent';
  function background() {$('stage').className='stage '+$('background').value;}
  $('background').addEventListener('change',background);background();
  $('placeholders').checked=params.get('placeholders')==='1';$('placeholders').addEventListener('change',draw);
  for(const id of ['category','run-type']) $(id).addEventListener('input',()=>{try{setData({...data,category:$('category').value,runType:$('run-type').value});}catch(e){report(e.message,true);$('results-card').hidden=true;}});
  $('toggle').addEventListener('click',()=>{visible=!visible;$('toggle').textContent=visible?'Skrýt kartu':'Zobrazit kartu';draw();});
  $('download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='vysledky.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  $('import').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>1000000)throw new Error('JSON smí mít nejvýše 1 MB.');setData(JSON.parse(await file.text()));}catch(e){report('Import odmítnut: '+e.message,true);}finally{event.target.value='';}});
  function resize(){document.querySelector('.stage').style.transform=`scale(${document.querySelector('.viewport').clientWidth/1920})`;}
  new ResizeObserver(resize).observe(document.querySelector('.viewport'));
  setData({...window.SVDT_RESULTS,category:params.get('category')||window.SVDT_RESULTS.category,runType:params.get('runType')||window.SVDT_RESULTS.runType});
  document.fonts.ready.then(()=>{draw();resize();window.resultsReady=true;});
})();
