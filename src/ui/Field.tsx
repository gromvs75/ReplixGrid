import {t,getLocale} from '../i18n.js';
import {createContext,useContext,useEffect,useState} from 'react';
export const FieldHistoryContext=createContext<{begin:()=>void;end:()=>void}|null>(null);
import {useEditor} from '../store.js';
export function Field({label,value,min,max,step=1,onChange,unit=t("мм"),commitOnRelease=false,manageHistory=true}:{label:string;value:number;min:number;max:number;step?:number;unit?:string;commitOnRelease?:boolean;manageHistory?:boolean;onChange:(n:number)=>void}){
  const history=useContext(FieldHistoryContext);
  const begin=()=>{if(history){history.begin();return;}if(manageHistory)useEditor.getState().begin();};
  const end=()=>{if(history){history.end();return;}if(manageHistory)useEditor.getState().end();};
  const [draft,setDraft]=useState(String(Number(value.toFixed(2))));
  useEffect(()=>setDraft(String(Number(value.toFixed(2)))),[value]);
  const [sliding,setSliding]=useState<number|null>(null);
  const finish=()=>{if(sliding!==null){onChange(sliding);setSliding(null);}end();};
  const format=(n:number)=>new Intl.NumberFormat(getLocale(),{maximumFractionDigits:2}).format(n);
  const commit=()=>{const n=Number(draft);if(draft.trim()&&Number.isFinite(n)&&n>=min&&n<=max)onChange(n);setDraft(String(Number(value.toFixed(2))));};
  return <label className="field"><span className="field-top"><span>{t(label)}</span><span className="number-wrap"><input aria-label={t(label)} type="number" min={min} max={max} step={step} value={draft} onChange={e=>setDraft(e.target.value)} onBlur={commit} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/><small>{t(unit)}</small></span></span><span className="field-range"><span className="field-range-bounds" aria-hidden="true"><span>{t("Мин")} {format(min)}</span><span>{t("Макс")} {format(max)}</span></span><span className="field-range-track"><input aria-label={t("{0}: ползунок",[t(label)])} aria-valuetext={`${format(sliding??value)} ${unit}`} disabled={max<=min} type="range" min={min} max={max} step={step} value={sliding??value} onPointerDown={()=>begin()} onPointerUp={finish} onPointerCancel={()=>{setDraft(String(Number(value.toFixed(2))));setSliding(null);end();}} onKeyDown={()=>begin()} onKeyUp={finish} onBlur={finish} onChange={e=>{const n=Number(e.target.value);if(commitOnRelease){setSliding(n);setDraft(String(n));}else onChange(n);}}/></span></span></label>;
}
