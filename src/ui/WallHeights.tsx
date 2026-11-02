import {t} from '../i18n.js';
import {endLabels} from '../orientation.js';
import {Field} from './Field.js';
import {useEditor} from '../store.js';
import {cellById,editProject,fitDividerEnds,setStepHeight} from '../editor.js';
import {resolveWalls,type Side,type Wall,type WallProfile} from '../model.js';
const sources:Record<Side,[Side,Side]>={front:['left','right'],back:['left','right'],left:['front','back'],right:['front','back']};
export function WallHeights({wall,outer,stepIndex}:{wall:Wall;outer:boolean;stepIndex?:number}){
  const p=useEditor(s=>s.project),change=useEditor(s=>s.change),side=wall.id as Side;
  const linked=outer&&p.transitions.includes(side);
  const profile=outer?p.wallProfiles?.[side]:cellById(p.root,wall.id)?.split?.profile;
  const labels=endLabels(wall.axis);
  const manual=()=>change(p=>editProject(p,d=>{
    const w=resolveWalls(d).find(w=>w.id===wall.id)!;
    const value:WallProfile={start:w.startHeight,end:w.endHeight,style:w.transitionStyle??'straight',wavelength:w.wavelength};
    if(outer){d.transitions=d.transitions.filter(s=>s!==side);d.wallProfiles={...d.wallProfiles,[side]:value};}
    else cellById(d.root,wall.id)!.split!.profile=value;
  }));
  const flat=(height?:number)=>change(p=>editProject(p,d=>{
    const h=height??wall.startHeight;
    if(outer){d.transitions=d.transitions.filter(s=>s!==side);if(d.wallProfiles)delete d.wallProfiles[side];d.heights[side]=h;}
    else {const split=cellById(d.root,wall.id)!.split!;delete split.profile;split.height=h;}
  }));
  const setEnd=(key:'start'|'end',n:number)=>change(p=>editProject(p,d=>{
    if(linked){const source=sources[side][key==='start'?0:1],sourceProfile=d.wallProfiles?.[source];
      if(sourceProfile)sourceProfile[side==='front'||side==='left'?'start':'end']=n;else d.heights[source]=n;
    }else {const value=outer?d.wallProfiles![side]!:(cellById(d.root,wall.id)!.split!.profile??={start:wall.startHeight,end:wall.endHeight,style:'straight'});value[key]=n;}
  }));
  if(outer&&p.steppedWalls&&(side==='left'||side==='right')){
    const count=resolveWalls(p).find(w=>w.id==='front')!.stepPoints!.length;
    return <div className="wall-heights"><Field label={t("Высота стенки")} value={wall.startHeight} min={p.floorThickness+.4} max={200} onChange={n=>change(p=>setStepHeight(p,'front',side==='left'?0:count-1,n))}/><p className="hint">{t("Высота ступени связана с соответствующей перегородкой и второй боковой стенкой.")}</p></div>;
  }
  if(outer&&stepIndex!==undefined&&wall.stepPoints){
    return <div className="wall-heights"><Field label={t("Высота ступени")} value={wall.stepPoints[stepIndex][1]} min={p.floorThickness+.4} max={200} onChange={n=>change(p=>setStepHeight(p,side as 'front'|'back',stepIndex,n))}/><p className="hint">{t("Высота ступени связана с соответствующей перегородкой и второй боковой стенкой.")}</p></div>;
  }
  return <div className="wall-heights">{<div className="assembly-tabs" aria-label={t("Режим высоты стенки")}><button aria-pressed={!profile&&!linked} className={!profile&&!linked?'active':''} onClick={()=>flat()}>{t("Одна высота")}</button><button aria-pressed={!!profile||linked} className={profile||linked?'active':''} onClick={manual}>{t("Две точки")}</button></div>}
    {linked||profile?<>{(['start','end'] as const).map((key,i)=><Field key={key} label={labels[i]} value={i===0?wall.startHeight:wall.endHeight} min={p.floorThickness+.4} max={Math.max(200,wall.startHeight,wall.endHeight)} onChange={n=>setEnd(key,n)}/>)}{linked?<p className="hint">{t("Высоты связаны с соседями. «Две точки» — независимая настройка.")}</p>:<><div className="assembly-tabs" aria-label={t("Край выбранной стенки")}>{(['straight','wavy','zigzag'] as const).map(style=><button key={style} aria-pressed={(profile?.style??'straight')===style} className={(profile?.style??'straight')===style?'active':''} onClick={()=>change(p=>editProject(p,d=>{const value=outer?d.wallProfiles![side]!:(cellById(d.root,wall.id)!.split!.profile??={start:wall.startHeight,end:wall.endHeight,style:'straight'});value.style=style;if(style!=='straight')value.wavelength??=24;}))}>{style==='straight'?t("Прямой"):style==='wavy'?t("Волнистый"):t("Зигзаг")}</button>)}</div>{profile&&profile.style!=='straight'&&<Field label={t("Длина волны / зигзага")} value={profile.wavelength??24} min={6} max={200} onChange={n=>change(p=>editProject(p,d=>{const value=outer?d.wallProfiles![side]!:cellById(d.root,wall.id)!.split!.profile!;value.wavelength=n;}))}/>}<p className="hint">{t("Меняется выбранная стенка.")}{outer?t(" Оболочка повторяет край."):t(" Остальные стенки сохраняют высоты.")}</p></>}</>:<Field label={t("Высота стенки")} value={wall.startHeight} min={p.floorThickness+.4} max={Math.max(200,wall.startHeight)} onChange={flat}/>}
    {!outer&&<><button className="quiet" onClick={()=>change(p=>fitDividerEnds(p,wall.id))}>{t("Подогнать под соседние стенки")}</button><p className="hint">{t("А и Б отмечены на модели. Подгонка меняет высоты двух концов один раз; после изменения соседей её можно повторить. Дно остаётся плоским.")}</p></>}
    <button className="text-button" onClick={()=>change(p=>editProject(p,d=>{if(outer){d.transitions=d.transitions.filter(s=>s!==side);if(d.wallProfiles)delete d.wallProfiles[side];delete d.heights[side];}else {const split=cellById(d.root,wall.id)!.split!;delete split.profile;delete split.height;}}))}>{t("Как у остальных · ")}{p.height} {t(" мм")}</button>
  </div>;
}
