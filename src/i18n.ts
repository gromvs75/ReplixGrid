import catalogs from './locales/catalogs.json' with {type:'json'};
export const languages=[['en','English'],['de','Deutsch'],['fr','Français'],['es','Español'],['el','Ελληνικά'],['it','Italiano'],['uk','Українська'],['cs','Čeština'],['pl','Polski'],['zh-CN','简体中文'],['ru','Русский']] as const;
export type Locale=typeof languages[number][0];
const key='replixgrid.locale';
let locale:Locale='en';
const listeners=new Set<()=>void>();
export const getLocale=()=>locale;
export const subscribeLocale=(f:()=>void)=>{listeners.add(f);return()=>{listeners.delete(f);};};
export function setLocale(value:string){
 if(!languages.some(([id])=>id===value))return;
 locale=value as Locale;
 if(typeof document!=='undefined'){document.documentElement.lang=locale;document.title='ReplixGrid';}
 try{localStorage.setItem(key,locale);}catch{/* Private browsing may disable storage. */}
 listeners.forEach(f=>f());
}
export function restoreLocale(){
 let requested:string|null=null,stored:string|null=null;
 try{requested=new URLSearchParams(window.location.search).get('lang');}catch{/* Non-browser environments. */}
 try{stored=localStorage.getItem(key);}catch{/* Private browsing may disable storage. */}
 const valid=(value:string|null):value is Locale=>languages.some(([id])=>id===value);
 setLocale(valid(requested)?requested:valid(stored)?stored:'en');
}
const dictionary=catalogs as Record<string,Record<string,string>>;
const filamentTranslations:Record<string,Record<string,string>>={
 en:{'Филаменты слайсера':'Slicer filaments','Укажите цвета и номера как в слайсере. Профили и настройки печати не экспортируются.':'Set colors and slot numbers to match your slicer. Profiles and print settings are not exported.','Цвет филамента {0}':'Filament {0} color','Название филамента {0}':'Filament {0} name','Название или материал':'Name or material','Удалить последний филамент':'Remove last filament','Одинаковые цвета нельзя однозначно сопоставить слотам. Выберите разные цвета.':'Identical colors cannot be matched to a unique slot. Choose different colors.','+ Филамент':'+ Filament','Назначение филаментов в Snapmaker Orca: проверьте номера слотов и цвета в слайсере. Профили не передаются.':'Snapmaker Orca filament assignments: check the slots and colors in the slicer. Profiles are not included.','Слот':'Slot','Не сопоставлено — проверьте филамент в слайсере':'Not mapped — check the filament in the slicer'},
 de:{'Филаменты слайсера':'Slicer-Filamente','Укажите цвета и номера как в слайсере. Профили и настройки печати не экспортируются.':'Farben und Steckplatznummern wie im Slicer festlegen. Profile und Druckeinstellungen werden nicht exportiert.','Цвет филамента {0}':'Farbe von Filament {0}','Название филамента {0}':'Name von Filament {0}','Название или материал':'Name oder Material','Удалить последний филамент':'Letztes Filament entfernen','Одинаковые цвета нельзя однозначно сопоставить слотам. Выберите разные цвета.':'Gleiche Farben lassen sich Steckplätzen nicht eindeutig zuordnen. Wählen Sie unterschiedliche Farben.','+ Филамент':'+ Filament','Назначение филаментов в Snapmaker Orca: проверьте номера слотов и цвета в слайсере. Профили не передаются.':'Filamentzuordnung in Snapmaker Orca: Steckplätze und Farben im Slicer prüfen. Profile werden nicht übertragen.','Слот':'Steckplatz','Не сопоставлено — проверьте филамент в слайсере':'Nicht zugeordnet — Filament im Slicer prüfen'}
};
filamentTranslations.en['Настройка филамента']='Filament settings';
filamentTranslations.en['Добавить']='Add';
filamentTranslations.en['Цвет']='Color';
filamentTranslations.de['Настройка филамента']='Filamenteinstellung';
filamentTranslations.de['Добавить']='Hinzufügen';
filamentTranslations.de['Цвет']='Farbe';
filamentTranslations.en['Филамент для детали {0}']='Filament for part {0}';
filamentTranslations.en['Выбрать в слайсере']='Choose in slicer';
filamentTranslations.en['Для деталей без выбранного слота Orca может использовать первый филамент. Выберите слот здесь или назначьте его в слайсере.']='For parts without an assigned slot, Orca may use the first filament. Select a slot here or assign it in the slicer.';
filamentTranslations.en['Чтобы выбрать слоты здесь, добавьте филаменты в разделе «Печать».']='To select slots here, add filaments in the Print section.';
filamentTranslations.de['Филамент для детали {0}']='Filament für Teil {0}';
filamentTranslations.de['Выбрать в слайсере']='Im Slicer auswählen';
filamentTranslations.de['Для деталей без выбранного слота Orca может использовать первый филамент. Выберите слот здесь или назначьте его в слайсере.']='Für Teile ohne zugewiesenen Steckplatz kann Orca das erste Filament verwenden. Wählen Sie hier einen Steckplatz oder weisen Sie ihn im Slicer zu.';
filamentTranslations.de['Чтобы выбрать слоты здесь, добавьте филаменты в разделе «Печать».']='Um hier Steckplätze auszuwählen, fügen Sie im Bereich Drucken Filamente hinzu.';
Object.assign(filamentTranslations.en,{"Источник узора крышки": "Lid pattern source", "Источник узора оболочки": "Shell pattern source", "Способ нанесения SVG": "SVG application", "Сквозные прорези": "Through openings", "Некорректный режим SVG крышки.": "Invalid lid SVG mode.", "Рисунки размещаются целиком внутри рамки. Пропорции сохраняются. Для прорезей добавьте перемычки к замкнутым внутренним деталям SVG.": "Whole motifs fit inside the frame, preserving proportions. For through openings, add bridges to enclosed inner details in the SVG.", "Прорези SVG оставляют отдельные кусочки. Добавьте перемычки в рисунок или увеличьте интервал.": "SVG openings leave loose pieces. Add bridges to the drawing or increase spacing.", "SVG не помещается внутри рамки. Уменьшите размер или смещение.": "The SVG does not fit inside the frame. Reduce its size or offset."});
filamentTranslations.en['Для внутренней крышки с рельефом нужна глубина от 5,2 мм.']='An inset lid with relief requires at least 5.2 mm of internal depth.';
Object.assign(filamentTranslations.en,{"Студия узоров": "Pattern Studio", "Поверхность для SVG": "SVG surface", "Закрыть студию узоров": "Close Pattern Studio", "Рисунок для крышки": "Lid pattern", "Добавьте крышку, чтобы выбрать рисунок.": "Add a lid to choose a pattern.", "Настроить рисунок": "Edit pattern", "Библиотека SVG": "SVG library", "Убрать рисунок": "Remove pattern", "Загрузить": "Upload", "Размещение SVG": "SVG placement", "По центру": "Center", "Рамка": "Frame", "Стенки для SVG": "SVG walls", "На выбранных панелях": "On selected panels", "Выберите рисунок или загрузите SVG": "Choose a pattern or upload an SVG"});
Object.assign(filamentTranslations.en,{"Раздел настроек":"Settings section","Развернуть настройки":"Expand settings","Свернуть настройки":"Collapse settings","Выбранный элемент":"Selected item","Количество отсеков":"Compartment count","Образец соединения":"Joint sample","Узор":"Pattern","Сначала выберите узор оболочки.":"Choose a shell pattern first."});
filamentTranslations.en['Закрыть настройки раздела']='Close section settings';
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const templates=Object.keys(dictionary.en??{}).filter(s=>/\{\d+\}/.test(s)).map(s=>({key:s,regex:new RegExp('^'+s.split(/\{\d+\}/).map(escape).join('(.*?)')+'$')}));
/** Russian source keys remain stable. User content and filenames are never passed here. */
export function t(source:string,args:readonly unknown[]=[]):string{
 const trimmed=source.trim(),d=dictionary[locale]??{};
 let translated=locale==='ru'?trimmed:(d[trimmed]??filamentTranslations[locale]?.[trimmed]??filamentTranslations.en[trimmed]);
 if(translated===undefined){
  for(const template of templates){const match=trimmed.match(template.regex);if(match)return t(template.key,match.slice(1));}
  translated=trimmed;
 }
 translated=translated.replace(/\{(\d+)\}/g,(whole,n)=>args[Number(n)]===undefined?whole:String(args[Number(n)]));
 return source.slice(0,source.length-source.trimStart().length)+translated+source.slice(source.trimEnd().length);
}
