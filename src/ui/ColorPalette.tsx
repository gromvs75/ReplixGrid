import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {partColor} from '../appearance.js';
import {filamentPrinterKey,useFilaments} from '../filaments.js';
const palette=[['Белый','#ffffff'],['Красный','#e63522'],['Коричневый','#70544e'],['Оранжевый','#ff7928'],['Кремовый','#f0dfd2'],['Бежевый','#c6a68c'],['Серый','#c5c6c5'],['Шоколадный','#745033'],['Охра','#c58d62'],['Слоновая кость','#fff5dc'],['Жёлтый','#f8c52c'],['Лимонный','#ffee00'],['Лайм','#def128'],['Оливковый','#a5bd38'],['Тёмно-зелёный','#335f3d'],['Зелёный','#2c9b62'],['Шалфей','#8cbaa8'],['Бирюзовый','#52c9c0'],['Голубой','#58b9d2'],['Серо-голубой','#95b9c6'],['Синий','#008ac8'],['Графит','#48565c'],['Светло-серый','#dbe0e5'],['Ярко-синий','#096bd8'],['Тёмно-синий','#084582'],['Чёрный','#171a1b'],['Стальной','#9598a0'],['Лавандовый','#d6d0e9'],['Фиолетовый','#725ab4'],['Сливовый','#7b1684'],['Малиновый','#ed0082'],['Розовый','#f24f8d'],['Нежно-розовый','#ffc2cd'],['Бордовый','#941d30']] as const;
export function ColorPalette({part}:{part:'organizer'|'shell'}){
 const color=useEditor(s=>partColor(s.project,part)),change=useEditor(s=>s.change);
 const label=part==='organizer'?t("Цвет органайзера"):t("Цвет оболочки");
 const set=(color:string)=>change(p=>({...p,colors:{...p.colors,[part]:color}}));
 return <ColorPicker label={t(label)} color={color} onChange={set}/>;
}
export function ColorPicker({label,color,onChange:set}:{label:string;color:string;onChange:(color:string)=>void}){
 const p=useEditor(s=>s.project),palettes=useFilaments(s=>s.palettes),slots=palettes[filamentPrinterKey(p)]??[];
 return <details className="color-palette"><summary><span className="color-dot" style={{background:color}}/>{t(label)}</summary><div className="color-swatches" role="group" aria-label={t(label)}>{palette.map(([name,hex])=><button key={hex} type="button" title={t(name)} aria-label={`${t(label)}: ${t(name)}`} aria-pressed={color.toLowerCase()===hex} style={{background:hex}} onClick={()=>set(hex)}>{color.toLowerCase()===hex&&<span style={{color:['#171a1b','#084582','#335f3d','#7b1684','#941d30','#725ab4','#48565c','#70544e','#745033'].includes(hex)?'#fff':'#183e32'}}>✓</span>}</button>)}</div>{slots.length>0&&<><p className="hint">{t("Филаменты слайсера")}</p><div className="color-swatches">{slots.map((slot,i)=><button key={i} type="button" title={`${i+1} · ${slot.name}`} aria-label={`${t("Филаменты слайсера")} ${i+1} ${slot.name}`} aria-pressed={color.toLowerCase()===slot.color.toLowerCase()} style={{background:slot.color}} onClick={()=>set(slot.color)}>{color.toLowerCase()===slot.color.toLowerCase()?"✓":i+1}</button>)}</div></>}<label className="custom-color">{t("Свой цвет")}<input aria-label={t("{0}: свой цвет",[label])} type="color" value={color} onChange={e=>set(e.target.value)}/><span>{color.toUpperCase()}</span></label><p className="hint">{t("Цвет для предпросмотра и экспорта. Филамент выбирается в слайсере.")}</p></details>;
}
