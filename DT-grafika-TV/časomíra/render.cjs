const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
(async () => {
  const out = path.join(__dirname, 'nahledy'); fs.mkdirSync(out, {recursive:true});
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const base = pathToFileURL(path.join(__dirname,'index.html')).href;
  try {
    const time = process.env.TIMER_TIME?.trim() || '1:23.456';
    for (const background of ['transparent','light','dark','neutral']) {
      await page.goto(base + '?' + new URLSearchParams({capture:'1',time,background}));
      await page.evaluate(() => document.fonts.ready);
      assert(await page.locator('#timer').isVisible(), 'Invalid TIMER_TIME or hidden timer');
      assert(await page.evaluate(() => document.fonts.check('900 48px Exo')), 'Missing font');
      const box = await page.locator('#timer').boundingBox();
      assert.deepEqual(box, {x:1480,y:888,width:344,height:112});
      await page.screenshot({path:path.join(out,`casomira-${background}.png`),omitBackground:background==='transparent'});
      if (background === 'transparent') await page.locator('#timer').screenshot({path:path.join(out,'casomira-detail.png'),omitBackground:true});
    }
    await page.goto(base);
    for (const value of ['0:00.000','99:59.999']) {
      await page.locator('#time').fill(value);
      assert(await page.locator('#timer').isVisible());
      assert(await page.locator('#timer-time').evaluate(e => e.scrollWidth <= e.clientWidth));
    }
    for (const value of ['', '1:60.000','<script>']) {
      await page.locator('#time').fill(value); assert(await page.locator('#timer').isHidden());
    }
    await page.evaluate(() => window.svdtTimer.setTime('2:34.567'));
    await page.locator('#toggle').click(); assert(await page.locator('#timer').isHidden());
    await page.locator('#toggle').click(); assert(await page.locator('#timer').isVisible());
    await page.locator('#link').click(); await page.reload();
    assert.equal(await page.locator('#timer-time').textContent(), '2:34.567');
    await page.setViewportSize({width:768,height:1024});
    assert(await page.locator('#timer').isVisible());
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(__dirname,'kontrola.json'),JSON.stringify({errors,passed:true},null,2));
    console.log('Časomíra: exporty, rozměry, rozsah času, editor a URL v pořádku.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode=1; });
