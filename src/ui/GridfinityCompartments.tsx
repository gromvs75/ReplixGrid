import {CompartmentDimensions} from './CompartmentDimensions.js';
import {CompartmentFit} from './CompartmentFit.js';
import {useMemo,useState} from 'react';
import {cellById,editProject,moveDivider,regions,splitCell} from '../editor.js';
import {dimensionControl,resizeCompartment} from '../compartmentDimensions.js';
import {gridfinityEditorProject,validateGridfinity,type GridfinityProject} from '../gridfinity.js';
import {t} from '../i18n.js';
import {Field} from './Field.js';

type Props={project:GridfinityProject;selected:string;onSelect:(id:string)=>void;onChange:(p:GridfinityProject)=>void;onError:(message:string)=>void;onTop:()=>void};
export function GridfinityCompartmentPanel({project:p,selected,onSelect,onChange,onError,onTop}:Props){
  const [count,setCount]=useState(2);
  const editor=useMemo(()=>gridfinityEditorProject(p),[p]),all=regions(editor),leaves=all.filter(r=>!r.cell.split),walls=all.filter(r=>r.cell.split);
  const current=all.find(r=>r.cell.id===selected)??leaves[0];
  const act=(change:()=>typeof editor)=>{try{const next={...p,root:change().root};validateGridfinity(next);onChange(next);return next;}catch(e){onError((e as Error).message);}};
  const split=(axis:'x'|'y')=>{const next=act(()=>splitCell(editor,current.cell.id,axis,count));const first=next&&cellById(next.root!,current.cell.id)?.split?.first;if(first)onSelect(first.id);};
  if(!selected)return <div><h2 className="selection-title">{t('Общий вид')}</h2><p className="body-copy">{t('Выберите стенку или отсек на модели, чтобы настроить его.')}</p></div>;
  return <div className="gf-compartment-settings">
    <h2 className="selection-title">{t(current.cell.split?'Перегородка':'Настроим отсек')}</h2>
    <div className="selected-card">{current.cell.split?t('Перегородка ')+(walls.findIndex(r=>r.cell.id===current.cell.id)+1):t('Отсек ')+(leaves.findIndex(r=>r.cell.id===current.cell.id)+1)}<strong>{current.width.toFixed(1)} × {current.depth.toFixed(1)} {t('мм')}</strong></div>
    {current.cell.split?<>
      <Field label="Положение перегородки" unit="%" value={current.cell.split.ratio*100} min={2/((current.cell.split.axis==='x'?current.width:current.depth)-p.wall)*100} max={100-2/((current.cell.split.axis==='x'?current.width:current.depth)-p.wall)*100} onChange={n=>act(()=>moveDivider(editor,current.cell.id,n/100))} manageHistory={false}/>
      <Field label="Первый отсек" value={(current.cell.split.axis==='x'?current.width-p.wall:current.depth-p.wall)*current.cell.split.ratio} min={2} max={(current.cell.split.axis==='x'?current.width:current.depth)-p.wall-2} step={.1} onChange={n=>act(()=>moveDivider(editor,current.cell.id,n/((current.cell.split!.axis==='x'?current.width:current.depth)-p.wall)))} manageHistory={false}/>
      <p className="hint">{t('Выбранную перегородку также можно потянуть на модели.')}</p>
      <button className="danger" onClick={()=>{const total=(function count(c:typeof current.cell):number{return c.split?1+count(c.split.first)+count(c.split.second):0;})(current.cell);if(total>1&&!window.confirm(t('Убрать {0} перегородки и объединить отсеки?',[total])))return;act(()=>editProject(editor,d=>{delete cellById(d.root,current.cell.id)!.split;}));onSelect(current.cell.id);}}>{t('Убрать перегородку')}{current.cell.split.first.split||current.cell.split.second.split?t(' и вложенные'):''}</button>
    </>:<>
      <CompartmentFit gridfinity={p} cellId={current.cell.id}/>
      <CompartmentDimensions project={editor} cellId={current.cell.id} onTop={onTop} onApply={next=>act(()=>next)}/>
      <p className="body-copy">{t('Большие вещи или маленькие?')}<br/>{t('Разделите пространство под них.')}</p>
      <label className="count-label">{t('Количество частей')}<select aria-label={t('Количество частей')} value={count} onChange={e=>setCount(Number(e.target.value))}>{[2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label>
      <div className="split-buttons"><button onClick={()=>split('y')}><span aria-hidden="true">◫</span>{t('Разделить')}<br/>{t('по длине')}</button><button onClick={()=>split('x')}><span aria-hidden="true">⊟</span>{t('Разделить')}<br/>{t('по ширине')}</button></div>
      <p className="hint">{t('Перегородка появится между равными отсеками. Нажмите на нее, чтобы изменить положение.')}</p>
    </>}
    <details><summary>{t('Все стенки и отсеки')}</summary><div className="element-list"><h2>{t('Перегородка')}</h2>{walls.map((r,i)=><button className={`list-row ${selected===r.cell.id?'chosen':''}`} key={r.cell.id} onClick={()=>onSelect(r.cell.id)}>{t('Перегородка ')}{i+1}</button>)}<h2>{t('Отсеки')}</h2><div className="compartment-picks">{leaves.map((r,i)=><button key={r.cell.id} className={selected===r.cell.id?'chosen':''} onClick={()=>onSelect(r.cell.id)}>{i+1}</button>)}</div></div></details>
  </div>;
}
