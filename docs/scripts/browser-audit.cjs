const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('C:/Users/nil55/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const targets = [ ['portfolio','http://localhost:3000/'], ['investify','https://investiify.netlify.app/'], ['blog','https://ai-enable-blog-generator.vercel.app/'], ['hms','https://hmsportal.netlify.app/'], ['ecobin','https://ecobinn.netlify.app/'], ['dining','https://dining-master.netlify.app/'] ];
 const results=[];
 for(const [name,url] of targets){
  const page=await browser.newPage({viewport:{width:360,height:800}});
  const errors=[]; const responses=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  page.on('response',r=>{if(['fetch','xhr'].includes(r.request().resourceType()))responses.push({url:r.url().split('?')[0],status:r.status()})});
  const start=Date.now();
  try{
   const response=await page.goto(url,{waitUntil:'load',timeout:25000});
   const loadMs=Date.now()-start;
   await page.waitForTimeout(3000);
   const data=await page.evaluate(()=>({title:document.title,text:document.body.innerText.slice(0,5500),horizontalOverflow:document.documentElement.scrollWidth>innerWidth,links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent?.trim(),href:a.getAttribute('href')})),navigation:performance.getEntriesByType('navigation').map(n=>({responseStart:n.responseStart,domContentLoaded:n.domContentLoadedEventEnd,load:n.loadEventEnd})),mainCount:document.querySelectorAll('main').length}));
   await page.screenshot({path:path.join(__dirname,'../evidence',`${name}-mobile.png`),fullPage:true});
   results.push({name,url,status:response?.status(),loadMs,...data,errors,responses});
  }catch(e){results.push({name,url,error:e.message,errors,responses})}
  await page.close();
  fs.writeFileSync(path.join(__dirname,'../evidence/browser-audit.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.at(-1)));
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
