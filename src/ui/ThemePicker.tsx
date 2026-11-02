import {useEffect,useId,useRef,useState} from 'react';

export type Theme='light'|'dark'|'system';
function ThemeIcon({theme}:{theme:Theme}){
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{theme==='light'?<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>:theme==='dark'?<path d="M20.4 14.3A8.4 8.4 0 0 1 9.7 3.6 8.5 8.5 0 1 0 20.4 14.3Z"/>:<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v3m-4 0h8"/></>}</svg>;
}
export function ThemePicker({theme,onChange,labels}:{theme:Theme;onChange:(theme:Theme)=>void;labels:[string,string,string,string]}){
 const [open,setOpen]=useState(false),root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),id=useId();
 useEffect(()=>{if(!open)return;const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[open]);
 const options: {value:Theme;label:string}[]=[{value:'system',label:labels[3]},{value:'light',label:labels[1]},{value:'dark',label:labels[2]}];
 const current=options.find(option=>option.value===theme)!;
 return <div ref={root} className="theme-picker" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus();e.stopPropagation();}if(open&&['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const buttons=Array.from(root.current!.querySelectorAll<HTMLButtonElement>('.theme-menu button'));const i=buttons.indexOf(document.activeElement as HTMLButtonElement);const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus();}}}>
  <button ref={trigger} type="button" className="theme-trigger" aria-label={`${labels[0]}: ${current.label}`} title={`${labels[0]}: ${current.label}`} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(v=>!v)}><ThemeIcon theme={theme}/><span aria-hidden="true" className="theme-chevron">⌄</span></button>
  {open&&<div id={id} className="theme-menu" role="group" aria-label={labels[0]}>{options.map(option=><button type="button" key={option.value} aria-pressed={option.value===theme} onClick={()=>{onChange(option.value);setOpen(false);trigger.current?.focus();}}><ThemeIcon theme={option.value}/><span>{option.label}</span>{option.value===theme&&<span className="theme-check" aria-hidden="true">✓</span>}</button>)}</div>}
 </div>;
}
