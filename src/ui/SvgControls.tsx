import {useEffect,useRef,useState} from 'react';
import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {defaultSvgPattern,SVG_MAX_BYTES,type SvgAsset,type SvgPattern} from '../svgPattern.js';
import {deleteSvgAsset,listSvgAssets,saveSvgAsset,type SavedSvg} from '../storage.js';
import {lidPlateThickness} from '../accessories.js';
import {resolveWalls} from '../model.js';
import {shellForPattern} from '../shellSelection.js';
import {Field} from './Field.js';
export function SvgSwatch({asset}:{asset:SvgAsset}){
 return <svg viewBox={`0 0 1 ${asset.aspect}`} aria-hidden="true"><g transform={`translate(0 ${asset.aspect}) scale(1 -1)`}>{asset.shapes.map((shape,i)=><path key={i} fill="currentColor" fillRule="evenodd" stroke="none" d={shape.map(loop=>'M'+loop.map(v=>v.join(' ')).join('L')+'Z').join('')}/>)}</g></svg>;
}
function SvgHelp({asset,target}:{asset?:SvgAsset;target:'relief'|'lid'|'shell'}){
 return <div className="svg-help">

  <details><summary>{t('Какие SVG подходят?')}</summary>
  <p>{t('SVG: заполненные контуры до 200 КБ. Загрузка не гарантирует пригодность для прорезей.')}</p>
  {asset?.shapes.some(shape=>shape.length>1)&&<p className="hint">{t('В рисунке есть замкнутые внутренние области. Для рельефа это допустимо; в прорезях они могут стать отдельными кусочками. Увеличение интервала не соединит их с основой.')}</p>}
   <p>{t('Подходят заполненные пути, многоугольники, прямоугольники, круги и эллипсы. Текст и обводки сначала преобразуйте в контуры. Удалите фон: любой заполненный фон тоже станет частью узора. Цвета SVG не переносятся.')}</p>
   <p>{t('Фото, маски, обрезка, фильтры, градиенты и ссылки на другие элементы не поддерживаются. Лимиты: 512 элементов, 128 фигур и 6000 точек после преобразования кривых.')}</p>
   <p>{t(target==='relief'?'На корпусе SVG создаёт рельеф на сплошной стенке.':'На крышке рельеф держится на сплошной основе. В сквозных прорезях крышки и оболочки оставшийся материал должен быть соединён: добавьте перемычки к внутренним деталям рисунка.')}</p>
   <p>{t('На крышке и оболочке рисунок размещается целиком внутри рамки. Ширина задаётся для всего SVG, даже если в нём уже много повторов. Если рисунок не помещается, уменьшите ширину или смещение. Проверяйте итоговую геометрию перед экспортом.')}</p>
   <a href="https://github.com/gromvs75/ReplixGrid/blob/main/docs/REFERENCE.md#custom-svg-relief" target="_blank" rel="noreferrer">{t('Инструкция по SVG')}</a>
  </details>
 </div>;
}
export function SvgControls({target='relief',studio=false}:{target?:'relief'|'lid'|'shell';studio?:boolean}){
 const project=useEditor(s=>s.project),change=useEditor(s=>s.change),svg=target==='lid'?project.lidDesign?.svg:target==='shell'?project.shell?.svg:project.relief?.svg;
 const [items,setItems]=useState<SavedSvg[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[remove,setRemove]=useState('');
 const file=useRef<HTMLInputElement>(null),alive=useRef(true),working=useRef(false);
 useEffect(()=>{alive.current=true;const refresh=()=>{void listSvgAssets().then(v=>{if(alive.current)setItems(v);}).catch(()=>{if(alive.current)setError('Не удалось прочитать библиотеку SVG.');});};refresh();window.addEventListener('focus',refresh);return()=>{alive.current=false;window.removeEventListener('focus',refresh);};},[]);
 const apply=(asset:SvgAsset)=>{setError('');change(p=>editProject(p,d=>{const svg=defaultSvgPattern(structuredClone(asset));
  if(target==='lid')d.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',...d.lidDesign,svg,svgMode:d.lidDesign?.svgMode??'raised'};
  else if(target==='shell'){svg.sides=['front','back','left','right'];svg.mode='repeat';const shell=d.shell??shellForPattern(d,'honeycomb');
   const inset=shell.mode==='panels'?(shell.margin??4)+Math.max(4,shell.thickness*2):shell.border??Math.max(3,shell.thickness*2);
   const height=Math.min(...resolveWalls(d).slice(0,4).flatMap(w=>[w.startHeight,w.endHeight]));
   svg.width=Math.max(4,Math.min(svg.width,(height-2*inset-4)/asset.aspect,Math.min(d.width,d.depth)-2*inset-1));
   d.shell={...shell,svg};}
  else d.relief={pattern:'ribs',spacing:8,depth:d.relief?.depth??1,svg};}));};
 const set=(patch:Partial<SvgPattern>)=>change(p=>editProject(p,d=>{const settings=target==='lid'?d.lidDesign:target==='shell'?d.shell:d.relief;if(settings?.svg)settings.svg={...settings.svg,...patch};}));
 const upload=async(f?:File)=>{
  if(!f||working.current)return;working.current=true;setBusy(true);setError('');const source=useEditor.getState().project;
  try{
   if(f.size>SVG_MAX_BYTES)throw new Error('SVG слишком большой. Максимум 200 КБ.');
   const text=await f.text(),{importSvg}=await import('../svgImport.js'),asset=importSvg(text,f.name);
   await saveSvgAsset(asset);const next=await listSvgAssets();if(!alive.current)return;setItems(next);
   if(useEditor.getState().project===source)apply(asset);else setError('SVG сохранён в библиотеку. Выберите его для текущего проекта.');
  }catch(e){if(alive.current)setError(e instanceof Error?e.message:'Не удалось сохранить SVG.');}
  finally{working.current=false;if(alive.current)setBusy(false);}
 };
 const setLid=(patch:Partial<NonNullable<typeof project.lidDesign>>)=>change(p=>editProject(p,d=>{d.lidDesign={pattern:'smooth',rimHeight:2,handle:'none',...d.lidDesign,...patch};}));
 if(studio)return <div className="studio-content">
  <div className="studio-library" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();void upload(e.dataTransfer.files[0]);}}>
   <div className="studio-library-heading"><strong>{t('Мои SVG')}</strong>{svg&&<button className="studio-reset" onClick={()=>change(p=>editProject(p,d=>{const settings=target==='lid'?d.lidDesign:d.shell;if(settings)delete settings.svg;}))}>{t('Убрать рисунок')}</button>}</div>
   <input ref={file} type="file" accept=".svg,image/svg+xml" aria-label={t('Загрузить SVG')} hidden onChange={e=>{void upload(e.target.files?.[0]);e.target.value='';}}/>
   <div className="studio-gallery" aria-label={t('Библиотека SVG')}>
    {items.map(item=><button className="studio-asset" key={item.id} disabled={busy} aria-pressed={svg?.asset.name===item.asset.name&&JSON.stringify(svg.asset.shapes)===JSON.stringify(item.asset.shapes)} onClick={()=>apply(item.asset)}><SvgSwatch asset={item.asset}/><span>{item.asset.name}</span></button>)}
    {svg&&!items.some(item=>JSON.stringify(item.asset)===JSON.stringify(svg.asset))&&<button className="studio-asset" aria-pressed="true"><SvgSwatch asset={svg.asset}/><span>{svg.asset.name}</span></button>}
    <button className="studio-upload" disabled={busy} aria-label={t('Загрузить SVG')} onClick={()=>file.current?.click()}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 16V3m-4 4 4-4 4 4M4 14v6h16v-6"/></svg><span>{t(busy?'Загрузка…':'Загрузить')}</span></button>
   </div>
   {error&&<p className="validation-error" role="alert">{t(error)}</p>}
   <SvgHelp asset={svg?.asset} target={target}/>
  </div>
  {svg?<>
   <div className="studio-transforms">
    <div className="studio-repeat" role="group" aria-label={t('Размещение SVG')}>{(['single','repeat'] as const).map(mode=><button aria-pressed={svg.mode===mode} key={mode} onClick={()=>set({mode})}>{t(mode==='single'?'Один рисунок':'Повторять')}</button>)}</div>
    <div className="studio-transform-grid">
     <Field label={t('Ширина рисунка')} value={svg.width} min={4} max={200} step={.5} onChange={width=>set({width})}/>
     <Field label={t('Поворот рисунка')} value={svg.rotation} min={-180} max={180} step={5} unit="°" onChange={rotation=>set({rotation})}/>
     <Field label="X" value={svg.offsetX} min={-200} max={200} onChange={offsetX=>set({offsetX})}/>
     <Field label="Y" value={svg.offsetY} min={-100} max={100} onChange={offsetY=>set({offsetY})}/>
     <button className="studio-center" onClick={()=>set({offsetX:0,offsetY:0,rotation:0})} aria-label={t('По центру')} title={t('По центру')}>⌖</button>
    </div>
   </div>
   <div className="studio-surface">
    <div className="studio-modes" role="group" aria-label={t('Способ нанесения SVG')}>
     <button aria-pressed={target==='lid'&&project.lidDesign?.svgMode!=='cutout'} disabled={target==='shell'} onClick={()=>setLid({svgMode:'raised'})}><svg viewBox="0 0 28 24" aria-hidden="true"><path d="m3 17 5-3 5 3 6-3 6 3M3 21h22M6 10l2-4 3 4m7 0 2-4 3 4"/></svg>{t('Рельеф (декор)')}</button>
     <button aria-pressed={target==='shell'||project.lidDesign?.svgMode==='cutout'} onClick={()=>{if(target==='lid')setLid({svgMode:'cutout'});}}><svg viewBox="0 0 28 24" aria-hidden="true"><path d="M3 3h22v18H3zM10 3v18M18 3v18M3 9h22M3 15h22"/></svg>{t('Сквозной трафарет (рез)')}</button>
    </div>
    <div className="studio-material-grid">
     {target==='lid'&&project.lidDesign?.svgMode!=='cutout'?<Field label={t('Высота рельефа')} value={project.lidDesign?.patternDepth??.5} min={.2} max={1} step={.1} onChange={patternDepth=>setLid({patternDepth})}/>:target==='shell'&&project.shell?.mode!=='panels'?<Field label={t('Ширина канта')} value={project.shell?.border??Math.max(3,(project.shell?.thickness??1.6)*2)} min={2} max={12} step={.5} onChange={border=>change(p=>editProject(p,d=>{if(d.shell?.mode!=='panels'&&d.shell)d.shell.border=border;}))}/>:<div className="studio-frame">{t('Рамка')}: {target==='lid'?2:Math.max(4,(project.shell?.thickness??1.6)*2)} {t('мм')}</div>}
     <Field label={t('Толщина материала')} value={target==='lid'?lidPlateThickness(project):project.shell?.thickness??1.6} min={target==='lid'?1.2:1} max={target==='lid'?6:4} step={.1} onChange={thickness=>{if(target==='lid')setLid({svgThickness:thickness});else change(p=>editProject(p,d=>{if(d.shell)d.shell.thickness=thickness;}));}}/>
     {svg.mode==='repeat'&&<Field label={t('Интервал рисунков')} value={svg.gap} min={0} max={50} step={.5} onChange={gap=>set({gap})}/>}
    </div>
    <p className="studio-mode-note"><span aria-hidden="true">ⓘ</span>{t('Сквозной трафарет удаляет материал насквозь и требует перемычки.')}</p>
    <details className="studio-extra"><summary>{t('Дополнительно')}</summary>
    {target==='shell'&&project.shell?.mode!=='panels'?<details className="studio-side-picker"><summary>{t('Стенки для SVG')} · {svg.sides.length}</summary><div>{([['front','Передняя'],['back','Задняя'],['left','Левая'],['right','Правая']] as const).map(([side,label])=><label key={side}><input type="checkbox" checked={svg.sides.includes(side)} disabled={svg.sides.length===1&&svg.sides[0]===side} onChange={()=>set({sides:svg.sides.includes(side)?svg.sides.filter(v=>v!==side):[...svg.sides,side]})}/>{t(label)}</label>)}</div></details>:target==='lid'?<label className="studio-color"><input type="color" aria-label={t('Цвет основы крышки')} value={project.lidDesign?.baseColor??project.colors?.organizer??'#90b9aa'} onChange={e=>setLid({baseColor:e.target.value})}/>{t('Цвет основы крышки')}</label>:<span className="studio-frame">{t('На выбранных панелях')}</span>}
    </details>
   </div>
  </>:<div className="studio-empty">{t('Выберите рисунок или загрузите SVG')}</div>}
 </div>;
 return <div className="svg-controls">
  <SvgHelp asset={svg?.asset} target={target}/>
  <div className="svg-upload" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();void upload(e.dataTransfer.files[0]);}}>
   <input ref={file} type="file" accept=".svg,image/svg+xml" aria-label={t('Загрузить SVG')} hidden onChange={e=>{void upload(e.target.files?.[0]);e.target.value='';}}/>
   <button disabled={busy} onClick={()=>file.current?.click()}>{t(busy?'Загрузка…':'＋ Загрузить SVG')}</button><span className="hint">{t('Или перетащите SVG сюда')}</span>
  </div>
  {error&&<p className="validation-error" role="alert">{t(error)}</p>}
  {items.length>0&&<div className="svg-library" aria-label={t('Мои SVG')}>{items.map(item=><div className="svg-library-item" key={item.id}><button className="svg-pick" disabled={busy} aria-pressed={svg?.asset.name===item.asset.name&&JSON.stringify(svg.asset.shapes)===JSON.stringify(item.asset.shapes)} onClick={()=>apply(item.asset)}><SvgSwatch asset={item.asset}/><span>{item.asset.name}</span></button><button className="svg-delete" disabled={busy} aria-label={t('Удалить SVG {0}',[item.asset.name])} onClick={()=>setRemove(item.id)}>×</button></div>)}</div>}
  {remove&&<div className="svg-confirm"><p className="hint">{t('Удалить из библиотеки? Рисунок в проектах останется.')}</p><button onClick={async()=>{try{await deleteSvgAsset(remove);setItems(await listSvgAssets());setRemove('');}catch{setError('Не удалось сохранить SVG.');}}}>{t('Удалить')}</button><button onClick={()=>setRemove('')}>{t('Отмена')}</button></div>}
  {svg&&<>
   <div className="svg-current"><SvgSwatch asset={svg.asset}/><strong>{svg.asset.name}</strong></div>
   <div className="surface-options" role="group" aria-label={t('Размещение SVG')}>{(['single','repeat'] as const).map(mode=><button key={mode} aria-pressed={svg.mode===mode} onClick={()=>set({mode})}>{t(mode==='single'?'Один рисунок':'Повторять')}</button>)}</div>
   {target!=='lid'&&!(target==='shell'&&project.shell?.mode==='panels')&&<div className="surface-options" role="group" aria-label={t('Стенки для SVG')}>{([['front','Передняя'],['back','Задняя'],['left','Левая'],['right','Правая']] as const).map(([side,label])=><button key={side} aria-pressed={svg.sides.includes(side)} disabled={svg.sides.length===1&&svg.sides[0]===side} onClick={()=>set({sides:svg.sides.includes(side)?svg.sides.filter(v=>v!==side):[...svg.sides,side]})}>{t(label)}</button>)}</div>}
   <div className="svg-transform-fields"><Field commitOnRelease label={t('Ширина рисунка')} value={svg.width} min={4} max={200} step={.5} onChange={width=>set({width})}/>

   <Field commitOnRelease label={t('Поворот рисунка')} value={svg.rotation} min={-180} max={180} step={5} unit="°" onChange={rotation=>set({rotation})}/>
   <Field commitOnRelease label={t('Сдвиг по горизонтали')} value={svg.offsetX} min={-200} max={200} onChange={offsetX=>set({offsetX})}/>
   <Field commitOnRelease label={t('Сдвиг по вертикали')} value={svg.offsetY} min={-100} max={100} onChange={offsetY=>set({offsetY})}/>
   {svg.mode==='repeat'&&<Field commitOnRelease label={t('Интервал рисунков')} value={svg.gap} min={0} max={50} step={.5} onChange={gap=>set({gap})}/>}
   <button onClick={()=>set({offsetX:0,offsetY:0,rotation:0})}>{t('По центру')}</button></div>
   <p className="hint">{t(target==='relief'?'Один рисунок может обрезаться у краёв стенки. В режиме повтора размещаются только целые рисунки. Пропорции сохраняются.':'Рисунки размещаются целиком внутри рамки. Пропорции сохраняются. Для прорезей добавьте перемычки к замкнутым внутренним деталям SVG.')}</p>
  </>}
  <p className="hint">{t('SVG обрабатывается в браузере и сохраняется внутри проекта. Библиотека доступна на этом устройстве.')}</p>
 </div>;
}
