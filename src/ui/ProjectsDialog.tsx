import {useEffect,useId,useRef,useState} from 'react';
import {getLocale,t} from '../i18n.js';
import {footprintContour,honeyCells} from '../footprint.js';
import {resolveWalls,type Project} from '../model.js';
import {deleteProject,download,listProjects,renameProject,type SavedProject} from '../storage.js';

function Thumbnail({project:p}:{project:Project}){
 const clip=useId(),outline=footprintContour(p).map(v=>v.join(',')).join(' ');
 return <svg className="project-thumbnail" viewBox={`-8 -8 ${p.width+16} ${p.depth+16}`} role="img" aria-label={t('Схема отсеков сверху')}>
  <defs><clipPath id={clip}><polygon points={outline}/></clipPath></defs>
  <polygon points={outline} fill={p.colors?.organizer??'#a5c7b9'} stroke="#42685b" strokeWidth={p.wallThickness}/>
  <g clipPath={`url(#${clip})`} fill="none" stroke="#42685b" strokeWidth={p.wallThickness}>
   {p.footprint==='honeycomb'?honeyCells(p).map((c,i)=><polygon key={i} points={c.map(v=>v.join(',')).join(' ')}/>):resolveWalls(p).filter(w=>!['front','back','left','right'].includes(w.id)).map(w=><path key={w.id} d={`M${w.x} ${w.y} ${w.axis==='x'?'h':'v'}${w.length}`}/>)}
  </g>
 </svg>;
}
export function ProjectsDialog({activeId,onSave,onOpen,onDelete,onClose}:{activeId:string|null;onSave:(name:string)=>Promise<void>;onOpen:(record:SavedProject)=>Promise<void>;onDelete:(id:string)=>void;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),[items,setItems]=useState<SavedProject[]>([]),[name,setName]=useState(''),[search,setSearch]=useState(''),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[error,setError]=useState(''),[editing,setEditing]=useState<string|null>(null),[newName,setNewName]=useState(''),[removing,setRemoving]=useState<string|null>(null);
 const refresh=async()=>setItems(await listProjects());
 useEffect(()=>{dialog.current?.showModal();let alive=true;listProjects().then(v=>{if(alive)setItems(v);}).catch(()=>alive&&setError('Не удалось открыть библиотеку. Скачайте проект в файл.')).finally(()=>alive&&setLoading(false));return()=>{alive=false;dialog.current?.close();};},[]);
 const run=async(fn:()=>Promise<void>)=>{setBusy(true);setError('');try{await fn();}catch{setError('Не удалось сохранить изменения. Скачайте проект в файл.');}finally{setBusy(false);}};
 const visible=items.filter(v=>v.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
 return <dialog ref={dialog} className="export-dialog projects-dialog" aria-labelledby="projects-title" onCancel={e=>{e.preventDefault();if(!busy)onClose();}}>
  <header><h2 id="projects-title">{t('Мои проекты')}</h2><button autoFocus disabled={busy} aria-label={t('Закрыть')} onClick={onClose}>×</button></header>
  <p className="hint">{t('Только в этом браузере. Открытый проект сохраняется автоматически. Для резервной копии скачайте файл.')}</p>
  <form className="project-save" onSubmit={e=>{e.preventDefault();if(name.trim())void run(async()=>{await onSave(name);setName('');await refresh();});}}>
   <input aria-label={t('Название проекта')} placeholder={t('Название проекта')} maxLength={80} value={name} disabled={busy} onChange={e=>setName(e.target.value)}/>
   <button className="primary" disabled={busy||!name.trim()}>{t('Сохранить копию')}</button>
  </form>
  {error&&<p role="alert" className="validation-error">{t(error)}</p>}
  <input className="project-search" aria-label={t('Поиск проектов')} placeholder={t('Поиск проектов')} value={search} onChange={e=>setSearch(e.target.value)}/>
  {loading?<p role="status">{t('Загрузка…')}</p>:!items.length?<p className="projects-empty">{t('Здесь появятся ваши модели. Введите название и сохраните текущую конструкцию.')}</p>:!visible.length?<p>{t('Проекты не найдены')}</p>:<div className="project-grid">{visible.map(item=><article key={item.id} className={`project-card ${activeId===item.id?'current':''}`}>
   <button className="project-open" disabled={busy} aria-label={t('Открыть проект: {0}',[item.name])} onClick={()=>void run(()=>onOpen(item))}><Thumbnail project={item.project}/><strong>{item.name}</strong></button>
   <div className="project-meta"><span>{item.project.width} × {item.project.depth} × {item.project.height} {t('мм')}</span><time dateTime={new Date(item.updatedAt).toISOString()}>{new Intl.DateTimeFormat(getLocale(),{dateStyle:'short',timeStyle:'short'}).format(item.updatedAt)}</time>{activeId===item.id&&<b>{t('Открыт · автосохранение')}</b>}</div>
   {editing===item.id?<form className="project-rename" onSubmit={e=>{e.preventDefault();if(newName.trim())void run(async()=>{await renameProject(item.id,newName);setEditing(null);await refresh();});}}><input autoFocus aria-label={t('Новое название')} maxLength={80} value={newName} onChange={e=>setNewName(e.target.value)}/><button disabled={busy||!newName.trim()}>{t('Сохранить')}</button><button type="button" disabled={busy} onClick={()=>setEditing(null)}>{t('Отмена')}</button></form>:removing===item.id?<div className="project-remove"><p>{t('Удалить из библиотеки? Скачанные файлы останутся.')}</p><button disabled={busy} className="danger" onClick={()=>void run(async()=>{await deleteProject(item.id);onDelete(item.id);setRemoving(null);await refresh();})}>{t('Удалить')}</button><button disabled={busy} onClick={()=>setRemoving(null)}>{t('Отмена')}</button></div>:<div className="project-actions"><button disabled={busy} onClick={()=>{setEditing(item.id);setNewName(item.name);setRemoving(null);}}>{t('Переименовать')}</button><button disabled={busy} onClick={()=>download(JSON.stringify(item.project,null,2),`${item.name.replace(/[<>:"/\\|?*]/g,'_')}.replixgrid.json`,'application/json')}>{t('Файл')}</button><button disabled={busy} onClick={()=>{setRemoving(item.id);setEditing(null);}}>{t('Удалить')}</button></div>}
  </article>)}</div>}
 </dialog>;
}
