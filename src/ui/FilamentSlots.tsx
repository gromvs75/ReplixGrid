import {useState} from 'react';
import {t} from '../i18n.js';
import {filamentPrinterKey,useFilaments,slotNumber,removeFilament,nextFilamentSlot,type FilamentSlot} from '../filaments.js';
import {useEditor} from '../store.js';

const colors=['#ffffff','#171a1b','#e63522','#008ac8','#f8c52c','#2c9b62','#ff7928','#725ab4','#52c9c0','#c5c6c5','#f24f8d','#745033','#084582','#a5bd38','#c58d62','#d6d0e9'];
function textColor(color:string){
 const channels=[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return .2126*channels[0]+.7152*channels[1]+.0722*channels[2]>.179?'#121820':'#fff';
}
function HexColorField({color,onChange}:{color:string;onChange:(color:string)=>void}){
 const [draft,setDraft]=useState<string|null>(null);
 const value=draft??color.toUpperCase(),valid=/^#?[0-9a-f]{6}$/i.test(value.trim());
 return <label className="filament-hex">{t('HEX-код')}<input type="text" aria-label={t('HEX-код цвета')} aria-invalid={!valid} value={value} placeholder="#E63522" spellCheck={false} maxLength={7} onFocus={()=>setDraft(color.toUpperCase())} onChange={e=>{const text=e.target.value;setDraft(text);if(/^#?[0-9a-f]{6}$/i.test(text.trim()))onChange('#'+text.trim().replace(/^#/,''));}} onBlur={()=>setDraft(null)} onKeyDown={e=>{if(e.key==='Enter'||e.key==='Escape')e.currentTarget.blur();}}/>{!valid&&<small>{t('Введите 6 символов: 0–9, A–F. Например, #E63522.')}</small>}</label>;
}
export function FilamentSlots({expanded=false}:{expanded?:boolean}){
 const p=useEditor(s=>s.project),id=filamentPrinterKey(p),palettes=useFilaments(s=>s.palettes),save=useFilaments(s=>s.save),slots=palettes[id]??[];
 const [selection,setSelection]=useState<{printer:string;index:number}|null>(null);
 const index=selection?.printer===id?Math.min(selection.index,slots.length-1):0;
 const selected=slots[index];
 const update=(i:number,change:Partial<FilamentSlot>)=>save(id,slots.map((s,n)=>n===i?{...s,...change}:s));
 const duplicated=slots.some((s,i)=>slots.some((other,j)=>i!==j&&other.color.toLowerCase()===s.color.toLowerCase()));
 const next=nextFilamentSlot(slots);
 const add=()=>{if(next===undefined)return;const updated=[...slots.map((s,i)=>({...s,slot:slotNumber(s,i)})),{slot:next,color:colors[next-1],name:''}].sort((a,b)=>a.slot-b.slot);save(id,updated);setSelection({printer:id,index:updated.findIndex(s=>s.slot===next)});};
 const number=selected?slotNumber(selected,index):0;
 const toolhead=(n:number)=>id==='u1'&&n<=4;
 return <details className="filament-settings" open={expanded||undefined}><summary>{t('Филаменты слайсера')} · {slots.length}</summary>
  <div className="filament-layout"><p className="hint">{t('Цвет здесь — примерный ориентир. Точный оттенок и смешивание настройте в слайсере. Номера слотов должны совпадать; профили печати не экспортируются.')}</p>
  <div className="filament-cards" role="group" aria-label={t('Филаменты слайсера')}>
   {slots.map((slot,i)=>{const n=slotNumber(slot,i);return <button key={n} type="button" className={`filament-card${toolhead(n)?' filament-toolhead':''}`} aria-pressed={i===index} aria-label={`${toolhead(n)?`T${n-1} · `:''}${t('Слот')} ${n} · ${slot.name||slot.color}`} onClick={()=>setSelection({printer:id,index:i})}>
    <span className="filament-card-color" style={{background:slot.color,color:textColor(slot.color)}}>{toolhead(n)?`T${n-1}`:n}</span>
    <span className="filament-card-slot">{t('Слот')} {n}</span><span className="filament-card-name">{slot.name||'—'}</span>
   </button>;})}
   {next!==undefined&&<button type="button" className="filament-add" onClick={add} aria-label={t('Добавить слот {0}',[next??1])}><span aria-hidden="true">+</span><small>{t('Слот')} {next}</small></button>}
  </div>
  {selected&&<div className="filament-editor">
   <div className="filament-editor-title"><strong>{toolhead(number)?`T${number-1} · `:''}{t('Слот')} {number}</strong><span>{t('Настройка филамента')}</span></div>
   <div className="filament-editor-fields"><label>{t('Цвет')}<input type="color" aria-label={t('Цвет филамента {0}',[number])} value={selected.color} onChange={e=>update(index,{color:e.target.value})}/></label><HexColorField key={`${id}:${number}`} color={selected.color} onChange={color=>update(index,{color})}/><label>{t('Название или материал')}<input type="text" aria-label={t('Название филамента {0}',[number])} placeholder="PLA, PETG…" value={selected.name} maxLength={60} onChange={e=>update(index,{name:e.target.value})}/></label></div>
   <p className="hint">{t('Удаление освобождает слот. Номера остальных филаментов сохраняются.')}</p>
   <button type="button" className="filament-remove" onClick={()=>{save(id,removeFilament(slots,number));setSelection({printer:id,index:Math.max(0,index-1)});}}>{t('Удалить филамент из слота {0}',[number])}</button>
  </div>}
  {duplicated&&<p className="validation-error">{t('Для одинаковых цветов выберите слот вручную при экспорте.')}</p>}
 </div></details>;
}
