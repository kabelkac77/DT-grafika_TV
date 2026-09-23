const {chromium}=require('playwright');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const {pathToFileURL}=require('node:url');
(async()=>{
 const out=path.join(__dirname,'nahledy');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch(); const p=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1}); const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const url=pathToFileURL(path.join(__dirname,'index.html')).href;
 try {
 for(const bg of ['transparent','race','light','dark']){
 await p.goto(url+'?capture=1&background='+bg);await p.evaluate(()=>document.fonts.ready);
 if(process.env.SPLIT_JSON) {const data=JSON.parse(process.env.SPLIT_JSON);assert(await p.evaluate(d=>window.svdtSplit.setData(d),data),'Invalid SPLIT_JSON');}
 await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
 assert(await p.locator('#split-layer').isVisible());
 assert.equal(await p.locator('.split').count(),2);
 assert(await p.evaluate(()=>document.fonts.check('900 30px Exo')));
 await p.screenshot({path:path.join(out,'split-time-'+bg+'.png'),omitBackground:bg==='transparent'});
 }
 await p.goto(url);
 assert.equal(await p.locator('.split.losing').count(),1);assert.equal(await p.locator('.split.gaining').count(),1);
 await p.locator('#g08-delta1').fill('-0.100');assert.equal(await p.locator('.split.gaining').count(),2);
 await p.locator('#g08-finishDelta').fill('+0.500');assert(await p.locator('.timer-card.losing').isVisible());
 await p.locator('#g08-finishDelta').fill('0');assert(await p.locator('#split-layer').isHidden());
 await p.locator('#g08-finishDelta').fill('+0.000');assert(await p.locator('.timer-card.neutral').isVisible());
 await p.locator('#g08-leader').fill('<b>Test</b>');assert.equal(await p.locator('.leader-name').textContent(),'<B>TEST</B>');
 await p.locator('details.editor summary').click();await p.locator('#first').fill('Petr');await p.locator('#g08-link').click();await p.reload();assert.equal(await p.locator('#first').inputValue(),'Petr');assert.equal(await p.locator('#g08-delta1').inputValue(),'-0.100');
 await p.locator('#toggle').click();assert(await p.locator('#split-layer').isHidden());await p.locator('#toggle').click();assert(await p.locator('#split-layer').isVisible());
 assert(await p.evaluate(()=>window.svdtSplit.setData({time2:'',delta2:'',finishTime:'',finishDelta:'',rank:''})));assert.equal(await p.locator('.timer-time').textContent(),'—');
 await p.setViewportSize({width:768,height:1024});assert(await p.locator('#split-layer').isVisible());
 assert.deepEqual(errors,[]); fs.writeFileSync(path.join(__dirname,'kontrola.json'),JSON.stringify({passed:true,errors},null,2));console.log('G08: export, barvy, data, URL, skrytí a iPad OK.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
