import {useEffect,useRef,useState} from 'react';
import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {rimProblem} from '../accessories.js';
import {SvgControls} from './SvgControls.js';
export type PatternSurface='lid'|'shell';
export function PatternStudio({surface,onSurface,onClose}:{surface:PatternSurface;onSurface:(s:PatternSurface)=>void;onClose:()=>void}){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change),tabs=useRef<HTMLDivElement>(null),opener=useRef(document.activeElement as HTMLElement|null);
 useEffect(()=>{return()=>{if(opener.current?.isConnected)opener.current.focus();};},[]);
 const [collapsed,setCollapsed]=useState(false);
 const reason=surface==='lid'&&!p.lid?rimProblem(p):'';
 return <section className={`pattern-studio${collapsed?' is-collapsed':''}`} aria-label={t('Студия узоров')} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();onClose();}}}>
  <div className="studio-tabs" role="tablist" aria-label={t('Поверхность для SVG')} ref={tabs} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'lid':e.key==='End'?'shell':surface==='lid'?'shell':'lid';onSurface(next);tabs.current?.querySelector<HTMLButtonElement>(`#studio-tab-${next}`)?.focus();}}}>
   {(['lid','shell'] as const).map(s=><button role="tab" key={s} id={`studio-tab-${s}`} aria-selected={surface===s} aria-controls="studio-panel" tabIndex={surface===s?0:-1} onClick={()=>onSurface(s)}>{t(s==='lid'?'Крышка':'Оболочка')}</button>)}
  </div>
  <button className="studio-collapse" aria-label={t(collapsed?"Развернуть настройки":"Свернуть настройки")} aria-expanded={!collapsed} onClick={()=>setCollapsed(v=>!v)}>{collapsed?"⌃":"⌄"}</button><button className="studio-close" aria-label={t('Закрыть студию узоров')} onClick={onClose}>×</button>
  <div hidden={collapsed} id="studio-panel" role="tabpanel" aria-labelledby={`studio-tab-${surface}`}>
   {surface==='lid'&&!p.lid?<div className="studio-add-lid"><strong>{t('Рисунок для крышки')}</strong><p>{t(reason||'Добавьте крышку, чтобы выбрать рисунок.')}</p><button disabled={!!reason} onClick={()=>change(p=>editProject(p,d=>{d.lid=true;}))}>{t('+ Крышка')}</button></div>:<SvgControls key={surface} target={surface} studio/>}
  </div>
 </section>;
}
