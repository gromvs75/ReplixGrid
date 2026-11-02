import {t} from '../i18n.js';
import {PIN_FIT_WARNING} from '../pinJoint.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {splitPlan,suggestSplit} from '../splitting.js';
import {Field} from './Field.js';
import {printerPresets,matchingPrinter,withPrinter} from '../printers.js';
import {FilamentSlots} from './FilamentSlots.js';
export function PrintPanel({exploded,onExploded,busy,onExport,onSample}:{exploded:boolean;onExploded:(v:boolean)=>void;busy:boolean;onExport:()=>void;onSample:()=>void}){
  const p=useEditor(s=>s.project),change=useEditor(s=>s.change);
  const bed=p.printArea??{bedWidth:270,bedDepth:270,bedHeight:270};
  const current=p.printing??bed;
  const printer=matchingPrinter(p);
  let plan:ReturnType<typeof splitPlan>|undefined,problem='';
  try{plan=p.printing?splitPlan(p):suggestSplit({...p,wallThickness:Math.max(5,p.wallThickness),floorThickness:Math.max(3,p.floorThickness)},bed);}catch(e){problem=e instanceof Error?e.message:t("Не удалось подобрать разрезы.");}
  const apply=(parts:2|3)=>change(p=>editProject(p,d=>{d.wallThickness=Math.max(5,d.wallThickness);d.floorThickness=Math.max(3,d.floorThickness);d.printing={...current,parts};}));
  const setSize=(key:'bedWidth'|'bedDepth'|'bedHeight',n:number)=>{
    change(p=>editProject(p,d=>{d.printArea={bedWidth:current.bedWidth,bedDepth:current.bedDepth,bedHeight:current.bedHeight,[key]:n};if(d.printing)d.printing={...d.printing,[key]:n,printerId:undefined};}));
  };
  return <section className="print-panel"><h2>{t("Печать по частям ")}<small>{t("СБОРКА")}</small></h2><p className="hint">{t("Введите область печати вашего принтера. Места разрезов и соединений подберём сами.")}</p>
    <label className="printer-picker">{t("Принтер")}<select aria-label={t("Принтер")} value={printer?.id??'custom'} onChange={e=>change(p=>withPrinter(p,e.target.value))}><option value="custom">{t("Свой размер")}</option>{printerPresets.map(v=><option key={v.id} value={v.id}>{v.name} — {t(v.configuration)} · {v.area.bedWidth} × {v.area.bedDepth} × {v.area.bedHeight} mm</option>)}</select></label>
    <p className="hint">{t("Выбор задаёт только область печати. Проверьте конфигурацию головки и Quick Swap; пластик и режим печати выбираются в слайсере.")}{printer&&<> <a href={printer.source} target="_blank" rel="noreferrer">{t("Размеры производителя ↗")}</a></>}</p>
    <details><summary>{t("Область печати · ")}{current.bedWidth} × {current.bedDepth} × {current.bedHeight} {t(" мм")}</summary>{([['bedWidth',t("Ширина стола")],['bedDepth',t("Глубина стола")],['bedHeight',t("Высота печати")]] as const).map(([key,label])=><Field key={key} label={label} value={current[key]} min={40} max={1000} step={1} onChange={n=>setSize(key,n)}/>)}</details>
    <FilamentSlots/>
    <p className="hint">{t("При разделении стенки увеличиваются минимум до 5 мм, дно — до 3 мм. Размер отсеков изменится. Для сборки потребуются штифты и клей.")}</p>
    {!p.footprint&&!p.tilt&&<div className="assembly-tabs" aria-label={t("Количество частей")}>{([2,3] as const).map(n=><button key={n} disabled={!!p.shell} aria-pressed={p.printing?.parts===n} className={p.printing?.parts===n?'active':''} onClick={()=>apply(n)}>{n} {t(" части")}</button>)}</div>}
    {!p.printing&&!p.shell&&plan&&<button className="print-action" onClick={()=>apply(plan!.settings.parts)}>{t("Предложить разрезы · ")}{plan.settings.parts} {t(" части")}</button>}
    {p.shell&&<><p className="hint" role="status">{t("Оболочка недоступна для печати по частям. Уберите оболочку или верните цельную модель.")}</p><button className="print-action" onClick={()=>change(p=>editProject(p,d=>{delete d.shell;}))}>{t("Убрать оболочку")}</button></>}
    {problem&&!p.shell&&<p className="hint" role="status">{t(problem)}</p>}
    {p.printing&&plan&&<><div className="shell-dimensions"><b>{p.printing.parts} {t(" секции · ")}{plan.axis==='x'?t("по ширине"):t("по глубине")}</b><span>{t("Швы: ")}{plan.cuts.join(' / ')} {t(" мм от ")}{plan.axis==='x'?t("левого"):t("переднего")} {t(" края")}</span><span>{t("Для сборки нужны штифты и клей. Стенки — от 5 мм, дно — от 3 мм. Возможен поворот на столе на 90°.")}</span></div><button className="print-action" aria-pressed={exploded} onClick={()=>onExploded(!exploded)}>{exploded?t("Показать сборку"):t("Раздвинуть части")}</button><button className="primary print-action" disabled={busy||!!p.shell} onClick={onExport}>{t("↓ Скачать все части")}</button><button className="text-button" onClick={()=>{change(p=>editProject(p,d=>{d.printArea={bedWidth:current.bedWidth,bedDepth:current.bedDepth,bedHeight:current.bedHeight,printerId:current.printerId};delete d.printing;}));onExploded(false);}}>{t("Вернуть цельную модель")}</button></>}
    <p className="hint" role="note">{t(PIN_FIT_WARNING)}</p><button className="print-action" disabled={busy} onClick={onSample}>{t("↓ Образец соединения")}</button><details><summary>{t("Как напечатать образец")}</summary><p className="hint">{t("Выберите 3MF, чтобы открыть детали вместе, или STL, чтобы скачать ZIP. Для первой пробы используйте organizer-1 и organizer-2 как два отдельных объекта.")}</p><p className="hint">{t("Масштаб 100%, миллиметры. Дно на столе, открытая сторона вверх. Между деталями оставьте около 10 мм. Не соединяйте их перед печатью.")}</p><p className="hint">{t("После остывания проверьте посадку штифтов, затем склейте половины.")}</p></details><p className="hint">{t("Для сборки обязательно используйте клей. Сначала проверьте посадку штифтов на образце; прочность зависит от материала и качества склейки.")}</p>
  </section>;
}
