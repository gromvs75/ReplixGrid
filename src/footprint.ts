import {chamferedContour,roundedContour,type XY} from './rounding.js';
export type Footprint='circle'|'oval'|'honeycomb';
export interface FootprintSpec {width:number;depth:number;cornerRadius?:number;cornerStyle?:'round'|'chamfer';footprint?:Footprint;honeycombCount?:number}
export function honeyRaw(count=7):XY[][]{
  const axial:XY[]=[[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]];
  let q=2,r=0;for(const [dq,dr] of [[-1,1],[-1,0],[0,-1],[1,-1],[1,0],[0,1]])for(let i=0;i<2;i++){axial.push([q,r]);q+=dq;r+=dr;}
  return axial.slice(0,count).map(([q,r])=>Array.from({length:6},(_,i)=>[1.5*q+Math.cos(i*Math.PI/3),Math.sqrt(3)*(r+q/2)+Math.sin(i*Math.PI/3)] as XY));
}
export function honeyBounds(count=7){const points=honeyRaw(count).flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),depth:Math.max(...ys)-Math.min(...ys)};}
export function honeyCells(p:FootprintSpec):XY[][]{
 const box=honeyBounds(p.honeycombCount??7);return honeyRaw(p.honeycombCount??7).map(cell=>cell.map(([x,y])=>[(x-box.x)*p.width/box.width,(y-box.y)*p.depth/box.depth]));
}
/** The cell owning a boundary edge; vertex proximity is ambiguous at shared corners. */
export function honeyEdgeOwner(p:FootprintSpec,a:XY,b:XY):number{
 const near=(u:XY,v:XY)=>Math.hypot(u[0]-v[0],u[1]-v[1])<1e-5;
 const owner=honeyCells(p).findIndex(cell=>cell.some((v,i)=>near(v,a)&&near(cell[(i+1)%6],b)));
 if(owner<0)throw new Error('Не удалось определить ячейку внешней стенки.');
 return owner;
}
/** Parallel edge offset: distances are measured normal to the polygon, not by scaling. */
export function offsetContour(poly:XY[],distance:number):XY[]{
  return poly.map((b,i)=>{
    const a=poly[(i+poly.length-1)%poly.length],c=poly[(i+1)%poly.length];
    const u=[b[0]-a[0],b[1]-a[1]],v=[c[0]-b[0],c[1]-b[1]],lu=Math.hypot(...u),lv=Math.hypot(...v);
    const n=[u[1]/lu,-u[0]/lu],m=[v[1]/lv,-v[0]/lv],dot=n[0]*m[0]+n[1]*m[1];
    return [b[0]+distance*(n[0]+m[0])/(1+dot),b[1]+distance*(n[1]+m[1])/(1+dot)];
  });
}
export function footprintContour(p:FootprintSpec,offset=0):XY[]{
  if(!p.footprint&&p.cornerStyle==='chamfer')return chamferedContour(p.width+2*offset,p.depth+2*offset,Math.max(0,(p.cornerRadius??0)+(2-Math.SQRT2)*offset),-offset,-offset);
  if(!p.footprint)return roundedContour(p.width+2*offset,p.depth+2*offset,Math.max(0,(p.cornerRadius??0)+offset),-offset,-offset);
  let points:XY[];
  if(p.footprint==='honeycomb'){
    const key=(a:XY)=>a.map(n=>String(Number(n.toFixed(6)))).join(','),edges=new Map<string,[XY,XY]>();
    for(const cell of honeyCells(p))for(let i=0;i<6;i++){const a=cell[i],b=cell[(i+1)%6],reverse=key(b)+'/'+key(a);if(edges.has(reverse))edges.delete(reverse);else edges.set(key(a)+'/'+key(b),[a,b]);}
    const remaining=[...edges.values()];points=[];let edge=remaining.pop()!;
    while(true){points.push(edge[0]);const next=remaining.findIndex(e=>key(e[0])===key(edge[1]));if(next<0)break;edge=remaining.splice(next,1)[0];}
  }else points=Array.from({length:192},(_,i)=>{const a=i*2*Math.PI/192;return [p.width/2*(1+Math.cos(a)),p.depth/2*(1+Math.sin(a))];});
  return offset?offsetContour(points,offset):points;
}
/** Intersections of a line with the footprint. */
export function lineSpan(poly:XY[],axis:'x'|'y',coord:number):[number,number]|null{
 const at=axis==='x'?1:0,along=1-at,values:number[]=[];
 for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length];if((a[at]<=coord&&b[at]>coord)||(b[at]<=coord&&a[at]>coord)){const t=(coord-a[at])/(b[at]-a[at]);values.push(a[along]+t*(b[along]-a[along]));}}
 return values.length>=2?[Math.min(...values),Math.max(...values)]:null;
}
