import {SettingsPages,SettingsPage} from './SettingsPages.js';
import {t} from '../i18n.js';
import {PIN_FIT_WARNING} from '../pinJoint.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import {splitPlan,suggestSplit} from '../splitting.js';
import {useConfiguredPrinter} from './useConfiguredPrinter.js';
export function PrintPanel({exploded,onExploded,busy,onExport,onSample}:{exploded:boolean;onExploded:(v:boolean)=>void;busy:boolean;onExport:()=>void;onSample:()=>void}){
  const p=useConfiguredPrinter(),change=useEditor(s=>s.change);
  const bed=p.printArea??{bedWidth:270,bedDepth:270,bedHeight:270};
  const current=p.printing??bed;
  let plan:ReturnType<typeof splitPlan>|undefined,problem='';
  try{plan=p.printing?splitPlan(p):suggestSplit({...p,wallThickness:Math.max(5,p.wallThickness),floorThickness:Math.max(3,p.floorThickness)},bed);}catch(e){problem=e instanceof Error?e.message:t("Не удалось подобрать разрезы.");}
  const apply=(parts:2|3)=>change(p=>editProject(p,d=>{d.wallThickness=Math.max(5,d.wallThickness);d.floorThickness=Math.max(3,d.floorThickness);d.printing={...current,parts};}));
  return <section className="print-panel"><SettingsPages><SettingsPage title="Печать по частям"><section className={`print-editor print-editor-split${p.printing&&plan?'':' print-split-empty'}`}><div className="print-split-choice">
    <p className="hint">{t("При разделении стенки увеличиваются минимум до 5 мм, дно — до 3 мм. Размер отсеков изменится. Для сборки потребуются штифты и клей.")}</p>
    {!p.footprint&&!p.tilt&&<div className="assembly-tabs" aria-label={t("Количество частей")}>{([2,3] as const).map(n=><button key={n} disabled={!!p.shell} aria-pressed={p.printing?.parts===n} className={p.printing?.parts===n?'active':''} onClick={()=>apply(n)}>{n} {t(" части")}</button>)}</div>}
    {!p.printing&&!p.shell&&plan&&<button className="print-action" onClick={()=>apply(plan!.settings.parts)}>{t("Предложить разрезы · ")}{plan.settings.parts} {t(" части")}</button>}
    {p.shell&&<><p className="hint" role="status">{t("Оболочка недоступна для печати по частям. Уберите оболочку или верните цельную модель.")}</p><button className="print-action" onClick={()=>change(p=>editProject(p,d=>{delete d.shell;}))}>{t("Убрать оболочку")}</button></>}
    {problem&&!p.shell&&<p className="hint" role="status">{t(problem)}</p>}
    </div>{p.printing&&plan&&<><div className="shell-dimensions"><b>{p.printing.parts} {t(" секции · ")}{plan.axis==='x'?t("по длине"):t("по ширине")}</b><span>{t("Швы: ")}{plan.cuts.join(' / ')} {t(" мм от ")}{plan.axis==='x'?t("левого"):t("переднего")} {t(" края")}</span><span>{t("Для сборки нужны штифты и клей. Стенки — от 5 мм, дно — от 3 мм. Возможен поворот на столе на 90°.")}</span></div><div className="print-split-actions"><button className="print-action" aria-pressed={exploded} onClick={()=>onExploded(!exploded)}>{exploded?t("Показать сборку"):t("Раздвинуть части")}</button><button className="primary print-action" disabled={busy||!!p.shell} onClick={onExport}>{t("↓ Скачать все части")}</button></div></>}
    {p.printing&&<button className="text-button" onClick={()=>{change(p=>editProject(p,d=>{d.printArea={bedWidth:current.bedWidth,bedDepth:current.bedDepth,bedHeight:current.bedHeight,printerId:current.printerId};delete d.printing;}));onExploded(false);}}>{t("Вернуть цельную модель")}</button>}
    </section></SettingsPage><SettingsPage title="Образец соединения"><section className="print-editor print-editor-sample"><div><p className="hint" role="note">{t(PIN_FIT_WARNING)}</p><button className="print-action" disabled={busy} onClick={onSample}>{t("↓ Образец соединения")}</button></div><div><h3>{t("Как напечатать образец")}</h3><p className="hint">{t("Выберите 3MF, чтобы открыть детали вместе, или STL, чтобы скачать ZIP. Для первой пробы используйте organizer-1 и organizer-2 как два отдельных объекта.")}</p><p className="hint">{t("Масштаб 100%, миллиметры. Дно на столе, открытая сторона вверх. Между деталями оставьте около 10 мм. Не соединяйте их перед печатью.")}</p><p className="hint">{t("После остывания проверьте посадку штифтов, затем склейте половины.")}</p></div><p className="hint print-sample-note">{t("Для сборки обязательно используйте клей. Сначала проверьте посадку штифтов на образце; прочность зависит от материала и качества склейки.")}</p>
  </section></SettingsPage></SettingsPages></section>;
}
