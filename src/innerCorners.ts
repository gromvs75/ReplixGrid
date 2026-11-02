import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import type {Project,Wall} from './model.js';
import {regions} from './editor.js';
import {clipRectangle,type XY} from './rounding.js';
import {footprintContour} from './footprint.js';
import {topAt} from './shell.js';
/** Fill the concave material corners inside compartments, never cut into a wall. */
export function roundInnerCorners(wasm:ManifoldToplevel,p:Project,walls:Wall[],body:Manifold,keep:(m:Manifold)=>Manifold){
 const radius=p.innerCornerRadius??0;if(!radius||p.footprint==='honeycomb')return body;
 const interior=footprintContour(p,-p.wallThickness);
 // Build rectangular cavities from their four true corners, not from the
 // tessellated outer arc: short arc facets used to truncate nearby fillets.
 const rectangular=!p.footprint&&p.cornerStyle!=='chamfer';
 const cells=regions(p).filter(r=>!r.cell.split).map(r=>rectangular
  ? [[r.x,r.y],[r.x+r.width,r.y],[r.x+r.width,r.y+r.depth],[r.x,r.y+r.depth]] as XY[]
  : clipRectangle(interior,r.x,r.y,r.width,r.depth));
 // For flat and sloped walls retain the existing outside-round offset. Step
 // corners supply that offset locally above the step, so other compartment
 // corners must use only the independently chosen inner radius.
 const room=rectangular?Math.min(...cells.map(poly=>Math.min(
  Math.hypot(poly[1][0]-poly[0][0],poly[1][1]-poly[0][1]),
  Math.hypot(poly[2][0]-poly[1][0],poly[2][1]-poly[1][1]))/2)):Infinity;
 const requested=rectangular?Math.min(room,p.steppedWalls?radius:Math.max(radius,(p.cornerRadius??0)-p.wallThickness)):radius;
 const outer=new wasm.CrossSection([footprintContour(p)]);
 const additions:Manifold[]=[];
 try{for(const poly of cells)for(let i=0;i<poly.length;i++){
  const b=poly[i],a=poly[(i+poly.length-1)%poly.length],c=poly[(i+1)%poly.length];
  const la=Math.hypot(a[0]-b[0],a[1]-b[1]),lc=Math.hypot(c[0]-b[0],c[1]-b[1]);if(la<1e-6||lc<1e-6)continue;
  const u=[(a[0]-b[0])/la,(a[1]-b[1])/la],v=[(c[0]-b[0])/lc,(c[1]-b[1])/lc];
  if(u[0]*v[1]-u[1]*v[0]>=-1e-6)continue;
  const theta=Math.acos(Math.max(-1,Math.min(1,u[0]*v[0]+u[1]*v[1])));
  if(Math.PI-theta<Math.PI/18)continue; // Already smooth contour facets.
  const tangent=Math.min(requested/Math.tan(theta/2),la*(rectangular?.5:.45),lc*(rectangular?.5:.45)),r=tangent*Math.tan(theta/2);
  const norm=Math.hypot(u[0]+v[0],u[1]+v[1]),d=r/Math.sin(theta/2);
  const center=[b[0]+(u[0]+v[0])/norm*d,b[1]+(u[1]+v[1])/norm*d];
  const start=Math.atan2(b[1]+u[1]*tangent-center[1],b[0]+u[0]*tangent-center[0]),sweep=Math.PI-theta;
  const patch:XY[]=[b,...Array.from({length:33},(_,k)=>[center[0]+r*Math.cos(start+sweep*k/32),center[1]+r*Math.sin(start+sweep*k/32)] as XY)].reverse();
  const supports=walls.filter(w=>{const xmin=w.x,xmax=w.x+(w.axis==='x'?w.length:w.thickness),ymin=w.y,ymax=w.y+(w.axis==='x'?w.thickness:w.length);return b[0]>=xmin-.02&&b[0]<=xmax+.02&&b[1]>=ymin-.02&&b[1]<=ymax+.02;});
  const height=(x:number,y:number)=>supports.length?Math.min(...supports.map(w=>topAt(w,(w.axis==='x'?x-w.x:y-w.y)))):p.height;
  const floor=p.floorThickness-.02;
  const section=new wasm.CrossSection([patch]),expanded=section.offset(.005,'Round',2,128),clipped=expanded.intersect(outer);
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
