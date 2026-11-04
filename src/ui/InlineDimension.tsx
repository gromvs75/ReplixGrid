import {useEffect,useRef} from 'react';
import {t} from '../i18n.js';

export function InlineDimension({label,value,prefix='',editable=true,editing,draft,min,max,valid,onStart,onDraft,onCommit,onCancel}:{
 label:string;value:number;prefix?:string;editable?:boolean;editing:boolean;draft:string;min:number;max:number;valid:boolean;
 onStart:()=>void;onDraft:(s:string)=>void;onCommit:()=>boolean;onCancel:()=>void;
}){
 const input=useRef<HTMLInputElement>(null),button=useRef<HTMLButtonElement>(null),finished=useRef(false);
 useEffect(()=>{if(editing){finished.current=false;input.current?.focus();input.current?.select();}},[editing]);
 const focus=()=>requestAnimationFrame(()=>button.current?.focus());
 const finish=()=>{if(!valid)return false;finished.current=true;if(onCommit())return true;finished.current=false;return false;};
 const commit=()=>{if(finish())focus();};
 const cancel=()=>{finished.current=true;onCancel();focus();};
 const latest=useRef({finish,onCancel});latest.current={finish,onCancel};
 useEffect(()=>{
  if(!editing)return;
  // Commit before a canvas pointer handler selects a different object.
  const outside=(e:PointerEvent)=>{if(!finished.current&&!input.current?.closest('form')?.contains(e.target as Node)){if(!latest.current.finish()){finished.current=true;latest.current.onCancel();}}};
  document.addEventListener('pointerdown',outside,true);
  return()=>document.removeEventListener('pointerdown',outside,true);
 },[editing]);
 return <div className="inline-dimension" onPointerDown={e=>e.stopPropagation()} onPointerUp={e=>e.stopPropagation()} onClick={e=>e.stopPropagation()} onDoubleClick={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()} onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'&&editing){e.preventDefault();cancel();}}}>
  {editing?<form noValidate className="inline-dimension-form" onSubmit={e=>{e.preventDefault();commit();}} onBlur={e=>{if(!finished.current&&!e.currentTarget.contains(e.relatedTarget as Node|null)){if(!finish()){finished.current=true;onCancel();}}}}>
   <div className="inline-dimension-row"><input ref={input} aria-label={label} aria-invalid={!valid} title={t('Допустимо: {0}–{1} мм',[Math.ceil(min*100)/100,Math.floor(max*100)/100])} type="number" step="any" min={min} max={max} value={draft} onChange={e=>onDraft(e.target.value)}/><small>{t('мм')}</small></div>
  </form>:<button ref={button} type="button" className="dimension-label" aria-label={label} title={editable?t('Нажмите на размер для изменения'):t('По этой оси нет перегородки. Разделите отсек или измените размер формы.')} disabled={!editable} onClick={onStart}>{prefix}{value.toFixed(2)} {t('мм')}</button>}
 </div>;
}
