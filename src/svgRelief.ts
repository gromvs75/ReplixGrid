import type {CrossSection,Manifold,ManifoldToplevel} from 'manifold-3d';
import {resolveWalls,type Project,type Side} from './model.js';
import {footprintContour,offsetContour} from './footprint.js';
import {shellGap} from './reliefSize.js';
import {hasDecorativeShellSupport,hasShellSupport,hasLegacyShellSupport,shellSupportHeight} from './shellSupport.js';
import type {ReliefBounds} from './relief.js';
import {contourHeight} from './shell.js';
/** Unwrap each exterior side in arc-length coordinates, then wrap filled vector strips back onto it. */
export function applySvgRelief(w:ManifoldToplevel,p:Project,body:Manifold,keep:(m:Manifold)=>Manifold,shell=false,bounds:ReliefBounds={}){
 const r=p.relief,s=(shell?p.shell?.svg:r?.svg)!,cs:CrossSection[]=[];const hold=(c:CrossSection)=>{cs.push(c);return c;};
 try{
  const offset=shell?shellGap(p)+p.shell!.thickness:0;
  const contour=footprintContour(p,offset),out=offsetContour(contour,shell?.3:r!.depth),inside=offsetContour(contour,shell?-p.shell!.thickness-.3:-.15),walls=resolveWalls(p);
  const border=shell?(p.shell!.border??Math.max(3,p.shell!.thickness*2)):0;
  const support=shell&&(hasDecorativeShellSupport(p)||(hasShellSupport(p)&&!hasLegacyShellSupport(p)))?shellSupportHeight(p):0;
  const pieces:Manifold[]=[];const groups=new Map<Side,{i:number;length:number;start:number}[]>();
  for(let i=0;i<contour.length;i++){
   const a=contour[i],b=contour[(i+1)%contour.length],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
   const side:Side=Math.abs(dx)>=Math.abs(dy)?(dx>0?'front':'back'):(dy>0?'right':'left');
   const group=groups.get(side)??[];group.push({i,length,start:0});groups.set(side,group);
  }
  // The contour seam may split a side's corner segments. Restore their continuous order.
  for(const group of groups.values()){const gap=group.findIndex((v,i)=>i>0&&v.i!==group[i-1].i+1);if(gap>0)group.push(...group.splice(0,gap));let u=0;for(const v of group){v.start=u;u+=v.length;}}
  const raw=hold(w.CrossSection.union(s.asset.shapes.map(shape=>hold(new w.CrossSection(shape,'EvenOdd')))));
  const motif=hold(hold(raw.translate([- .5,-s.asset.aspect/2])).scale(s.width));
  const rotated=hold(motif.rotate(s.rotation));
  const box=rotated.bounds(),mw=box.max[0]-box.min[0],mh=box.max[1]-box.min[1];
  let copies=0;
  for(const side of s.sides){const group=groups.get(side);if(!group?.length)continue;
   const length=group.reduce((n,v)=>n+v.length,0),low=Math.max(shell?support+border:p.floorThickness+.5,bounds.minZ??0);
   const roof=Math.min(bounds.maxZ??Infinity,Math.max(...group.flatMap(({i})=>[contourHeight(p,walls,...contour[i]),contourHeight(p,walls,...contour[(i+1)%contour.length])])));
   if(roof<=low)continue;
   const cx=length/2+s.offsetX,cy=(low+roof-(shell?border:0))/2+s.offsetY,px=mw+s.gap,py=mh+s.gap;
   const nx=s.mode==='repeat'?Math.ceil((length+Math.abs(s.offsetX)*2)/px)+1:0,ny=s.mode==='repeat'?Math.ceil((roof+Math.abs(s.offsetY)*2)/py)+1:0;
   const margin=shell?border:Math.max(.6,(p.topEdge?.size??0)+.4);
   const roofs=group.map(({i,length:len,start})=>{
    const a=contour[i],b=contour[(i+1)%contour.length],steps=Math.max(1,Math.ceil(len)),points:[number,number][]=[];
    for(let k=steps;k>=0;k--){const t=k/steps;points.push([start+len*t,Math.max(low,Math.min(bounds.maxZ??Infinity,contourHeight(p,walls,a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)-margin))]);}
    return points;
   });
   // Test whole repeats against the same roof used to wrap the relief. This also
   // excludes fragments at cutouts and at the boundary between adjacent sides.
   const usable=(shell||s.mode==='repeat')?hold(new w.CrossSection([[[0,low],[length,low],...roofs.slice().reverse().flat()]])):undefined;
   const instances:CrossSection[]=[];
   for(let x=-nx;x<=nx;x++)for(let y=-ny;y<=ny;y++){
    const ux=cx+x*px,z=cy+y*py;
    if(ux+box.max[0]<0||ux+box.min[0]>length||z+box.max[1]<low||z+box.min[1]>roof)continue;
    if(usable&&(ux+box.min[0]<(shell?border:.6)||ux+box.max[0]>length-(shell?border:.6)||z+box.min[1]<low))continue;
    const candidate=rotated.translate([ux,z]);
    if(usable){const outside=candidate.subtract(usable);const fits=outside.area()<1e-8;outside.delete();if(!fits){candidate.delete();continue;}}
    hold(candidate);
    if(++copies>300||copies*s.asset.shapes.flat().reduce((n,v)=>n+v.length,0)>120000)throw new Error('Слишком много повторений SVG. Увеличьте размер или интервал.');
    instances.push(candidate);
   }
   if(!instances.length)continue;
   const pattern=hold(w.CrossSection.union(instances));
   for(const [index,{i,length:len,start}] of group.entries()){const j=(i+1)%contour.length;
    const roofPoints=roofs[index].map(([x,y]):[number,number]=>[x,y]);
    // Micron-scale overlap closes numerical seams between curved/chamfered strips.
    const pad=contour.length>4?.003:0;
    roofPoints[0][0]+=pad;roofPoints[roofPoints.length-1][0]-=pad;
    const clipped=hold(pattern.intersect(hold(new w.CrossSection([[[start-pad,low],[start+len+pad,low],...roofPoints]]))));
    if(clipped.area()<1e-6)continue;
    const strip=keep(hold(clipped.simplify(.001)).extrude(1));
    const mapped=keep(strip.warp(v=>{const t=(v[0]-start)/len,z=v[1],d=v[2];
     const ix=inside[i][0]+(inside[j][0]-inside[i][0])*t,iy=inside[i][1]+(inside[j][1]-inside[i][1])*t;
     const ox=out[i][0]+(out[j][0]-out[i][0])*t,oy=out[i][1]+(out[j][1]-out[i][1])*t;
     v[0]=ix+(ox-ix)*d;v[1]=iy+(oy-iy)*d;v[2]=z;
    }));pieces.push(mapped);
   }
  }
  if(!pieces.length)throw new Error('SVG находится за пределами стенки. Уменьшите размер или смещение.');
  // Simplify only the added relief, never the original compartment walls.
  const relief=keep(keep(keep(w.Manifold.union(pieces)).asOriginal()).simplify(.002));
  return keep(shell?body.subtract(relief):body.add(relief));
 }finally{cs.forEach(c=>c.delete());}
}
