const fs=require('node:fs');
(async()=>{
 const lock=JSON.parse(fs.readFileSync('bun.lock','utf8').replace(/,\s*([}\]])/g,'$1'));
 const body={};
 for(const value of Object.values(lock.packages)){
  const spec=value[0]; const split=spec.lastIndexOf('@');
  const name=spec.slice(0,split),version=spec.slice(split+1);
  (body[name]??=[]).push(version);
 }
 const r=await fetch('https://registry.npmjs.org/-/npm/v1/security/advisories/bulk',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 if(!r.ok)throw Error(`Registry HTTP ${r.status}`);
 const advisories=await r.json();
 fs.writeFileSync('docs/evidence/dependency-advisories.json',JSON.stringify(advisories,null,2));
 console.log(JSON.stringify({packagesChecked:Object.keys(body).length,affectedPackages:Object.keys(advisories),advisories:Object.values(advisories).flat().map(a=>({name:a.module_name,severity:a.severity,title:a.title,url:a.url,range:a.vulnerable_versions}))}));
})().catch(e=>{console.error(e);process.exitCode=1});
