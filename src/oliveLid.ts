import {cellularOpenings} from './cellularPattern.js';
import type {CrossSection,ManifoldToplevel} from 'manifold-3d';
import type {LidMotif} from './lidMotifs.js';
import type {XY} from './rounding.js';

// Draw in the long direction so the branch also fits tall and circular lids.
export function oliveFace(wasm:ManifoldToplevel, outline:XY[], keep:(s:CrossSection)=>CrossSection,motif:LidMotif='olive'){
 const face=keep(new wasm.CrossSection([outline]));
 const {min,max}=face.bounds(), width=max[0]-min[0],depth=max[1]-min[1],vertical=depth>width;
 const length=Math.max(width,depth),span=Math.min(width,depth);
 const point=(u:number,v:number):XY=>vertical?[max[0]-v,min[1]+u]:[min[0]+u,min[1]+v];
 const spine=(u:number)=>span*(.5+.085*Math.sin(u*Math.PI*2/length));
 const stroke=Math.min(2,span*.035),inside=keep(face.offset(-stroke,'Round'));
 if(motif==='cellular'){
  const openings=cellularOpenings(length,span,20,false).map(cell=>
   cell.reverse().map(([u,v])=>point(u,v)));
  const cells=keep(new wasm.CrossSection(openings));
  return keep(face.subtract(keep(cells.intersect(inside))));
 }
 const pieces=[keep(face.subtract(inside))];
 // Construct the accent in lid coordinates, then clip once to its actual outline.
 if(motif!=='olive'){
  const tau=Math.PI*2;
  const polygon=(pts:XY[])=>keep(new wasm.CrossSection([pts],'EvenOdd'));
  const path=(n:number,fn:(t:number)=>XY)=>Array.from({length:n+1},(_,i)=>fn(i/n));
  const ribbon=(n:number,fn:(t:number)=>XY,half:(t:number)=>number)=>{
   const a:XY[]=[],b:XY[]=[];
   for(let i=0;i<=n;i++){
    const t=i/n,[x,y]=fn(t),[x0,y0]=fn(Math.max(0,t-.001)),[x1,y1]=fn(Math.min(1,t+.001));
    const h=half(t)/(Math.hypot(x1-x0,y1-y0)||1),dx=(y1-y0)*h,dy=(x0-x1)*h;
    a.push(point(x+dx,y+dy));b.unshift(point(x-dx,y-dy));
   }
   pieces.push(polygon([...a,...b]));
  };
  if(motif==='ginkgo'){
   const count=Math.max(2,Math.min(18,Math.round(length/span*1.8))),pitch=length/count;
   for(let i=0;i<count;i++){
    const side=i%2?1:-1,cx=(i+.5)*pitch,cy=span*(side===1?.12:.88);
    const ray=(angle:number,r:number):XY=>point(cx+Math.sin(angle)*pitch*.62*r,cy+side*Math.cos(angle)*span*.73*r);
    const rim=(a:number)=>1-.24*Math.exp(-((a/.115)**2))+.023*Math.cos(18*a);
    ribbon(10,t=>[cx-pitch*.11*(1-t)**2,cy+side*span*(.23*t-.2*(1-t))],()=>stroke*.58);
    const leaf=polygon([point(cx,cy),...path(100,t=>{const a=(t-.5)*2.65;return ray(a,rim(a));})]);
    const veins=[-.98,-.70,-.43,-.19,.19,.43,.70,.98].map((a,j)=>polygon([
     ray(a,.2+(j%2)*.12),ray(a-.036,.83),ray(a,.90),ray(a+.036,.83)]));
    pieces.push(keep(leaf.subtract(keep(wasm.CrossSection.union(veins)))));
   }
  }else if(motif==='fern'){
   const n=Math.min(36,Math.max(8,Math.round(length/span*7)));
   ribbon(48,t=>[length*t,spine(length*t)],()=>stroke*.53);
   for(let i=0;i<n;i++)for(const side of [-1,1]){
    const f=(i+.4+(side===1?.24:0))/(n+1),h=span*(.12+.30*Math.sin(Math.PI*f));
    ribbon(18,t=>[length*f+t*(length/n*.6+h*.40*t),spine(length*f)+side*h*t],
     t=>Math.min(span*.03,length/n*.23)*Math.sin(Math.PI*t));
   }
  }else if(motif==='tide'){
   for(let i=-1;i<=8;i++)ribbon(96,t=>[length*t,span*(i/7+.10*Math.sin(t*tau*1.3+i*.42)+.035*Math.sin(t*tau*2.5))],
    t=>span*(.020+.012*Math.sin(t*tau+i)));
  }else if(motif==='pebbles'){
   const stones:CrossSection[]=[];
   const cols=Math.max(3,Math.min(32,Math.round(length/span*3))),pitch=length/cols;
   for(let j=0;j<3;j++)for(let i=-1;i<=cols;i++){
    const cx=(i+.5+(j%2)*.5)*pitch,cy=(j+.5)*span/3,phase=i*1.8+j*2.2;
    stones.push(polygon(path(44,t=>{const a=t*tau,r=1+.10*Math.sin(3*a+phase)+.05*Math.cos(2*a-phase);
     return point(cx+pitch*.42*r*Math.cos(a),cy+span*.135*r*Math.sin(a));})));
   }
   pieces.push(keep(face.subtract(keep(wasm.CrossSection.union(stones)))));
  }else{
   ribbon(48,t=>[length*t,span*(.54+.045*Math.sin(t*tau))],()=>stroke*.55);
   for(let i=1;i<=12;i++){const loop=polygon(path(128,t=>{const a=t*tau,r=i/9*(1+.07*Math.sin(3*a+i*.16)+.04*Math.cos(5*a));
    return point(length*(.36+.76*r*Math.cos(a)),span*(.54+.73*r*Math.sin(a)));}));
    pieces.push(keep(loop.subtract(keep(loop.offset(-stroke)))));
   }
  }
  return keep(keep(wasm.CrossSection.union(pieces)).intersect(face));
 }
 const stem:XY[]=[],back:XY[]=[];
 for(let i=0;i<=64;i++){
  const u=length*i/64;
  stem.push(point(u,spine(u)-stroke*.5));back.unshift(point(u,spine(u)+stroke*.5));
 }
 pieces.push(keep(new wasm.CrossSection([[...stem,...back]])));
 const pairs=Math.max(3,Math.min(16,Math.round(length/span*3)));
 for(let i=0;i<pairs;i++)for(const side of [-1,1]){
  const start=(i+.18+(side===1?.28:0))*length/(pairs+1),low:XY[]=[],high:XY[]=[];
  for(let j=0;j<=24;j++){
   const t=j/24,u=start+length/(pairs+1)*.98*t;
   const mid=spine(start)+side*span*(.32*t+.055*Math.sin(Math.PI*t));
   const half=span*.053*Math.sin(Math.PI*t);
   low.push(point(u,mid-half));if(j>0&&j<24)high.unshift(point(u,mid+half));
  }
  pieces.push(keep(new wasm.CrossSection([[...low,...high]])));
 }
 return keep(keep(wasm.CrossSection.union(pieces)).intersect(face));
}
