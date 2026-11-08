import {useState} from 'react';
import {t} from '../i18n.js';
import type {TemplateShape} from '../templates.js';
import type {Project} from '../model.js';
import {useEditor} from '../store.js';
import {resizeFootprint,resizeHeight} from '../editor.js';
import {footprintContour} from '../footprint.js';
import {Field} from './Field.js';
import {QuickTools} from './QuickTools.js';
export function ProjectStart({busy,empty,archive,onCreate,onClose,onLibrary}:{busy:boolean;empty:boolean;archive:{name:string;project:Project}|null;onCreate:(shape:TemplateShape)=>Promise<void>;onClose:()=>void;onLibrary:()=>void}){
 const [step,setStep]=useState(1),[shape,setShape]=useState<TemplateShape|null>(null);
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change);
 const titles=['Выберите форму','Задайте размеры','Добавьте отсеки'];
 return <section className="project-start-dock" aria-label={t('Новый проект: три шага')}>
  <div className="start-dock-title"><strong>{t('Новый проект')}</strong>{!empty&&<button aria-label={t('Скрыть помощника')} onClick={onClose}>×</button>}</div>
  {archive?<button className="start-archive" onClick={onLibrary} aria-label={t('Открыть предыдущий проект')}><svg viewBox={`-5 -5 ${archive.project.width+10} ${archive.project.depth+10}`} aria-hidden="true"><polygon points={footprintContour(archive.project).map(v=>v.join(',')).join(' ')} fill={archive.project.colors?.organizer??'#a5c7b9'}/></svg><span><strong>{t('Предыдущий проект')}</strong><small>{t('Сохранён в «Моих проектах»')}</small></span></button>:<p className="start-dock-intro">{t('Три шага — и можно печатать. Начните с формы.')}</p>}
  <ol className="dock-steps">{titles.map((title,i)=><li key={title} className={step===i+1?'current':step>i+1?'complete':''}>
   <button className="dock-step-heading" disabled={busy||(empty&&i>0)} aria-expanded={step===i+1} onClick={()=>setStep(i+1)}><b>{step>i+1?'✓':i+1}</b><strong>{t(title)}</strong><span aria-hidden="true">{step===i+1?'⌃':'⌄'}</span></button>
   {step===i+1&&<div className="dock-step-body">{i===0?<div className="dock-shapes" role="group" aria-label={t('Выберите форму')}>{(['rounded','capsule','circle','oval','honeycomb'] as const).map(s=><button key={s} disabled={busy} aria-pressed={shape===s} onClick={()=>void onCreate(s).then(()=>{setShape(s);setStep(2);}).catch(()=>{})}><svg viewBox="0 0 90 60" aria-hidden="true">{s==='circle'?<circle cx="45" cy="30" r="22"/>:s==='oval'?<ellipse cx="45" cy="30" rx="37" ry="22"/>:s==='honeycomb'?<polygon points="25,8 65,8 78,30 65,52 25,52 12,30"/>:<rect x="8" y="8" width="74" height="44" rx={s==='capsule'?22:8}/>}</svg><span>{{rounded:t('Скруглённый'),capsule:t('Капсула'),circle:t('Круг'),oval:t('Овал'),honeycomb:t('Соты')}[s]}</span></button>)}</div>:i===1?<>
    <Field label={p.footprint==='circle'?'Диаметр':'Ширина'} value={p.width} min={2*p.wallThickness+2} max={400} step={.01} onChange={v=>change(p=>resizeFootprint(p,'width',v))}/>
    {p.footprint!=='circle'&&<Field label="Глубина" value={p.depth} min={2*p.wallThickness+2} max={400} step={.01} onChange={v=>change(p=>resizeFootprint(p,'depth',v))}/>}
    <Field label="Общая высота" value={p.height} min={5} max={200} onChange={v=>change(p=>resizeHeight(p,v))}/>
    <button className="dock-next" onClick={()=>setStep(3)}>{t('Далее: отсеки')}</button>
   </>:<><QuickTools/><button className="dock-next" onClick={onClose}>{t('Готово')}</button>{!p.root.split&&p.footprint!=='honeycomb'&&<button className="dock-skip" onClick={onClose}>{t('Оставить без перегородок')}</button>}</>}</div>}
  </li>)}</ol>
 </section>;
}
