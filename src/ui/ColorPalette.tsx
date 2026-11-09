import {useId,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {partColor} from '../appearance.js';
import {filamentPrinterKey,useFilaments,slotNumber} from '../filaments.js';
const palette=[['Белый','#ffffff'],['Красный','#e63522'],['Коричневый','#70544e'],['Оранжевый','#ff7928'],['Кремовый','#f0dfd2'],['Бежевый','#c6a68c'],['Серый','#c5c6c5'],['Шоколадный','#745033'],['Охра','#c58d62'],['Слоновая кость','#fff5dc'],['Жёлтый','#f8c52c'],['Лимонный','#ffee00'],['Лайм','#def128'],['Оливковый','#a5bd38'],['Тёмно-зелёный','#335f3d'],['Зелёный','#2c9b62'],['Шалфей','#8cbaa8'],['Бирюзовый','#52c9c0'],['Голубой','#58b9d2'],['Серо-голубой','#95b9c6'],['Синий','#008ac8'],['Графит','#48565c'],['Светло-серый','#dbe0e5'],['Ярко-синий','#096bd8'],['Тёмно-синий','#084582'],['Чёрный','#171a1b'],['Стальной','#9598a0'],['Лавандовый','#d6d0e9'],['Фиолетовый','#725ab4'],['Сливовый','#7b1684'],['Малиновый','#ed0082'],['Розовый','#f24f8d'],['Нежно-розовый','#ffc2cd'],['Бордовый','#941d30']] as const;
export function ColorPalette({part}:{part:'organizer'|'shell'}){
 const color=useEditor(s=>partColor(s.project,part)),change=useEditor(s=>s.change);
 const label=part==='organizer'?t("Цвет органайзера"):t("Цвет оболочки");
 const set=(color:string)=>change(p=>({...p,colors:{...p.colors,[part]:color}}));
 return <ColorPicker label={t(label)} color={color} onChange={set}/>;
}
type ColorPickerProps={label:string;color:string;onChange:(color:string)=>void;popup?:boolean};
function swatchText(color:string){
 const rgb=[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]>.179?'#121820':'#fff';
}
function ColorChoices({label,color,onChange:set,popup}:ColorPickerProps){
 const p=useEditor(s=>s.project),palettes=useFilaments(s=>s.palettes),slots=palettes[filamentPrinterKey(p)]??[];
 const [draft,setDraft]=useState<string|null>(null),hex=draft??color.toUpperCase(),valid=/^#?[0-9a-f]{6}$/i.test(hex.trim());
 return <>
  {(popup||slots.length>0)&&<section className="color-filaments"><h4>{t('Филаменты слайсера')}</h4>{slots.length>0?<div className="color-swatches" role="group" aria-label={t('Филаменты слайсера')}>{slots.map((slot,i)=>{const number=slotNumber(slot,i);return <button key={number} type="button" title={`${t('Слот')} ${number} · ${slot.name||slot.color.toUpperCase()}`} aria-label={`${t('Слот')} ${number} · ${slot.name||slot.color.toUpperCase()}`} aria-pressed={color.toLowerCase()===slot.color.toLowerCase()} style={{background:slot.color,color:swatchText(slot.color)}} onClick={()=>{setDraft(null);set(slot.color);}}>{number}</button>;})}</div>:<p className="hint">{t('Добавьте цвета в «Печать → Филаменты слайсера».')}</p>}</section>}
  <div className="color-swatches" role="group" aria-label={label}>{palette.map(([name,hex])=><button key={hex} type="button" title={t(name)} aria-label={`${label}: ${t(name)}`} aria-pressed={color.toLowerCase()===hex} style={{background:hex,color:swatchText(hex)}} onClick={()=>{setDraft(null);set(hex);}}>{color.toLowerCase()===hex&&'✓'}</button>)}</div>
  <label className="custom-color">{t('Свой цвет')}<input aria-label={t('{0}: свой цвет',[label])} type="color" value={color} onChange={e=>{setDraft(null);set(e.target.value);}}/>{!popup&&<span>{color.toUpperCase()}</span>}</label>
  {popup&&<label className="picker-hex">{t('HEX-код')}<input aria-label={t('HEX-код цвета')} type="text" value={hex} aria-invalid={!valid} spellCheck={false} maxLength={7} placeholder="#E63522" onChange={e=>{const value=e.target.value;setDraft(value);if(/^#?[0-9a-f]{6}$/i.test(value.trim()))set('#'+value.trim().replace(/^#/,''));}} onBlur={()=>setDraft(null)} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();}}/>{!valid&&<small>{t('Введите 6 символов: 0–9, A–F. Например, #E63522.')}</small>}</label>}
  <p className="hint">{t('Цвет для предпросмотра и экспорта. Филамент выбирается в слайсере.')}</p>
 </>;
}
function ColorPopover(props:ColorPickerProps){
 const id=useId(),button=useRef<HTMLButtonElement>(null),panel=useRef<HTMLDivElement>(null),[open,setOpen]=useState(false);
 useLayoutEffect(()=>{
  if(!open)return;
  const position=()=>{
   const anchor=button.current,box=panel.current;if(!anchor||!box)return;
   const rect=anchor.getBoundingClientRect(),width=box.offsetWidth,height=box.offsetHeight;
   box.style.left=`${Math.max(8,Math.min(rect.right-width,window.innerWidth-width-8))}px`;
   const below=rect.bottom+8,above=rect.top-height-8;
   box.style.top=`${Math.max(8,Math.min(below+height<=window.innerHeight-8?below:above,window.innerHeight-height-8))}px`;
  };
  position();const observer=new ResizeObserver(position);observer.observe(panel.current!);
  window.addEventListener('resize',position);window.addEventListener('scroll',position,true);
  return()=>{observer.disconnect();window.removeEventListener('resize',position);window.removeEventListener('scroll',position,true);};
 },[open]);
 return <div className="color-picker-row" onKeyDown={e=>{if(open&&e.key==='Escape'){e.preventDefault();e.stopPropagation();panel.current?.hidePopover();button.current?.focus();}}}><span>{props.label}</span><button ref={button} type="button" className="color-picker-trigger" aria-label={props.label} aria-haspopup="dialog" aria-expanded={open} popoverTarget={id}><span style={{background:props.color}}/></button>{createPortal(<div ref={panel} id={id} className="color-picker-popover" popover="auto" role="dialog" aria-label={props.label} onToggle={e=>setOpen(e.newState==='open')}><header><strong>{props.label}</strong><button type="button" aria-label={t('Закрыть выбор цвета')} popoverTarget={id} popoverTargetAction="hide">×</button></header>{open&&<ColorChoices {...props}/>}</div>,document.body)}</div>;
}
export function ColorPicker(props:ColorPickerProps){
 return props.popup?<ColorPopover {...props}/>:<details className="color-palette"><summary><span className="color-dot" style={{background:props.color}}/>{props.label}</summary><ColorChoices {...props}/></details>;
}
