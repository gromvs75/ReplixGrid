import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {maxCornerRadius} from '../rounding.js';
import {steppedChamferLimit,topEdgeSize,topEdgeLimit} from '../model.js';
import {Field} from './Field.js';
export function CornerControls(){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change);

 const style=p.cornerStyle??'round';
 const limited=!!p.steppedWalls&&!p.footprint&&style==='chamfer';
 return <section className="corner-controls"><div className="corner-group"><h2>{t("Углы органайзера")}</h2><div className="surface-options" role="group" aria-label={t("Внешние углы")}>{(['round','chamfer'] as const).map(value=><button key={value} disabled={!!p.footprint} aria-pressed={!p.footprint&&style===value} onClick={()=>change(p=>editProject(p,d=>{d.cornerStyle=value;}))}><svg viewBox="0 0 30 22" aria-hidden="true"><path d={value==='round'?'M3 20V13Q3 3 13 3H28':'M3 20V13L13 3H28'}/></svg>{value==='round'?t("Скругление"):t("Фаска")}</button>)}</div>{p.footprint?<p className="hint">{t("Для этой формы внешние углы заданы контуром. Можно настроить внутренние углы и верхнюю кромку.")}</p>:<><Field label={style==='round'?t("Радиус углов"):t("Размер фаски")} value={p.cornerRadius??0} min={0} max={limited?Math.min(maxCornerRadius(p.width,p.depth),steppedChamferLimit(p)):maxCornerRadius(p.width,p.depth)} step={limited?.1:.5} onChange={n=>change(p=>editProject(p,d=>{d.cornerRadius=n;}))}/><p className="hint">{style==='round'?t("Радиус внешнего контура."):t("Размер среза вдоль каждой стороны, угол 45°.")} {t(" Оболочка повторяет форму. 0 мм — прямые углы.")}</p>{limited&&<p className="hint">{t("Фаска ограничена толщиной стенки, чтобы сохранить прямые внутренние углы.")}</p>}</>}</div><div className="corner-group"><h2>{t("Радиус внутри отсеков")}</h2><Field label={t("Радиус внутри отсеков")} value={p.innerCornerRadius??0} min={0} max={30} step={.5} onChange={n=>change(p=>editProject(p,d=>{d.innerCornerRadius=n;}))}/><p className="hint">{t("Скругляет соединения стенок внутри отсеков. В тесных углах радиус ограничивается свободным местом.")}</p>
 </div><div className="corner-group"><h3>{t("Верхняя кромка стенок и перегородок")}</h3>
 <div className="surface-options" role="group" aria-label={t("Верхняя кромка стенок и перегородок")}>{(['none','chamfer','round'] as const).map(mode=><button key={mode} aria-pressed={(p.topEdge?.style??'none')===mode} onClick={()=>change(p=>editProject(p,d=>{if(mode==='none')delete d.topEdge;else d.topEdge={style:mode,size:Math.min(topEdgeLimit(d),p.topEdge?.size??.5)};}))}><svg viewBox="0 0 30 22" aria-hidden="true"><path d={mode==='none'?'M3 20V3H28':mode==='round'?'M3 20V13Q3 3 13 3H28':'M3 20V13L13 3H28'}/></svg>{mode==='none'?t("Без обработки"):mode==='round'?t("Скругление"):t("Фаска")}</button>)}</div>
 {p.topEdge&&<Field label={p.topEdge.style==='round'?t("Радиус"):t("Размер фаски")} value={topEdgeSize(p)} min={.1} max={topEdgeLimit(p)} step={.1} commitOnRelease onChange={size=>change(p=>editProject(p,d=>{if(d.topEdge)d.topEdge.size=size;}))}/>}
 </div></section>;
}
