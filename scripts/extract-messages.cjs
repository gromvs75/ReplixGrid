const ts=require('typescript'),fs=require('fs');const messages=new Set();
function files(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(f=>f.isDirectory()&&!['fonts','locales'].includes(f.name)?files(d+'/'+f.name):f.isFile()&&/\.tsx?$/.test(f.name)?[d+'/'+f.name]:[])}
for(const file of files('src')){
 if(file==='src/i18n.ts')continue;
 const sf=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function walk(n){
  if(ts.isTemplateExpression(n)){
   let key=n.head.text;n.templateSpans.forEach((s,i)=>key+='{'+i+'}'+s.literal.text);
   if(/[А-Яа-яЁё]/.test(key))messages.add(key.trim());
  }else if((ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)||ts.isJsxText(n))&&/[А-Яа-яЁё]/.test(n.text)){
   const key=n.text.trim().replace(/\s+/g,' ');
   if(key&&!key.endsWith('.json')&&!(file==='src/lettering.ts'&&key.length<3))messages.add(key);
  }
  ts.forEachChild(n,walk);
 }walk(sf);
}
fs.mkdirSync('src/locales',{recursive:true});fs.writeFileSync('src/locales/ru.json',JSON.stringify([...messages].sort(),null,2)+'\n');console.log(messages.size+' source messages');
