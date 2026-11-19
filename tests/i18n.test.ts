import test from 'node:test';
import assert from 'node:assert/strict';
import catalogs from '../src/locales/catalogs.json' with {type:'json'};
import sources from '../src/locales/ru.json' with {type:'json'};
import {t,languages,setLocale,getLocale,subscribeLocale} from '../src/i18n.js';
const dictionaries=catalogs as Record<string,Record<string,string>>;
const slots=(s:string)=>s.match(/\{\d+\}/g)?.sort()??[];
test('Gridfinity editor uses translated runtime messages in every language',()=>{
 const keys=['Проекты','Тип плиты','Сплошное дно','Решётчатая','Сквозные отверстия уменьшают расход материала. Высота плиты и посадка лотков одинаковы в обоих вариантах.','Совместимость с Gridfinity','← Обычный режим','Базовая плита','Отсеков по длине','Отсеков по ширине','Толщина стенки','Зазор плиты на сторону','Полная высота с опорами: {0} мм. Глубина внутри: {1} мм.','Длина и ширина привязаны к сетке 42 мм. Между лотками остаётся зазор 0,5 мм.','Больше зазор — свободнее посадка. Меняются только гнёзда плиты; размеры опор лотка остаются прежними.','ZIP содержит модель, инструкцию и лицензию MIT.'];
 for(const [lang] of languages){setLocale(lang);for(const key of keys){
   assert.ok(sources.includes(key),key);
   const expected=lang==='ru'?key:dictionaries[lang][key];assert.ok(expected,`${lang}: ${key}`);
   assert.equal(t(key,[70,63]),expected.replace('{0}','70').replace('{1}','63'));
   if(!['ru','uk'].includes(lang))assert.doesNotMatch(t(key,[70,63]),/[А-Яа-яЁё]/,`${lang}: ${key}`);
 }}
 setLocale('ru');
});
test('trim and pattern controls have translations in every locale',()=>{
 const keys=['Грани','Шеврон','Без канта','Ступени','Высота канта','Ширина канта','Кант выступает наружу. С совместимой оболочкой он также служит нижней опорой.','Узоры · прокрутите каталог, чтобы увидеть все.'];
 for(const [lang] of languages){
  setLocale(lang);
  for(const key of keys){
   assert.ok(sources.includes(key),key);
   if(lang==='ru'){assert.equal(t(key),key);continue;}
   assert.ok(dictionaries[lang][key],lang+': '+key);
   assert.equal(t(key),dictionaries[lang][key]);
   // Ukrainian legitimately shares some labels with Russian.
   if(lang!=='uk')assert.doesNotMatch(t(key),/[А-Яа-яЁё]/,lang+': '+key);
  }
 }
 setLocale('en');
 assert.equal(t('Ширина канта'),'Border width');
});
test('print panel introduction is translated in every supported language',()=>{
 const key='Введите область печати вашего принтера. Места разрезов и соединений подберём сами.';
 for(const [lang] of languages){setLocale(lang);assert.equal(t(key),lang==='ru'?key:dictionaries[lang][key]);if(lang!=='ru')assert.notEqual(t(key),key,lang);}
 setLocale('ru');
});
test('all requested locales cover every source message and preserve placeholders',()=>{
 for(const [lang] of languages){if(lang==='ru')continue;for(const key of sources){const value:string|undefined=dictionaries[lang]?.[key];assert.ok(value,lang+': '+key);assert.deepEqual(slots(value),slots(key),lang+': '+key);assert.doesNotMatch(value,/\[\s*\[?\s*\d{3,4}/,lang+': '+key);}}
});
test('translation preserves whitespace, formats worker messages and ignores user text',()=>{
 setLocale('en');assert.equal(t(' мм '),' mm ');assert.equal(t('This is user text'),'This is user text');
 const key='{0}: ошибка геометрии';assert.equal(t('part-1: ошибка геометрии'),t(key,['part-1']));
 setLocale('ru');assert.equal(t(key,['part-1']),'part-1: ошибка геометрии');
});
test('invalid language cannot change selection and subscribers can unsubscribe',()=>{
 setLocale('ru');let calls=0;const off=subscribeLocale(()=>calls++);setLocale('de');assert.equal(getLocale(),'de');setLocale('bad');assert.equal(getLocale(),'de');assert.equal(calls,1);off();setLocale('ru');assert.equal(calls,1);
});
test('printer names and user lettering remain data, not translated project fields',async()=>{
 const {defaultProject}=await import('../src/model.js');const p=defaultProject();p.label={text:'Мой текст',icon:'',mode:'raised'};const before=JSON.stringify(p);setLocale('zh-CN');assert.equal(JSON.stringify(p),before);assert.equal(t('Принтер'),'打印机');setLocale('ru');
});
test('assembly controls and placement errors are translated in every locale',()=>{
 const keys=['Состав комплекта','+ Плита','+ Лоток','Плита {0}','Лоток {0}','Плита для лотка','Положение на сетке','Редактировать деталь','Плита и её лотки','Выбранный лоток','Плиты пересекаются.','На плите нет места. Увеличьте её или добавьте плиту.','Сначала перенесите или удалите лотки этой плиты.'];
 for(const [lang] of languages){setLocale(lang);for(const key of keys){assert.ok(sources.includes(key));if(lang!=='ru')assert.ok(dictionaries[lang][key],lang+': '+key);assert.equal(slots(lang==='ru'?key:dictionaries[lang][key]).join(),slots(key).join());}}
 setLocale('ru');
});
