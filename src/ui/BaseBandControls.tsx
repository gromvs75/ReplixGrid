import {t} from '../i18n.js';
import {editProject} from '../editor.js';
import {useEditor} from '../store.js';
import {Field} from './Field.js';
import {resolveWalls} from '../model.js';

export function BaseBandControls(){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change),band=p.baseBand;
 const cutoutLimits=resolveWalls({...p,baseBand:undefined}).slice(0,4).filter(w=>w.cutout).map(w=>Math.max(p.floorThickness+.8,Math.min(w.startHeight,w.endHeight)-w.cutout!.depth));
 const lowest=Math.min(p.height,...Object.values(p.heights),...Object.values(p.wallProfiles??{}).flatMap(v=>[v.start,v.end]),...(p.honeycombHeights??[]).filter((h):h is number=>h!==null),...cutoutLimits);
 const max=Math.min(12,Math.floor((lowest-.5)*2)/2);
 const choose=(style:'smooth'|'rings'|'steps')=>change(current=>editProject(current,d=>{d.baseBand={height:d.baseBand?.height??Math.max(1.2,Math.min(4,max)),style};}));
 return <details className="surface-details"><summary>{t('Нижний кант')}{band?t(' · включён'):''}</summary>
  <div className="surface-options" role="group" aria-label={t('Нижний кант')}>
   <button aria-pressed={!band} onClick={()=>change(current=>editProject(current,d=>{delete d.baseBand;}))}>{t('Без канта')}</button>
   {([['smooth','Гладкий'],['rings','Полосы'],['steps','Ступени']] as const).map(([value,label])=><button key={value} aria-pressed={band?.style===value} onClick={()=>choose(value)}>{t(label)}</button>)}
  </div>
  {band&&<><Field commitOnRelease label={t('Высота канта')} min={1.2} max={Math.max(1.2,max)} step={.2} value={band.height} onChange={height=>change(current=>editProject(current,d=>{if(d.baseBand)d.baseBand.height=height;}))}/><p className="hint">{t('Кант выступает наружу. С совместимой оболочкой он также служит нижней опорой.')}</p></>}
  <p className="hint">{t('Пока без наклона, разделения и ярусов. С оболочкой — без отдельных панелей.')}</p>
 </details>;
}
