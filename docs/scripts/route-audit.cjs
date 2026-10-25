const fs=require('node:fs');
const {chromium}=require('C:/Users/nil55/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage(); const results=[];
 for(const width of [360,768,1280,1920]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/about','/skills','/projects','/achievements','/contact']){
   const r=await page.goto('http://127.0.0.1:3100'+(route==='/'?'/':route+'.html'),{waitUntil:'networkidle'});
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,mainCount:document.querySelectorAll('main').length,h1:document.querySelector('h1')?.textContent||null,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')),unlabelledInputs:[...document.querySelectorAll('input,textarea')].filter(i=>!i.labels?.length&&!i.getAttribute('aria-label')).length}));
   results.push({width,route,status:r.status(),...state});
  }
 }
 await page.goto('http://127.0.0.1:3100/');
 await page.evaluate(()=>localStorage.setItem('darkMode','true'));
 await page.reload({waitUntil:'networkidle'});
 const themeRestored=await page.evaluate(()=>document.documentElement.classList.contains('dark'));
 fs.writeFileSync('docs/evidence/route-audit.json',JSON.stringify({results,themeRestored},null,2));
 console.log(JSON.stringify({routesChecked:results.length,themeRestored,issues:results.filter(x=>x.overflow||x.brokenImages.length||x.unlabelledInputs)}));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
