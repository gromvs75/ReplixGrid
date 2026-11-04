import {type Cell,type Project,LIMITS} from './model.js';
import {regions,editProject,cellById} from './editor.js';
import {measureCell,compartmentMeasure,measurementContext} from './compartmentMeasure.js';

export type DimensionAxis='x'|'y';
export const supportsDimensions=(p:Project)=>!p.footprint&&!p.tilt;
const span=(r:{width:number;depth:number},axis:DimensionAxis)=>axis==='x'?r.width:r.depth;
// Minimum parent span preserving every descendant's existing split ratio.
function minimum(c:Cell,axis:DimensionAxis,t:number):number{
 const s=c.split;if(!s)return LIMITS.minCell;
 const a=minimum(s.first,axis,t),b=minimum(s.second,axis,t);
 return s.axis===axis?t+Math.max(a/s.ratio,b/(1-s.ratio)):Math.max(a,b);
}
export function dimensionControl(p:Project,id:string,axis:DimensionAxis){
 if(!supportsDimensions(p))return null;
 const all=regions(p),leaf=all.find(r=>r.cell.id===id);if(!leaf||leaf.cell.split)return null;
 const path:{cell:Cell;first:boolean}[]=[];
 function find(c:Cell):boolean{
  if(c.id===id)return true;if(!c.split)return false;
  for(const first of [true,false]){path.push({cell:c,first});if(find(first?c.split.first:c.split.second))return true;path.pop();}return false;
 }
 find(p.root);
 const ancestor=path.reverse().find(a=>a.cell.split!.axis===axis);if(!ancestor)return null;
 const parent=all.find(r=>r.cell.id===ancestor.cell.id)!,s=ancestor.cell.split!;
 const branch=ancestor.first?s.first:s.second,neighbor=ancestor.first?s.second:s.first;
 const available=span(parent,axis)-p.wallThickness;
 const rawMin=minimum(branch,axis,p.wallThickness),rawMax=available-minimum(neighbor,axis,p.wallThickness);
 const probe=structuredClone(p),split=cellById(probe.root,parent.cell.id)!.split!;
 const measured=(raw:number)=>{split.ratio=ancestor.first?raw/available:1-raw/available;return measureCell(probe,id,axis)?.value??0;};
 return {axis,dividerId:parent.cell.id,first:ancestor.first,value:measureCell(p,id,axis)?.value??0,
  min:measured(rawMin),max:measured(rawMax),rawMin,rawMax,rawValue:span(leaf,axis),available};
}
export function resizeCompartment(p:Project,id:string,axis:DimensionAxis,value:number):Project{
 const c=dimensionControl(p,id,axis);
 if(!c)throw new Error('Точный размер здесь пока недоступен.');
 if(!Number.isFinite(value)||value<=0||value<c.min-1e-7||value>c.max+1e-7)throw new Error('Размер не оставляет достаточно места соседним отсекам.');
 if(Math.abs(value-c.value)<1e-7)return p;
 // The contour can truncate either end of the nominal rectangle. Solve the
 // actual centreline span, keeping the transverse measurement location fixed.
 const probe=structuredClone(p),split=cellById(probe.root,c.dividerId)!.split!;
 let lo=c.rawMin,hi=c.rawMax;
 for(let i=0;i<48;i++){
  const raw=(lo+hi)/2;split.ratio=c.first?raw/c.available:1-raw/c.available;
  if((measureCell(probe,id,axis)?.value??0)<value)lo=raw;else hi=raw;
 }
 const raw=(lo+hi)/2;
 return editProject(p,d=>{
  const s=cellById(d.root,c.dividerId)!.split!;
  let ratio=c.first?raw/c.available:1-raw/c.available;
  // Keep exact limiting requests inside the valid interval despite floating-point
  // cancellation in available - first. Error is below 1e-6 mm at model limits.
  if(value===c.min||value===c.max)ratio+=Math.sign(s.ratio-ratio)*1e-12;
  s.ratio=ratio;
 });
}
export function dimensionChanges(p:Project,next:Project){
 if(p===next)return [];
 const before=regions(p).filter(r=>!r.cell.split);
 const a=measurementContext(p),b=measurementContext(next);
 return regions(next).filter(r=>!r.cell.split).flatMap((r,i)=>{
  const old=before.find(v=>v.cell.id===r.cell.id)!;
  const changed=(['x','y'] as const).some(axis=>Math.abs((compartmentMeasure(p,old,axis,a)?.value??0)-(compartmentMeasure(next,r,axis,b)?.value??0))>1e-7);
  return changed?[{number:i+1,before:old,after:r}]:[];
 });
}
