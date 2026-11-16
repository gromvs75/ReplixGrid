import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import catalogs from '../src/locales/catalogs.json' with {type:'json'};
import sources from '../src/locales/ru.json' with {type:'json'};
import {languages,setLocale,t} from '../src/i18n.js';

// Include titles and option arrays as well as direct t() calls: SettingsPages
// translates titles at render time, and these were absent from the catalogs.
const files=['ui/ShellPanel.tsx','ui/SettingsPages.tsx','ui/PatternStudio.tsx','ui/SvgControls.tsx','ui/ColorPalette.tsx','ui/Field.tsx','panelSettings.ts','svgImport.ts','svgPattern.ts'];
const messages=new Set<string>();
for(const file of files){
 const ast=ts.createSourceFile(file,readFileSync(new URL('../src/'+file,import.meta.url),'utf8'),ts.ScriptTarget.Latest,true);
 const visit=(node:ts.Node)=>{if(ts.isStringLiteral(node)&&/[А-Яа-яЁё]/.test(node.text))messages.add(node.text.trim());ts.forEachChild(node,visit);};
 visit(ast);
}
const shared:Record<string,string[]>={
 'мм':['de','fr','es','el','it','cs','pl'],
 'Кубы':['fr'],'Треугольники':['fr'],
 'Оранжевый':['de','fr'],'Бежевый':['de','es','it'],
 'Шоколадный':['es'],'Оливковый':['de'],'Графит':['fr'],
 'Слот':['it','cs','pl']
};
const placeholders=(s:string)=>s.match(/\{\d+\}/g)?.sort()??[];
for(const [lang] of languages){
 test(`shell, panels and SVG controls have complete ${lang} translations`,()=>{
  const dict=catalogs as Record<string,Record<string,string>>;
  const standalone=lang==='ru'?null:JSON.parse(readFileSync(new URL(`../src/locales/${lang}.json`,import.meta.url),'utf8')) as Record<string,string>;
  try{
   setLocale(lang);
   for(const message of messages){
    assert.ok(sources.includes(message),`Source inventory missing: ${message}`);
    if(lang==='ru'){assert.equal(t(message),message);continue;}
    const value=dict[lang][message];
    assert.ok(value,`${lang}: missing ${message}`);
    assert.equal(t(message),value,`${lang}: fallback used for ${message}`);
    assert.equal(standalone![message],value,`${lang}: catalog mismatch for ${message}`);
    assert.deepEqual(placeholders(value),placeholders(message),`${lang}: placeholders in ${message}`);
    if(lang!=='uk')assert.doesNotMatch(value,/[А-Яа-яЁё]/,`${lang}: Russian text in ${message}`);
    if(lang!=='en'&&!shared[message]?.includes(lang))assert.notEqual(value,dict.en[message],`${lang}: English seed copy for ${message}`);
   }
  }finally{setLocale('en');}
 });
}
test('shell fit and fasteners use mechanical terms',()=>{
 setLocale('en');assert.equal(t('Посадка'),'Fit');
 setLocale('de');assert.equal(t('Посадка'),'Passung');assert.equal(t('Скрытые крепления'),'Verdeckte Befestigungen');
 setLocale('zh-CN');assert.equal(t('Скрытые крепления'),'隐藏式固定件');
 setLocale('en');
});
