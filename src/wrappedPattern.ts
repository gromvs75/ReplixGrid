import {applySvgRelief} from './svgRelief.js';
import {cellularOpenings} from './cellularPattern.js';
import {shellGap} from './reliefSize.js';
import type {Manifold,ManifoldToplevel} from 'manifold-3d';
import {footprintContour,honeyEdgeOwner,offsetContour} from './footprint.js';
import {resolveWalls,hasCapsuleSlope,capsuleTop,type Project} from './model.js';
import {holesFor,honeyCellHeight,contourHeight,topAt} from './shell.js';
import {splitPlan} from './splitting.js';
import {hasDecorativeShellSupport,hasShellSupport,hasLegacyShellSupport,shellSupportHeight} from './shellSupport.js';

/** Develop the perimeter into a strip, then fold its perforations back onto each facet. */
export function perforateShell(wasm:ManifoldToplevel,p:Project,body:Manifold,keep:(m:Manifold)=>Manifold){
 if(p.shell?.svg)return applySvgRelief(wasm,p,body,keep,true);
 const s=p.shell!,border=s.border??Math.max(3,s.thickness*2),offset=shellGap(p)+s.thickness;
 const contour=(!p.footprint&&!p.cornerRadius?[[ -offset,-offset],[p.width+offset,-offset],[p.width+offset,p.depth+offset],[-offset,p.depth+offset]]:footprintContour(p,offset)) as [number,number][];
 const penetration=Math.max(.3,Math.max(p.width,p.depth)*.003),outside=offsetContour(contour,penetration),inside=offsetContour(contour,-s.thickness-penetration);
 const base=footprintContour(p),walls=resolveWalls(p).slice(0,4),split=p.printing?splitPlan(p):null;
 const lengths=contour.map((a,i)=>{const b=contour[(i+1)%contour.length];return Math.hypot(b[0]-a[0],b[1]-a[1]);});
 const perimeter=lengths.reduce((a,b)=>a+b,0);
 const planar=hasCapsuleSlope(p);
 const height=(i:number,end:boolean)=>{
  const j=(i+1)%contour.length,k=end?j:i;
  if(planar)return capsuleTop(p,contour[k][0],offset);
  if(p.footprint==='honeycomb')return honeyCellHeight(p,walls,honeyEdgeOwner(p,base[i],base[j]),...base[k]);
  if(p.footprint)return contourHeight(p,walls,...base[k]);
  // The rectangular kernel unions adjacent profile masks through each rounded corner.
  const [x,y]=contour[k],r=(p.cornerRadius??0)+offset,band=Math.max(r,s.thickness),hs:number[]=[];
  if(y<=-offset+band+1e-6)hs.push(topAt(walls[0],Math.max(0,Math.min(p.width,x))));
  if(y>=p.depth+offset-band-1e-6)hs.push(topAt(walls[1],Math.max(0,Math.min(p.width,x))));
  if(x<=-offset+band+1e-6)hs.push(topAt(walls[2],Math.max(0,Math.min(p.depth,y))));
  if(x>=p.width+offset-band-1e-6)hs.push(topAt(walls[3],Math.max(0,Math.min(p.depth,y))));
  return Math.max(...hs);
 };
 // Leaning preserves Z, so the lower rim stays horizontal in pattern space.
 const hasCutout=walls.some(w=>w.cutout);
 // The sleeve is trimmed to sit on the decorative ledge later. Preserve a
 // complete printable rim above that new bottom instead of cutting lattice.
 const supportBottom=(hasDecorativeShellSupport(p)||(hasShellSupport(p)&&!hasLegacyShellSupport(p)))?shellSupportHeight(p):0;
 const bottom=(_x:number)=>hasCutout?supportBottom:supportBottom+border;
 const low=0;
 const high=Math.max(...contour.flatMap((_,i)=>[height(i,false),height(i,true)]),...walls.flatMap(w=>(w.stepPoints??[]).map(([,h])=>h)));
 // Fit a whole number of repeats around the closed perimeter, including a halo
 // on either side. A hole crossing the origin must wrap, not get discarded.
 const period=s.size*(s.pattern==='waves'?2:s.pattern==='honeycomb'?1.5:s.pattern==='cubes'?.75:1);
 const repeats=Math.max(1,Math.round(perimeter/period)),stretch=perimeter/(repeats*period);
 const holes=s.pattern==='cellular'?[]:holesFor({id:'wrap',axis:'x',x:0,y:0,length:(repeats+2)*period,thickness:s.thickness,startHeight:high-low+s.size*2,endHeight:high-low+s.size*2,cap:0},s,border,0);
 const candidates=s.pattern==='cellular'?cellularOpenings(perimeter,high+s.size,s.size,true):holes.map(poly=>poly.map(([u,z])=>[(u-period+period*.173)*stretch,z+low] as [number,number])).filter(poly=>{
  const center=poly.reduce((sum,v)=>sum+v[0],0)/poly.length;return center>=0&&center<perimeter;
 });
 const starts:number[]=[0];for(const length of lengths)starts.push(starts.at(-1)!+length);
 const roof:[number,number][]=[],floor:[number,number][]=[];
 for(let i=contour.length-1;i>=0;i--){const j=(i+1)%contour.length,n=Math.max(1,Math.ceil(lengths[i]/(hasCutout?.25:1)));
  for(let k=n;k>=0;k--){const t=k/n,x=contour[i][0]*(1-t)+contour[j][0]*t,y=contour[i][1]*(1-t)+contour[j][1]*t;
   let h=height(i,false)*(1-t)+height(i,true)*t;
   if(!planar&&!p.footprint){const dx=contour[j][0]-contour[i][0],dy=contour[j][1]-contour[i][1];if(Math.abs(dy)<1e-6)h=topAt(walls[y<p.depth/2?0:1],x);else if(Math.abs(dx)<1e-6)h=topAt(walls[x<p.width/2?2:3],y);}
   const bottomZ=bottom(x);
   floor.push([starts[i]+lengths[i]*t,bottomZ]);
   roof.push([starts[i]+lengths[i]*t,Math.max(bottomZ,h-(hasCutout?0:border))]);
  }
 }
 let mask=new wasm.CrossSection([[...floor.reverse(),...roof]]);
 if(!hasCutout)for(let i=0;i<contour.length;i++){
  const previous=(i+contour.length-1)%contour.length,low=Math.min(height(previous,true),height(i,false)),highStep=Math.max(height(previous,true),height(i,false));
  if(highStep-low<1e-6)continue;
  for(const u of i===0?[0,perimeter]:[starts[i]]){
   const rim=new wasm.CrossSection([[[u-border,low-border],[u+border,low-border],[u+border,highStep+border],[u-border,highStep+border]]]);
   const next=mask.subtract(rim);mask.delete();rim.delete();mask=next;
  }
 }
 // Steps can occur in the middle of a perimeter edge, at a partition. Keep
 // a solid vertical strip on the taller side of each such transition.
 if(p.steppedWalls){
  for(let i=0;i<contour.length;i++){
   const a=contour[i],b=contour[(i+1)%contour.length],dx=b[0]-a[0];
   if(Math.abs(dx)<1e-8)continue;
   const wall=walls[(a[1]+b[1])/2<p.depth/2?0:1];
   for(const [index,[x,h]] of (wall.stepPoints??[]).entries()){
    if(index===0)continue;
    const t=(x-a[0])/dx;if(t<0||t>1)continue;
    const previous=wall.stepPoints![index-1][1];if(Math.abs(h-previous)<1e-6)continue;
    const u=starts[i]+t*lengths[i],lowStep=Math.min(h,previous),highStep=Math.max(h,previous);
    const rim=new wasm.CrossSection([[[u-border,lowStep-border],[u+border,lowStep-border],[u+border,highStep+border],[u-border,highStep+border]]]);
    const next=mask.subtract(rim);mask.delete();rim.delete();mask=next;
   }
  }
 }
 // Offset the developed surface in 2D, rather than lowering its roof.
 // This keeps the same rim width along steep cutouts, waves and height steps.
 // Join periodic copies first so the closed perimeter has no artificial seam.
 const before=mask.translate([-perimeter,0]),after=mask.translate([perimeter,0]);
 const joined=mask.add(before),periodicMask=joined.add(after);
 const inset=hasCutout?periodicMask.offset(-border,'Round',2,32):periodicMask;
 joined.delete();mask.delete();before.delete();after.delete();if(hasCutout)periodicMask.delete();mask=inset;
 const cutters:Manifold[]=[];
 const position=(u:number,d:number)=>{
  u=((u%perimeter)+perimeter)%perimeter;
  let i=0;while(i<lengths.length-1&&starts[i+1]<u)i++;
  const j=(i+1)%contour.length,t=(u-starts[i])/lengths[i];
  return [(outside[i][0]*(1-t)+outside[j][0]*t)*(1-d)+(inside[i][0]*(1-t)+inside[j][0]*t)*d,(outside[i][1]*(1-t)+outside[j][1]*t)*(1-d)+(inside[i][1]*(1-t)+inside[j][1]*t)*d];
 };
 try{for(const candidate of candidates){
  const shape=new wasm.CrossSection([candidate.slice().reverse()]),clipped=shape.intersect(mask);shape.delete();
  try{if(clipped.area()<.02)continue;
   if(split&&split.cuts.some(cut=>{const axis=split.axis==='x'?0:1;const coords=clipped.toPolygons().flat().map(v=>position(v[0],.5)[axis]);return Math.max(...coords)>cut-5&&Math.min(...coords)<cut+20;}))continue;
   const prism=keep(clipped.extrude(1)),refined=keep(prism.refineToLength(!p.footprint&&!p.cornerRadius?.5:1));
   cutters.push(keep(refined.warp(v=>{const z=v[1],xy=position(v[0],1-v[2]);v[0]=xy[0];v[1]=xy[1];v[2]=z;})));
  }finally{clipped.delete();}
 }}finally{mask.delete();}
 // Resolve sub-micron Boolean slivers before serialization into Float32 STL.
 return cutters.length?keep(keep(body.setTolerance(.001)).subtract(keep(keep(wasm.Manifold.union(cutters)).setTolerance(.001)))):body;
}
