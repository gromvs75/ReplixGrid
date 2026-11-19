import {defaultModelColor} from '../appearance.js';
import {gridPitch} from '../gridfinity.js';
import {gridfinityDrop} from '../gridfinityPlacement.js';
import {Field} from './Field.js';
import {t} from '../i18n.js';
import {gridBounds,trayOrigin,rotateGridfinityTray,trayFootprint,transferGridfinityTray,addGridfinityPlate,addGridfinityTray,moveGridfinityPart,removeGridfinityPart,selectedGridfinity,validateGridfinityAssembly,type GridfinityAssembly,type GridfinitySelection} from '../gridfinityAssembly.js';
type Props={assembly:GridfinityAssembly;selection:GridfinitySelection;onSelect:(s:GridfinitySelection)=>void;onChange:(a:GridfinityAssembly)=>void;onError:(s:string)=>void};
export function GridfinityAssemblyPanel({assembly:a,selection:s,onSelect,onChange,onError}:Props){
 const item=selectedGridfinity(a,s)!,plateId=s.kind==='plate'?s.id:a.trays.find(v=>v.id===s.id)!.plateId;
 const run=(fn:()=>void)=>{try{fn();}catch(e){onError((e as Error).message);}};
 const add=(kind:'plate'|'tray',copy=false)=>run(()=>{const result=kind==='plate'?addGridfinityPlate(a,copy?a.plates.find(v=>v.id===s.id):undefined):addGridfinityTray(a,plateId,copy?a.trays.find(v=>v.id===s.id):undefined);onChange(result.assembly);onSelect(result.selection);});
 const plate=a.plates.find(p=>p.id===plateId)!,tray=s.kind==='tray'?a.trays.find(t=>t.id===s.id):undefined,span=tray?trayFootprint(tray):[0,0];
 const [px,py]=gridPitch(plate.project),[cols,rows]=gridBounds(a);
 const origin=tray&&a.drawer?trayOrigin(a,tray):item;
 const maxX=tray?(a.drawer?cols-span[0]:Math.min(plate.project.columns-1,cols-plate.x-span[0])):200;
 const maxY=tray?(a.drawer?rows-span[1]:Math.min(plate.project.rows-1,rows-plate.y-span[1])):200;
 const setPosition=(x:number,y:number)=>run(()=>{
   if(!tray){onChange(moveGridfinityPart(a,s,x,y));return;}
   const next=gridfinityDrop(a,s,x-origin.x,y-origin.y);
   if(!next)throw Error('Выберите свободные ячейки.');
   onChange(next);
 });
 const name=(kind:'plate'|'tray',id:string)=>{const all=kind==='plate'?a.plates:a.trays,v=all.find(v=>v.id===id)!;return v.name||t(kind==='plate'?'Плита {0}':'Лоток {0}',[all.indexOf(v)+1]);};
 const trayButton=(v:GridfinityAssembly['trays'][number])=><button className={a.drawer?undefined:"gf-tree-tray"} key={v.id} aria-pressed={s.id===v.id} onClick={()=>onSelect({kind:'tray',id:v.id})}><span className="gf-color-dot" style={{background:v.project.colors?.tray??defaultModelColor}}/>{name('tray',v.id)} <small>{v.project.columns} × {v.project.rows}</small></button>;
 return <section className="gf-assembly-panel"><h2>{t('Состав комплекта')}</h2><div className="gf-add-actions">{!a.drawer&&<button onClick={()=>add('plate')}>{t('+ Плита')}</button>}<button onClick={()=>add('tray')}>{t('+ Лоток')}</button></div>
 <div className="gf-parts-tree" aria-label={t('Состав комплекта')}>{a.plates.map(p=><div key={p.id}><button aria-pressed={s.id===p.id} onClick={()=>onSelect({kind:'plate',id:p.id})}>{name('plate',p.id)} <small>{p.project.columns} × {p.project.rows}</small></button>{!a.drawer&&a.trays.filter(v=>v.plateId===p.id).map(trayButton)}</div>)}{a.drawer&&a.trays.map(trayButton)}</div>
 <label className="count-label">{t('Название')}<input key={item.id+item.name} aria-label={t('Название детали')} defaultValue={item.name} placeholder={name(s.kind,s.id)} maxLength={80} onBlur={e=>{const name=e.target.value.trim();if(name!==item.name)run(()=>onChange(validateGridfinityAssembly({...a,[s.kind==='plate'?'plates':'trays']:(s.kind==='plate'?a.plates:a.trays).map(v=>v.id===s.id?{...v,name}:v)})));}} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/></label>
 {s.kind==='tray'&&!a.drawer&&<label className="count-label">{t('Базовая плита')}<select aria-label={t('Плита для лотка')} value={plateId} onChange={e=>run(()=>onChange(transferGridfinityTray(a,s.id,e.target.value)))}>{a.plates.map(p=><option key={p.id} value={p.id}>{name('plate',p.id)}</option>)}</select></label>}
 {(!a.drawer||tray)&&<details><summary>{t('Положение на сетке')}</summary><Field label="Смещение X" value={origin.x*px} min={0} max={maxX*px} step={px} onChange={n=>setPosition(Math.round(n/px),origin.y)} manageHistory={false} commitOnRelease/><Field label="Смещение Y" value={origin.y*py} min={0} max={maxY*py} step={py} onChange={n=>setPosition(origin.x,Math.round(n/py))} manageHistory={false} commitOnRelease/></details>}
 {(!a.drawer||tray)&&<div className="gf-add-actions"><button onClick={()=>add(s.kind,true)}>{t('Дублировать')}</button>{s.kind==='tray'&&<button onClick={()=>run(()=>onChange(rotateGridfinityTray(a,s.id)))}>{t('Повернуть 90°')}</button>}<button className="danger" onClick={()=>run(()=>{onChange(removeGridfinityPart(a,s));onSelect({kind:'plate',id:plateId===s.id?a.plates.find(p=>p.id!==s.id)!.id:plateId});})}>{t('Удалить')}</button></div>}
 <p className="hint">{t(a.drawer?'Лоток можно поставить поперёк стыка плит.':'Выберите лоток: отсеки настраиваются справа. Для перемещения потяните внешнюю стенку лотка. Плита перемещается вместе с лотками.')}</p></section>;
}
