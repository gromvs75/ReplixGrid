import {useState} from 'react';
import {t} from '../i18n.js';
import {filamentPrinterKey,useFilaments,type FilamentSlot} from '../filaments.js';
import {useEditor} from '../store.js';

const colors=['#ffffff','#171a1b','#e63522','#008ac8','#f8c52c','#2c9b62','#ff7928','#725ab4','#52c9c0','#c5c6c5','#f24f8d','#745033','#084582','#a5bd38','#c58d62','#d6d0e9'];
function textColor(color:string){
 const channels=[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return .2126*channels[0]+.7152*channels[1]+.0722*channels[2]>.179?'#121820':'#fff';
}
export function FilamentSlots({expanded=false}:{expanded?:boolean}){
 const p=useEditor(s=>s.project),id=filamentPrinterKey(p),palettes=useFilaments(s=>s.palettes),save=useFilaments(s=>s.save),slots=palettes[id]??[];
 const [selection,setSelection]=useState<{printer:string;index:number}|null>(null);
 const index=selection?.printer===id?Math.min(selection.index,slots.length-1):0;
 const selected=slots[index];
 const update=(i:number,change:Partial<FilamentSlot>)=>save(id,slots.map((s,n)=>n===i?{...s,...change}:s));
 const duplicated=slots.some((s,i)=>slots.some((other,j)=>i!==j&&other.color.toLowerCase()===s.color.toLowerCase()));
 const add=()=>{if(slots.length>=16)return;save(id,[...slots,{color:colors[slots.length],name:''}]);setSelection({printer:id,index:slots.length});};
 const toolhead=(i:number)=>id==='u1'&&i<4;
 return <details className="filament-settings" open={expanded||undefined}><summary>{t('Филаменты слайсера')} · {slots.length}</summary>
  <div className="filament-layout"><p className="hint">{t('Укажите цвета и номера как в слайсере. Профили и настройки печати не экспортируются.')}</p>
  <div className="filament-cards" role="group" aria-label={t('Филаменты слайсера')}>
   {slots.map((slot,i)=><button key={i} type="button" className={`filament-card${toolhead(i)?' filament-toolhead':''}`} aria-pressed={i===index} aria-label={`${toolhead(i)?`T${i} · `:''}${t('Слот')} ${i+1} · ${slot.name||slot.color}`} onClick={()=>setSelection({printer:id,index:i})}>
    <span className="filament-card-color" style={{background:slot.color,color:textColor(slot.color)}}>{toolhead(i)?`T${i}`:i+1}</span>
    <span className="filament-card-slot">{t('Слот')} {i+1}</span><span className="filament-card-name">{slot.name||'—'}</span>
   </button>)}
   {slots.length<16&&<button type="button" className="filament-add" onClick={add} aria-label={t('+ Филамент')}><span aria-hidden="true">+</span><small>{t('Добавить')}</small></button>}
  </div>
  {selected&&<div className="filament-editor">
   <div className="filament-editor-title"><strong>{toolhead(index)?`T${index} · `:''}{t('Слот')} {index+1}</strong><span>{t('Настройка филамента')}</span></div>
   <div className="filament-editor-fields"><label>{t('Цвет')}<input type="color" aria-label={t('Цвет филамента {0}',[index+1])} value={selected.color} onChange={e=>update(index,{color:e.target.value})}/></label><label>{t('Название или материал')}<input type="text" aria-label={t('Название филамента {0}',[index+1])} placeholder="PLA, PETG…" value={selected.name} maxLength={60} onChange={e=>update(index,{name:e.target.value})}/></label></div>
   {index===slots.length-1&&<button type="button" className="filament-remove" onClick={()=>{save(id,slots.slice(0,-1));setSelection({printer:id,index:Math.max(0,index-1)});}}>{t('Удалить последний филамент')}</button>}
  </div>}
  {duplicated&&<p className="validation-error">{t('Одинаковые цвета нельзя однозначно сопоставить слотам. Выберите разные цвета.')}</p>}
 </div></details>;
}
