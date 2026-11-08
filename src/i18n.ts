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
Object.assign(filamentTranslations.en,{"Прорези SVG оставляют отдельные кусочки. Добавьте перемычки, соединяющие их с основой рисунка. Для крышки можно выбрать рельеф вместо прорезей.": "SVG openings leave loose pieces. Connect them to the surrounding material with bridges. For a lid, you can choose raised relief instead of openings.", "Изменения не построены. Показан последний успешный результат; он не подтверждает текущие настройки.": "The changes could not be built. The last successful result is shown; it does not confirm the current settings.", "SVG: заполненные контуры до 200 КБ. Загрузка не гарантирует пригодность для прорезей.": "SVG: filled outlines up to 200 KB. Importing does not guarantee suitability for through openings.", "В рисунке есть замкнутые внутренние области. Для рельефа это допустимо; в прорезях они могут стать отдельными кусочками. Увеличение интервала не соединит их с основой.": "This drawing has enclosed inner areas. These are suitable for relief but may become loose pieces in through openings. Increasing spacing will not connect them to the surrounding material.", "Какие SVG подходят?": "Which SVG files work?", "Подходят заполненные пути, многоугольники, прямоугольники, круги и эллипсы. Текст и обводки сначала преобразуйте в контуры. Удалите фон: любой заполненный фон тоже станет частью узора. Цвета SVG не переносятся.": "Use filled paths, polygons, rectangles, circles and ellipses. Convert text and strokes to outlines first. Remove the background: any filled background also becomes part of the pattern. SVG colors are not imported.", "Фото, маски, обрезка, фильтры, градиенты и ссылки на другие элементы не поддерживаются. Лимиты: 512 элементов, 128 фигур и 6000 точек после преобразования кривых.": "Photos, masks, clipping, filters, gradients and element references are unsupported. Limits: 512 elements, 128 shapes and 6,000 points after curve conversion.", "На корпусе SVG создаёт рельеф на сплошной стенке.": "On the organizer body, SVG creates raised relief on a solid wall.", "На крышке рельеф держится на сплошной основе. В сквозных прорезях крышки и оболочки оставшийся материал должен быть соединён: добавьте перемычки к внутренним деталям рисунка.": "Lid relief rests on a solid backing. With through openings in lids and shells, the remaining material must stay connected: add bridges to inner details in the drawing.", "На крышке и оболочке рисунок размещается целиком внутри рамки. Ширина задаётся для всего SVG, даже если в нём уже много повторов. Если рисунок не помещается, уменьшите ширину или смещение. Проверяйте итоговую геометрию перед экспортом.": "Lids and shells place whole drawings inside the frame. Width applies to the entire SVG, even if it already contains many repeats. If it does not fit, reduce its width or offset. Check the finished geometry before export.", "Инструкция по SVG": "SVG guide", "Один рисунок может обрезаться у краёв стенки. В режиме повтора размещаются только целые рисунки. Пропорции сохраняются.": "A single drawing may be clipped at wall edges. Repeat mode places only complete drawings. Proportions are preserved."});
Object.assign(filamentTranslations.en,{
 'SVG содержит изображение. Нужны векторные контуры, а не встроенное фото.':'The SVG contains an image. Use vector outlines instead of an embedded photo.',
 'Разверните клоны и символы в обычные контуры перед загрузкой SVG.':'Expand clones and symbols into ordinary outlines before uploading the SVG.',
 'Уберите маски, обрезку, фильтры, градиенты и стили CSS. Сохраните видимый рисунок заполненными контурами.':'Remove masks, clipping, filters, gradients and CSS style blocks. Save the visible drawing as filled outlines.',
 'SVG содержит больше 128 фигур. Оставьте один мотив или упростите рисунок.':'The SVG contains more than 128 shapes. Keep one motif or simplify the drawing.'
});
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

Object.assign(filamentTranslations.en,{'Рельеф (декор)':'Raised relief (decoration)','Сквозной трафарет (рез)':'Through stencil (cut)','Толщина материала':'Material thickness','Сквозной трафарет удаляет материал насквозь и требует перемычки.':'A through stencil removes material all the way through and requires bridges.'});

Object.assign(filamentTranslations.en,{'Для внутренней SVG-крышки нужна глубина не меньше толщины крышки плюс 2 мм.':'An inset SVG lid needs an internal depth of at least the lid thickness plus 2 mm.'});

Object.assign(filamentTranslations.en,{'Мин':'Min','Макс':'Max'});

Object.assign(filamentTranslations.en,{
 'Цвет здесь — примерный ориентир. Точный оттенок и смешивание настройте в слайсере. Номера слотов должны совпадать; профили печати не экспортируются.':'Color here is an approximate guide. Set the exact shade and mixing in your slicer. Slot numbers must match; print profiles are not exported.',
 'Удаление освобождает слот. Номера остальных филаментов сохраняются.':'Deleting frees the slot. Other filament numbers stay unchanged.',
 'Удалить филамент из слота {0}':'Delete filament from slot {0}',
 'Добавить слот {0}':'Add slot {0}',
 'Для одинаковых цветов выберите слот вручную при экспорте.':'For identical colors, select the slot manually when exporting.'
});

Object.assign(filamentTranslations.en,{'HEX-код':'HEX code','HEX-код цвета':'Color HEX code','Введите 6 символов: 0–9, A–F. Например, #E63522.':'Enter 6 characters: 0–9, A–F. For example, #E63522.'});

Object.assign(filamentTranslations.en,{'НОВЫЙ ПРОЕКТ':'NEW PROJECT','Новый проект':'New project','Начните с формы':'Start with a shape','Выберите основу. Размеры и отсеки настроите дальше.':'Choose a base. Adjust dimensions and compartments next.','Выберите форму':'Choose a shape','Задайте размеры':'Set dimensions','Добавьте отсеки':'Add compartments','Уже есть проект?':'Already have a project?','Открыть файл':'Open file','Выберите форму для нового проекта':'Choose a shape for your new project','Первые шаги':'First steps','Форма выбрана':'Shape selected','Скрыть помощника':'Hide helper','Здесь появятся ваши сохранённые проекты.':'Your saved projects will appear here.'});
