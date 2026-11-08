import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {languages,setLocale,t} from '../src/i18n.js';
import catalogs from '../src/locales/catalogs.json' with {type:'json'};
const component=readFileSync(new URL('../src/ui/ProjectStart.tsx',import.meta.url),'utf8');
const keys=[...new Set([...component.matchAll(/t\('([^']+)'/g)].map(m=>m[1]).concat(['Видео: быстрый старт (1:03, на английском)','Помощь','Быстрый старт','Видео: быстрый старт (1:03)','Руководство пользователя','Помощник: три шага','Выберите форму','Задайте размеры','Добавьте отсеки','Диаметр','Ширина','Глубина','Общая высота','Отсеки','− Отсек','+ Отсек','Добавляем и убираем крайнюю ячейку. Размер остальных сохраняется; оболочка перестраивается.','Плюс делит самый большой отсек. Минус объединяет одну пару соседних отсеков.','Можно отменить.','Выберите форму для нового проекта','Здесь появятся ваши сохранённые проекты.']))];
for(const [lang] of languages)test(`project helper has native ${lang} copy, including archive placeholders`,()=>{
 setLocale(lang);
 const dictionary=(catalogs as Record<string,Record<string,string>>)[lang];
 for(const key of keys){
  if(lang!=='ru')assert.ok(dictionary[key]?.trim(),`${lang}: missing ${key}`);
  assert.equal(t(key,['Project A']), (lang==='ru'?key:dictionary[key]).replace('{0}','Project A'));
 }
 assert.ok(t('Предыдущий проект сохранён: {0}',['Project A']).includes('Project A'));
});
