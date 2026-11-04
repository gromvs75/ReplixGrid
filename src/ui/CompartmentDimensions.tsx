import {useDimensionDraft,resetDimensionDraft,dimensionDraftProject,commitDimensionDraft} from '../dimensionDraft.js';
import {useEffect,useMemo} from 'react';
import {useEditor} from '../store.js';
import {t} from '../i18n.js';
import {regions} from '../editor.js';
import {compartmentMeasure,measurementContext} from '../compartmentMeasure.js';
import {dimensionControl,dimensionChanges,supportsDimensions} from '../compartmentDimensions.js';

export function CompartmentDimensions({onTop}:{onTop:()=>void}){
 const p=useEditor(s=>s.project),id=useEditor(s=>s.selection.id);
 const session=useDimensionDraft(),axis=session.axis;
 const active=session.project===p&&session.id===id;
 const c=useMemo(()=>dimensionControl(p,id,axis),[p,id,axis]);
 const draft=active?session.draft:null;
 const text=draft??(c?String(Number(c.value.toFixed(4))):'');
 useEffect(()=>{resetDimensionDraft(p,id);},[p,id]);
 useEffect(()=>()=>{resetDimensionDraft(null,'');},[]);
 const next=useMemo(()=>c?dimensionDraftProject(p,id,axis,draft):null,[p,id,axis,c,draft]);
 if(!supportsDimensions(p))return <p className="hint">{t('Точные размеры пока недоступны для круга, овала, сот и наклона.')}</p>;
 const changes=next?dimensionChanges(p,next):[];
 const beforeContext=measurementContext(p),afterContext=next?measurementContext(next):beforeContext;
 const size=(project:typeof p,r:ReturnType<typeof regions>[number],context:ReturnType<typeof measurementContext>)=>(['x','y'] as const).map(a=>Number((compartmentMeasure(project,r,a,context)?.value??0).toFixed(2))).join(' × ');
 const orderedRow=(()=>{let cell=p.root;if(!cell.split)return false;while(cell.split){if(cell.split.axis!==axis||cell.split.first.split)return false;cell=cell.split.second;}return true;})();
 const divider=c?regions(p).filter(r=>r.cell.split).findIndex(r=>r.cell.id===c.dividerId)+1:0;
 return <section className="compartment-dimensions"><h2>{t('Внутренние размеры')}</h2>
  <div className="view-tabs">{(['x','y'] as const).map(a=><button key={a} aria-pressed={axis===a} className={axis===a?'active':''} onClick={()=>{resetDimensionDraft(p,id,a);onTop();}}>{t(a==='x'?'Ширина':'Глубина')}</button>)}</div>
  {c?<><label className="field"><span className="field-top"><span>{t(axis==='x'?'Ширина':'Глубина')}</span><span className="number-wrap"><input aria-label={t('Внутренний размер')} type="number" step="any" min={c.min} max={c.max} value={text} aria-invalid={!next} onFocus={onTop} onChange={e=>{useDimensionDraft.setState({project:p,id,axis,draft:e.target.value});}}/><small>{t('мм')}</small></span></span></label>
  <p className="hint">{t('Допустимо: {0}–{1} мм',[Math.ceil(c.min*100)/100,Math.floor(c.max*100)/100])}<br/>{t('Перегородка ')}{divider} · {t(c.first?'Двигается дальняя граница.':'Двигается ближняя граница.')}</p>
  {!next&&<p role="alert" className="dimension-error">{t('Размер не оставляет достаточно места соседним отсекам.')}</p>}
  {!!changes.length&&<div className="dimension-effects" aria-live="polite">{changes.map(({number,before,after})=><div key={after.cell.id}>{t('Отсек ')}{number}: {size(p,before,beforeContext)} → <strong>{size(next!,after,afterContext)} {t('мм')}</strong></div>)}</div>}
  <button className="primary" disabled={!next||!changes.length} onClick={commitDimensionDraft}>{t('Применить')}</button></>:<p className="hint">{t('По этой оси нет перегородки. Разделите отсек или измените размер формы.')}</p>}
  {c&&orderedRow&&<p className="hint dimension-order-hint">{t('В простом ряду задавайте размеры с отсека 1 по порядку. Последнему достаётся остаток. Соседние размеры не закреплены и могут измениться.')}</p>}
  <p className="hint">{t('Размер по линии в центре отсека. У скруглённых углов места меньше; это не проверка посадки предмета.')}</p>
 </section>;
}
