// One-time migration helper: use TypeScript's AST so attributes and code stay intact.
const ts=require('typescript'),fs=require('fs');
for(const file of fs.readdirSync('src/ui').filter(x=>x.endsWith('.tsx')).map(x=>'src/ui/'+x)){
 const source=fs.readFileSync(file,'utf8'),sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[];
 const inFunction=n=>{for(let p=n.parent;p;p=p.parent)if(ts.isFunctionLike(p))return true;return false};
 function walk(n){
  if(ts.isTemplateExpression(n)&&/[А-Яа-яЁё]/.test(n.head.text+n.templateSpans.map(x=>x.literal.text).join(''))){
   let key=n.head.text;const args=[];n.templateSpans.forEach((s,i)=>{key+='{'+i+'}'+s.literal.text;args.push(s.expression.getText(sf))});
   edits.push([n.getStart(sf),n.end,`t(${JSON.stringify(key)},[${args.join(',')}])`]);return;
  }
  if(ts.isJsxText(n)&&/[А-Яа-яЁё]/.test(n.text)){
   const text=n.text.replace(/\s+/g,' ');edits.push([n.getStart(sf),n.end,`{t(${JSON.stringify(text)})}`]);return;
  }
  if((ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))&&/[А-Яа-яЁё]/.test(n.text)&&inFunction(n)&&!n.text.endsWith('.json')){
   // Labels typed by the user are data. Keep the existing engraving default stable.
   if(file.endsWith('Accessories.tsx')&&n.text==='Кабели'&& !ts.isJsxAttribute(n.parent))return;
   const expr=`t(${JSON.stringify(n.text)})`;
   edits.push([n.getStart(sf),n.end,ts.isJsxAttribute(n.parent)?`{${expr}}`:expr]);return;
  }
  ts.forEachChild(n,walk);
 }
 walk(sf);edits.sort((a,b)=>b[0]-a[0]);let out=source;for(const [a,b,s] of edits)out=out.slice(0,a)+s+out.slice(b);
 if(edits.length)fs.writeFileSync(file,"import {t} from '../i18n.js';\n"+out);
}
