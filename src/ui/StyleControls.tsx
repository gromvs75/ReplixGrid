import {useEffect,useMemo,useState} from 'react';
import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {captureStyle,previewStyle,type SavedStyle} from '../visualStyles.js';
import {deleteStyle,listStyles,saveStyle} from '../storage.js';
import {lidMotifs} from '../lidMotifs.js';
import {reliefNames} from '../reliefPatterns.js';
const shellNames={honeycomb:'Соты',diamonds:'Ромбы',waves:'Волны',petals:'Лепестки',cubes:'Кубы',triangles:'Треугольники',slots:'Линии',cellular:'Ячейки Вороного'};
export function StyleControls(){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change);
 const [items,setItems]=useState<SavedStyle[]>([]),[id,setId]=useState(''),[name,setName]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[colors,setColors]=useState(true),[patterns,setPatterns]=useState(true),[removing,setRemoving]=useState(false),[loaded,setLoaded]=useState(false);
 useEffect(()=>{let alive=true;listStyles().then(v=>{if(alive)setItems(v);}).catch(()=>{if(alive)setError('Не удалось открыть стили.');}).finally(()=>{if(alive)setLoaded(true);});return()=>{alive=false;};},[]);
 const selected=items.find(v=>v.id===id);
 const preview=useMemo(()=>selected?previewStyle(p,selected.style,{colors,patterns}):null,[p,selected,colors,patterns]);
 const run=async(fn:()=>Promise<void>)=>{setBusy(true);setError('');try{await fn();}catch{setError('Не удалось сохранить стили.');}finally{setBusy(false);}};
 const style=selected?.style;
 return <details className="style-controls"><summary>{t('Общий стиль')}</summary>
  <p className="hint">{t('Сохраните цвета и узоры, чтобы применить их к другим проектам.')}</p>
  <form className="style-save" onSubmit={e=>{e.preventDefault();if(name.trim())void run(async()=>{const item=await saveStyle(name,captureStyle(useEditor.getState().project));setItems(await listStyles());setId(item.id);setName('');setRemoving(false);});}}>
   <input aria-label={t('Название стиля')} placeholder={t('Название стиля')} maxLength={80} value={name} disabled={busy||!loaded} onChange={e=>setName(e.target.value)}/>
   <button disabled={busy||!loaded||!name.trim()}>{t('Сохранить текущий стиль')}</button>
  </form>
  {error&&<p role="alert" className="validation-error">{t(error)}</p>}
  {!loaded?<p role="status">{t('Загрузка…')}</p>:items.length>0?<>
   <div className="style-saved-row"><label className="style-select"><span>{t('Сохранённый стиль')}</span><select aria-label={t('Сохранённый стиль')} value={id} disabled={busy} onChange={e=>{setId(e.target.value);setRemoving(false);}}><option value="">{t('Выберите стиль')}</option>{items.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>{style&&<><div className="style-options"><label><input type="checkbox" checked={colors} onChange={e=>setColors(e.target.checked)}/>{t('Цвета')}</label><label><input type="checkbox" checked={patterns} onChange={e=>setPatterns(e.target.checked)}/>{t('Узоры')}</label></div><button className="primary style-apply" disabled={busy||!preview?.changes.length} onClick={()=>change(current=>previewStyle(current,selected!.style,{colors,patterns}).project)}>{t('Применить стиль')}</button></>}</div>
   {style&&<>
    <div className="style-colors" aria-label={t('Цвета стиля')}>{[[t('Цвет органайзера'),style.organizerColor],...(style.shell?[[t('Цвет оболочки'),style.shell.color]]:[]),...(style.lid?[[t('Цвет основы крышки'),style.lid.baseColor],[t('Цвет узора крышки'),style.lid.patternColor]]:[])].map(([label,color])=><span key={label} title={`${label}: ${color}`} aria-label={`${label}: ${color}`} style={{background:color}}/>)}</div>
    <ul className="style-description"><li>{t('Рельеф органайзера')}: {t(style.relief?(style.relief.svg?'Мой SVG':reliefNames[style.relief.pattern]):'Гладкий')}</li>{style.shell&&<li>{t('Оболочка')}: {t(shellNames[style.shell.pattern])}</li>}{style.lid&&<li>{t('Крышка')}: {t(style.lid.surface.olive?lidMotifs[style.lid.surface.motif??'olive']:style.lid.surface.pattern==='smooth'?'Гладкий':style.lid.surface.pattern==='lines'?'Линии':reliefNames[style.lid.surface.pattern])}</li>}</ul>
    {preview&&<div className="style-preview" aria-live="polite">{preview.changes.length>0?<><strong>{t('Будет применено')}</strong><ul>{preview.changes.map(label=><li key={label}>{t(label)}</li>)}</ul></>:<p className="hint">{t(colors||patterns?'Нет изменений для применения.':'Выберите цвета или узоры.')}</p>}{preview.warnings.length>0&&<><strong>{t('Будет пропущено')}</strong><ul className="style-warnings">{preview.warnings.map((w,i)=><li key={i}>{w.label&&`${t(w.label)}: `}{t(w.message)}</li>)}</ul></>}</div>}
    {removing?<div className="style-remove"><p>{t('Удалить сохранённый стиль? Оформление проектов останется.')}</p><button disabled={busy} onClick={()=>void run(async()=>{await deleteStyle(id);setItems(await listStyles());setId('');setRemoving(false);})}>{t('Удалить')}</button><button disabled={busy} onClick={()=>setRemoving(false)}>{t('Отмена')}</button></div>:<button className="text-button" disabled={busy} onClick={()=>setRemoving(true)}>{t('Удалить стиль')}</button>}
   </>}
  </>:<p className="hint">{t('Сохранённых стилей пока нет.')}</p>}
  <p className="hint">{t('Размеры и отсеки сохраняются. Крышка и оболочка не добавляются. Цвета вставок не переносятся.')}</p>
  <p className="hint">{t('Стили хранятся в этом браузере. Применение — независимая копия, которую можно отменить.')}</p>
 </details>;
}
