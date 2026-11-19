import {useEffect,useRef,useState} from 'react';
import {t,getLocale} from '../i18n.js';
import type {GridfinityAssembly} from '../gridfinityAssembly.js';
import {download} from '../storage.js';
import type {BedSettings} from '../bedPacking.js';
import {drawerPitch,planDrawerPlates,suggestDrawerGrid,type DrawerGrid} from '../gridfinityDrawer.js';
type Record={id:string;name:string;project:GridfinityAssembly};
export function GridfinityProjectNameDialog({variant,bed,initialDrawer,fitted=false,onCreate,onClose}:{variant:boolean;bed:BedSettings;initialDrawer?:DrawerGrid;fitted?:boolean;onCreate:(name:string,grid?:DrawerGrid)=>void;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),[name,setName]=useState(fitted?t('Под размер ящика'):'');
 const [custom,setCustom]=useState(fitted||!!initialDrawer);
 const [dimensions,setDimensions]=useState({width:initialDrawer?.width??280,depth:initialDrawer?.depth??480,gap:initialDrawer?.gap??0});
 const [counts,setCounts]=useState({columns:initialDrawer?.columns,rows:initialDrawer?.rows});
 const [submitError,setSubmitError]=useState('');
 let grid:DrawerGrid|undefined,summary='',error='';
 if(custom)try{
   const suggestion=suggestDrawerGrid(dimensions.width,dimensions.depth,dimensions.gap);
   grid={...suggestion,columns:counts.columns??suggestion.columns,rows:counts.rows??suggestion.rows};
   const [x,y]=drawerPitch(grid),tiles=planDrawerPlates(grid,bed);
   const fmt=new Intl.NumberFormat(getLocale(),{maximumFractionDigits:3});
   summary=t('Сетка {0} × {1} · ячейка {2} × {3} мм · плит: {4}',[grid.columns,grid.rows,fmt.format(x),fmt.format(y),tiles.length]);
 }catch(e){error=(e as Error).message;}
 useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
 return <dialog ref={dialog} className="export-dialog gf-project-dialog" onCancel={onClose}><header><h2>{t(initialDrawer?'Размеры ящика':variant?'Новый вариант':'Новый проект')}</h2><button aria-label={t('Закрыть')} onClick={onClose}>×</button></header>
 <form onSubmit={e=>{e.preventDefault();if(error)return;try{onCreate(name.trim(),custom?grid:undefined);}catch(e){setSubmitError((e as Error).message);}}}>
 {!initialDrawer&&<label>{t('Название проекта')}<input autoFocus required maxLength={80} value={name} onChange={e=>setName(e.target.value)}/></label>}
 {!initialDrawer&&!variant&&<label>{t('Режим')}<select value={custom?'drawer':'standard'} onChange={e=>setCustom(e.target.value==='drawer')}><option value="standard">Gridfinity · 42 {t('мм')}</option><option value="drawer">{t('Под размер ящика')}</option></select></label>}
 {custom&&<><div className="gf-drawer-fields">
 {(['width','depth','gap'] as const).map((key,i)=><label key={key}>{t(['Ширина ящика','Длина ящика','Монтажный зазор на сторону'][i])} ({t('мм')})<input type="number" required min={key==='gap'?0:36} step="any" value={Number.isFinite(dimensions[key])?dimensions[key]:''} onChange={e=>{setDimensions({...dimensions,[key]:e.target.valueAsNumber});setCounts({columns:undefined,rows:undefined});setSubmitError('');}}/></label>)}
 {(['columns','rows'] as const).map((key,i)=><label key={key}>{t(i?'Ряды':'Столбцы')}<input type="number" min={1} step={1} value={counts[key]??grid?.[key]??''} onChange={e=>setCounts({...counts,[key]:e.target.value?Number(e.target.value):undefined})}/></label>)}
 </div><p>{summary}</p><p className="hint">{t('Стол {0} × {1} × {2} мм',[bed.length,bed.width,bed.height])}</p></>}
 {(error||submitError)&&<p role="alert">{t(error||submitError)}</p>}
 <button className="primary" disabled={(!initialDrawer&&!name.trim())||!!error}>{t('Сохранить')}</button></form></dialog>;
}
export function GridfinityProjectsDialog({projects,activeId,onOpen,onRename,onDelete,onClose}:{projects:Record[];activeId:string;onOpen:(item:Record)=>void;onRename:(id:string,name:string)=>void;onDelete:(id:string)=>void;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),[search,setSearch]=useState(''),[editing,setEditing]=useState(''),[name,setName]=useState(''),[removing,setRemoving]=useState('');
 useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
 return <dialog ref={dialog} className="export-dialog projects-dialog" onCancel={onClose} aria-label={t('Мои проекты')}><header><h2>{t('Мои проекты')}</h2><button autoFocus aria-label={t('Закрыть')} onClick={onClose}>×</button></header><p className="hint">{t('Только в этом браузере. Открытый проект сохраняется автоматически. Для резервной копии скачайте файл.')}</p><input className="project-search" aria-label={t('Поиск проектов')} placeholder={t('Поиск проектов')} value={search} onChange={e=>setSearch(e.target.value)}/>{!projects.length&&<p>{t('Здесь появятся ваши сохранённые проекты.')}</p>}<div className="project-grid">{projects.filter(v=>v.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(item=><article className={`project-card ${activeId===item.id?'current':''}`} key={item.id}><button className="project-open" onClick={()=>onOpen(item)}><strong>{item.name}</strong></button><div className="project-meta">{activeId===item.id&&<b>{t('Открыт · автосохранение')}</b>}</div>{editing===item.id?<form className="project-rename" onSubmit={e=>{e.preventDefault();if(name.trim()){onRename(item.id,name.trim());setEditing('');}}}><input autoFocus maxLength={80} aria-label={t('Новое название')} value={name} onChange={e=>setName(e.target.value)}/><button disabled={!name.trim()}>{t('Сохранить')}</button><button type="button" onClick={()=>setEditing('')}>{t('Отмена')}</button></form>:removing===item.id?<div className="project-remove"><p>{t('Удалить из библиотеки? Скачанные файлы останутся.')}</p><button className="danger" onClick={()=>{onDelete(item.id);setRemoving('');}}>{t('Удалить')}</button><button onClick={()=>setRemoving('')}>{t('Отмена')}</button></div>:<div className="project-actions"><button onClick={()=>{setEditing(item.id);setName(item.name);setRemoving('');}}>{t('Переименовать')}</button><button onClick={()=>download(JSON.stringify(item.project,null,2),`${item.name.replace(/[<>:"/\\|?*]/g,'_')}.replixgrid-gridfinity.json`,'application/json')}>{t('Файл')}</button><button onClick={()=>setRemoving(item.id)}>{t('Удалить')}</button></div>}</article>)}</div></dialog>;
}
