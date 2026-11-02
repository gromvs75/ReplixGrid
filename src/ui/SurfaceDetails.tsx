import {t} from '../i18n.js';
import {reliefNames,reliefPatterns,reliefValue,type ReliefPattern} from '../reliefPatterns.js';
import {useEditor} from '../store.js';
import {editProject} from '../editor.js';
import type {Relief,Wall,WallCutout} from '../model.js';
import {Field} from './Field.js';
const cutNames={smooth:'Плавный',round:'Полукруг',square:'Прямоугольный'};
export function CutoutControls({wall}:{wall:Wall}){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change),cut=p.cutouts?.[wall.id];
 const set=(patch:Partial<WallCutout>)=>change(p=>editProject(p,d=>{d.cutouts={...d.cutouts,[wall.id]:{shape:'smooth',width:.5,depth:Math.max(1,Math.min(wall.startHeight,wall.endHeight)*.6),position:.5,...d.cutouts?.[wall.id],...patch}};}));
 if(p.footprint==='honeycomb')return <p className="hint">{t("Вырезы доступны у обычных стенок и перегородок. Для сот пока меняется высота целой ячейки.")}</p>;
 return <details className="surface-details"><summary>{t("Вырез в стенке")}{cut?t(" · включён"):''}</summary><div className="surface-options" role="group" aria-label={t("Форма выреза")}><button aria-pressed={!cut} onClick={()=>change(p=>editProject(p,d=>{if(d.cutouts)delete d.cutouts[wall.id];}))}>{t("Без выреза")}</button>{(['smooth','round','square'] as const).map(shape=><button key={shape} aria-pressed={cut?.shape===shape} onClick={()=>set({shape})}><svg viewBox="0 0 60 26" aria-hidden="true"><path d={shape==='smooth'?'M2 3H8C20 3 17 23 24 23H36C43 23 40 3 52 3H58':shape==='round'?'M2 3H10A20 20 0 0 0 50 3H58':'M2 3H14V19Q14 23 18 23H42Q46 23 46 19V3H58'}/></svg>{t(cutNames[shape])}</button>)}</div>{cut&&<><Field label={t("Глубина выреза")} value={cut.depth} min={1} max={Math.max(cut.depth,wall.startHeight,wall.endHeight)} step={.5} onChange={depth=>set({depth})}/><Field label={t("Ширина выреза")} value={cut.width*wall.length*.9} min={wall.length*.09} max={wall.length*.72} step={.5} onChange={width=>set({width:width/(wall.length*.9)})}/><Field label={t("Положение выреза")} value={cut.position*100} min={0} max={100} unit="%" onChange={position=>set({position:position/100})}/><p className="hint">{t("Глубина — вниз от верхнего края. Дно и небольшой бортик сохраняются. 0% — у конца А, 100% — у Б.")}</p></>}</details>;
}
export function ReliefControls(){
 const p=useEditor(s=>s.project),change=useEditor(s=>s.change),relief=p.relief;
 const maxDepth=3;
 const set=(patch:Partial<Relief>)=>change(p=>editProject(p,d=>{d.relief={pattern:'ribs',spacing:8,depth:1,...d.relief,...patch};}));
 return <details className="surface-details"><summary>{t("Рельеф органайзера")}{relief?t(" · включён"):''}</summary><p className="hint">{t("Узоры · прокрутите каталог, чтобы увидеть все.")}</p><div className="surface-options relief-gallery" role="group" aria-label={t("Рельеф органайзера")}><button aria-pressed={!relief} onClick={()=>change(p=>editProject(p,d=>{delete d.relief;}))}>{t("Гладкий")}</button>{reliefPatterns.map(pattern=><button key={pattern} aria-pressed={relief?.pattern===pattern} onClick={()=>set({pattern})}><ReliefSwatch pattern={pattern}/>{t(reliefNames[pattern])}</button>)}</div>{relief&&<><Field commitOnRelease label={t("Размер узора")} value={relief.spacing} min={4} max={16} onChange={spacing=>set({spacing})}/><Field commitOnRelease label={t("Выраженность")} value={Math.min(relief.depth,maxDepth)} min={Math.min(.2,maxDepth)} max={maxDepth} step={.01} onChange={depth=>set({depth})}/><p className="hint">{t("Объёмный узор снаружи, внутри — гладко. Выступы нарастают наружу, основная стенка остаётся целой. Пересчёт — после отпускания ползунка. Оболочка учитывает выступы. Полный габарит увеличивается.")}</p></>}</details>;
}

const swatches=Object.fromEntries(reliefPatterns.map(pattern=>{
 const bands=Array.from({length:6},()=> '');
 for(let y=0;y<16;y++)for(let x=0;x<24;x++)bands[Math.min(5,Math.floor(reliefValue(pattern,x/8,y/8)*6))]+=`M${x*2} ${y*2}h2v2h-2z`;
 return [pattern,bands];
})) as Record<ReliefPattern,string[]>;
export function ReliefSwatch({pattern}:{pattern:ReliefPattern}){
 return <svg viewBox="0 0 48 32" aria-hidden="true">{swatches[pattern].map((d,i)=><path key={i} d={d} fill={`hsl(211 18% ${88-i*9}%)`} stroke="none"/>)}</svg>;
}
