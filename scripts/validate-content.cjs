const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve('content/schema.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename,'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020}
});
const schemaModule = new Module(filename, module);
schemaModule.filename = filename;
schemaModule.paths = module.paths;
schemaModule._compile(compiled.outputText, filename);
const schema = schemaModule.exports.portfolioSchema;
const raw = JSON.parse(fs.readFileSync('content/portfolio.json','utf8'));
const data = schema.parse(raw);
if (process.argv.includes('--self-test')) {
  const mutations = [
    d => { delete d.profile.name; },
    d => { d.projects[0].liveCheckedAt=null; },
    d => { d.skills[0].evidence=['does-not-exist']; },
    d => { d.projects[0].claims.push({text:'unresolved',sources:['ai-resume'],state:'conflict',publish:true,note:'Conflict'}); },
    d => { d.resumeByRole.genai='missing'; },
  ];
  for(const mutate of mutations){
    const copy=structuredClone(raw); mutate(copy);
    if(schema.safeParse(copy).success) throw Error('Invalid content passed the schema');
  }
  console.log('Five invalid-content rejection checks passed.');
}
console.log(`Content valid: ${data.projects.length} projects, ${data.experience.length} internships, ${data.skills.length} skills, ${data.todos.length} documented gaps.`);
