const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
  const out=path.join(__dirname,'nahledy');fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
  const check=(name,pass)=>checks.push({name,pass});
  const open=async extra=>{await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href+'?'+new URLSearchParams({capture:'1',...extra}));await page.waitForFunction(()=>window.resultsReady);};
  try {
    for(const [file,background,placeholders] of [['vysledky-overlay','transparent','0'],['vysledky-svetle','light','1'],['vysledky-tmave','dark','1']]) {
      await open({background,placeholders});
      check(file,await page.evaluate(()=>document.querySelectorAll('#rows tr').length===10&&!document.getElementById('results-card').hidden&&!document.getElementById('status').classList.contains('error')&&document.fonts.check('900 31px Exo')));
      await page.screenshot({path:path.join(out,file+'.png'),omitBackground:background==='transparent'});
      if(file==='vysledky-svetle')await page.screenshot({path:path.join(out,'vysledky-detail.png'),clip:{x:92,y:72,width:1736,height:902}});
    }
    check('leader-and-gap',await page.evaluate(()=>document.querySelector('#rows tr:first-child td:last-child').textContent==='1:44.114'&&document.querySelector('#rows tr:nth-child(2) td:last-child').textContent==='+0.250 s'));
    check('complete-relief-safe',await page.evaluate(()=>{const b=document.querySelector('.architecture').getBoundingClientRect();return b.x>=96&&b.y>=54&&b.right<=1824&&b.bottom<=1026;}));
    check('broadcast-no-controls',await page.locator('.controls').isHidden());
    const original=await page.evaluate(()=>window.SVDTResults.getData());
    await page.evaluate(()=>window.SVDTResults.setData({...window.SVDTResults.getData(),category:'JUNIOŘI',runType:'FINÁLE'}));
    check('editable-header',await page.locator('#category-title').textContent()==='JUNIOŘI'&&await page.locator('#run-title').textContent()==='FINÁLE');
    await page.evaluate(()=>{const d=window.SVDTResults.getData();d.results[1].timeMs=d.results[0].timeMs;window.SVDTResults.setData(d);});
    check('tie-milliseconds',await page.locator('#rows tr:nth-child(2) td:last-child').textContent()==='+0.000 s');
    check('reject-invalid-data-atomically',await page.evaluate(()=>{const previous=JSON.stringify(window.SVDTResults.getData());const d=window.SVDTResults.getData();d.results[1].timeMs=-1;try{window.SVDTResults.setData(d);return false;}catch{return JSON.stringify(window.SVDTResults.getData())===previous;}}));
    check('reject-eleventh-row',await page.evaluate(()=>{const d=window.SVDTResults.getData();d.results.push(d.results[0]);try{window.SVDTResults.setData(d);return false;}catch{return true;}}));
    await page.evaluate(d=>{d.results[0].firstName='<b>Adam</b>';window.SVDTResults.setData(d);},original);
    check('safe-text',await page.locator('#rows b').count()===0&& (await page.locator('#rows tr:first-child td:nth-child(2)').textContent()).includes('<b>Adam</b>'));
    await page.evaluate(d=>{d.results[0].firstName='Alexandr';d.results[0].lastName='Černohorský-Novotný';window.SVDTResults.setData(d);},original);
    check('long-name-readable',await page.evaluate(()=>{const c=document.querySelector('#rows tr td:nth-child(2)');return c.scrollWidth<=c.clientWidth&&!document.getElementById('results-card').hidden;}));
    await page.screenshot({path:path.join(out,'vysledky-dlouhe-jmeno.png')});
    await page.evaluate(d=>window.SVDTResults.setData({...d,results:[]}),original);
    check('empty-hidden',await page.locator('#results-card').isHidden());
    await page.evaluate(d=>window.SVDTResults.setData(d),original);
    check('time-minute-boundary',await page.evaluate(()=>window.SVDTResults.formatTime(60000)==='1:00.000'&&window.SVDTResults.formatTime(59999)==='0:59.999'));
    await open({background:'transparent'});
    check('no-placeholder-in-default-output',await page.locator('.placeholder').count()===0);
    await page.evaluate(d=>window.SVDTResults.setData(d),original);
    // Verify actual editor import/export, including category/heat retention.
    await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);await page.waitForFunction(()=>window.resultsReady);
    await page.locator('#import').setInputFiles({name:'test.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...original,category:'MASTERS',runType:'DRUHÁ JÍZDA'}))});
    await page.waitForFunction(()=>window.SVDTResults.getData().category==='MASTERS');
    check('json-import',await page.locator('#category-title').textContent()==='MASTERS');
    const downloadPromise=page.waitForEvent('download');await page.locator('#download').click();const download=await downloadPromise;const exported=JSON.parse(fs.readFileSync(await download.path(),'utf8'));check('json-export',exported.category==='MASTERS'&&exported.results.length===10);
    await page.locator('#toggle').click();check('hide',await page.locator('#results-card').isHidden());await page.locator('#toggle').click();check('show',await page.locator('#results-card').isVisible());
    if(process.env.RESULTS_JSON?.trim()||process.env.RESULTS_CATEGORY?.trim()||process.env.RESULTS_RUN_TYPE?.trim()) {
      await open({background:'transparent'});
      const custom=process.env.RESULTS_JSON?.trim()?JSON.parse(process.env.RESULTS_JSON):original;
      if(process.env.RESULTS_CATEGORY?.trim())custom.category=process.env.RESULTS_CATEGORY.trim();
      if(process.env.RESULTS_RUN_TYPE?.trim())custom.runType=process.env.RESULTS_RUN_TYPE.trim();
      await page.evaluate(d=>window.SVDTResults.setData(d),custom);
      await page.evaluate(()=>Promise.all([...document.images].map(img=>img.decode())));
      check('custom-output',await page.locator('#results-card').isVisible()&&!(await page.locator('#status').getAttribute('class')).includes('error'));
      await page.screenshot({path:path.join(out,'vysledky-vlastni.png'),omitBackground:true});
    }
  } finally {await browser.close();fs.writeFileSync(path.join(__dirname,'kontrola.json'),JSON.stringify({errors,checks},null,2));}
  const failures=checks.filter(c=>!c.pass);console.log(JSON.stringify({card:'vysledky',errors,total:checks.length,failures}));if(errors.length||failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
