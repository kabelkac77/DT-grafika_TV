// One command for all cards; preserve each card's independent renderer.
const {spawnSync}=require('node:child_process');const path=require('node:path');
let failed=false;for(const card of ['karta-jezdce','karta-hosta','karta-vysledky']){const r=spawnSync(process.execPath,[path.join(__dirname,card,'render.cjs')],{stdio:'inherit',env:process.env});if(r.status!==0)failed=true;}process.exitCode=failed?1:0;
