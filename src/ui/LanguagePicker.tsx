import {useEffect,useId,useRef,useState,useSyncExternalStore} from 'react';
import {getLocale,languages,restoreLocale,setLocale,subscribeLocale,t} from '../i18n.js';
export function useLocale(){return useSyncExternalStore(subscribeLocale,getLocale,()=> 'ru');}
export function LanguagePicker(){
 const locale=useLocale();
 const [open,setOpen]=useState(false),root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),id=useId();
 useEffect(restoreLocale,[]);
 useEffect(()=>{if(!open)return;const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[open]);
 return <div className="language-picker" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus();e.stopPropagation();}if(open&&['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const buttons=Array.from(root.current!.querySelectorAll<HTMLButtonElement>('.language-menu button'));const current=buttons.indexOf(document.activeElement as HTMLButtonElement);const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(current+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus();}}}>
  <button ref={trigger} className="language-trigger" aria-label={t('Язык интерфейса')} title={t('Язык интерфейса')} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(v=>!v)}><span aria-hidden="true">◎</span> {languages.find(([key])=>key===locale)?.[1]} <span aria-hidden="true">⌄</span></button>
  {open&&<div id={id} className="language-menu" role="group" aria-label={t('Язык интерфейса')}>{languages.map(([key,name])=><button key={key} lang={key} aria-pressed={key===locale} onClick={()=>{setLocale(key);setOpen(false);trigger.current?.focus();}}><span>{name}</span><span aria-hidden="true">{key===locale?'✓':''}</span></button>)}</div>}
 </div>;
}
