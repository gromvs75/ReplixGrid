import {GridfinityAssemblyPanel} from './GridfinityAssemblyPanel.js';
import {GridfinityAssemblyScene} from './GridfinityAssemblyScene.js';
import {fitDrawerGrid,defaultGridfinityAssembly,parseGridfinityAssembly,selectedGridfinity,updateGridfinityPart,validateGridfinityAssembly,type GridfinityAssembly,type GridfinitySelection} from '../gridfinityAssembly.js';
import {WorkspaceHeader,WorkspaceModes,WorkspaceActions} from './WorkspaceHeader.js';
import {GridfinityProjectsDialog,GridfinityProjectNameDialog} from './GridfinityProjectsDialog.js';
import {ExportDialog} from './ExportDialog.js';
import {configuredBedSettings} from '../printerBed.js';
import type {DrawerGrid} from '../gridfinityDrawer.js';
import {useConfiguredPrinter} from './useConfiguredPrinter.js';
import {GridfinityScene} from './GridfinityScene.js';
import {filamentPrinterKey} from '../filaments.js';
import {ColorPicker} from './ColorPalette.js';
import {GridfinityCompartmentPanel} from './GridfinityCompartments.js';
import {SlidingSegments} from './SlidingSegments.js';
import './gridfinity.css';
import {useEffect,useRef,useState} from 'react';
import {gridfinityInscription} from '../gridfinityLabel.js';
import {gridPitch,validateGridfinity,hasGridfinityLid,gridfinitySize,gridfinityNotch,gridfinityPairedNotches,gridfinityRadii,gridfinityInnerRadiusLimit,gridfinityColor,gridfinityRegions,type GridfinityProject} from '../gridfinity.js';
import {download} from '../storage.js';
import {t,getLocale} from '../i18n.js';
import {CutoutShapePicker} from './CutoutShapePicker.js';
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
  const [showLids,setShowLids]=useState(true);
  const [overview,setOverview]=useState(true);
  const choose=(s:GridfinitySelection)=>{setChosen(s);if(s.id!==selection.id)setSelected(s.kind==='tray'&&selectedGridfinity(a,s)?(gridfinityRegions(selectedGridfinity(a,s)!.project).find(r=>!r.cell.split)?.cell.id??''):'root');};
  const [projectsOpen,setProjectsOpen]=useState(false);
  const [naming,setNaming]=useState<'new'|'variant'|'drawer'|'resize'|null>(null);
  const [activeId,setActiveId]=useState(()=>{try{return (localStorage.getItem('replixgrid.gridfinity.assembly.active')??localStorage.getItem('replixgrid.gridfinity.active'))??'current';}catch{return 'current';}});
  const [projects,setProjects]=useState<{id:string;name:string;groupId?:string;project:GridfinityAssembly}[]>(()=>{try{const records=JSON.parse(localStorage.getItem('replixgrid.gridfinity.assembly.projects')??localStorage.getItem('replixgrid.gridfinity.projects')??'[]');return records.map((item:{id:string;name:string;groupId?:string;project:unknown})=>({id:item.id,name:item.name,groupId:item.groupId,project:parseGridfinityAssembly(JSON.stringify(item.project))}));}catch{return [];}});
  useEffect(()=>{if(!activeId)return;setProjects(old=>{const records=old.some(item=>item.id===activeId)?old.map(item=>item.id===activeId?{...item,project:a}:item):[...old,{id:activeId,name:t('Новый проект'),project:a}];return records;});},[a,activeId]);
  useEffect(()=>{try{localStorage.setItem('replixgrid.gridfinity.assembly.projects',JSON.stringify(projects));localStorage.setItem('replixgrid.gridfinity.assembly.active',activeId);}catch{}},[projects,activeId]);
  useEffect(()=>{if(!initial.error)try{localStorage.setItem(storageKey,JSON.stringify(initial.project));}catch{}},[]);
  const [reset,setReset]=useState(0),[showGrid,setShowGrid]=useState(false);
  const [view,setView]=useState<'3d'|'top'>('3d'),[selected,setSelected]=useState(()=>gridfinityRegions(p).find(r=>!r.cell.split)?.cell.id??'');
  const [history,setHistory]=useState<{past:GridfinityAssembly[];future:GridfinityAssembly[]}>({past:[],future:[]});
  const [error,setError]=useState(initial.error),[status,setStatus]=useState(''),[result,setResult]=useState<{key:string;stl:ArrayBuffer;lid?:ArrayBuffer;tag?:ArrayBuffer}|null>(null),[building,setBuilding]=useState(true);
  const current=useRef(a),gesture=useRef<GridfinityAssembly|null>(null);
  const [editing,setEditing]=useState(false);
  const file=useRef<HTMLInputElement>(null);
  const {colors:_colors,...geometry}=p,key=JSON.stringify([geometry,part]);
  const cells=gridfinityRegions(p),selectedId=selected===''?'':cells.some(r=>r.cell.id===selected)?selected:cells.find(r=>!r.cell.split)!.cell.id;
  const save=(next:GridfinityAssembly)=>{current.current=next;setProject(next);setError('');try{localStorage.setItem(storageKey,JSON.stringify(next));setStatus('Сохранено в этом браузере');}catch{setStatus('Автосохранение недоступно · скачайте проект');}};
  const openProject=(item:{id:string;project:GridfinityAssembly})=>{setActiveId(item.id);save(item.project);setChosen({kind:'plate',id:item.project.plates[0].id});setOverview(true);setSelected('');setHistory({past:[],future:[]});};
  const createProject=(name:string,grid?:DrawerGrid)=>{
    if(naming==='resize'&&grid){commitAssembly(fitDrawerGrid(grid,configuredBedSettings(printer),a));setNaming(null);return;}
    const id=crypto.randomUUID(),project=naming==='variant'?structuredClone(a):grid?fitDrawerGrid(grid,configuredBedSettings(printer)):defaultGridfinityAssembly();const parent=projects.find(v=>v.id===activeId);setProjects(old=>[...old,{id,name,groupId:naming==='variant'?(parent?.groupId??activeId):id,project}]);openProject({id,project});setNaming(null);};
  const currentRecord=projects.find(v=>v.id===activeId),family=projects.filter(v=>(v.groupId??v.id)===(currentRecord?.groupId??activeId));
  const deleteProject=(id:string)=>{setProjects(old=>old.filter(v=>v.id!==id));if(id===activeId){const next=projects.find(v=>v.id!==id);if(next)openProject(next);else{setActiveId('');save(defaultGridfinityAssembly());setOverview(true);setHistory({past:[],future:[]});}}};
  const commitAssembly=(next:GridfinityAssembly)=>{try{validateGridfinityAssembly(next);if(JSON.stringify(next)===JSON.stringify(current.current))return;if(!activeId)setActiveId(crypto.randomUUID());if(!gesture.current){const before=current.current;setHistory(h=>({past:[...h.past,before].slice(-60),future:[]}));}save(next);}catch(e){setError((e as Error).message);}};
  const commit=(next:GridfinityProject)=>{try{commitAssembly(updateGridfinityPart(a,selection,next));}catch(e){setError((e as Error).message);}};
  const openExport=()=>{
    if(a.drawer){
      const bed=configuredBedSettings(printer);
      const fits=a.plates.every(plate=>{
        const [width,depth,height]=gridfinitySize(plate.project,'plate');
        return height<=bed.height&&((width<=bed.length-4&&depth<=bed.width-4)||(depth<=bed.length-4&&width<=bed.width-4));
      });
      if(!fits)try{commitAssembly(fitDrawerGrid(a.drawer,bed,a));}catch(e){setError((e as Error).message);return;}
    }
    setExportOpen(true);
  };
  const changeLabelSurface=(next:GridfinityProject)=>{
    if(next.label?.size!==undefined){
      const automatic={...next,label:{...next.label,size:undefined}};
      try{
        const maximum=gridfinityInscription(automatic).maxSize;
        next={...next,label:{...next.label,size:Math.min(next.label.size,Math.floor((maximum+.00005)*10)/10)}};
      }catch(error){setError((error as Error).message);return;}
    }
    commit(next);
  };
  const begin=()=>{if(!gesture.current){gesture.current=current.current;setEditing(true);}};
  const end=()=>{const before=gesture.current;gesture.current=null;setEditing(false);if(before&&JSON.stringify(before)!==JSON.stringify(current.current))setHistory(h=>({past:[...h.past,before].slice(-60),future:[]}));};
  const undo=()=>{const previous=history.past.at(-1);if(previous){setHistory({past:history.past.slice(0,-1),future:[a,...history.future]});save(previous);}};
  const redo=()=>{const next=history.future[0];if(next){setHistory({past:[...history.past,a],future:history.future.slice(1)});save(next);}};
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.target as HTMLElement).matches('input,textarea,select'))return;if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[a,history]);
  useEffect(()=>{window.addEventListener('pointerup',end);window.addEventListener('blur',end);return()=>{window.removeEventListener('pointerup',end);window.removeEventListener('blur',end);};},[]);
  useEffect(()=>{
    setBuilding(true);
    if(editing||overview)return;
    const worker=new Worker('/kernel/worker-gridfinity-release-20261119.js',{type:'module'});
    const timeout=setTimeout(()=>{worker.terminate();setBuilding(false);setError('Не удалось построить Gridfinity. Уменьшите размер и повторите.');},60000);
    worker.onmessage=({data})=>{clearTimeout(timeout);setBuilding(false);if(data.error){setError(data.error);return;}setResult({key,stl:data.stl,lid:data.lid,tag:data.tag});};
    worker.onerror=()=>{clearTimeout(timeout);setBuilding(false);setError('Не удалось построить Gridfinity. Уменьшите размер и повторите.');};
    worker.postMessage({project:p,part});
    return()=>{clearTimeout(timeout);worker.terminate();};
  },[key,editing,overview]);
  const printerKey=filamentPrinterKey(printer);
  const radii=gridfinityRadii(p),radiusLimit=gridfinityInnerRadiusLimit(p);
  const inscription=p.label?gridfinityInscription(p):null;
  const [px,py]=gridPitch(p), gap=part==='tray'?.5:0;
  const gridSummary=a.drawer?t('Сетка {0} × {1} · ячейка {2} × {3} мм · плит: {4}',[a.drawer.columns,a.drawer.rows,...gridPitch(a.plates[0].project).map(n=>new Intl.NumberFormat(getLocale(),{maximumFractionDigits:3}).format(n)),a.plates.length]):undefined;
  const notch=gridfinityNotch(p),paired=gridfinityPairedNotches(p);
  type PairedNotches=NonNullable<GridfinityProject['pairedNotches']>;
  const setPaired=(patch:Partial<PairedNotches>)=>commit({...p,pairedNotches:{walls:paired.walls,...p.pairedNotches,...patch}});
  const size=gridfinitySize(p,part),valid=result?.key===key&&!building;
  const change=(field:keyof GridfinityProject)=>(value:number)=>commit({...p,[field]:value});
  return <FieldHistoryContext.Provider value={{begin,end}}><SettingsWorkspace scope={selection.id} suspended={false} onSelect={()=>{}}><div className="gf-app"><WorkspaceHeader navigation={<><WorkspaceModes mode="gridfinity" onChange={mode=>{if(mode==='organizer')onBack();if(mode==='drawer')onDrawer();}}/><div className="variant-switcher"><select aria-label={t('Вариант проекта')} value={activeId} onChange={e=>{const item=projects.find(v=>v.id===e.target.value);if(item){setActiveId(item.id);save(item.project);setHistory({past:[],future:[]});}}}>{!activeId&&<option value="">{t('Новый проект')}</option>}{family.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select><button onClick={()=>setNaming('variant')}>{t('+ Вариант')}</button></div></>} status={status} actions={<WorkspaceActions onNew={()=>setNaming('new')} onProjects={()=>setProjectsOpen(true)} onOpen={()=>file.current?.click()} onSave={()=>download(JSON.stringify(a,null,2),'Gridfinity.replixgrid-gridfinity.json','application/json')} onDownload={openExport} disabled={!overview&&!valid}/>}><input ref={file} hidden type="file" accept=".json" onChange={async e=>{const input=e.currentTarget,f=input.files?.[0];if(!f)return;try{if(f.size>5000000)throw Error('Файл слишком большой');const imported=parseGridfinityAssembly(await f.text());setActiveId(crypto.randomUUID());save(imported);setHistory({past:[],future:[]});}catch{setError('Некорректный проект Gridfinity.');}input.value='';}}/></WorkspaceHeader>
    <main className={`gf-layout scene-workspace${part==='tray'?' gf-with-selection':''}`}><aside className="gf-controls"><h1>{t(a.drawer?'Под размер ящика':'Совместимость с Gridfinity')}</h1><p>{gridSummary??t('Отдельный режим · сетка 42 мм')}</p><button onClick={()=>setNaming(a.drawer?'resize':'drawer')}>{t(a.drawer?'Размеры ящика':'Под размер ящика')}</button><GridfinityAssemblyPanel assembly={a} selection={selection} onSelect={choose} onChange={commitAssembly} onError={setError}/><SlidingSegments equal className="mode-switch" label={t('Режим просмотра')}><button aria-pressed={overview} onClick={()=>setOverview(true)}>{t('Весь комплект')}</button><button aria-pressed={!overview} onClick={()=>setOverview(false)}>{t('Редактировать деталь')}</button></SlidingSegments>
      <SettingsPages>
        {part==='plate'&&<SettingsPage title="Тип плиты"><div className="gf-dimensions">
          <SlidingSegments equal className="mode-switch" label={t('Тип плиты')}>
            <button aria-pressed={p.plateStyle!=='lattice'} onClick={()=>commit({...p,plateStyle:'solid'})}>{t('Сплошное дно')}</button>
            <button aria-pressed={p.plateStyle==='lattice'} onClick={()=>commit({...p,plateStyle:'lattice'})}>{t('Решётчатая')}</button>
          </SlidingSegments>
          <p className="hint">{t('Сквозные отверстия уменьшают расход материала. Высота плиты и посадка лотков одинаковы в обоих вариантах.')}</p>
        </div></SettingsPage>}
        {(!a.drawer||part==='tray')&&<SettingsPage title="Размеры"><div className="gf-dimensions"><div className="dimension-fields">
          <Field label={a.drawer?'Ширина':'Длина'} value={size[0]} min={px-gap} max={8*px-gap} step={px} onChange={n=>change('columns')(Math.round((n+gap)/px))} manageHistory={false}/>
          <Field label={a.drawer?'Длина':'Ширина'} value={size[1]} min={py-gap} max={8*py-gap} step={py} onChange={n=>change('rows')(Math.round((n+gap)/py))} manageHistory={false}/>
          {part==='tray'&&<Field label="Высота" value={p.heightUnits*7} min={14} max={140} step={.1} onChange={n=>change('heightUnits')(n/7)} manageHistory={false}/>}
          </div>
          {part==='tray'&&<Field label="Толщина стенки" value={p.wall} min={1.2} max={3} step={.1} onChange={change('wall')} manageHistory={false}/>}
          {!a.drawer&&<p className="hint">{t('Длина и ширина привязаны к сетке 42 мм. Между лотками остаётся зазор 0,5 мм.')}</p>}
          {part==='tray'&&<p className="hint">{t('Полная высота с опорами: {0} мм. Глубина внутри: {1} мм.',[size[2],p.heightUnits*7-7].map(n=>new Intl.NumberFormat(getLocale(),{maximumFractionDigits:2}).format(n)))}</p>}
        </div></SettingsPage>}
        {part==='plate'&&<SettingsPage title="Посадка"><div className="gf-dimensions">
          <Field label="Зазор плиты на сторону" value={p.clearance} min={.1} max={.2} step={.01} onChange={change('clearance')} manageHistory={false}/>
          <p className="hint">{t('Больше зазор — свободнее посадка. Меняются только гнёзда плиты; размеры опор лотка остаются прежними.')}</p>
        </div></SettingsPage>}
        {part==='tray'&&<SettingsPage title="Подпись лотка"><div className="gf-dimensions">
          <label className="count-label">{t('Подпись лотка')}<select value={p.label?.mode??'none'} onChange={e=>{
            const mode=e.target.value;
            changeLabelSurface({...p,label:mode==='none'?undefined:{...p.label,mode:mode==='tag'?'tag':'engraved',text:p.label?.text??''}});
          }}>
            <option value="none">{t('Без подписи')}</option>
            <option value="engraved">{t(hasGridfinityLid(p)?'Гравировка на крышке':'Гравировка на площадке')}</option>
            <option value="tag">{t(hasGridfinityLid(p)?'Табличка на крышке':'Сменная табличка')}</option>
          </select></label>
          {p.label&&!hasGridfinityLid(p)&&<label className="count-label">{t('Площадка для подписи')}<select value={p.label.shelf??'inclined'}
            onChange={e=>commit({...p,label:{...p.label!,shelf:e.target.value==='flat'?'flat':'inclined'}})}>
            <option value="inclined">{t('С наклоном (25°)')}</option>
            <option value="flat">{t('Без наклона')}</option>
          </select></label>}
          {p.label&&<label className="count-label">{t('Текст')}<input className="gf-inscription-text" type="text" key={selection.id+p.label.mode+p.label.text} defaultValue={p.label.text} maxLength={18}
            onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}
            onBlur={e=>{
              const next={...p,label:{...p.label!,text:e.target.value.trim()}};
              try{validateGridfinity(next);commit(next);}catch(error){e.currentTarget.value=p.label!.text;setError((error as Error).message);}
            }}/></label>}
          {p.label&&inscription&&<Field label="Высота букв" min={2} max={Math.floor((inscription.maxSize+.00005)*10)/10} step={.1}
            value={p.label.size??Math.floor(((inscription.height||inscription.maxSize)+.00005)*10)/10}
            onChange={size=>commit({...p,label:{...p.label!,size}})} commitOnRelease manageHistory={false}/>}
        </div></SettingsPage>}
        {part==='tray'&&<SettingsPage title="Крышка"><div className="gf-dimensions">
          <label className="count-label">{t('Крышка')}<select value={p.lid??'none'} onChange={e=>{
            changeLabelSurface({...p,lid:e.target.value as GridfinityProject['lid']});setShowLids(true);
          }}>
            <option value="none">{t('Без крышки')}</option>
            <option value="plain">{t('Обычная')}</option>
            <option value="stackable">{t('С бортиком')}</option>
          </select></label>
          {hasGridfinityLid(p)&&<label className="count-label">{t('Ручка заподлицо')}<select value={p.flushLidGrip===true?'through':p.flushLidGrip||'none'} onChange={e=>{
            const mode=e.target.value;
            commit({...p,flushLidGrip:mode==='recessed'?'recessed':mode==='through'});setShowLids(true);
          }}>
            <option value="none">{t('Без ручки')}</option>
            <option value="through">{t('Сквозная')}</option>
            <option value="recessed">{t('С закрытым дном (+4,2 мм)')}</option>
          </select></label>}
          {hasGridfinityLid(p)&&<label className="count-label">{t('Показать крышки')}<input type="checkbox" checked={showLids} onChange={e=>setShowLids(e.target.checked)}/></label>}
        </div></SettingsPage>}
        {part==='tray'&&<SettingsPage title="Штабелирование"><div className="gf-dimensions">
          <label><input type="checkbox" checked={!!p.stackingLip} onChange={e=>commit({...p,stackingLip:e.target.checked})}/> {t('Бортик для штабелирования')}</label>
          <p className="hint">{t('Бортик добавляет 3,8 мм к высоте и удерживает сверху лоток того же размера.')}</p>
        </div></SettingsPage>}
        {part==='tray'&&<SettingsPage title="Извлечение деталей"><div className="gf-dimensions gf-tray-access">
          <Field label="Радиус скругления дна" value={p.floorRadius??0} min={0} max={12} step={.5} onChange={change('floorRadius')} commitOnRelease manageHistory={false}/>
          <label><input type="checkbox" checked={!!p.frontNotch} onChange={e=>commit({...p,frontNotch:e.target.checked})}/> {t('Выемка в передней стенке')}</label>
          {p.frontNotch&&<>
            <CutoutShapePicker value={notch.shape} onChange={notchShape=>commit({...p,notchShape})}/>
            <div className="dimension-fields gf-radius-fields">
              <Field label="Ширина выреза" value={notch.width} min={1} max={notch.maxWidth} step={.1} onChange={change('notchWidth')} commitOnRelease manageHistory={false}/>
              <Field label="Глубина выреза" value={notch.depth} min={1} max={notch.maxDepth} step={.1} onChange={change('notchDepth')} commitOnRelease manageHistory={false}/>
            </div>
          </>}
          <label><input type="checkbox" checked={!!p.pairedNotches} onChange={e=>commit({...p,pairedNotches:e.target.checked?{walls:paired.walls}:undefined})}/> {t('Парные вырезы в стенках')}</label>
          {p.pairedNotches&&<>
            <label className="count-label">{t('Стенки лотка')} <select value={paired.walls} onChange={e=>setPaired({walls:e.target.value as PairedNotches['walls']})}>
              <option value="left-right">{t('Левая и правая')}</option>
              <option value="front-back">{t('Передняя и задняя')}</option>
            </select></label>
            <Field label="Ширина парных вырезов" value={paired.width} min={1} max={paired.maxWidth} step={.1} onChange={width=>setPaired({width})} commitOnRelease manageHistory={false}/>
            <label><input type="checkbox" checked={!!p.pairedNotches.toFloor} onChange={e=>setPaired({toFloor:e.target.checked})}/> {t('До внутреннего дна')}</label>
            {!p.pairedNotches.toFloor&&<Field label="Глубина парных вырезов" value={paired.depth} min={1} max={paired.maxDepth} step={.1} onChange={depth=>setPaired({depth})} commitOnRelease manageHistory={false}/>}
          </>}
          <label><input type="checkbox" checked={!!p.sideGrips} onChange={e=>commit({...p,sideGrips:e.target.checked})}/> {t('Внутренние боковые захваты')}</label>
          <p className="hint">{t('В узких и низких отсеках радиус уменьшается автоматически. За боковые выступы можно поднять весь лоток.')}</p>
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
      <p className="gf-size">{size.map(n=>new Intl.NumberFormat(getLocale(),{maximumFractionDigits:2}).format(n)).join(' × ')} {t('мм')}</p>{(!a.drawer||part==='tray')&&<p className="hint">{t('Габариты детали. Проверьте размер стола в слайсере; автоматического разделения нет.')}</p>}
      {!a.drawer&&<p className="hint">{t('Начните с лотка и плиты 1 × 1. Проверьте посадку с вашими деталями Gridfinity при масштабе 100%.')}</p>}
      <a href="/guides/gridfinity.html" target="_blank" rel="noreferrer">{t('Инструкция и лицензии')}</a><small>Gridfinity — Zack Freedman / Voidstar Lab LLC · <a href="/licenses/GRIDFINITY-MIT.txt" target="_blank" rel="noreferrer">MIT</a></small>
    </aside><section className="stage gf-preview" aria-label={t('Предпросмотр Gridfinity')} aria-busy={building}><div className="stage-top"><div className="viewport-actions">{<div className="view-tabs" role="group" aria-label={t('Вид')}><button className={view==='3d'?'active':''} aria-pressed={view==='3d'} onClick={()=>setView('3d')}>{t('◈ Объем')}</button><button className={view==='top'?'active':''} aria-pressed={view==='top'} onClick={()=>setView('top')}>{t('▦ Сверху')}</button><button aria-pressed={showGrid} onClick={()=>setShowGrid(v=>!v)}>{t('▦ Сетка')}</button></div>}<div className="tools"><button aria-label={t('Отменить')} disabled={!history.past.length} onClick={undo}>↶</button><button aria-label={t('Повторить')} disabled={!history.future.length} onClick={redo}>↷</button><button aria-label={t('Вернуть камеру')} onClick={()=>setReset(v=>v+1)}>⌖</button></div></div></div><div className="canvas-wrap">{overview?<GridfinityAssemblyScene showLids={showLids} selectedCell={selectedId} onSelectCell={setSelected} onEditTray={commit} assembly={a} selection={selection} onSelect={choose} onChange={commitAssembly} view={view} reset={reset} showGrid={showGrid}/>:result?<GridfinityScene tag={p.label?.mode==='tag'&&(showLids||!hasGridfinityLid(p))?result.tag:undefined} lid={showLids&&hasGridfinityLid(p)?result.lid:undefined} project={p} part={part} stl={result.stl} selected={selectedId} view={view} reset={reset} showGrid={showGrid} busy={!valid} onSelect={setSelected} onChange={commit}/>:<p role="status">{building?t('Подготовка…'):t('Нет предпросмотра')}</p>}</div><p className="gf-preview-caption">{t(overview&&a.drawer?'Лоток можно поставить поперёк стыка плит.':overview?'Выберите лоток: отсеки настраиваются справа. Для перемещения потяните внешнюю стенку лотка. Плита перемещается вместе с лотками.':part==='tray'?'Выбранную перегородку также можно потянуть на модели.':'Вращайте модель, чтобы проверить нижние опоры и посадочные гнёзда.')}</p></section>{part==='tray'&&<aside className="right-panel gf-selection"><GridfinityCompartmentPanel key={selection.id} project={p} selected={selectedId} onSelect={setSelected} onChange={commit} onError={setError} onTop={()=>setView('top')}/></aside>}</main>{error&&<div className="gf-error" role="alert">{t(error)}<button aria-label={t('Закрыть')} onClick={()=>setError('')}>×</button></div>}
  {projectsOpen&&<GridfinityProjectsDialog projects={projects} activeId={activeId} onOpen={item=>{openProject(item);setProjectsOpen(false);}} onRename={(id,name)=>setProjects(old=>old.map(v=>v.id===id?{...v,name}:v))} onDelete={deleteProject} onClose={()=>setProjectsOpen(false)}/>}
  {naming&&<GridfinityProjectNameDialog bed={configuredBedSettings(printer)} fitted={naming==='drawer'} initialDrawer={naming==='resize'?a.drawer:undefined} variant={naming==='variant'} onCreate={createProject} onClose={()=>setNaming(null)}/>}

  {exportOpen&&<ExportDialog initial={overview?'all':part} project={printer} fileName="Gridfinity" source={{description:gridSummary,workerUrl:'/kernel/worker-gridfinity-release-20261119.js',request:{assembly:a,selection},targets:[{value:'all',label:'Весь комплект'},{value:'kit',label:'Плита и её лотки'},{value:'plate',label:'Базовая плита'},...(part==='tray'?[{value:'tray' as const,label:'Выбранный лоток'},...(p.label?.mode==='tag'?[{value:'tag' as const,label:'Сменная табличка'}]:[]),...(hasGridfinityLid(p)?[{value:'lid' as const,label:'Крышка'}]:[])]:[])],archive:true}} onClose={()=>setExportOpen(false)} onDone={message=>{setExportOpen(false);setStatus(message);}}/>}
  </div></SettingsWorkspace></FieldHistoryContext.Provider>;
}
