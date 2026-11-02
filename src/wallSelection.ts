import {tiltSlope} from './tilt.js';
import {BufferGeometry,Float32BufferAttribute} from 'three';
import {footprintContour,honeyCells} from './footprint.js';
import {resolveWalls,type Project,type Side} from './model.js';
export type SelectionPoint=[number,number,number];
const sides=['front','back','left','right'] as const;
/** Stable model sides, independent of camera rotation. Capsule ends include their full semicircle. */
export function boundarySide(p:Project,x:number,y:number):Side{
 const r=p.cornerRadius??0;
 if(!p.footprint&&r>=p.width/2-1e-6&&p.depth>p.width){if(y<=r)return 'front';if(y>=p.depth-r)return 'back';return x<p.width/2?'left':'right';}
 if(!p.footprint&&r>=p.depth/2-1e-6&&p.width>p.depth){if(x<=r)return 'left';if(x>=p.width-r)return 'right';return y<p.depth/2?'front':'back';}
 const distances=[Math.abs(y),Math.abs(p.depth-y),Math.abs(x),Math.abs(p.width-x)];
 return sides[distances.indexOf(Math.min(...distances))];
}
/** Select only existing surface triangles; never draw the old unrounded box over the result. */
export function boundarySelections(p:Project,source:BufferGeometry){
 const lean=tiltSlope(p);
 const contour=footprintContour(p),position=source.getAttribute('position'),index=source.getIndex();
 const count=index?.count??position.count,triangles:Record<string,number[]>=p.footprint==='honeycomb'?Object.fromEntries(honeyCells(p).map((_,i)=>['honey-'+i,[]])):{front:[],back:[],left:[],right:[]};
 const stepped=p.steppedWalls?resolveWalls(p):[];
 if(stepped.length)for(const side of ['front','back'] as const){delete triangles[side];for(let i=0;i<(stepped.find(w=>w.id===side)?.stepPoints?.length??0);i++)triangles[side+'@'+i]=[];}
 const cells=p.footprint==='honeycomb'?honeyCells(p):[];
 const cellOwner=(x:number,y:number)=>{let best=Infinity,owner=0;for(const [i,cell] of cells.entries())for(const [j,a] of cell.entries()){const b=cell[(j+1)%cell.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy))),d=(x-a[0]-dx*t)**2+(y-a[1]-dy*t)**2;if(d<best){best=d;owner=i;}}return 'honey-'+owner;};
 // Broad-phase bounds and squared distances avoid scanning/allocating the
 // complete contour for every vertex in a detailed relief mesh.
 const band=p.wallThickness+.01,band2=band*band;
 const segments=contour.map((a,i)=>{const b=contour[(i+1)%contour.length],dx=b[0]-a[0],dy=b[1]-a[1];return {x:a[0],y:a[1],dx,dy,length2:dx*dx+dy*dy,minX:Math.min(a[0],b[0])-band,maxX:Math.max(a[0],b[0])+band,minY:Math.min(a[1],b[1])-band,maxY:Math.max(a[1],b[1])+band};});
 const nearBoundary=(x:number,y:number)=>{
  for(const s of segments){
   if(x<s.minX||x>s.maxX||y<s.minY||y>s.maxY)continue;
   const t=Math.max(0,Math.min(1,((x-s.x)*s.dx+(y-s.y)*s.dy)/s.length2));
   if((x-s.x-s.dx*t)**2+(y-s.y-s.dy*t)**2<=band2)return true;
  }
  return false;
 };
 for(let i=0;i<count;i+=3){
  const pts=Array.from({length:3},(_,k)=>{const n=index?index.getX(i+k):i+k;return [position.getX(n),position.getY(n),position.getZ(n)] as SelectionPoint;});
  // Exclude the floor and internal partitions. All three vertices must lie in the perimeter band.
  if(pts.every(v=>v[2]<=p.floorThickness+.001)||pts.some(v=>!nearBoundary(v[0]-v[2]*lean,v[1])))continue;
  const x=pts.reduce((s,v)=>s+v[0]-v[2]*lean,0)/3,y=pts.reduce((s,v)=>s+v[1],0)/3;
  if(!nearBoundary(x,y))continue;
  const side=boundarySide(p,x,y),steps=stepped.find(w=>w.id===side)?.stepPoints;
  if(steps){
   const coordinate=(v:SelectionPoint)=>v[0]-v[2]*lean;
   const clip=(input:SelectionPoint[],cut:number,keepAbove:boolean)=>{
    const out:SelectionPoint[]=[];for(let k=0;k<input.length;k++){
     const a=input[k],b=input[(k+1)%input.length],da=coordinate(a)-cut,db=coordinate(b)-cut,ain=keepAbove?da>=0:da<=0,bin=keepAbove?db>=0:db<=0;
     if(ain)out.push(a);if(ain!==bin){const f=da/(da-db);out.push(a.map((v,i)=>v+(b[i]-v)*f) as SelectionPoint);}
    }return out;
   };
   for(let k=0;k<steps.length;k++){
    let poly=pts;if(k>0)poly=clip(poly,steps[k][0],true);if(k+1<steps.length)poly=clip(poly,steps[k+1][0],false);
    for(let j=1;j+1<poly.length;j++)triangles[side+'@'+k].push(...poly[0],...poly[j],...poly[j+1]);
   }
  }else triangles[cells.length?cellOwner(x,y):side].push(...pts.flat());
 }
 return Object.keys(triangles).map(id=>{
  const side:Side=cells.length?'front':id.split('@')[0] as Side,cellId=cells.length?id:undefined,stepIndex=id.includes('@')?Number(id.split('@')[1]):undefined;
  const vertices=triangles[id],geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();
  const axis=side==='front'||side==='back'?0:1;
  const points:SelectionPoint[]=Array.from({length:vertices.length/3},(_,i)=>vertices.slice(i*3,i*3+3) as SelectionPoint);
  const end=(last:boolean):SelectionPoint=>{
   const along=points.reduce((value,v)=>last?Math.max(value,v[axis]):Math.min(value,v[axis]),last?-Infinity:Infinity);
   const candidates=points.filter(v=>Math.abs(v[axis]-along)<.01);
   return candidates.reduce((a,b)=>b[2]>a[2]?b:a,candidates[0]??[0,0,0]);
  };
  return {side,cellId,stepIndex,geometry,start:end(false),end:end(true)};
 });
}
