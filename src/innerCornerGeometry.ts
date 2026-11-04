import type {Project} from './model.js';
import {regions} from './editor.js';
import {clipRectangle,type XY} from './rounding.js';
import {footprintContour} from './footprint.js';

export const INNER_CORNER_OVERLAP=.005;
/** Shared 2D material patches: measurement and export use identical fillets. */
export function innerCornerPatches(p:Project){
 const radius=p.innerCornerRadius??0;if(!radius||p.footprint==='honeycomb')return [];
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
 const patches:{corner:XY;patch:XY[]}[]=[];
 for(const poly of cells)for(let i=0;i<poly.length;i++){
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
  patches.push({corner:b,patch});
 }
 return patches;
}
