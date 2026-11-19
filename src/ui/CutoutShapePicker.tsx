import type {WallCutout} from '../model.js';
import {t} from '../i18n.js';
const cutNames={smooth:'Плавный',round:'Полукруг',square:'Прямоугольный'};
type Shape=WallCutout['shape'];
export function CutoutShapePicker({value,onChange,onClear}:{value?:Shape;onChange:(shape:Shape)=>void;onClear?:()=>void}){
  return <div className="surface-options" role="group" aria-label={t("Форма выреза")}>
    {onClear&&<button aria-pressed={!value} onClick={onClear}>{t("Без выреза")}</button>}
    {(['smooth','round','square'] as const).map(shape=>
    <button key={shape} aria-pressed={value===shape} onClick={()=>onChange(shape)}>
    <svg viewBox="0 0 60 26" aria-hidden="true">
    <path d={shape==='smooth'?'M2 3H8C20 3 17 23 24 23H36C43 23 40 3 52 3H58':shape==='round'?'M2 3H10A20 20 0 0 0 50 3H58':'M2 3H14V19Q14 23 18 23H42Q46 23 46 19V3H58'}/>
    </svg>{t(cutNames[shape])}</button>)}
  </div>;
}
