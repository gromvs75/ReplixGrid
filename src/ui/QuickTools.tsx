import {t} from '../i18n.js';
import {useEditor} from '../store.js';
import {changeCompartmentCount,editProject,regions} from '../editor.js';
import {Field} from './Field.js';
export function QuickTools(){
 const {project:p,change,select}=useEditor();
 const count=regions(p).filter(r=>!r.cell.split).length;
 const adjust=(delta:1|-1)=>{change(p=>changeCompartmentCount(p,delta));const leaves=regions(useEditor.getState().project).filter(r=>!r.cell.split);select({type:'cell',id:leaves.at(-1)!.cell.id});};
 return <section><h2>{t("Отсеки ")}<small>{count}</small></h2><div className="split-buttons"><button disabled={count<=1} onClick={()=>adjust(-1)}>{t("− Отсек")}</button><button disabled={count>=(p.footprint==='honeycomb'?19:32)} onClick={()=>adjust(1)}>{t("+ Отсек")}</button></div><p className="hint">{p.footprint==='honeycomb'?t("Добавляем и убираем крайнюю ячейку. Размер остальных сохраняется; оболочка перестраивается."):t("Плюс делит самый большой отсек. Минус объединяет одну пару соседних отсеков.")} {t(" Можно отменить.")}</p></section>;
}

export function TiltSettings(){const {project:p,change}=useEditor();return <details><summary>{t("Наклон на плоском основании")}</summary><Field label={t("Наклон органайзера")} value={p.tilt??0} min={0} max={25} unit="°" onChange={n=>change(p=>editProject(p,d=>{d.tilt=n;}))}/><p className="hint">{t("Дно остаётся горизонтальным, его толщина не меняется. Стенки наклоняются вперёд без клина снизу. Отсеки и стенки можно выбирать на модели или в правой панели. Печать целиком; необходимость поддержек проверьте в слайсере.")}</p></details>;}
