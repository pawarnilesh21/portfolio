import fs from 'node:fs/promises';
const entries = {
 'hms-portal':['src/store.ts','src/components/Login.tsx','src/components/PatientDashboard/QueueStatus.tsx'],
 'DocMind':['raw/PRODUCTION_READINESS.md','app/services/qa_pipeline.py','app/services/vector_store.py'],
 'AI_Study_Notes_Generator':['app.py','utils/llm.py','requirements.txt'],
 'AI-Enable-Blog-Generator':['server/configs/gemini.js','server/controllers/blogController.js','server/routes/blogRoutes.js'],
 'Investify-Backend':['controllers/recommendationController.js','controllers/authController.js'],
};
for(const [repo,paths] of Object.entries(entries)){
 for(const file of paths){
  const url=`https://raw.githubusercontent.com/pawarnilesh21/${repo}/main/${file}`;
  const r=await fetch(url,{signal:AbortSignal.timeout(20000)});
  let text=await r.text();
  text=text.replace(/(?:gsk_|hf_|AIza)[A-Za-z0-9_-]{15,}/g,'[REDACTED]');
  await fs.writeFile(new URL(`../evidence/${repo}--${file.replaceAll('/','_')}.txt`,import.meta.url),text);
  console.log(JSON.stringify({repo,file,status:r.status,text:text.slice(0,6500)}));
 }
}
