import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import catalogs from '../src/locales/catalogs.json' with {type:'json'};
import {languages,setLocale,t} from '../src/i18n.js';
import {drawerMessage} from '../src/ui/drawerMessages.js';

const files=['ui/DrawerWorkspace.tsx','ui/DrawerExportDialog.tsx','ui/PlateControls.tsx','ui/useDrawerPreview.ts','drawer.ts','mountingPlate.ts','mountingKernel.ts','drawerExport.ts','drawerExportWorker.ts','bedPacking.ts'];
const messages=new Set<string>();
for(const file of files){
 const ast=ts.createSourceFile(file,readFileSync(new URL('../src/'+file,import.meta.url),'utf8'),ts.ScriptTarget.Latest,true);
 const visit=(node:ts.Node)=>{if(ts.isStringLiteral(node)&&/[А-Яа-яЁё]/.test(node.text))messages.add(node.text.trim());ts.forEachChild(node,visit);};
 visit(ast);
}
test('drawer, mounting and export messages have real translations, not English seed copies',()=>{
 const dict=catalogs as Record<string,Record<string,string>>;
 const shared=new Set(['мм','Органайзер']);
 for(const [lang] of languages){
  setLocale(lang);
  for(const message of messages){
   if(lang==='ru'){assert.equal(t(message),message);continue;}
   assert.ok(dict[lang][message],`${lang}: missing ${message}`);
   assert.equal(t(message),dict[lang][message]);
   if(lang!=='en'&&!shared.has(message)&&!((lang==='de'&&message==='Название')||(lang==='fr'&&message==='Секции')))assert.notEqual(dict[lang][message],dict.en[message],`${lang}: English placeholder for ${message}`);
   if(lang!=='uk')assert.doesNotMatch(t(message),/[А-Яа-яЁё]/,`${lang}: Russian text for ${message}`);
  }
 }
 setLocale('en');
});
test('drawer diagnostics translate while preserving user names and compound fit issues',()=>{
 for(const [lang] of languages){
  setLocale(lang);
  const name='Название: My drawer 工具',part='Лоток-organizer';
  const issues=['Выходит за границы или зазор ящика','Выше доступной высоты ящика'];
  assert.equal(drawerMessage(name+': '+issues.join('; ')),name+': '+issues.map(v=>t(v)).join('; '));
  assert.equal(drawerMessage(name+': Наклонные стенки — проверьте поддержки в слайсере.'),name+': '+t('Наклонные стенки — проверьте поддержки в слайсере.'));
  assert.equal(drawerMessage('Не помещается на стол: '+part),t('Не помещается на стол:')+' '+part);
  assert.equal(drawerMessage(name+': Не помещается на стол: '+part),name+': '+t('Не помещается на стол:')+' '+part);
  assert.equal(drawerMessage('1 / 2: '+name),'1 / 2: '+name);
 }
 setLocale('en');
});
