import {useEffect,useRef,useState} from 'react';
import type {DrawerLayout} from '../drawer.js';
import {packBeds,type BedSettings} from '../bedPacking.js';
import type {DrawerPrintReport} from '../drawerExport.js';
import {download} from '../storage.js';
import {t} from '../i18n.js';
export function DrawerExportDialog({layout,onClose,onSettings}:{layout:DrawerLayout;onClose:()=>void;onSettings:(settings:BedSettings)=>void}){
 const area=layout.trays[0]?.project.printArea??{bedWidth:270,bedDepth:270,bedHeight:270};
 const [settings,setSettings]=useState<BedSettings>(layout.printBed??{length:layout.plate?.bedWidth??area.bedWidth,width:layout.plate?.bedDepth??area.bedDepth,height:area.bedHeight,gap:5});
 const [report,setReport]=useState<DrawerPrintReport|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(true),[progress,setProgress]=useState(''),[bed,setBed]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null),worker=useRef<Worker|null>(null),serial=useRef(0),checked=useRef(''),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const key=JSON.stringify({layout,settings}),current=useRef(key);current.current=key;
 useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
 useEffect(()=>{
  const revision=++serial.current;let alive=true;checked.current='';setBusy(true);setError('');setReport(null);setProgress('');setBed(0);
  const w=new Worker('/kernel/worker-drawer-export-svg-thickness-v2.js',{type:'module'});worker.current=w;
  const fail=(text:string)=>{if(!alive||current.current!==key)return;clearTimeout(timer.current);w.terminate();checked.current='';setBusy(false);setError(text);};
  timer.current=setTimeout(()=>fail('Подготовка заняла слишком много времени. Упростите комплект или скачайте лотки отдельно.'),300000);
  w.onerror=()=>fail('Не удалось подготовить комплект. Попробуйте ещё раз.');
  w.onmessage=({data})=>{if(!alive||current.current!==key||data.revision!==revision)return;if(data.progress){setProgress(data.progress);return;}clearTimeout(timer.current);setBusy(false);if(!data.ok){setError(data.error);return;}if(data.report){checked.current=key;setReport(data.report);}else if(data.archive){download(data.archive,`${layout.name.replace(/[\\/:*?"<>|]/g,'-')||'Drawer'}-print-beds.zip`,'application/zip');}};
  w.postMessage({purpose:'check',revision,layout,settings});
  return()=>{alive=false;clearTimeout(timer.current);w.terminate();};
 },[key]);
 return <dialog ref={dialog} className="export-dialog drawer-export-dialog" aria-labelledby="drawer-export-title" onCancel={onClose}><header><h2 id="drawer-export-title">{t('Печать всего ящика')}</h2><button autoFocus aria-label={t('Закрыть')} onClick={onClose}>×</button></header>
 <p className="hint">{t('Все лотки, аксессуары и включённая пластина — в одном архиве.')}</p>
 <div className="drawer-export-settings">{(['length','width','height','gap'] as const).map((field,i)=><label key={field}>{t(['Длина стола принтера','Ширина стола принтера','Высота печати','Промежуток между деталями'][i])}<input type="number" aria-label={t(['Длина стола принтера','Ширина стола принтера','Высота печати','Промежуток между деталями'][i])} min={field==='gap'?0:field==='height'?5:60} max={field==='gap'?30:1000} key={settings[field]} defaultValue={settings[field]} onBlur={e=>{const n=Number(e.target.value);if(e.target.value&&Number.isFinite(n)){const next={...settings,[field]:n};setSettings(next);try{packBeds([],next);onSettings(next);}catch{/* Keep invalid input visible without saving it. */}}else e.target.value=String(settings[field]);}} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/><small>{t('мм')}</small></label>)}</div>
 {layout.plate?.enabled&&<p className="hint">{t('Секции основания рассчитываются под этот стол принтера.')}</p>}
 <div role="status" aria-live="polite">{busy?<p>{t('Готовим детали и раскладку…')} {progress}</p>:error?<p role="alert" className="validation-error">{t(error)}</p>:report&&<><p className="drawer-export-total"><b>{t('Столов для печати')}: {report.beds.length}</b><span>{t('Деталей')}: {report.partCount}</span></p><nav className="bed-tabs" aria-label={t('Столы для печати')}>{report.beds.map((_,i)=><button key={i} aria-pressed={bed===i} onClick={()=>setBed(i)}>{i+1}</button>)}</nav><svg className="bed-preview" viewBox={`0 0 ${settings.length} ${settings.width}`} role="img" aria-label={t('Раскладка стола')}><rect width={settings.length} height={settings.width} fill="var(--panel,white)" stroke="currentColor"/>{report.beds[bed]?.map(v=><g key={v.item}><title>{report.items[v.item].name}</title><rect x={v.x} y={v.y} width={v.width} height={v.depth} fill="#bdd4c8" stroke="#325e4d" strokeWidth=".5"/><text x={v.x+v.width/2} y={v.y+v.depth/2} textAnchor="middle" dominantBaseline="middle" fontSize={Math.max(5,Math.max(settings.length,settings.width)*.04)} fill="#183d30">{v.item+1}</text></g>)}</svg><ol className="bed-parts">{report.beds[bed]?.map(v=><li key={v.item} value={v.item+1}>{report.items[v.item].name}<small>{report.items[v.item].size.map(n=>n.toFixed(1)).join(' × ')} {t('мм')}{v.rotation?' · 90°':''}</small></li>)}</ol>{report.warnings.map(w=><p className="hint" key={w}>{w}</p>)}</>}</div>
 <p className="hint">{t('Отдельный 3MF на каждый стол, схемы раскладки и сборки. Количество столов относится к этой раскладке. Поддержки, кайму и филаменты проверьте в слайсере.')}</p>
 <button className="primary export-confirm" disabled={busy||!!error||!report||checked.current!==key} onClick={()=>{if(checked.current!==key)return;setBusy(true);timer.current=setTimeout(()=>{worker.current?.terminate();checked.current='';setBusy(false);setError('Не удалось подготовить архив. Закройте окно и повторите.');},120000);worker.current?.postMessage({purpose:'download',revision:serial.current,layout,settings});}}>{t('Скачать все столы (ZIP)')}</button></dialog>;
}
