import {Children,createContext,isValidElement,useContext,useEffect,useId,useRef,useState,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {t} from '../i18n.js';
const SettingsContext=createContext<{active:string|null;open:(id:string|null)=>void;suspended:boolean}>({active:null,open:()=>{},suspended:false});
export function SettingsWorkspace({children,scope,suspended,onSelect}:{children:ReactNode;scope:string;suspended:boolean;onSelect:()=>void}){
 const [active,setActive]=useState<string|null>(null);
 useEffect(()=>setActive(null),[scope]);
 return <SettingsContext.Provider value={{active,suspended,open:id=>{setActive(id);if(id)onSelect();}}}>{children}</SettingsContext.Provider>;
}
export function SettingsPage({children}:{title:string;children:ReactNode}){return <>{children}</>;}
/** Navigation stays in the sidebar; only the selected editor appears below the model. */
export function SettingsPages({children}:{children:ReactNode}){
 const pages=Children.toArray(children).filter(isValidElement<{title:string;children:ReactNode}>),id=useId(),{active,open,suspended}=useContext(SettingsContext);
 const [host,setHost]=useState<Element|null>(null),[collapsed,setCollapsed]=useState(false),body=useRef<HTMLDivElement>(null),opener=useRef<HTMLButtonElement|null>(null);

 const index=pages.findIndex((_,i)=>active===`${id}-${i}`),visible=index>=0&&!suspended;
 useEffect(()=>{setHost(document.querySelector('.stage'));},[]);
 useEffect(()=>{setCollapsed(false);},[active]);
 useEffect(()=>{body.current?.querySelectorAll<HTMLDetailsElement>('.editing-page > details, .shell-fit-layout > details, .shell-editor > .color-palette').forEach(d=>{d.open=true;});if(body.current)body.current.scrollTop=0;},[host,active]);
 useEffect(()=>{
  if(!visible||!host||!body.current)return;
  const drawer=body.current.closest<HTMLElement>('.editing-drawer')!;
  const stage=host as HTMLElement;
  const resize=()=>stage.style.setProperty('--editor-height',`${drawer.getBoundingClientRect().height}px`);
  const observer=new ResizeObserver(resize);observer.observe(drawer);resize();
  return()=>{observer.disconnect();stage.style.removeProperty('--editor-height');};
 },[host,visible,collapsed]);
 const close=()=>{open(null);opener.current?.focus();};
 return <><nav className="settings-links" aria-label={t('Раздел настроек')}>{pages.map((p,i)=><button key={i} aria-expanded={visible&&index===i} aria-controls={`${id}-editor`} onClick={e=>{opener.current=e.currentTarget;open(active===`${id}-${i}`?null:`${id}-${i}`);}}><span>{t(p.props.title)}</span><span aria-hidden="true">›</span></button>)}</nav>{host&&createPortal(<section hidden={!visible} className={`editing-drawer${collapsed?' is-collapsed':''}`} aria-label={index>=0?t(pages[index].props.title):t('Настройки инструмента')} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();close();}}}><div className="editing-heading"><strong>{index>=0?t(pages[index].props.title):''}</strong><button aria-label={t(collapsed?'Развернуть настройки':'Свернуть настройки')} aria-expanded={!collapsed} onClick={()=>setCollapsed(v=>!v)}>{collapsed?'⌃':'⌄'}</button><button aria-label={t('Закрыть настройки раздела')} onClick={close}>×</button></div><div className="editing-body" id={`${id}-editor`} hidden={collapsed} ref={body}>{pages.map((p,i)=><div className="editing-page" hidden={index!==i} key={i}>{p.props.children}</div>)}</div></section>,host)}</>;
}
