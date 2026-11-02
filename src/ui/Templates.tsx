import {t} from '../i18n.js';
import {useState} from 'react';
import {organizerTemplate,type TemplateShape,type TemplateHeights} from '../templates.js';
import {preset} from '../editor.js';
import {useEditor} from '../store.js';
export function Templates({onApply}:{onApply:()=>void}){
  const [shape,setShape]=useState<TemplateShape>('rounded'),[heights,setHeights]=useState<TemplateHeights>('slope');
  const {project,load}=useEditor();
  return <section className="template-picker"><h2>{t("Основа")}</h2>
    <div className="template-options" role="group" aria-label={t("Форма шаблона")}>{(['rounded','capsule','circle','oval','honeycomb'] as const).map(s=><button key={s} aria-pressed={shape===s} onClick={()=>setShape(s)}><svg viewBox="0 0 90 48" aria-hidden="true">{s==='circle'?<circle cx="45" cy="24" r="19"/>:s==='oval'?<ellipse cx="45" cy="24" rx="40" ry="19"/>:s==='honeycomb'?<>{[[45,24],[60,15],[45,6],[30,15],[30,33],[45,42],[60,33]].map(([x,y])=><polygon key={`${x}-${y}`} points={Array.from({length:6},(_,i)=>`${x+10*Math.cos(i*Math.PI/3)},${y+10*Math.sin(i*Math.PI/3)}`).join(' ')}/>)}</>:<rect x="5" y="5" width="80" height="38" rx={s==='capsule'?19:7}/>}</svg>{{rounded:t("Скруглённый"),capsule:t("Капсула"),circle:t("Круг"),oval:t("Овал"),honeycomb:t("Соты")}[s]}</button>)}</div>
    <h2 className="profile-heading">{t("Профиль высоты")}</h2><div className="template-options heights" role="group" aria-label={t("Высоты шаблона")}>{(['flat','slope','steps'] as const).map(h=><button key={h} aria-pressed={heights===h} onClick={()=>setHeights(h)}><svg viewBox="0 0 90 48" aria-hidden="true"><path d={h==='flat'?'M5 40V16H85V40Z':h==='slope'?'M5 40V30L85 6V40Z':'M5 40V30H32V22H58V14H85V40Z'}/></svg>{h==='flat'?t("Ровный"):h==='slope'?t("Горка"):t("Ступеньки")}</button>)}</div>
    <p className="hint">{shape==='circle'?t("Ø 140 мм · 3 отсека"):shape==='honeycomb'?t("170 × 176,7 мм · 7 ячеек"):t("180 × 90 мм · 3 отсека")} · {heights==='flat'?t("высота 36 мм"):heights==='slope'?t("высота 22–70 мм"):shape==='honeycomb'?t("ячейки 22, 38 и 70 мм"):t("высота 22–70 мм")}</p>
    <button className="primary template-apply" onClick={()=>{load(organizerTemplate(shape,heights,project));onApply();}}>{t("Создать по шаблону")}</button>
    <p className="hint">{t("Заменит конструкцию. Можно отменить ↶.")}</p>
    <details><summary>{t("Простые заготовки")}</summary><div className="template-options"><button onClick={()=>{load(preset('empty'));onApply();}}>{t("Пустой")}</button><button onClick={()=>{load(preset('grid'));onApply();}}>{t("4 отсека")}</button></div></details>
  </section>;
}
