(()=>{'use strict';
const $=id=>document.getElementById(id), params=new URLSearchParams(location.search);
const keys=['first','last','number','team','country','category'];
let visible=true,portraitURL='assets/portrait.png',portraitValid=true,objectURL=null;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function sync(){const d=window.SVDT_DATA[$('scenario').value];keys.forEach(k=>$(k).value=d[k]);render()}
function render(){
const d=Object.fromEntries(keys.map(k=>[k,$(k).value.trim()]));const variant=$('variant').value;
const hasPortrait=$('portrait').checked&&portraitValid;const long=d.last.length>15||d.first.length>15;
$('stage').className='stage '+$('background').value+($('safe').checked?' safe':'');
$('caption').textContent=variant==='A'?'A — Horizontální lišta':'B — Kompaktní blok';
const valid=Boolean((d.first||d.last)&&d.number);
$('status').className='status'+(!valid?' error':'');
$('status').textContent=!valid?'NEPŘIPRAVENO K VYSÍLÁNÍ — doplňte jméno a startovní číslo. Karta se nezobrazuje.':!portraitValid?'Portrét nelze načíst. Použita varianta bez portrétu.':'Ukázková data. Závodní fotografie je podklad náhledu, fiktivní údaje neoznačují jezdce na fotografii. Portrét je ilustrační.';
if(!valid){$('overlay').innerHTML='';return}
const country=d.country?'<span class="country">'+(d.country.toUpperCase()==='CZE'&&$('flag').checked?'<i class="flag" aria-label="Česká vlajka"></i>':'')+escape(d.country.toUpperCase())+'</span>':'';
const team=d.team?'<span class="team">'+escape(d.team)+'</span>':'';
const category=d.category?'<span class="category">'+escape(d.category)+'</span>':'';
const meta=(variant==='A'?[country,team,category]:[country,category,team]).filter(Boolean);
$('overlay').innerHTML=`<article class="rider-card ${variant} ${!hasPortrait?'no-portrait':''} ${long?'long':''} ${!visible?'off':''}" aria-label="Karta jezdce"><div class="architecture" aria-hidden="true"><i class="edge"></i><i class="face"></i></div><img class="event-wordmark" src="../design-system/brand/event-wordmark.svg" alt="Svatohorský Down Town"><div class="shell"><div class="bib"><small>ČÍSLO</small><strong>${escape(d.number)}</strong></div><div class="identity"><div class="name"><span class="first">${escape(d.first)}</span> <span class="last">${escape(d.last)}</span></div>${meta.length?'<div class="meta">'+meta.join('')+'</div>':''}</div></div>${hasPortrait?'<div class="portrait-area"><img src="'+escape(portraitURL)+'" alt="Portrét jezdce"></div>':''}</article>`;
const portrait=document.querySelector('.portrait-area img');if(portrait)portrait.onerror=()=>{portraitValid=false;render()};
requestAnimationFrame(()=>{const card=document.querySelector('.rider-card');if(!card)return;const top=Math.min(...[card,card.querySelector('.architecture'),card.querySelector('.portrait-area')].filter(Boolean).map(e=>e.getBoundingClientRect().top));const tooHigh=top<$('stage').getBoundingClientRect().top+54*($('stage').getBoundingClientRect().width/1920);const overflow=[...card.querySelectorAll('.last,.first,.team,.bib')].some(e=>e.scrollWidth>e.clientWidth+1);if(tooHigh||overflow){$('status').className='status error';$('status').textContent='NEPŘIPRAVENO K VYSÍLÁNÍ — text překračuje kapacitu návrhu. Upravte rozložení nebo redakčně schvalte kratší text.'}})
}
keys.forEach(k=>$(k).addEventListener('input',render));['variant','background','portrait','safe','flag'].forEach(k=>$(k).addEventListener('change',render));$('scenario').addEventListener('change',sync);
$('toggle').onclick=()=>{visible=!visible;document.querySelector('.rider-card')?.classList.toggle('off',!visible);$('toggle').textContent=visible?'Skrýt kartu':'Zobrazit kartu'};
$('upload').onchange=()=>{const file=$('upload').files[0];if(!file)return;if(objectURL)URL.revokeObjectURL(objectURL);objectURL=URL.createObjectURL(file);portraitURL=objectURL;portraitValid=true;$('portrait').checked=true;render()};
if(params.get('capture')==='1')document.body.classList.add('capture');
for(const [key,id] of [['variant','variant'],['scenario','scenario'],['background','background']])if(params.has(key)&&[...$(id).options].some(o=>o.value===params.get(key)))$(id).value=params.get(key);
if(params.get('portrait')==='0')$('portrait').checked=false;
const resize=()=>{$('stage').style.transform=`scale(${$('viewport').clientWidth/1920})`};new ResizeObserver(resize).observe($('viewport'));
sync();resize();window.svdt={render,sync,setPortraitURL(url){portraitURL=url;portraitValid=true;render()}};
})();




