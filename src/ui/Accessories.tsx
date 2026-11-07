import {lidMotifs,type LidMotif} from '../lidMotifs.js';
import {t} from '../i18n.js';
import {ColorPicker} from './ColorPalette.js';
import {defaultInsertColor} from '../appearance.js';
import {labelProblem,labelLayout} from '../lettering.js';
import {useState} from 'react';
import {useEditor} from '../store.js';
import {editProject,regions} from '../editor.js';
import {insertHeight,setLevelCount,switchLevel,stackProblem,rimProblem,type CupSettings} from '../accessories.js';
import {Field} from './Field.js';
import {reliefNames,reliefPatterns} from '../reliefPatterns.js';
import {ReliefSwatch} from './SurfaceDetails.js';
import type {Project,Side} from '../model.js';
import {sideNames,sideOrder} from '../orientation.js';
type LidPattern=NonNullable<Project['lidDesign']>['pattern'];
function LidPatternIcon({pattern}:{pattern:LidPattern}){
 if(pattern!=='smooth'&&pattern!=='lines')return <ReliefSwatch pattern={pattern}/>;
 return <svg viewBox="0 0 48 32" aria-hidden="true"><rect width="48" height="32" fill="#dce3e8"/>{pattern==='lines'&&<path d="M0 5H48M0 13H48M0 21H48M0 29H48" fill="none" stroke="#7b8994" strokeWidth="2"/>}</svg>;
}
function LidPatternPicker({value,onChange}:{value:LidPattern;onChange:(value:LidPattern)=>void}){
 const options:LidPattern[]=['smooth','lines',...reliefPatterns];
 const name=(pattern:LidPattern)=>pattern==='smooth'?t('Гладкий'):pattern==='lines'?t('Линии'):t(reliefNames[pattern]);
 return <div className="lid-pattern-field"><span>{t('Узор на крышке')}</span><details className="lid-pattern-picker" onToggle={e=>{if(e.currentTarget.open)e.currentTarget.scrollIntoView({block:'nearest'});}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))e.currentTarget.open=false;}} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus();}}}>
  <summary aria-label={`${t('Узор на крышке')}: ${name(value)}`}><LidPatternIcon pattern={value}/><span>{name(value)}</span><span className="lid-pattern-chevron" aria-hidden="true">⌄</span></summary>
  <div className="lid-pattern-list" role="group" aria-label={t('Узор на крышке')}>{options.map(pattern=><button type="button" key={pattern} aria-pressed={value===pattern} onClick={e=>{const picker=e.currentTarget.closest('details')!;onChange(pattern);picker.open=false;picker.querySelector('summary')?.focus();}}><LidPatternIcon pattern={pattern}/><span>{name(pattern)}</span></button>)}</div>
 </details></div>;
}
export function StackControls({assembled,onAssembled}:{assembled:boolean;onAssembled:(v:boolean)=>void}){
 const {project:p,change,select}=useEditor(),count=p.stack?.levels.length??1;
 const reason=stackProblem(p);
 return <details className="accessories compact-editor stack-editor"><summary>{t("Ярусы ")}<small>{count>1?t("{0} лотка",[count]):t("один лоток")}</small></summary><div className="editor-layout"><section className="editor-group"><h3>{t("Ярусы")}: {count}</h3><div className="compact-actions"><button disabled={count===1} onClick={()=>{change(p=>setLevelCount(p,count-1));onAssembled(false);}}>{t("− Ярус")}</button><button disabled={count===5||!!reason} onClick={()=>change(p=>setLevelCount(p,count+1))}>{t("+ Ярус")}</button></div>{reason&&<p className="hint">{t(reason??'')}</p>}</section>{p.stack&&<><section className="editor-group"><h3>{t("Редактировать ярус")}</h3><div className="compartment-picks" aria-label={t("Редактировать ярус")}>{p.stack.levels.map((_,i)=><button key={i} aria-pressed={p.stack!.active===i} onClick={()=>{change(p=>switchLevel(p,i));select({type:'none',id:''});onAssembled(false);}}>{i+1}</button>)}</div><p className="hint">{t("Редактируется ярус ")}{p.stack.active+1}{t(". Его высоту и отсеки меняйте обычными инструментами. Размер основания общий.")}</p></section><section className="editor-group"><button className="quiet" aria-pressed={assembled} onClick={()=>{onAssembled(!assembled);select({type:'none',id:''});}}>{assembled?t("Редактировать ярус"):t("Посмотреть стопку")}</button><Field label={t("Зазор посадки")} value={p.stack.gap} min={.2} max={1} step={.1} onChange={gap=>change(p=>editProject(p,d=>{d.stack!.gap=gap;}))}/></section></>}</div></details>;
}
export function LidControls({onPatterns}:{onPatterns:()=>void}){
 const {project:p,change}=useEditor(),reason=rimProblem(p);
 const design=p.lidDesign??{pattern:'smooth' as const,rimHeight:2,handle:'none' as const,rimPattern:'smooth' as const};
 const set=(patch:Partial<NonNullable<typeof p.lidDesign>>)=>change(p=>editProject(p,d=>{d.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',rimPattern:'smooth',...d.lidDesign,...patch};}));
 return <details className="accessories compact-editor lid-editor"><summary>{t("Крышка ")}<small>{p.lid?t("добавлена"):t("нет")}</small></summary><div className="editor-layout"><section className="editor-group lid-fit"><button className="quiet" aria-pressed={!!p.lid} disabled={!p.lid&&!!reason} onClick={()=>change(p=>editProject(p,d=>{d.lid=!d.lid;}))}>{p.lid?t("Убрать крышку"):t("+ Крышка")}</button><p className="hint">{t(reason??'')||(p.lid&&design.fit==='inset'?t('Крышка заподлицо. Для снятия используйте вырез или ручку.'):t("Съёмная крышка с бортиком, зазор 0,5 мм. На модели показана приподнятой; в файле лежит плоской стороной на столе."))}</p>{p.lid&&<>
 <label className="count-label">{t('Посадка крышки')}<select value={design.fit??'outer'} onChange={e=>set({fit:e.target.value as 'outer'|'inset'})}><option value="outer">{t('Наружная')}</option><option value="inset">{t('Внутренняя')}</option></select></label>
 {design.fit!=='inset'&&<><label className="count-label">{t('Узор канта крышки')}<select value={design.rimPattern??'smooth'} onChange={e=>set({rimPattern:e.target.value as 'smooth'|'rings'})}><option value="smooth">{t('Гладкий')}</option><option value="rings">{t('Полосы')}</option></select></label>
 <Field label={t('Высота бортика крышки')} min={2} max={8} step={.5} value={design.rimHeight} onChange={rimHeight=>set({rimHeight})}/></>}
 </>}</section>{p.lid&&<><section className="editor-group lid-pattern-group"> <div className="surface-options" role="group" aria-label={t('Источник узора крышки')}><button aria-pressed={!design.svg} onClick={()=>set({svg:undefined})}>{t('Встроенные')}</button><button aria-pressed={!!design.svg} onClick={onPatterns}>{t('Мои SVG')}</button></div>
 {design.svg?<button className="studio-launch" onClick={onPatterns}><span>{design.svg.asset.name}</span><span>↗ {t('Настроить рисунок')}</span></button>:<>
 <label className="count-label">{t('Двухцветный узор')}<input type="checkbox" checked={!!design.olive} onChange={e=>set({olive:e.target.checked,raised:design.raised??true})}/></label>
 {design.olive?<><label className="count-label">{t('Узор на крышке')}<select value={design.motif??'olive'} onChange={e=>set({motif:e.target.value as LidMotif})}>{Object.entries(lidMotifs).map(([id,label])=><option key={id} value={id}>{t(label)}</option>)}</select></label>{design.motif!=='cellular'&&design.motif!=='pebbles'&&<label className="count-label">{t('Узор прорезями')}<input type="checkbox" checked={!!design.cutwork} onChange={e=>set({cutwork:e.target.checked})}/></label>}<label className="count-label">{t('Рельефный узор')}<input type="checkbox" checked={!!design.raised} onChange={e=>set({raised:e.target.checked})}/></label><label className="count-label">{t('Цвет основы крышки')}<input type="color" value={design.baseColor??'#f7f3e8'} onChange={e=>set({baseColor:e.target.value})}/></label>
 <label className="count-label">{t('Цвет узора крышки')}<input type="color" value={design.patternColor??'#687749'} onChange={e=>set({patternColor:e.target.value})}/></label></>:<LidPatternPicker value={design.pattern} onChange={pattern=>set({pattern})}/>}
 {!design.olive&&design.pattern!=='smooth'&&<><Field commitOnRelease label={t('Размер узора')} min={4} max={16} step={1} value={p.lidDesign?.patternSpacing??8} onChange={patternSpacing=>set({patternSpacing})}/><Field commitOnRelease label={t('Глубина узора крышки')} min={.2} max={1} step={.1} value={p.lidDesign?.patternDepth??.5} onChange={patternDepth=>set({patternDepth})}/></>}
 </>}
 </section><section className="editor-group lid-handle"><label className="count-label">{t('Ручка крышки')}<select value={design.handle} onChange={e=>set({handle:e.target.value as typeof design.handle})}><option value="none">{t('Без ручки')}</option><option value="round">{t('Цилиндрическая')}</option><option value="bar">{t('Планка')}</option></select></label>
 {design.handle!=='none'&&<><Field label={t('Размер ручки')} min={6} max={40} step={1} value={p.lidDesign?.handleWidth??(design.handle==='round'?10:26)} onChange={handleWidth=>set({handleWidth})}/><Field label={t('Высота ручки')} min={3} max={20} step={.5} value={p.lidDesign?.handleHeight??5} onChange={handleHeight=>set({handleHeight})}/><label className="count-label">{t('Край ручки')}<select value={p.lidDesign?.handleEdge??'none'} onChange={e=>set({handleEdge:e.target.value as 'none'|'chamfer'|'round'})}><option value="none">{t('Без скругления')}</option><option value="chamfer">{t('Фаска')}</option><option value="round">{t('Скругление')}</option></select></label>{p.lidDesign?.handleEdge&&p.lidDesign.handleEdge!=='none'&&<Field label={t('Размер фаски / скругления')} min={0} max={4} step={.2} value={p.lidDesign?.edgeSize??1} onChange={edgeSize=>set({edgeSize})}/>}<p className="hint">{t('Ручка печатается отдельно и приклеивается к крышке.')}</p></>}
 </section></>}</div></details>;
}
export function CupControls(){
 const {project:p,selection,change}=useEditor(),r=regions(p).find(r=>r.cell.id===selection.id&&!r.cell.split),cup=p.cups?.find(c=>c.cellId===selection.id);
 const height=r?insertHeight(p,r.cell.id):0;
 const disabled=!!p.printing;
 const update=(patch:Partial<CupSettings>)=>change(p=>editProject(p,d=>{d.cups=[...(d.cups??[]).filter(c=>c.cellId!==selection.id),{cellId:selection.id,shape:'fitted',height:Math.max(8,Math.min(150,height)),...cup,...patch}];}));
 return <details key={selection.id} className="accessories" open><summary>{t("Вставка в отсек ")}<small>{cup?t("добавлена"):t("нет")}</small></summary>
 {disabled?<p className="hint">{t("Пока доступно без разделения для печати.")}</p>:selection.type!=='cell'||!r?<p className="hint">{t("Выберите отсек на модели. Вставка автоматически впишется в него.")}</p>:<>
 <div className="compact-actions">{(['empty','grid','pens'] as const).map(content=><button key={content} aria-pressed={!!cup&&(cup.content??'empty')===content} onClick={()=>update({content})}>{{empty:t("Пустая"),grid:t("Для мелочей"),pens:t("Для ручек")}[content]}</button>)}</div>
 {cup&&<>
 <p className="hint">{t("Высота ")}{height.toFixed(1)} {t(" мм · на 1 мм ниже края отсека. Подстраивается автоматически.")}</p>
 {cup.content==='grid'&&<div className="compact-actions"><label className="count-label">{t("Ряды")}<select aria-label={t("Ряды вставки")} value={cup.rows??2} onChange={e=>update({rows:Number(e.target.value)})}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label><label className="count-label">{t("Столбцы")}<select aria-label={t("Столбцы вставки")} value={cup.columns??2} onChange={e=>update({columns:Number(e.target.value)})}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label></div>}
 {cup.content==='pens'&&<><Field label={t("Диаметр гнёзд")} min={6} max={30} step={1} value={cup.holeDiameter??12} onChange={holeDiameter=>update({holeDiameter})}/><p className="hint">{t("Внутренний диаметр. Число отверстий подбирается автоматически по размеру вставки.")}</p></>}
 <ColorPicker label={t("Цвет вставки")} color={cup.color??defaultInsertColor} onChange={color=>update({color})}/>
 <details><summary>{t("Форма вставки")}</summary><div className="compact-actions cup-shapes">{(['fitted','rounded','circle','oval','hexagon'] as const).map(shape=><button key={shape} aria-pressed={cup.shape===shape} onClick={()=>update({shape})}>{{fitted:t("▱ По форме отсека"),rounded:t("▢ Скруглённый"),circle:t("○ Круг"),oval:t("⬭ Овал"),hexagon:t("⬡ Шестигранник")}[shape]}</button>)}</div></details>
 <button className="quiet" onClick={()=>change(p=>editProject(p,d=>{d.cups=d.cups?.filter(c=>c.cellId!==selection.id);} ))}>{t("Убрать вставку")}</button>
 </>}
 {!!p.tilt&&<p className="hint">{t("Повторяет наклон органайзера ")}{p.tilt}{t("°. Дно горизонтальное. Вынимайте вставку вдоль наклона стенок.")}</p>}
 <p className="hint">{t("По форме отсека, зазор не меньше 0,5 мм. Стенки и дно 1,2 мм. Скачивается отдельной деталью.")}</p>
 </>}{!!p.cups?.length&&<button className="text-button" onClick={()=>change(p=>editProject(p,d=>{delete d.cups;}))}>{t("Убрать все вставки")}</button>}</details>;
}

export function LabelControls(){
 const {project:p,change,selection}=useEditor();const label=p.label,[text,setText]=useState(''),[chosen,setChosen]=useState<Side|null>(null);
 const selected=selection.type==='wall'?selection.id.split('@')[0]:'';
 const side=label?(label.side??'left'):(chosen??(sideOrder.includes(selected as Side)?selected as Side:'left')),reason=labelProblem(p,side);
 const metrics=(()=>{try{return labelLayout({...p,label:label??{text:text||'Кабели',icon:'',mode:'raised',font:'sans',side}},true);}catch{return null;}})();
 const maxSize=Math.max(4,Math.floor((metrics?.maxSize??30)*100)/100);
 const update=(patch:Partial<NonNullable<typeof p.label>>)=>change(p=>editProject(p,d=>{
  d.label={text:text||'Кабели',icon:'',mode:'raised',font:'sans',side,...d.label,...patch};
 }));
 return <details className="accessories label-controls compact-editor label-editor"><summary>{t("Подпись и значок ")}<small>{label?t("добавлены"):t("нет")}</small></summary><div className="editor-layout">
 <section className="editor-group"><div className="count-label label-side-picker">{t("Сторона подписи")}<div className="compact-actions" role="group" aria-label={t("Сторона подписи")}>{sideOrder.map(s=><button key={s} aria-pressed={side===s} disabled={!!label&&!!labelProblem(p,s)} title={labelProblem(p,s)?t(labelProblem(p,s)):undefined} onClick={()=>{setChosen(s);if(label)update({side:s});}}>{t(sideNames[s])}</button>)}</div></div>
  {!reason&&<div className="compact-actions">{(['','★','♥'] as const).map(icon=><button key={icon} aria-label={icon||t("Без значка")} aria-pressed={label?.icon===icon} onClick={()=>update({icon})}>{icon||t("Без значка")}</button>)}</div>}{label&&<button className="quiet" onClick={()=>change(p=>editProject(p,d=>{delete d.label;}))}>{t("Убрать подпись")}</button>}</section>{reason?<p className="hint">{t(reason??'')}</p>:<><section className="editor-group">
 <label className="count-label">{t("Текст")}<input aria-label={t("Текст подписи")} maxLength={18} placeholder={t("Кабели")} value={label?.text??text} onChange={e=>{setText(e.target.value);if(label)update({text:e.target.value});}}/></label>
 <label className="count-label">{t("Шрифт")}<select aria-label={t("Шрифт подписи")} value={label?.font??(label?'pixel':'sans')} onChange={e=>update({font:e.target.value as NonNullable<typeof p.label>['font']})}><option value="sans">Droid Sans</option><option value="bold">Droid Sans Bold</option><option value="serif">Droid Serif</option><option value="pixel">{t("Пиксельный")}</option></select></label>
 <Field label={t("Высота букв")} value={label?.size??metrics?.height??10} min={4} max={maxSize} step={.1} onChange={size=>update({size})}/>
 </section><section className="editor-group"><Field label={t("Положение по высоте")} value={label?.position??0} min={0} max={100} step={1} unit="%" onChange={position=>update({position})}/>
 <p className="hint">{t("0% — снизу · 50% — по центру · 100% — сверху, ниже выреза.")}</p>
 <Field label={label?.mode==='engraved'?t("Глубина гравировки"):t("Высота рельефа")} value={label?.depth??(label?.mode==='engraved'?.4:.6)} min={.2} max={label?.mode==='engraved'?Math.min(2,p.wallThickness-.6):2} step={.1} onChange={depth=>update({depth})}/>

 <div className="compact-actions">{(['raised','engraved'] as const).map(mode=><button key={mode} aria-pressed={label?.mode===mode} onClick={()=>update({mode,depth:mode==='engraved'?Math.min(label?.depth??.4,p.wallThickness-.6):label?.depth??.6})}>{mode==='raised'?t("Выпуклая"):t("Утопленная")}</button>)}</div>
 <p className="hint">{t("Размеры в миллиметрах. Шрифты поддерживают кириллицу. Надпись остаётся ниже выреза; слишком крупный текст нужно уменьшить.")}</p>
 </section></>}</div></details>;
}
