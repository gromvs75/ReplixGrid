import {useEffect,useRef,useState} from 'react';
import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {defaultSvgPattern,SVG_MAX_BYTES,type SvgAsset,type SvgPattern} from '../svgPattern.js';
import {deleteSvgAsset,listSvgAssets,saveSvgAsset,type SavedSvg} from '../storage.js';
import {Field} from './Field.js';
export function SvgSwatch({asset}:{asset:SvgAsset}){
 return <svg viewBox={`0 0 1 ${asset.aspect}`} aria-hidden="true"><g transform={`translate(0 ${asset.aspect}) scale(1 -1)`}>{asset.shapes.map((shape,i)=><path key={i} fill="currentColor" fillRule="evenodd" stroke="none" d={shape.map(loop=>'M'+loop.map(v=>v.join(' ')).join('L')+'Z').join('')}/>)}</g></svg>;
}
export function SvgControls(){
 const project=useEditor(s=>s.project),change=useEditor(s=>s.change),svg=project.relief?.svg;
 const [items,setItems]=useState<SavedSvg[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[remove,setRemove]=useState('');
 const file=useRef<HTMLInputElement>(null),alive=useRef(true),working=useRef(false);
 useEffect(()=>{alive.current=true;const refresh=()=>{void listSvgAssets().then(v=>{if(alive.current)setItems(v);}).catch(()=>{if(alive.current)setError('Не удалось прочитать библиотеку SVG.');});};refresh();window.addEventListener('focus',refresh);return()=>{alive.current=false;window.removeEventListener('focus',refresh);};},[]);
 const apply=(asset:SvgAsset)=>{setError('');change(p=>editProject(p,d=>{d.relief={pattern:'ribs',spacing:8,depth:d.relief?.depth??1,svg:defaultSvgPattern(structuredClone(asset))};}));};
 const set=(patch:Partial<SvgPattern>)=>change(p=>editProject(p,d=>{if(d.relief?.svg)d.relief.svg={...d.relief.svg,...patch};}));
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
 return <div className="svg-controls">
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
   <div className="surface-options" role="group" aria-label={t('Стенки для SVG')}>{([['front','Передняя'],['back','Задняя'],['left','Левая'],['right','Правая']] as const).map(([side,label])=><button key={side} aria-pressed={svg.sides.includes(side)} disabled={svg.sides.length===1&&svg.sides[0]===side} onClick={()=>set({sides:svg.sides.includes(side)?svg.sides.filter(v=>v!==side):[...svg.sides,side]})}>{t(label)}</button>)}</div>
   <Field commitOnRelease label={t('Ширина рисунка')} value={svg.width} min={4} max={200} step={.5} onChange={width=>set({width})}/>
   <p className="hint">{t('Высота рисунка')}: {(svg.width*svg.asset.aspect).toFixed(1)} {t('мм')}</p>
   <Field commitOnRelease label={t('Поворот рисунка')} value={svg.rotation} min={-180} max={180} step={5} unit="°" onChange={rotation=>set({rotation})}/>
   <Field commitOnRelease label={t('Сдвиг по горизонтали')} value={svg.offsetX} min={-200} max={200} onChange={offsetX=>set({offsetX})}/>
   <Field commitOnRelease label={t('Сдвиг по вертикали')} value={svg.offsetY} min={-100} max={100} onChange={offsetY=>set({offsetY})}/>
   {svg.mode==='repeat'&&<Field commitOnRelease label={t('Интервал рисунков')} value={svg.gap} min={0} max={50} step={.5} onChange={gap=>set({gap})}/>}
   <button onClick={()=>set({offsetX:0,offsetY:0,rotation:0})}>{t('По центру')}</button>
   <p className="hint">{t('Рисунок повторяется на выбранных стенках. У краёв и вырезов он обрезается. Пропорции сохраняются.')}</p>
  </>}
  <p className="hint">{t('SVG обрабатывается в браузере и сохраняется внутри проекта. Библиотека доступна на этом устройстве.')}</p>
 </div>;
}
