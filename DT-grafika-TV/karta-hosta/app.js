(()=>{'use strict';
const $=id=>document.getElementById(id),p=new URLSearchParams(location.search);let visible=true;
$('name').value=p.get('name')??window.SVDT_GUEST.name;$('role').value=p.get('role')??window.SVDT_GUEST.role;
if([...$('background').options].some(o=>o.value===p.get('background')))$('background').value=p.get('background');
if(p.get('capture')==='1')document.body.classList.add('capture');
function render(){const name=$('name').value.trim(),role=$('role').value.trim();$('guest-name').replaceChildren();const cut=name.lastIndexOf(' ');if(cut>0)$('guest-name').append(document.createTextNode(name.slice(0,cut+1)));const surname=document.createElement('strong');surname.textContent=name.slice(cut+1);$('guest-name').append(surname);$('guest-role').textContent=role;$('guest-role').hidden=!role;$('guest').hidden=!name||!visible;$('stage').className='stage '+$('background').value;
$('status').className='status'+(!name?' error':'');$('status').textContent=name?'Náhled připraven. Údaje nejsou automaticky uloženy do GitHubu.':'Doplňte jméno. Karta se nezobrazuje.';
requestAnimationFrame(()=>{if($('guest').hidden)return;const scale=$('stage').getBoundingClientRect().width/1920;const top=$('guest').getBoundingClientRect().top-68*scale;const overflow=top<$('stage').getBoundingClientRect().top+54*scale||['guest-name','guest-role'].some(id=>$(id).scrollWidth>$(id).clientWidth+1);if(overflow){$('status').className='status error';$('status').textContent='Text přesahuje bezpečný prostor. Upravte text nebo rozložení před vysíláním.';$('guest').hidden=true;}});}
['name','role'].forEach(id=>$(id).addEventListener('input',render));$('background').addEventListener('change',render);$('toggle').onclick=()=>{visible=!visible;$('toggle').textContent=visible?'Skrýt kartu':'Zobrazit kartu';render()};
$('link').onclick=()=>{const url=new URL(location.href);url.searchParams.set('name',$('name').value);url.searchParams.set('role',$('role').value);url.searchParams.set('background',$('background').value);history.replaceState(null,'',url);$('status').textContent='Údaje jsou v adrese stránky. Odkaz můžete zkopírovat z adresního řádku.';};
const resize=()=>{$('stage').style.transform=`scale(${$('viewport').clientWidth/1920})`};new ResizeObserver(resize).observe($('viewport'));render();resize();window.svdtGuest={render};
})();
