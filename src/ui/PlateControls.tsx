import {useEffect,useRef,useState} from 'react';
import type {DrawerLayout} from '../drawer.js';
import {platePlan} from '../mountingPlate.js';
import {download} from '../storage.js';
import {t} from '../i18n.js';
export function PlateControls({layout,onChange}:{layout:DrawerLayout;onChange:(fn:(d:DrawerLayout)=>void)=>void}){
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),worker=useRef<Worker|null>(null),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 useEffect(()=>()=>{worker.current?.terminate();clearTimeout(timer.current);},[]);
 // A changed layout invalidates an in-flight export.
 useEffect(()=>{worker.current?.terminate();clearTimeout(timer.current);worker.current=null;setBusy(false);setError('');},[layout]);
 let count=0,planError='';try{count=platePlan(layout).tiles.length;}catch(e){planError=(e as Error).message;}
 const enabled=!!layout.plate?.enabled,settings=layout.plate??{enabled:false,bedWidth:270,bedDepth:270};
 const exportPlate=(sample=false)=>{
  setBusy(true);setError('');const w=new Worker('/kernel/worker-lid-pattern-v4.js',{type:'module'});worker.current=w;
  timer.current=setTimeout(()=>{w.terminate();setBusy(false);setError('Не удалось построить пластину. Уменьшите размер ящика.');},120000);
  w.onerror=()=>{clearTimeout(timer.current);setBusy(false);setError('Не удалось построить пластину.');w.terminate();};
  w.onmessage=({data})=>{clearTimeout(timer.current);setBusy(false);if(data.ok)download(data.archive,sample?'ReplixGrid-joint-sample.zip':'ReplixGrid-plate.zip','application/zip');else setError(data.error);w.terminate();};
  w.postMessage({revision:1,purpose:'plate',layout:sample?{...layout,width:84,depth:44,gap:2,trays:[],plate:{enabled:true,bedWidth:Math.min(settings.bedWidth,64),bedDepth:Math.min(settings.bedDepth,64)}}:layout});
 };
 return <div className="plate-controls"><h2>{t('Основание ящика')}</h2><div className="plate-modes"><button aria-pressed={!enabled} onClick={()=>onChange(d=>{d.plate={...settings,enabled:false};})}>{t('Свободная расстановка')}</button><button aria-pressed={enabled} onClick={()=>onChange(d=>{d.plate={...settings,enabled:true};})}>{t('Печатная пластина')}</button></div>{enabled&&<><p className="hint">{t('Крепление снизу добавляет 4,1 мм к высоте. Размеры отсеков сохраняются.')}</p><div className="plate-bed">{(['bedWidth','bedDepth'] as const).map((key,i)=><label key={key}>{t(i?'Глубина стола принтера':'Ширина стола принтера')}<input type="number" min="60" max="1000" defaultValue={settings[key]} key={settings[key]} onBlur={e=>{const n=Number(e.target.value);if(Number.isFinite(n)&&n>=60&&n<=1000)onChange(d=>{d.plate={...settings,[key]:n};});else e.target.value=String(settings[key]);}} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/></label>)}</div><p className="hint">{t('Секции')}: {count} · {t('Зазор крепления')}: 0,12 {t('мм')}</p><button disabled={busy||!!planError} onClick={()=>exportPlate()}>{t(busy?'Строим пластину…':'Скачать секции (ZIP)')}</button><button disabled={busy} onClick={()=>exportPlate(true)}>{t('Скачать образец стыка')}</button><p className="hint">{t('В архиве — отдельный 3MF для каждой секции и схема сборки. Сначала проверьте стык двух секций.')}</p>{(error||planError)&&<p role="alert" className="validation-error">{t(error||planError)}</p>}</>}</div>;
}
