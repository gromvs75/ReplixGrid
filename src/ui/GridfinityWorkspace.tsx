import {GridfinityAssemblyPanel} from './GridfinityAssemblyPanel.js';
import {GridfinityAssemblyScene} from './GridfinityAssemblyScene.js';
import {defaultGridfinityAssembly,parseGridfinityAssembly,selectedGridfinity,updateGridfinityPart,validateGridfinityAssembly,type GridfinityAssembly,type GridfinitySelection} from '../gridfinityAssembly.js';
import {WorkspaceHeader,WorkspaceModes,WorkspaceActions} from './WorkspaceHeader.js';
import {GridfinityProjectsDialog,GridfinityProjectNameDialog} from './GridfinityProjectsDialog.js';
import {ExportDialog} from './ExportDialog.js';
import {useConfiguredPrinter} from './useConfiguredPrinter.js';
import {GridfinityScene} from './GridfinityScene.js';
import {filamentPrinterKey} from '../filaments.js';
import {ColorPicker} from './ColorPalette.js';
import {GridfinityCompartmentPanel} from './GridfinityCompartments.js';
import {SlidingSegments} from './SlidingSegments.js';
import './gridfinity.css';
import {useEffect,useRef,useState} from 'react';
import {gridfinitySize,gridfinityRadii,gridfinityInnerRadiusLimit,gridfinityColor,gridfinityRegions,type GridfinityProject} from '../gridfinity.js';
import {download} from '../storage.js';
import {t,getLocale} from '../i18n.js';
import {Field,FieldHistoryContext} from './Field.js';
import {SettingsWorkspace,SettingsPages,SettingsPage} from './SettingsPages.js';
import {useLocale} from './LanguagePicker.js';
const storageKey='replixgrid.gridfinity.assembly.v1';
export function GridfinityWorkspace({onBack,onDrawer}:{onBack:()=>void;onDrawer:()=>void}){
  useLocale();
  const printer=useConfiguredPrinter(),[exportOpen,setExportOpen]=useState(false);
  const [initial]=useState(()=>{try{const saved=localStorage.getItem(storageKey)??localStorage.getItem('replixgrid.gridfinity.v1');return {project:saved?parseGridfinityAssembly(saved):defaultGridfinityAssembly(),error:''};}catch{return {project:defaultGridfinityAssembly(),error:'Не удалось восстановить Gridfinity. Сохранённые данные не изменены.'};}});
  const [a,setProject]=useState<GridfinityAssembly>(initial.project),[chosen,setChosen]=useState<GridfinitySelection>({kind:'tray',id:initial.project.trays[0]?.id??''});
  const selection=selectedGridfinity(a,chosen)?chosen:{kind:'plate' as const,id:a.plates[0].id};
  const p=selectedGridfinity(a,selection)!.project,part=selection.kind;
  const [overview,setOverview]=useState(true);
  const choose=(s:GridfinitySelection)=>{setChosen(s);if(s.id!==selection.id)setSelected(s.kind==='tray'?(gridfinityRegions(selectedGridfinity(a,s)!.project).find(r=>!r.cell.split)?.cell.id??''):'');};
  const [projectsOpen,setProjectsOpen]=useState(false);
  const [naming,setNaming]=useState<'new'|'variant'|null>(null);
  const [activeId,setActiveId]=useState(()=>{try{return (localStorage.getItem('replixgrid.gridfinity.assembly.active')??localStorage.getItem('replixgrid.gridfinity.active'))??'current';}catch{return 'current';}});
  const [projects,setProjects]=useState<{id:string;name:string;groupId?:string;project:GridfinityAssembly}[]>(()=>{try{const records=JSON.parse(localStorage.getItem('replixgrid.gridfinity.assembly.projects')??localStorage.getItem('replixgrid.gridfinity.projects')??'[]');return records.map((item:{id:string;name:string;groupId?:string;project:unknown})=>({id:item.id,name:item.name,groupId:item.groupId,project:parseGridfinityAssembly(JSON.stringify(item.project))}));}catch{return [];}});
  useEffect(()=>{if(!activeId)return;setProjects(old=>{const records=old.some(item=>item.id===activeId)?old.map(item=>item.id===activeId?{...item,project:a}:item):[...old,{id:activeId,name:t('Новый проект'),project:a}];return records;});},[a,activeId]);
  useEffect(()=>{try{localStorage.setItem('replixgrid.gridfinity.assembly.projects',JSON.stringify(projects));localStorage.setItem('replixgrid.gridfinity.assembly.active',activeId);}catch{}},[projects,activeId]);
  useEffect(()=>{if(!initial.error)try{localStorage.setItem(storageKey,JSON.stringify(initial.project));}catch{}},[]);
  const [reset,setReset]=useState(0),[showGrid,setShowGrid]=useState(false);
  const [view,setView]=useState<'3d'|'top'>('3d'),[selected,setSelected]=useState(()=>gridfinityRegions(p).find(r=>!r.cell.split)?.cell.id??'');
  const [history,setHistory]=useState<{past:GridfinityAssembly[];future:GridfinityAssembly[]}>({past:[],future:[]});
  const [error,setError]=useState(initial.error),[status,setStatus]=useState(''),[result,setResult]=useState<{key:string;stl:ArrayBuffer}|null>(null),[building,setBuilding]=useState(true);
  const current=useRef(a),gesture=useRef<GridfinityAssembly|null>(null);
  const [editing,setEditing]=useState(false);
  const file=useRef<HTMLInputElement>(null);
  const {colors:_colors,...geometry}=p,key=JSON.stringify([geometry,part]);
  const cells=gridfinityRegions(p),selectedId=selected===''?'':cells.some(r=>r.cell.id===selected)?selected:cells.find(r=>!r.cell.split)!.cell.id;
  const save=(next:GridfinityAssembly)=>{current.current=next;setProject(next);setError('');try{localStorage.setItem(storageKey,JSON.stringify(next));setStatus('Сохранено в этом браузере');}catch{setStatus('Автосохранение недоступно · скачайте проект');}};
  const openProject=(item:{id:string;project:GridfinityAssembly})=>{setActiveId(item.id);save(item.project);setChosen({kind:'plate',id:item.project.plates[0].id});setOverview(true);setSelected('');setHistory({past:[],future:[]});};
  const createProject=(name:string)=>{const id=crypto.randomUUID(),project=naming==='variant'?structuredClone(a):defaultGridfinityAssembly();const parent=projects.find(v=>v.id===activeId);setProjects(old=>[...old,{id,name,groupId:naming==='variant'?(parent?.groupId??activeId):id,project}]);openProject({id,project});setNaming(null);};
  const currentRecord=projects.find(v=>v.id===activeId),family=projects.filter(v=>(v.groupId??v.id)===(currentRecord?.groupId??activeId));
  const deleteProject=(id:string)=>{setProjects(old=>old.filter(v=>v.id!==id));if(id===activeId){const next=projects.find(v=>v.id!==id);if(next)openProject(next);else{setActiveId('');save(defaultGridfinityAssembly());setOverview(true);setHistory({past:[],future:[]});}}};
  const commitAssembly=(next:GridfinityAssembly)=>{try{validateGridfinityAssembly(next);if(JSON.stringify(next)===JSON.stringify(current.current))return;if(!activeId)setActiveId(crypto.randomUUID());if(!gesture.current){const before=current.current;setHistory(h=>({past:[...h.past,before].slice(-60),future:[]}));}save(next);}catch(e){setError((e as Error).message);}};
  const commit=(next:GridfinityProject)=>{try{commitAssembly(updateGridfinityPart(a,selection,next));}catch(e){setError((e as Error).message);}};
  const begin=()=>{if(!gesture.current){gesture.current=current.current;setEditing(true);}};
  const end=()=>{const before=gesture.current;gesture.current=null;setEditing(false);if(before&&JSON.stringify(before)!==JSON.stringify(current.current))setHistory(h=>({past:[...h.past,before].slice(-60),future:[]}));};
  const undo=()=>{const previous=history.past.at(-1);if(previous){setHistory({past:history.past.slice(0,-1),future:[a,...history.future]});save(previous);}};
  const redo=()=>{const next=history.future[0];if(next){setHistory({past:[...history.past,a],future:history.future.slice(1)});save(next);}};
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.target as HTMLElement).matches('input,textarea,select'))return;if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[a,history]);
  useEffect(()=>{window.addEventListener('pointerup',end);window.addEventListener('blur',end);return()=>{window.removeEventListener('pointerup',end);window.removeEventListener('blur',end);};},[]);
  useEffect(()=>{
    setBuilding(true);
    if(editing||overview)return;
    const worker=new Worker('/kernel/worker-gridfinity-release-20261116.js',{type:'module'});
    const timeout=setTimeout(()=>{worker.terminate();setBuilding(false);setError('Не удалось построить Gridfinity. Уменьшите размер и повторите.');},60000);
    worker.onmessage=({data})=>{clearTimeout(timeout);setBuilding(false);if(data.error){setError(data.error);return;}setResult({key,stl:data.stl});};
    worker.onerror=()=>{clearTimeout(timeout);setBuilding(false);setError('Не удалось построить Gridfinity. Уменьшите размер и повторите.');};
    worker.postMessage({project:p,part});
    return()=>{clearTimeout(timeout);worker.terminate();};
  },[key,editing,overview]);
  const printerKey=filamentPrinterKey(printer);
  const radii=gridfinityRadii(p),radiusLimit=gridfinityInnerRadiusLimit(p);
  const size=gridfinitySize(p,part),valid=result?.key===key&&!building;
  const change=(field:keyof GridfinityProject)=>(value:number)=>commit({...p,[field]:value});
  return <FieldHistoryContext.Provider value={{begin,end}}><SettingsWorkspace scope={selection.id} suspended={false} onSelect={()=>{}}><div className="gf-app"><WorkspaceHeader navigation={<><WorkspaceModes mode="gridfinity" onChange={mode=>{if(mode==='organizer')onBack();if(mode==='drawer')onDrawer();}}/><div className="variant-switcher"><select aria-label={t('Вариант проекта')} value={activeId} onChange={e=>{const item=projects.find(v=>v.id===e.target.value);if(item){setActiveId(item.id);save(item.project);setHistory({past:[],future:[]});}}}>{!activeId&&<option value="">{t('Новый проект')}</option>}{family.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select><button onClick={()=>setNaming('variant')}>{t('+ Вариант')}</button></div></>} status={status} actions={<WorkspaceActions onNew={()=>setNaming('new')} onProjects={()=>setProjectsOpen(true)} onOpen={()=>file.current?.click()} onSave={()=>download(JSON.stringify(a,null,2),'Gridfinity.replixgrid-gridfinity.json','application/json')} onDownload={()=>setExportOpen(true)} disabled={!overview&&!valid}/>}><input ref={file} hidden type="file" accept=".json" onChange={async e=>{const input=e.currentTarget,f=input.files?.[0];if(!f)return;try{if(f.size>5000000)throw Error('Файл слишком большой');const imported=parseGridfinityAssembly(await f.text());setActiveId(crypto.randomUUID());save(imported);setHistory({past:[],future:[]});}catch{setError('Некорректный проект Gridfinity.');}input.value='';}}/></WorkspaceHeader>
    <main className={`gf-layout${part==='tray'?' gf-with-selection':''}`}><aside className="gf-controls"><h1>{t('Совместимость с Gridfinity')}</h1><p>{t('Отдельный режим · сетка 42 мм')}</p><GridfinityAssemblyPanel assembly={a} selection={selection} onSelect={choose} onChange={commitAssembly} onError={setError}/><SlidingSegments equal className="mode-switch" label={t('Режим просмотра')}><button aria-pressed={overview} onClick={()=>setOverview(true)}>{t('Весь комплект')}</button><button aria-pressed={!overview} onClick={()=>setOverview(false)}>{t('Редактировать деталь')}</button></SlidingSegments>
      <SettingsPages>
        <SettingsPage title="Размеры"><div className="gf-dimensions"><div className="dimension-fields">
          <Field label="Длина" value={size[0]} min={part==='tray'?41.5:42} max={part==='tray'?335.5:336} step={42} onChange={n=>change('columns')(Math.round((n+(part==='tray'?.5:0))/42))} manageHistory={false}/>
          <Field label="Ширина" value={size[1]} min={part==='tray'?41.5:42} max={part==='tray'?335.5:336} step={42} onChange={n=>change('rows')(Math.round((n+(part==='tray'?.5:0))/42))} manageHistory={false}/>
          {part==='tray'&&<Field label="Высота" value={p.heightUnits*7} min={14} max={140} step={7} onChange={n=>change('heightUnits')(Math.round(n/7))} manageHistory={false}/>}
          </div>
          {part==='tray'&&<Field label="Толщина стенки" value={p.wall} min={1.2} max={3} step={.1} onChange={change('wall')} manageHistory={false}/>}
          <p className="hint">{t('Длина и ширина привязаны к сетке 42 мм. Между лотками остаётся зазор 0,5 мм.')}</p>
          {part==='tray'&&<p className="hint">{t('Полная высота с опорами: {0} мм. Глубина внутри: {1} мм. Шаг изменения — 7 мм.',[p.heightUnits*7,p.heightUnits*7-7])}</p>}
        </div></SettingsPage>
        {part==='plate'&&<SettingsPage title="Посадка"><div className="gf-dimensions">
          <Field label="Зазор плиты на сторону" value={p.clearance} min={.1} max={.2} step={.01} onChange={change('clearance')} manageHistory={false}/>
          <p className="hint">{t('Больше зазор — свободнее посадка. Меняются только гнёзда плиты; размеры опор лотка остаются прежними.')}</p>
        </div></SettingsPage>}
        {part==='tray'&&<SettingsPage title="Радиус углов"><div className="gf-dimensions">
          <div className="dimension-fields gf-radius-fields">
            <Field label="Внешний радиус" value={radii.outerRadius} min={0} max={3.75} step={.05} onChange={change('outerRadius')} manageHistory={false}/>
            <Field label="Радиус внутри отсеков" value={Math.min(radii.innerRadius,radiusLimit)} min={0} max={Math.floor(radiusLimit*100)/100} step={.05} onChange={change('innerRadius')} manageHistory={false}/>
          </div>
          <p className="hint">{t('Опоры сохраняют стандартный профиль. Внутренний радиус ограничен размером отсека; толщина стенок сохраняется.')}</p>
        </div></SettingsPage>}
        <SettingsPage title={part==='tray'?'Цвет органайзера':'Цвет плиты'}><ColorPicker printerKey={printerKey} label={t(part==='tray'?'Цвет органайзера':'Цвет плиты')} color={gridfinityColor(p,part)} onChange={color=>commit({...p,colors:{...p.colors,[part]:color}})}/></SettingsPage>
      </SettingsPages>
      <p className="gf-size">{size.map(n=>new Intl.NumberFormat(getLocale(),{maximumFractionDigits:2}).format(n)).join(' × ')} {t('мм')}</p><p className="hint">{t('Габариты детали. Проверьте размер стола в слайсере; автоматического разделения нет.')}</p>
      <p className="gf-fit">{t('Посадка требует пробной печати. Верхний бортик для штабелирования, магниты и винты пока не предусмотрены.')}</p><p className="hint">{t('Начните с лотка и плиты 1 × 1. Проверьте посадку с вашими деталями Gridfinity при масштабе 100%.')}</p>
      <a href="/guides/gridfinity.html" target="_blank" rel="noreferrer">{t('Инструкция и лицензии')}</a><small>Gridfinity — Zack Freedman / Voidstar Lab LLC · <a href="/licenses/GRIDFINITY-MIT.txt" target="_blank" rel="noreferrer">MIT</a></small>
    </aside><section className="stage gf-preview" aria-label={t('Предпросмотр Gridfinity')} aria-busy={building}><div className="stage-top"><div className="viewport-actions">{<div className="view-tabs" role="group" aria-label={t('Вид')}><button className={view==='3d'?'active':''} aria-pressed={view==='3d'} onClick={()=>setView('3d')}>{t('◈ Объем')}</button><button className={view==='top'?'active':''} aria-pressed={view==='top'} onClick={()=>setView('top')}>{t('▦ Сверху')}</button><button aria-pressed={showGrid} onClick={()=>setShowGrid(v=>!v)}>{t('▦ Сетка')}</button></div>}<div className="tools"><button aria-label={t('Отменить')} disabled={!history.past.length} onClick={undo}>↶</button><button aria-label={t('Повторить')} disabled={!history.future.length} onClick={redo}>↷</button><button aria-label={t('Вернуть камеру')} onClick={()=>setReset(v=>v+1)}>⌖</button></div></div></div><div className="canvas-wrap">{overview?<GridfinityAssemblyScene selectedCell={selectedId} onSelectCell={setSelected} onEditTray={commit} assembly={a} selection={selection} onSelect={choose} onChange={commitAssembly} view={view} reset={reset} showGrid={showGrid}/>:result?<GridfinityScene project={p} part={part} stl={result.stl} selected={selectedId} view={view} reset={reset} showGrid={showGrid} busy={!valid} onSelect={setSelected} onChange={commit}/>:<p role="status">{building?t('Подготовка…'):t('Нет предпросмотра')}</p>}</div><p className="gf-preview-caption">{t(overview?'Выберите лоток: отсеки настраиваются справа. Для перемещения потяните внешнюю стенку лотка. Плита перемещается вместе с лотками.':part==='tray'?'Выбранную перегородку также можно потянуть на модели.':'Вращайте модель, чтобы проверить нижние опоры и посадочные гнёзда.')}</p></section>{part==='tray'&&<aside className="right-panel gf-selection"><GridfinityCompartmentPanel key={selection.id} project={p} selected={selectedId} onSelect={setSelected} onChange={commit} onError={setError} onTop={()=>setView('top')}/></aside>}</main>{error&&<div className="gf-error" role="alert">{t(error)}<button aria-label={t('Закрыть')} onClick={()=>setError('')}>×</button></div>}
  {projectsOpen&&<GridfinityProjectsDialog projects={projects} activeId={activeId} onOpen={item=>{openProject(item);setProjectsOpen(false);}} onRename={(id,name)=>setProjects(old=>old.map(v=>v.id===id?{...v,name}:v))} onDelete={deleteProject} onClose={()=>setProjectsOpen(false)}/>}
  {naming&&<GridfinityProjectNameDialog variant={naming==='variant'} onCreate={createProject} onClose={()=>setNaming(null)}/>}

  {exportOpen&&<ExportDialog initial={overview?'all':part} project={printer} fileName="Gridfinity" source={{workerUrl:'/kernel/worker-gridfinity-release-20261116.js',request:{assembly:a,selection},targets:[{value:'all',label:'Весь комплект'},{value:'kit',label:'Плита и её лотки'},{value:'plate',label:'Базовая плита'},...(part==='tray'?[{value:'tray' as const,label:'Выбранный лоток'}]:[])],archive:true}} onClose={()=>setExportOpen(false)} onDone={message=>{setExportOpen(false);setStatus(message);}}/>}
  </div></SettingsWorkspace></FieldHistoryContext.Provider>;
}
