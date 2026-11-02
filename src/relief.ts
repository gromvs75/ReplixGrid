import {reliefValue} from './reliefPatterns.js';
import {contourHeight,honeyCellHeight} from './shell.js';
import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import {resolveWalls,type Project} from './model.js';
import {footprintContour,honeyEdgeOwner,offsetContour} from './footprint.js';
/** A closed relief skin overlaps the intact wall and is fused to it. */
export function applyRelief(wasm:ManifoldToplevel,p:Project,body:Manifold,keep:(m:Manifold)=>Manifold){
 const r=p.relief;if(!r)return body;
 const resolution=16;
 const walls=resolveWalls(p);
 const contour=footprintContour(p),inner=offsetContour(contour,-.25),outer=offsetContour(contour,1),depth=r.depth;
 const lengths=contour.map((a,i)=>Math.hypot(contour[(i+1)%contour.length][0]-a[0],contour[(i+1)%contour.length][1]-a[1]));
 const perimeter=lengths.reduce((a,b)=>a+b,0),repeats=Math.max(1,Math.round(perimeter/r.spacing)),pitch=perimeter/repeats;
 const samples:{x:number;y:number;ix:number;iy:number;ox:number;oy:number;u:number;top:number}[]=[];let start=0;
 for(let i=0;i<contour.length;i++){
  const j=(i+1)%contour.length,n=Math.max(1,Math.ceil(lengths[i]/Math.min(1.5,pitch/resolution)));
  for(let k=0;k<n;k++){const t=k/n,lerp=(a:number,b:number)=>a*(1-t)+b*t;
   samples.push({x:lerp(contour[i][0],contour[j][0]),y:lerp(contour[i][1],contour[j][1]),ix:lerp(inner[i][0],inner[j][0]),iy:lerp(inner[i][1],inner[j][1]),ox:lerp(outer[i][0],outer[j][0]),oy:lerp(outer[i][1],outer[j][1]),u:start+lengths[i]*t,top:p.footprint==='honeycomb'?honeyCellHeight(p,walls,honeyEdgeOwner(p,contour[i],contour[j]),lerp(contour[i][0],contour[j][0]),lerp(contour[i][1],contour[j][1])):contourHeight(p,walls,lerp(contour[i][0],contour[j][0]),lerp(contour[i][1],contour[j][1]))});}
  start+=lengths[i];
 }
 // Keep the added skin off the floor and top seam; overlapping coplanar faces
 // otherwise create Float32 slivers at cutouts and stepped honeycomb edges.
 const low=p.floorThickness+.35,step=Math.min(1.5,pitch/resolution),n=samples.length;
 const verts:number[]=[],faces:number[]=[];
 // Every column uses the same absolute Z lattice. Scaling rows to the local
 // roof sheared triangles across many pattern periods beside a deep cutout.
 const columns=samples.map(a=>{
  const top=Math.max(low+.05,a.top-.35),levels:number[]=[low];
  for(let z=low+step;z<top-.02;z+=step)levels.push(z);
  levels.push(top);
  const ids=levels.map(z=>{
   const groove=reliefValue(r.pattern,a.u/pitch,z/pitch);
   const fade=Math.max(0,Math.min(1,(z-low)/Math.max(1,depth),(top-z)/Math.max(1,depth)));
   const amount=.02+(depth-.02)*groove*fade;
   const outerId=verts.length/3;
   verts.push(a.x+(a.ox-a.x)*amount,a.y+(a.oy-a.y)*amount,z,a.ix,a.iy,z);
   return outerId;
  });
  return {levels,ids};
 });
 const quad=(a:number,b:number,c:number,d:number)=>faces.push(a,b,c,a,c,d);
 for(let i=0;i<n;i++){
  const left=columns[i],right=columns[(i+1)%n];let l=0,r=0;
  const triangle=(a:number,b:number,c:number)=>{faces.push(a,b,c,c+1,b+1,a+1);};
  while(l<left.ids.length-1||r<right.ids.length-1){
   const lz=left.levels[l+1]??Infinity,rz=right.levels[r+1]??Infinity;
   if(lz<=rz){triangle(left.ids[l],right.ids[r],left.ids[l+1]);l++;}
   else {triangle(left.ids[l],right.ids[r],right.ids[r+1]);r++;}
  }
  const a=left.ids[0],b=right.ids[0],c=left.ids.at(-1)!,d=right.ids.at(-1)!;
  quad(b,a,a+1,b+1);quad(c,d,d+1,c+1);
 }
 const skin=keep(new wasm.Manifold(new wasm.Mesh({numProp:3,vertProperties:new Float32Array(verts),triVerts:new Uint32Array(faces)})));
 return keep(keep(body.setTolerance(.001)).add(keep(skin.setTolerance(.001))));
}
