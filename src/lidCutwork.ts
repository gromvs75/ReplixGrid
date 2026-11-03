import type {XY} from './rounding.js';
import type {LidMotif} from './lidMotifs.js';

// Each closed slot is a window onto the backing, not a separate printed leaf.
// Place partial repeats beyond the ends so short and curved lids also fill to the rim.
export function lidCutouts(motif:LidMotif,length:number,span:number,point:(u:number,v:number)=>XY):XY[][]{
 const holes:XY[][]=[],tau=2*Math.PI;
 const slot=(curve:(t:number)=>XY,halfWidth:number)=>{
  const top:XY[]=[],bottom:XY[]=[];
  for(let j=0;j<=32;j++){
   const t=j/32,[x,y]=curve(t),[ax,ay]=curve(Math.max(0,t-.001)),[bx,by]=curve(Math.min(1,t+.001));
   const w=halfWidth*Math.sin(Math.PI*t)**.8/Math.hypot(bx-ax,by-ay);
   top.push(point(x+w*(by-ay),y-w*(bx-ax)));
   if(j>0&&j<32)bottom.unshift(point(x-w*(by-ay),y+w*(bx-ax)));
  }
  holes.push([...top,...bottom]);
 };
 const count=Math.max(1,Math.min(32,Math.round(length/span*(motif==='fern'?1.4:1)))),pitch=length/count;
 for(let k=-1;k<=count;k++){
  const x=k*pitch;
  if(motif==='olive'||motif==='fern'){
   const pairs=motif==='fern'?6:3,step=pitch/pairs;
   for(let i=0;i<pairs;i++)for(const side of [-1,1]){
    const u=x+(i+.22+(side>0?.38:0))*step;
    const y=span*(.5+.12*Math.sin(tau*u/(2*pitch)));
    const reach=side>0?span-y:y;
    slot(t=>[u+step*(.9*t+.9*t*t),y+side*reach*(.065+.84*t)], Math.min(step*.30,span*(motif==='fern'?.038:.076)));
   }
  }else if(motif==='ginkgo'){
   const sign=k%2===0?1:-1,y=sign>0?0:span;
   for(let i=-4;i<=4;i++){
    const a=i*.27;
    slot(t=>{const r=.18+.77*t;return [x+pitch*(.5+.48*r*Math.sin(a+.10*(1-t))),y+sign*span*(.045+.91*r*Math.cos(a))];},Math.min(pitch,span)*.026);
   }
  }else if(motif==='tide'){
   for(let j=-1;j<=6;j++){
    const start=x+((j%2)*.48)*pitch;
    slot(t=>{const u=start+pitch*(.05+.90*t);return [u,span*((j+.5)/6+.075*Math.sin(tau*u/(pitch*1.6)+j*.35))];},span*.036);
   }
  }else if(motif==='grain'){
   for(let n=1;n<=4;n++)for(let h=0;h<3;h++){
    slot(t=>{const a=tau*((h+.07+.86*t)/3+n*.11);const r=n/4*(1+.05*Math.sin(3*a));return [x+pitch*(.5+.46*r*Math.cos(a)),span*(.50+.48*r*Math.sin(a))];},Math.min(span,pitch)*.024);
   }
  }
 }
 return holes;
}
