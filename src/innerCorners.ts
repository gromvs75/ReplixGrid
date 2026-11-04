import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import type {Project,Wall} from './model.js';
import {innerCornerPatches,INNER_CORNER_OVERLAP} from './innerCornerGeometry.js';
import {type XY} from './rounding.js';
import {footprintContour} from './footprint.js';
import {topAt} from './shell.js';
/** Fill the concave material corners inside compartments, never cut into a wall. */
export function roundInnerCorners(wasm:ManifoldToplevel,p:Project,walls:Wall[],body:Manifold,keep:(m:Manifold)=>Manifold){
 const patches=innerCornerPatches(p);if(!patches.length)return body;
 const outer=new wasm.CrossSection([footprintContour(p)]);
 const additions:Manifold[]=[];
 try{for(const {corner:b,patch} of patches){
  const supports=walls.filter(w=>{const xmin=w.x,xmax=w.x+(w.axis==='x'?w.length:w.thickness),ymin=w.y,ymax=w.y+(w.axis==='x'?w.thickness:w.length);return b[0]>=xmin-.02&&b[0]<=xmax+.02&&b[1]>=ymin-.02&&b[1]<=ymax+.02;});
  const height=(x:number,y:number)=>supports.length?Math.min(...supports.map(w=>topAt(w,(w.axis==='x'?x-w.x:y-w.y)))):p.height;
  const floor=p.floorThickness-.02;
  const section=new wasm.CrossSection([patch]),expanded=section.offset(INNER_CORNER_OVERLAP,'Round',2,128),clipped=expanded.intersect(outer);
  try{if(clipped.area()>1e-8)additions.push(keep(keep(clipped.extrude(1)).warp(vertex=>{vertex[2]=floor+vertex[2]*Math.max(.02,height(vertex[0],vertex[1])-floor);} )));}
  finally{clipped.delete();expanded.delete();section.delete();}
 }
 return additions.length?keep(wasm.Manifold.union([body,...additions])):body;
 }finally{outer.delete();}
}

/** Round convex cavity corners inward, retaining straight exterior faces. */
export function roundedCavity(poly:XY[],radius:number|number[]):XY[]{
 if(!radius)return poly;
 return poly.flatMap((b,i)=>{
  const a=poly[(i+poly.length-1)%poly.length],c=poly[(i+1)%poly.length];
  const la=Math.hypot(a[0]-b[0],a[1]-b[1]),lc=Math.hypot(c[0]-b[0],c[1]-b[1]);
  if(Math.min(la,lc)<1e-6)return [b];
  const u=[(a[0]-b[0])/la,(a[1]-b[1])/la],v=[(c[0]-b[0])/lc,(c[1]-b[1])/lc];
  if(u[0]*v[1]-u[1]*v[0]>=-1e-6)return [b];
  const theta=Math.acos(Math.max(-1,Math.min(1,u[0]*v[0]+u[1]*v[1])));
  if(Math.PI-theta<Math.PI/18)return [b];
  const cornerRadius=Array.isArray(radius)?radius[i]:radius;
  if(!cornerRadius)return [b];
  const t=Math.min(cornerRadius/Math.tan(theta/2),la*.45,lc*.45),r=t*Math.tan(theta/2);
  const d=r/Math.sin(theta/2),norm=Math.hypot(u[0]+v[0],u[1]+v[1]);
  const center=[b[0]+(u[0]+v[0])/norm*d,b[1]+(u[1]+v[1])/norm*d];
  const start=Math.atan2(b[1]+u[1]*t-center[1],b[0]+u[0]*t-center[0]);
  return Array.from({length:33},(_,k)=>[center[0]+r*Math.cos(start+(Math.PI-theta)*k/32),center[1]+r*Math.sin(start+(Math.PI-theta)*k/32)] as XY);
 });
}
