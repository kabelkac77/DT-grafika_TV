const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/kaj2/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');const path=require('path');const {pathToFileURL}=require('url');
(async()=>{
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
const base=pathToFileURL(path.join(__dirname,'index.html')).href;
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const checks=[];
for(const v of ['A','B'])for(const [name,scenario,portrait,bg] of [
['plna','normal',1,'race'],['bez-portretu','normal',0,'race'],['dlouhe-jmeno','long',1,'race'],['dlouhe-bez-portretu','long',0,'race'],['neuplne-udaje','incomplete',0,'race'],['svetle','normal',1,'light'],['tmave','normal',1,'dark'],['overlay','normal',1,'transparent'],['overlay-bez-portretu','normal',0,'transparent']]){
await page.goto(base+`?capture=1&variant=${v}&scenario=${scenario}&portrait=${portrait}&background=${bg}`);
await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r})));});
await page.waitForTimeout(400);
checks.push({variant:v,scenario,portrait,bg,...await page.evaluate(()=>({font:document.fonts.check('900 72px Exo'),status:document.getElementById('status').textContent,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),overflow:[...document.querySelectorAll('.identity,.last,.team,.bib')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.className)}))});
await page.screenshot({path:path.join(__dirname,'nahledy',`${v}-${name}.png`),omitBackground:bg==='transparent'});
if(name==='plna'){
await page.addStyleTag({content:'body.capture .viewport{width:960px;height:540px}body.capture .stage{transform:scale(.5)!important}'});
await page.setViewportSize({width:960,height:540});
await page.screenshot({path:path.join(__dirname,'nahledy',`${v}-polovicni.png`)});
await page.setViewportSize({width:1920,height:1080});
}
}
await page.goto(base);await page.evaluate(()=>document.fonts.ready);
await page.locator('#variant').selectOption('B');await page.locator('#scenario').selectOption('long');
await page.locator('#toggle').click();await page.waitForTimeout(400);
checks.push({hide:await page.locator('.rider-card').evaluate(e=>getComputedStyle(e).opacity==='0')});
await page.locator('#toggle').click();await page.waitForTimeout(400);
checks.push({show:await page.locator('.rider-card').evaluate(e=>getComputedStyle(e).opacity==='1')});
await page.locator('#scenario').selectOption('invalid');checks.push({missingRequiredHidden:await page.locator('.rider-card').count()===0});
await page.locator('#scenario').selectOption('incomplete');checks.push({missingOptionalHidden:await page.locator('.team,.country').count()===0});
await page.locator('#scenario').selectOption('normal');await page.evaluate(()=>window.svdt.setPortraitURL('missing-image.png'));await page.waitForTimeout(200);checks.push({badImageFallback:await page.locator('.no-portrait').count()===1});
await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);await page.screenshot({path:path.join(__dirname,'nahledy','lokalni-nahled.png'),fullPage:true});
await page.goto(pathToFileURL(path.join(__dirname,'srovnani.html')).href);await page.evaluate(()=>document.fonts.ready);await page.setViewportSize({width:2048,height:920});await page.screenshot({path:path.join(__dirname,'nahledy','SVDT-srovnani-A-B.png'),fullPage:true});
fs.writeFileSync(path.join(__dirname,'kontrola.json'),JSON.stringify({errors,checks},null,2));
console.log(JSON.stringify({errors,total:checks.length,failures:checks.filter(c=>c.overflow?.length||c.images?.length||c.font===false||Object.values(c).includes(false))}));
await browser.close();
})();

