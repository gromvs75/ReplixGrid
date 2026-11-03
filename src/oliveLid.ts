import type {CrossSection,ManifoldToplevel} from 'manifold-3d';
import type {XY} from './rounding.js';

// Draw in the long direction so the branch also fits tall and circular lids.
export function oliveFace(wasm:ManifoldToplevel, outline:XY[], keep:(s:CrossSection)=>CrossSection){
 const face=keep(new wasm.CrossSection([outline]));
 const {min,max}=face.bounds(), width=max[0]-min[0],depth=max[1]-min[1],vertical=depth>width;
 const length=Math.max(width,depth),span=Math.min(width,depth);
 const point=(u:number,v:number):XY=>vertical?[max[0]-v,min[1]+u]:[min[0]+u,min[1]+v];
 const spine=(u:number)=>span*(.5+.085*Math.sin(u*Math.PI*2/length));
 const stroke=Math.min(2,span*.035),inside=keep(face.offset(-stroke,'Round'));
 const pieces=[keep(face.subtract(inside))];
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
