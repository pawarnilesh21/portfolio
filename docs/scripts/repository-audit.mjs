import fs from 'node:fs/promises';
const root = new URL('../evidence/', import.meta.url);
await fs.mkdir(root, {recursive:true});
const names = ['Investify-FrontEnd','Investify-Backend','AI-Enable-Blog-Generator','hms-portal','Restaurant_Management','DocMind','AI_Study_Notes_Generator','websocket-kanban-vitest-playwright-2026'];
for (const name of names) {
  const base = `https://api.github.com/repos/pawarnilesh21/${name}`;
  const options = {headers:{'User-Agent':'portfolio-audit'},signal:AbortSignal.timeout(20000)};
  const info = await fetch(base, options).then(r=>r.json());
  const readme = await fetch(`${base}/readme`, options).then(r=>r.json());
  const tree = await fetch(`${base}/git/trees/${info.default_branch}?recursive=1`,options).then(r=>r.json());
  const paths = (tree.tree||[]).filter(x=>x.type==='blob').map(x=>x.path).filter(p=>!p.includes('node_modules/') && !p.includes('.venv/'));
  const result = {name,url:info.html_url,branch:info.default_branch,sha:tree.sha,readme:readme.content?Buffer.from(readme.content,'base64').toString('utf8'):null,paths};
  await fs.writeFile(new URL(`${name}.json`,root),JSON.stringify(result,null,2));
  console.log(JSON.stringify({name,sha:tree.sha,readme:result.readme?.slice(0,4500),paths:paths.filter(p=>/test|eval|controller|routes|service|requirements|pyproject|package.json|README|verification/i.test(p)).slice(0,65)}));
}
