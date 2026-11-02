import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {maxCornerRadius} from '../rounding.js';
import {steppedChamferLimit} from '../model.js';
import {Field} from './Field.js';
export function CornerControls(){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change);

 const style=p.cornerStyle??'round';
 const limited=!!p.steppedWalls&&!p.footprint&&style==='chamfer';
 return <section className="corner-controls"><h2>{t("Углы органайзера")}</h2>{!p.footprint&&<><div className="surface-options" role="group" aria-label={t("Внешние углы")}>{(['round','chamfer'] as const).map(value=><button key={value} aria-pressed={style===value} onClick={()=>change(p=>editProject(p,d=>{d.cornerStyle=value;}))}><svg viewBox="0 0 30 22" aria-hidden="true"><path d={value==='round'?'M3 20V13Q3 3 13 3H28':'M3 20V13L13 3H28'}/></svg>{value==='round'?t("Скругление"):t("Фаска")}</button>)}</div><Field label={style==='round'?t("Радиус углов"):t("Размер фаски")} value={p.cornerRadius??0} min={0} max={limited?Math.min(maxCornerRadius(p.width,p.depth),steppedChamferLimit(p)):maxCornerRadius(p.width,p.depth)} step={limited?.1:.5} onChange={n=>change(p=>editProject(p,d=>{d.cornerRadius=n;}))}/><p className="hint">{style==='round'?t("Радиус внешнего контура."):t("Размер среза вдоль каждой стороны, угол 45°.")} {t(" Оболочка повторяет форму. 0 мм — прямые углы.")}</p>{limited&&<p className="hint">{t("Фаска ограничена толщиной стенки, чтобы сохранить прямые внутренние углы.")}</p>}</>}<Field label={t("Радиус внутри отсеков")} value={p.innerCornerRadius??0} min={0} max={30} step={.5} onChange={n=>change(p=>editProject(p,d=>{d.innerCornerRadius=n;}))}/><p className="hint">{t("Скругляет соединения стенок внутри отсеков. В тесных углах радиус ограничивается свободным местом.")}</p></section>;
}
