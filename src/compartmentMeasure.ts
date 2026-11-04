import type {Project} from './model.js';
import {regions,type Region} from './editor.js';
import {footprintContour,lineSpan} from './footprint.js';
import {innerCornerPatches,INNER_CORNER_OVERLAP} from './innerCornerGeometry.js';
import type {XY} from './rounding.js';

/** Intersect the rounded offset of a fillet patch with a measurement line.
 * Its offset is the union of the polygon, edge strips and vertex discs.
 * The kernel tessellates the same round offset; error here is below 0.00001 mm.
 */
function patchSpan(poly:XY[],axis:'x'|'y',coord:number):[number,number]|null{
 const r=INNER_CORNER_OVERLAP,at=axis==='x'?1:0,along=1-at;
 const transverse=poly.map(p=>p[at]);
 if(coord<Math.min(...transverse)-r||coord>Math.max(...transverse)+r)return null;
 const spans:[number,number][]=[];const add=(s:[number,number]|null)=>{if(s)spans.push(s);};
 add(lineSpan(poly,axis,coord));
 poly.forEach((a,i)=>{
  const b=poly[(i+1)%poly.length],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
  if(length>1e-12){const x=-dy*r/length,y=dx*r/length;add(lineSpan([[a[0]+x,a[1]+y],[b[0]+x,b[1]+y],[b[0]-x,b[1]-y],[a[0]-x,a[1]-y]],axis,coord));}
  const delta=coord-a[at];if(Math.abs(delta)<=r){const reach=Math.sqrt(Math.max(0,r*r-delta*delta));add([a[along]-reach,a[along]+reach]);}
 });
 return spans.length?[Math.min(...spans.map(s=>s[0])),Math.max(...spans.map(s=>s[1]))]:null;
}

export function measurementContext(p:Project){return {contour:footprintContour(p,-p.wallThickness),patches:innerCornerPatches(p)};}
export function compartmentMeasure(p:Project,r:Region,axis:'x'|'y',context=measurementContext(p)){
 const coord=axis==='x'?r.y+r.depth/2:r.x+r.width/2;
 const bounds=lineSpan(context.contour,axis,coord);if(!bounds)return null;
 const lo=Math.max(bounds[0],axis==='x'?r.x:r.y),hi=Math.min(bounds[1],axis==='x'?r.x+r.width:r.y+r.depth);
 if(hi<=lo)return null;
 let intervals:[number,number][]=[[lo,hi]];
 for(const {patch} of context.patches){
  const cut=patchSpan(patch,axis,coord);if(!cut)continue;
  intervals=intervals.flatMap(([a,b])=>cut[1]<=a||cut[0]>=b?[[a,b] as [number,number]]:[...(cut[0]>a?[[a,cut[0]] as [number,number]]:[]),...(cut[1]<b?[[cut[1],b] as [number,number]]:[])]);
 }
 if(intervals.length!==1)return null;
 const [start,end]=intervals[0];
 return {start,end,coord,value:end-start};
}
export function measureCell(p:Project,id:string,axis:'x'|'y'){
 const r=regions(p).find(r=>r.cell.id===id);return r?compartmentMeasure(p,r,axis):null;
}
