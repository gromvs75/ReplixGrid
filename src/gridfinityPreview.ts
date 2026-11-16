import {gridfinityRadii,gridfinityRegions,gridfinityInnerRadiusLimit,gridfinitySize,type GridfinityProject} from './gridfinity.js';
import {roundedContour,type XY} from './rounding.js';
import {decodeSTL,type Point} from './stl.js';
/** Intersection of convex CCW contours, matching the kernel's cavity/envelope intersection. */
export function intersectConvex(subject:XY[],clip:XY[]):XY[]{
 let points=subject;
 for(let i=0;i<clip.length&&points.length;i++){
  const a=clip[i],b=clip[(i+1)%clip.length],side=(p:XY)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);
  const next:XY[]=[];
  for(let j=0;j<points.length;j++){const p=points[j],q=points[(j+1)%points.length],dp=side(p),dq=side(q),inside=dp>=-1e-8,outside=dq>=-1e-8;
   if(inside)next.push(p);if(inside!==outside){const k=dp/(dp-dq);next.push([p[0]+k*(q[0]-p[0]),p[1]+k*(q[1]-p[1])]);}
  }points=next;
 }
 return points.filter((p,i)=>Math.hypot(p[0]-points[(i+points.length-1)%points.length][0],p[1]-points[(i+points.length-1)%points.length][1])>1e-7);
}
export function gridfinityCavities(p:GridfinityProject){
 const [w,d]=gridfinitySize(p,'tray'),{outerRadius,innerRadius}=gridfinityRadii(p),radius=Math.min(innerRadius,gridfinityInnerRadiusLimit(p));
 const envelope=roundedContour(w-2*p.wall,d-2*p.wall,Math.max(.2,outerRadius-p.wall),p.wall,p.wall);
 return gridfinityRegions(p).filter(r=>!r.cell.split).map(r=>({...r,points:intersectConvex(roundedContour(r.width,r.depth,radius,r.x,r.y),envelope)}));
}
/** Keep reference feet and lower shell; the interactive upper shell is a constant extrusion above Z=7. */
export function gridfinityLowerPositions(stl:ArrayBuffer){
 const out:number[]=[];
 for(const triangle of decodeSTL(stl)){
  if(triangle.every(p=>p[2]>=7-1e-6))continue;
  const points:Point[]=[];
  for(let i=0;i<3;i++){const a=triangle[i],b=triangle[(i+1)%3],inside=a[2]<=7,next=b[2]<=7;if(inside)points.push(a);if(inside!==next){const k=(7-a[2])/(b[2]-a[2]);points.push([a[0]+k*(b[0]-a[0]),a[1]+k*(b[1]-a[1]),7]);}}
  for(let i=1;i+1<points.length;i++)out.push(...points[0],...points[i],...points[i+1]);
 }return out;
}
