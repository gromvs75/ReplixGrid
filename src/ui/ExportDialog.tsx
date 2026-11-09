import type {MountingRequest} from '../mountingKernel.js';
import {hasAnyShell} from '../accessories.js';
import {t} from '../i18n.js';
import {useEffect,useRef,useState} from 'react';
import type {ExportFormat} from '../exportFormats.js';
import type {Project} from '../model.js';
import type {inspectPrintParts} from '../preflight.js';
import {download} from '../storage.js';
import {filamentPrinterKey,slotMap,useFilaments,slotNumber,resolveFilamentAssignment} from '../filaments.js';
export type ExportTarget='organizer'|'shell'|'all'|'kit'|'sample';
export function ExportDialog({initial,project,onClose,onDone,fileName,mounting}:{initial:ExportTarget;project:Project;fileName?:string;mounting?:MountingRequest;onClose:()=>void;onDone:(message:string)=>void}){
 const dialog=useRef<HTMLDialogElement>(null),worker=useRef<Worker|null>(null),[format,setFormat]=useState<ExportFormat>('3mf'),[target,setTarget]=useState<ExportTarget>(initial),[report,setReport]=useState<ReturnType<typeof inspectPrintParts>|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(true);
 const mountingKey=JSON.stringify(mounting);
 const boundMounting=mounting?{...mounting,layout:{...mounting.layout,trays:mounting.layout.trays.map(v=>v.id===mounting.trayId?{...v,project}:v)}}:undefined;
 const requestKey=JSON.stringify({project,target,mounting:boundMounting});
 const currentKey=useRef(requestKey);currentKey.current=requestKey;
 const checkedKey=useRef(''),serial=useRef(0),downloadTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const palettes=useFilaments(s=>s.palettes),slots=palettes[filamentPrinterKey(project)]??[],mapping=slotMap(slots);
 const [partColors,setPartColors]=useState<{name:string;color:string}[]>([]);
 const [chosenSlots,setChosenSlots]=useState<Record<string,number|null>>({});
 const assignments=partColors.map(part=>Object.hasOwn(chosenSlots,part.name)?resolveFilamentAssignment(slots,chosenSlots[part.name]):(mapping[part.color.toLowerCase()]??null));
 const done=useRef(onDone);done.current=onDone;
 useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close();},[]);
 useEffect(()=>{
  setBusy(true);setReport(null);setError('');setChosenSlots({});checkedKey.current='';const requestRevision=++serial.current;let alive=true;
  const w=new Worker(new URL(`${import.meta.env.BASE_URL}kernel/worker-lid-handles-v5.js`,window.location.origin),{type:'module'});worker.current=w;
  const timer=setTimeout(()=>{if(alive){w.terminate();setBusy(false);setError("Проверка заняла слишком много времени. Упростите узор или уменьшите число деталей.");}},120000);
  w.onerror=()=>{if(!alive||currentKey.current!==requestKey)return;clearTimeout(timer);clearTimeout(downloadTimer.current);setBusy(false);setError("Не удалось запустить проверку геометрии.");};
  w.onmessage=({data})=>{if(!alive||currentKey.current!==requestKey||data.revision!==requestRevision)return;clearTimeout(timer);clearTimeout(downloadTimer.current);setBusy(false);if(!data.ok){setError(data.error);return;}if(data.report){checkedKey.current=requestKey;setReport(data.report);setPartColors(data.partColors??[]);return;}if(data.formatted){download(data.formatted,`${fileName?.replace(/[\\/:*?"<>|]/g,'-')||'ReplixGrid-'+target}.${data.extension}`,data.mime);done.current(`Скачано деталей: ${data.count}. Назначьте пластик и разложите детали в слайсере.`);}};
  w.postMessage({revision:requestRevision,project,part:target,purpose:'check',mounting:boundMounting});
  return()=>{alive=false;clearTimeout(timer);clearTimeout(downloadTimer.current);w.terminate();worker.current=null;};
 },[project,target,mountingKey]);
 return <dialog ref={dialog} className="export-dialog" aria-labelledby="export-title" onCancel={onClose}><header><h2 id="export-title">{t("Проверка и скачивание")}</h2><button autoFocus type="button" aria-label={t("Закрыть окно экспорта")} onClick={onClose}>×</button></header>
 {mounting&&<p className="hint">{t('Экспорт с креплением снизу для выбранной позиции в ящике.')}</p>}
 {initial!=='sample'&&<label className="export-target">{t("Что скачать")}<select aria-label={t("Детали для экспорта")} value={target} onChange={e=>setTarget(e.target.value as ExportTarget)}><option value="organizer">{t("Органайзер и аксессуары")}</option>{hasAnyShell(project)&&<><option value="all">{t("Весь комплект")}</option><option value="shell">{t("Только оболочка")}</option></>}{initial==='kit'&&<option value="kit">{t("Все части комплекта")}</option>}</select></label>}
 <div className="export-formats" role="group" aria-label={t("Формат файла")}>{(['stl','3mf','obj'] as const).map(value=><button key={value} type="button" aria-pressed={format===value} onClick={()=>setFormat(value)}><b>{value.toUpperCase()}</b><small>{{stl:t("Без цвета"),'3mf':t("Детали + цвета"),obj:'OBJ + MTL'}[value]}</small></button>)}</div>
 {format==='3mf'&&<div className="filament-export"><p className="hint">{t("Назначение филаментов в Snapmaker Orca: проверьте номера слотов и цвета в слайсере. Профили не передаются.")}</p>{partColors.map((part,i)=><label className="filament-assignment" key={part.name}><span><span className="color-dot" style={{background:part.color}}/> {part.name}</span><select aria-label={t('Филамент для детали {0}',[part.name])} value={assignments[i]??''} onChange={e=>setChosenSlots(old=>({...old,[part.name]:e.target.value?Number(e.target.value):null}))}><option value="">{t('Выбрать в слайсере')}</option>{slots.map((slot,n)=><option key={n} value={slotNumber(slot,n)}>{t('Слот')} {slotNumber(slot,n)}{filamentPrinterKey(project)==='u1'&&slotNumber(slot,n)<=4?` · T${slotNumber(slot,n)-1}`:''} · {slot.name?`${slot.name} · `:''}{slot.color.toUpperCase()}</option>)}</select></label>)}{partColors.length>0&&assignments.some(v=>v===null)&&<p className="hint validation-error">{t('Для деталей без выбранного слота Orca может использовать первый филамент. Выберите слот здесь или назначьте его в слайсере.')}</p>}{!slots.length&&<p className="hint">{t('Чтобы выбрать слоты здесь, добавьте филаменты в разделе «Печать».')}</p>}</div>}
 <div className="preflight" role="status">{busy?<p>{t("Проверяем геометрию и размеры…")}</p>:error?<p className="validation-error">{t(error)}</p>:report&&<><p>{t("Стол ")}{report.area.bedWidth} × {report.area.bedDepth} × {report.area.bedHeight} {t(" мм")}</p><div className="preflight-parts">{report.rows.map(row=><div key={row.name}><b>{row.fits?'✓':'!'} {row.name}</b><span>{row.size.map(n=>n.toFixed(1)).join(' × ')} {t(" мм")}</span>{!row.fits&&<small className="validation-error">{t("Не помещается. Измените размеры детали или область печати во вкладке «Печать».")}</small>}{row.rotate&&<small>{t("Поверните на столе на 90°.")}</small>}</div>)}</div>{report.warnings.map(w=><p className="hint" key={w}>{t(w)}</p>)}</>}</div>
 <p className="hint">{t("Проверены замкнутость сетки и габариты с запасом 2 мм по краям стола. Размещение всего комплекта, нависания и тонкие элементы проверьте в слайсере. 3MF без настроек принтера; несколько STL — в ZIP.")}</p>
 <button className="primary export-confirm" disabled={busy||!report?.ok||!!error||checkedKey.current!==requestKey} type="button" onClick={()=>{if(checkedKey.current!==requestKey||!worker.current)return;setBusy(true);downloadTimer.current=setTimeout(()=>{worker.current?.terminate();setBusy(false);setError('Проверка заняла слишком много времени. Упростите узор или уменьшите число деталей.');},120000);worker.current.postMessage({revision:serial.current,project,part:target,mounting:boundMounting,purpose:'download',format,partSlots:assignments,objInstructions:t('OBJ: миллиметры, Z вверх. Оставьте OBJ и MTL в одной папке для цветов. Детали размещены рядом; расположите их на столе в слайсере.')});}}>{t("↓ Скачать ")}{format.toUpperCase()}</button></dialog>;
}
