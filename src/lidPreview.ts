import type {KitPart} from './accessoryKernel.js';
import type {Point} from './stl.js';
/** Bounds after the same face rotation used by the assembled preview. */
export function isolatedLidLayout(parts:Pick<KitPart,'kind'|'position'|'inspection'>[],faceUp:boolean){
 const min:Point=[Infinity,Infinity,Infinity],max:Point=[-Infinity,-Infinity,-Infinity];
 for(const part of parts){
  if(part.kind!=='lid'&&part.kind!=='lid-handle')continue;
  const b=part.inspection.bounds,flipped=part.kind==='lid'&&!faceUp;
  const lo:Point=[b.min[0],flipped?0:b.min[1],flipped?-b.max[2]:b.min[2]];
  const hi:Point=[b.max[0],flipped?b.max[1]-b.min[1]:b.max[1],flipped?-b.min[2]:b.max[2]];
  for(let k=0;k<3;k++){min[k]=Math.min(min[k],part.position[k]+lo[k]);max[k]=Math.max(max[k],part.position[k]+hi[k]);}
 }
 if(!min.every(Number.isFinite))return null;
 const size=Math.max(...max.map((v,k)=>v-min[k]));
 // The camera looks at Y=0.45 after scaling. Centre tall handles there too.
 const centerZ=(min[2]+max[2])/2;
 return {offset:[-(min[0]+max[0])/2,-(min[1]+max[1])/2,-centerZ+.45*Math.max(1,size)/4] as Point,size};
}
